# Android Setup & Launch Guide

To generate an APK and launch the SyncedApplication on an Android device, your system needs the Android SDK installed. Currently, the build process failed because the Android SDK is not detected on your machine (`ANDROID_HOME` is missing).

Please follow these steps to set up your environment, generate the APK, and run it on your device.

## 1. Install Android SDK
The easiest way to get the Android SDK is to install **Android Studio**:
1. Download and install [Android Studio](https://developer.android.com/studio).
2. During the installation process, ensure that you check the boxes to install the **Android SDK**, **Android SDK Platform-Tools**, and the **Android Virtual Device**.

## 2. Set Environment Variables
Once installed, you must point Windows to the SDK:
1. Open the Windows Start menu and search for "Environment Variables". Select **Edit the system environment variables**.
2. Click the **Environment Variables...** button.
3. Under **User variables**, click **New...**:
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk` *(Replace `YOUR_USERNAME` with your actual Windows username)*
4. Next, find the **Path** variable, select it, and click **Edit...**. Add these two new paths:
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\platform-tools`
5. Click OK to save all changes. You will need to **restart your terminal/IDE** for these changes to take effect.

## 3. Enable Developer Mode on Your Android Device
To run the app directly on your physical Android phone:
1. Go to **Settings** > **About phone**.
2. Tap on **Build number** 7 times until you see a message saying "You are now a developer!".
3. Go back to Settings > **System** > **Developer options**.
4. Enable **USB debugging**.
5. Connect your phone to your PC via a USB cable. (Accept the "Allow USB debugging" prompt on your phone if it appears).

## 4. Generate the APK and Launch
Once your environment is set up and your phone is connected, you can generate the APK and install it on your device in one step. 

Open your terminal in the project root (`C:\Projects\Synced Application\syncedapp`) and run:

```powershell
npm run build
```

Then, copy the web files over to the Cordova output and build/run:

```powershell
if (Test-Path "cordova\www") { Remove-Item -Recurse -Force "cordova\www" }
New-Item -ItemType Directory -Force -Path "cordova\www"
Copy-Item -Path "build\*" -Destination "cordova\www" -Recurse
cd cordova
cordova run android
```

> [!TIP]
> **Immediate Workaround (No APK Required)**
> If you just want to test your web design on your phone right now without installing Android Studio, you can run the app locally:
> 1. Run `npm start` in your project folder.
> 2. Ensure your phone and PC are connected to the same Wi-Fi network.
> 3. Look at your terminal output for the `On Your Network` URL (e.g., `http://192.168.1.5:3000`).
> 4. Open that URL in your Android phone's web browser!
