import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CollectionDialog } from "@/components/collections/collection-dialog";

export default async function CollectionsPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const collections = await prisma.collection.findMany({
    where: { userId: session.user.id },
    include: {
      _count: {
        select: { snippets: true },
      },
    },
  });

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Collections</h1>
        <CollectionDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
            <p className="text-muted-foreground mb-4">
              {collection.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {collection._count.snippets} snippets
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
