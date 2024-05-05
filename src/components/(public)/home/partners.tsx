import React from "react";
import Image from "next/image";

const Partners = () => {
  return (
    <div className="flex flex-col w-full items-center my-20">
      <div className="text-xl md:text-4xl">Our Industry Partners</div>
      <div className="flex gap-x-40 items-end">
        <div>
          <Image
            src={"/deped.png"}
            alt="logo"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <div>
          <Image
            src={"/peac.png"}
            alt="logo"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Partners;
