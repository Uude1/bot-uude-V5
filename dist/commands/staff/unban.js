"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const __1 = require("../..");
exports.default = new Command_1.Command({
    name: "unban",
    description: "Desbane um usuário do servidor",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [{
            name: "usuário",
            description: "O usuário que você deseja banir",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        }],
    async run({ interaction }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
            return;
        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                content: 'Você não tem permissão para alterar as configurações do bot',
                ephemeral: true,
            });
            return;
        }
        const userId = interaction.options.getString('usuário');
        if (!userId) {
            const embed = new discord_js_1.EmbedBuilder()
                .setDescription('Por favor, forneça o ID do usuário que você deseja desbanir')
                .setColor(__1.config.colors.corbot);
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }
        try {
            const bans = await interaction.guild?.bans.fetch();
            const bannedUser = bans?.find((ban) => ban.user.id === userId);
            if (!bannedUser) {
                const embed = new discord_js_1.EmbedBuilder()
                    .setDescription('Este usuário não está banido neste servidor')
                    .setColor(__1.config.colors.corbot);
                return await interaction.reply({ embeds: [embed], ephemeral: true });
            }
            await interaction.guild?.bans.remove(bannedUser.user);
            const embed = new discord_js_1.EmbedBuilder()
                .setDescription(`Usuário ${bannedUser.user.tag} desbanido com sucesso!`)
                .setColor(__1.config.colors.corbot);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
        catch (error) {
            const embed = new discord_js_1.EmbedBuilder()
                .setDescription(`Não foi possível desbanir o usuário com ID ${userId}`)
                .setColor(__1.config.colors.corbot);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
});
