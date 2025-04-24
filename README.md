# Dynamic Logger

A dynamic logging utility for Node.js applications with configurable log levels and file output.

## Installation

```bash
npm install dynamic-logger
```

## Usage

### Basic Setup

1. Install the package and set up environment variables in a `.env` file:

```env
LOG_LEVEL=true # true or false
DEFAULT_LOG_LEVEL=INFO # INFO, WARN, ERROR
LOG_TO_FILE=true # true or false
LOG_DIR=./logs # Custom log directory (optional)
```

2. Import and use the logger in your code:

```javascript
const { logInfo, logWarn, logError } = require('dynamic-logger');

// Load environment variables (if not already loaded)
require('dotenv').config();

// Log messages
logInfo('This is an info message', { userId: 123 });
logWarn('This is a warning message', { module: 'auth' });
logError('This is an error message', { errorCode: 500 });
```

### Configuration

The logger is configured via environment variables or a configuration file. The default configuration is located in `config/logging.js` and can be overridden by environment variables:

- `LOG_LEVEL`: Enable or disable logging (`true` or `false`).
- `DEFAULT_LOG_LEVEL`: Minimum log level to output (`INFO`, `WARN`, `ERROR`).
- `LOG_TO_FILE`: Enable or disable file logging (`true` or `false`).
- `LOG_DIR`: Directory to store log files (default: `./logs`).

### Features

- Logs to console and/or files based on configuration.
- Supports three log levels: `INFO`, `WARN`, `ERROR`.
- Automatically cleans up log files older than 48 hours.
- Outputs logs in JSON format with timestamp and context.
- Configurable log directory.

## License

MIT