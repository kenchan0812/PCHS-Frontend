"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginAction } from "@/server/action";
import { toast } from "@/components/ui/use-toast";
export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    //server side
    startTransition(() => {
      LoginAction(values).then((data) => {
        setError(data.error);
        if (!data.error) {
          toast({
            description: data.success,
          });
          router.push("/admin/dashboard");
        }
      });
    });
  };
  return (
    <CardWrapper backButtonLabel="Not an Admin?" backButtonHref="/">
      <h1 className="text-3xl font-bold mb-2 text-custom-action">Admin</h1>
      <p className="text-balance text-muted-foreground mb-10">
        Enter the Admin Password to proceed
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-2/3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the username"
                    disabled={isPending}
                    className="text-custom-action"
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
                    type="password"
                    placeholder="Enter the password"
                    disabled={isPending}
                    className="text-custom-action"
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
            className="w-full"
            loading={isPending}
            variant="customButton"
          >
            Enter
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
