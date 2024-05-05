import React from "react";
import Image from "next/image";
import { BookA, Shapes, ToyBrick } from "lucide-react";

const Age = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1450px] flex-grow">
        <div className="flex justify-center py-10 text-2xl font-semibold">
          Age Requirements
        </div>
        <div className="grid md:grid-cols-3">
          <AgeCard
            title="Nursery"
            description="4 years old by the opening of classes
"
          >
            <Shapes size={64} />
          </AgeCard>
          <AgeCard
            title="Elementary"
            description="5 years old by the opening of classes"
          >
            <ToyBrick size={64} />
          </AgeCard>
          <AgeCard
            title="Grade 1"
            description="6 years old by the opening of classes"
          >
            <BookA size={64} />
          </AgeCard>
        </div>
      </div>
    </div>
  );
};

export default Age;

type AgeCard = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const AgeCard = ({ title, description, children }: AgeCard) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">{children}</div>
      <div className="mb-4 text-lg font-semibold">{title}</div>
      <div>{description}</div>
    </div>
  );
};
