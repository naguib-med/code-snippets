import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { snippetSchema } from "@/lib/validations";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const json = await request.json();
    const body = snippetSchema.parse(json);

    const snippet = await prisma.snippet.create({
      data: {
        title: body.title,
        description: body.description || "",
        content: body.content,
        language: body.language,
        tags: body.tags,
        userId: session.user.id,
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
