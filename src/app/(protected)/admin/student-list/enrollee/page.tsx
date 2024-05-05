import React from "react";
import { CookiesSchema, StudentSchema } from "@/schemas";
import { z } from "zod";
import { cookies } from "next/headers";
import Table from "@/components/(protected)/table";
import { getAdminType } from "@/server/secure";
const page = async ({ searchParams }: { searchParams: { year: string } }) => {
  const cookieSession: unknown = cookies().get("session");

  const validatedSession = CookiesSchema.safeParse(cookieSession);
  const plaintext = await getAdminType();

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/admin/student/get-all/enrollee/${searchParams.year}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          validatedSession.success ? validatedSession.data.value : ""
        }`,
      },
    }
  );
  const data: z.infer<typeof StudentSchema>[] = await res.json();
  return (
    <Table
      data={data}
      adminType={plaintext}
      session={validatedSession.success ? validatedSession.data.value : ""}
    />
  );
};

export default page;
