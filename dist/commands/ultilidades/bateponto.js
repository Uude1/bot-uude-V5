"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const __1 = require("../..");
exports.default = new Command_1.Command({
    name: "bater-ponto",
    description: "Bater ponto",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    async run({ interaction }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
            return;
        const botaoEncerrar = new discord_js_1.ButtonBuilder({
            customId: "encerrar",
            label: "Encerrar",
            style: discord_js_1.ButtonStyle.Danger,
            emoji: "863940875671306270"
        });
        let startTime = interaction.createdTimestamp;
        let elapsedTime = 0;
        let intervalId = setInterval(() => {
            elapsedTime++;
        }, 1000);
        const embed = new discord_js_1.EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user?.displayAvatarURL() })
            .setThumbnail(interaction.user?.displayAvatarURL())
            .addFields({
            name: "⏰ | Inicio:",
            value: `<t:${Math.floor(startTime / 1000)}:F> (**<t:${Math.floor(startTime / 1000)}:R>**)`,
        }, {
            name: "⏰ | Finalizou:",
            value: `***Em Andamento...***`,
        });
        const row = new discord_js_1.ActionRowBuilder({ components: [botaoEncerrar] });
        const resposta = await interaction.reply({
            embeds: [embed],
            components: [row],
            fetchReply: true,
        });
        const coletor = resposta.createMessageComponentCollector({});
        coletor.on("collect", async (interactionn) => {
            if (interactionn.customId === "encerrar") {
                clearInterval(intervalId);
                botaoEncerrar.setDisabled(true).setLabel("Encerrado");
                const rows = new discord_js_1.ActionRowBuilder({ components: [botaoEncerrar] });
                let endTime = interactionn.createdTimestamp;
                let duration = moment_1.default.duration(elapsedTime, "seconds");
                let formattedDuration = `${Math.floor(duration.asHours())}h ${duration.minutes()}m ${duration.seconds()}s`;
                await interactionn.update({
                    embeds: [
                        new discord_js_1.EmbedBuilder()
                            .setColor(__1.config.colors.corbot)
                            .setThumbnail(interaction.user?.displayAvatarURL())
                            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user?.displayAvatarURL() })
                            .addFields({
                            name: "⏰ | Inicio:",
                            value: `<t:${Math.floor(startTime / 1000)}:F>`,
                        }, {
                            name: "⏰ | Finalizou:",
                            value: `<t:${Math.floor(endTime / 1000)}:F>`,
                        }, {
                            name: "⏳ | Tempo decorrido:",
                            value: `\n\`\`\`ansi\n[31;1m${formattedDuration}[0m\`\`\``,
                        }),
                    ],
                    components: [rows],
                });
            }
        });
    },
});
