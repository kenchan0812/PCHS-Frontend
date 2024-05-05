import React from "react";

const Requirement = () => {
  return (
    <div className="w-full flex justify-center my-20">
      <div className="max-w-[1450px] grid md:grid-cols-2 flex-grow">
        <div className=" border-t-2 border-l-2 p-12 flex flex-col gap-6">
          <div className="text-3xl font-semibold">
            New Student and Transferee
          </div>
          <div className="text-xl font-medium">
            Entrance test and personal interview is necessary
          </div>
          <div className="text-xl font-medium">
            Submission of the following requirements:
          </div>
          <div>1. Report Card (Form 138)</div>
          <div>
            2. Letter of recommendation/certificate of good moral character duty
            signed by the Principal
          </div>
          <div>3. Birth Certificate</div>
          <div>4. I.D. pictures</div>
          <div>
            Acceptance of the probation contract during registration / enrolment
          </div>
          <div className="text-2xl font-medium">
            Acceptance of the probation contract during registration / enrolment
          </div>
        </div>
        <div className="border-t-2 border-x-2 p-12 flex flex-col gap-6">
          <div className="text-3xl font-semibold">Old Students</div>
          <div className="text-xl font-medium">
            Only students who have passed their entire academic subjects in the
            current school year can be re-admitted in the following year.
          </div>
          <div className="text-xl font-medium">
            Students who have incurred a deficit of two (2) units in their
            regular load during the current year may be re-admitted provided
            that they have made up for the deficiency by  taking summer classes
            and passing them.
          </div>
        </div>
        <div className="md:col-span-2 border-2 p-12 flex flex-col gap-6">
          <div className="text-3xl font-semibold">Foreign Students</div>
          <div className="text-xl font-medium">
            An applicant must submit the following requirements:
          </div>
          <div className="md:flex gap-32 ">
            <div className="max-w-[600px] flex flex-col gap-6 max-md:mb-[1.5rem]">
              <div>1. Certificate of comliance with B.I.D. and D.F.A.</div>
              <div>
                2. Certificate of eligibility for admission and from DepEd.
              </div>
              <div>
                3. Photocopy of Alien Certificate of Registration (ACR) duly
                signed by offices from  DepEd
              </div>
              <div>4.Approved Study Permit from Foreign Student Division.</div>
            </div>
            <div className="flex flex-col gap-6">
              <div>5. DepEd & Evaluation papers.</div>
              <div>6. Birth and Baptismal Certificates</div>
              <div>
                7. Report Card of Credentials from school last attended.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requirement;
