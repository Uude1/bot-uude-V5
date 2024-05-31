"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
exports.default = new Command_1.Command({
    name: "unlock",
    description: "Destrancar um canal que está privado",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    async run({ interaction }) {
        if (!interaction.inCachedGuild())
            return;
        let embed1 = new discord_js_1.EmbedBuilder()
            .setDescription(`Você não tem permissão usar esse comando!`)
            .setColor("Red");
        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                embeds: [embed1],
                ephemeral: true,
            });
            let channel = interaction.channel;
            let embed = new discord_js_1.EmbedBuilder()
                .setAuthor({ name: interaction.guild.name })
                .setTitle('Canal Destrancado🔓')
                .setColor("Green")
                .setDescription(`Este chat foi destrancado com sucesso por: ${interaction.user}`);
            interaction.reply({ embeds: [embed] }).then((msg) => {
                channel.permissionOverwrites.edit(interaction.guild?.id, { SendMessages: true }).catch((e) => {
                    interaction.editReply({ content: '❌ Ops, algo deu errado ao tentar trancar este chat.' });
                });
            });
        }
    },
});
