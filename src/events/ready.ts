import { Events } from "discord.js";

import type { Event } from "@/types";

const readyEvent: Event<Events.ClientReady> = {
  name: Events.ClientReady,
  runOnce: true,
  async execute(client) {
    console.log(`[READY] Logged in as ${client.user.tag}`);
  },
};
export default readyEvent;
