"use client";
import * as z from "zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuperAdminSchema } from "@/schemas";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";

import { usePathname, useRouter } from "next/navigation";
import { SettingsDialog } from "@/app/(protected)/admin/settings/super/setting-dialog";

const SuperAdminForm = ({
  data,
}: {
  data: z.infer<typeof SuperAdminSchema>;
}) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showSettingsDialog, setSshowSettingsDialog] = useState(false);
  const form = useForm<z.infer<typeof SuperAdminSchema>>({
    resolver: zodResolver(SuperAdminSchema),
    defaultValues: {
      username: data.username,
      password: "",
    },
  });

  return (
    <>
      <SettingsDialog
        open={showSettingsDialog}
        onOpenChange={setSshowSettingsDialog}
        values={form.getValues()}
        setError={setError}
      />
      <div className="w-full flex flex-col items-center bg-white py-20 rounded-md">
        <div className="text-2xl sm:text-3xl lg:text-5xl font-semibold">
          Account Settings
        </div>
        <div className=" sm:text-lg lg:text-xl">
          Update your account information
        </div>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSshowSettingsDialog(true);
            }}
            className=""
          >
            <div className=" flex flex-col gap-y-10 mt-10 w-full items-center">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        className="w-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your password"
                        className="w-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={error} />

              <Button
                type="submit"
                className={`w-1/2`}
                loading={isPending}
                variant={"customButton"}
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SuperAdminForm;
