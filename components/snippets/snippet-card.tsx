"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, ExternalLink, MoreVertical, Pencil, Trash } from "lucide-react";
import { deleteSnippet } from "@/lib/actions";
import type { Snippet } from "@prisma/client";

interface SnippetCardProps {
  snippet: Snippet;
  showActions?: boolean;
}

export function SnippetCard({ snippet, showActions = true }: SnippetCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(snippet.content);
    toast.success("Copied to clipboard!");
  };

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
    <Card className="group bg-card hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{snippet.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => router.push(`/snippets/${snippet.id}/edit`)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-destructive focus:text-destructive"
                    disabled={isDeleting}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        <CardDescription>{snippet.description}</CardDescription>
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
        <div className="bg-muted rounded-md p-4 h-24 overflow-hidden">
          <pre className="text-sm">
            <code className={`language-${snippet.language}`}>
              {snippet.content.slice(0, 150)}...
            </code>
          </pre>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(snippet.createdAt), {
            addSuffix: true,
          })}
        </span>
        <Link href={`/snippets/${snippet.id}`}>
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
