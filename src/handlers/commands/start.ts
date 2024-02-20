import type { CommandContext, Context } from "grammy";

const text =
	"Привет $first_name ✋\n" +
	"Я — Дед и я могу заменять оппонента в споре, поддерживать срачи, выносить мозг, насаждать добро, причинять пользу.\n\n" +
	"Добавить бота в чат можно так же, как и любого другого пользователя.\n\n" +
	"Свойства чата — добавить пользователя, в поиске найти $bot_username или нажать ниже кнопку «Добавить в чат» — никакой магии";

export async function start(ctx: CommandContext<Context>) {
	await ctx.reply(
		text
			.replace("$first_name", ctx.from?.username ?? ctx.from?.first_name ?? "")
			.replace("$bot_username", `@${ctx.me.username}`),
		{
			reply_markup: {
				inline_keyboard: [[{ text: "Добавить бота в чат", url: `https://t.me/${ctx.me.username}?startgroup=true` }]]
			}
		}
	);
}
