"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const __1 = require("../..");
const { Guild } = require("../../events/main/schemas");
exports.default = new Command_1.Command({
    name: "ban",
    description: "Bane um usuário do servidor",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [{
            name: "usuário",
            description: "O usuário que você deseja banir",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "motivo",
            description: "O motivo do banimento",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        }],
    async run({ interaction, options }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
            return;
        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });
        let channelban = guildData.moderacao.banchannel;
        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                content: 'Você não tem permissão para usar esse comando!',
                ephemeral: true,
            });
            return;
        }
        const user = options.getUser('usuário');
        const reason = options.getString('motivo') ?? 'Sem motivo';
        if (!user) {
            const embed = new discord_js_1.EmbedBuilder()
                .setDescription('Por favor, mencione o usuário que você deseja banir')
                .setColor(__1.config.colors.corbot);
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }
        const member = interaction.guild?.members.cache.get(user.id);
        if (!member) {
            const embed = new discord_js_1.EmbedBuilder()
                .setDescription('Este usuário não é um membro deste servidor')
                .setColor(__1.config.colors.corbot);
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }
        if (!member.bannable) {
            const embed = new discord_js_1.EmbedBuilder()
                .setDescription('Eu não tenho permissão para banir este usuário')
                .setColor(__1.config.colors.corbot);
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }
        try {
            await member.ban({ reason });
            const banLogChannelId = `${channelban}`;
            const banLogChannel = interaction.guild?.channels.cache.get(banLogChannelId);
            setTimeout(() => {
                if (banLogChannel) {
                    const embed = new discord_js_1.EmbedBuilder()
                        .setTitle("**NOVO REGISTRO DE BANIMENTO**")
                        .setThumbnail(interaction.guild.iconURL())
                        .setDescription(`**Usuário**: ${user.tag} foi banido\n\n**ID** ${user.id}\n\n**Motivo:** ${reason}\n\n**Por:** ${interaction.user}`)
                        .setFooter({ text: `${interaction.guild.name} © Todos os direitos reservados`, iconURL: interaction.guild.iconURL() || undefined })
                        .setColor("#770505");
                    banLogChannel.send({ embeds: [embed] });
                }
            }, 3000);
            const replyEmbed = new discord_js_1.EmbedBuilder()
                .setDescription(`Usuário ${user.tag} banido com sucesso! Motivo: ${reason}`)
                .setColor(__1.config.colors.corbot);
            await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        }
        catch (error) {
            const embed = new discord_js_1.EmbedBuilder()
                .setDescription(`Não foi possível banir o usuário ${user.tag}`)
                .setColor(__1.config.colors.corbot);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
});
