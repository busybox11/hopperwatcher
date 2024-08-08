import type { Command } from "@/types";
import { getLocalBanList, updateLocalBanList } from "@/utils/banlist";
import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js";

const updateBanListCmd: Command<ChatInputCommandInteraction> = {
  data: new SlashCommandBuilder()
    .setName("updatebanlist")
    .setDescription(
      "Update the bot ban list from the specified banlist file URL"
    ),

  async execute(interaction) {
    await interaction.reply("Updating ban list...");

    await updateLocalBanList();
    const banList = await getLocalBanList();

    await interaction.reply(`Updated ban list with ${banList.length} entries`);
  },
};

export default updateBanListCmd;
