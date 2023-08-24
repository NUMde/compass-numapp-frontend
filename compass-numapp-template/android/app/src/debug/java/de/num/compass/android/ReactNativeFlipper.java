package de.num.compass.android;

import android.content.Context;
import com.facebook.flipper.android.AndroidFlipperClient;
import com.facebook.flipper.android.utils.FlipperUtils;
import com.facebook.flipper.core.FlipperClient;
import com.facebook.flipper.plugins.inspector.DescriptorMapping;
import com.facebook.flipper.plugins.inspector.InspectorFlipperPlugin;
import com.facebook.flipper.plugins.crashreporter.CrashReporterPlugin;
import com.facebook.flipper.plugins.sharedpreferences.SharedPreferencesFlipperPlugin;

import com.facebook.flipper.plugins.network.FlipperOkhttpInterceptor;
import com.facebook.flipper.plugins.network.NetworkFlipperPlugin;
import com.facebook.flipper.plugins.react.ReactFlipperPlugin;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.modules.network.NetworkingModule;

import okhttp3.OkHttpClient;

public class ReactNativeFlipper {
    public static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        if (FlipperUtils.shouldEnableFlipper(context)) {
            final FlipperClient client = AndroidFlipperClient.getInstance(context);

            client.addPlugin(new InspectorFlipperPlugin(context, DescriptorMapping.withDefaults()));
            client.addPlugin(new ReactFlipperPlugin());
            client.addPlugin(new SharedPreferencesFlipperPlugin(context));
            client.addPlugin(CrashReporterPlugin.getInstance());

            NetworkFlipperPlugin networkFlipperPlugin = new NetworkFlipperPlugin();
            NetworkingModule.setCustomClientBuilder(
                    builder -> builder.addNetworkInterceptor(new FlipperOkhttpInterceptor(networkFlipperPlugin)));
            client.start();
        }
    }
}
