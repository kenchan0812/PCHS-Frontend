import SuperAdminForm from "@/app/(protected)/admin/settings/super/superadmin-form";
import { SuperAdminSchema } from "@/schemas";
import { getSelfSuperAdmin } from "@/server/utils";
import React from "react";
import { z } from "zod";

const page = async () => {
  const data: z.infer<typeof SuperAdminSchema> = await getSelfSuperAdmin();
  return <SuperAdminForm data={data} />;
};

export default page;
