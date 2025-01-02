"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { shareSnippet } from "@/lib/actions/snippets";
import { toast } from "sonner";

interface ShareDialogProps {
  snippetId: string;
}

export function ShareDialog({ snippetId }: ShareDialogProps) {
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const token = await shareSnippet(snippetId);
      const url = `${window.location.origin}/s/${token}`;
      setShareUrl(url);
    } catch (error) {
      toast.error("Failed to generate share link");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Snippet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!shareUrl ? (
            <Button onClick={handleShare}>Generate Share Link</Button>
          ) : (
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly />
              <Button size="icon" onClick={copyToClipboard}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
