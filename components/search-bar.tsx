"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useCallback, useTransition } from "react";
import { debounce } from "@/lib/utils";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      startTransition(() => {
        router.push(`/?${params.toString()}`);
      });
    },
    [router, searchParams, startTransition]
  );

  const debouncedSearch = debounce(handleSearch, 300);

  return (
    <div>
      <Input
        type="search"
        placeholder="Search snippets..."
        className="w-full pl-10 h-12 text-lg bg-background"
        onChange={(e) => debouncedSearch(e.target.value)}
        defaultValue={searchParams.get("search") ?? ""}
      />
    </div>
  );
}
