"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const Event_1 = require("../../structs/types/Event");
exports.default = new Event_1.Event({
    name: "interactionCreate",
    run(interaction) {
        if (interaction.isModalSubmit())
            __1.client.modals.get(interaction.customId)?.(interaction);
        if (interaction.isButton())
            __1.client.buttons.get(interaction.customId)?.(interaction);
        if (interaction.isStringSelectMenu())
            __1.client.selects.get(interaction.customId)?.(interaction);
    }
});
