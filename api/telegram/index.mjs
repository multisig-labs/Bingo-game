import { webhookCallback } from "grammy";
import { bot } from "./_bot.mjs";

const { TELEGRAM_CHAT_ID: token = "-4538791823" } = process.env;
console.log("hi");
bot.command("setmycommands", async (ctx) => {
  const commands = [
    { command: "winner", description: "Add winner to db" },
    { command: "start", description: "Begin the game" },
  ];
  await bot.api.setMyCommands(commands);
  await ctx.reply("Bot commands have been updated.");
});

bot.command("start", (ctx) => {
  //supabase add
});

bot.command("winner", (ctx) => {
  console.log({ ctx });
  const twitterUsername = ctx.match;
  console.log({ twitterUsername });
  if (twitterUsername === "") {
    ctx.api.sendMessage(
      token,
      "No username - call the command with the userName (e.g. /winner @testUsername)"
    );
  } else {
    ctx.api.sendMessage(token, "hi", {
      parse_mode: "MarkdownV2",
    });
  }
});
// webhookCallback will make sure that the correct middleware(listener) function is called
export const POST = webhookCallback(bot, "std/http");
