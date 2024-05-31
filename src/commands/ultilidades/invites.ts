import { ApplicationCommandType, ColorResolvable, EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../structs/types/Command";
import { config } from "../..";

export default new Command({
    name: "invites",
    description: "veja meus comandos",
    type: ApplicationCommandType.ChatInput,
    options: [{
        name: "usuário",
        description: "O usuário que você deseja banir",
        type: ApplicationCommandOptionType.User,
        required: true
    }],
    async run({ interaction, options }) {
        if (!interaction.inCachedGuild()) return

        const user = options.getUser('usuário');

        let invites = await interaction.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user?.id);

        let i = 0;
        userInv.forEach(inv => i += inv.uses ?? 0);

        const embed = new EmbedBuilder()
            .setColor(config.colors.corbot as ColorResolvable)
            .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: `${interaction.user.tag}` })
            .setTitle("Contagem de convites do usuário")
            .setDescription(`${interaction.user.tag} possui **${i}** convites.`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
})