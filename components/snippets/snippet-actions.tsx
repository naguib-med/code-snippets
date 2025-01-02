"use client";

import { Share2, History, Star, Download, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareDialog } from "./share-dialog";
import { HistoryDialog } from "./history-dialog";
import { ExportDialog } from "./export-dialog";
import { AddToCollection } from "@/components/collections/add-to-collection";
import { FavoriteButton } from "./favorite-button";
import type { Collection, Snippet } from "@prisma/client";

interface SnippetActionsProps {
  snippet: Snippet;
  userId: string;
  isFavorited: boolean;
  collections: Collection[];
}

export function SnippetActions({
  snippet,
  userId,
  isFavorited,
  collections,
}: SnippetActionsProps) {
  return (
    <div className="flex gap-2">
      <FavoriteButton
        snippetId={snippet.id}
        userId={userId}
        initialFavorited={isFavorited}
      />
      <ShareDialog snippetId={snippet.id} />
      <HistoryDialog snippetId={snippet.id} />
      <ExportDialog userId={userId} snippets={[snippet]} />
      <AddToCollection snippetId={snippet.id} collections={collections} />
    </div>
  );
}
