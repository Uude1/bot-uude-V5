// Importações necessárias
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const __1 = require("../..");
const tslib_1 = require("tslib");
const mysql_1 = tslib_1.__importDefault(require("mysql"));
const { Guild } = require('../../events/main/schemas');

// Comando para iniciar o formulário de allowlist
exports.default = new Command_1.Command({
    name: "wform",
    description: "Enviar a embed com o botão para iniciar a allowlist de perguntas",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [{
        name: "canal",
        description: "Selecione o canal onde a embed de início da allowlist será enviada",
        type: discord_js_1.ApplicationCommandOptionType.Channel,
        channelTypes: [discord_js_1.ChannelType.GuildText],
        required: true
    }],
    async run({ interaction, options }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
            return;

        // Extrair o canal e a categoria fornecidos nas opções
        let channel = options.getChannel("canal");

        // Verificar se o canal é do tipo TextChannel
        if (channel instanceof discord_js_1.TextChannel) {
            // Construir a embed de início da allowlist
            let embed = new discord_js_1.EmbedBuilder()
                .setTitle(`Sistema de Allowlist`)
                .setDescription("```📝 ALLOWLIST``` Você pode fazer nossa **Allowlist** a qualquer momento e quantas vezes quiser, o resultado será enviado na sua **DM** e no chat de **RESULTADOS**, assim que sua **ALLOWLIST** for revisada.\n \n ```📢 ATENÇÃO``` para realizar sua **Allowlist** clique no botão abaixo, Lembrando... voce terá 10 minutos no máximo para completar sua allowlist! \n \n")
                .setImage("https://media.discordapp.net/attachments/945464547534307358/1197001997166055511/BANNER-ALLOWLIST.png")
                .setColor(__1.config.colors.corbot)
                .setFooter({ text: `${interaction.guild.name} © Todos os direitos reservados`, iconURL: interaction.guild.iconURL() || undefined });

            // Construir o botão de início
            let button = new discord_js_1.ButtonBuilder({ customId: "wform", label: "Iniciar allowlist", style: discord_js_1.ButtonStyle.Primary });
            let row = new discord_js_1.ActionRowBuilder({ components: [button] });

            channel.send({ embeds: [embed], components: [row] });
            interaction.reply({ content: `Mensagem de início da allowlist enviada com sucesso`, ephemeral: true });
        }
    },
    buttons: new discord_js_1.Collection([
        ["wform", async (wform) => {
            if (!wform.isButton() || !wform.inCachedGuild())
                return;

            // Extrair o guild e o member da interação
            const { guild, member } = wform;

            const allowlistCategoryId = "1221912637340651780";

            // Obter os dados da allowlist do guild
            let guildData = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });

            let categoria = guildData.whitelist.whitelistCategory;

            // Definir as perguntas
            const questions = [
                "Qual é o seu ID de Allowlist? (ID mostrado ao tentar entrar no servidor)",
                "Qual é o seu nome e sobrenome real?",
                "Qual é a sua idade real?",
                "Qual é o nome e sobrenome do seu personagem?",
                "Qual é a idade do seu personagem",
                "Conte mais sobre seu personagem",
                "Como conheceu o Exo Roleplay",
                "Você está ciente de todas as nossas regras?",
                "Explique o que é Roleplay",
                "Explique o que é Amor a Vida",
                "Explique o que é CombatLog",
                "Explique o que é PowerGaming",
                "Explique o que é MetaGaming",
                "Por que deviamos ter você no Exo Roleplay?"
            ];

            // Criar um nome para o canal com base no usuário
            let nome = `📂┇allowlist-${wform.user.username}`;

            // Criar o canal para a allowlist
            wform.guild?.channels.create({
                name: nome,
                topic: `${wform.user.id}`,
                parent: allowlistCategoryId,
                type: discord_js_1.ChannelType.GuildText,
                rateLimitPerUser: 5,
                permissionOverwrites: [
                    {
                        id: wform.guild.roles.everyone.id,
                        deny: ["ViewChannel"],
                        allow: ["SendMessages"],
                    },
                    {
                        id: wform.user.id,
                        allow: ["SendMessages", "ViewChannel", "AttachFiles", "EmbedLinks", "AddReactions"],
                    },
                ],
            }).then(channel => {
                const nomeCanal = channel.name;
                wform.reply({ content: `Sua allowlist foi iniciada no canal ${channel.toString()} que foi criado`, ephemeral: true });

                // Enviar as perguntas uma por uma com um intervalo
                sendQuestions(channel, questions, wform.user, guild);
            });
        }],
        ["aproved", async (aproved) => {
            if (!aproved || !aproved.isButton() || !aproved.inCachedGuild()) {
                return;
            }
            let type = "aprovado"
            openModalUser(aproved, type)
        }],
        ["reproved", async (reproved) => {
            if (!reproved || !reproved.isButton() || !reproved.inCachedGuild()) {
                return;
            }
            let type = "reprovado"
            openModalUser(reproved, type)
        }]
    ])
});


