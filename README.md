# n8n-telegram-webhook-caller

Telegram bot that forwards incoming messages to a configurable n8n webhook URL.

## Configuration

| Variable             | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token from [@BotFather](https://t.me/BotFather) |
| `WEBHOOK_URL`        | URL to receive POST requests with message data                    |

## Run with Docker

```sh
docker build -t telegram-webhook-caller .
docker run -e TELEGRAM_BOT_TOKEN=your-token -e WEBHOOK_URL=https://example.com/webhook telegram-webhook-caller
```
