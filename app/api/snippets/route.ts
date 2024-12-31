import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { snippetSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = snippetSchema.parse(json);

    const snippet = await prisma.snippet.create({
      data: {
        title: body.title,
        description: body.description || "",
        content: body.content,
        language: body.language,
        tags: [],
      },
    });

    return NextResponse.json(snippet, { status: 201 });
  } catch (error) {
    console.error("Failed to create snippet:", error);
    return NextResponse.json(
      { error: "Failed to create snippet" },
      { status: 500 }
    );
  }
}
