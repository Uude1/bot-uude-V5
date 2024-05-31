import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ColorResolvable } from "discord.js";
import { Command } from "../../structs/types/Command";
const { Guild } = require("../../events/main/schemas")
import mysql from 'mysql';
import { config } from "../..";

export default new Command({
    name: "add",
    description: "eae",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [{
        name: "veiculo",
        description: "Configura o bot",
        type: ApplicationCommandOptionType.Subcommand,
        options: [{
            name: "id",
            description: "id do player que será adicionado o carro",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "veiculo",
            description: "nome de spanw do veiculo",
            type: ApplicationCommandOptionType.String,
            required: true
        }]
    },
    {
        name: "wl",
        description: "Configure a database para aprovar os ids no servidor",
        type: ApplicationCommandOptionType.Subcommand,
        options: [{
            name: "id",
            description: "libere um id direto pelo bot na database do servido",
            type: ApplicationCommandOptionType.Number,
            required: true
        }]

    }
    ],

    async run({ interaction, options, client }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return


        const Subcommand = options.getSubcommand();

        switch (Subcommand) {
            case "veiculo": {

                if (!interaction.inCachedGuild()) return;

                if (!interaction.member?.permissions.has('Administrator')) {
                    await interaction.reply({
                        content: 'Você não tem permissão usar esse comando!',
                        ephemeral: true,
                    });
                    return;
                }

                let id = options.getNumber("id")
                let veh = options.getString("veiculo")

                let embed = new EmbedBuilder()
                    .setTitle("CARRO ADICIONADO NA GARAGEM")
                    .setDescription(`O veiculo: ${veh} foi adicionado na garagem do id: ${id}  `)
                    .setThumbnail(interaction.guild.iconURL())

                let guildData = await Guild.findOne({ id: interaction.member.guild.id }) || new Guild({ id: interaction.member.guild.id })

                let ipdb = guildData.database.ipdb
                let userdb = guildData.database.usuário
                let senhadb = guildData.database.senhadb
                let basedb = guildData.database.basedb

                const connection = await mysql.createConnection({
                    host: ipdb,
                    user: userdb,
                    password: senhadb,
                    database: basedb,
                });
                let currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 7);
                let futureDateInSeconds = Math.floor(currentDate.getTime() / 1000);
                
                interaction.reply({ embeds: [embed] });
                connection.query(`INSERT INTO vrp_user_vehicles (user_id, vehicle, ipva) VALUES ('${id}', '${veh}', '${futureDateInSeconds}')`, (error, results) => {
                    if (error) {
                      // Trate o erro aqui, se necessário
                    } else {
                      
                    }
                  });
                  
                connection.end(); // encerra a conexão após a execução do código
                connection.query(`INSERT INTO big_store_buys (user_id, product, type, expireat) VALUES ('${id}', '${veh}','cars', '${futureDateInSeconds}')`, (error, results) => {
                    if (error) {
                      // Trate o erro aqui, se necessário
                    } else {
                      
                    }
                  });
                connection.end(); // encerra a conexão após a execução do código

                break;
            }
            case "wl":

                if (!interaction.inCachedGuild()) return;

                if (!interaction.member?.permissions.has('Administrator')) {
                    await interaction.reply({
                        content: 'Você não tem permissão usar esse comando!',
                        ephemeral: true,
                    });
                    return;
                }

                let id = options.getNumber("id")

                let embed = new EmbedBuilder()
                    .setTitle("ID LIBERADO NA DATABASE")
                    .setDescription(`O id: ${id} foi liberado na database do servido com sucesso`)
                    .setThumbnail(interaction.guild.iconURL())

                let guildData = await Guild.findOne({ id: interaction.member.guild.id }) || new Guild({ id: interaction.member.guild.id })

                let ipdb = guildData.database.ipdb
                let userdb = guildData.database.usuário
                let senhadb = guildData.database.senhadb
                let basedb = guildData.database.basedb

                const database1 = new EmbedBuilder()
                    .setDescription("O banco de dados do servidor não foi configurado.\n\nPara configurar, use o comando /config database")
                    .setColor(config.colors.corbot as ColorResolvable);

                try {
                    if (!ipdb || !userdb || !senhadb || !basedb) {
                        await interaction.reply({
                            embeds: [database1],
                            ephemeral: true
                        });
                        return;
                    }

                    try {
                        const connection = await mysql.createConnection({
                            host: ipdb,
                            user: userdb,
                            password: senhadb,
                            database: basedb,
                        });

                        interaction.reply({ embeds: [embed] })

                        connection.query(`UPDATE id_users SET whitelisted = '1' WHERE id = '${id}'`);
                        connection.end(); // encerra a conexão após a execução do código
                    } catch (error) {
                        console.error('Erro ao conectar com o banco de dados:', error);
                    }

                    break;
                } finally { }
        }
    }
})