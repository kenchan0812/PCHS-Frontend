"use client";

import * as React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdminSchema } from "@/schemas";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface DeleteTDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  student: Row<z.infer<typeof AdminSchema>>;
  onSuccess?: () => void;
  session: string;
}

export function DeleteTDialog({
  student,
  onSuccess,
  session,
  ...props
}: DeleteTDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const router = useRouter();
  const OnDelete = async (id: string | undefined) => {
    startDeleteTransition(async () => {
      const res = fetch(`/api/deleteAdminbyId`, {
        method: "DELETE",

        body: JSON.stringify(id),
      });
      const data = await res;
      if (data.ok) {
        toast({
          title: "Success",
          description: "Admin deleted successfully",
        });
        router.refresh();
      }
    });
  };
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete{" "}
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
