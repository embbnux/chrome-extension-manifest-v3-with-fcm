# Chrome Extension Manifest V3 with FCM

A demo to run FCM with Chrome Extension Manifest V3

## Setup


1. Clone this project

```
$ git clone https://github.com/embbnux/chrome-extension-manifest-v3-with-fcm.git
```

2. Create `firebaseConfig.js` file

```
$ cp firebaseConfig.default.js firebaseConfig.js
```

3. Create a project in [Firebase](https://firebase.google.com/)

4. Get `vapidKey`

In Firebase project settings -> Cloud Messaging  -> Web configuration: Generate a Web Push certificate.
Save `Key pair` value as `vapidKey` in `firebaseConfig.js` file

5. Get `firebaseConfig`

In Firebase project settings -> General, create a Web App.
Then in `SDK setup and configuration`, copy `firebaseConfig` and saved into `firebaseConfig.js` file

6. In Chrome: `chrome://extensions/`, enable developer mode, then client `Local unpacked` to load this project into chrome extension.

7. Click extension icon in Chrome Extensions to open this app and click register button to FCM for this app. You can get a registration token at developer tool of popup window.

8. Follow [here](https://firebase.google.com/docs/cloud-messaging/js/first-message#send_a_test_notification_message) to send a test message to client
