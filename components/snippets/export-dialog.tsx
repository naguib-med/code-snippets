"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { exportSnippets } from "@/lib/actions/export";
import { toast } from "sonner";

interface ExportDialogProps {
  userId: string;
  snippets: Array<{ id: string; title: string }>;
}

export function ExportDialog({ userId, snippets }: ExportDialogProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleExport = async () => {
    try {
      const blob = await exportSnippets(
        userId,
        selectedIds.length ? selectedIds : undefined
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "snippets.zip";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Snippets exported successfully");
    } catch (error) {
      toast.error("Failed to export snippets");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Snippets</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            {snippets.map((snippet) => (
              <div key={snippet.id} className="flex items-center space-x-2">
                <Checkbox
                  id={snippet.id}
                  checked={selectedIds.includes(snippet.id)}
                  onCheckedChange={(checked) => {
                    setSelectedIds(
                      checked
                        ? [...selectedIds, snippet.id]
                        : selectedIds.filter((id) => id !== snippet.id)
                    );
                  }}
                />
                <label htmlFor={snippet.id}>{snippet.title}</label>
              </div>
            ))}
          </div>
          <Button onClick={handleExport}>
            Export {selectedIds.length ? `(${selectedIds.length})` : "All"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
