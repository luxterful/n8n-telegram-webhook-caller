import "dotenv/config";
import { Telegraf } from "telegraf";

const { TELEGRAM_BOT_TOKEN, WEBHOOK_URL } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  console.error("TELEGRAM_BOT_TOKEN is required");
  process.exit(1);
}

if (!WEBHOOK_URL) {
  console.error("WEBHOOK_URL is required");
  process.exit(1);
}

async function forwardToWebhook(payload) {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(`Webhook responded with ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error("Failed to call webhook:", err.message);
  }
}

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.on("message", async (ctx) => {
  const payload = {
    message_id: ctx.message.message_id,
    from: ctx.message.from,
    chat: ctx.message.chat,
    date: ctx.message.date,
    text: ctx.message.text,
  };

  console.log("Received message, forwarding to webhook:", payload.text);
  await forwardToWebhook(payload);
});

bot.on("message_reaction", async (ctx) => {
  const update = ctx.messageReaction;
  const payload = {
    type: "reaction",
    message_id: update.message_id,
    chat: update.chat,
    user: update.user,
    date: update.date,
    old_reaction: update.old_reaction,
    new_reaction: update.new_reaction,
  };

  console.log("Received reaction, forwarding to webhook");
  await forwardToWebhook(payload);
});

bot.launch({ allowedUpdates: ["message", "message_reaction"] });
console.log("Bot started");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
