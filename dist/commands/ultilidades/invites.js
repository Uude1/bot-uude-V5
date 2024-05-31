"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const __1 = require("../..");
exports.default = new Command_1.Command({
    name: "invites",
    description: "veja meus comandos",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [{
            name: "usuário",
            description: "O usuário que você deseja banir",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true
        }],
    async run({ interaction, options }) {
        if (!interaction.inCachedGuild())
            return;
        const user = options.getUser('usuário');
        let invites = await interaction.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user?.id);
        let i = 0;
        userInv.forEach(inv => i += inv.uses ?? 0);
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(__1.config.colors.corbot)
            .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: `${interaction.user.tag}` })
            .setTitle("Contagem de convites do usuário")
            .setDescription(`${interaction.user.tag} possui **${i}** convites.`)
            .setTimestamp();
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
});
