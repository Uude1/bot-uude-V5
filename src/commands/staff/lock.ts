import { ApplicationCommandType, EmbedBuilder, ColorResolvable, TextChannel } from "discord.js";
import { Command } from "../../structs/types/Command";
import { config } from "../..";

export default new Command({
    name: "lock",
    description: "Trava um canal de texto.",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    
    async run({ interaction }) {
        if (!interaction.inCachedGuild()) return;

        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                content: 'Você não tem permissão usar esse comando!',
                ephemeral: true,
            });
            
        } else {
            const embed = new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name })
                .setTitle('Canal Trancado🔒')
                .setColor(config.colors.corbot as ColorResolvable)
                .setDescription(`Este chat foi trancado com sucesso por: ${interaction.user}`);

            interaction.reply({ embeds: [embed] }).then((msg: any) => {
                const channel = interaction.channel as TextChannel;
                channel.permissionOverwrites.edit(interaction.guild?.id as string, { SendMessages: false }).catch((e: any) => {
                    interaction.editReply('❌ Ops, algo deu errado ao tentar trancar este chat.');
                });
            }
            )
        }
    }
});