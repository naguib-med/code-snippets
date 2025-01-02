import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SnippetActions } from "@/components/snippets/snippet-actions";
import { CodePreview } from "@/components/code-preview";
import { getLanguageLabel } from "@/lib/utils/languages";
import { Badge } from "@/components/ui/badge";
import { trackSnippetView } from "@/lib/actions/analytics";

export default async function SnippetPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const snippet = await prisma.snippet.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      _count: {
        select: { favorites: true, views: true },
      },
    },
  });

  if (!snippet) {
    notFound();
  }

  // Track view
  await trackSnippetView(snippet.id);

  const [isFavorited, collections] = session?.user
    ? await Promise.all([
        prisma.favorite.findUnique({
          where: {
            userId_snippetId: {
              userId: session.user.id,
              snippetId: snippet.id,
            },
          },
        }) !== null,
        prisma.collection.findMany({
          where: { userId: session.user.id },
        }),
      ])
    : [false, []];

  return (
    <div className="container py-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{snippet.title}</h1>
          <p className="text-muted-foreground mb-4">{snippet.description}</p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">
              {getLanguageLabel(snippet.language)}
            </Badge>
            {snippet.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {session?.user && (
          <SnippetActions
            snippet={snippet}
            userId={session.user.id}
            isFavorited={isFavorited}
            collections={collections}
          />
        )}
      </div>

      <div className="mb-8">
        <CodePreview code={snippet.content} language={snippet.language} />
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Created by {snippet.user?.name || "Anonymous"}</span>
          <span>•</span>
          <span>{snippet._count.favorites} favorites</span>
          <span>•</span>
          <span>{snippet._count.views} views</span>
        </div>
      </div>
    </div>
  );
}
