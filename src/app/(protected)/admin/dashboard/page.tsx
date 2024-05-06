import React from "react";

import { getAdminAll } from "@/server/utils";
import { cookies } from "next/headers";
import { AdminSchema, CookiesSchema, StudentSchema } from "@/schemas";

import DashboardCard from "@/app/(protected)/admin/dashboard/dashboard-card";
import { z } from "zod";
async function getEnrollee(year: string, session: string) {
  const resEnrollee = await fetch(
    `${process.env.BACKEND_URL}/api/admin/student/get-all/enrollee/${year}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const dataEnrollee: z.infer<typeof StudentSchema>[] =
    await resEnrollee.json();
  return dataEnrollee;
}
async function getEnrolled(year: string, session: string) {
  const resEnrolled = await fetch(
    `${process.env.BACKEND_URL}/api/admin/student/get-all/enrolled/${year}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const dataEnrolled: z.infer<typeof StudentSchema>[] =
    await resEnrolled.json();
  return dataEnrolled;
}
const page = async ({ searchParams }: { searchParams: { year: string } }) => {
  const admins: z.infer<typeof AdminSchema>[] = await getAdminAll();
  const cookieSession: unknown = cookies().get("session");

  const validatedSession = CookiesSchema.safeParse(cookieSession);

  const dataEnrollee = await getEnrollee(
    searchParams.year,
    validatedSession.success ? validatedSession.data.value : ""
  );
  const dataEnrolled = await getEnrolled(
    searchParams.year,
    validatedSession.success ? validatedSession.data.value : ""
  );
  return (
    <DashboardCard
      enrollee={dataEnrollee}
      enrolled={dataEnrolled}
      admins={admins}
    />
  );
};

export default page;
