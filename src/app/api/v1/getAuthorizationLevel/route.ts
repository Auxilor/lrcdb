import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const apiKey = searchParams.get("apiKey") ?? undefined;

  const level = await getAuthLevel(apiKey);

  return NextResponse.json({ level });
}
