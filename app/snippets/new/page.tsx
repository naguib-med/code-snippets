import { SnippetForm } from "@/components/snippet-form";

export default function NewSnippetPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Create New Snippet</h1>
      <SnippetForm />
    </div>
  );
}
