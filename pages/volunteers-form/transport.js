import React, { useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
// import ProgressCard from "@/components/progress-card";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import Select from "@/components/select";

const initial_form_data = {
  transport: "",
  transportValid: false,
};

const travel_options = [{ label: "option 1", value: "option 1" },
{ label: "option 2", value: "option 2" },];

export default function Transport() {
  const [formData, setFormData] = useState(initial_form_data);
  const [selectedOption, setSelectedOption] = useState([]);
  const router = useRouter();

  const handleSelect = (option) => {
    setSelectedOption(option);

    setFormData({
      ...formData,
      transport: option?.value,
      transportValid: option?.value.length >= 1,
    });
  };

  return (
    <div className="flex h-screen bg-white justify-center">
      {/* Left Section */}
      {/* <div className="w-4/12 ">
        <ProgressCard progress={5} />
      </div> */}

      {/* Right Section */}
      <div className="relative w-8/12 flex flex-col bg-white">
        {/* Logo */}
        <Logo
          src={"crowd-work-vertical-logo"}
          alt={"Company Logo"}
          className={"relative mt-6 custom-height-mq:h-[60px] sm:h-[94px]"}
        />
        {/* Transport */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              How do you plan to{" "}
              <span className="text-primary-700">travel</span> during the event?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              We want to ensure that our volunteers can get to and from the
              event easily and safely.
            </p>
          </div>

          <div className="space-y-6">
            {/* Form */}
            <form action="">
              {/* Transport Row */}
              <div className="w-full">
                <label
                  className="block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5"
                  htmlFor="travel"
                >
                  Travel Method<span className="text-primary-600">*</span>
                </label>
                <Select
                  options={travel_options}
                  selectedOption={selectedOption}
                  onSelect={handleSelect}
                  placeholder={"Please choose an option"}
                />
              </div>
              {/* <label
                  className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                  htmlFor="transport"
                >
                  Transport<span className="text-primary-600">*</span>
                </label>
              <div className="w-full">
                <input
                  id="transport"
                  name="transport"
                  type="text"
                  value={formData.transport}
                  onChange={handleInputChange}
                  placeholder="Tell us here"
                  required
                  className={`w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                />
              </div> */}
            </form>

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
                disabled={!(formData.transportValid)}
                onClick={() => router.push("/volunteers-form/education-status")}
              >
                Continue
              </button>
            </div>
          </div>

          <ProgressBar progress={60} width="w-full max-w-[320px] mx-auto" />
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
