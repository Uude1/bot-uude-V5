"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const __1 = require("../..");
const mysql_1 = tslib_1.__importDefault(require("mysql"));
const { Guild } = require('../../events/main/schemas');
const [um] = ['<:1108388917004226601:1109713766519668746>'];
exports.default = new Command_1.Command({
    name: "whistelistid",
    description: "Envie uma mensagem de aviso em um canal de texto",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [{
            name: "canal",
            description: "coloque o nome do canal",
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            channelTypes: [discord_js_1.ChannelType.GuildText],
            required: true
        },
        {
            name: "cargo-aprovado",
            description: "Selecione o cargo que os membros recebem os entrarem no servido",
            type: discord_js_1.ApplicationCommandOptionType.Role,
            required: true
        },
        {
            name: "canal-logwl",
            description: "Informe o canal que ficará o log de aprovados",
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            channelTypes: [discord_js_1.ChannelType.GuildText],
            required: true
        }],
    async run({ interaction, options }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
            return;
        if (!interaction.member?.permissions.has('Administrator')) {
            await interaction.reply({
                content: 'Você não tem permissão usar esse comando!',
                ephemeral: true,
            });
            return;
        }
        const canal_aviso = options.getChannel("canal");
        const cargo_aprovado = options.getRole("cargo-aprovado")?.id;
        const canal_logwl = options.getChannel("canal-logwl")?.id;
        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });
        guildData.whitelist.approvedRole = cargo_aprovado;
        guildData.whitelist.approvedChannel = canal_logwl;
        try {
            await guildData.save();
        }
        catch (error) {
            console.error('Erro ao salvar os dados do guild:', error);
        }
        if (canal_aviso instanceof discord_js_1.TextChannel) {
            let embed = new discord_js_1.EmbedBuilder()
                .setAuthor({ name: '📋 SISTEMA DE LIBERAÇÃO' })
                .setDescription(`${um}Clique no botão para fazer sua whitelist, após sua aprovação seu passaporte será liberado na cidade!\n\n> Observações:\n\n${um}Lembre-se que será necessário ter o passaporte em mãos.`)
                .setColor(__1.config.colors.corbot)
                .setThumbnail(interaction.guild.iconURL())
                .setFooter({ text: `${interaction.guild.name} © Todos os direitos reservados`, iconURL: interaction.guild.iconURL() || undefined });
            let liberar = new discord_js_1.ButtonBuilder({
                customId: "ButtonLiberarId",
                style: discord_js_1.ButtonStyle.Secondary,
                label: "Liberar ID",
                emoji: "1101615802848911461"
            });
            let row = new discord_js_1.ActionRowBuilder({ components: [liberar] });
            canal_aviso.send({ embeds: [embed], components: [row] });
            interaction.editReply({
                content: `Sistema configurado com sucesso e envido no canal ${canal_aviso}`,
            });
        }
    },
    buttons: new discord_js_1.Collection([
        ["ButtonLiberarId", async (buttonInteraction) => {
                if (!buttonInteraction.isButton())
                    return;
                if (!buttonInteraction.inCachedGuild())
                    return;
                const { guild, member } = buttonInteraction;
                const { members: memberManager } = guild;
                const modal = new discord_js_1.ModalBuilder({ customId: "whitelist", title: "Peguntas - WL" });
                const imput1 = new discord_js_1.ActionRowBuilder({
                    components: [
                        new discord_js_1.TextInputBuilder({
                            customId: "personagem",
                            label: "nome & sobrenome do personagem:",
                            placeholder: "ex: Manoel Gomes",
                            style: discord_js_1.TextInputStyle.Short,
                            required: true,
                            minLength: 5,
                            maxLength: 32,
                        })
                    ]
                });
                const imput2 = new discord_js_1.ActionRowBuilder({
                    components: [
                        new discord_js_1.TextInputBuilder({
                            customId: "id-personagem",
                            label: "id informado no fivem",
                            placeholder: "ex: 11000013478b865",
                            style: discord_js_1.TextInputStyle.Short,
                            required: true,
                            minLength: 1,
                            maxLength: 20
                        })
                    ]
                });
                let guildData = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });
                let role_aprovado = guildData.whitelist.approvedRole;
                let cargo_visitante = guildData.welcome.role_welcome;
                let ipdb = guildData.database.ipdb;
                let userdb = guildData.database.usuário;
                let senhadb = guildData.database.senhadb;
                let basedb = guildData.database.basedb;
                let channelapproved = guildData.whitelist.approvedChannel;
                modal.setComponents(imput1, imput2);
                buttonInteraction.showModal(modal);
                const modalIteraction = await buttonInteraction.awaitModalSubmit({ time: 30_000, filter: (i) => i.user.id == buttonInteraction.user.id }).catch(() => null);
                if (!modalIteraction)
                    return;
                const { fields } = modalIteraction;
                const personagem = fields.getTextInputValue("personagem");
                const idpersonagem = fields.getTextInputValue("id-personagem");
                const database1 = new discord_js_1.EmbedBuilder()
                    .setDescription("O banco de dados do servidor não foi configurado.\n\nPara configurar, use o comando /config database")
                    .setColor(__1.config.colors.corbot);
                var tryTable = 0;
                if (tryTable == 0) {
                    try {
                        if (!ipdb || !userdb || !senhadb || !basedb) {
                            await modalIteraction.reply({
                                embeds: [database1],
                                ephemeral: true
                            });
                            return;
                        }
                        const connection = await mysql_1.default.createConnection({
                            host: ipdb,
                            user: userdb,
                            password: senhadb,
                            database: basedb,
                        });
                        connection.query(`UPDATE summerz_accounts SET whitelist = '1' WHERE id = '${idpersonagem}'`);
                        connection.end();
                        modalIteraction.reply({ content: `<a:901514700863447090:1109539141793890436>  **${buttonInteraction.user.username}** Sua whitelist foi Liberada, Seja Bem-Vindo ao ${buttonInteraction.guild?.name}`, ephemeral: true });
                        console.log(`Id '${idpersonagem}' liberada a whitelist`);
                    }
                    catch (error) {
                        console.error('Erro ao conectar com a tabela summerz_accounts do banco de dados:', error);
                        console.error('Tentando verificar a tabela vrp_users');
                        try {
                            if (!ipdb || !userdb || !senhadb || !basedb) {
                                await modalIteraction.reply({
                                    embeds: [database1],
                                    ephemeral: true
                                });
                                return;
                            }
                            const connection = await mysql_1.default.createConnection({
                                host: ipdb,
                                user: userdb,
                                password: senhadb,
                                database: basedb,
                            });
                            connection.query(`UPDATE id_users SET whitelisted = '1' WHERE id = '${idpersonagem}'`);
                            connection.end();
                            modalIteraction.reply({ content: `<a:901514700863447090:1109539141793890436>  **${buttonInteraction.user.username}** Sua whitelist foi Liberada, Seja Bem-Vindo ao ${buttonInteraction.guild?.name}`, ephemeral: true });
                            console.log(`Id '${idpersonagem}' liberada a whitelist`);
                        }
                        catch (error) {
                            console.error('Erro ao conectar com a tabela vrp_users do banco de dados:', error);
                            console.error('Verificando a coluna "whitelisted...');
                        }
                    }
                    tryTable = 1;
                }
                else if (tryTable == 1) {
                    try {
                        if (!ipdb || !userdb || !senhadb || !basedb) {
                            await modalIteraction.reply({
                                embeds: [database1],
                                ephemeral: true
                            });
                            return;
                        }
                        const connection = await mysql_1.default.createConnection({
                            host: ipdb,
                            user: userdb,
                            password: senhadb,
                            database: basedb,
                        });
                        connection.query(`UPDATE summerz_accounts SET whitelisted = '1' WHERE id = '${idpersonagem}'`);
                        connection.end();
                        modalIteraction.reply({ content: `<a:901514700863447090:1109539141793890436>  **${buttonInteraction.user.username}** Sua whitelist foi Liberada, Seja Bem-Vindo ao ${buttonInteraction.guild?.name}`, ephemeral: true });
                        console.log(`Id '${idpersonagem}' liberada a whitelist`);
                    }
                    catch (error) {
                        console.error('Erro ao conectar com a tabela summerz_accounts do banco de dados:', error);
                        console.error('Tentando verificar a tabela vrp_users');
                        try {
                            if (!ipdb || !userdb || !senhadb || !basedb) {
                                await modalIteraction.reply({
                                    embeds: [database1],
                                    ephemeral: true
                                });
                                return;
                            }
                            const connection = await mysql_1.default.createConnection({
                                host: ipdb,
                                user: userdb,
                                password: senhadb,
                                database: basedb,
                            });
                            connection.query(`UPDATE vrp_users SET whitelisted = '1' WHERE id = '${idpersonagem}'`);
                            connection.end();
                            modalIteraction.reply({ content: `<a:901514700863447090:1109539141793890436>  **${buttonInteraction.user.username}** Sua whitelist foi Liberada, Seja Bem-Vindo ao ${buttonInteraction.guild?.name}`, ephemeral: true });
                            console.log(`Id '${idpersonagem}' liberada a whitelist`);
                        }
                        catch (error) {
                            console.error('Erro ao conectar com a tabela vrp_users do banco de dados:', error);
                            console.error('Verifique a conexão com o BD');
                        }
                    }
                }
                try {
                    await guild.members.edit(member, {
                        nick: `${personagem} | ${idpersonagem} `
                    });
                }
                catch (error) { }
                try {
                    if (role_aprovado) {
                        memberManager.addRole({
                            role: role_aprovado,
                            user: member.id
                        });
                    }
                }
                catch (error) { }
                try {
                    if (cargo_visitante) {
                        memberManager.removeRole({
                            role: cargo_visitante,
                            user: member.id
                        });
                    }
                }
                catch (error) { }
                try {
                    const logsChannelId = `${channelapproved}`; // LOG DOS APROVADOS
                    console.log(channelapproved);
                    const logsChannel = await buttonInteraction.guild.channels.fetch(logsChannelId);
                    if (!logsChannel || !(logsChannel instanceof discord_js_1.TextChannel)) {
                        console.error('Canal de logs inválido. Verifique o ID do canal de logs.');
                        return;
                    }
                    const logEmbed = new discord_js_1.EmbedBuilder()
                        .setTitle('APROVADO NA WHITELIST')
                        .setThumbnail(buttonInteraction.guild.iconURL())
                        .setDescription(`**Personagem:** ${personagem}\n\n**ID do Personagem:** ${idpersonagem}\n\n**Usuário:** ${buttonInteraction.user.username}\n\n**Acertos:** desativado`)
                        .setFooter({ text: `${buttonInteraction.guild.name} © Todos os direitos reservados`, iconURL: buttonInteraction.guild.iconURL() || undefined })
                        .setColor(__1.config.colors.corbot);
                    await logsChannel.send({ embeds: [logEmbed] });
                }
                catch (error) {
                    console.error('Erro ao enviar a mensagem de logs:', error);
                }
                await new Promise((resolve) => setTimeout(resolve, 100));
            }]
    ])
});
