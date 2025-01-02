"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiffViewer } from "@/components/diff-viewer";
import type { SnippetVersion } from "@prisma/client";

interface VersionDiffProps {
  currentVersion: SnippetVersion;
  previousVersion: SnippetVersion;
}

export function VersionDiff({
  currentVersion,
  previousVersion,
}: VersionDiffProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide Changes" : "Show Changes"}
      </Button>

      {isOpen && (
        <DiffViewer
          oldCode={previousVersion.content}
          newCode={currentVersion.content}
        />
      )}
    </div>
  );
}
