import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ColorResolvable } from "discord.js";
import { Command } from "../../structs/types/Command";
import { config } from "../..";

export default new Command({
    name: "unban",
    description: "Desbane um usuário do servidor",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [{
        name: "usuário",
        description: "O usuário que você deseja banir",
        type: ApplicationCommandOptionType.String,
        required: true
    }],

    async run({ interaction }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;

        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                content: 'Você não tem permissão para alterar as configurações do bot',
                ephemeral: true,
            });
            return;
        }

        const userId = interaction.options.getString('usuário');

        if (!userId) {
            const embed = new EmbedBuilder()
                .setDescription('Por favor, forneça o ID do usuário que você deseja desbanir')
                .setColor(config.colors.corbot as ColorResolvable);
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        try {
            const bans = await interaction.guild?.bans.fetch();
            const bannedUser = bans?.find((ban) => ban.user.id === userId);

            if (!bannedUser) {
                const embed = new EmbedBuilder()
                    .setDescription('Este usuário não está banido neste servidor')
                    .setColor(config.colors.corbot as ColorResolvable);
                return await interaction.reply({ embeds: [embed], ephemeral: true });
            }

            await interaction.guild?.bans.remove(bannedUser.user);
            const embed = new EmbedBuilder()
                .setDescription(`Usuário ${bannedUser.user.tag} desbanido com sucesso!`)
                .setColor(config.colors.corbot as ColorResolvable);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            const embed = new EmbedBuilder()
                .setDescription(`Não foi possível desbanir o usuário com ID ${userId}`)
                .setColor(config.colors.corbot as ColorResolvable);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
});