import {
  Client,
  Collection,
  GatewayIntentBits,
  type Interaction,
} from "discord.js";

import config from "@/config";
import { loadCommands } from "@/loaders/commands";
import { loadEvents } from "@/loaders/events";
import type { Command } from "@/types";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMembers,
  ],
});

console.log("[INIT] Loading commands...");
export const clientCommands: Collection<
  string,
  Command<Interaction>
> = new Collection();
const commands = await loadCommands();
commands.forEach((command) => {
  clientCommands.set(command.data.name, command);

  console.log(`[COMMANDS] Loaded command ${command.data.name}`);
});

console.log("[INIT] Loading events...");
export const events = await loadEvents();
events.forEach((event) => {
  if (event.runOnce) {
    client.once(event.name, event.execute);
  } else {
    client.on(event.name, event.execute);
  }

  console.log(`[EVENTS] Loaded event ${event.name}`);
});

client.login(config.DISCORD_TOKEN);
