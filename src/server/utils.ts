import { AdminSchema, CookiesSchema } from "@/schemas";
import { cookies } from "next/headers";

export async function getSelfAdmin() {
  const cookieStore: unknown = cookies().get("session");
  const validatedSession = CookiesSchema.safeParse(cookieStore);
  const res = await fetch(`${process.env.BACKEND_URL}/api/admin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        validatedSession.success ? validatedSession.data.value : ""
      }`,
    },
  });
  if (!res.ok) return { error: "Something went wrong" };
  const data = await res.json();
  return data;
}
export async function geStudentById(id: string) {
  const cookieStore: unknown = cookies().get("session");
  const validatedSession = CookiesSchema.safeParse(cookieStore);
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/admin/student/show/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          validatedSession.success ? validatedSession.data.value : ""
        }`,
      },
    }
  );
  if (!res.ok) return { error: "Something went wrong" };
  const data = await res.json();
  return data;
}
export async function getAdminAll() {
  const cookieStore: unknown = cookies().get("session");
  const validatedSession = CookiesSchema.safeParse(cookieStore);
  const res = await fetch(`${process.env.BACKEND_URL}/api/admin/get-all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        validatedSession.success ? validatedSession.data.value : ""
      }`,
    },
  });
  if (!res.ok) return { error: "Something went wrong" };
  const data = await res.json();
  return data;
}
export async function getAdminById(id: string) {
  const cookieStore: unknown = cookies().get("session");
  const validatedSession = CookiesSchema.safeParse(cookieStore);
  const res = await fetch(`${process.env.BACKEND_URL}/api/admin/show/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        validatedSession.success ? validatedSession.data.value : ""
      }`,
    },
  });
  if (!res.ok) return { error: "Something went wrong" };
  const data = await res.json();
  return data;
}

export const getSelfSuperAdmin = async () => {
  const cookieStore: unknown = cookies().get("session");
  const validatedSession = CookiesSchema.safeParse(cookieStore);
  const res = await fetch(`${process.env.BACKEND_URL}/api/superadmin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        validatedSession.success ? validatedSession.data.value : ""
      }`,
    },
  });
  if (!res.ok) return { error: "Something went wrong" };
  const data = await res.json();
  return data;
};
