import moment from "moment";
import { ApplicationCommandType, ColorResolvable, EmbedBuilder, ButtonStyle, ButtonBuilder, MessageComponentInteraction, ActionRowBuilder, } from "discord.js";
import { Command } from "../../structs/types/Command";
import { config } from "../..";

export default new Command({
    name: "bater-ponto",
    description: "Bater ponto",
    type: ApplicationCommandType.ChatInput,
    async run({ interaction }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return

        const botaoEncerrar = new ButtonBuilder({
            customId: "encerrar",
            label: "Encerrar",
            style: ButtonStyle.Danger,
            emoji: "863940875671306270"
        })

        let startTime = interaction.createdTimestamp;
        let elapsedTime = 0;
        let intervalId = setInterval(() => {
            elapsedTime++;
        }, 1000);

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user?.displayAvatarURL() })
            .setThumbnail(interaction.user?.displayAvatarURL())
            .addFields(
                {
                    name: "⏰ | Inicio:",
                    value: `<t:${Math.floor(startTime / 1000)}:F> (**<t:${Math.floor(startTime / 1000)}:R>**)`,
                },
                {
                    name: "⏰ | Finalizou:",
                    value: `***Em Andamento...***`,
                }
            );

        const row = new ActionRowBuilder<ButtonBuilder>({ components: [botaoEncerrar] })

        const resposta = await interaction.reply({
            embeds: [embed],
            components: [row],
            fetchReply: true,
        });

        const coletor = resposta.createMessageComponentCollector({
        });

        coletor.on("collect", async (interactionn: MessageComponentInteraction) => {
            if (interactionn.customId === "encerrar") {
                clearInterval(intervalId);
                botaoEncerrar.setDisabled(true).setLabel("Encerrado");

                const rows = new ActionRowBuilder<ButtonBuilder>({ components: [botaoEncerrar] })

                let endTime = interactionn.createdTimestamp;
                let duration = moment.duration(elapsedTime, "seconds");
                let formattedDuration = `${Math.floor(duration.asHours())}h ${duration.minutes()}m ${duration.seconds()}s`;

                await interactionn.update({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(config.colors.corbot as ColorResolvable)
                            .setThumbnail(interaction.user?.displayAvatarURL())
                            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user?.displayAvatarURL() })
                            .addFields(
                                {
                                    name: "⏰ | Inicio:",
                                    value: `<t:${Math.floor(startTime / 1000)}:F>`,
                                },
                                {
                                    name: "⏰ | Finalizou:",
                                    value: `<t:${Math.floor(endTime / 1000)}:F>`,
                                },
                                {
                                    name: "⏳ | Tempo decorrido:",
                                    value: `\n\`\`\`ansi\n[31;1m${formattedDuration}[0m\`\`\``,
                                }
                            ),
                    ],
                    components: [rows],
                });
            }
        });
    },
});
