export async function sendNotification(title: string, body: string) {
  await acquireNotificationPermissions();
  if ("serviceWorker" in navigator) {
    const reg = await navigator.serviceWorker.ready;
    await reg.showNotification(title, { body });
  }
}

export async function acquireNotificationPermissions() {
  if (!("Notification" in window)) {
    return false; // Not supported
  }

  if (Notification.permission !== "granted") {
    if ("granted" !== (await Notification.requestPermission())) {
      return false; // Access denied
    }
  }

  return true;
}

export function isAppInBackground() {
  return document.visibilityState === "hidden";
}
