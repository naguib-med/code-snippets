import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SnippetCard } from "@/components/snippets/snippet-card";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { CollectionEditDialog } from "@/components/collections/collection-edit-dialog";

export default async function CollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const collection = await prisma.collection.findUnique({
    where: { id: params.id },
    include: {
      snippets: {
        include: {
          snippet: true,
        },
      },
    },
  });

  if (!collection || session?.user.id !== collection.userId) {
    notFound();
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{collection.name}</h1>
          {collection.description && (
            <p className="text-muted-foreground">{collection.description}</p>
          )}
        </div>
        <CollectionEditDialog collection={collection} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collection.snippets.map(({ snippet }) => (
          <SnippetCard key={snippet.id} snippet={snippet} showActions={false} />
        ))}
      </div>
    </div>
  );
}
