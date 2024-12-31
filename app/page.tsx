import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, Code2, Search, Tag, Sparkles } from "lucide-react";
import { SnippetsList } from "@/components/snippets-list";
import { SearchBar } from "@/components/search-bar";
import { TagCloud } from "@/components/tag-cloud";
import { Stats } from "@/components/stats";
import { getPopularTags, getSnippetsStats } from "@/lib/actions";
import { FeaturedSnippetsSkeleton } from "@/components/featured-snippets/skeleton";
import { FeaturedSnippets } from "@/components/featured-snippets/index";
import { SnippetsListSkeleton } from "@/components/snippets-list/skeleton";

export default async function Home({
  searchParams,
}: {
  searchParams?: { search?: string; tag?: string };
}) {
  const [tags, stats] = await Promise.all([
    getPopularTags(),
    getSnippetsStats(),
  ]);

  return (
    <main>
      {/* Hero Section with animated gradient */}
      <div className="relative bg-gradient-to-b from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container mx-auto py-16 relative">
          <div className="text-center space-y-4 mb-12">
            <div className="flex justify-center mb-4 animate-bounce-slow">
              <Code2 className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Code Snippets Manager
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Store, organize, and share your code snippets efficiently. Never
              lose that useful piece of code again.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/snippets/new">
                <Button size="lg" className="group">
                  <PlusCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Create Snippet
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Section with floating animation */}
          <div className="max-w-2xl mx-auto animate-float">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y bg-muted/50">
        <div className="container mx-auto py-8">
          <Stats stats={stats} />
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-12">
        {/* Featured Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Featured Snippets</h2>
          </div>
          <Suspense fallback={<FeaturedSnippetsSkeleton />}>
            <FeaturedSnippets />
          </Suspense>
        </div>

        {/* Tags Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Tag className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Popular Tags</h2>
          </div>
          <TagCloud tags={tags} />
        </div>

        {/* All Snippets */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">All Snippets</h2>
          <Suspense fallback={<SnippetsListSkeleton />}>
            <SnippetsList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
