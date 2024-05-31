import { EmbedBuilder, ColorResolvable } from "discord.js";
import { Event } from "../../structs/types/Event";
import { config } from "../..";
const { Guild } = require('./schemas');

// Cache para armazenar os dados das guildas
const guildCache = new Map();

export default new Event({
    name: "messageCreate",
    once: true,
    run: async (message) => {
        const guildId = message.guildId;
        let guildData = guildCache.get(guildId);

        if (!guildData) {
            guildData = await Guild.findOne({ id: guildId }) || new Guild({ id: guildId });
            guildCache.set(guildId, guildData);
        }

        const canal = guildData.moderacao.sugestoeschannel;

        if (message.channel.id === canal) {
            if (message.author.bot) return;

            const embed = new EmbedBuilder()
                .setColor(config.colors.corbot as ColorResolvable)
                .setTitle("Sugestão")
                .setDescription(`**Autor:** ${message.author}\n\n**Sugestão:**\n${message.content}`)
                .setFooter({ text: `ID do Autor: ${message.author.id}` })
                .setThumbnail(message.author.avatarURL())
                .setTimestamp();

            message.delete().catch(console.error);

            message.channel.send({ embeds: [embed] })
                .then(async (sentMessage) => {
                    const emoji_certo = "<:fusionsim:1098335873055084605>";
                    const emoji_cert1 = "<:1ztanto_faz:1120104926916390956>";
                    const emoji_errado = "<:fusionnao:1098335933281095730>";

                    await sentMessage.react(emoji_certo).catch(() => { });
                    await sentMessage.react(emoji_cert1).catch(() => { });
                    await sentMessage.react(emoji_errado).catch(() => { });
                })
                .catch(console.error);
        }
    }
});
