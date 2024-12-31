import { prisma } from "@/lib/db";
import { SnippetCard } from "./snippet-card";

export async function SnippetsList({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  const snippets = await prisma.snippet.findMany({
    where: searchParams?.search
      ? {
          OR: [
            { title: { contains: searchParams.search, mode: "insensitive" } },
            {
              description: {
                contains: searchParams.search,
                mode: "insensitive",
              },
            },
            {
              language: { contains: searchParams.search, mode: "insensitive" },
            },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  if (snippets.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No snippets found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}
