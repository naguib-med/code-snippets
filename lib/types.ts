import { z } from "zod";
import { snippetSchema } from "./validations";

export type SnippetFormData = z.infer<typeof snippetSchema>;
