package com.hawaji.app;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.pdf.PdfRenderer;
import android.net.Uri;
import android.os.ParcelFileDescriptor;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import java.io.ByteArrayOutputStream;

public class PdfBridge {
    static final int REQ = 7;
    private final MainActivity act;
    private final WebView web;
    private PdfRenderer renderer;
    private ParcelFileDescriptor pfd;

    PdfBridge(MainActivity a, WebView w) { act = a; web = w; }

    @JavascriptInterface
    public void pick() {
        act.runOnUiThread(new Runnable() {
            public void run() {
                Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("application/pdf");
                i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
                act.startActivityForResult(i, REQ);
            }
        });
    }

    void onPicked(int res, Intent data) {
        if (res != android.app.Activity.RESULT_OK || data == null || data.getData() == null) {
            js("hQuranNone()");
            return;
        }
        Uri u = data.getData();
        try {
            act.getContentResolver().takePersistableUriPermission(u, Intent.FLAG_GRANT_READ_URI_PERMISSION);
        } catch (Exception e) {}
        act.getSharedPreferences("hw", Context.MODE_PRIVATE).edit().putString("quran_uri", u.toString()).apply();
        if (open(u)) render(0); else js("hQuranNone()");
    }

    @JavascriptInterface
    public void init(final int last) {
        String s = act.getSharedPreferences("hw", Context.MODE_PRIVATE).getString("quran_uri", null);
        if (s == null || !open(Uri.parse(s))) { js("hQuranNone()"); return; }
        render(Math.max(0, Math.min(last, renderer.getPageCount() - 1)));
    }

    @JavascriptInterface
    public void page(final int n) {
        new Thread(new Runnable() {
            public void run() { render(n); }
        }).start();
    }

    private synchronized boolean open(Uri u) {
        close();
        try {
            pfd = act.getContentResolver().openFileDescriptor(u, "r");
            renderer = new PdfRenderer(pfd);
            return true;
        } catch (Exception e) {
            close();
            return false;
        }
    }

    private synchronized void close() {
        try { if (renderer != null) renderer.close(); } catch (Exception e) {}
        try { if (pfd != null) pfd.close(); } catch (Exception e) {}
        renderer = null;
        pfd = null;
    }

    private synchronized void render(int n) {
        if (renderer == null) { js("hQuranNone()"); return; }
        int total = renderer.getPageCount();
        if (n < 0 || n >= total) return;
        PdfRenderer.Page pg = renderer.openPage(n);
        try {
            int w = 1080;
            int h = (int) (w * (float) pg.getHeight() / pg.getWidth());
            Bitmap bm = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
            bm.eraseColor(Color.WHITE);
            pg.render(bm, null, null, PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY);
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            bm.compress(Bitmap.CompressFormat.JPEG, 85, bo);
            bm.recycle();
            String data = "data:image/jpeg;base64," + Base64.encodeToString(bo.toByteArray(), Base64.NO_WRAP);
            js("hQuranPage(" + n + "," + total + ",'" + data + "')");
        } finally {
            pg.close();
        }
    }

    private void js(final String code) {
        act.runOnUiThread(new Runnable() {
            public void run() { web.evaluateJavascript(code, null); }
        });
    }
}
