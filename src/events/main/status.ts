import { client, config } from "../..";
import { Event } from "../../structs/types/Event";
import { TextChannel, EmbedBuilder, ColorResolvable } from "discord.js";
const { Guild } = require('./schemas');
const FiveM = require('fivem-stats');

export default new Event({
  name: "ready",
  once: true,
  run() {
    client.guilds.cache.forEach(async (guild) => {
      let guildData = await Guild.findOne({ id: guild.id }) || new Guild({ id: guild.id });

      let canal = guildData.status.messagenchannel;
      let messagem = guildData.status.messagenid;
      let ip = guildData.status.ipvps;
      let connect = guildData.status.ipconnect;
      let imagem = guildData.status.imagem;

      if (canal === null || messagem === null || ip === null || connect === null) return;

      const channelId = `${canal}`;
      const messageId = `${messagem}`;

      const channel = client.channels.cache.get(channelId);
      if (!channel || !(channel instanceof TextChannel)) return;

      let server = new FiveM.Stats(String(`${ip}`), 3306, { timeout: 5000 });
      server.getPlayers().then(async (players: string[]) => {
        const embed = new EmbedBuilder()
          .setAuthor({ name: guild.name })
          .setThumbnail(guild.iconURL())
          .setColor(config.colors.corbot as ColorResolvable)
          .addFields(
            { name: '> __Players:__', value: `\`\`\`\n🎮 ${players}\n\`\`\``, inline: true },
            { name: '> __Status:__', value: '```\n🟢 Online\n```', inline: true },
            { name: '> __CONECTAR-SE PELO F8 NO FIVEM COM O__\n> __CONNECT DA CIDADE:__', value: `\`\`\`\n ${connect}\n\`\`\`` },
          );

        if (imagem) {
          embed.setImage(`${imagem}`);
        }

        channel.messages
          .fetch(messageId)
          .then((message) => {
            if (message.author.id === client.user?.id) {
              message.edit({ embeds: [embed] });

              setInterval(async () => {
                try {
                  const updatedPlayers = await server.getPlayers();
                  let embed2 = new EmbedBuilder()
                    .setAuthor({ name: guild.name })
                    .setThumbnail(guild.iconURL())
                    .setColor(config.colors.corbot as ColorResolvable)
                    .addFields(
                      { name: '> Players:', value: `\`\`\`\n${updatedPlayers}\n\`\`\``, inline: true },
                      { name: '> Status:', value: '```\nOnline\n```', inline: true },
                      { name: '> COPIE E COLE NO F8 DO FIVEM!', value: `\`\`\`\n ${connect}\n\`\`\`` },
                    );

                  if (imagem) {
                    embed2.setImage(`${imagem}`);
                  }

                  message.edit({ embeds: [embed2] });
                } catch (error) {
                  message.edit({ embeds: [offline_embed] });
                }
              }, 60000);
            }
          })
          .catch((error) => {
            console.error("⚠️  Erro ao buscar ou editar a mensagem do sistema de status" .red);
          });
      })
      .catch((error: any) => {
        console.error("⚠️  Erro ao obter os jogadores do sistema de status" .red);
      });

      let offline_embed = new EmbedBuilder()
        .setAuthor({ name: guild.name })
        .setThumbnail(guild.iconURL())
        .setColor(config.colors.corbot as ColorResolvable)
        .addFields(
          { name: '> Players:', value: `\`\`\`\nSem informação\n\`\`\``, inline: true },
          { name: '> Status:', value: '```\ndesligado!\n```', inline: true },
          { name: '> COPIE E COLE NO F8 DO FIVEM!', value: `\`\`\`\n ${connect}\n\`\`\`` },

        );

      if (imagem) {
        offline_embed.setImage(`${imagem}`);
      }
    });
  }
});
