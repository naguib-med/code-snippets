import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SnippetsList } from "@/components/snippets-list";
import { SearchBar } from "@/components/search-bar";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Code Snippets</h1>
        <Link href="/snippets/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Snippet
          </Button>
        </Link>
      </div>

      <SearchBar />

      <Suspense fallback={<div>Loading snippets...</div>}>
        <SnippetsList />
      </Suspense>
    </div>
  );
}
