#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";

import "dotenvLoad";
import db from "./db/db.ts";
import { seedDatabase } from "./db/seed.ts";

seedDatabase(db);

await dev(import.meta.url, "./main.ts");
