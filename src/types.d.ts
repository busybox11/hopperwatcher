import type {
  BaseInteraction,
  ClientEvents,
  Collection,
  SlashCommandBuilder,
} from "discord.js";

export interface Command<T extends BaseInteraction> {
  data: SlashCommandBuilder;
  execute(interaction: T): Promise<void>;
}

export interface Event<T extends keyof ClientEvents> {
  name: keyof ClientEvents;
  runOnce?: boolean;
  execute(...args: ClientEvents[T]): Promise<void>;
}
