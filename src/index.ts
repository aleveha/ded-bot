import { autoRetry } from "@grammyjs/auto-retry";
import { run } from "@grammyjs/runner";
import { Bot } from "grammy";
import { envs } from "~/config/envs";
import { start } from "~/handlers/commands/start";
import logger from "~/utils/logger";

const bot = new Bot(envs.TELEGRAM_TOKEN);
bot.api.config.use(autoRetry({ maxRetryAttempts: Infinity, maxDelaySeconds: Infinity }));

bot.api
	.setMyCommands([{ command: "start", description: "👴🏻 Добавить деда в чат" }])
	.then(() => logger.info("Commands are set"))
	.catch(logger.error);

bot.command("start", start);

const runner = run(bot);

async function stopRunner() {
	if (runner.isRunning()) {
		await runner.stop();
	}
}

process.once("SIGINT", stopRunner);
process.once("SIGTERM", stopRunner);
