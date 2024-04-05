import React, { useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
// import ProgressCard from "@/components/progress-card";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";

const initial_form_data = {
  manageMinorsExperienceDetails: "",
  manageMinorsExperienceDetailsValid: false,
};

export default function ManageMinorsExperienceDetails() {
  const [formData, setFormData] = useState(initial_form_data);
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      manageMinorsExperienceDetails: value,
      manageMinorsExperienceDetailsValid: value.length >= 1,
    });
  };

  return (
    <div className="flex h-screen bg-white justify-center">
      {/* Left Section */}
      {/* <div className="w-4/12 ">
        <ProgressCard progress={6} />
      </div> */}

      {/* Right Section */}
      <div className="relative w-8/12 flex flex-col bg-white">
        {/* Logo */}
        <Logo
          src={"crowd-work-vertical-logo"}
          alt={"Company Logo"}
          className={"relative mt-6 custom-height-mq:h-[60px] sm:h-[94px]"}
        />
        {/* Team Lead Experience Details */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              Tell us about it!
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              Mega events can be a unique experience, and we'd love to hear about it!
            </p>
          </div>

          <div className="space-y-6">
            {/* Form */}
            <form action="">
              {/* Team Lead Experience Details Row */}
              <label
                className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                htmlFor="manageMinorsExperienceDetails"
              >
                Manage Minors Experience Details<span className="text-primary-600">*</span>
              </label>
              <div className="w-full">
                <textarea
                  id="manageMinorsExperienceDetails"
                  name="manageMinorsExperienceDetails"
                  rows="4"
                  value={formData.manageMinorsExperienceDetails}
                  onChange={handleInputChange}
                  placeholder="Enter a description..."
                  required
                  className={`w-full block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                />
              </div>
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
                disabled={!(formData.manageMinorsExperienceDetails)}
                onClick={() => router.push("/volunteers-form/languages")}
              >
                Continue
              </button>
            </div>
          </div>

          <ProgressBar progress={70} width="w-full max-w-[320px] mx-auto" />
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
