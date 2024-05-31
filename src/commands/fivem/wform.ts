import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChannelType, ColorResolvable, EmbedBuilder, TextChannel, Collection, StringSelectMenuBuilder } from "discord.js";
import { Command } from "../../structs/types/Command";
import { config } from "../..";
import mysql from 'mysql';
const { Guild } = require('../../events/main/schemas');

export default new Command({
    name: "wform",
    description: "enviar a embed com o botão de começa a wl de peguntas",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options: [{
        name: "canal",
        description: "Selecione o canal de onde sera envida a embed de iniciar a wl",
        type: ApplicationCommandOptionType.Channel,
        channelTypes: [ChannelType.GuildText],
        required: true
    },
    {
        name: "categoria",
        description: "Selecione a categoria de onde será criando os canais da realização da wl",
        type: ApplicationCommandOptionType.Channel,
        channelTypes: [ChannelType.GuildCategory],
        required: true
    },
    {
        name: "imagem",
        description: "coloque uma imagem para aparacer na embed de iniciar a wl",
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    async run({ interaction, options }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return

        let channel = options.getChannel("canal")
        let category = options.getChannel("categoria")

        if (channel instanceof TextChannel) {
            let embed = new EmbedBuilder()
                .setTitle(`Sistema de exclusivo de liberação`)
                .setDescription(`Para iniciar o formulario da whitelist devera apetar no botão abaixo\n\n voce terá 1 minuto para selecionar as repostas`)
                .setThumbnail(interaction.guild.iconURL())
                .setColor(config.colors.corbot as ColorResolvable)
                .setFooter({ text: `${interaction.guild.name} © Todos os diretos reservados`, iconURL: interaction.guild.iconURL() || undefined })

            let button = new ButtonBuilder({ customId: "wform", label: "inciar peguntas", style: ButtonStyle.Success })

            let row = new ActionRowBuilder<ButtonBuilder>({ components: [button] })

            channel.send({ embeds: [embed], components: [row] })

            interaction.reply({ content: `Messagem de iniciar a whitelist envida com sucesso`, ephemeral: true })
        }
    },
    buttons: new Collection([
        ["wform", async (wform) => {
            if (!wform.isButton() || !wform.inCachedGuild()) return;

            const { guild, member } = wform
            const { members: memberManager } = guild;

            let guildData = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });

            let role_aprovado = guildData.whitelist.approvedRole;
            let cargo_visitante = guildData.welcome.role_welcome;
            let ipdb = guildData.database.ipdb;
            let userdb = guildData.database.usuário;
            let senhadb = guildData.database.senhadb;
            let basedb = guildData.database.basedb;

            let categoria = guildData.whitelist.whitelistCategory

            const messageContent = [
                "\n> ⭐ **Qual é o nome do personagem?**",
                "\n> ⭐ Pergunta 1",
                "\n> ⭐ Pergunta 2",
                "\n> ⭐ Pergunta 3",
                "\n> ⭐ Pergunta 4",
                "\n> ⭐ Pergunta 5",
                "\n> ⭐ Pergunta 6",
                "\n> ⭐ Pergunta 7",
                "\n> ⭐ Pergunta 8",
                "\n> ⭐ Pergunta 9",
                "\n> ⭐ Pergunta 10"
            ];

            const [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10] = messageContent;

            let nome = `📂-all-${wform.user.username}`;

            setTimeout(() => {
                wform.guild?.channels.create({
                    name: nome,
                    topic: `${wform.user.id}`,
                    parent: categoria,
                    type: ChannelType.GuildText,
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
                    wform.reply({ content: `Sua whitelist foi iniciada no canal ${nomeCanal} que foi criado`, ephemeral: true });



                    let Embed1 = new EmbedBuilder()
                        .setDescription(`**\`\`\`\n📄 PERGUNTA 01\`\`\`\n**> **O que é falta de AMOR À VIDA?**\n\n \`A)\` Não ter amor próprio\n\`B)\` Subir uma favela, e perguntar se estão contratando\n\`C)\` Valorizar a minha vida como se fosse a única\n\`D)\` Me defender e reagir a sequestro\n\`E)\` Valorizar a minha vida, e correr se tentarem me fazer de refém`)
                        .setColor(config.colors.corbot as ColorResolvable)

                    let row1 = new ActionRowBuilder<StringSelectMenuBuilder>({
                        components: [
                            new StringSelectMenuBuilder({
                                customId: "pergunta1",
                                placeholder: "Selecione a alternativa da PERGUNTA 1",
                                options: [
                                    { label: "Alternativa A", value: "reposta1da1" },
                                    { label: "Alternativa B", value: "reposta2da1" },
                                    { label: "Alternativa C", value: "reposta3da1" },
                                    { label: "Alternativa D", value: "reposta4da1" },
                                    { label: "Alternativa E", value: "reposta5da1" },
                                ]
                            })
                        ]
                    })

                    let Embed2 = new EmbedBuilder()
                        .setDescription(`**\`\`\`\n📄 PERGUNTA 02\`\`\`\n** > **Seus amigos precisam de refém para fazer uma grande ação, mas não conseguiram sequestrar gente suficiente, eles pedem para você se passar por um dos reféns, como você reagiria?**\n\n\`A)\` Como sou da mesma facção que eles, eu aceito para ajudá-los e ganhar crédito com o frente\n\`B)\` Aceito ser refém afinal, são meus amigos e não me fariam mal\n\`C)\` Não aceito, falo para eles tentarem achar outra pessoa que eles não conheçam\n\`D)\` Aceito, mas falo para eles falarem que não me conhece\n\`E)\` Não aceito porque não queria, mas falo para eles chamarem outra pessoa da facção`)
                        .setColor(config.colors.corbot as ColorResolvable)

                    let row2 = new ActionRowBuilder<StringSelectMenuBuilder>({
                        components: [
                            new StringSelectMenuBuilder({
                                customId: "pergunta2",
                                placeholder: "Selecione a alternativa da PERGUNTA 2",
                                options: [
                                    { label: "Alternativa A", value: "reposta1da2" },
                                    { label: "Alternativa B", value: "reposta2da2" },
                                    { label: "Alternativa C", value: "reposta3da2" },
                                    { label: "Alternativa D", value: "reposta4da2" },
                                    { label: "Alternativa E", value: "reposta5da2" },
                                ]
                            })
                        ]
                    })

                    let Embed3 = new EmbedBuilder()
                        .setDescription(`**\`\`\`\n📄 PERGUNTA 03\`\`\`\n** > **Após o assalto bem sucedido na loja de departamentos 2 amigos seus foram alvejados e desmaiaram, como você agiria em relação aos amigos que estão caídos?**\n\n\`A)\` Faria um chamado para os paramédicos vim socorrer os amigos\n\`B)\` Faria um chamado para os paramédicos vim socorrer os amigos e os oficiais\n\`c)\` Pegaria uma corda, colocaria os amigos desmaiados dentro do veículo e levaria para o hospital ilegal\n\`D)\` Colocaria os amigos desmaiados em um veiculo e levaria para o hospital\n\`E)\` Esconderia os corpos dos oficiais, e faria um chamado para os paramédicos salvarem os meus amigos abatidos`)
                        .setColor(config.colors.corbot as ColorResolvable)

                    const row3 = new ActionRowBuilder<StringSelectMenuBuilder>({
                        components: [
                            new StringSelectMenuBuilder({
                                customId: "pergunta3",
                                placeholder: "Selecione a alternativa da PERGUNTA 3",
                                options: [
                                    { label: "Alternativa A", value: "reposta1da3" },
                                    { label: "Alternativa B", value: "reposta2da3" },
                                    { label: "Alternativa C", value: "reposta3da3" },
                                    { label: "Alternativa D", value: "reposta4da3" },
                                    { label: "Alternativa E", value: "reposta5da3" },
                                ]
                            })
                        ]
                    })

                    let Embed4 = new EmbedBuilder()
                        .setDescription(`**\`\`\`\n📄 PERGUNTA 04\`\`\`\n** > **Seu jogo trava no meio da ação o que você faz?**\n\n \`A)\` Ligo para alguém da Staff e explico a situação perguntando se posso retornar, caso não obtenha a resposta aceito que não poderei retornar até que a ação termine\n\`B)\` Assisto e continuo a ação normalmente\n\`C)\` Entro na live de um amigo que está na ação e digo que estou voltando\n\`D)\` Aproveito a situação para relogar e rodar para ganhar vantagem\n\`E)\` Entro no jogo de novo, gritando que "baixei " e continuar a ação normalmente`)
                        .setColor(config.colors.corbot as ColorResolvable)

                    const row4 = new ActionRowBuilder<StringSelectMenuBuilder>({
                        components: [
                            new StringSelectMenuBuilder({
                                customId: "pergunta4",
                                placeholder: "Selecione a alternativa da PERGUNTA 4",
                                options: [
                                    { label: "Alternativa A", value: "reposta1da4" },
                                    { label: "Alternativa B", value: "reposta2da4" },
                                    { label: "Alternativa C", value: "reposta3da4" },
                                    { label: "Alternativa D", value: "reposta4da4" },
                                    { label: "Alternativa E", value: "reposta5da4" },
                                ]
                            })
                        ]
                    })

                    let Embed5 = new EmbedBuilder()
                        .setDescription(`**\`\`\`\n📄 PERGUNTA 05\`\`\`\n** > **Você está correndo, a polícia está atrás de você, você é o motorista. Seu amigo em p2 lhe diz que seu pneu furou e que está armado e que vai aplicá-lo, o que você faz?**\n\n\`A)\` Ignoro o que meu amigo disse e continuo correndo até terminar, porque sei que vou escapar\n\`B)\` Gosto da ideia de que ele está armado e peço que fure o pneu do policial para escaparmos\n\`C)\` Eu digo ao meu amigo amigo entra no rádio e pede para eles colocarem a isca em todos os policiais para que possamos escapar\n\`D)\` Eu digo a ele para não atirar, que vamos sair do carro e levantar as mãos e nos render\n\`E)\` Eu fala pra ele não atirar, que a gente vai sair do carro levanta a mão que a polícia acha que a gente vai se entregar, aí corre saca a arma e atira nos policiais`)
                        .setColor(config.colors.corbot as ColorResolvable)

                    const row5 = new ActionRowBuilder<StringSelectMenuBuilder>({
                        components: [
                            new StringSelectMenuBuilder({
                                customId: "pergunta5",
                                placeholder: "Selecione a alternativa da PERGUNTA 5",
                                options: [
                                    { label: "Alternativa A", value: "reposta1da5" },
                                    { label: "Alternativa B", value: "reposta2da5" },
                                    { label: "Alternativa C", value: "reposta3da5" },
                                    { label: "Alternativa D", value: "reposta4da5" },
                                    { label: "Alternativa E", value: "reposta5da5" },
                                ]
                            })
                        ]
                    })

                    let Embed6 = new EmbedBuilder()
                        .setDescription(`**\`\`\`\n📄 PERGUNTA 06\`\`\`\n** > **Você encontra uma criança em um roleplay e ela começa a falar como se fosse um adulto, como você reage nessa situação?**\n\n\`A)\` Continuo o roleplay normalmente com o assunto que ela propôs\n\`B)\` Ofereço armas para o mesmo\n\`C)\` Chamo ele para praticar atos ilícitos\n\`D)\` Registro e denuncio ao Staff, pois a pessoa não está sendo condizente com o personagem proposto\n\`E)\` Eu registro, reporto ao Staff, e digo para a pessoa que ela não pode agir dessa forma que é contra as regras`)
                        .setColor(config.colors.corbot as ColorResolvable)

                    const row6 = new ActionRowBuilder<StringSelectMenuBuilder>({
                        components: [
                            new StringSelectMenuBuilder({
                                customId: "pergunta6",
                                placeholder: "Selecione a alternativa da PERGUNTA 6",
                                options: [
                                    { label: "Alternativa A", value: "reposta1da6" },
                                    { label: "Alternativa B", value: "reposta2da6" },
                                    { label: "Alternativa C", value: "reposta3da6" },
                                    { label: "Alternativa D", value: "reposta4da6" },
                                    { label: "Alternativa E", value: "reposta5da6" },
                                ]
                            })
                        ]
                    })

                    let Embed7 = new EmbedBuilder()
                        .setDescription(`**\`\`\`\n📄 PERGUNTA 07\`\`\`\n** > **Você acabou de chegar no servidor, um jogador te encontra na praça e você pede para ele te apresentar a cidade, ele fala que as favelas estão te contratando para subir em uma favela e pedir emprego, como você reagiria?\n\n\`A)\` Digo a ele que não estou louca para fazer isso, que é contra as regras da cidade**\n\`B)\` Digo a ele que não estou interessado em ir naquele dia, mas que iria no dia seguinte\n\`C)\` Agradeço e vou para as favelas para pedir emprego\n\`D)\` Digo que sou novo, que não estou louco para subir em favela onde não conheço ninguém, principalmente sozinho\n\`E)\` Digo que sou novo, e pergunto se ele pudesse me dar uma carona e me levar nas favelas para pedir emprego`)
                        .setColor(config.colors.corbot as ColorResolvable)

                    const row7 = new ActionRowBuilder<StringSelectMenuBuilder>({
                        components: [
                            new StringSelectMenuBuilder({
                                customId: "pergunta7",
                                placeholder: "Selecione a alternativa da PERGUNTA 7",
                                options: [
                                    { label: "Alternativa A", value: "reposta1da7" },
                                    { label: "Alternativa B", value: "reposta2da7" },
                                    { label: "Alternativa C", value: "reposta3da7" },
                                    { label: "Alternativa D", value: "reposta4da7" },
                                    { label: "Alternativa E", value: "reposta5da7" },
                                ]
                            })
                        ]
                    })

                    let Embed8 = new EmbedBuilder()
                        .setDescription(`**\`\`\`\n📄 PERGUNTA 08\`\`\`\n** > **Depois de terminar uma ação, sem sucesso, os policiais ainda não o pegaram e você está morto em 10 min. Você tem a opção de dar /GG, como você reagiria?**\n\n\`A)\` Eu dou /GG, não preciso esperar tanto\n\`B)\` Eu digo no chat que vou dar /GG, e dou GG.\n\`C)\` Xingo os policiais pelo /ME e peço que me prendam logo\n\`D)\` Registro a situação, para relatar depois, mas sigo o roleplay esperando ser revivido até que os padrões aconteçam até eu ser preso\n\`E)\` Aperto F8 sair e voltar no dia seguinte`)
                        .setColor(config.colors.corbot as ColorResolvable)

                    const row8 = new ActionRowBuilder<StringSelectMenuBuilder>({
                        components: [
                            new StringSelectMenuBuilder({
                                customId: "pergunta8",
                                placeholder: "Selecione a alternativa da PERGUNTA 8",
                                options: [
                                    { label: "Alternativa A", value: "reposta1da8" },
                                    { label: "Alternativa B", value: "reposta2da8" },
                                    { label: "Alternativa C", value: "reposta3da8" },
                                    { label: "Alternativa D", value: "reposta4da8" },
                                    { label: "Alternativa E", value: "reposta5da8" },
                                ]
                            })
                        ]
                    })

                    let Embed9 = new EmbedBuilder()
                        .setDescription(`**\`\`\`\n📄 PERGUNTA 09\`\`\`\n** > **Qual das seguintes situações se encaixa melhor nas regras do POWERGAMING:**\n\n\`A)\` Entregar-se e depois atirar novamente\n\`B)\` Forçar RPG com alguém\n\`c)\` Matar alguém sem motivo\n\`D)\` Subir a montanha com um r34\n\`E)\` Todas as anteriores`)
                        .setColor(config.colors.corbot as ColorResolvable)

                    const row9 = new ActionRowBuilder<StringSelectMenuBuilder>({
                        components: [
                            new StringSelectMenuBuilder({
                                customId: "pergunta9",
                                placeholder: "Selecione a alternativa da PERGUNTA 9",
                                options: [
                                    { label: "Alternativa A", value: "reposta1da9" },
                                    { label: "Alternativa B", value: "reposta2da9" },
                                    { label: "Alternativa C", value: "reposta3da9" },
                                    { label: "Alternativa D", value: "reposta4da9" },
                                    { label: "Alternativa E", value: "reposta5da9" },
                                ]
                            })
                        ]
                    })

                    let Embed10 = new EmbedBuilder()
                        .setDescription(`**\`\`\`\n📄 PERGUNTA 10\`\`\`\n** > **Qual das seguintes situações se enquadra nas regras do RDM**\n\n\`A)\` Invadir a delegacia\n\`B)\` Subir uma favela sozinho\n\`c)\` Usar um veículo como arma\n\`D)\` Matar uma pessoa sem motivo\n\`E)\` Todas as anteriores`)
                        .setColor(config.colors.corbot as ColorResolvable)

                    const row10 = new ActionRowBuilder<StringSelectMenuBuilder>({
                        components: [
                            new StringSelectMenuBuilder({
                                customId: "pergunta10",
                                placeholder: "Selecione a alternativa da PERGUNTA 10",
                                options: [
                                    { label: "Alternativa A", value: "reposta1da10" },
                                    { label: "Alternativa B", value: "reposta2da10" },
                                    { label: "Alternativa C", value: "reposta3da10" },
                                    { label: "Alternativa D", value: "reposta4da10" },
                                    { label: "Alternativa E", value: "reposta5da10" },
                                ]
                            })
                        ]
                    })

                    channel.send({
                        embeds: [Embed1],
                        components: [row1]
                    })

                    channel.send({
                        embeds: [Embed2],
                        components: [row2]
                    })

                    channel.send({
                        embeds: [Embed3],
                        components: [row3]
                    })

                    channel.send({
                        embeds: [Embed4],
                        components: [row4]
                    })

                    channel.send({
                        embeds: [Embed5],
                        components: [row5]
                    })

                    channel.send({
                        embeds: [Embed6],
                        components: [row6]
                    })

                    channel.send({
                        embeds: [Embed7],
                        components: [row7]
                    })

                    channel.send({
                        embeds: [Embed8],
                        components: [row8]
                    })

                    channel.send({
                        embeds: [Embed9],
                        components: [row9]
                    })

                    channel.send({
                        embeds: [Embed10],
                        components: [row10]
                    })
                });
            });
        }]])
})
