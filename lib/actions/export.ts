import JSZip from "jszip";
import { prisma } from "@/lib/prisma";
import { getFileExtension } from "@/lib/utils/languages";

export async function exportSnippets(userId: string, snippetIds?: string[]) {
  const where = {
    userId,
    ...(snippetIds?.length ? { id: { in: snippetIds } } : {}),
  };

  const snippets = await prisma.snippet.findMany({ where });
  const zip = new JSZip();

  snippets.forEach((snippet) => {
    const ext = getFileExtension(snippet.language);
    const filename = `${snippet.title
      .toLowerCase()
      .replace(/\s+/g, "-")}${ext}`;
    zip.file(filename, snippet.content);
  });

  return zip.generateAsync({ type: "blob" });
}