// Função para enviar as perguntas uma por uma
async function sendQuestions(channel, questions, user, guild) {
    // Excluir todas as mensagens do canal antes de começar
    await deleteAllMessages(channel);

    const collectedAnswers = [];
    for (const question of questions) {
        // Criar uma embed para a pergunta em negrito
        const embedQuestion = new discord_js_1.EmbedBuilder()
            .setTitle(`**${question}**`)  // Título em negrito
            .setColor(__1.config.colors.corbot)

        await channel.send({ embeds: [embedQuestion] });

        // Aguardar a resposta do usuário
        const collected = await waitForAnswer(channel, user, guild);
        collectedAnswers.push(collected);
    }

    // Criar a embed com as respostas coletadas
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`Respostas de ${user.username}`)
        .setColor(__1.config.colors.corbot)
        .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
        .setDescription(`Ao abrir a tela de aprovação ou reprovação, adicione o Id do DISCORD como: ${user.id}`)
        .addFields(
            questions.map((question, index) => ({
                name: question,
                value: collectedAnswers[index] || "Não fornecida"
            }))
        )
        .setTimestamp();

    // Enviar a embed para o canal específico
    const targetChannelId = "1155021239635677244"; // Substitua pelo ID do canal desejado
    const targetChannel = guild.channels.cache.get(targetChannelId);
    const channelDelete = guild.channels.cache.find(channel => channel.name === `📂┇allowlist-${user.username}`);
    if (targetChannel instanceof discord_js_1.TextChannel) {
        const aproved = new discord_js_1.ButtonBuilder({
            customId: "aproved",
            style: discord_js_1.ButtonStyle.Success,
            label: "Aprovar",
        });
        const reproved = new discord_js_1.ButtonBuilder({
            customId: "reproved",
            style: discord_js_1.ButtonStyle.Danger,
            label: "Reprovar",
        });
        const row2 = new discord_js_1.ActionRowBuilder({ components: [aproved, reproved] });
        await targetChannel.send({ embeds: [embed], components: [row2] });
        let cargoEmAndamento = '1177855161423634482'
        const member = guild.members.cache.get(user.id);
        await member.roles.add(cargoEmAndamento);
        await channelDelete.delete();
    }
}

