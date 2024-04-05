import React, { useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
// import ProgressCard from "@/components/progress-card";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";

const initial_form_data = {
  termsAndPolicyIsChecked: false,
  newsletterIsChecked: false,
};

export default function TermsAndConditions() {
  const [formData, setFormData] = useState(initial_form_data);
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, checked } = event.target;

    setFormData({
      ...formData,
      [name]: checked,
    });
  }

  return (
    <div className="flex h-screen bg-white justify-center">
      {/* Left Section */}
      {/* <div className="w-4/12">
        <ProgressCard progress={1} />
      </div> */}

      {/* Right Section */}
      <div className="relative w-8/12 flex flex-col bg-white">
        {/* Logo */}
        <Logo
          src={"crowd-work-vertical-logo"}
          alt={"Company Logo"}
          className={"relative mt-6 custom-height-mq:h-[60px] sm:h-[94px]"}
        />
        {/* Terms and Conditions */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              Before we get started, we need you to agree to our terms and conditions.
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              Don't worry, it's nothing scary! Just a few standard rules to make sure everyone has a great experience.
            </p>
          </div>

          <div className="space-y-6">
            {/* Form */}
            <form action="" className="space-y-6">
              <label htmlFor="terms_and_policy_checkbox" className="flex gap-2">
                <input
                  name="termsAndPolicyIsChecked"
                  type="checkbox"
                  checked={formData.termsAndPolicyIsChecked}
                  onChange={handleInputChange}
                  className="h-4 w-4 border border-primary-600 text-primary-600 rounded-[4px] checked:border-0 focus:ring-1 focus:ring-primary-600 outline-none"
                />
                <p className="text-xs-regular 2xl:text-sm-regular text-gray-500">
                  I have read and accepted the <a className="text-xs-regular 2xl:text-sm-regular text-gray-700 hover:underline">Terms of Use</a>{" "}
                  and <a className="text-xs-regular 2xl:text-sm-regular text-primary-700 hover:underline">Privacy Policy</a>.
                </p>
              </label>
              <label htmlFor="newsletter_checkbox" className="flex gap-2">
                <input
                  name="newsletterIsChecked"
                  type="checkbox"
                  checked={formData.newsletterIsChecked}
                  onChange={handleInputChange}
                  className="h-4 w-4 border border-primary-600 text-primary-600 rounded-[4px] checked:border-0 focus:ring-1 focus:ring-primary-600 outline-none"
                />
                <p className="text-xs-regular 2xl:text-sm-regular text-gray-500">
                  Crowded Tech Trading may keep me informed via email about products and services. <a className="text-xs-regular 2xl:text-sm-regular text-primary-700 hover:underline">Learn more</a>.
                </p>
              </label>
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
                disabled={
                  !(
                    formData.termsAndPolicyIsChecked &&
                    formData.newsletterIsChecked
                  )
                }
                onClick={() => router.push("/volunteers-form/name")}
              >
                Continue
              </button>
            </div>
          </div>

          <ProgressBar progress={0} width="w-full max-w-[320px] mx-auto" />
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
