package com.hawaji.app;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import java.util.Calendar;
import org.json.JSONArray;
import org.json.JSONObject;

public class MedScheduler {
    static final int MAX = 50;
    static final String ACTION = "com.hawaji.app.MED";

    static void scheduleAll(Context ctx) {
        for (int i = 0; i < MAX; i++) cancel(ctx, i);
        SharedPreferences p = ctx.getSharedPreferences("hw", Context.MODE_PRIVATE);
        try {
            JSONArray a = new JSONArray(p.getString("meds", "[]"));
            for (int i = 0; i < a.length() && i < MAX; i++) {
                JSONObject o = a.getJSONObject(i);
                schedule(ctx, i, o.getString("n"), o.getString("t"));
            }
        } catch (Exception e) {
        }
    }

    static Intent intentFor(Context ctx, String name, String hm, int code) {
        Intent it = new Intent(ctx, MedReceiver.class);
        it.setAction(ACTION);
        it.putExtra("name", name);
        it.putExtra("time", hm);
        it.putExtra("code", code);
        return it;
    }

    static void schedule(Context ctx, int code, String name, String hm) {
        long at = nextTime(hm);
        if (at < 0) return;
        PendingIntent pi = PendingIntent.getBroadcast(ctx, code, intentFor(ctx, name, hm, code),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
    }

    static void cancel(Context ctx, int code) {
        Intent it = new Intent(ctx, MedReceiver.class);
        it.setAction(ACTION);
        PendingIntent pi = PendingIntent.getBroadcast(ctx, code, it,
                PendingIntent.FLAG_NO_CREATE | PendingIntent.FLAG_IMMUTABLE);
        if (pi != null) {
            AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
            am.cancel(pi);
            pi.cancel();
        }
    }

    static long nextTime(String hm) {
        try {
            String[] p = hm.split(":");
            Calendar c = Calendar.getInstance();
            c.set(Calendar.HOUR_OF_DAY, Integer.parseInt(p[0]));
            c.set(Calendar.MINUTE, Integer.parseInt(p[1]));
            c.set(Calendar.SECOND, 0);
            c.set(Calendar.MILLISECOND, 0);
            if (c.getTimeInMillis() <= System.currentTimeMillis()) c.add(Calendar.DAY_OF_MONTH, 1);
            return c.getTimeInMillis();
        } catch (Exception e) {
            return -1;
        }
    }
}
