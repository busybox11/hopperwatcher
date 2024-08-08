import { clientCommands } from "@/index";

import { Events } from "discord.js";

import type { Event } from "@/types";

const interactionCreateEvent: Event<Events.InteractionCreate> = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = clientCommands.get(interaction.commandName);
    if (!command) {
      console.error(
        `[INTERACTION] Command ${interaction.commandName} not found!`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};

export default interactionCreateEvent;
