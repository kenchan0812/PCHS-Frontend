import AdmissionHero from "@/components/(public)/admission/admissionHero";
import Age from "@/components/(public)/admission/age";
import AdmissionForm from "@/components/(public)/admission/admissionForm";
import Requirement from "@/components/(public)/admission/requirement";
import React from "react";

const Admission = () => {
  return (
    <>
      <AdmissionHero />
      <Age />
      <Requirement />
      <AdmissionForm />
    </>
  );
};

export default Admission;
