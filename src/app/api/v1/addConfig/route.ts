import { NextRequest, NextResponse } from "next/server";
import { createConfig } from "@/lib/config-service";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await createConfig(body);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
