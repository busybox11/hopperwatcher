import { Events } from "discord.js";

import type { Event } from "@/types";
import { getLocalBanList } from "@/utils/banlist";

const newMemberEvent: Event<Events.GuildMemberAdd> = {
  name: Events.GuildMemberAdd,
  runOnce: true,
  async execute(member) {
    console.log(
      `[NEW_MEMBER] ${member.user.username} (${member.user.id}) joined ${member.guild.name} (${member.guild.id})`
    );

    const banlist = await getLocalBanList();

    if (banlist.includes(member.user.id)) {
      console.log(
        `[BAN] ${member.user.username} (${member.user.id}) was banned`
      );

      // Ban the user
      await member.guild.members.ban(member.user, {
        reason: "[HopperWatcher] Automatically banned for being in the banlist",
      });
    } else {
      console.log(
        `[NEW_MEMBER] ${member.user.username} (${member.user.id}) is not in the banlist`
      );
    }
  },
};
export default newMemberEvent;
