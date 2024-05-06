import { CookiesSchema, AdminSchema, StudentSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: NextRequest) {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const student: z.infer<typeof StudentSchema> = await request.json();
  const id = request.nextUrl.searchParams.get("id");
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/admin/student/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          validatedCookie.success ? validatedCookie.data.value : ""
        }`,
      },
      body: JSON.stringify(student),
    }
  );
  if (!res.ok) return NextResponse.json({ error: "Something went wrong" });
  const data = await res.json();
  revalidatePath("/admin/student-list/enrolled");

  return NextResponse.json({ data });
}
