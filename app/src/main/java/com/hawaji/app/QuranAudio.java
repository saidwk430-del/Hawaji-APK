package com.hawaji.app;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import androidx.documentfile.provider.DocumentFile;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class QuranAudio {
    static final int REQ = 8;
    private static final Pattern P = Pattern.compile("^(\\d{1,3}).*\\.mp3$", Pattern.CASE_INSENSITIVE);
    private final Activity act;
    private final WebView web;
    private final TreeMap<Integer, Uri> files = new TreeMap<>();
    private MediaPlayer mp;

    QuranAudio(Activity a, WebView w) { act = a; web = w; }

    @JavascriptInterface
    public void pick() {
        act.runOnUiThread(new Runnable() {
            public void run() {
                Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
                i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
                act.startActivityForResult(i, REQ);
            }
        });
    }

    void onPicked(int res, Intent data) {
        if (res != Activity.RESULT_OK || data == null || data.getData() == null) return;
        Uri tree = data.getData();
        try {
            act.getContentResolver().takePersistableUriPermission(tree, Intent.FLAG_GRANT_READ_URI_PERMISSION);
        } catch (Exception e) {}
        act.getSharedPreferences("hw", Context.MODE_PRIVATE).edit().putString("mq_tree", tree.toString()).apply();
        scan(tree);
        js("if(window.hMqScan)hMqScan()");
    }

    private void scan(Uri tree) {
        files.clear();
        try {
            DocumentFile d = DocumentFile.fromTreeUri(act, tree);
            if (d == null) return;
            for (DocumentFile f : d.listFiles()) {
                String n = f.getName();
                if (n == null) continue;
                Matcher m = P.matcher(n);
                if (m.find()) {
                    int k = Integer.parseInt(m.group(1));
                    if (k >= 1 && k <= 114) files.put(k, f.getUri());
                }
            }
        } catch (Exception e) {}
    }

    private void ensureScanned() {
        if (!files.isEmpty()) return;
        String s = act.getSharedPreferences("hw", Context.MODE_PRIVATE).getString("mq_tree", null);
        if (s != null) scan(Uri.parse(s));
    }

    @JavascriptInterface
    public synchronized String list() {
        ensureScanned();
        StringBuilder b = new StringBuilder("[");
        boolean first = true;
        for (Integer k : files.keySet()) {
            if (!first) b.append(',');
            b.append(k);
            first = false;
        }
        return b.append(']').toString();
    }

    @JavascriptInterface
    public synchronized boolean play(int n) {
        ensureScanned();
        Uri u = files.get(n);
        if (u == null) return false;
        stopPlayer();
        try {
            mp = new MediaPlayer();
            mp.setDataSource(act, u);
            mp.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                public void onCompletion(MediaPlayer p) {
                    js("if(window.hMqEnd)hMqEnd(" + n + ")");
                }
            });
            mp.prepare();
            mp.start();
            return true;
        } catch (Exception e) {
            stopPlayer();
            return false;
        }
    }

    @JavascriptInterface
    public synchronized void pause() {
        try { if (mp != null && mp.isPlaying()) mp.pause(); } catch (Exception e) {}
    }

    @JavascriptInterface
    public synchronized void resume() {
        try { if (mp != null && !mp.isPlaying()) mp.start(); } catch (Exception e) {}
    }

    @JavascriptInterface
    public synchronized void stop() { stopPlayer(); }

    private void stopPlayer() {
        try {
            if (mp != null) {
                mp.setOnCompletionListener(null);
                mp.release();
            }
        } catch (Exception e) {}
        mp = null;
    }

    private void js(final String code) {
        act.runOnUiThread(new Runnable() {
            public void run() { web.evaluateJavascript(code, null); }
        });
    }
}
