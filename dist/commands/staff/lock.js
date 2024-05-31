"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const __1 = require("../..");
exports.default = new Command_1.Command({
    name: "lock",
    description: "Trava um canal de texto.",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    async run({ interaction }) {
        if (!interaction.inCachedGuild())
            return;
        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                content: 'Você não tem permissão usar esse comando!',
                ephemeral: true,
            });
        }
        else {
            const embed = new discord_js_1.EmbedBuilder()
                .setAuthor({ name: interaction.guild.name })
                .setTitle('Canal Trancado🔒')
                .setColor(__1.config.colors.corbot)
                .setDescription(`Este chat foi trancado com sucesso por: ${interaction.user}`);
            interaction.reply({ embeds: [embed] }).then((msg) => {
                const channel = interaction.channel;
                channel.permissionOverwrites.edit(interaction.guild?.id, { SendMessages: false }).catch((e) => {
                    interaction.editReply('❌ Ops, algo deu errado ao tentar trancar este chat.');
                });
            });
        }
    }
});
