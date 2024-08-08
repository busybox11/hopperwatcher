import config from "@/config";

import os from "os";

import { mkdir } from "node:fs/promises";

// Save banlist to disk in temp folder
const BANLIST_PATH = os.tmpdir() + "/HopperWatcher/";
const BANLIST_FILE = "banlist.txt";

async function fetchBanList() {
  let allBanLists = [];

  for (const url of config.BANLIST_URLS.split(",")) {
    console.log(`[BANLIST] Fetching from ${url}`);

    const response = await fetch(url);
    const text = await response.text();
    allBanLists.push(text);
  }

  return allBanLists.join("\n");
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

  try {
    const banListFile = Bun.file(BANLIST_PATH + BANLIST_FILE);

    const rawList = await banListFile.text();

    return rawList
      .split("\n")
      .map((line) => line.trim().replaceAll(/[^0-9]/g, ""));
  } catch (e) {
    console.error(e);
    return [];
  }
}
