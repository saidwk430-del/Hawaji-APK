package com.hawaji.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

public class MedReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context ctx, Intent intent) {
        String act = intent.getAction();
        if (Intent.ACTION_BOOT_COMPLETED.equals(act)) {
            MedScheduler.scheduleAll(ctx);
            return;
        }
        if (!MedScheduler.ACTION.equals(act)) return;

        String name = intent.getStringExtra("name");
        String hm = intent.getStringExtra("time");
        int code = intent.getIntExtra("code", 0);
        SharedPreferences p = ctx.getSharedPreferences("hw", Context.MODE_PRIVATE);
        String lang = p.getString("lang", "ar");
        String title = lang.equals("fr") ? "Heure du médicament"
                : lang.equals("en") ? "Medication time" : "موعد الدواء";

        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        Notification.Builder b;
        if (Build.VERSION.SDK_INT >= 26) {
            nm.createNotificationChannel(new NotificationChannel("meds", "Medications",
                    NotificationManager.IMPORTANCE_HIGH));
            b = new Notification.Builder(ctx, "meds");
        } else {
            b = new Notification.Builder(ctx);
        }
        b.setSmallIcon(android.R.drawable.ic_dialog_info)
                .setContentTitle(title)
                .setContentText(name + " · " + hm)
                .setAutoCancel(true);
        nm.notify(1000 + code, b.build());

        if (hm != null) MedScheduler.schedule(ctx, code, name, hm);
    }
}