async function openModalUser(buttonInteraction, type) {
    const modal = new discord_js_1.ModalBuilder({ customId: "result", title: "Resultado AL" });
    const imput1 = new discord_js_1.ActionRowBuilder({
        components: [
            new discord_js_1.TextInputBuilder({
                customId: "id",
                label: "ID DO DISCORD:",
                placeholder: "ex: 525901212906684451 (id do discord do Uude)",
                style: discord_js_1.TextInputStyle.Short,
                required: true,
                minLength: 18,
                maxLength: 18,
            })
        ]
    });
    const imput2 = new discord_js_1.ActionRowBuilder({
        components: [
            new discord_js_1.TextInputBuilder({
                customId: "id2",
                label: "ID DO JOGO:",
                placeholder: "ex: 1 (id do jogo do Uude)",
                style: discord_js_1.TextInputStyle.Short,
                required: true,
                minLength: 1,
            })
        ]
    });
    modal.setComponents(imput1, imput2);
    buttonInteraction.showModal(modal);
    let modalInteraction = await buttonInteraction.awaitModalSubmit({ time: 30_000, filter: (i) => i.user.id === buttonInteraction.user.id }).catch(() => null);
    if (!modalInteraction)
        return;
    let { fields } = modalInteraction;
    const guild = buttonInteraction.client.guilds.cache.get(buttonInteraction.guildId);
    if (!guild) {
        console.log("Guild não encontrado em cache");
        return;
    }
    let memberId = fields.getTextInputValue("id");
    let idpersonagem = fields.getTextInputValue("id2");
    const member = guild.members.cache.get(memberId);
    if (!member) {
        modalInteraction.reply({ content: "Não foi encontrado nenhum membro com esse ID.", ephemeral: true });
        return;
    }
    try {
        if (type === "aprovado") {
            await approvalAction(member, modalInteraction);
            let guildData = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });
            let role_aprovado = guildData.whitelist.approvedRole;
            let cargo_visitante = guildData.welcome.role_welcome;
            let ipdb = guildData.database.ipdb;
            let userdb = guildData.database.usuário;
            let senhadb = guildData.database.senhadb;
            let basedb = guildData.database.basedb;
            let channelapproved = guildData.whitelist.approvedChannel;
            if (!ipdb || !userdb || !senhadb || !basedb) {
                await modalIteraction.reply({
                    content: "Banco de dados nao cadastrado",
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
            let cargoAllowlist = '959994826290499594'
            let cargoEmAndamento = '1177855161423634482'

            await member.roles.add(cargoAllowlist);
            await member.roles.remove(cargoEmAndamento);
            modalInteraction.reply({ content: "Membro aprovado!", ephemeral: true });
        } else if (type === "reprovado") {
            await rejectionAction(member, modalInteraction)
            let cargoEmAndamento = '1177855161423634482'

            await member.roles.remove(cargoEmAndamento);
            modalInteraction.reply({ content: "Membro reprovado!", ephemeral: true });
        }

    }
    catch (error) {
        modalInteraction.reply({ content: "Ocorreu um erro ao cadastrar o ID.", ephemeral: true });
        console.error(error);
    }
}


async function approvalAction(user, interaction) {
    let guildData = await Guild.findOne({ id: user.guild.id }) || new Guild({ id: user.guild.id });
    // const approvalChannelId = guildData.whitelist.approvedChannel;
    const approvalChannelId = "1155021315397386310";
    console.log(approvalChannelId)
    const approvalChannel = interaction.guild.channels.cache.get(approvalChannelId);
    if (!approvalChannel) {
        console.log("Canal de aprovação não encontrado");
        throw new Error("Canal de aprovação não encontrado");
    }
    if (approvalChannel instanceof discord_js_1.TextChannel) {
        let embed = new discord_js_1.EmbedBuilder()
            .setTitle(`RESULTADO`)
            .setDescription(`🎉 PARABÉNS! ${user.user.username.toUpperCase()} \n Você foi **APROVADO** na Allowlist do EXO, seja muito bem-vindo!\n Acesse o nosso site: https://www.exoroleplay.com.br`)
            .setColor(__1.config.colors.corbot)
            .setFooter({ text: `${interaction.guild.name} © Todos os direitos reservados`, iconURL: interaction.guild.iconURL() || undefined });

        await user.send({ embeds: [embed] });
        await approvalChannel.send(`Parabéns <@${user.id}>, você foi aprovado! 🎉`);
    }
}


async function rejectionAction(user,interaction) {
    let embed = new discord_js_1.EmbedBuilder()
        .setTitle(`RESULTADO`)
        .setDescription(`❌ NÃO FOI DESSA VEZ ${user.user.username.toUpperCase()} \n Infelizmente você foi **REPROVADO** na Allowlist do EXO, se atente às regras e tente novamente no discord! (você pode tentar quantas vezes quiser!)\n  Acesse o nosso site: https://www.exoroleplay.com.br`)
        .setColor(__1.config.colors.corbot)
        .setFooter({ text: `${interaction.guild.name} © Todos os direitos reservados`, iconURL: interaction.guild.iconURL() || undefined });

    await user.send({ embeds: [embed] });
}

async function deleteAllMessages(channel) {
    const fetchedMessages = await channel.messages.fetch();
    fetchedMessages.forEach(async message => {
        try {
            await message.delete();
        } catch (error) {
            console.error("Erro ao excluir mensagem:", error);
        }
    });
}

async function waitForAnswer(channel, user, guild) {
    return new Promise(async (resolve, reject) => {
        const filter = m => m.author.id === user.id;
        const channelDelete = guild.channels.cache.find(channel => channel.name === `📂┇allowlist-${user.username}`);


        // Configura o temporizador para 60 segundos
        const timeout = setTimeout(() => {
            channelDelete.delete()
            clearTimeout(timeout);
            resolve(null); // Resolve a promessa com null para indicar que o tempo limite foi excedido
        }, 600000); // 60 segundos

        try {
            const collected = await channel.awaitMessages({ filter, max: 1, time: 600000 });

            // Limpa o temporizador para que ele não seja executado após uma resposta ser coletada
            clearTimeout(timeout);

            const response = collected.first()?.content || null;
            resolve(response);
        } catch (error) {
            // Em caso de erro, como por exemplo, se o tempo limite for atingido
            // O temporizador será limpo acima e a promessa já foi resolvida com null
            // Então, não precisamos fazer nada aqui
        }
    });
}
