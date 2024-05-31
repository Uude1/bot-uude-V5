"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const __1 = require("../..");
exports.default = new Command_1.Command({
    name: "perdir",
    description: "comando para pedir setagem",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [{
            name: "set",
            description: "comando para pedir setagem",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [{
                    name: "nome",
                    description: "mencione quem sera setado",
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "id",
                    description: "Informe o id de quem sera setado",
                    type: discord_js_1.ApplicationCommandOptionType.Number,
                    required: true
                },
                {
                    name: "fac-org",
                    description: "Qual fac/org sera setado",
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "tipo-de-setagem",
                    description: "discord ou jogo",
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "ordem-de-setagem",
                    description: "mecione Quem mandou setar",
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true
                }]
        }],
    run: async ({ interaction, options }) => {
        await interaction.deferReply({ fetchReply: true });
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
            return;
        if (options.getSubcommand() === "set") {
            const nome = options.getString("nome");
            const ID = options.getNumber("id");
            const org = options.getString("fac-org");
            const ts = options.getString("tipo-de-setagem");
            const os = options.getString("ordem-de-setagem");
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(__1.config.colors.corbot)
                .setThumbnail(interaction.guild.iconURL())
                .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: `${interaction.user.tag} << Membro que Pediu` })
                .setTitle("Pedido de Setagem:")
                .setDescription(`**> Nome:**\n${nome}\n**> ID no jogo:**\n${ID}\n**> Organizaçao:**\n${org}\n**> Tipo de Setagem:**\n${ts}\n**> Ordem da Sentagem:**\n${os}`)
                .setFooter({ text: "✅ - Membro Setado | ❌ - Membro não Setado" });
            await interaction.editReply({ embeds: [embed] }).then(msg => {
                msg.react('✅');
                msg.react('❌');
            });
        }
    }
});
