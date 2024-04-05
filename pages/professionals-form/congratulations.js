import React from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import ProgressCardProfessionals from "@/components/progress-card-professionals";

export default function Congratulations() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-800">
      {/* Left Section */}
      <div className="w-4/12">
        {/* Nav featured card */}
        <ProgressCardProfessionals progress={8} />
      </div>

      {/* Right Section */}
      <div className="relative w-8/12 flex flex-col bg-white rounded-l-[40px]">
        {/* Logo */}
        <Logo
          src={"crowd-work-vertical-logo"}
          alt={"Company Logo"}
          className={
            "absolute left-0 top-8 custom-height-mq:h-[60px] sm:h-[94px]"
          }
        />
        {/* Congratulations */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-primary-700">
              Congratulations!
            </h1>
            <h2 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              Thanks for taking the time to complete our application form.
            </h2>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              We can't wait to get in touch with you! Keep an eye on your inbox
              for further information.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <button
              className="w-full h-11 flex justify-center items-center flex-1 order-2 sm:order-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs"
              onClick={() => router.back()}
            >
              Back
            </button>
            <button
              className="h-11 py-2.5 flex justify-center items-center flex-1 order-1 sm:order-2 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 text-white rounded-lg disabled:pointer-events-none disabled:opacity-75 shadow-xs"
              onClick={() => router.push("/headcount/overview")}
            >
              Finish
            </button>
          </div>

          <ProgressBar progress={100} width="w-full max-w-[320px] mx-auto" />
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
