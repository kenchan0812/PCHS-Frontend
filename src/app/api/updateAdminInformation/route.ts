import { CookiesSchema, AdminSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: NextRequest) {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const admin: z.infer<typeof AdminSchema> = await request.json();
  const id = request.nextUrl.searchParams.get("id");
  const res = await fetch(`${process.env.BACKEND_URL}/api/admin/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
    body: JSON.stringify(admin),
  });
  if (res.status !== 200)
    return NextResponse.json({ error: "Something went wrong" });
  const data = await res.json();
  revalidatePath("/");
  return NextResponse.json({ data });
}
