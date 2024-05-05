"use client";
import * as z from "zod";
import Link from "next/link";
import React, { useTransition } from "react";
import Image from "next/image";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ContactFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendEmailAction } from "@/server/action";
import { toast } from "@/components/ui/use-toast";
const Footer = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subject: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof ContactFormSchema>) => {
    //server side
    startTransition(async () => {
      SendEmailAction(values).then((data) => {
        if (data) {
          toast({
            title: "Sent!",
            description: "Your message has been sent.",
          });
          form.setValue("name", "");
          form.setValue("email", "");
          form.setValue("message", "");
          form.setValue("subject", "");
        }
      });
    });
  };
  return (
    <footer className="w-full flex flex-col items-center" id="contact">
      <div className="max-w-[1450px] grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between w-full">
        <div className="flex flex-col gap-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image src={"/logo.png"} alt="logo" width={40} height={40} />
            <div className="">Philippine Chung Hua School Inc.</div>
          </Link>
          <div className="space-y-5">
            <p className="text-sm">Phone: 8715-7117/ 8715-7113</p>
            <p className="text-sm">Email: philchunghua@gmail.com</p>
            <p className="text-sm">
              Address: 3217 Reposo St. Sta. Mesa, Manila
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="text-gray-400 hover:text-gray-300 transition-colors"
              href="https://www.google.com/url?q=https%3A%2F%2Fwww.facebook.com%2FPhilippine-Chung-Hua-School-S-Y-2021-2022-2258582264223161&sa=D&sntz=1&usg=AOvVaw0FZJfUAEFstGQG7qK0PRYZ"
              target="_blank"
            >
              <FaFacebook size={70} color="#3b5998" />
              <span className="sr-only">FaceBook</span>
            </Link>
            <Link
              className="text-gray-400 hover:text-gray-300 transition-colors"
              href="https://www.youtube.com/channel/UC0v6SrDyh8JNMgDh7MVoU0Q"
              target="_blank"
            >
              <FaYoutube size={70} color="#c4302b" />
              <span className="sr-only">Youtube</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 md:col-span-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <div className="md:flex h-full">
                <div className="md:w-1/2 md:mr-20 flex flex-col gap-10">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="name"
                            placeholder="Enter your name"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your email"
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your subject"
                            disabled={isPending}
                            className="text-custom-action"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="md:w-1/2 ">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="h-full">
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your message"
                            disabled={isPending}
                            className="text-custom-action size-full resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                loading={isPending}
                variant="customButton"
                className="mt-3"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
