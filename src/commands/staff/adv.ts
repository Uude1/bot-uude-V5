import { ApplicationCommandOptionType, ApplicationCommandType, ColorResolvable, EmbedBuilder, TextChannel } from "discord.js";
import { Command } from "../../structs/types/Command";
import { config } from "../..";
const { Guild } = require("../../events/main//schemas");

export default new Command({
    name: "adv",
    description: "dar advertência a um membro",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [{
        name: "membro",
        description: "Selecione o membro que receberá a advertência",
        type: ApplicationCommandOptionType.User,
        required: true
    },
    {
        name: "id",
        description: "informe o id da membro na cidade",
        type: ApplicationCommandOptionType.Number,
        required: true
    },
    {
        name: "motivo",
        description: "Insira o motivo da advertência",
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    async run({ interaction, options }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;

        const { guild, member } = interaction;
        const { members: memberManager } = guild;

        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });

        const canaldebanimento = guildData.moderacao.advChannel;
        const role1 = guildData.moderacao.advRole1;

        const advuser = options.getMember("membro");
        const motivo = options.getString('motivo');
        const id = options.getNumber('id');

        const logsChannel = await interaction.guild.channels.fetch(canaldebanimento);
        if (!role1) return;

        if (!advuser) {
            interaction.reply({ content: "O membro não foi encontrado.", ephemeral: true });
            return;
        }

        const embed = new EmbedBuilder()
            .setDescription(`<a:1101633942932705351:1129121617142882355> **Advertência** <a:1101633942932705351:1129121617142882355>\n\n> Todas as **punições** são aplicadas após uma avaliação de algum staff da gente caso você ache que foi injusto **Abrir Ticket**\n\n> **Player:** ${advuser}\n> **Passaporte:** ${id}\n> **Motivo:** ${motivo}\n> **Punição:** Advertência 1`)
            .setColor(config.colors.red as ColorResolvable)
            .setFooter({ text: `staff que deu Advertência (${interaction.user.username})`, iconURL: interaction.guild.iconURL() || undefined });

        if (logsChannel instanceof TextChannel) {
            interaction.reply({ content: `O membro ${advuser} recebeu uma advertência com sucesso.`, ephemeral: true });
            logsChannel.send({ embeds: [embed] });
        }
    }
});
