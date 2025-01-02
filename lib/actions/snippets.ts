import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { generateShareToken } from "@/lib/utils/tokens";

export async function shareSnippet(snippetId: string) {
  const shareToken = generateShareToken();

  const snippet = await prisma.snippet.update({
    where: { id: snippetId },
    data: {
      shareToken,
      isPublic: true,
    },
  });

  return snippet.shareToken;
}

export async function toggleFavorite(snippetId: string, userId: string) {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_snippetId: {
        userId,
        snippetId,
      },
    },
  });

  if (favorite) {
    await prisma.favorite.delete({
      where: { id: favorite.id },
    });
    return false;
  } else {
    await prisma.favorite.create({
      data: {
        userId,
        snippetId,
      },
    });
    return true;
  }
}
