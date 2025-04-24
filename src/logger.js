const fs = require('fs');
const path = require('path');
const loggingConfig = require('../config/logging');

// Define log levels in order of priority
const LOG_LEVELS = ["INFO", "WARN", "ERROR"];

// Define log directory (configurable via loggingConfig)
const LOG_DIR = loggingConfig.logDir || path.join(__dirname, '../logs');

// Ensure log directory exists if loggingConfig.logToFile is enabled
if (loggingConfig.logToFile && !fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Helper function to get log file path based on date
function getLogFilePath(type) {
  const date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  return path.join(LOG_DIR, `${type}-${date}.log`);
}

// Write log to file
function writeLogToFile(type, message) {
  if (!loggingConfig.logToFile) return; // Skip writing to file if loggingConfig.logToFile is false
  const logFilePath = getLogFilePath(type);
  fs.appendFileSync(logFilePath, message + '\n', 'utf8');
}

// Cleanup old log files (older than 48 hours)
function cleanupOldLogs() {
  if (!loggingConfig.logToFile) return; // Skip cleanup if loggingConfig.logToFile is false
  const files = fs.readdirSync(LOG_DIR);
  const now = Date.now();

  files.forEach((file) => {
    const filePath = path.join(LOG_DIR, file);
    const stats = fs.statSync(filePath);
    const ageInHours = (now - stats.mtimeMs) / (1000 * 60 * 60);

    if (ageInHours > 48) {
      fs.unlinkSync(filePath); // Delete file
    }
  });
}

// Call cleanup function on startup
cleanupOldLogs();

function shouldLog(level) {
  if (!loggingConfig.defaultLevel) return true; // If no defaultLevel is set, log everything
  const currentLevelIndex = LOG_LEVELS.indexOf(loggingConfig.defaultLevel);
  const messageLevelIndex = LOG_LEVELS.indexOf(level);
  return messageLevelIndex >= currentLevelIndex; // Log only if the message level is equal or higher than the default level
}

function log(message, context = {}, level = "INFO") {
  if (!loggingConfig.enabled || !shouldLog(level)) return; // Skip logging if disabled or level is below the default level

  const entry = {
    level: level,
    message: message,
    timestamp: new Date().toISOString(),
    ...context,
  };

  const jsonString = JSON.stringify(entry);

  // Write to console
  if (level === "INFO") {
    console.log(jsonString);
  } else if (level === "WARN") {
    console.warn(jsonString);
  } else if (level === "ERROR") {
    console.error(jsonString);
  }

  // Write to log files
  if (level === "ERROR") {
    writeLogToFile('error', jsonString); // Write only errors to error.log
  } else {
    writeLogToFile('info', jsonString); // Write info and warnings to info.log
  }
}

module.exports.logInfo = function (message, context = {}) {
  log(message, context, "INFO");
};

module.exports.logWarn = function (message, context = {}) {
  log(message, context, "WARN");
};

module.exports.logError = function (message, context = {}) {
  log(message, context, "ERROR");
};