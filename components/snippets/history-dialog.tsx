"use client";

import { useState, useEffect } from "react";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VersionDiff } from "@/components/snippets/version-diff";
import { getSnippetHistory } from "@/lib/actions/history";
import { formatDistanceToNow } from "date-fns";
import type { SnippetVersion } from "@prisma/client";

interface HistoryDialogProps {
  snippetId: string;
}

export function HistoryDialog({ snippetId }: HistoryDialogProps) {
  const [versions, setVersions] = useState<SnippetVersion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getSnippetHistory(snippetId);
        setVersions(history);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, [snippetId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="h-4 w-4 mr-2" />
          History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Version History</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] mt-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <span className="text-muted-foreground">Loading history...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {versions.map((version, index) => (
                <div
                  key={version.id}
                  className="p-4 rounded-lg border bg-muted/50"
                >
                  <div className="flex justify-between mb-4">
                    <div>
                      <span className="font-medium">
                        {version.user?.name || "Anonymous"}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {formatDistanceToNow(new Date(version.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Version {versions.length - index}
                    </span>
                  </div>

                  {index < versions.length - 1 && (
                    <VersionDiff
                      currentVersion={version}
                      previousVersion={versions[index + 1]}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
