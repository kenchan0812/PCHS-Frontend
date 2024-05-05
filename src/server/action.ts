"use server";

import {
  AdminSchema,
  ContactUs,
  CookiesSchema,
  LoginResSchema,
  LoginSchema,
  StudentSchema,
} from "@/schemas";
import { decryptSymmetric, encryptSymmetric } from "@/server/secure";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { z } from "zod";

export const LoginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedValue = LoginSchema.safeParse(values);
  if (!validatedValue.success) {
    return { error: "Invalid email or password" };
  }
  const { username, password } = validatedValue.data;

  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) return { error: "Something went wrong" };
  const data: z.infer<typeof LoginResSchema> = await res.json();
  const { ciphertext, iv } = await encryptSymmetric(
    data.adminType,
    process.env.SESSION_PASSWORD
  );

  const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
  cookies().set("session", data.token, { expires, httpOnly: true });
  cookies().set("adminType", ciphertext, { expires, httpOnly: true });
  cookies().set("iv", iv, { expires, httpOnly: true });

  return { success: "You Successfully Logged in" };
};

export const RegisterAction = async (values: z.infer<typeof AdminSchema>) => {
  const validatedValue = AdminSchema.safeParse(values);
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);

  if (!validatedValue.success) {
    return { error: "Invalid fields" };
  }
  const { name, username, email, password, advisory, position } =
    validatedValue.data;
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/superadmin/add-admin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          validatedCookie.success ? validatedCookie.data.value : ""
        }`,
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        advisory,
        position,
      }),
    }
  );
  if (!res.ok) return { error: "User already exists" };
  return { success: "User Created" };
};

export const LogoutAction = async () => {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  cookies().delete("session");
  cookies().delete("adminType");
  cookies().delete("iv");
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
  });
  if (!res.ok) return { error: "Something went wrong" };
  return { success: "You Successfully Logged out" };
};

export const AddStudentAction = async (
  values: z.infer<typeof StudentSchema>
) => {
  const validatedValue = StudentSchema.safeParse(values);
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/student/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedValue.data),
  });
  if (!res.ok) return { error: "Something went wrong" };
  const data = await res.json();
  return data;
};

export const SendEmailAction = async (values: z.infer<typeof ContactUs>) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/mail/send/contactus`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  if (!res.ok) return { error: "Something went wrong" };
  return res.statusText;
};
