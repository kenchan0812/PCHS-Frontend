import {
  CookiesSchema,
  AdminSchema,
  StudentSchema,
  SuperAdminSchema,
} from "@/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: NextRequest) {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const superAdmin: z.infer<typeof SuperAdminSchema> = await request.json();
  const res = await fetch(`${process.env.BACKEND_URL}/api/superadmin/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
    body: JSON.stringify(superAdmin),
  });
  if (!res.ok) return NextResponse.json({ error: "Something went wrong" });
  const data = await res.json();
  revalidatePath("/");
  return NextResponse.json({ data });
}
