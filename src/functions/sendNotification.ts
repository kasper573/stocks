export async function sendNotification(title: string, body: string) {
  if (!("Notification" in window)) {
    return; // Not supported
  }

  if (Notification.permission !== "granted") {
    if ("granted" !== (await Notification.requestPermission())) {
      return; // Access denied
    }
  }

  const reg = await navigator.serviceWorker.ready;
  reg.showNotification(title, { body: body });
}
