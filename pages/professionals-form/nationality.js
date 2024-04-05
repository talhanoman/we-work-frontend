import React, { useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import { getList } from "country-list-with-dial-code-and-flag";
import LocationCombobox from "@/components/location-combobox";
import ProgressCardProfessionals from "@/components/progress-card-professionals";

const initial_form_data = {
  nationality: "",
  nationalityValid: false,
};

export default function Nationality() {
  const countryListWithDialCodeAndFlag = getList();

  const [selectedLocation, setSelectedLocation] = useState([]);
  const [formData, setFormData] = useState(initial_form_data);
  const router = useRouter();

  const handleLocationSelect = (option) => {
    setSelectedLocation(option);

    setFormData({
      ...formData,
      nationality: option.name,
      nationalityValid: option.name.length >= 1,
    });
  };

  return (
    <div className="flex h-screen bg-gray-800">
      {/* Left Section */}
      <div className="w-4/12">
        {/* Nav featured card */}
        <ProgressCardProfessionals progress={3} />
      </div>

      {/* Right Section */}
      <div className="relative w-8/12 flex flex-col bg-white rounded-l-[40px]">
        {/* Logo */}
        <Logo
          src={"crowd-work-vertical-logo"}
          alt={"Company Logo"}
          className={"absolute left-0 top-8 custom-height-mq:h-[60px] sm:h-[94px]"}
        />
        {/* Nationality */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
            Where are you{" "}
              <span className="text-primary-700">from</span>?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
            We're excited to have team members from all over the world!
            </p>
          </div>

          <div className="space-y-6">
            {/* Form */}
            <form action="">
              {/* Nationality Row */}
              <div className="w-full">
                <label
                  className="block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5"
                  htmlFor="nationality"
                >
                  Nationality<span className="text-primary-600">*</span>
                </label>
                <LocationCombobox
                  options={countryListWithDialCodeAndFlag}
                  selectedOption={selectedLocation}
                  onSelect={handleLocationSelect}
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
                disabled={!formData.nationalityValid}
                onClick={() => router.push("/professionals-form/id-info")}
              >
                Continue
              </button>
            </div>
          </div>

          <ProgressBar progress={60} width="w-full max-w-[320px] mx-auto" />
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
