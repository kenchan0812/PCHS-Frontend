import React from "react";

import { getAdminAll } from "@/server/utils";
import { cookies } from "next/headers";
import { AdminSchema, CookiesSchema, StudentSchema } from "@/schemas";

import DashboardCard from "@/app/(protected)/admin/dashboard/dashboard-card";
import { z } from "zod";

const page = async ({ searchParams }: { searchParams: { year: string } }) => {
  const admins: z.infer<typeof AdminSchema>[] = await getAdminAll();
  const cookieSession: unknown = cookies().get("session");

  const validatedSession = CookiesSchema.safeParse(cookieSession);

  const resEnrollee = await fetch(
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
  const dataEnrollee: z.infer<typeof StudentSchema>[] =
    await resEnrollee.json();
  const resEnrolled = await fetch(
    `${process.env.BACKEND_URL}/api/admin/student/get-all/enrolled/${searchParams.year}`,
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
  const dataEnrolled: z.infer<typeof StudentSchema>[] =
    await resEnrolled.json();

  return (
    <DashboardCard
      enrollee={dataEnrollee}
      enrolled={dataEnrolled}
      admins={admins}
    />
  );
};

export default page;
