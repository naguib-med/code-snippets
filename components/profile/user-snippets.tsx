"use client";

import { useState } from "react";
import { SnippetCard } from "@/components/snippets/snippet-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";
import type { Snippet } from "@prisma/client";

interface UserSnippetsProps {
  snippets: Snippet[];
}

export function UserSnippets({ snippets }: UserSnippetsProps) {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("all");

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      search.toLowerCase() === "" ||
      snippet.title.toLowerCase().includes(search.toLowerCase()) ||
      snippet.description?.toLowerCase().includes(search.toLowerCase());
    const matchesLanguage = language === "all" || snippet.language === language;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Search snippets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredSnippets.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No snippets found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
}
