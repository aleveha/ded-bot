import type { Context } from "grammy";

export function isBotReply(ctx: Context) {
	return ctx.msg?.reply_to_message?.from?.username === ctx.me.username;
}
