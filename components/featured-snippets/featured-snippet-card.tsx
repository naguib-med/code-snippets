"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { Snippet } from "@prisma/client";

interface FeaturedSnippetCardProps {
  snippet: Snippet;
}

export function FeaturedSnippetCard({ snippet }: FeaturedSnippetCardProps) {
  return (
    <Card className="bg-card hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{snippet.title}</CardTitle>
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          {snippet.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary">
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
