import { ColorResolvable, EmbedBuilder, TextChannel } from "discord.js";
import { Event } from "../../structs/types/Event";
import { config } from "../..";
const { Guild } = require('./schemas');

export default new Event({
    name: "messageDelete",
    once: false,
    run: async (newMessage) => {
        if (!newMessage.guild || !newMessage.author) return; 
        if (newMessage.author.bot || newMessage.system) return;

        const guildData = await Guild.findOne({ id: newMessage.guild.id }) || new Guild({ id: newMessage.guild.id });

        const canalLogId = guildData.moderacao.logsdiscord;
        const logChannel = newMessage.guild.channels.cache.get(canalLogId);
        
        if (logChannel instanceof TextChannel) {
            const embed = new EmbedBuilder()
                .setColor(config.colors.corbot as ColorResolvable)
                .setTitle("Mensagem Deletada")
                .setThumbnail(newMessage.author.displayAvatarURL())
                .setDescription(`Uma mensagem foi deletada por ${newMessage.author.username}`)
                .addFields({ name: "Canal", value: `<#${newMessage.channel instanceof TextChannel ? newMessage.channel.id : "Canal Desconhecido"}>` })
                .addFields({ name: "Conteúdo da mensagem", value: newMessage.content || "Mensagem vazia" })
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    }
});
