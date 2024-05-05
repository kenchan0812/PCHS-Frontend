import React from "react";
import Image from "next/image";

const AdmissionHero = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1450px] grid md:grid-cols-2 items-center m-10 py-10">
        <div className="flex flex-col gap-8 px-12">
          <div className="text-5xl font-semibold">Admission</div>
          <div className="text-xl font-medium">
            ENROLLMENT POLICIES AND PROCEDURES
          </div>
          <div>
            1. Registration As a general policy, a student shall enroll within
            the designated registration period. Registration for late enrollees
            ends two weeks after the start of classes. Click Registration Form
          </div>
          <div>
            2. Admission Admission is granted to applicant whose parents or
            guardians understand and agree to comply with the regulations and
            standard set by the school. Strict compliance to the requirements
            proposed by school authorities is needed. This applies to both old
            and new students.
          </div>
        </div>
        <div className="place-self-center max-md:pt-10">
          <Image
            src={"/Admission.jpg"}
            alt="admission"
            width={600}
            height={400}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AdmissionHero;
