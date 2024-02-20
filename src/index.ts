import { autoRetry } from "@grammyjs/auto-retry";
import { run } from "@grammyjs/runner";
import { Bot } from "grammy";
import { envs } from "~/config/envs";
import { prediction } from "~/handlers/commands/prediction";
import { start } from "~/handlers/commands/start";
import { granddad } from "~/handlers/triggers/granddad";
import logger from "~/utils/logger";

const bot = new Bot(envs.TELEGRAM_TOKEN);
bot.api.config.use(autoRetry({ maxRetryAttempts: Infinity, maxDelaySeconds: Infinity }));

bot.api
	.setMyCommands([
		{ command: "start", description: "👴 Добавить деда в чат" },
		{ command: "pred", description: "🃏 Предсказание от деда" }
	])
	.then(() => logger.info("Commands are set"))
	.catch(logger.error);

bot.command("start", start);
bot.command("pred", prediction);
bot.hears(/дед/gim, granddad);
bot.filter((ctx) => ctx.chat?.type === "private").use(granddad);

bot.catch((err) => logger.error(err));

const runner = run(bot);

async function stopRunner() {
	if (runner.isRunning()) {
		await runner.stop();
	}
}

process.once("SIGINT", stopRunner);
process.once("SIGTERM", stopRunner);
