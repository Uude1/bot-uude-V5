"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = require("../../structs/types/Event");
const __1 = require("../..");
const { Guild } = require('./schemas');
const mysqldump = require('mysqldump');
const fs = require('fs');
exports.default = new Event_1.Event({
    name: "ready",
    once: true,
    async run(client) {
        setInterval(async () => {
            client.guilds.cache.forEach(async (guild) => {
                let guildData = await Guild.findOne({ id: guild.id }) || new Guild({ id: guild.id });
                let channelID = guildData.moderacao.backupchannel;
                let ipdb = guildData.database.ipdb;
                let userdb = guildData.database.usuário;
                let senhadb = guildData.database.senhadb;
                let basedb = guildData.database.basedb;
                let channel = guild.channels.cache.get(channelID);
                if (channel instanceof discord_js_1.TextChannel) {
                    const backupFileName = 'backup.sql';
                    try {
                        await mysqldump({
                            connection: {
                                host: ipdb,
                                user: userdb,
                                password: senhadb,
                                database: basedb,
                            },
                            dumpToFile: backupFileName,
                        });
                        const options = { hour12: false, timeZone: 'America/Sao_Paulo' };
                        const currentDate = new Date().toLocaleDateString('pt-BR', options);
                        const currentTime = new Date().toLocaleTimeString('pt-BR', options);
                        const embed = new discord_js_1.EmbedBuilder()
                            .setTitle(`<:1078798243384791140:1129938398942089216>Backup Automatico do Banco de Dados<:1078798243384791140:1129938398942089216>`)
                            .setDescription(`Backup especificações:\nData: **${currentDate}** - Horas: **${currentTime}**`)
                            .setImage(`https://cdn.discordapp.com/attachments/1098472270655127594/1129932399703240754/MySQL-banco-de-dados-linux-1024x512.png`)
                            .setColor(__1.config.colors.corbot);
                        channel.send({
                            embeds: [embed],
                            files: [{
                                    attachment: backupFileName,
                                    name: 'backup.sql'
                                }]
                        }).then(() => {
                            fs.unlinkSync(backupFileName);
                        }).catch((error) => {
                            console.error('⚠️ Erro ao enviar o arquivo de backup:'.red);
                        });
                    }
                    catch (error) {
                        console.error('⚠️ Erro ao fazer o backup do banco de dados:'.red);
                    }
                }
            });
        }, 3 * 60 * 60 * 1000); // Change the interval to 2 hours
    }
});
