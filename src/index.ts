import { run } from "@grammyjs/runner";
import { Bot } from "grammy";
import { envs } from "~/config/envs";

const bot = new Bot(envs.TELEGRAM_TOKEN);

bot.on("message", (ctx) => ctx.reply("Hi there!"));

const runner = run(bot);

async function stopRunner() {
	if (runner.isRunning()) {
		await runner.stop();
	}
}

process.once("SIGINT", stopRunner);
process.once("SIGTERM", stopRunner);
