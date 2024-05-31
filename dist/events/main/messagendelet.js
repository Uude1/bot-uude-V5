"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = require("../../structs/types/Event");
const __1 = require("../..");
const { Guild } = require('./schemas');
exports.default = new Event_1.Event({
    name: "messageDelete",
    once: false,
    run: async (newMessage) => {
        if (!newMessage.guild || !newMessage.author)
            return;
        if (newMessage.author.bot || newMessage.system)
            return;
        const guildData = await Guild.findOne({ id: newMessage.guild.id }) || new Guild({ id: newMessage.guild.id });
        const canalLogId = guildData.moderacao.logsdiscord;
        const logChannel = newMessage.guild.channels.cache.get(canalLogId);
        if (logChannel instanceof discord_js_1.TextChannel) {
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(__1.config.colors.corbot)
                .setTitle("Mensagem Deletada")
                .setThumbnail(newMessage.author.displayAvatarURL())
                .setDescription(`Uma mensagem foi deletada por ${newMessage.author.username}`)
                .addFields({ name: "Canal", value: `<#${newMessage.channel instanceof discord_js_1.TextChannel ? newMessage.channel.id : "Canal Desconhecido"}>` })
                .addFields({ name: "Conteúdo da mensagem", value: newMessage.content || "Mensagem vazia" })
                .setTimestamp();
            logChannel.send({ embeds: [embed] });
        }
    }
});
