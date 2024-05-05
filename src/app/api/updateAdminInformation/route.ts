import { CookiesSchema, AdminSchema } from "@/schemas";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: NextRequest) {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const admin: z.infer<typeof AdminSchema> = await request.json();
  const res = await fetch(`${process.env.BACKEND_URL}/api/admin/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
    body: JSON.stringify(admin),
  });
  if (!res.ok) return NextResponse.json({ error: "Something went wrong" });
  const data = await res.json();
  return NextResponse.json({ data });
}
