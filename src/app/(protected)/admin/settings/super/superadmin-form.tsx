"use client";
import * as z from "zod";
import React, { useState, useTransition } from "react";
import { FieldValues, UseFormReturn, useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SuperAdminForm = ({
  data,
}: {
  data: z.infer<typeof SuperAdminSchema>;
}) => {
  const currentPath = usePathname();

  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SuperAdminSchema>>({
    resolver: zodResolver(SuperAdminSchema),
    defaultValues: {
      username: data.username,
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SuperAdminSchema>) => {
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
        console.log("nice"); //--------------------------------------------------------------------------------------------------------
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center bg-white pt-20 rounded-md">
      <div className="text-2xl sm:text-3xl lg:text-5xl font-semibold">
        Account Settings
      </div>
      <div className=" sm:text-lg lg:text-xl">
        Update your account information
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="grid lg:grid-cols-2 m-10 gap-10 gap-x-16">
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
              className={`w-1/2 lg:col-start-2 justify-self-end`}
              loading={isPending}
              variant={"customButton"}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SuperAdminForm;
