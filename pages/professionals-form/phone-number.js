import React, { useEffect, useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import PhoneNumberInput from "@/components/phone-number-input";
import ProgressCardProfessionals from "@/components/progress-card-professionals";

const initial_form_data = {
  phone: "",
  phoneValid: false,
};

export default function PhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState("+93 ");
  const [formData, setFormData] = useState(initial_form_data);
  const router = useRouter();

  function phoneValidation() {
    const dial_code = phoneNumber.match(/^\+(\d+)/)[1];
    // Remove any non-digit characters
    const numeric_phone_number = phoneNumber.replace(/\D/g, "");

    setFormData({
      ...formData,
      phone: numeric_phone_number,
      phoneValid: new RegExp(`^${dial_code}\\d{10}$`).test(
        numeric_phone_number
      ),
    });
  }

  const handlePhoneNumberChange = (updatedPhoneNumber) => {
    setPhoneNumber(updatedPhoneNumber);
  };

  useEffect(() => {
    phoneValidation();
  }, [phoneNumber, setPhoneNumber])

  return (
    <div className="flex h-screen bg-gray-800">
      {/* Left Section */}
      <div className="w-4/12 ">
        {/* Nav featured card */}
        <ProgressCardProfessionals progress={2} />
      </div>

      {/* Right Section */}
      <div className="relative w-8/12 flex flex-col bg-white rounded-l-[40px]">
        {/* Logo */}
        <Logo
          src={"crowd-work-vertical-logo"}
          alt={"Company Logo"}
          className={"absolute left-0 top-8 custom-height-mq:h-[60px] sm:h-[94px]"}
        />
        {/* Phone Number */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              What's your{" "}
              <span className="text-primary-700">phone number</span>?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
            We may need to reach out to you with important updates or last-minute changes.
            </p>
          </div>

          <div className="space-y-6">
            {/* Form */}
            <form action="">
              {/* Phone Row */}
              <div className="w-full">
                  <label
                    className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                    htmlFor="phone"
                  >
                    Phone Number <span className="text-primary-600">*</span>
                    <div className="mt-1.5 w-full">
                      <PhoneNumberInput
                        phoneNumber={phoneNumber}
                        onPhoneNumberChange={handlePhoneNumberChange}
                        phoneValid={formData.phoneValid}
                      />
                    </div>
                  </label>
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
                disabled={!(formData.phoneValid)}
                onClick={() => router.push("/professionals-form/address")}
              >
                Continue
              </button>
            </div>
          </div>

          <ProgressBar progress={20} width="w-full max-w-[320px] mx-auto" />
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
