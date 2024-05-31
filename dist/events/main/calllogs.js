"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = require("../../structs/types/Event");
const __1 = require("../..");
const { Guild } = require('./schemas');
exports.default = new Event_1.Event({
    name: "voiceStateUpdate",
    once: false,
    run: async (oldState, newState) => {
        const guildData = await Guild.findOne({ id: newState.guild.id }) || new Guild({ id: newState.guild.id });
        const canalLogId = guildData.moderacao.logsdiscord;
        const logChannel = canalLogId ? oldState.guild.channels.cache.get(canalLogId) : null;
        if (!oldState.channelId && newState.channelId) {
            const user = newState.member?.user;
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(__1.config.colors.corbot)
                .setTitle("Entrou em um canal de voz")
                .setThumbnail(user?.displayAvatarURL() || "")
                .setDescription(`O usuário ${user?.username} entrou no canal de voz ${newState.channel?.name}`)
                .setTimestamp();
            const logChannel = canalLogId ? oldState.guild.channels.cache.get(canalLogId) : null;
            if (logChannel instanceof discord_js_1.TextChannel) {
                logChannel.send({ embeds: [embed] });
            }
        }
        if (oldState.channelId && !newState.channelId) {
            const user = oldState.member?.user;
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(__1.config.colors.corbot)
                .setThumbnail(user?.displayAvatarURL() || "")
                .setTitle("Saiu de um canal de voz")
                .setDescription(`O usuário ${user?.username} saiu do canal de voz ${oldState.channel?.name}`)
                .setTimestamp();
            if (logChannel instanceof discord_js_1.TextChannel) {
                logChannel.send({ embeds: [embed] });
            }
        }
    },
});
