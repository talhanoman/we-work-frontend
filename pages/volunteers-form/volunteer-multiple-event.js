import React, { useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
// import ProgressCard from "@/components/progress-card";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import MultiSelect from "@/components/multi-select";

const multiple_events_options = [
  { value: "Summer Music Festival" },
  { value: "International Trade Expo" },
  { value: "Charity Walkathon" },
  { value: "Tech Conference" },
];

export default function VolunteerMultipleEvent() {
  const [selectedOption, setSelectedOption] = useState([]);
  const router = useRouter();

  const handleMultiSelect = (option) => {
    setSelectedOption(option);
  };

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
              Which of <span className="text-primary-700">our events</span> are
              you interested in volunteering for?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              We have a variety of exciting events coming up and we'd love to
              know which ones you're interested in!
            </p>
          </div>

          <form className="space-y-6">
            {/* Multiple Select */}
            <div className="w-full">
              <label
                className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                htmlFor="multipleEvents"
              >
                Multiple Events<span className="text-primary-600">*</span>
              </label>
              <MultiSelect
                options={multiple_events_options}
                selectedOption={selectedOption}
                onSelect={handleMultiSelect}
                placeholder={"Choose an option"}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <button
                className="w-full h-11 flex justify-center items-center flex-1 order-2 sm:order-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs"
                onClick={(e) => {
                  e.preventDefault()
                  router.back()
                }}
              >
                Back
              </button>
              <button
                className="w-full h-11 flex justify-center items-center flex-1 order-2 sm:order-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-primary-600 rounded-lg text-white py-2.5 disabled:pointer-events-none disabled:opacity-75 shadow-xs"
                disabled={selectedOption?.length < 1}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/volunteers-form/volunteer-activities");
                }}
              >
                Continue
              </button>
            </div>
          </form>

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
