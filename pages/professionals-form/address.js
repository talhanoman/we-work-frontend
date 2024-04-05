import React, { useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import LocationCombobox from "@/components/location-combobox";
import { getList } from "country-list-with-dial-code-and-flag";
import ProgressCardProfessionals from "@/components/progress-card-professionals";

const initial_form_data = {
  address: "",
  cityOrEmirate: "",
  stateOrRegionOrProvince: "",
  zipOrPostalCode: "",
  country: "",
  addressValid: false,
  cityOrEmirateValid: false,
  stateOrRegionOrProvinceValid: false,
  zipOrPostalCodeValid: false,
  countryValid: false,
};

export default function Address() {
  const countryListWithDialCodeAndFlag = getList();

  const [selectedLocation, setSelectedLocation] = useState([]);
  const [formData, setFormData] = useState(initial_form_data);
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
      [`${name}Valid`]: value.length >= 1,
    });
  };

  const handleLocationSelect = (option) => {
    setSelectedLocation(option)

    setFormData({
      ...formData,
      country: option.name,
      countryValid: option.name.length >= 1,
    });
  };

  return (
    <div className="flex h-screen bg-gray-800">
      {/* Left Section */}
      <div className="w-4/12">
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
        {/* Address */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              What's your <span className="text-primary-700">address</span>?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
            So we know where you'll be travelling from.
            </p>
          </div>

          <div className="space-y-6">
            {/* Form */}
            <form action="" className="space-y-6">
            <div className="w-full flex justify-between gap-6">
              <div className="w-full">
                <label
                    className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                  htmlFor="address"
                >
                  Address<span className="text-primary-600">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500"
                />
              </div>

              <div className="w-full">
                <label
                  className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                  htmlFor="cityOrEmirate"
                >
                  City/Emirate
                </label>
                <input
                  id="cityOrEmirate"
                  name="cityOrEmirate"
                  type="text"
                  value={formData.cityOrEmirate}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500"
                />
              </div>
            </div>

              <div className="w-full flex justify-between gap-6">
                <div className="w-full">
                  <label
                    className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                    htmlFor="stateOrRegionOrProvince"
                  >
                    State/Region/Province<span className="text-primary-600">*</span>
                  </label>
                  <input
                    id="stateOrRegionOrProvince"
                    name="stateOrRegionOrProvince"
                    type="text"
                    value={formData.stateOrRegionOrProvince}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500"
                  />
                </div>
                <div className="max-w-[170px] w-full">
                  <label
                    className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                    htmlFor="zipOrPostalCode"
                  >
                    Zip/Postal code<span className="text-primary-600">*</span>
                  </label>
                  <input
                    id="zipOrPostalCode"
                    name="zipOrPostalCode"
                    type="text"
                    value={formData.zipOrPostalCode}
                    onChange={handleInputChange}
                    placeholder="Postal code"
                    className="w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  className="block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5"
                  htmlFor="country"
                >
                  Country<span className="text-primary-600">*</span>
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
                disabled={!(formData.addressValid && formData.cityOrEmirateValid && formData.stateOrRegionOrProvinceValid && formData.zipOrPostalCodeValid && formData.countryValid)}
                onClick={() => router.push("/professionals-form/date-of-birth")}
              >
                Continue
              </button>
            </div>
          </div>

          <ProgressBar progress={30} width="w-full max-w-[320px] mx-auto" />
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
