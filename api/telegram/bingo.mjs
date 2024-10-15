import { bot } from "./_bot.mjs";

const { TELEGRAM_CHAT_ID: chatId = "" } = process.env;

const constructMessage = (userName) => {
  return `${userName} has a bingo🔥`;
};

export async function GET(req, res) {
  const url = new URL(req.url);
  const userName = url.searchParams.get("userName");

  try {
    await bot.api.sendMessage(chatId, constructMessage(userName), {
      parse_mode: "MarkdownV2",
    });

    return new Response("Update sent successfully");
  } catch (error) {
    console.error("Error in L1 API route:", error);
    return new Response({ error: "Internal server error" }, { status: 500 });
  }
}
