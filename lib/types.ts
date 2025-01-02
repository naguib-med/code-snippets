import { z } from "zod";
import { snippetSchema } from "./validations";

export type SnippetFormData = z.infer<typeof snippetSchema>;

export interface Activity {
  id: string;
  type: "snippet" | "favorite" | "collection";
  title: string;
  description: string;
  createdAt: string;
}
