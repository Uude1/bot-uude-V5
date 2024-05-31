import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ColorResolvable, TextChannel } from "discord.js";
import { Command } from "../../structs/types/Command";
import { config } from "../..";
const { Guild } = require("../../events/main/schemas")

export default new Command({
    name: "ban",
    description: "Bane um usuário do servidor",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [{
        name: "usuário",
        description: "O usuário que você deseja banir",
        type: ApplicationCommandOptionType.User,
        required: true
    },
    {
        name: "motivo",
        description: "O motivo do banimento",
        type: ApplicationCommandOptionType.String,
        required: true
    }],

    async run({ interaction, options }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;
        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

        let channelban = guildData.moderacao.banchannel

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
            const embed = new EmbedBuilder()
                .setDescription('Por favor, mencione o usuário que você deseja banir')
                .setColor(config.colors.corbot as ColorResolvable);
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const member = interaction.guild?.members.cache.get(user.id);

        if (!member) {
            const embed = new EmbedBuilder()
                .setDescription('Este usuário não é um membro deste servidor')
                .setColor(config.colors.corbot as ColorResolvable);
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!member.bannable) {
            const embed = new EmbedBuilder()
                .setDescription('Eu não tenho permissão para banir este usuário')
                .setColor(config.colors.corbot as ColorResolvable);
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        try {
            await member.ban({ reason });

            const banLogChannelId = `${channelban}`; 
            const banLogChannel = interaction.guild?.channels.cache.get(banLogChannelId);

            setTimeout(() => {

                if (banLogChannel) {
                    const embed = new EmbedBuilder()
                        .setTitle("**NOVO REGISTRO DE BANIMENTO**")
                        .setThumbnail(interaction.guild.iconURL())
                        .setDescription(`**Usuário**: ${user.tag} foi banido\n\n**ID** ${user.id}\n\n**Motivo:** ${reason}\n\n**Por:** ${interaction.user}`)
                        .setFooter({ text: `${interaction.guild.name} © Todos os direitos reservados`, iconURL: interaction.guild.iconURL() || undefined })
                        .setColor("#770505");
                    (banLogChannel as TextChannel).send({ embeds: [embed] });
                }

            }, 3000);


            const replyEmbed = new EmbedBuilder()
                .setDescription(`Usuário ${user.tag} banido com sucesso! Motivo: ${reason}`)
                .setColor(config.colors.corbot as ColorResolvable);
            await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        } catch (error) {
            const embed = new EmbedBuilder()
                .setDescription(`Não foi possível banir o usuário ${user.tag}`)
                .setColor(config.colors.corbot as ColorResolvable);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

    }
});
