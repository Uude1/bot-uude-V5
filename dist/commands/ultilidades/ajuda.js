"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const __1 = require("../..");
exports.default = new Command_1.Command({
    name: "ajuda",
    description: "veja meus comandos",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    async run({ interaction }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
            return;
        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                content: 'Você não tem permissão usar esse comando!',
                ephemeral: true,
            });
            return;
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setAuthor({ name: `MEUS COMANDOS DISPONIVEIS` })
            .setThumbnail(interaction.user.displayAvatarURL() || null)
            .setDescription(`**\`\`\`\/add veiculo\`\`\`**\n__Adicioner um veiculo da garagem de um player__\n\n**\`\`\`\/add wl\`\`\`\**\n__libere um id da cidade sem nescesidade de fazer a wl__\n\n**\`\`\`\/adv\`\`\`\**\n__Da uma adventencia a um player que derespetou as regras da cidade com logs__\n\n**\`\`\`\ajuda\`\`\`\**\n__Não saber como usar meus comandos então ultilizer /ajuda__`)
            .setColor(__1.config.colors.corbot);
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
});
