import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { countConfigs } from "@/lib/config-service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const plugin = searchParams.get("plugin") ?? undefined;
  const query = searchParams.get("query") ?? "";
  const apiKey = searchParams.get("apiKey") ?? "";

  const showPrivate = (await getAuthLevel(apiKey)) > 0;

  const result = await countConfigs({ plugin, query, showPrivate });

  return NextResponse.json(result.data, { status: result.status });
}
