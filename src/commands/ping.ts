import type { Command } from "@/types";
import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js";

const pingCmd: Command<ChatInputCommandInteraction> = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  async execute(interaction) {
    await interaction.reply(
      `**Pong!** Latency: ${interaction.client.ws.ping}ms`
    );
  },
};

export default pingCmd;
