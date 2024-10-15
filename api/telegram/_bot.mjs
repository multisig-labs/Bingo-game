import { Bot } from "grammy";

export const telegram = () => {
  const { TELEGRAM_BOT: token = "" } = process.env;
  if (!token) {
    throw new Error("TELEGRAM_BOT is not defined in environment variables");
  }
  return new Bot(token);
};

export const bot = telegram();
bot.catch(console.error);
