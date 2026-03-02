import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { getConfigsWithoutContents } from "@/lib/config-service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const plugin = searchParams.get("plugin") ?? undefined;
  const query = searchParams.get("query") ?? "";
  const limit = parseInt(searchParams.get("limit") ?? "150");
  const skip = parseInt(searchParams.get("skip") ?? "0");
  const apiKey = searchParams.get("apiKey") ?? "";

  const showPrivate = (await getAuthLevel(apiKey)) > 0;

  const result = await getConfigsWithoutContents({
    plugin,
    query,
    limit,
    skip,
    showPrivate,
  });

  return NextResponse.json(result.data, { status: result.status });
}
