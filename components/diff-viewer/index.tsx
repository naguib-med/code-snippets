"use client";

import { useState } from "react";
import { diffLines } from "diff";
import { cn } from "@/lib/utils";

interface DiffViewerProps {
  oldCode: string;
  newCode: string;
}

export function DiffViewer({ oldCode, newCode }: DiffViewerProps) {
  const [showInline, setShowInline] = useState(true);
  const diff = diffLines(oldCode, newCode);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInline(!showInline)}
        >
          {showInline ? "Split View" : "Inline View"}
        </Button>
      </div>
      <div className={cn("grid gap-4", !showInline && "grid-cols-2")}>
        {showInline ? (
          <div className="border rounded-lg p-4 bg-muted/50">
            {diff.map((part, index) => (
              <pre
                key={index}
                className={cn(
                  "text-sm font-mono",
                  part.added && "bg-green-500/10 text-green-700",
                  part.removed && "bg-red-500/10 text-red-700"
                )}
              >
                {part.value}
              </pre>
            ))}
          </div>
        ) : (
          <>
            <div className="border rounded-lg p-4 bg-muted/50">
              <pre className="text-sm font-mono">{oldCode}</pre>
            </div>
            <div className="border rounded-lg p-4 bg-muted/50">
              <pre className="text-sm font-mono">{newCode}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
