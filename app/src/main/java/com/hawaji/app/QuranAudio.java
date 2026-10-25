package com.hawaji.app;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.os.Build;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import java.io.File;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class QuranAudio {
    static final int REQ = 8;
    static final int PERM = 9;
    static final String DIR = "/storage/emulated/0/Music/Telegram/Hawaji-Quran";
    private static final Pattern P = Pattern.compile("^(\\d{1,3}).*\\.mp3$", Pattern.CASE_INSENSITIVE);
    private final Activity act;
    private final WebView web;
    private final TreeMap<Integer, String> files = new TreeMap<>();
    private MediaPlayer mp;

    QuranAudio(Activity a, WebView w) { act = a; web = w; }

    private String perm() {
        return Build.VERSION.SDK_INT >= 33 ? Manifest.permission.READ_MEDIA_AUDIO : Manifest.permission.READ_EXTERNAL_STORAGE;
    }

    private boolean hasPerm() {
        return act.checkSelfPermission(perm()) == PackageManager.PERMISSION_GRANTED;
    }

    @JavascriptInterface
    public void ask() {
        if (hasPerm()) return;
        act.runOnUiThread(new Runnable() {
            public void run() { act.requestPermissions(new String[]{perm()}, PERM); }
        });
    }

    void onPicked(int res, Intent data) { }

    private void scan() {
        files.clear();
        if (!hasPerm()) return;
        File[] fs = new File(DIR).listFiles();
        if (fs == null) return;
        for (File f : fs) {
            Matcher m = P.matcher(f.getName());
            if (m.find()) {
                int k = Integer.parseInt(m.group(1));
                if (k >= 1 && k <= 114) files.put(k, f.getAbsolutePath());
            }
        }
    }

    @JavascriptInterface
    public synchronized String list() {
        scan();
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
    public synchronized boolean play(final int n) {
        if (files.isEmpty()) scan();
        String p = files.get(n);
        if (p == null) return false;
        release();
        try {
            mp = new MediaPlayer();
            mp.setDataSource(p);
            mp.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                public void onCompletion(MediaPlayer x) { js("if(window.hMqEnd)hMqEnd(" + n + ")"); }
            });
            mp.prepare();
            mp.start();
            return true;
        } catch (Exception e) {
            release();
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
    public synchronized int pos() {
        try { return mp != null ? mp.getCurrentPosition() : 0; } catch (Exception e) { return 0; }
    }

    @JavascriptInterface
    public synchronized int dur() {
        try { return mp != null ? mp.getDuration() : 0; } catch (Exception e) { return 0; }
    }

    @JavascriptInterface
    public synchronized void seek(int ms) {
        try { if (mp != null) mp.seekTo(ms); } catch (Exception e) {}
    }

    @JavascriptInterface
    public synchronized void stop() { release(); }

    private void release() {
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
