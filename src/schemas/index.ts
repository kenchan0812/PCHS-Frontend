import * as z from "zod";

//Schema for student admission
export const StudentSchema = z.object({
  learnerRefNo: z.string().optional(),
  name: z.string().min(1, "Required"),
  gradeLevel: z.enum(
    [
      "nursery1",
      "nursery2",
      "kindergarten",
      "grade1",
      "grade2",
      "grade3",
      "grade4",
      "grade5",
      "grade6",
      "grade7",
      "grade8",
      "grade9",
      "grade10",
      "senior",
    ],
    {
      required_error: "You need to select a grade level",
    }
  ),
  classification: z.enum(["regular", "returning", "transferee", "new"], {
    required_error: "You need to select a student classification",
  }),
  age: z.string().min(1, "Required"),
  fatherName: z.string().min(1, "Required"),
  motherName: z.string().min(1, "Required"),
  contactNum: z
    .string()
    .min(10, { message: "Contact number must be atleast 10 digits" })
    .max(11, { message: "Too long" }),
  email: z
    .string()
    .min(1, "Required")
    .email({ message: "Invalid email address" }),
  address: z.string().min(1, "Required"),
  enrollStatus: z.enum(["enrolled", "enrollee", "onHold"]),
  schoolYear: z.string().optional(),
  id: z.string().optional(),
});

//Schema for contact form
export const ContactFormSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z
    .string()
    .min(1, "Required")
    .email({ message: "Invalid email address" }),
  message: z.string().min(1, "Required"),
  subject: z.string().min(1, "Required"),
});

//Schema for login
export const LoginSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export const LoginResSchema = z.object({
  adminType: z.string(),
  token: z.string(),
});
//Schema for Admin
export const AdminSchema = z.object({
  name: z.string().min(1, "Required"),
  username: z.string().min(1, "Required"),
  email: z
    .string()
    .min(1, "Required")
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, "Required"),
  advisory: z.enum(
    [
      "nursery1",
      "nursery2",
      "kindergarten",
      "grade1",
      "grade2",
      "grade3",
      "grade4",
      "grade5",
      "grade6",
      "grade7",
      "grade8",
      "grade9",
      "grade10",
      "senior",
    ],
    {
      required_error: "You need to select a grade level",
    }
  ),
  position: z.string().min(1, "Required"),
  id: z.optional(z.string()),
});

export const OptionalAdminSchema = z.object({
  name: z.optional(z.string()),
  username: z.optional(z.string()),
  email: z.optional(z.string().email({ message: "Invalid email address" })),
  password: z.optional(z.string()),
  advisory: z.optional(
    z.enum(
      [
        "nursery1",
        "nursery2",
        "kindergarten",
        "grade1",
        "grade2",
        "grade3",
        "grade4",
        "grade5",
        "grade6",
        "grade7",
        "grade8",
        "grade9",
        "grade10",
        "senior",
      ],
      {
        required_error: "You need to select a grade level",
      }
    )
  ),
  position: z.optional(z.string()),
  id: z.optional(z.string()),
});

export const CookiesSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const SuperAdminSchema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
});

export const ContactUs = z.object({
  name: z.string().min(1, "Required"),
  email: z
    .string()
    .min(1, "Required")
    .email({ message: "Invalid email address" }),
  message: z.string().min(1, "Required"),
  subject: z.string().min(1, "Required"),
});
