"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const __1 = require("../..");
exports.default = new Command_1.Command({
    name: "dm",
    description: "Envia uma mensagem direta para um usuário.",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [{
            name: "usuário",
            description: "Usuário para quem enviar a mensagem",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "mensagem",
            description: "'Mensagem a ser enviada",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        }],
    async run({ interaction, options }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
            return;
        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                content: 'Você não tem permissão usar esse comando!',
                ephemeral: true,
            });
            return;
        }
        const user = interaction.options.getUser('usuário');
        const messageContent = options.getString('mensagem');
        if (!user) {
            await interaction.reply('Usuário não encontrado.');
            return;
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(__1.config.colors.corbot)
            .setAuthor({ name: `Você recebeu uma mensagem de ${interaction.user.username}!`, iconURL: interaction.user?.displayAvatarURL() })
            .setThumbnail(interaction.user?.displayAvatarURL())
            .addFields({ name: 'Lembrar:', value: `Não me responda porque ${interaction.user.tag} não receberá a resposta, leve suas coisas para a dms deles :)` })
            .addFields({ name: `Mensagem de: ${user}`, value: `${messageContent}` })
            .setFooter({ iconURL: interaction.user.displayAvatarURL(), text: "Fico contente em ajudar" })
            .setTimestamp();
        const embed1 = new discord_js_1.EmbedBuilder()
            .setColor(__1.config.colors.corbot)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user?.displayAvatarURL() })
            .setDescription(`Sua mensagem foi enviada com sucesso para ${user}`);
        interaction.reply({ embeds: [embed1], ephemeral: true });
        await user.send({ embeds: [embed] });
    }
});
