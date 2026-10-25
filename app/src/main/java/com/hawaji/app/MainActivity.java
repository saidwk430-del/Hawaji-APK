package com.hawaji.app;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.webkit.GeolocationPermissions;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.util.ArrayList;

public class MainActivity extends Activity {
    private WebView web;
    private PdfBridge pdf;
    private QuranAudio qa;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setGeolocationEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        web.addJavascriptInterface(new MedBridge(this), "Android");
        web.addJavascriptInterface(new Sh(), "HShare");
        pdf = new PdfBridge(this, web);
        web.addJavascriptInterface(pdf, "HPdf");
        qa = new QuranAudio(this, web);
        web.addJavascriptInterface(qa, "HAudio");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, String u) {
                if (u.startsWith("file:")) return false;
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, android.net.Uri.parse(u)));
                } catch (Exception e) {}
                return true;
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                callback.invoke(origin, true, false);
            }
        });
        setContentView(web);

        ArrayList<String> need = new ArrayList<>();
        if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            need.add(Manifest.permission.ACCESS_FINE_LOCATION);
            need.add(Manifest.permission.ACCESS_COARSE_LOCATION);
        }
        if (Build.VERSION.SDK_INT >= 33
                && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            need.add(Manifest.permission.POST_NOTIFICATIONS);
        }
        if (!need.isEmpty()) requestPermissions(need.toArray(new String[0]), 1);

        web.loadUrl("file:///android_asset/index.html");
    }

    @Override
    protected void onActivityResult(int req, int res, Intent data) {
        super.onActivityResult(req, res, data);
        if (req == PdfBridge.REQ) pdf.onPicked(res, data);
        else if (req == QuranAudio.REQ) qa.onPicked(res, data);
    }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript("(function(){return window.hBack?window.hBack():false})()", new android.webkit.ValueCallback<String>() {
            @Override
            public void onReceiveValue(String v) {
                if (!"true".equals(v)) MainActivity.super.onBackPressed();
            }
        });
    }

    public class Sh {
        @android.webkit.JavascriptInterface
        public void share(final String t) {
            runOnUiThread(new Runnable() {
                public void run() {
                    Intent i = new Intent(Intent.ACTION_SEND);
                    i.setType("text/plain");
                    i.putExtra(Intent.EXTRA_TEXT, t);
                    startActivity(Intent.createChooser(i, null));
                }
            });
        }
        @android.webkit.JavascriptInterface
        public void copy(final String t) {
            runOnUiThread(new Runnable() {
                public void run() {
                    android.content.ClipboardManager c = (android.content.ClipboardManager) getSystemService(CLIPBOARD_SERVICE);
                    c.setPrimaryClip(android.content.ClipData.newPlainText("Hawaji", t));
                }
            });
        }
    }
}
