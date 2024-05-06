import React from "react";
import { CookiesSchema } from "@/schemas";
import { cookies } from "next/headers";
import Table from "@/app/(protected)/admin/faculty/table";
import { getAdminAll } from "@/server/utils";
import { getAdminType } from "@/server/secure";
import GetTable from "@/app/(protected)/admin/faculty/getTable";
const page = async () => {
  return <GetTable />;
};

export default page;
