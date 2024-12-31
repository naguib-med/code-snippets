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
import type { SnippetFormData } from "@/lib/types";

export function SnippetForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SnippetFormData>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      language: "javascript",
    },
  });

  async function onSubmit(data: SnippetFormData) {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create snippet");

      toast.success("Snippet created successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create snippet");
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
          <p className="text-sm text-red-500">
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
          <p className="text-sm text-red-500">
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
        <Label>Code</Label>
        <div className="border rounded-md">
          <CodeEditor
            language={form.watch("language")}
            value={form.watch("content")}
            onChange={(value) => form.setValue("content", value)}
          />
        </div>
        {form.formState.errors.content && (
          <p className="text-sm text-red-500">
            {form.formState.errors.content.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Snippet"}
      </Button>
    </form>
  );
}
