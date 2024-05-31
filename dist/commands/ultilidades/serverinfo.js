"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
exports.default = new Command_1.Command({
    name: "serverinfo",
    description: "Veja as informações do servidor.",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    async run({ interaction }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
            return;
        const createdAt = interaction.guild.createdAt || new Date();
        const embed = new discord_js_1.EmbedBuilder({
            author: {
                name: `${interaction.guild.name}`,
                iconURL: `${interaction.guild.iconURL() || undefined}`,
            },
            fields: [
                {
                    name: "Informações do servidor",
                    value: `📋 Nome: ${interaction.guild.name}\n🆔 ID: ${interaction.guild.id}\n📑 Descrição: ${interaction.guild.description || "Sem Descrição"}\n👑 Dono: ${interaction.guild.members.cache.get(interaction.guild.ownerId)}\n📅 Data de criação: <t:${~~(createdAt.getTime() / 1000)}:R>`,
                    inline: false,
                },
                {
                    name: "Informações de canais",
                    value: `🗨️ Texto: ${interaction.guild.channels.cache.filter((canal) => canal.type === discord_js_1.ChannelType.GuildText).size}\n 🔊 Voz: ${interaction.guild.channels.cache.filter((canal) => canal.type === discord_js_1.ChannelType.GuildVoice).size}\n📋 Categoria: ${interaction.guild.channels.cache.filter((canal) => canal.type === discord_js_1.ChannelType.GuildCategory).size}\n📂 Total: ${interaction.guild.channels.cache.size}`,
                    inline: false,
                },
                {
                    name: "Informações de membros",
                    value: `👥 Membros: ${interaction.guild.members.cache.filter((membro) => membro.user).size}\n🤖 Bots: ${interaction.guild.members.cache.filter((membro) => membro.user.bot)
                        .size}\n📋 Total: ${interaction.guild.memberCount}`,
                    inline: false,
                },
                {
                    name: "Informações de emojis",
                    value: `🙂 Estáticos: ${interaction.guild.emojis.cache.filter((emoji) => !emoji.animated)
                        .size}\n😎 Animados: ${interaction.guild.emojis.cache.filter((emoji) => emoji.animated)
                        .size}\n📋 Total: ${interaction.guild.emojis.cache.size}`,
                    inline: false,
                },
                {
                    name: "Informações de cargos",
                    value: `📋 Total: ${interaction.guild.roles.cache.size}`,
                    inline: false,
                },
            ],
            color: 0x2e8dff,
            thumbnail: { url: `${interaction.guild.iconURL() || undefined}` },
            timestamp: new Date(),
        });
        const button = new discord_js_1.ButtonBuilder({
            emoji: "🔗",
            label: "Ver ícone de servidor",
            style: discord_js_1.ButtonStyle.Link,
            url: `${interaction.guild.iconURL() || undefined}`,
        });
        const row = new discord_js_1.ActionRowBuilder({ components: [button] });
        interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },
});
