"use client";
import { columns } from "@/app/(protected)/admin/faculty/_component/columns";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { AdminSchema } from "@/schemas";
import { z } from "zod";
const Table = ({
  data,
  adminType,
  session,
}: {
  data: z.infer<typeof AdminSchema>[];
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
