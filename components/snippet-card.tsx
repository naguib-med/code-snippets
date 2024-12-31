"use client";

import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { Snippet } from "@prisma/client";

export function SnippetCard({ snippet }: { snippet: Snippet }) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(snippet.content);
    toast.success("Copied to clipboard!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{snippet.title}</span>
          <Button variant="ghost" size="icon" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>{snippet.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-md p-4 overflow-hidden">
          <pre className="text-sm">
            <code className="language-{snippet.language}">
              {snippet.content.length > 150
                ? `${snippet.content.slice(0, 150)}...`
                : snippet.content}
            </code>
          </pre>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(snippet.createdAt), {
            addSuffix: true,
          })}
        </div>
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
