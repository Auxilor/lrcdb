import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { publicizeConfig } from "@/lib/config-service";

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const isAuthorized = (await getAuthLevel(body.apiKey)) > 0;

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "You are not authorized to do this!" },
      { status: 403 }
    );
  }

  const result = await publicizeConfig(body.id);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
