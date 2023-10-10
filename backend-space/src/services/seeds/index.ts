import { saveLaunches } from "./launches";

export async function seed() {
    await saveLaunches();
}