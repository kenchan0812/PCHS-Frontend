"use client";

import * as React from "react";
import { type Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StudentSchema } from "@/schemas";
import { z } from "zod";
import { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface DeleteTasksDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  student: Row<z.infer<typeof StudentSchema>>;
  onSuccess?: () => void;
  session: string;
}

export function DeleteTasksDialog({
  student,
  onSuccess,
  session,
  ...props
}: DeleteTasksDialogProps) {
  const router = useRouter();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const OnDelete = async (id: string | undefined) => {
    const res = await fetch(`/api/deleteStudentById`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
      body: JSON.stringify(id),
    });
    if (res.ok) {
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
    }
  };
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete
            {student.original.email}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              onClick={() => OnDelete(student.original.id)}
              disabled={isDeletePending}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
