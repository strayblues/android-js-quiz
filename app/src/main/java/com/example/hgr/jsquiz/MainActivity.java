package com.example.hgr.jsquiz;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView ob = new WebView(this);
        setContentView(ob);
        ob.getSettings().setJavaScriptEnabled(true);
        ob.getSettings().setAllowUniversalAccessFromFileURLs(true);
        ob.loadUrl("file:///android_asset/www/main.html");
    }
}
