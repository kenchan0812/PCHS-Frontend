"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="shadow-none rounded-3xl">
      <div className=" w-[1260px] h-[800px] grid grid-cols-2">
        <div className="flex items-center justify-center bg-custom-blue-light rounded-3xl my-6 ml-6">
          <span className="text-white text-6xl font-semibold mb-7">PCHS</span>
        </div>
        <CardContent className="flex flex-col justify-center items-center">
          {children}
          <CardFooter className="pt-10">
            {backButtonHref && backButtonLabel && (
              <BackButton href={backButtonHref} label={backButtonLabel} />
            )}
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  );
};
