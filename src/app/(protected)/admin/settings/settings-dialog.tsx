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
import { OptionalAdminSchema } from "@/schemas";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { LogoutAction } from "@/server/action";

interface SettingsTDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  admin: z.infer<typeof OptionalAdminSchema>;
  values: z.infer<typeof OptionalAdminSchema>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function SettingsDialog({
  admin,
  values,
  setError,
  ...props
}: SettingsTDialogProps) {
  const [isPending, startTransition] = React.useTransition();
  const currentPath = usePathname();
  const router = useRouter();
  const onSubmit = async () => {
    startTransition(async () => {
      setError("");
      const res = await fetch(`/api/updateAdminInformation?id=${admin.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast({
          title: "Success",
          description: "Account Information Updated",
        });
        LogoutAction();
        router.refresh();
      }
    });
  };
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Account</DialogTitle>
          <DialogDescription>
            {currentPath === "/admin/settings"
              ? `This action will update the account. You will be logged out after updating.`
              : "This action will update the account."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              aria-label="Delete selected rows"
              variant="customButton"
              onClick={() => onSubmit()}
              disabled={isPending}
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
