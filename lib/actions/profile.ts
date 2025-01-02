import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUserSnippets(userId: string) {
  return prisma.snippet.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserStats(userId: string) {
  const [totalSnippets, totalCollections, totalFavorites] = await Promise.all([
    prisma.snippet.count({ where: { userId } }),
    prisma.collection.count({ where: { userId } }),
    prisma.favorite.count({ where: { userId } }),
  ]);

  return { totalSnippets, totalCollections, totalFavorites };
}

export async function getUserActivity(userId: string) {
  const [snippets, favorites, collections] = await Promise.all([
    prisma.snippet.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.favorite.findMany({
      where: { userId },
      include: { snippet: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.collection.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const activities: Activity[] = [
    ...snippets.map((snippet) => ({
      id: `snippet-${snippet.id}`,
      type: "snippet" as const,
      title: "Created a new snippet",
      description: snippet.title,
      createdAt: snippet.createdAt.toISOString(),
    })),
    ...favorites.map((favorite) => ({
      id: `favorite-${favorite.id}`,
      type: "favorite" as const,
      title: "Favorited a snippet",
      description: favorite.snippet.title,
      createdAt: favorite.createdAt.toISOString(),
    })),
    ...collections.map((collection) => ({
      id: `collection-${collection.id}`,
      type: "collection" as const,
      title: "Created a new collection",
      description: collection.name,
      createdAt: collection.createdAt.toISOString(),
    })),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return activities.slice(0, 10);
}

export async function updateProfile(
  userId: string,
  data: {
    name?: string;
    email?: string;
    image?: string;
  }
) {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });
  revalidatePath("/profile");
  return user;
}
