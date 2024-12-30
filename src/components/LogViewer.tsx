import { useSyncExternalStore } from "react";
import { logger } from "../logger";

export function LogViewer() {
  const logs = useSyncExternalStore(
    logger.subscribe,
    logger.getState,
    logger.getState,
  );
  if (!logs.length) {
    return null;
  }
  return (
    <>
      <h2>Debug log</h2>
      <ul style={{ overflow: "auto", maxHeight: "50vh" }}>
        {logs
          .slice()
          .reverse()
          .map((log, index) => (
            <li key={index}>
              # {logs.length - index} -{" "}
              {log.map((entry, index) => (
                <span key={index}>{stringify(entry)}</span>
              ))}
            </li>
          ))}
      </ul>
    </>
  );
}

function stringify(value: unknown) {
  if ((typeof value === "object" && value !== null) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  return String(value);
}
