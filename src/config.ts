import "dotenv/config";
import { z } from "zod";

const configSchema = z.object({
  DISCORD_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  BANLIST_URL: z.string().optional(),
});

const config = {
  BANLIST_URL:
    "https://raw.githubusercontent.com/PotiteBulle/hopper/main/bannissements/usersToBan.txt",
  ...configSchema.parse(process.env),
};
export default config;
