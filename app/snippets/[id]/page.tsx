import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSnippet } from "@/lib/actions";
import { SnippetForm } from "@/components/snippet-form";
import { SnippetSkeleton } from "@/components/snippet-skeleton";
import { ErrorBoundary } from "@/components/error-boundary";

interface EditSnippetPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSnippetPage({
  params,
}: EditSnippetPageProps) {
  const resolvedParams = await params;
  const snippet = await getSnippet(resolvedParams.id);

  if (!snippet) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Edit Snippet</h1>
      <ErrorBoundary>
        <Suspense fallback={<SnippetSkeleton />}>
          <SnippetForm snippet={snippet} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
