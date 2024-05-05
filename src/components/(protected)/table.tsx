"use client";
import { columns } from "@/components/(protected)/columns";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { StudentSchema } from "@/schemas";
import { z } from "zod";
const Table = ({
  data,
  adminType,
  session,
}: {
  data: z.infer<typeof StudentSchema>[];
  adminType?: string;
  session: string;
}) => {
  return (
    <DataTable
      columns={columns({ adminType, session })}
      data={data}
      tableHeight="h-28"
    />
  );
};

export default Table;
