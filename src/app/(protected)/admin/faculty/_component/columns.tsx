"use client";

import { ColumnDef, SortingFn } from "@tanstack/react-table";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { AdminSchema } from "@/schemas";
import { Info, Trash2 } from "lucide-react";
import { useState } from "react";
import { DataTableColumnHeader } from "@/components/(protected)/column-header";
import { DeleteTDialog } from "@/app/(protected)/admin/faculty/_component/delete-dialog";

export type student = z.infer<typeof AdminSchema>;

const sortGradeLevelFn: SortingFn<z.infer<typeof AdminSchema>> = (
  rowA,
  rowB,
  _columnId
) => {
  const statusA = rowA.original.advisory;
  const statusB = rowB.original.advisory;
  const statusOrder = [
    "nursery1",
    "nursery2",
    "kindergarten",
    "grade1",
    "grade2",
    "grade3",
    "grade4",
    "grade5",
    "grade6",
    "grade7",
    "grade8",
    "grade9",
    "grade10",
    "senior",
  ];
  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

const GradeLevelConvert: Record<string, string> = {
  nursery1: "Nursery 1",
  nursery2: "Nursery 2",
  kindergarten: "Kindergarten",
  grade1: "Grade 1",
  grade2: "Grade 2",
  grade3: "Grade 3",
  grade4: "Grade 4",
  grade5: "Grade 5",
  grade6: "Grade 6",
  grade7: "Grade 7",
  grade8: "Grade 8",
  grade9: "Grade 9",
  grade10: "Grade 10",
  senior: "Senior High School",
};

function getGradeStatus(gradeLevel: string): string {
  return GradeLevelConvert[gradeLevel] || "";
}

export const columns = ({
  adminType,
  session,
}: {
  adminType?: string;
  session: string;
}): ColumnDef<student, unknown>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" className="pl-2" />
    ),
    cell: ({ row }) => {
      return <div className="pl-2">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "advisory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Advisory" />
    ),
    sortingFn: sortGradeLevelFn,

    cell: ({ row }) => {
      return <div>{getGradeStatus(row.original.advisory)}</div>;
    },
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => {
      return <div className="hidden xl:block">{row.original.position}</div>;
    },
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const router = useRouter();
      const [showDeleteDialog, setShowDeleteDialog] = useState(false);

      const onCheck = () => {
        router.push(`/admin/faculty/${row.original.id}`);
      };
      return (
        <>
          <DeleteTDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            student={row}
            session={session}
          />

          <div className="flex gap-4 justify-end pr-10">
            <div className="hover:bg-slate-200 rounded-md">
              <Info className="cursor-pointer" onClick={() => onCheck()} />
            </div>
            {adminType === "SuperAdmin" && (
              <div className="hover:bg-slate-200 rounded-md">
                <Trash2
                  color="#c53a3a"
                  className="cursor-pointer"
                  onClick={() => setShowDeleteDialog(true)}
                />
              </div>
            )}
          </div>
        </>
      );
    },
  },
];
