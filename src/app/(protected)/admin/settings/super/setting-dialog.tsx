"use client";

import * as React from "react";

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
import { SuperAdminSchema } from "@/schemas";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { LogoutAction } from "@/server/action";

interface SettingsTDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  values: z.infer<typeof SuperAdminSchema>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function SettingsDialog({
  values,
  setError,
  ...props
}: SettingsTDialogProps) {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const onSubmit = async () => {
    setError("");
    startTransition(async () => {
      const res = await fetch(`/api/updateSuperAdminInformation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast({
          title: "Success",
          description: "Super Admin Information Updated",
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
            This action will update the account. You will be logged out after
            updating.
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
