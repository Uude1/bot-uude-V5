import { ApplicationCommandType, EmbedBuilder, ColorResolvable, TextChannel } from "discord.js";
import { Command } from "../../structs/types/Command";

export default new Command({
    name: "unlock",
    description: "Destrancar um canal que está privado",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    async run({ interaction }) {
        if (!interaction.inCachedGuild()) return;

        let embed1 = new EmbedBuilder()
            .setDescription(`Você não tem permissão usar esse comando!`)
            .setColor("Red")

        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                embeds: [embed1],
                ephemeral: true,
            });

            let channel = interaction.channel as TextChannel;

            let embed = new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name })
                .setTitle('Canal Destrancado🔓')
                .setColor("Green")
                .setDescription(`Este chat foi destrancado com sucesso por: ${interaction.user}`);

            interaction.reply({ embeds: [embed] }).then((msg: any) => {
                channel.permissionOverwrites.edit(interaction.guild?.id as string, { SendMessages: true }).catch((e: any) => {
                    interaction.editReply({ content: '❌ Ops, algo deu errado ao tentar trancar este chat.' });
                });
            });
        }
    },
});
