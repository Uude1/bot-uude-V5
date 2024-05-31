"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../../structs/types/Event");
const discord_js_1 = require("discord.js");
exports.default = new Event_1.Event({
    name: "messageUpdate",
    once: false,
    run(newMessage) {
        if (newMessage.author?.bot)
            return;
        if (newMessage.author?.id === newMessage.guild?.ownerId)
            return;
        if (newMessage.member?.permissions.has('Administrator'))
            return;
        const antilinkEnabled = true;
        const allowedChannelId = "1123340170251489380";
        if (newMessage.channel.id === allowedChannelId)
            return; // Permite mensagens no canal especificado
        if (newMessage && antilinkEnabled && newMessage.content && newMessage.content.match(/https:\/\//i)) {
            newMessage.delete().catch(console.error);
            const embed = new discord_js_1.EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Antilink")
                .setDescription(`Mensagem contendo um link foi removida.\n\nAutor: ${newMessage.author}`)
                .setImage("https://cdn.discordapp.com/attachments/1098472270655127594/1121980617052147712/b854bf651313d1c4b24b4de01052656c.gif");
            newMessage.channel.send({ embeds: [embed] });
        }
    },
});
