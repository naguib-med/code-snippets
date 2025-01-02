import { diffLines, Change } from "diff";

export function computeDiff(oldStr: string, newStr: string): Change[] {
  return diffLines(oldStr, newStr);
}

export function formatDiffLine(
  line: string,
  type: "added" | "removed" | "normal"
): string {
  const prefix = type === "added" ? "+ " : type === "removed" ? "- " : "  ";
  return prefix + line;
}
