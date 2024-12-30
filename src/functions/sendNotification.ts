export function sendNotification(title: string, body: string) {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((reg) => {
      reg.showNotification("title", { body: body });
    });
  }
}
