import { ColorResolvable, EmbedBuilder } from "discord.js";
import axios from "axios";
import { Event } from "../../structs/types/Event";
import { config } from "../..";
const { Guild } = require('./schemas');
const { client } = require('../../index');
const [um, dois, tres] = ['<a:1083145813556990042:1097377823569748000>', '<a:989015249439064114:1120018337703932055>', '<a:1080586395007058001:1097377849171792003>'];

async function check(err: unknown) {
  // Do something with the error if needed
}

export default new Event({
  name: "guildMemberAdd",
  async run(member) {
    const guildData = await Guild.findOne({ id: member.guild.id }).exec();
    if (!guildData) return;

    if (!guildData.welcome.welcomeChannel) return;

    const channel = client.channels.cache.get(guildData.welcome.welcomeChannel);
    const customMessage = guildData.welcome.welcomeMessage || `${tres} Olá ${member.user}!\n${dois} Boas vindas a nossa Cidade;\n${dois} Não se esqueça de ler nossas **Regras!**\n${dois} Agora temos ${member.guild.memberCount} moradores em nossa cidade!\n${dois} Boa sorte na Cidade e Ótimo RP!`;

    const defaultImageURL = "https://cdn.discordapp.com/attachments/1098472270655127594/1120488185726763089/separador3.gif";
    const welcomeImage = guildData.welcome.welcomeImage;
    let imageURL = welcomeImage || defaultImageURL;

    if (welcomeImage) {
      try {
        const response = await axios.head(welcomeImage);
        if (response.status !== 200) {
          console.warn("A URL da imagem de boas-vindas é inválida. Usando a imagem padrão.");
          imageURL = defaultImageURL;
        }
      } catch (err) {
        imageURL = defaultImageURL;
      }
    }

    const welcome_embed = new EmbedBuilder()
      .setTitle(`${um}Um viajante acabou de chegar!`)
      .setDescription(customMessage)
      .setColor(config.colors.corbot as ColorResolvable)
      .setFooter({ text: `ID: ${member.user.id}` })
      .setThumbnail(member.user.avatarURL())
      .setImage(imageURL)
      .setTimestamp();

    if (channel) {
      try {
        await channel.send({ embeds: [welcome_embed] });
      } catch (err) {
        await check(`${err}`);
      }
    }
  }
});
