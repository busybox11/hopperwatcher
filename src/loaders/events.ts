import path from "path";
import fs from "fs";

import type { Event } from "@/types";

export function loadEvents() {
  const events = path.join(__dirname, "..", "events");
  return Promise.all(
    fs
      .readdirSync(events)
      .filter((file) => file.endsWith(".ts"))
      .map(async (file) => {
        const event = await import(path.join(events, file));
        return event.default as Event<any>;
      })
  );
}
