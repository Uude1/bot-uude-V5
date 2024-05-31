"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const Event_1 = require("../../structs/types/Event");
const discord_js_1 = require("discord.js");
exports.default = new Event_1.Event({
    name: "ready",
    once: true,
    run() {
        function updateActivity() {
            const newLocal = '1123453719342760028';
            const activities = [
                { name: 'Exo Roleplay', type: discord_js_1.ActivityType.Playing },
                // { name: `${__1.client.guilds.cache.get(newLocal)?.memberCount} pessoas 👀`, type: discord_js_1.ActivityType.Watching },
                { name: `www.exoroleplay.com.br`, type: discord_js_1.ActivityType.Watching },
            ];
            let currentIndex = 0;
            setInterval(() => {
                const activity = activities[currentIndex];
                __1.client.user?.setActivity(activity.name, { type: activity.type });
                currentIndex++;
                if (currentIndex >= activities.length) {
                    currentIndex = 0;
                }
            }, 10000);
        }
        updateActivity();
    },
});
