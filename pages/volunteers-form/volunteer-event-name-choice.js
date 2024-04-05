import React from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
// import ProgressCard from "@/components/progress-card";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import { FiArrowLeft } from "react-icons/fi";

export default function VolunteerEventNameChoice() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-white justify-center">
      {/* Left Section */}
      {/* <div className="w-4/12">        
        <ProgressCard progress={7} />
      </div> */}

      {/* Right Section */}
      <div className="relative w-8/12 flex flex-col bg-white">
        {/* Logo */}
        <Logo
          src={"crowd-work-vertical-logo"}
          alt={"Company Logo"}
          className={"relative mt-6 custom-height-mq:h-[60px] sm:h-[94px]"}
        />
        {/* Volunteer Event Name Choice */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              Are you interested in volunteering for{" "}
              <span className="text-primary-700">event-name</span>?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              Join our team of volunteers and be a part of an unforgettable experience!
            </p>
          </div>

          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <button
                className="w-full h-11 flex justify-center items-center flex-1 order-2 sm:order-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs"
                onClick={() => router.push("/volunteers-form/volunteer-activities")}
              >
                Yes
              </button>
              <button
                className="w-full h-11 flex justify-center items-center flex-1 order-2 sm:order-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs"
                onClick={() => router.push("/volunteers-form/volunteer-multiple-event")}
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

          <ProgressBar progress={85} width="w-full max-w-[320px] mx-auto" />
        </div>

      </div>
      {/* Footer */}
      <CandidateSignupFooter
        company={"© Weteck Events Ltd. 2024"}
        email_id={"hello@crowdedevents.com"}
      />
    </div>
  );
}
