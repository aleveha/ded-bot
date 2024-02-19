import { env } from "node:process";
import "dotenv/config.js";
import { cleanEnv, str } from "envalid";
import logger from "~/utils/logger";

export const envs = cleanEnv(env, {
	TELEGRAM_TOKEN: str(),
});

logger.info({ ...envs }, "Environment variables loaded successfully.");
