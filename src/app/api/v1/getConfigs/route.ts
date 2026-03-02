import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { getConfigs } from "@/lib/config-service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const plugin = searchParams.get("plugin") ?? undefined;
  const apiKey = searchParams.get("apiKey") ?? undefined;
  const isAuthorized = (await getAuthLevel(apiKey)) > 0;

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "You are not authorized to do this!" },
      { status: 403 }
    );
  }

  const result = await getConfigs(plugin);

  return NextResponse.json(result.data, { status: result.status });
}
