import "dotenv/config";
import { z } from "zod";

const configSchema = z.object({
  DISCORD_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
});

export default configSchema.parse(process.env);
