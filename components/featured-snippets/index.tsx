import { getFeaturedSnippets } from "@/lib/actions";
import { FeaturedSnippetCard } from "./featured-snippet-card";

export async function FeaturedSnippets() {
  const snippets = await getFeaturedSnippets();

  if (snippets.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No featured snippets yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {snippets.map((snippet) => (
        <FeaturedSnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}
