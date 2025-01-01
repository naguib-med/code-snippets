import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { snippetSchema } from "@/lib/validations";
import { notFound } from "next/navigation";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const snippet = await prisma.snippet.findUnique({
      where: { id: (await params).id },
    });

    if (!snippet) {
      return notFound();
    }

    return NextResponse.json(snippet);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch snippet",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const json = await req.json();
    const body = snippetSchema.partial().parse(json);

    const snippet = await prisma.snippet.update({
      where: { id: (await params).id },
      data: body,
    });

    return NextResponse.json(snippet);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update snippet",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await prisma.snippet.delete({
      where: { id: (await params).id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete snippet",
      },
      { status: 500 }
    );
  }
}
