import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import {
  createConfig,
  getConfigsWithoutContents,
  getConfigs,
} from "@/lib/config-service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const plugin = searchParams.get("plugin") ?? undefined;
  const query = searchParams.get("query") ?? "";
  const limit = parseInt(searchParams.get("limit") ?? "150");
  const skip = parseInt(searchParams.get("skip") ?? "0");
  const apiKey = searchParams.get("apiKey") ?? "";
  const includeContents = searchParams.get("includeContents") === "true";

  const showPrivate = (await getAuthLevel(apiKey)) > 0;

  if (includeContents) {
    if (!showPrivate) {
      return NextResponse.json(
        { message: "You are not authorized to do this!" },
        { status: 403 }
      );
    }
    const result = await getConfigs(plugin);
    return NextResponse.json(result.data, { status: result.status });
  }

  const result = await getConfigsWithoutContents({
    plugin,
    query,
    limit,
    skip,
    showPrivate,
  });

  return NextResponse.json(result.data, { status: result.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await createConfig(body);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
