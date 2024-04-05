import Logo from "@/components/logo";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FiClock } from "react-icons/fi";

function ProfessionalsForm() {
  const router = useRouter();

  return (
    <>
      <div className="absolute inset-0 h-screen bg-[#403D3E]/60 blur-[4.2333px]">
        <Image
          src={`/images/generic-form-bg-img.png`}
          alt={"generic-form-bg-img"}
          className="object-cover"
          layout="fill"
        />
      </div>
      <div className="relative w-full flex flex-col h-screen">
        {/* Logo */}
        <Logo
          src={"crowd-work-vertical-white-logo"}
          alt={"Company Logo"}
          className={
            "absolute left-0 top-16 custom-height-mq:top-8 custom-height-mq:h-[60px] sm:h-[94px]"
          }
        />
        <div className="w-full h-full max-w-[671px] mx-auto flex flex-col items-center justify-center gap-10">
          <div className="space-y-2">
            <h1 className="text-display-md-bold 2xl:text-display-lg-bold text-white text-center">
              Interested in joining us?
            </h1>
            <p className="text-lg-medium 2xl:text-display-xs-medium tracking-[-2%] text-gray-100 text-center">
              Fill out a few details to kick off your application.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              className="h-[60px] flex justify-center items-center text-md-semibold 2xl:text-lg-semibold text-gray-700 bg-white border border-gray-300 rounded-lg px-7 py-4 shadow-xs"
              onClick={() =>
                router.push("/volunteers-form/terms-and-conditions")
              }
            >
              Let’s get started
            </button>

            <div className="flex items-center gap-1">
              <FiClock className="w-5 h-5 text-white" />
              <h6 className="text-sm-medium 2xl:text-md-medium text-white">
                It only takes 15 minutes
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessionalsForm;
