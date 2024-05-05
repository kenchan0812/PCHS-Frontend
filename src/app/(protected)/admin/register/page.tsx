"use client";
import RegistrationForm from "@/components/(protected)/admin-account";
import { toast } from "@/components/ui/use-toast";
import { AdminSchema } from "@/schemas";
import { RegisterAction } from "@/server/action";
import React, { startTransition, useState, useTransition } from "react";
import { z } from "zod";

const Page = () => {
  return (
    <RegistrationForm
      title="Create Account"
      description="Create an Account for Admin"
    />
  );
};

export default Page;
