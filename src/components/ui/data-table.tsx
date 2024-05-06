"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { startTransition, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { DownloadIcon } from "lucide-react";
import { exportExcel } from "@/components/(protected)/export";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableHeight?: string;
  tableWidth?: string;
  adminType?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableHeight,
  tableWidth,
  adminType,
}: DataTableProps<TData, TValue>) {
  const [transition, setTransition] = useTransition();
  const router = useRouter();
  const currentPath = usePathname();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination,
      sorting,
    },
  });

  function yearRange() {
    const currentYear = new Date().getFullYear();
    const startYear = 2010;
    const yearRanges = [];

    for (let year = startYear; year <= currentYear; year++) {
      const nextYear = year + 1;
      const formattedString = `${year}-${nextYear}`;
      yearRanges.push(formattedString);
    }
    const latestYear = `${currentYear}-${currentYear + 1}`;

    return { yearRanges, latestYear };
  }
  const onChange = (value: string) => {
    if (currentPath === "/admin/student-list/enrolled") {
      router.push(`/admin/student-list/enrolled?year=${value}`);
    } else {
      router.push(`/admin/student-list/enrollee/?year=${value}`);
    }
  };

  const addStudent = () => {
    startTransition(() => {
      router.push("/admin/student-list/enrolled/add-student");
    });
  };
  const addFaculty = () => {
    startTransition(() => {
      router.push("/admin/register");
    });
  };
  return (
    <div className={tableWidth}>
      <div className="flex justify-between">
        {currentPath !== "/admin/faculty" && (
          <div className="w-40 flex items-center">
            <Select
              onValueChange={(value) => onChange(value)}
              defaultValue={yearRange().latestYear}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(yearRange().yearRanges).map(([key, value]) => (
                  <SelectItem value={value} key={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex items-center gap-5 my-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportExcel(table.getFilteredRowModel().rows)}
            loading={transition}
          >
            <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
            Export
          </Button>

          {currentPath === "/admin/student-list/enrolled" && (
            <Button variant="customButton" onClick={() => addStudent()}>
              Add Student
            </Button>
          )}
        </div>
        {currentPath === "/admin/faculty" && adminType === "SuperAdmin" && (
          <Button
            variant="customButton"
            onClick={() => addFaculty()}
            loading={transition}
          >
            Add Admin
          </Button>
        )}
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`hover:bg-gray-50 ${tableHeight}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
