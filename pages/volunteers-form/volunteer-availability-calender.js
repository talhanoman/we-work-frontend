import React, { useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
// import ProgressCard from "@/components/progress-card";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import { FiMoon, FiSun, FiSunrise, FiSunset } from "react-icons/fi";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const day_time_options = [
  { icon: <FiSunrise className="w-6 h-6 text-gray-700" />, daytime: "Morning" },
  { icon: <FiSun className="w-6 h-6 text-gray-700" />, daytime: "Noon" },
  { icon: <FiSunset className="w-6 h-6 text-gray-700" />, daytime: "Afternoon" },
  { icon: <FiMoon className="w-6 h-6 text-gray-700" />, daytime: "Night" },
]

export default function VolunteerAvailabilityCalender() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDayTime, setSelectedDayTime] = useState([]);
  const router = useRouter();

  const handleDays = (day) => {
    const isSelected = selectedDays.includes(day);

    if (isSelected) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleDayTime = (dayTime) => {
    const isSelected = selectedDayTime.includes(dayTime);

    if (isSelected) {
      setSelectedDayTime(selectedDayTime.filter((selectDayTime) => selectDayTime !== dayTime));
    } else {
      setSelectedDayTime([...selectedDayTime, dayTime]);
    }
  };

  return (
    <div className="flex h-screen bg-white justify-center">
      {/* Left Section */}
      {/* <div className="w-4/12 ">
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
        {/* Calender */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              On what{" "}
              <span className="text-primary-700">days</span>{" "}
              are you available for volunteering?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              We want to make sure that you feel safe and supported during your time volunteering with us.
            </p>
          </div>

          {/* Pick time */}
          <div className="space-y-2.5 py-3">
            <h3 className="text-sm-medium 2xl:text-md-medium text-gray-900">Pick time</h3>
            <div className="flex gap-2">
              {day_time_options.map((day, index) => (
                <button
                  className={`w-[72px] flex flex-col items-center gap-y-1 text-xs-medium 2xl:text-sm-medium text-gray-700 rounded-lg ${selectedDayTime.includes(day.daytime) ? 'border-primary-300 shadow-xs-focused-primary-100' : 'border-gray-300'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleDayTime(day.daytime)
                  }
                  }
                >
                  {day.icon}
                  <span>{day.daytime}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form action="" className="grid grid-cols-3 gap-x-3 gap-y-4">
            {days.map((day, index) => (
              <button
                key={day}
                className={`w-full h-11 flex justify-center items-center text-sm-semibold 2xl:text-md-semibold border ${selectedDays.includes(day) ? 'border-primary-300 shadow-xs-focused-primary-100' : 'border-gray-300'} bg-white rounded-lg text-gray-700 py-2.5 shadow-xs`}
                onClick={(e) => {
                  e.preventDefault()
                  handleDays(day)
                }
                }
              >
                {day}
              </button>
            ))}
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
              onClick={() => router.push("/volunteers-form/congratulations")}
            >
              Continue
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
