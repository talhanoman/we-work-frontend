import React, { useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
import ProgressCard from "@/components/progress-card";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import Select from "@/components/select";
import { FiPlus, FiXOctagon } from "react-icons/fi";

const skill_options = [
  { label: "First-aid", value: "First-aid" },
  { label: "Carpentry", value: "Carpentry" },
  { label: "Stage-setup", value: "Stage-setup" },
  { label: "photography", value: "photography" },
];

const skill_efficiency_options = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
  { label: "Expert", value: "Expert" },
];

const initial_form_data = {
  skill: "",
  skillEfficiency: "",
  skillValid: false,
  skillEfficiencyValid: false,
};

export default function Skills() {
  const [selectedOption, setSelectedOption] = useState({
    skill: skill_options[0],
    skillEfficiency: skill_efficiency_options[0],
  });
  const [newSkill, setNewSkill] = useState(false);
  const [formData, setFormData] = useState(initial_form_data);
  const router = useRouter();

  const handleSelect = (name, option) => {
    setSelectedOption({
      ...selectedOption,
      [name]: option,
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
          className={
            "relative mt-6 custom-height-mq:h-[60px] sm:h-[94px]"
          }
        />
        {/* Current Education Status */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              What are your <span className="text-primary-700">skills</span>?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              Let us know what you're good at so we can find the perfect role
              for you! Please add your top 3 skills.
            </p>
          </div>

          <div className="space-y-6">
            {/* Form */}
            <div className="space-y-2">
              <form action="" className="space-y-6">
                {/* Skill and Skill efficiency Row */}
                <div className="flex gap-6">
                  <div className="w-full">
                    <label
                      className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                      htmlFor="skill"
                    >
                      Skill
                      <span className="text-primary-600">*</span>
                    </label>
                    <Select
                      placeholder={"Please choose an option"}
                      options={skill_options}
                      selectedOption={selectedOption.skill}
                      onSelect={(value) => handleSelect("skill", value)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                      htmlFor="skillEfficiency"
                    >
                      Skill Efficiency
                      <span className="text-primary-600">*</span>
                    </label>
                    <Select
                      placeholder={"Please choose an option"}
                      options={skill_efficiency_options}
                      selectedOption={selectedOption.skillEfficiency}
                      onSelect={(value) =>
                        handleSelect("skillEfficiency", value)
                      }
                    />
                  </div>
                </div>

                {newSkill && (
                  <div className="relative">
                    <div className="flex gap-6">
                      <div className="w-full">
                        <label
                          className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                          htmlFor="skill1"
                        >
                          Skill1
                          <span className="text-primary-600">*</span>
                        </label>
                        <Select
                          options={skill_options}
                          selectedOption={selectedOption?.skill1}
                          onSelect={(value) => handleSelect("skill1", value)}
                          placeholder={"Please choose an option"}
                        />
                      </div>
                      <div className="w-full">
                        <label
                          className="text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only"
                          htmlFor="skillEfficiency1"
                        >
                          Skill Efficiency1
                          <span className="text-primary-600">*</span>
                        </label>
                        <Select
                          options={skill_efficiency_options}
                          selectedOption={selectedOption?.skillEfficiency1}
                          onSelect={(value) =>
                            handleSelect("skillEfficiency1", value)
                          }
                          placeholder={"Please choose an option"}
                        />
                      </div>
                    </div>

                    <FiXOctagon
                      className="w-5 h-5 text-gray-900 absolute top-3 -right-8 cursor-pointer"
                      onClick={() => setNewSkill(false)}
                    />
                  </div>
                )}
              </form>

              {!newSkill && (
                <button
                  className="flex items-center gap-2 text-xs-semibold 2xl:text-sm-semibold text-gray-600"
                  onClick={(e) => {
                    e.preventDefault();
                    setNewSkill(true);
                  }}
                >
                  <FiPlus className="w-4 2xl:w-5 h-auto text-gray-600" />
                  <span>Add another</span>
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
                onClick={() =>
                  router.push("/volunteers-form/volunteer-event-name-choice")
                }
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
