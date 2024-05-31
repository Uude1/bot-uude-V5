import { Collection, ColorResolvable, EmbedBuilder, italic } from "discord.js";
import { Event } from "../../structs/types/Event";
import { config } from "../..";

const members: Collection<string, number> = new Collection();

export default new Event({
    name: "messageCreate",
    async run(message) {
        if (!message.inGuild()) return;
        if (message.author.bot) return;
        if (message.author.id === message.guild.ownerId) return;
        if (message.member?.permissions.has('Administrator')) return;

        const { author, channel, member } = message

        const cout = members.get(author.id);
        if (!cout) {
            members.set(author.id, 1)
            return
        }

        const newCount = cout + 1
        members.set(author.id, newCount)

        if (newCount > 5) {
            members.delete(author.id)

            member?.timeout(60_000, "Flood de messagens ");

            const embed = new EmbedBuilder({
                description: `${author} evite o flood de messagens por favor! 
                > leia as regras do servido para evitar punições severas
                ${italic("Voce porderá enviar messagens em breve...")}`
            }).setColor(config.colors.red as ColorResolvable)

            const message = await channel.send({ content: `||${author}||`, embeds: [embed] })

            setTimeout(() => message.delete().catch(() => { }), 60_000);
            return;
        }

        setTimeout(() => {
            const currCout = members.get(author.id);
            if (!currCout) return;
            members.set(author.id, currCout - 1);

        }, 6000)
    }
})