import { z } from "zod";
import { SUPPORTED_LANGUAGES } from "./constants";

export const snippetSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  content: z.string().min(1, "Code content is required"),
  language: z.enum([
    SUPPORTED_LANGUAGES[0].value,
    ...SUPPORTED_LANGUAGES.slice(1).map((l) => l.value),
  ]),
  tags: z.array(z.string()).default([]),
});
