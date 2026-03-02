import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { publicizeConfig } from "@/lib/config-service";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = request.nextUrl;
  const apiKey = searchParams.get("apiKey") ?? undefined;
  const isAuthorized = (await getAuthLevel(apiKey)) > 0;

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "You are not authorized to do this!" },
      { status: 403 }
    );
  }

  const result = await publicizeConfig(id);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
