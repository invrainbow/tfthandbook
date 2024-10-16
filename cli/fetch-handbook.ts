import { fetchHandbookData } from "@/handbook/scrape";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development.local" });
fetchHandbookData();
