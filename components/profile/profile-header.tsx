"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/lib/actions/profile";
import { toast } from "sonner";
import type { User } from "next-auth";

interface ProfileHeaderProps {
  user: User;
  stats: {
    totalSnippets: number;
    totalCollections: number;
    totalFavorites: number;
  };
}

export function ProfileHeader({ user, stats }: ProfileHeaderProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUpdating(true);
      // In a real app, you'd upload to a storage service
      // For now, we'll just simulate the update
      await updateProfile(user.id, { image: URL.createObjectURL(file) });
      toast.success("Profile image updated");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update profile image");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-lg" />
      <div className="container">
        <div className="flex flex-col md:flex-row gap-6 -mt-12 items-start">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={user.image || ""} alt={user.name || ""} />
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-1 rounded-full bg-background border cursor-pointer"
            >
              <Camera className="h-4 w-4" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUpdating}
              />
            </label>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{stats.totalSnippets}</p>
              <p className="text-sm text-muted-foreground">Snippets</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalCollections}</p>
              <p className="text-sm text-muted-foreground">Collections</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalFavorites}</p>
              <p className="text-sm text-muted-foreground">Favorites</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
