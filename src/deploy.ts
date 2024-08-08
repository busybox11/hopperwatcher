import config from "@/config";
import { loadCommands } from "@/loaders/commands";
import { REST, Routes } from "discord.js";

const commands = await loadCommands();
const data = commands.map((command) => command.data.toJSON());

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

console.log(
  `Deploying ${data.length} command${commands.length === 1 ? "" : "s"}...`
);

rest
  .put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), { body: data })
  .then(() =>
    console.log(
      `Successfully deployed ${commands.length} command${
        commands.length === 1 ? "" : "s"
      }!`
    )
  )
  .catch(console.error);
