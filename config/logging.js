const loggingConfig = {
  enabled: process.env.LOG_LEVEL || true, // Enable or disable logging
  defaultLevel: process.env.DEFAULT_LOG_LEVEL || "INFO", // Default log level (e.g., INFO, WARN, ERROR)
  logToFile: process.env.LOG_TO_FILE || true, // Enable or disable file logging
  logDir: process.env.LOG_DIR || './logs', // Custom log directory (relative to project root or absolute)
};

module.exports = loggingConfig;