import crypto from "crypto";
import { prisma } from "./db";

const salt =
  "7314c648755f78e3d42b1421c19e00d4f3d9c78949787852c20b6fd607a42efb";

export async function getAuthLevel(
  key: string | undefined | null
): Promise<number> {
  if (!key) return 0;

  const user = await prisma.user.findFirst({
    where: {
      apiKeyHash: crypto
        .createHash("sha256")
        .update(salt + key)
        .digest("hex"),
    },
  });

  return user?.level ?? 0;
}
