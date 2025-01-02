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
import { getSnippetHistory } from "@/lib/actions/history";
import { formatDistanceToNow } from "date-fns";

interface HistoryDialogProps {
  snippetId: string;
}

export function HistoryDialog({ snippetId }: HistoryDialogProps) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const history = await getSnippetHistory(snippetId);
      setVersions(history);
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Version History</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] mt-4">
          <div className="space-y-4">
            {versions.map((version) => (
              <div
                key={version.id}
                className="p-4 rounded-lg border bg-muted/50"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    {version.user.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(version.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <pre className="text-sm bg-background p-2 rounded">
                  <code>{version.content}</code>
                </pre>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
