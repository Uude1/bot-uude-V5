"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("../..");
const Event_1 = require("../../structs/types/Event");
const index_1 = require("../../index");
const { Guild } = require('./schemas');
const [um] = ['<a:1083145785903939585:1097377615758757888>'];
async function check(err) {
}
exports.default = new Event_1.Event({
    name: "guildMemberRemove",
    async run(member) {
        const guildData = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });
        if (guildData.welcome.goodbyeChannel === null)
            return;
        const channel = index_1.client.channels.cache.get(guildData.welcome.goodbyeChannel);
        const quit_message = new discord_js_1.EmbedBuilder()
            .setTitle(`${um} Saiu do servidor ${member.guild.name}!`)
            .setDescription(`${member.user} acabou de sair do servidor ${member.guild.name}. Esperamos que tenha sido uma ótima experiência e que volte em breve!"`)
            .setColor(__1.config.colors.corbot)
            .setFooter({ text: `ID: ${member.user.id}` })
            .setThumbnail(member.user.avatarURL())
            .setImage("https://cdn.discordapp.com/attachments/1079880799215689859/1080551834533511199/bannerdefault.png")
            .setTimestamp();
        if (channel && channel instanceof discord_js_1.TextChannel) {
            try {
                await channel.send({ embeds: [quit_message] });
            }
            catch (err) {
                await check(err);
            }
        }
    },
});
