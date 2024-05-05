"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AdminSchema, StudentSchema } from "@/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Divide } from "lucide-react";

const DashboardCard = ({
  enrolled,
  enrollee,
  admins,
}: {
  enrolled: z.infer<typeof StudentSchema>[];
  enrollee: z.infer<typeof StudentSchema>[];
  admins: z.infer<typeof AdminSchema>[];
}) => {
  const router = useRouter();

  function yearRange() {
    const currentYear = new Date().getFullYear();
    const startYear = 2010;
    const yearRanges = [];

    for (let year = startYear; year <= currentYear; year++) {
      const nextYear = year + 1;
      const formattedString = `${year}-${nextYear}`;
      yearRanges.push(formattedString);
    }
    const latestYear = `${currentYear}-${currentYear + 1}`;

    return { yearRanges, latestYear };
  }
  const onChange = (value: string) => {
    router.push(`/admin/dashboard?year=${value}`);
  };
  console.log(enrolled);
  return (
    <div>
      <Select
        onValueChange={(value) => onChange(value)}
        defaultValue={yearRange().latestYear}
      >
        <SelectTrigger className="bg-white w-1/12 my-3">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(yearRange().yearRanges).map(([key, value]) => (
            <SelectItem value={value} key={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="size-full flex flex-col items-center bg-white py-60  rounded-md">
        <div className="size-full text-2xl sm:text-3xl lg:text-5xl font-semibold flex gap-5">
          <Card className="w-1/3 mx-20">
            <CardHeader>
              <CardTitle>{enrolled.length}</CardTitle>
              <CardDescription>Enrolled Students</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle>{admins.length}</CardTitle>
              <CardDescription>Admins</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card className="w-1/3 mx-20">
            <CardHeader>
              <CardTitle>{enrollee.length}</CardTitle>
              <CardDescription>Enrollees</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
