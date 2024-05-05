import React from "react";
import Image from "next/image";

const Programs = () => {
  return (
    <div className="w-full h-full flex flex-col items-center py-20 bg-custom-blue-light text-white font-medium">
      <div className="text-5xl font-semibold mb-5">Academic Programs</div>
      <div className="max-w-[1450px] px-10 grid md:grid-cols-2 lg:grid-cols-4">
        <ProgramCard
          title="Preschool"
          description="We offer progressive, child-centered and developmentally-appropriate early childhood education programs for children 3 to 6 years old. Through an integrated curriculum and meaningful, relevant, and interesting activities, we develop children holistically (physically, cognitively, and socio-emotionally)."
          image="/Preschool.png"
        />
        <ProgramCard
          title="Elementary"
          description="The curricular offerings in the elementary school are premised and chosen based on sound teaching-learning principles, on the level of maturity of the learners, and on the current developments in the field. Course content, concepts and skills are taught functionally to emphasize critical and creative thinking, develop desirable learning habits, and foster attitudes and values in the pupils."
          image="/Elementary.png"
        />
        <ProgramCard
          title="Junior High School"
          description="Secondary education aims to continue the general education started in the elementary level and to provide adequate instructions in preparation for college education or initial employment. We help develop students to learn independently as well as cooperatively. The role of our teachers shifts from being a sage on the stage to a guide on the side."
          image="/Junior.png"
        />
        <ProgramCard
          title="Senior High School"
          description="The Senior High School Program of PCHS was approved by the Department of Education to offer the following tracks starting 2020.
          Academic Track: 1. General Academic Strand (GAS) 2. Accountancy, Business, andManagement (ABM) 3. Humanities and Social Sciences(HUMSS)"
          image="/Senior.png"
        />
      </div>
    </div>
  );
};

export default Programs;

type Program = {
  title: string;
  description: string;
  image: string;
};
const ProgramCard = ({ title, description, image }: Program) => {
  return (
    <div className="flex flex-col items-center p-4 mx-2 rounded-lg">
      <div className="pb-5">
        <Image
          src={image}
          alt={title}
          width={315}
          height={600}
          className="rounded-md"
        />
      </div>
      <div className="pb-10 font-bold text-xl">{title}</div>
      <div>{description}</div>
    </div>
  );
};
