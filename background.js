import { initializeApp } from "./firebase/firebase-app.js";
import { getMessaging, onBackgroundMessage } from './firebase/firebase-messaging-sw.js';
import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


onBackgroundMessage(messaging, (payload) => {
  console.log('[background.js] Received background message ', payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('installed');
});

async function openPopupWindow() {
  console.log('open popup');
  const { popupWindowId } = await chrome.storage.local.get('popupWindowId');
  if (popupWindowId) {
    try {
      await chrome.windows.update(popupWindowId, { focused: true });
      return;
    } catch (e) {
      // ignore
    }
  }
  const popup = await chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: 300,
    height: 500,
  });
  await chrome.storage.local.set({
    popupWindowId: popup.id,
  });
}
chrome.action.onClicked.addListener(() => {
  console.log('click icon');
  openPopupWindow();
});

self.onnotificationclick = function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();
  event.waitUntil(openPopupWindow());
};

chrome.windows.onRemoved.addListener(async (windowId) => {
  const { popupWindowId } = await chrome.storage.local.get('popupWindowId');
  if (popupWindowId === windowId) {
    console.log('close popup');
    await chrome.storage.local.remove('popupWindowId');
  }
});
