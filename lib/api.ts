import type { SnippetFormData } from "./types";

const API_BASE = "/api/snippets";

export async function fetchSnippets() {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error("Failed to fetch snippets");
  return response.json();
}

export async function fetchSnippet(id: string) {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch snippet");
  return response.json();
}

export async function createSnippet(data: SnippetFormData) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create snippet");
  return response.json();
}

export async function updateSnippet(
  id: string,
  data: Partial<SnippetFormData>
) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update snippet");
  return response.json();
}

export async function deleteSnippet(id: string) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete snippet");
}
