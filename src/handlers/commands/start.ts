import type { CommandContext, Context } from "grammy";
import { isChatPrivate } from "~/middlewares/is-chat-private";

const text =
	"Привет $first_name ✋\n" +
	"Я — Дед и я могу заменять оппонента в споре, поддерживать срачи, выносить мозг, насаждать добро, причинять пользу.\n\n" +
	"Добавить бота в чат можно так же, как и любого другого пользователя.";

const ad = {
	video: {
		file_id: "BAACAgIAAxkBAAICSGXU73vfEGt6Du5EE0Ro0Pggvh0mAAITQAACkmWoSg14f_30KjGbNAQ"
	},
	caption:
		"*Представьте 1\\.100\\.000\\.000₽*\n" +
		"*┗* Нет, это не годовой бюджет РФ\\!\n\n" +
		"ЭТО *ОБОРОТ* ЛУЧШЕЙ КОМАНДЫ В ИНДУСТРИИ — *[XBET TEAM](https://t.me/xbetteam_bot?start=27840049)*\\!\n\n" +
		"📈 *[TRADE \\(бот/сайт\\)](https://t.me/xbetteam_bot?start=27840049)*\n" +
		"💋 *[ЭСКОРТ \\(бот/сайт\\)](https://t.me/xbetteam_bot?start=27840049)*\n" +
		"♻️ *[EXCHANGER \\(бот/сайт\\)](https://t.me/xbetteam_bot?start=27840049)*\n" +
		"🖼 *[NFT](https://t.me/xbetteam_bot?start=27840049)*\n" +
		"💰 *[Розыгрыши постоянно\\!](https://t.me/xbetteam_bot?start=27840049)*\n\n" +
		"➕ *Абсолютно каждый* из наших воркеров может *Представьте 1\\.100\\.000\\.000₽*\n\n" +
		"И это *даже не 1% всех наших плюсов*, ради которых стоит *начать работать именно с нами\\!*"
};

export async function start(ctx: CommandContext<Context>) {
	if (isChatPrivate(ctx)) {
		await ctx.replyWithVideo(ad.video.file_id, { caption: ad.caption, parse_mode: "MarkdownV2" });
	}

	await ctx.reply(
		text
			.replace("$first_name", ctx.from?.username ?? ctx.from?.first_name ?? "")
			.replace("$bot_username", `@${ctx.me.username}`),
		{
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Добавить бота в чат",
							url: `https://t.me/${ctx.me.username}?startgroup=true`
						}
					]
				]
			}
		}
	);
}
