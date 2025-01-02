"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import { deleteSnippet } from "@/lib/actions";
import type { Snippet } from "@prisma/client";

interface UserSnippetCardProps {
  snippet: Snippet;
}

export function UserSnippetCard({ snippet }: UserSnippetCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteSnippet(snippet.id);
      toast.success("Snippet deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete snippet");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{snippet.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/snippets/${snippet.id}/edit`)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-destructive hover:text-destructive"
            >
              <Trash className="h-4 w-4 mr-2" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">{snippet.language}</Badge>
          {snippet.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-md p-4 h-16 overflow-hidden">
          <pre className="text-sm">
            <code className={`language-${snippet.language}`}>
              {snippet.content.slice(0, 100)}...
            </code>
          </pre>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Created{" "}
        {formatDistanceToNow(new Date(snippet.createdAt), { addSuffix: true })}
      </CardFooter>
    </Card>
  );
}
