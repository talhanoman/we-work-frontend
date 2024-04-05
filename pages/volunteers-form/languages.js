import React, { useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
// import ProgressCard from "@/components/progress-card";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import Select from "@/components/select";
import { FiPlus, FiXOctagon } from "react-icons/fi";
import LanguageSelect from "@/components/language-select";

const main_language_options = [
  { code: "US", language: "English (US)" },
  { code: "ES", language: "Español - Spanish" },
  { code: "PK", language: "Urdu" },
  { code: "IR", language: "Persian" },
  { code: "SA", language: "Arabic" },
];
const language_type_options = [
  { label: "Native", value: "Native" },
  { label: "Non-Native", value: "Non-Native" },
  { label: "Other", value: "Other" },
];
const other_known_languages_options = [
  { code: "US", language: "English (US)" },
  { code: "ES", language: "Español - Spanish" },
  { code: "PK", language: "Urdu" },
  { code: "IR", language: "Persian" },
  { code: "SA", language: "Arabic" },
];
const language_efficiency_options = [
  { label: "Fluent", value: "Fluent" },
  { label: "Professional", value: "Professional" },
  { label: "Bilingual", value: "Bilingual" },
];

const initial_form_data = {
  mainLanguage: "",
  languageType: "",
  otherKnownLanguage: "",
  otherKnownLanguage1: "",
  languageEfficiency: "",
  languageEfficiency1: "",
  mainLanguageValid: false,
  languageTypeValid: false,
  otherKnownLanguageValid: false,
  otherKnownLanguage1Valid: false,
  languageEfficiencyValid: false,
  languageEfficiency1Valid: false,
};

export default function Languages() {
  const [selectedLanguage, setSelectedLanguage] = useState({
    mainLanguage: main_language_options[0],
    otherKnownLanguage: other_known_languages_options[0],
    otherKnownLanguage1: other_known_languages_options[0],
  });
  const [selectedOption, setSelectedOption] = useState({
    languageType: language_type_options[0],
    languageEfficiency: language_efficiency_options[0],
    languageEfficiency1: language_efficiency_options[0],
  });
  const [newLanguage, setNewLanguage] = useState(false);
  const [formData, setFormData] = useState(initial_form_data);
  const router = useRouter();

  const handleLanguageSingleSelect = (name, option) => {
    setSelectedLanguage((prevValues) => ({
      ...prevValues,
      [name]: option,
    }));

    setFormData({
      ...formData,
      [name]: option?.language,
      [`${name}Valid`]: option?.language?.length >= 1,
    });
  };

  const handleSelect = (name, option) => {
    setSelectedOption({
      ...selectedOption,
      [name]: option,
    });

    setFormData({
      ...formData,
      [name]: option?.value,
      [`${name}Valid`]: option?.value?.length >= 1,
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
        {/* Current Education Status */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              What <span className="text-primary-700">languages</span> do you
              speak?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              We're always looking for volunteers with language skills to help
              us better serve our diverse community.
            </p>
          </div>

          <div className="space-y-6">
            {/* Form */}
            <div className="space-y-2">
              <form action="" className="space-y-6">
                {/* Main Language and Language Type Row */}
                <div className="flex gap-6">
                  <div className="w-full">
                    <label
                      className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                      htmlFor="mainLanguage"
                    >
                      Main Language
                      <span className="text-primary-600">*</span>
                    </label>
                    <LanguageSelect
                      options={main_language_options}
                      selectedOption={selectedLanguage.mainLanguage}
                      onSelect={(value) =>
                        handleLanguageSingleSelect("mainLanguage", value)
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                      htmlFor="languageType"
                    >
                      Language Type<span className="text-primary-600">*</span>
                    </label>
                    <Select
                      placeholder={"Please choose an option"}
                      options={language_type_options}
                      selectedOption={selectedOption.languageType}
                      onSelect={(value) => handleSelect("languageType", value)}
                    />
                  </div>
                </div>

                {/* Other Known Language and Language Efficiency Row */}
                <div className="flex gap-6">
                  <div className="w-full">
                    <label
                      className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                      htmlFor="otherKnownLanguage"
                    >
                      Other Known Language
                      <span className="text-primary-600">*</span>
                    </label>
                    <LanguageSelect
                      options={other_known_languages_options}
                      selectedOption={selectedLanguage.otherKnownLanguage}
                      onSelect={(value) =>
                        handleLanguageSingleSelect("otherKnownLanguage", value)
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                      htmlFor="languageEfficiency"
                    >
                      Language Efficiency
                      <span className="text-primary-600">*</span>
                    </label>
                    <Select
                      placeholder={"Please choose an option"}
                      options={language_efficiency_options}
                      selectedOption={selectedOption.languageEfficiency}
                      onSelect={(value) =>
                        handleSelect("languageEfficiency", value)
                      }
                    />
                  </div>
                </div>

                {newLanguage && (
                  <div className="relative">
                    <div className="flex gap-6">
                      <div className="w-full">
                        <label
                          className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                          htmlFor="otherKnownLanguage1"
                        >
                          Other Known Language
                          <span className="text-primary-600">*</span>
                        </label>
                        <LanguageSelect
                          options={other_known_languages_options}
                          selectedOption={selectedLanguage.otherKnownLanguage1}
                          onSelect={(value) =>
                            handleLanguageSingleSelect(
                              "otherKnownLanguage1",
                              value
                            )
                          }
                        />
                      </div>
                      <div className="w-full">
                        <label
                          className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                          htmlFor="languageEfficiency1"
                        >
                          Language Efficiency
                          <span className="text-primary-600">*</span>
                        </label>
                        <Select
                          options={language_efficiency_options}
                          selectedOption={selectedOption.languageEfficiency1}
                          onSelect={(value) =>
                            handleSelect("languageEfficiency1", value)
                          }
                        />
                      </div>
                    </div>

                    <FiXOctagon
                      className="w-5 h-5 text-gray-900 absolute top-3 -right-8 cursor-pointer"
                      onClick={() => setNewLanguage(false)}
                    />
                  </div>
                )}
              </form>

              {!newLanguage && (
                <button
                  className="flex items-center gap-2 text-xs-semibold 2xl:text-sm-semibold text-gray-600"
                  onClick={(e) => {
                    e.preventDefault();
                    setNewLanguage(true);
                  }}
                >
                  <FiPlus className="w-4 2xl:w-5 h-auto text-gray-600" />
                  <span>
                    Add another
                  </span>
                </button>
              )}
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
                onClick={() => router.push("/volunteers-form/skills")}
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
