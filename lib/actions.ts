"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { SnippetFormData } from "./types";

export async function getSnippets(search?: string, tag?: string) {
  try {
    return await prisma.snippet.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } },
                  { language: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
          tag
            ? {
                tags: { has: tag },
              }
            : {},
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch snippets:", error);
    throw new Error("Failed to fetch snippets");
  }
}

export async function getSnippetsStats() {
  try {
    const [snippets, languages, tags, recentSnippets] = await Promise.all([
      prisma.snippet.count(),
      prisma.snippet.findMany({
        select: { language: true },
        distinct: ["language"],
      }),
      prisma.snippet.findMany({ select: { tags: true } }),
      prisma.snippet.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    return {
      totalSnippets: snippets,
      totalLanguages: languages.length,
      totalTags: [...new Set(tags.flatMap((s) => s.tags))].length,
      snippetsThisWeek: recentSnippets,
    };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return {
      totalSnippets: 0,
      totalLanguages: 0,
      totalTags: 0,
      snippetsThisWeek: 0,
    };
  }
}

export async function getSnippet(id: string) {
  try {
    return await prisma.snippet.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to fetch snippet:", error);
    throw new Error("Failed to fetch snippet");
  }
}

export async function createSnippet(data: SnippetFormData) {
  try {
    const snippet = await prisma.snippet.create({
      data: {
        ...data,
        description: data.description || "",
        tags: [],
      },
    });
    revalidatePath("/");
    return snippet;
  } catch (error) {
    console.error("Failed to create snippet:", error);
    throw new Error("Failed to create snippet");
  }
}

export async function updateSnippet(
  id: string,
  data: Partial<SnippetFormData>
) {
  try {
    const snippet = await prisma.snippet.update({
      where: { id },
      data,
    });
    revalidatePath("/");
    revalidatePath(`/snippets/${id}`);
    return snippet;
  } catch (error) {
    console.error("Failed to update snippet:", error);
    throw new Error("Failed to update snippet");
  }
}

export async function deleteSnippet(id: string) {
  try {
    await prisma.snippet.delete({
      where: { id },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to delete snippet:", error);
    throw new Error("Failed to delete snippet");
  }
}

export async function getFeaturedSnippets() {
  try {
    return await prisma.snippet.findMany({
      where: {
        OR: [
          { tags: { has: "featured" } },
          { language: { in: ["typescript", "javascript"] } },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 2,
    });
  } catch (error) {
    console.error("Failed to fetch featured snippets:", error);
    return [];
  }
}

export async function getPopularTags() {
  try {
    const snippets = await prisma.snippet.findMany({
      select: { tags: true },
    });

    const tagCounts = snippets
      .flatMap((s) => s.tags)
      .reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  } catch (error) {
    console.error("Failed to fetch popular tags:", error);
    return [];
  }
}
