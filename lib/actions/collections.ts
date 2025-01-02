"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createCollection(name: string, description?: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  console.log("session", session);

  const collection = await prisma.collection.create({
    data: {
      name,
      description,
      userId: session?.user.id,
    },
  });
  console.log("collection", collection);
  revalidatePath("/collections");
  return collection;
}

export async function addToCollection(collectionId: string, snippetId: string) {
  await prisma.collectionSnippet.create({
    data: {
      collectionId,
      snippetId,
    },
  });
  revalidatePath("/collections");
}

export async function updateCollection(
  id: string,
  data: { name: string; description?: string }
) {
  const collection = await prisma.collection.update({
    where: { id },
    data,
  });
  revalidatePath(`/collections/${id}`);
  return collection;
}

export async function removeFromCollection(
  collectionId: string,
  snippetId: string
) {
  await prisma.collectionSnippet.delete({
    where: {
      collectionId_snippetId: {
        collectionId,
        snippetId,
      },
    },
  });
  revalidatePath(`/collections/${collectionId}`);
}

export async function deleteCollection(id: string) {
  await prisma.collection.delete({
    where: { id },
  });
  revalidatePath("/collections");
}
