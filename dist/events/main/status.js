"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const Event_1 = require("../../structs/types/Event");
const discord_js_1 = require("discord.js");
const { Guild } = require('./schemas');
const FiveM = require('fivem-stats');
exports.default = new Event_1.Event({
    name: "ready",
    once: true,
    run() {
        __1.client.guilds.cache.forEach(async (guild) => {
            let guildData = await Guild.findOne({ id: guild.id }) || new Guild({ id: guild.id });
            let canal = guildData.status.messagenchannel;
            let messagem = guildData.status.messagenid;
            let ip = guildData.status.ipvps;
            let connect = guildData.status.ipconnect;
            let imagem = guildData.status.imagem;
            if (canal === null || messagem === null || ip === null || connect === null)
                return;
            const channelId = `${canal}`;
            const messageId = `${messagem}`;
            const channel = __1.client.channels.cache.get(channelId);
            if (!channel || !(channel instanceof discord_js_1.TextChannel))
                return;
            let server = new FiveM.Stats(String(`${ip}`), 3306, { timeout: 5000 });
            server.getPlayers().then(async (players) => {
                const embed = new discord_js_1.EmbedBuilder()
                    .setAuthor({ name: guild.name })
                    .setThumbnail(guild.iconURL())
                    .setColor(__1.config.colors.corbot)
                    .addFields({ name: '> Players:', value: `\`\`\`\n🎮 ${players}\n\`\`\``, inline: true }, { name: '> Status:', value: '```\n🟢 Online\n```', inline: true }, { name: '> COPIE E COLE NO F8 DO FIVEM!', value: `\`\`\`\n ${connect}\n\`\`\`` });
                if (imagem) {
                    embed.setImage(`${imagem}`);
                }
                channel.messages
                    .fetch(messageId)
                    .then((message) => {
                    if (message.author.id === __1.client.user?.id) {
                        message.edit({ embeds: [embed] });
                        setInterval(async () => {
                            try {
                                const updatedPlayers = await server.getPlayers();
                                let embed2 = new discord_js_1.EmbedBuilder()
                                    .setAuthor({ name: guild.name })
                                    .setThumbnail(guild.iconURL())
                                    .setColor(__1.config.colors.corbot)
                                    .addFields({ name: '> Players:', value: `\`\`\`\n${updatedPlayers}\n\`\`\``, inline: true }, { name: '> Status:', value: '```\nOnline\n```', inline: true }, { name: '> COPIE E COLE NO F8 DO FIVEM!', value: `\`\`\`\n ${connect}\n\`\`\`` });
                                if (imagem) {
                                    embed2.setImage(`${imagem}`);
                                }
                                message.edit({ embeds: [embed2] });
                            }
                            catch (error) {
                                message.edit({ embeds: [offline_embed] });
                            }
                        }, 60000);
                    }
                })
                    .catch((error) => {
                    console.error("⚠️  Erro ao buscar ou editar a mensagem do sistema de status".red);
                });
            })
                .catch((error) => {
                console.error("⚠️  Erro ao obter os jogadores do sistema de status".red);
            });
            let offline_embed = new discord_js_1.EmbedBuilder()
                .setAuthor({ name: guild.name })
                .setThumbnail(guild.iconURL())
                .setColor(__1.config.colors.corbot)
                .addFields({ name: '> Players:', value: `\`\`\`\nSem informação\n\`\`\``, inline: true }, { name: '> Status:', value: '```\ndesligado!\n```', inline: true }, { name: '> COPIE E COLE NO F8 DO FIVEM!', value: `\`\`\`\n ${connect}\n\`\`\`` });
            if (imagem) {
                offline_embed.setImage(`${imagem}`);
            }
        });
    }
});
