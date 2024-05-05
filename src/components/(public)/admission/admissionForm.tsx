"use client";
import * as z from "zod";
import React, { useState, useTransition } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentSchema } from "@/schemas";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddStudentAction } from "@/server/action";
import { usePathname } from "next/navigation";

const AdmissionForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const currentPath = usePathname();
  const adminPath =
    currentPath === "/admin/student-list/enrolled/add-student" ? true : false;
  const grade_levels = {
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

  const student_classifications = {
    regular: "Regular Student (Enrolled last school year)",
    returning: "Returning Student (Does not attend school last year)",
    transferee: "Transferee Student",
    new: "New Student (Nursery 1 and 2, Kindergarten)",
  };

  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      learnerRefNo: "",
      name: "",
      gradeLevel: undefined,
      classification: undefined,
      age: "",
      fatherName: "",
      motherName: "",
      contactNum: "",
      email: "",
      address: "",
      enrollStatus: adminPath ? "enrolled" : "enrollee",
    },
  });
  const onSubmit = (values: z.infer<typeof StudentSchema>) => {
    setError("");
    startTransition(() => {
      AddStudentAction(values).then((data) => {
        setError(data.error);
        if (!data.error) {
          toast({
            description: "You Successfully Registered.",
          });
          form.setValue("learnerRefNo", "");
          form.setValue("name", "");
          form.setValue("gradeLevel", "nursery1");
          form.setValue("classification", "regular");
          form.setValue("age", "");
          form.setValue("fatherName", "");
          form.setValue("motherName", "");
          form.setValue("contactNum", "");
          form.setValue("email", "");
          form.setValue("address", "");
          form.setValue("enrollStatus", "enrollee");
        }
      });
    });
  };

  return (
    <div
      className={`w-full flex flex-col items-center ${adminPath && "bg-white"}`}
    >
      <div className="text-2xl sm:text-3xl md:text-5xl font-semibold">
        Student Enrollment Form
      </div>
      <div className=" sm:text-lg md:text-xl">
        Fill out the form to enroll a new student.
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="max-w-[1450px] grid md:grid-cols-2 my-10 gap-10 gap-x-32 mx-10">
            <StandardInput
              name="learnerRefNo"
              label="Learner Reference Number"
              form={form}
              isPending={isPending}
              placeholder="Enter your learner reference number"
              type="number"
            />

            <StandardInput
              name="name"
              label="Name"
              form={form}
              isPending={isPending}
              placeholder="Enter your name"
            />

            <FormField
              control={form.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(grade_levels).map(([key, value]) => (
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
            <FormField
              control={form.control}
              name="classification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Classification</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {Object.entries(student_classifications).map(
                        ([key, value]) => (
                          <FormItem
                            className="flex items-center space-x-3 space-y-0"
                            key={key}
                          >
                            <FormControl>
                              <RadioGroupItem value={key} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {value}
                            </FormLabel>
                          </FormItem>
                        )
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <StandardInput
              name="age"
              label="Age"
              form={form}
              isPending={isPending}
              placeholder="Enter your age"
              type="number"
            />
            <StandardInput
              name="fatherName"
              label="Father Name"
              form={form}
              isPending={isPending}
              placeholder="Enter your father name"
            />
            <StandardInput
              name="motherName"
              label="Mother Name"
              form={form}
              isPending={isPending}
              placeholder="Enter your mother name"
            />
            <StandardInput
              name="contactNum"
              label="Contact No."
              form={form}
              isPending={isPending}
              placeholder="Enter your contact number"
              type="number"
            />
            <StandardInput
              name="email"
              label="Email"
              form={form}
              isPending={isPending}
              placeholder="Enter your email"
            />
            <StandardInput
              name="address"
              label="Address"
              form={form}
              isPending={isPending}
              placeholder="Enter your address"
            />
            <FormError message={error} />
            <Button
              type="submit"
              className=" w-1/3 md:col-start-2 justify-self-end"
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

export default AdmissionForm;

interface StandardInputProps {
  name:
    | "learnerRefNo"
    | "name"
    | "gradeLevel"
    | "classification"
    | "age"
    | "fatherName"
    | "motherName"
    | "contactNum"
    | "email"
    | "address";
  label: string;
  placeholder: string;
  isPending?: boolean;

  form: UseFormReturn<
    {
      learnerRefNo: string;
      name: string;
      gradeLevel:
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
      classification: "regular" | "returning" | "transferee" | "new";
      age: string;
      fatherName: string;
      motherName: string;
      contactNum: string;
      email: string;
      address: string;
      enrollStatus: "enrolled" | "enrollee" | "onHold";
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
        <FormItem>
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
