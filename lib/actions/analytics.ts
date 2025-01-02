import { prisma } from "@/lib/prisma";
import { startOfWeek, endOfWeek } from "date-fns";

export async function trackSnippetView(snippetId: string) {
  await prisma.snippetView.create({
    data: {
      snippetId,
    },
  });
}

export async function getSnippetAnalytics(snippetId: string) {
  const [totalViews, weeklyViews] = await Promise.all([
    prisma.snippetView.count({
      where: { snippetId },
    }),
    prisma.snippetView.count({
      where: {
        snippetId,
        createdAt: {
          gte: startOfWeek(new Date()),
          lte: endOfWeek(new Date()),
        },
      },
    }),
  ]);

  return { totalViews, weeklyViews };
}
