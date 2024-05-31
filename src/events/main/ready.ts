import { client } from "../..";
import { Event } from "../../structs/types/Event";

export default new Event({
    name: "ready",
    once: true,
    run() {
        const { commands, buttons, selects, modals } = client;

        console.clear()

        console.log(`Commands loaded: ${commands.size}`.red);
        console.log(`Buttons loaded: ${buttons.size}`.red);
        console.log(`Select Menus loaded: ${selects.size}`.red);
        console.log(`Modals loaded: ${modals.size}`.red);
        console.log(`Bot online em ${client.user?.tag}!`.red);
    },
})