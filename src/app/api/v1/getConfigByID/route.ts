import { NextRequest, NextResponse } from "next/server";
import { getConfigById } from "@/lib/config-service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id") ?? undefined;
  const isDownload = searchParams.get("isDownload") === "true";

  const result = await getConfigById(id, isDownload);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
