"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface TagCloudProps {
  tags: Array<{ name: string; count: number }>;
}

export function TagCloud({ tags }: TagCloudProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    if (activeTag === tag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(({ name, count }) => (
        <Badge
          key={name}
          variant="secondary"
          className={cn(
            "cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1 text-sm",
            activeTag === name && "bg-primary text-primary-foreground"
          )}
          onClick={() => handleTagClick(name)}
        >
          {name}
          <span className="ml-2 px-2 py-0.5 rounded-full bg-muted-foreground/10">
            {count}
          </span>
        </Badge>
      ))}
    </div>
  );
}
