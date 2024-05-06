import { AdminSchema, CookiesSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(request: NextRequest) {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const id = await request.json();
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/superadmin/delete-admin/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          validatedCookie.success ? validatedCookie.data.value : ""
        }`,
      },
    }
  );
  if (!res.ok) return NextResponse.json({ error: "Something went wrong" });
  const data = await res.json();
  revalidatePath("/");

  return NextResponse.json({ data });
}
