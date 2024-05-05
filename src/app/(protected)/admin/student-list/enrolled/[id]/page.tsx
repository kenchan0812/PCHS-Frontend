import StudentForm from "@/components/(protected)/student-form";
import { CookiesSchema } from "@/schemas";
import { getAdminType } from "@/server/secure";
import { geStudentById } from "@/server/utils";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const plaintext = await getAdminType();

  const student = await geStudentById(params.id);
  return <StudentForm student={student} adminType={plaintext} />;
};

export default page;
