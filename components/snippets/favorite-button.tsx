"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleFavorite } from "@/lib/actions/snippets";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  snippetId: string;
  userId: string;
  initialFavorited?: boolean;
}

export function FavoriteButton({
  snippetId,
  userId,
  initialFavorited = false,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);

  const handleToggle = async () => {
    const newState = await toggleFavorite(snippetId, userId);
    setIsFavorited(newState);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className={cn("group", isFavorited && "text-yellow-500")}
    >
      <Star
        className={cn(
          "h-4 w-4 mr-2 transition-transform group-hover:scale-110",
          isFavorited && "fill-current"
        )}
      />
      {isFavorited ? "Favorited" : "Favorite"}
    </Button>
  );
}
