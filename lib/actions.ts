"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { SnippetFormData } from "./types";

export async function getSnippets(search?: string) {
  try {
    return await prisma.snippet.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
              { language: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch snippets:", error);
    throw new Error("Failed to fetch snippets");
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
