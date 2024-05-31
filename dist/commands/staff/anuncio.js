"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const __1 = require("../..");
exports.default = new Command_1.Command({
    name: "anuncio",
    description: "Envie uma mensagem de anuncio ou uma messagem normal em um canal de texto",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [
        {
            name: "mensagem",
            description: "mensagem que você quer enviar",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "titulo",
            description: "titulo do aviso",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "imagem",
            description: "mensagem que você quer enviar",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "link-botão",
            description: "link de algum site que você quer enviar",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async run({ interaction, options }) {
        if (!interaction.inCachedGuild())
            return;
        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                content: 'Você não tem permissão para usar esse comando!',
                ephemeral: true,
            });
            return;
        }
        const roleManager = interaction.guild.roles;
        const title = options.getString("titulo");
        const mensagem = options.getString("mensagem");
        const imagem = options.getString("imagem");
        const button = options.getString("link-botão");
        const embed = new discord_js_1.EmbedBuilder()
            .setDescription(`${mensagem}`)
            .setAuthor({ name: `${interaction.guild?.name}`, iconURL: interaction.guild?.iconURL() || undefined })
            .setColor(__1.config.colors.corbot)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "Comunicado Oficial Da Cidade", iconURL: interaction.guild?.iconURL() || undefined })
            .setTimestamp();
        if (title) {
            embed.setTitle(`${title}`);
        }
        if (imagem) {
            embed.setImage(`${imagem}`);
        }
        if (button) {
            const botao = new discord_js_1.ButtonBuilder({
                label: "Acesse aqui",
                style: discord_js_1.ButtonStyle.Link,
                url: `${button}`
            });
            let row = new discord_js_1.ActionRowBuilder({ components: [botao] });
            interaction.reply({ content: `Aviso enviado com sucesso`, ephemeral: true });
            interaction.channel?.send({ content: `${roleManager.everyone}`, embeds: [embed], components: [row] });
        }
        else {
            interaction.reply({ content: `Aviso enviado com sucesso`, ephemeral: true });
            interaction.channel?.send({ content: `${roleManager.everyone}`, embeds: [embed] });
        }
    }
});
