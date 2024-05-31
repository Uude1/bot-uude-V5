import { ColorResolvable, EmbedBuilder, TextChannel, APIEmbedField } from "discord.js";
import { Event } from "../../structs/types/Event";
import { config } from "../..";
const { Guild } = require('./schemas');

export default new Event({
    name: "messageUpdate",
    once: false,
    run: async (oldMessage, newMessage) => {
        if (!newMessage.guild || !newMessage.author) return;

        const guildData = await Guild.findOne({ id: newMessage.guild.id }) || new Guild({ id: newMessage.guild.id });
        const canalLogId = guildData.moderacao.logsdiscord;

        if (newMessage.author.bot || newMessage.system) return;

        const embed = new EmbedBuilder()
            .setColor(config.colors.corbot as ColorResolvable) 
            .setTitle("mensagem Editada")
            .setThumbnail(newMessage.author.displayAvatarURL())
            .addFields(
                { name: "Autor", value: newMessage.author.username },
                { name: "Canal", value: `<#${newMessage.channel instanceof TextChannel ? newMessage.channel.id : "Canal Desconhecido"}>` },
                { name: "Mensagem Anterior", value: String(oldMessage.content) },
                { name: "Mensagem Atualizada", value: String(newMessage.content) }
            )
            .setTimestamp();

        const logChannel = newMessage.guild.channels.cache.get(canalLogId);
        if (logChannel instanceof TextChannel) {
            logChannel.send({ embeds: [embed] });
        }
    }
});
