"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const Event_1 = require("../../structs/types/Event");
exports.default = new Event_1.Event({
    name: "ready",
    once: true,
    run() {
        const { commands, buttons, selects, modals } = __1.client;
        console.clear();
        console.log(`Commands loaded: ${commands.size}`.red);
        console.log(`Buttons loaded: ${buttons.size}`.red);
        console.log(`Select Menus loaded: ${selects.size}`.red);
        console.log(`Modals loaded: ${modals.size}`.red);
        console.log(`Bot online em ${__1.client.user?.tag}!`.red);
    },
});
