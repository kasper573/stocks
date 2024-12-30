class Logger {
  private entries: LogEntry[] = [];
  private subscriptions = new Set<LogHandler>();

  log = (...entry: LogEntry) => {
    this.entries = [...this.entries, entry];
  };

  getState = (): ReadonlyArray<LogEntry> => this.entries;

  subscribe = (handler: LogHandler) => {
    this.subscriptions.add(handler);
    return () => this.subscriptions.delete(handler);
  };
}

type LogEntry = unknown[];
type LogHandler = (entry: LogEntry) => unknown;

export const logger = new Logger();
