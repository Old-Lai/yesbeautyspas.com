import fs from "fs/promises";
import path from "path";
import type { Service } from "../types/serviceResponseDefinitions";

const DATA_FILE = path.join(process.cwd(), "src/data/services.json");

let cache: Service[] = [];

/* Load on startup */
export async function loadServices() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    cache = JSON.parse(raw);
  } catch {
    cache = [];
  }
}

/* Get all */
export function getServices() {
  return cache;
}

/* Save all */
async function persist() {
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify(cache, null, 2),
    "utf-8"
  );
}

/* Add one */
export async function addService(service: Service) {
  cache.push(service);
  await persist();
}
