# Node Dynamic Logger

A dynamic logging utility for Node.js applications with configurable log levels and file output.

## Installation

```bash
npm install node-dynamic-logger
```

## Usage

### Basic Setup

1. Create a `.env` file in your project root to configure the logger:

```env
LOG_LEVEL=true # true or false
DEFAULT_LOG_LEVEL=INFO # INFO, WARN, ERROR
LOG_TO_FILE=true # true or false
LOG_DIR=./logs # Custom log directory (optional)
```

2. Use the logger in your code. No need to manually load the `.env` file—the package does it automatically:

```javascript
const { logInfo, logWarn, logError } = require('node-dynamic-logger');

// Log messages
logInfo('This is an info message', { userId: 123 });
logWarn('This is a warning message', { module: 'auth' });
logError('This is an error message', { errorCode: 500 });
```

### Custom `.env` File Path

If your `.env` file is not in the project root or has a different name, you can specify a custom path using the `configure` function:

```javascript
const { configure, logInfo } = require('node-dynamic-logger');

// Load a custom .env file
configure({ envPath: './config/custom.env' });

// Log a message
logInfo('This is an info message', { userId: 123 });
```

### Programmatic Configuration

You can configure the logger programmatically without using a `.env` file:

```javascript
const { configure, logInfo } = require('node-dynamic-logger');

// Configure the logger
configure({
  enabled: true,
  defaultLevel: 'INFO',
  logToFile: true,
  logDir: './custom_logs',
});

// Log a message
logInfo('This is an info message', { userId: 123 });
```

### Configuration Options

The logger is configured via a `.env` file, the `configure` function, or defaults. The following options are supported:

- `enabled`: Enable or disable logging (`true` or `false`, default: `true`).
- `defaultLevel`: Minimum log level to output (`INFO`, `WARN`, `ERROR`, default: `ERROR`).
- `logToFile`: Enable or disable file logging (`true` or `false`, default: `true`).
- `logDir`: Directory to store log files (default: `./logs`).
- `envPath`: Path to a custom `.env` file (optional, default: `./.env`).

If no `.env` file is found, the logger uses default values. You can also set environment variables directly in your environment (e.g., via `export LOG_LEVEL=true`).

### Features

- Automatically loads environment variables from a `.env` file.
- Logs to console and/or files based on configuration.
- Supports three log levels: `INFO`, `WARN`, `ERROR`.
- Automatically cleans up log files older than 48 hours.
- Outputs logs in JSON format with timestamp and context.
- Configurable log directory.

## License

MIT