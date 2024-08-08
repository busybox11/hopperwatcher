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

    // DEBUG: Trigger guild member add event for testing
    // client.once(Events.MessageCreate, (message) => {
    //   if (!message.member) return;

    //   client.emit(Events.GuildMemberAdd, message.member);
    // });
  },
};
export default readyEvent;
