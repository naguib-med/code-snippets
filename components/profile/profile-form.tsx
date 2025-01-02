"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/actions";
import { profileSchema } from "@/lib/validations";
import type { User } from "next-auth";

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
    },
  });

  async function onSubmit(data: { name: string; email: string }) {
    try {
      setIsLoading(true);
      await updateProfile(user.id, data);
      toast.success("Profile updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive mt-1">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
