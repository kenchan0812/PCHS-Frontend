"use client";
import * as z from "zod";
import React, { useState, useTransition } from "react";
import { FieldValues, UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OptionalAdminSchema } from "@/schemas";
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
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const SettingForm = ({ admin, adminType }: SettingFormProps) => {
  const currentPath = usePathname();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const gradeLevels = {
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

  const form = useForm<z.infer<typeof OptionalAdminSchema>>({
    resolver: zodResolver(OptionalAdminSchema),
    defaultValues: {
      name: admin.name,
      username: admin.username,
      email: admin.email,
      password: "",
      position: admin.position,
      advisory: admin.advisory,
    },
  });

  const onSubmit = async (values: z.infer<typeof OptionalAdminSchema>) => {
    setError("");
    startTransition(async () => {
      const res = await fetch(`/api/updateAdminInformation`, {
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
      }
    });
  };

  return (
    <div>
      <Button
        variant="customButton"
        className="my-3"
        onClick={() => router.push("/admin/faculty")}
      >
        back
      </Button>
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
              <StandardInput
                name="name"
                label="Name"
                form={form}
                isPending={isPending}
                placeholder="Enter your name"
                adminType={adminType}
              />
              <StandardInput
                name="username"
                label="Username"
                form={form}
                isPending={isPending}
                placeholder="Enter your username"
                adminType={adminType}
              />

              <FormField
                control={form.control}
                name="advisory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Advisory</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={
                          adminType !== "SuperAdmin" &&
                          currentPath !== "/admin/settings"
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(gradeLevels).map(([key, value]) => (
                            <SelectItem value={key} key={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <StandardInput
                name="email"
                label="Email"
                form={form}
                isPending={isPending}
                placeholder="Enter your email"
                adminType={adminType}
              />
              <StandardInput
                name="password"
                label="Password"
                form={form}
                isPending={isPending}
                placeholder="Enter your password"
                type="password"
                adminType={adminType}
                className={`${
                  adminType !== "SuperAdmin" &&
                  currentPath !== "/admin/settings"
                    ? "hidden"
                    : ""
                }`}
              />
              <StandardInput
                name="position"
                label="Position"
                form={form}
                isPending={isPending}
                placeholder="Enter your position"
                adminType={adminType}
              />
              <FormError message={error} />

              <Button
                type="submit"
                className={`w-1/2 lg:col-start-2 justify-self-end ${
                  adminType !== "SuperAdmin" &&
                  currentPath !== "/admin/settings"
                    ? "hidden"
                    : ""
                }`}
                loading={isPending}
                variant={"customButton"}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SettingForm;

interface SettingFormProps {
  admin: z.infer<typeof OptionalAdminSchema>;
  adminType?: string;
}

interface StandardInputProps {
  name: "name" | "username" | "email" | "password" | "position" | "advisory";
  label: string;
  placeholder: string;
  isPending?: boolean;
  form: UseFormReturn<
    {
      username?: string;
      name?: string;
      email?: string;
      password?: string;
      position?: string;
      advisory?:
        | "nursery1"
        | "nursery2"
        | "kindergarten"
        | "grade1"
        | "grade2"
        | "grade3"
        | "grade4"
        | "grade5"
        | "grade6"
        | "grade7"
        | "grade8"
        | "grade9"
        | "grade10"
        | "senior";
    },
    any,
    undefined
  >;
  type?: string;
  adminType?: string;
  className?: string;
}

const StandardInput = ({
  name,
  label,
  placeholder,
  isPending,
  form,
  type = "text",
  adminType,
  className,
}: StandardInputProps) => {
  const currentPath = usePathname();

  return (
    <div className={cn(className)}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-72">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                {...(adminType !== "SuperAdmin" &&
                  currentPath !== "/admin/settings" && { readOnly: true })}
                type={type}
                placeholder={placeholder}
                disabled={isPending}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
