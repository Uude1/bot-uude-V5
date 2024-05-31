import { Event } from "../../structs/types/Event";
const { Guild } = require('./schemas');

export default new Event({
    name: "guildMemberAdd",
    async run(member) {
        try {
            const guildData = await Guild.findOne({ id: member.guild.id }).lean().exec() || { id: member.guild.id };
            const role_id = guildData.welcome?.role_welcome;

            const role = member.guild.roles.cache.get(role_id);

            if (!role) {
                console.log("A função de autorole não está configurada corretamente ou o bot não tem permissão para atribuir a função ao novo membro.");
                return;
            }

            member.roles.add(role);
        } catch (error) {
            console.error(error);
        }
    }
});