import { ApplicationCommandType, ColorResolvable, EmbedBuilder } from "discord.js";
import { Command } from "../../structs/types/Command";
import { config } from "../..";

export default new Command({
    name: "ajuda",
    description: "veja meus comandos",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    async run({ interaction }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return

        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                content: 'Você não tem permissão usar esse comando!',
                ephemeral: true,
            });
            return;
        }


            const embed = new EmbedBuilder()
                .setAuthor({ name: `MEUS COMANDOS DISPONIVEIS` })
                .setThumbnail(interaction.user.displayAvatarURL() || null)
                .setDescription(`**\`\`\`\/add veiculo\`\`\`**\n__Adicioner um veiculo da garagem de um player__\n\n**\`\`\`\/add wl\`\`\`\**\n__libere um id da cidade sem nescesidade de fazer a wl__\n\n**\`\`\`\/adv\`\`\`\**\n__Da uma adventencia a um player que derespetou as regras da cidade com logs__\n\n**\`\`\`\ajuda\`\`\`\**\n__Não saber como usar meus comandos então ultilizer /ajuda__`)
                .setColor(config.colors.corbot as ColorResolvable)

            interaction.reply({ embeds: [embed], ephemeral: true })
        }
    }
)