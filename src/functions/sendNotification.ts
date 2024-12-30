import { logger } from "../logger";

export async function sendNotification(title: string, body: string) {
  logger.log("trying to send notification");
  await acquireNotificationPermissions();

  await (await swReg())?.showNotification(title, { body });
  logger.log("notification shown");
}

export async function acquireNotificationPermissions() {
  logger.log("acquiring notification permissions");
  if (!("Notification" in window)) {
    logger.log("notifications not supported");
    return false; // Not supported
  }

  if (Notification.permission !== "granted") {
    logger.log("requesting notification permissions");
    if ("granted" !== (await Notification.requestPermission())) {
      logger.log("notification permissions denied");
      return false; // Access denied
    }
  }
  logger.log("notification permissions granted");
  return true;
}

async function swReg() {
  if (!("serviceWorker" in navigator)) {
    logger.log("service worker not supported");
    return;
  }

  logger.log("waiting for service worker");
  const reg = await navigator.serviceWorker.ready;
  logger.log("acquired service worker");
  return reg;
}
