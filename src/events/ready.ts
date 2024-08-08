import { Events } from "discord.js";

import type { Event } from "@/types";
import { getLocalBanList } from "@/utils/banlist";

const readyEvent: Event<Events.ClientReady> = {
  name: Events.ClientReady,
  runOnce: true,
  async execute(client) {
    console.log(`[READY] Logged in as ${client.user.tag}`);

    const banlist = await getLocalBanList();
    console.log(`[READY] Loaded ${banlist.length} IDs from banlist`);
  },
};
export default readyEvent;
