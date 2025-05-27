import type { InsertPages } from "../../backend/dist/src/pages/pages.dto";

export type PartialCreateMenu = Pick<InsertPages, "name">;
