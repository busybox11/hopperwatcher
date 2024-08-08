import path from "path";
import fs from "fs";

import type { Interaction } from "discord.js";
import type { Command } from "@/types";

export function loadCommands() {
  const commands = path.join(__dirname, "..", "commands");
  return Promise.all(
    fs
      .readdirSync(commands)
      .filter((file) => file.endsWith(".ts"))
      .map(async (file) => {
        const command = await import(path.join(commands, file));
        return command.default as Command<Interaction>;
      })
  );
}
