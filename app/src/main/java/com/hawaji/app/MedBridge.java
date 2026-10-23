package com.hawaji.app;

import android.content.Context;
import android.content.SharedPreferences;
import android.webkit.JavascriptInterface;

public class MedBridge {
    private final Context ctx;

    MedBridge(Context c) { ctx = c; }

    @JavascriptInterface
    public void syncMeds(String json, String lang) {
        SharedPreferences p = ctx.getSharedPreferences("hw", Context.MODE_PRIVATE);
        p.edit().putString("meds", json).putString("lang", lang).apply();
        MedScheduler.scheduleAll(ctx);
    }
}
