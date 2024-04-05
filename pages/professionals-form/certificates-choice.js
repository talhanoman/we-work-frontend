import React from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import { FiArrowLeft } from "react-icons/fi";
import ProgressCardProfessionals from "@/components/progress-card-professionals";

export default function CertificatesChoice() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-800">
      {/* Left Section */}
      <div className="w-4/12">
        {/* Nav featured card */}
        <ProgressCardProfessionals progress={4} />
      </div>

      {/* Right Section */}
      <div className="relative w-8/12 flex flex-col bg-white rounded-l-[40px]">
        {/* Logo */}
        <Logo
          src={"crowd-work-vertical-logo"}
          alt={"Company Logo"}
          className={"absolute left-0 top-8 custom-height-mq:h-[60px] sm:h-[94px]"}
        />
        {/* Email */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
            Do you have{" "}
              <span className="text-primary-700">first aid</span> or{" "}
              <span className="text-primary-700">fire safety</span>?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
            We want to make sure our volunteers are prepared for any situation. 
            </p>
          </div>

          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <button
                className="w-full h-11 flex justify-center items-center flex-1 order-2 sm:order-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs"
                onClick={() => router.push("/professionals-form/certificates")}
              >
                Yes
              </button>
              <button
                className="w-full h-11 flex justify-center items-center flex-1 order-2 sm:order-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs"
                onClick={() => router.push("/professionals-form/congratulations")}
              >
                No
              </button>
            </div>
            {/* Back button */}
            <button
                className="flex items-center gap-2 text-xs-semibold 2xl:text-sm-semibold text-gray-500"
                onClick={() => router.back()}
              >
                <FiArrowLeft className="w-4 2xl:w-5 h-auto text-gray-500" />
               <span>Back</span>
              </button>
          </div>

          <ProgressBar progress={70} width="w-full max-w-[320px] mx-auto" />
        </div>

        {/* Footer */}
        <CandidateSignupFooter
          company={"© Weteck Events Ltd. 2024"}
          email_id={"hello@crowdedevents.com"}
        />
      </div>
    </div>
  );
}
