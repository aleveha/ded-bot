import type { Context } from "grammy";

export function isChatPrivate(ctx: Context) {
	return ctx.chat?.type === "private";
}
