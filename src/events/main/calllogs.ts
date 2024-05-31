import { ColorResolvable, EmbedBuilder, TextChannel } from "discord.js";
import { Event } from "../../structs/types/Event";
import { config } from "../..";
const { Guild } = require('./schemas');

export default new Event({
    name: "voiceStateUpdate",
    once: false,
    run: async (oldState, newState) => {
        const guildData = await Guild.findOne({ id: newState.guild.id }) || new Guild({ id: newState.guild.id });

        const canalLogId = guildData.moderacao.logsdiscord;
        const logChannel = canalLogId ? oldState.guild.channels.cache.get(canalLogId) : null;

        if (!oldState.channelId && newState.channelId) {
            const user = newState.member?.user;

            const embed = new EmbedBuilder()
                .setColor(config.colors.corbot as ColorResolvable)
                .setTitle("Entrou em um canal de voz")
                .setThumbnail(user?.displayAvatarURL() || "")
                .setDescription(`O usuário ${user?.username} entrou no canal de voz ${newState.channel?.name}`)
                .setTimestamp();

            const logChannel = canalLogId ? oldState.guild.channels.cache.get(canalLogId) : null;
            if (logChannel instanceof TextChannel) {
                logChannel.send({ embeds: [embed] });
            }
        }

        if (oldState.channelId && !newState.channelId) {
            const user = oldState.member?.user;

            const embed = new EmbedBuilder()
                .setColor(config.colors.corbot as ColorResolvable)
                .setThumbnail(user?.displayAvatarURL() || "")
                .setTitle("Saiu de um canal de voz")
                .setDescription(`O usuário ${user?.username} saiu do canal de voz ${oldState.channel?.name}`)
                .setTimestamp();

            if (logChannel instanceof TextChannel) {
                logChannel.send({ embeds: [embed] });
            }
        }
    },
});
