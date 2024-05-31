import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, EmbedBuilder, TextChannel, StringSelectMenuBuilder, ActionRowBuilder, ColorResolvable, Collection, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, Embed } from "discord.js";
import { createTranscript } from "discord-html-transcripts";
import { Command } from "../../structs/types/Command";
import { config } from "../..";
const FiveM = require('fivem-stats');
const { Guild } = require("../../events/main/schemas")

export default new Command({
    name: "config",
    description: "todos os coamdos que começa com a inicial config",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [
        {
            name: "bot",
            description: "Configura o bot",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "name",
                    description: "O novo nome do bot",
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "avatar",
                    description: "A URL da nova imagem de avatar do bot",
                    type: ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        },
        {
            name: "logs",
            description: "Configure um canal para as logs e ficar sabendo dos acontecimentos do seu servidor.",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "discord",
                    description: "Configure um canal para as logs e ficar sabendo dos acontecimentos do seu servidor.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "canal",
                            description: "Selecione o canal onde serão enviadas as logs do Discord",
                            type: ApplicationCommandOptionType.Channel,
                            channelTypes: [ChannelType.GuildText],
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            name: "database",
            description: "Configure a database para aprovar os IDs no servidor",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "ipdb",
                    description: "Informe o IP da sua VPS",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "basedb",
                    description: "Qual é o seu base de dados? Exemplo: VRP, VRPEX",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "usuário",
                    description: "Usuário admin de acesso na DB",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "senhadb",
                    description: "Senha do usuário da DB",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },

            ]
        },
        {
            name: "report",
            description: "Configure o canal de bug do servidor.",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "canal",
                    description: "Configure o canal de bug do servidor.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "canal",
                            description: "Selecione o canal onde ficará a mensagem de reportar os bugs da cidade.",
                            type: ApplicationCommandOptionType.Channel,
                            channelTypes: [ChannelType.GuildText],
                            required: true
                        },
                        {
                            name: "canal-staff",
                            description: "Selecione o canal onde as logs das reportagens serão armazenadas.",
                            type: ApplicationCommandOptionType.Channel,
                            channelTypes: [ChannelType.GuildText],
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            name: "status",
            description: "veja meus comandos",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "canal",
                description: "canal que ficara o connect da cidade",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildText],
                required: true
            },
            {
                name: "connect",
                description: "ip que ira aparecer para conecta na cidade",
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: "ipvps",
                description: "ip da vps para busca na lista do fiveM",
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: "connectbutton",
                description: "link para conectar",
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: "lojavip",
                description: "link para conectar",
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: "imagem",
                description: "Selecioner uam imagem que aparecera na embed do status",
                type: ApplicationCommandOptionType.String,
                required: true
            }],
        },
        {
            name: "boasvindas",
            description: "ghfgh",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "cargo",
                    description: "Selecione o cargo que os membros recebem ao entrarem no servidor",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "cargo-entrada",
                            description: "Selecione o cargo que os membros recebem ao entrarem no servidor",
                            type: ApplicationCommandOptionType.Role,
                            required: true
                        }
                    ]
                },
                {
                    name: "canal",
                    description: "Configure o sistema de entrada e saída",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "entrada",
                            description: "Defina o canal para a mensagem de entrada para usuários que entrarem no servidor",
                            type: ApplicationCommandOptionType.Channel,
                            channelTypes: [ChannelType.GuildText],
                            required: true
                        },
                        {
                            name: "saida",
                            description: "Defina o canal para a mensagem de saída para usuários que saírem do servidor",
                            type: ApplicationCommandOptionType.Channel,
                            channelTypes: [ChannelType.GuildText],
                            required: true
                        }
                    ]
                },
                {
                    name: "imagem",
                    description: "Configure uma imagem para ser enviada junto com a embed de boas-vindas",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "url",
                            description: "Imagem que será enviada junto com a embed",
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: "mensagem",
                    description: "Configure uma mensagem para ser enviada junto com a embed de boas-vindas",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "mensagem",
                            description: "Mensagem que será enviada",
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            name: "ticket",
            description: "configurer o sistema de atendimento via ticket no servido",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "canal-ticket",
                description: "Selecione o canal onde será enviada a mensagem para abrir um ticket.",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildText],
                required: true
            },
            {
                name: "categoria-doações",
                description: "Selecione a categoria onde os canais com o assunto de doação serão criados.",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildCategory],
                required: true
            },
            {
                name: "categoria-suporte",
                description: "Selecione a categoria onde os canais com o assunto de suporte serão criados.",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildCategory],
                required: true
            },
            {
                name: "categoria-denuncias",
                description: "Selecione a categoria onde os canais com o assunto de denúncias serão criados.",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildCategory],
                required: true
            },
            {
                name: "cargo-atendimento",
                description: "selecioner o cargo da staff para visualizarem os tickets abretos",
                type: ApplicationCommandOptionType.Role,
                required: true
            },
            {
                name: "canal-logs",
                description: "Selecione o canal onde as logs dos tickes finalizados serão envidos",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildText],
                required: true
            },
            {
                name: "imagen-ticket",
                description: "informar a Url de uma imagem para ficar de baixo de messagem do ticket caso tenha não abrigatorio",
                type: ApplicationCommandOptionType.String,
                required: false
            },
            {
                name: "messagem-ticket",
                description: "informar uma messagem caso queira mudar a messagem envida por podrão não abrigatorio",
                type: ApplicationCommandOptionType.String,
                required: false
            }]
        },
        {
            name: "sugestao",
            description: "Seta canal de sugestões",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "canal",
                    description: "Seta canal de sugestões",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "canal",
                            description: "selecione onde sera o canal das sugetões",
                            type: ApplicationCommandOptionType.Channel,
                            channelTypes: [ChannelType.GuildText],
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            name: "adv",
            description: "Seta os canal de advertencia e banimneto do servidor",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "canal",
                    description: "Seta os canal de advertencia e banimneto do servidor",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "advertencia",
                            description: "Selencione o canal onde as advetencia será enviadas!",
                            type: ApplicationCommandOptionType.Channel,
                            channelTypes: [ChannelType.GuildText],
                            required: true
                        },
                        {
                            name: "banimentos",
                            description: "Selencione o canal onde ao banimentos irão ser enviadas!",
                            type: ApplicationCommandOptionType.Channel,
                            channelTypes: [ChannelType.GuildText],
                            required: true
                        }
                    ]
                },
                {
                    name: "cargos",
                    description: "Configure os cargos o usuario recebera ao receber uma adivetencia",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "cargo-1",
                            description: "Selecioner o cargo da primeira advertencia",
                            type: ApplicationCommandOptionType.Role,
                            required: true
                        },
                        {
                            name: "cargo-2",
                            description: "Selecioner o cargo da sugunda advertencia",
                            type: ApplicationCommandOptionType.Role,
                            required: true
                        },
                        {
                            name: "cargo-3",
                            description: "Selecioner o cargo da primeira advertencia",
                            type: ApplicationCommandOptionType.Role,
                            required: true
                        },
                        {
                            name: "cargo-banimneto",
                            description: "Selecioner o cargo da primeira advertencia",
                            type: ApplicationCommandOptionType.Role,
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            name: "backup",
            description: "configure o sistema de backup da cidade",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [{
                name: "canal",
                description: "configure o sistema de backup da cidade",
                type: ApplicationCommandOptionType.Subcommand,
                options: [{
                    name: "canal",
                    description: "Selecioner o canal onde os backup da cidade será enviad",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: true
                }]
            }]
        },
        {
            name: "allowlist",
            description: `Configure o sistema de allowlist`,
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
            {
                name: "categoria",
                description: `Configure o sistema de allowlist com peguntas`,
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                {
                    name: "categoria",
                    description: `Selecioner o a categoria que serão criadas os canais da allowlists`,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildCategory],
                    required: true
                },
                ]
            },
            {
                name: "aprovados",
                description: "Selecioner onde as logs de aprovados na allowlist será enviadas",
                type: ApplicationCommandOptionType.Subcommand,
                options: [{
                    name: "canal",
                    description: "Selecioner onde as logs de aprovados na allowlist será enviadas",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: true
                }]
            },
            {
                name: "reprovados",
                description: "Selecioner onde as logs de aprovados na allowlist será enviadas",
                type: ApplicationCommandOptionType.Subcommand,
                options: [{
                    name: "canal",
                    description: "Selecioner onde as logs de aprovados na allowlist será enviadas",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: true
                }]

            },
            {
                name: "cargo",
                description: "Selecioner onde as logs de aprovados na allowlist será enviadas",
                type: ApplicationCommandOptionType.Subcommand,
                options: [{
                    name: "cargo",
                    description: "Selecioner o cargo que o membro vai receber ao fazer a allowlist",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: true
                }]
            }
            ]
        }
    ],
    async run({ interaction, options, client }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return

        const SubcommandGroup = options.getSubcommandGroup();
        const Subcommand = options.getSubcommand();

        switch (SubcommandGroup) {
            case "boasvindas": {
                const Subcommand = options.getSubcommand()

                switch (Subcommand) {
                    case "cargo": {
                        if (!interaction.member?.permissions.has('Administrator')) {
                            await interaction.reply({ content: 'Você não tem permissão usar esse comando!', ephemeral: true, }); return;
                        }

                        let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

                        let autorole = interaction.options.getRole("cargo-entrada")?.id

                        guildData.welcome.role_welcome = autorole
                        await guildData.save()

                        interaction.reply({ content: `✅ |${interaction.user} sistema de entradas configurado com sucesso`, ephemeral: true })
                    }
                    case "canal": {
                        if (!interaction.member?.permissions.has('Administrator')) {
                            await interaction.reply({ content: 'Você não tem permissão usar esse comando!', ephemeral: true, }); return;
                        }

                        let joinChannel = options.getChannel("entrada")?.id
                        let quitChannel = options.getChannel("saida")?.id

                        let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
                        guildData.welcome.welcomeChannel = joinChannel
                        guildData.welcome.goodbyeChannel = quitChannel
                        await guildData.save()

                        interaction.reply({ content: `✅ |${interaction.user} sistema de entradas configurado com sucesso`, ephemeral: true })
                    }
                    case "imagem": {
                        if (!interaction.member?.permissions.has('Administrator')) {
                            await interaction.reply({ content: 'Você não tem permissão usar esse comando!', ephemeral: true, }); return;
                        }

                        let imageUrl = options.getString("url");


                        let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });

                        guildData.welcome.welcomeImage = imageUrl;
                        await guildData.save();

                        interaction.reply({ content: `✅ | ${interaction.user} A imagem de boas-vindas foi configurada com sucesso`, ephemeral: true });
                    }
                    case "mensagem": {
                        if (!interaction.member?.permissions.has('Administrator')) {
                            await interaction.reply({ content: 'Você não tem permissão usar esse comando!', ephemeral: true, }); return;
                        }

                        let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });

                        let mensagem = options.getString("mensagem")

                        guildData.welcome.welcomeMessage = mensagem;
                        await guildData.save();

                        interaction.reply({ content: `✅ | ${interaction.user} A messagem de boas-vindas foi configurada com sucesso`, ephemeral: true });
                    }
                }

            }
            case "sugestao": {
                const Subcommand = options.getSubcommand()

                switch (Subcommand) {
                    case "canal":
                        if (!interaction.member?.permissions.has('Administrator')) {
                            await interaction.reply({ content: 'Você não tem permissão usar esse comando!', ephemeral: true, }); return;
                        }

                        let sugestoes = interaction.options.getChannel("canal")?.id ?? "";

                        let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
                        guildData.moderacao.sugestoeschannel = sugestoes
                        await guildData.save()

                        interaction.reply({ content: `Canal de Sugestões configurado com sucesso`, ephemeral: true })
                }
            }
            case "adv": {
                const Subcommand = options.getSubcommand()

                switch (Subcommand) {
                    case "cargos": {
                        if (!interaction.member?.permissions.has('Administrator')) {
                            await interaction.reply({ content: 'Você não tem permissão usar esse comando!', ephemeral: true, }); return;
                        }

                        let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

                        let role1 = interaction.options.getRole("cargo-2")?.id
                        let role2 = interaction.options.getRole("cargo-2")?.id
                        let role3 = interaction.options.getRole("cargo-2")?.id
                        let role4 = interaction.options.getRole("cargo-banimneto")?.id

                        guildData.moderacao.advRole1 = role1
                        guildData.moderacao.advRole2 = role2
                        guildData.moderacao.advRole3 = role3
                        guildData.moderacao.advRole4 = role4
                        await guildData.save()

                        interaction.reply({ content: `Cargos configurado com sucesso`, ephemeral: true })
                    }
                    case "canal": {
                        if (!interaction.member?.permissions.has('Administrator')) {
                            await interaction.reply({ content: 'Você não tem permissão usar esse comando!', ephemeral: true, }); return;
                        }

                        let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

                        let channel1 = interaction.options.getChannel("advertencia")?.id
                        let channel2 = interaction.options.getChannel("banimentos")?.id

                        guildData.moderacao.advChannel = channel1
                        guildData.moderacao.banchannel = channel2
                        await guildData.save()

                        interaction.reply({ content: `Canais de advertencia e banimentos configurado com sucesso`, ephemeral: true })
                    }
                }
            }
            case "report": {
                const Subcommand = options.getSubcommand()

                switch (Subcommand) {
                    case "canal":
                        if (!interaction.member?.permissions.has('Administrator')) {
                            await interaction.reply({ content: 'Você não tem permissão usar esse comando!', ephemeral: true, }); return;
                        }

                        let channel = options.getChannel("canal")
                        let channelstaff = options.getChannel("canal-staff")?.id

                        if (channel instanceof TextChannel) {
                            let embed = new EmbedBuilder()
                                .setAuthor({ name: `Sistema exclusivo ${interaction.guild.name}`, iconURL: interaction.guild.iconURL() || undefined })
                                .setDescription(`Encontrou algum bug na cidade? Relate-o aos desenvolvedores apertando o botão abaixo.`)
                                .setThumbnail(interaction.guild.iconURL())
                                .setColor(config.colors.corbot as ColorResolvable)
                                .setFooter({ text: `${interaction.guild.name} © Todos os direitos reservados `, iconURL: interaction.guild.iconURL() || undefined })

                            let button = new ButtonBuilder({
                                customId: "reportbug",
                                style: ButtonStyle.Primary,
                                label: "Reporta bug",
                                emoji: "✅"
                            })

                            let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

                            guildData.moderacao.reportChannel = channelstaff
                            await guildData.save()

                            let row = new ActionRowBuilder<ButtonBuilder>({ components: [button] })

                            interaction.reply({ content: `Sistema de reporta bug configurado com sucesso no ${channel}`, ephemeral: true })
                            channel.send({ embeds: [embed], components: [row] })
                        }
                }
            }
            case "logs": {
                const Subcommand = options.getSubcommand()

                switch (Subcommand) {
                    case "discord":
                        if (!interaction.member?.permissions.has('Administrator')) {
                            await interaction.reply({ content: 'Você não tem permissão usar esse comando!', ephemeral: true, }); return;
                        }

                        let logs = interaction.options.getChannel("canal")?.id ?? "";

                        let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
                        guildData.moderacao.logsdiscord = logs
                        await guildData.save()

                        interaction.reply({ content: `Canal de logs configurado com sucesso`, ephemeral: true })
                }
            }
            case "backup": {
                const Subcommand = options.getSubcommand();

                switch (Subcommand) {
                    case "canal":

                        let channel = interaction.options.getChannel("canal")?.id ?? "";

                        let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });

                        guildData.moderacao.backupchannel = channel
                        await guildData.save()

                        interaction.reply({
                            content: `Sistema de backup automatico configurado com sucesso`,
                            ephemeral: true
                        })

                }
            }
        }
        switch (Subcommand) {
            case "bot": {
                if (!interaction.member?.permissions.has('Administrator')) {
                    await interaction.reply({
                        content: 'Você não tem permissão usar esse comando!',
                        ephemeral: true,
                    });
                    return;
                }

                const nameOption = options.getString('name');
                const avatarOption = options.getString('avatar');

                if (nameOption && nameOption.length > 32) {
                    await interaction.reply({
                        content: 'O novo nome do bot deve ter no máximo 32 caracteres',
                        ephemeral: true,
                    });
                    return;
                }

                if (avatarOption && !avatarOption.startsWith('http')) {
                    await interaction.reply({
                        content: 'A nova imagem de avatar do bot deve ser uma URL válida',
                        ephemeral: true,
                    });
                    return;
                }

                try {
                    if (nameOption) {
                        await client.user?.setUsername(nameOption);
                    }

                    if (avatarOption) {
                        await client.user?.setAvatar(avatarOption);
                    }

                    await interaction.reply({
                        content: 'As configurações do bot foram atualizadas com sucesso!',
                        ephemeral: true,
                    });
                } catch (error) {
                    await interaction.reply({
                        content: 'Ocorreu um erro ao fazer a alteração no bot',
                        ephemeral: true,
                    });
                }
            }
            case "database": {
                if (!interaction.member?.permissions.has('Administrator')) {
                    await interaction.reply({ content: 'Você não tem permissão usar esse comando!', ephemeral: true });
                    return;
                }

                let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });

                let ipdb = options.getString('ipdb');
                let usuário = options.getString('usuário');
                let senhadb = options.getString('senhadb');
                let basedb = options.getString('basedb');

                guildData.database.ipdb = ipdb;
                guildData.database.usuário = usuário;
                guildData.database.senhadb = senhadb;
                guildData.database.basedb = basedb;

                await guildData.save();

                interaction.reply({ content: "informações salvas com sucesso na database do bot", ephemeral: true });
            }
            case "ticket": {
                if (!interaction.member?.permissions.has("Administrator")) {
                    await interaction.reply({
                        content: "Você não tem permissão para usar esse comando!",
                        ephemeral: true,
                    });
                    return;
                }

                if (options.getSubcommand() === "ticket") {
                    const channel = options.getChannel("canal-ticket")
                    const category_donalts = options.getChannel("categoria-doações")?.id
                    const category_suppote = options.getChannel("categoria-suporte")?.id
                    const category_denunciation = options.getChannel("categoria-denuncias")?.id
                    const channel_role = options.getRole("cargo-atendimento")?.id
                    const channel_logs = options.getChannel("canal-logs")?.id
                    const ticket_imagem = options.getString("imagen-ticket");
                    const ticket_messagen = options.getString("messagem-ticket")

                    const guildData =
                        (await Guild.findOne({ id: interaction.guild.id })) ||
                        new Guild({ id: interaction.guild.id });

                    guildData.ticket.categorydoacoes = category_donalts;
                    guildData.ticket.categorysuporte = category_suppote;
                    guildData.ticket.categorydenuncias = category_denunciation;
                    guildData.ticket.cargo_staff = channel_role;
                    guildData.ticket.ticket_logs = channel_logs;
                    await guildData.save();

                    if (channel instanceof TextChannel) {
                        const embed_ticket = new EmbedBuilder()
                            .setAuthor({ name: `Atendimento via ticket - ${interaction.guild?.name}` })
                            .setColor(config.colors.corbot as ColorResolvable)
                            .setThumbnail(interaction.guild?.iconURL() ?? null)
                            .setFooter({ text: `${interaction.guild?.name} © todos os direitos reservado`, iconURL: `${interaction.guild?.iconURL() || undefined}` })

                        if (ticket_imagem) {
                            embed_ticket.setImage(`${ticket_imagem}`)
                        }

                        if (ticket_messagen) {
                            embed_ticket.setDescription(ticket_messagen)
                        }

                        if (!ticket_messagen) {
                            embed_ticket.setDescription(`Sistema de ticket exclusivo ao jogador para este realizar seu atendimento. Selecione uma categoria abaixo de acordo com sua necessidade\n\nSó para avisar, não abra ticket sem necessidade ou à toa. Caso contrário, poderá receber uma **punição!**`)
                        }

                        const selec_ticket = new ActionRowBuilder<StringSelectMenuBuilder>({
                            components: [
                                new StringSelectMenuBuilder({
                                    customId: "select_ticket",
                                    placeholder: "Selecioner a categoria aqui...",
                                    options: [
                                        { label: "Doações", description: "Está com duvida ou com problemas com sua doação?", value: `categorydoacoes`, emoji: "💎", },
                                        { label: "Suporte", description: "Está com problema na cidade ou precisa de ajuda?", value: `categorysuporte`, emoji: "🙋‍♂️" },
                                        { label: "Denúncias", description: "Encontrou alguém que desrespeitou as regras da cidade?", value: `categorydenuncias`, emoji: "⚠️" },
                                        { label: "Resetar opção", description: "Precisa selecionar a categoria anterior? apeter aqui", value: `resetopcao`, emoji: "⚙️" }
                                    ]
                                })
                            ]
                        })

                        interaction.reply({ content: `Sistema de atendimento ao ticket configurado com sucesso`, ephemeral: true })
                        channel.send({ embeds: [embed_ticket], components: [selec_ticket] });
                    }
                }
            }
            case "status": {
                if (!interaction.member?.permissions.has('Administrator')) {
                    await interaction.reply({ content: 'Você não tem permissão usar esse comando!', ephemeral: true, }); return;
                }

                let guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });

                if (!guildData.stats) {
                    guildData.stats = {};
                }

                let canal_status = options.getChannel('canal');
                let link = options.getString('connectbutton');
                let imagem = options.getString("imagem");

                let vip = options.getString('lojavip');

                let server = new FiveM.Stats(options.getString('ipvps'), 3306);
                server.getPlayers().then(async (players: string[]) => {
                    if (canal_status instanceof TextChannel) {
                        let embed = new EmbedBuilder()
                            .setAuthor({ name: `${interaction.guild.name}` })
                            .setThumbnail(interaction.guild.iconURL())
                            .setColor(config.colors.corbot as ColorResolvable)
                            .addFields(
                                { name: '> __Players:__', value: `\`\`\`\n🎮 ${players}\n\`\`\``, inline: true },
                                { name: '> __Status:__', value: '```\n🟢 Online\n```', inline: true },
                                { name: '> __CONECTAR-SE PELO F8 NO FIVEM COM O__\n> __CONNECT DA CIDADE:__', value: `\`\`\`\n ${interaction.options.getString('connect')}\n\`\`\`` },
                            );

                        if (imagem) {
                            embed.setImage(`${imagem}`);
                        }

                        let offline_embed = new EmbedBuilder()
                            .setAuthor({ name: `${interaction.guild.name}` })
                            .setColor(config.colors.corbot as ColorResolvable)
                            .setThumbnail(interaction.guild.iconURL())
                            .addFields(
                                { name: '> __Players:__', value: `\`\`\`\n🎮 Sem informação\n\`\`\``, inline: true },
                                { name: '> __Status:__', value: '```\n🔴 desligado!\n```', inline: true },
                                { name: '> __CONECTER-SE PELO F8 NO FIVEM COM O__\n> __CONNECT DA CIDADE:__', value: `\`\`\`\n ${interaction.options.getString('connect')}\n\`\`\`` },
                            );

                        if (imagem) {
                            offline_embed.setImage(`${imagem}`);
                        }

                        let conectar = new ButtonBuilder({
                            url: `${link}`,
                            style: ButtonStyle.Link,
                            label: "Conectar",
                            emoji: "1003002157106200666",
                        });

                        let lojavip = new ButtonBuilder({
                            url: `${vip}`,
                            style: ButtonStyle.Link,
                            label: "Loja Vip",
                            emoji: "1098691501782994996"
                        });

                        let row = new ActionRowBuilder<ButtonBuilder>({ components: [conectar, lojavip] });

                        interaction.reply({ content: `Sistema configurado com sucesso e enviado no canal ${canal_status}`, ephemeral: true });

                        canal_status.send({ embeds: [embed], components: [row] })
                            .then((msg) => {

                                setInterval(async () => {
                                    try {
                                        const updatedPlayers = await server.getPlayers();
                                        let embed2 = new EmbedBuilder()
                                            .setAuthor({ name: `${interaction.guild.name}` })
                                            .setThumbnail(interaction.guild.iconURL())
                                            .setColor(config.colors.corbot as ColorResolvable)
                                            .addFields(
                                                { name: '> __Players:__', value: `\`\`\`\n🎮 ${updatedPlayers}\n\`\`\``, inline: true },
                                                { name: '> __Status:__', value: '```\n🟢 Online\n```', inline: true },
                                                { name: '> __CONECTAR-SE PELO F8 NO FIVEM COM O__\n> __CONNECT DA CIDADE:__', value: `\`\`\`\n ${interaction.options.getString('connect')}\n\`\`\`` },
                                            );

                                        if (imagem) {
                                            embed2.setImage(`${imagem}`);
                                        }

                                        msg.edit({ embeds: [embed2], components: [row] });
                                    } catch (error) {
                                        msg.edit({ embeds: [offline_embed], components: [row] });
                                    }
                                }, 60000);

                                guildData.status.messagenchannel = options.getChannel("canal")?.id;
                                guildData.status.ipconnect = options.getString("connect");
                                guildData.status.vip = options.getString('lojavip')
                                guildData.status.messagenid = msg.id;
                                guildData.status.url = options.getString("connectbutton");
                                guildData.status.ipvps = options.getString("ipvps");
                                guildData.status.imagem = options.getString("imagem");

                                guildData.save();
                            });
                    }
                });
            }
        }
    },
    selects: new Collection([
        ["select_ticket", async (selectInteraction) => {

            let roleManager = selectInteraction.guild?.roles
            let guildData = await Guild.findOne({ id: selectInteraction.guild?.id }) || new Guild({ id: selectInteraction.guild?.id })
            let parent = guildData.ticket[`${selectInteraction.values[0]}`]
            let cargosuporte = guildData.ticket.cargo_staff;
            await roleManager?.fetch(cargosuporte).catch(() => null)
            let text: string;

            if (selectInteraction.values[0] === 'categorydoacoes') text = 'doações';
            if (selectInteraction.values[0] === 'categorysuporte') text = 'suporte';
            if (selectInteraction.values[0] === 'categorydenuncias') text = 'denuncias';
            if (selectInteraction.values[0] === 'resetopcao') {
                await selectInteraction.reply({ content: "Opção reiniciado com sucesso! Agora você pode escolher novamente a categoria desejada.", ephemeral: true });
                return;
            }

            const categoriaParaEmoji: { [key: string]: string } = {
                categorydoacoes: "💎",
                categorysuporte: "🛠️",
                categorydenuncias: "🚨",
            };

            const categoriaSelecionada = selectInteraction.values[0];

            const emoji = categoriaParaEmoji[categoriaSelecionada] || "📂";

            const nome = `${emoji}-ticket-${selectInteraction.user.username}`;

            let categoria = parent
            if (!selectInteraction.guild?.channels.cache.get(categoria)) categoria = null;
            const ticket = selectInteraction.guild?.channels.cache.find((ticket) => ticket.type === ChannelType.GuildText && ticket.topic === selectInteraction.user.id);

            if (ticket) {
                let embed = new EmbedBuilder()
                    .setDescription(`<:1006762899081007114:1133445870298337371> Você já possui um ticket aberto acesse: [Clicando aqui](https://discord.com/channels/${selectInteraction.guild?.id}/${ticket.id}).`)
                    .setColor(config.colors.corbot as ColorResolvable)

                selectInteraction.reply({ embeds: [embed], ephemeral: true });

            } else {
                setTimeout(() => {
                    selectInteraction.guild?.channels.create({
                        name: nome,
                        topic: `${selectInteraction.user.id}`,
                        parent: categoria,
                        type: ChannelType.GuildText,
                        permissionOverwrites: [{
                            id: selectInteraction.guild.roles.everyone.id,
                            deny: ["ViewChannel"],
                            allow: ["SendMessages", "ViewAuditLog"],
                        },
                        {
                            id: selectInteraction.user.id,
                            allow: ["SendMessages", "ViewChannel", "AttachFiles", "EmbedLinks", "AddReactions", "ViewAuditLog",]
                        },
                        {
                            id: `${cargosuporte}`,
                            allow: ["SendMessages", "ViewChannel", "AttachFiles", "EmbedLinks", "AddReactions", "ViewAuditLog"]
                        }]
                    })
                        .then((channel) => {
                            const embed_compra = new EmbedBuilder()
                                .setColor(config.colors.corbot as ColorResolvable)
                                .setTitle(`ATENDIMENTO - ${selectInteraction.guild?.name}`)
                                .setThumbnail(`${selectInteraction.guild?.iconURL()}`)
                                .setDescription(`> Olá ${selectInteraction.user} Queremos que saiba que todos os membros da nossa equipe foram notificados sobre a sua solicitação.\n\nA categoria escolhida para o ticket é: \`\`\`diff\n${text}\`\`\`\n> Se você tiver mais informações para adicionar ou quiser cancelar o ticket, basta clicar no botão vermelho abaixo`)
                                .setFooter({ text: `${selectInteraction.guild?.name} © Todos os direitos reservados`, iconURL: selectInteraction.guild?.iconURL() || undefined })

                            const embeds = new EmbedBuilder()
                                .setColor(config.colors.corbot as ColorResolvable)
                                .setDescription(`<:1006762900804874340:1133971768969809980> Seu ticket foi criado acesse o canal: [Clicando aqui](https://discord.com/channels/${selectInteraction.guild?.id}/${channel.id})`)

                            const choseticket = new ButtonBuilder({
                                customId: "fechar_ticketember",
                                style: ButtonStyle.Danger,
                                label: "Fechar Ticket",
                                emoji: "❌"
                            })
                            const addmember = new ButtonBuilder({
                                customId: "addmember",
                                style: ButtonStyle.Secondary,
                                label: "Adicionar Membro",
                                emoji: "<:optimus_adicionar:1124036932406616185>"
                            })
                            const remember = new ButtonBuilder({
                                customId: "remember",
                                style: ButtonStyle.Secondary,
                                label: "Remover Membro",
                                emoji: "<:optimus_remover:1124037494611136533>"
                            })

                         
                        

                            setTimeout(() => {
                                if (cargosuporte) {
                                    const embed = new EmbedBuilder()
                                        .setTitle(`Novo Ticket de ${selectInteraction.user.username}`)
                                        .setDescription(`Atenção o membro ${selectInteraction.user}, abriu um novo ticket foi aberto no canal ${channel} no servidor!`)
                                        .setColor(config.colors.corbot as ColorResolvable)

                                    selectInteraction.guild?.members.cache.forEach((member) => {
                                        if (member.roles.cache.has(cargosuporte)) {
                                            member.send({ embeds: [embed] }).catch(() => null);
                                        }
                                    });
                                }
                            }, 5000)

                            const row = new ActionRowBuilder<ButtonBuilder>({ components: [choseticket, addmember, remember] })
      
                            selectInteraction.reply({ embeds: [embeds], ephemeral: true })
                            channel.send({ embeds: [embed_compra], components: [row] })

                        })

                })
            }
        }]
    ]),
            buttons: new Collection([
        ["fechar_ticketember", async (interactionTicket) => {
            if (!interactionTicket.isButton() || !interactionTicket.inCachedGuild()) {
                return;
            }

            if (!interactionTicket.channel) {
                interactionTicket.reply({ content: "❌ Não foi possível excluir esse ticket.", ephemeral: true });
                return;
            }

            if (interactionTicket.channel.type !== ChannelType.GuildText) {
                interactionTicket.reply({ content: "❌ Não foi possível salvar as mensagens desse ticket.", ephemeral: true });
                return;
            }

            const guildData = await Guild.findOne({ id: interactionTicket.guild.id }) || new Guild({ id: interactionTicket.guild.id });

            const ticket_logs = guildData.ticket.ticket_logs;
            const logs = interactionTicket.guild?.channels.cache.get(`${ticket_logs}`) ?? null;
            const user = interactionTicket.guild.members.cache.get(`${interactionTicket.channel.topic}`);

            interactionTicket.reply(`${interactionTicket.user} Sua solicitação de fechamento do ticket foi registrada.\nEste ticket será excluído em 15 segundos...`);

            if (!user) {
                interactionTicket.reply({ content: "❌ Não foi possível achar o usuário que abriu o ticket.", ephemeral: true });
                return;
            }

            const file = await createTranscript(interactionTicket.channel, {
                filename: `${interactionTicket.channel.name}.html`,
                saveImages: true,
                poweredBy: false
            });

            const embed2 = new EmbedBuilder()
                .setAuthor({ name: "REGISTRO DE TICKET"})
                .setColor(config.colors.corbot as ColorResolvable)
                .setThumbnail(`${interactionTicket.guild?.iconURL()}`)
                .addFields(
                    { name: "Usuário que abriu o ticket: ", value: `${user.user.tag}`, inline: false },
                    { name: "Usuário que fechou o ticket:", value: `${interactionTicket.user.tag}`, inline: false },
                    { name: "Horário de abertura do ticket:", value: `<t:${~~(interactionTicket.createdAt.getTime() / 1000)}:F>`, inline: false },
                    { name: "Canal do ticket:", value: `${interactionTicket.channel.name}`, inline: false },
                );

            setTimeout(() => {
                user.send({ embeds: [embed2], files: [file] });

                if (logs instanceof TextChannel && logs.guild.id === interactionTicket.guild.id) {
                    logs.send({ embeds: [embed2], files: [file] });
                } else {
                    console.log("Canal de logs não encontrado.");
                }

            }, 7000);

            setTimeout(() => {
                try {
                    interactionTicket.channel?.delete();
                } catch (e) {
                    return;
                }
            }, 15000);
        }],
        ["addmember", async (interactionaddmember) => {
            if (!interactionaddmember.inCachedGuild()) return;

            const modal = new ModalBuilder({ customId: "addmember", title: "Adicione um membro ao ticket" });

            const input1 = new ActionRowBuilder<TextInputBuilder>({
                components: [
                    new TextInputBuilder({
                        customId: "addmembroticket",
                        label: "Quem será adicionado ao ticket?",
                        placeholder: "Exemplo: ID: 983801040262553682",
                        style: TextInputStyle.Short,
                        required: true
                    })
                ]
            });

            modal.setComponents(input1);
            interactionaddmember.showModal(modal);

            let modalInteraction = await interactionaddmember.awaitModalSubmit({ time: 30_000, filter: (i) => i.user.id === interactionaddmember.user.id }).catch(() => null);
            if (!modalInteraction) return;

            let { fields } = modalInteraction;
            let memberId = fields.getTextInputValue("addmembroticket");

            const guild = interactionaddmember.client.guilds.cache.get(interactionaddmember.guildId);

            if (!guild) {
                console.log("Guild não encontrado em cache");
                return;
            }

            const member = guild.members.cache.get(memberId);

            if (!member) {
                modalInteraction.reply({ content: "Não foi encontrado nenhum membro com esse ID.", ephemeral: true });
                return;
            }

            const channelId = interactionaddmember.channelId;

            const channel = guild.channels.cache.get(channelId);

            try {
                const textChannel = channel as TextChannel;

                await textChannel.permissionOverwrites.edit(
                    member,
                    {
                        ViewChannel: true,
                        SendMessages: true,
                        ViewAuditLog: true,
                        AddReactions: true,
                        EmbedLinks: true,
                        AttachFiles: true
                    }
                );


                modalInteraction.reply({ content: `O membro: <@${memberId}> foi adicionado ao ticket com sucesso!`, ephemeral: true });
            } catch (error) {
                modalInteraction.reply({ content: "Ocorreu um erro ao adicionar o membro ao ticket.", ephemeral: true });
                console.error(error);
            }
        }],
        ["remember", async (interactionaddmember) => {
            if (!interactionaddmember.inCachedGuild()) return;

            const modal = new ModalBuilder({ customId: "addmember", title: "Remover um membro ao ticket" });

            const input1 = new ActionRowBuilder<TextInputBuilder>({
                components: [
                    new TextInputBuilder({
                        customId: "removermembroticket",
                        label: "Quem será removido ao ticket?",
                        placeholder: "Exemplo: ID: 983801040262553682",
                        style: TextInputStyle.Short,
                        required: true
                    })
                ]
            });

            modal.setComponents(input1);
            interactionaddmember.showModal(modal);

            let modalInteraction = await interactionaddmember.awaitModalSubmit({ time: 30_000, filter: (i) => i.user.id === interactionaddmember.user.id }).catch(() => null);
            if (!modalInteraction) return;

            let { fields } = modalInteraction;
            let memberId = fields.getTextInputValue("removermembroticket");

            const guild = interactionaddmember.client.guilds.cache.get(interactionaddmember.guildId);

            if (!guild) {
                console.log("Guild não encontrado em cache");
                return;
            }

            const member = guild.members.cache.get(memberId);

            if (!member) {
                modalInteraction.reply({ content: "Não foi encontrado nenhum membro com esse ID.", ephemeral: true });
                return;
            }

            const channelId = interactionaddmember.channelId;

            const channel = guild.channels.cache.get(channelId);

            try {
                const textChannel = channel as TextChannel;

                await textChannel.permissionOverwrites.edit(
                    member,
                    {
                        ViewChannel: false,
                        SendMessages: false,
                        ViewAuditLog: false,
                        AddReactions: false,
                        EmbedLinks: false,
                        AttachFiles: false,
                    }
                );


                modalInteraction.reply({ content: `O membro: <@${memberId}> foi removido ao ticket com sucesso!`, ephemeral: true });
            } catch (error) {
                modalInteraction.reply({ content: "Ocorreu um erro ao remover o membro do ticket.", ephemeral: true });
                console.error(error);
            }
        }],
        ["reportbug", async (reportbug) => {
            if (!reportbug.inCachedGuild()) return;
           
            const modal = new ModalBuilder({ customId: "reportabug", title: "REPORTAR BUG/ERRO" });

            const imput1 = new ActionRowBuilder<TextInputBuilder>({
                components: [
                    new TextInputBuilder({
                        customId: "bug",
                        label: "em que sistuação esse erro aconteceu?",
                        style: TextInputStyle.Short,
                        required: true,
                        minLength: 1,
                        maxLength: 50,
                    })
                ]
            });

            const imput2 = new ActionRowBuilder<TextInputBuilder>({
                components: [
                    new TextInputBuilder({
                        customId: "bugimagem",
                        label: "qual foi o erro encontrado",
                        style: TextInputStyle.Short,
                        required: false,
                        minLength: 1,
                        maxLength: 50
                    })
                ]
            });

            const imput3 = new ActionRowBuilder<TextInputBuilder>({
                components: [
                    new TextInputBuilder({
                        customId: "bugimagem1",
                        label: "Detalhe como aconteceu",
                        style: TextInputStyle.Paragraph,
                        required: false,
                        minLength: 1,
                        maxLength: 4000,
                    })
                ]
            });

            const imput4 = new ActionRowBuilder<TextInputBuilder>({
                components: [
                    new TextInputBuilder({
                        customId: "bugimagem2",
                        label: "link da imagem (caso tenha)",
                        style: TextInputStyle.Short,
                        required: false,
                        minLength: 1,
                        maxLength: 50
                    })
                ]
            });

            modal.setComponents(imput1, imput2, imput3, imput4);
            reportbug.showModal(modal);

            let modalInteraction = await reportbug.awaitModalSubmit({ time: 30_000, filter: (i) => i.user.id == reportbug.user.id }).catch(() => null);
            if (!modalInteraction) return;

            let guildData = await Guild.findOne({ id: reportbug.guild.id }) || new Guild({ id: reportbug.guild.id });
            let reportChannel = guildData.moderacao.reportChannel;
            let channel = Guild.channels.cache.get(reportChannel);

            let { fields } = modalInteraction;

            let bug = fields.getTextInputValue("bug");
            let image = fields.getTextInputValue("bugimagem");

            let embed = new EmbedBuilder()
                .setTitle('NOVO BUG REGISTRADO')
                .setThumbnail(reportbug.user.avatarURL())
                .addFields(
                    { name: 'Bug', value: bug },
                    { name: 'Imagem', value: image || 'Nenhuma imagem fornecida' }
                );

                modalInteraction.reply({ content: `Bug reportado com sucesso`, ephemeral: true });

                channel.send({ embeds: [embed] });
        }],
    ]),
})