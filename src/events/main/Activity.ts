import { client } from "../..";
import { Event } from "../../structs/types/Event";
import { ActivityType } from 'discord.js';

export default new Event({
    name: "ready",
    once: true,
    run() {
        function updateActivity() {
            const activities = [
                { name: 'Exo Roleplay', type: ActivityType.Playing },
                // { name: `${client.guilds.cache.get('1123453719342760028')?.memberCount} pessoas 👀`, type: ActivityType.Watching },
                { name: `www.exoroleplay.com.br`, type: ActivityType.Watching },
            ];

            let currentIndex = 0;

            setInterval(() => {
                const activity = activities[currentIndex];
                client.user?.setActivity(activity.name, { type: activity.type as ActivityType.Playing | ActivityType.Watching });

                currentIndex++;
                if (currentIndex >= activities.length) {
                    currentIndex = 0;
                }
            }, 10000);
        }
        updateActivity();
    },
});
