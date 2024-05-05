"use client";
import RegistrationForm from "@/components/(protected)/admin-account";
import { toast } from "@/components/ui/use-toast";
import { AdminSchema } from "@/schemas";
import { RegisterAction } from "@/server/action";
import React, { startTransition, useState, useTransition } from "react";
import { z } from "zod";

const Page = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof AdminSchema>) => {
    setError("");
    startTransition(async () => {
      RegisterAction(values).then((data) => {
        setError(data.error);
        if (!data.error) {
          toast({
            description: "You Successfully Registered.",
          });
        }
      });
    });
  };
  return (
    <RegistrationForm
      onSubmit={onSubmit}
      title="Create Account"
      error={error}
      description="Create an Account for Admin"
      isPending={isPending}
    />
  );
};

export default Page;
