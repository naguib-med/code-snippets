"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { snippetSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CodeEditor } from "@/components/code-editor";
import { LanguageSelect } from "@/components/language-select";
import { TagInput } from "@/components/tag-input";
import type { SnippetFormData } from "@/lib/types";
import type { Snippet } from "@prisma/client";
import type { SupportedLanguage } from "@/lib/constants";

interface SnippetFormProps {
  snippet?: Snippet;
}

export function SnippetForm({ snippet }: SnippetFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SnippetFormData>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: snippet?.title ?? "",
      description: snippet?.description ?? "",
      content: snippet?.content ?? "",
      language: (snippet?.language as SupportedLanguage) ?? "javascript",
      tags: snippet?.tags ?? [],
    },
  });

  async function onSubmit(data: SnippetFormData) {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        snippet ? `/api/snippets/${snippet.id}` : "/api/snippets",
        {
          method: snippet ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to save snippet");

      toast.success(snippet ? "Snippet updated" : "Snippet created");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        snippet ? "Failed to update snippet" : "Failed to create snippet"
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...form.register("title")}
          placeholder="Enter snippet title"
        />
        {form.formState.errors.title && (
          <p className="text-sm text-destructive">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          {...form.register("description")}
          placeholder="Enter snippet description"
        />
        {form.formState.errors.description && (
          <p className="text-sm text-destructive">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Language</Label>
        <LanguageSelect
          value={form.watch("language")}
          onValueChange={(value) => form.setValue("language", value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <TagInput
          tags={form.watch("tags")}
          onChange={(tags) => form.setValue("tags", tags)}
        />
      </div>

      <div className="space-y-2">
        <Label>Code</Label>
        <div className="border rounded-md">
          <CodeEditor
            language={form.watch("language")}
            value={form.watch("content")}
            onChange={(value) => form.setValue("content", value)}
          />
        </div>
        {form.formState.errors.content && (
          <p className="text-sm text-destructive">
            {form.formState.errors.content.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? snippet
            ? "Updating..."
            : "Creating..."
          : snippet
          ? "Update"
          : "Create"}
      </Button>
    </form>
  );
}
