"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = require("../../structs/types/Event");
const __1 = require("../..");
const { Guild } = require('./schemas');
exports.default = new Event_1.Event({
    name: "messageUpdate",
    once: false,
    run: async (oldMessage, newMessage) => {
        if (!newMessage.guild || !newMessage.author)
            return;
        const guildData = await Guild.findOne({ id: newMessage.guild.id }) || new Guild({ id: newMessage.guild.id });
        const canalLogId = guildData.moderacao.logsdiscord;
        if (newMessage.author.bot || newMessage.system)
            return;
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(__1.config.colors.corbot)
            .setTitle("mensagem Editada")
            .setThumbnail(newMessage.author.displayAvatarURL())
            .addFields({ name: "Autor", value: newMessage.author.username }, { name: "Canal", value: `<#${newMessage.channel instanceof discord_js_1.TextChannel ? newMessage.channel.id : "Canal Desconhecido"}>` }, { name: "Mensagem Anterior", value: String(oldMessage.content) }, { name: "Mensagem Atualizada", value: String(newMessage.content) })
            .setTimestamp();
        const logChannel = newMessage.guild.channels.cache.get(canalLogId);
        if (logChannel instanceof discord_js_1.TextChannel) {
            logChannel.send({ embeds: [embed] });
        }
    }
});
