"use client";

import { useState, useEffect } from "react";
import { getSnippetHistory } from "@/lib/actions/history";
import type { SnippetVersion } from "@prisma/client";

export function useSnippetHistory(snippetId: string) {
  const [versions, setVersions] = useState<SnippetVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const history = await getSnippetHistory(snippetId);
        setVersions(history);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load history")
        );
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [snippetId]);

  return { versions, loading, error };
}
