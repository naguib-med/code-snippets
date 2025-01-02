import { SUPPORTED_LANGUAGES } from "@/lib/constants";

const EXTENSIONS: Record<string, string> = {
  javascript: ".js",
  typescript: ".ts",
  python: ".py",
  java: ".java",
  csharp: ".cs",
  go: ".go",
};

export function getFileExtension(language: string): string {
  return EXTENSIONS[language] || ".txt";
}

export function getLanguageLabel(value: string): string {
  return (
    SUPPORTED_LANGUAGES.find((lang) => lang.value === value)?.label || value
  );
}
