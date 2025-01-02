"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addToCollection } from "@/lib/actions/collections";
import { toast } from "sonner";
import type { Collection } from "@prisma/client";

interface AddToCollectionProps {
  snippetId: string;
  collections: Collection[];
}

export function AddToCollection({
  snippetId,
  collections,
}: AddToCollectionProps) {
  const [selectedCollection, setSelectedCollection] = useState<string>("");

  const handleAdd = async () => {
    try {
      await addToCollection(selectedCollection, snippetId);
      toast.success("Added to collection");
    } catch (error) {
      toast.error("Failed to add to collection");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FolderPlus className="h-4 w-4 mr-2" />
          Add to Collection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Collection</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select
            value={selectedCollection}
            onValueChange={setSelectedCollection}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a collection" />
            </SelectTrigger>
            <SelectContent>
              {collections.map((collection) => (
                <SelectItem key={collection.id} value={collection.id}>
                  {collection.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAdd} disabled={!selectedCollection}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
