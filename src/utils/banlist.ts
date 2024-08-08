import config from "@/config";

import os from "os";

import { mkdir } from "node:fs/promises";

// Save banlist to disk in temp folder
const BANLIST_PATH = os.tmpdir() + "/HopperWatcher/";
const BANLIST_FILE = "banlist.txt";

async function fetchBanList() {
  console.log(`[BANLIST] Fetching from ${config.BANLIST_URL}`);

  const response = await fetch(config.BANLIST_URL);
  const text = await response.text();

  return text;
}

export async function updateLocalBanList() {
  const text = await fetchBanList();

  console.log(`[BANLIST] Saving to ${BANLIST_PATH + BANLIST_FILE}`);

  await mkdir(BANLIST_PATH, { recursive: true });
  await Bun.write(BANLIST_PATH + BANLIST_FILE, text);

  return true;
}

export async function getLocalBanList() {
  console.log(`[BANLIST] Loading from ${BANLIST_PATH + BANLIST_FILE}`);

  const banListFile = Bun.file(BANLIST_PATH + BANLIST_FILE);

  const rawList = await banListFile.text();

  return rawList
    .split("\n")
    .map((line) => line.trim().replaceAll(/[^0-9]/g, ""));
}
