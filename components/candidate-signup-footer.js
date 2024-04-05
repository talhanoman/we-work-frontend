import React from "react";
import Image from "next/image";

export default function CandidateSignupFooter({ company, email_id }) {
  return (
    <div className={`w-full flex flex-col gap-y-2 sm:flex-row justify-center sm:justify-between items-center px-8 absolute bottom-8 left-0`}>
      <p className="text-xs-regular 2xl:text-sm-regular text-gray-500">{company}</p>

      <div className="flex gap-2 place-items-center">
        <Image
          src="/images/mail-icon.svg"
          alt={`Email Icon`}
          className="w-4 h-4"
          width={16}
          height={16}
        />
        <a className="text-xs-regular 2xl:text-sm-regular text-gray-500" href={"mailto:"+email_id}>{email_id}</a>
      </div>
    </div>
  );
}
