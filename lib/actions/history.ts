import { prisma } from "@/lib/prisma";

export async function createSnippetVersion(
  snippetId: string,
  content: string,
  userId: string
) {
  return prisma.snippetVersion.create({
    data: {
      snippetId,
      content,
      userId,
    },
  });
}

export async function getSnippetHistory(snippetId: string) {
  return prisma.snippetVersion.findMany({
    where: { snippetId },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
}
