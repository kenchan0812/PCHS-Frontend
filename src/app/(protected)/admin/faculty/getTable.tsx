import React from "react";
import { CookiesSchema } from "@/schemas";
import { cookies } from "next/headers";
import Table from "@/app/(protected)/admin/faculty/table";
import { getAdminAll } from "@/server/utils";
import { getAdminType } from "@/server/secure";
const GetTable = async () => {
  const cookieSession: unknown = cookies().get("session");

  const validatedSession = CookiesSchema.safeParse(cookieSession);

  const plaintext = await getAdminType();
  const data = await getAdminAll();
  return (
    <Table
      data={data}
      adminType={plaintext}
      session={validatedSession.success ? validatedSession.data.value : ""}
    />
  );
};

export default GetTable;
