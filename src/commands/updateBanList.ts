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
    await interaction.deferReply();

    const oldBanList = await getLocalBanList();

    await updateLocalBanList();
    const banList = await getLocalBanList();

    const diff = banList.filter((entry) => !oldBanList.includes(entry));
    const diffStr =
      diff.length > 0 ? `Added ${diff.length} entries.` : "No new entries.";

    await interaction.followUp(
      `Updated ban list with ${banList.length} entries.\n\n${diffStr}`
    );
  },
};

export default updateBanListCmd;
