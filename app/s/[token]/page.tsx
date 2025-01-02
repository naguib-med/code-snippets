import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CodePreview } from "@/components/code-preview";
import { Badge } from "@/components/ui/badge";
import { getLanguageLabel } from "@/lib/utils/languages";

export default async function SharedSnippetPage({
  params,
}: {
  params: { token: string };
}) {
  const snippet = await prisma.snippet.findUnique({
    where: {
      shareToken: params.token,
      isPublic: true,
    },
    include: {
      user: true,
    },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
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

      <div className="mb-8">
        <CodePreview code={snippet.content} language={snippet.language} />
      </div>

      <div className="text-sm text-muted-foreground">
        Shared by {snippet.user?.name || "Anonymous"}
      </div>
    </div>
  );
}
