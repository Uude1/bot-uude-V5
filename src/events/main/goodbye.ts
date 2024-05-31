import { ColorResolvable, EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import { config } from "../..";
import { Event } from "../../structs/types/Event";
import { client } from "../../index";

const { Guild } = require('./schemas');
const [um] = ['<a:1083145785903939585:1097377615758757888>'];

async function check(err: unknown) {
}

export default new Event({
  name: "guildMemberRemove",
  async run(member: GuildMember) {
    const guildData = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });
    if (guildData.welcome.goodbyeChannel === null) return;

    const channel = client.channels.cache.get(guildData.welcome.goodbyeChannel) as TextChannel;

    const quit_message = new EmbedBuilder()
      .setTitle(`${um} Saiu do servidor ${member.guild.name}!`)
      .setDescription(`${member.user} acabou de sair do servidor ${member.guild.name}. Esperamos que tenha sido uma ótima experiência e que volte em breve!"`)
      .setColor(config.colors.corbot as ColorResolvable)
      .setFooter({ text: `ID: ${member.user.id}` })
      .setThumbnail(member.user.avatarURL())
      .setImage("https://cdn.discordapp.com/attachments/1079880799215689859/1080551834533511199/bannerdefault.png")
      .setTimestamp();

    if (channel && channel instanceof TextChannel) {
      try {
        await channel.send({ embeds: [quit_message] });
      } catch (err) {
        await check(err);
      }
    }
  },
});