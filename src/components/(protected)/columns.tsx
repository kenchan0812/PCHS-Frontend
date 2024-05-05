"use client";

import { ColumnDef, SortingFn } from "@tanstack/react-table";

import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { StudentSchema } from "@/schemas";
import { DataTableColumnHeader } from "@/components/(protected)/column-header";
import { Info, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteTasksDialog } from "@/components/(protected)/delete-dialog";

export type student = z.infer<typeof StudentSchema>;

const sortGradeLevelFn: SortingFn<z.infer<typeof StudentSchema>> = (
  rowA,
  rowB,
  _columnId
) => {
  const statusA = rowA.original.gradeLevel;
  const statusB = rowB.original.gradeLevel;
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

const sortClassificationFn: SortingFn<z.infer<typeof StudentSchema>> = (
  rowA,
  rowB,
  _columnId
) => {
  const statusA = rowA.original.classification;
  const statusB = rowB.original.classification;
  const statusOrder = ["regular", "returning", "transferee", "new"];
  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

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
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Age"
        className="hidden xl:block"
      />
    ),
    sortingFn: "alphanumeric",
    cell: ({ row }) => {
      return <div className="hidden xl:block">{row.original.age}</div>;
    },
  },
  {
    accessorKey: "gradeLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grade" />
    ),
    sortingFn: sortGradeLevelFn,

    cell: ({ row }) => {
      return <div>{getGradeStatus(row.original.gradeLevel)}</div>;
    },
  },
  {
    accessorKey: "learnerRefNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Learner Ref No" />
    ),
    enableSorting: false,
    enableHiding: false,

    cell: ({ row }) => {
      return <div>{row.original.learnerRefNo}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        className="hidden xl:block"
      />
    ),
    cell: ({ row }) => {
      return <div className="hidden xl:block">{row.original.email}</div>;
    },
  },
  {
    accessorKey: "classification",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Classification"
        className="hidden xl:block"
      />
    ),

    sortingFn: sortClassificationFn,
    cell: ({ row }) => {
      return (
        <div className="hidden xl:block">{row.original.classification}</div>
      );
    },
  },
  {
    accessorKey: "contactNum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    enableSorting: false,
    enableHiding: false,

    cell: ({ row }) => {
      return <div>{row.original.contactNum}</div>;
    },
  },

  {
    id: "actions",
    cell: function Cell({ row }) {
      const currentPath = usePathname();
      const router = useRouter();
      const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);
      const onCheck = () => {
        if (currentPath === "/admin/student-list/enrolled") {
          router.push(`/admin/student-list/enrolled/${row.original.id}`);
        } else {
          router.push(`/admin/student-list/enrollee/${row.original.id}`);
        }
      };
      return (
        <>
          <DeleteTasksDialog
            open={showDeleteTaskDialog}
            onOpenChange={setShowDeleteTaskDialog}
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
                  onClick={() => setShowDeleteTaskDialog(true)}
                />
              </div>
            )}
          </div>
        </>
      );
    },
  },
];
