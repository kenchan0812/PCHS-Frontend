"use client";
import * as z from "zod";
import React, { useState, useTransition } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminSchema } from "@/schemas";
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
import { RegisterAction } from "@/server/action";
import { FormWrapper } from "@/components/utils";

const RegistrationForm = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
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

  const form = useForm<z.infer<typeof AdminSchema>>({
    resolver: zodResolver(AdminSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      position: "",
      advisory: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof AdminSchema>) => {
    setError("");
    startTransition(async () => {
      RegisterAction(values).then((data) => {
        setError(data.error);
        if (!data.error) {
          toast({
            description: "You Successfully Registered.",
          });
          form.setValue("password", "");
          form.setValue("name", "");
          form.setValue("username", "");
          form.setValue("email", "");
          form.setValue("position", "");
          form.setValue("advisory", "nursery1");
        }
      });
    });
  };

  return (
    <FormWrapper title={title} description={description}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="grid lg:grid-cols-2 m-10 gap-10 gap-x-16">
            <StandardInput
              name="name"
              label="Name"
              form={form}
              isPending={isPending}
              placeholder="Enter your name"
            />
            <StandardInput
              name="username"
              label="Username"
              form={form}
              isPending={isPending}
              placeholder="Enter your username"
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
            />
            <StandardInput
              name="password"
              label="Password"
              form={form}
              isPending={isPending}
              placeholder="Enter your password"
              type="password"
            />
            <StandardInput
              name="position"
              label="Position"
              form={form}
              isPending={isPending}
              placeholder="Enter your position"
            />
            <FormError message={error} />

            <Button
              type="submit"
              className=" w-1/2 lg:col-start-2 justify-self-end"
              loading={isPending}
              variant={"customButton"}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default RegistrationForm;

interface StandardInputProps {
  name: "name" | "username" | "email" | "password" | "position" | "advisory";
  label: string;
  placeholder: string;
  isPending?: boolean;
  form: UseFormReturn<
    {
      username: string;
      name: string;
      email: string;
      password: string;
      position: string;
      advisory:
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
}

const StandardInput = ({
  name,
  label,
  placeholder,
  isPending,
  form,
  type = "text",
}: StandardInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-72">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={isPending}
              className=""
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
