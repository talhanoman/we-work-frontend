import React, { useEffect, useRef, useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import ProgressCardProfessionals from "@/components/progress-card-professionals";
import { FiCalendar } from "react-icons/fi";

const initial_form_data = {
  dateOfBirth: "",
  dateOfBirthValid: false,
};

export default function DateOfBirth() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isBelow18, setIsBelow18] = useState(false);
  const [formData, setFormData] = useState(initial_form_data);
  const router = useRouter();
  const calRef = useRef();

  const handleDateChange = (date) => {
    setSelectedDate(date);

    setFormData({
      ...formData,
      dateOfBirth: date?.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      dateOfBirthValid: date != undefined && toString(date).length > 0,
    });
  };

  useEffect(() => {
    const birthDate = new Date(selectedDate);
    const currentDate = new Date();

    const age = Math.floor(
      (currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000)
    );

    if (age < 18 && !isBelow18) {
      setIsBelow18(true);

      setFormData({
        ...formData,
        dateOfBirthValid: false,
      });
    } else {
      setIsBelow18(false);

      setFormData({
        ...formData,
        dateOfBirthValid: selectedDate != undefined && selectedDate != null,
      });
    }
    
  }, [selectedDate, setSelectedDate]);

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
        {/* Date of Birth */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              <span className="block">
                We need to make sure you're old enough to join the fun.
              </span>
              What's your <span className="text-primary-700">birthday</span>?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              We'll ask for ID later in the process.
            </p>
          </div>

          <div className="space-y-6">
            {/* Form */}
            <form action="">
              {/* Date of birth Row */}
              <div className="max-w-[180px] w-full space-y-1.5">
                <label
                  className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                  htmlFor="dateOfBirth"
                >
                  Date of birth<span className="text-primary-600">*</span>
                </label>
                <div className="relative">
                  <DatePicker
                    id="dateOfBirth"
                    ref={calRef}
                    selected={selectedDate}
                    onChange={handleDateChange}
                    calendarClassName="bg-primary-600"
                    dateFormat="dd MMM, yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    isClearable
                    popperPlacement="top"
                    placeholderText="Select date"
                    shouldCloseOnSelect={false}
                    className={`w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border ${
                      isBelow18 ? "border-error-300" : "border-gray-300"
                    } pl-[40px] pr-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                  >
                    <div className="h-[1px] w-full bg-gray-200 mt-2.5" />

                    <div className="flex justify-between gap-3">
                      <button
                        className="w-full h-11 flex justify-center items-center flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedDate(null);
                          calRef.current.setOpen(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-full h-11 py-2.5 flex justify-center items-center flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 text-white rounded-lg disabled:pointer-events-none disabled:opacity-75 shadow-xs"
                        onClick={(e) => {
                          e.preventDefault();
                          calRef.current.setOpen(false);
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </DatePicker>
                  <FiCalendar className="w-4 2xl:w-5 h-auto text-gray-500 absolute top-3.5 2xl:top-3 left-3.5" />
                </div>
                {isBelow18 && (
                  <p className="text-xs-regular 2xl:text-sm-regular text-error-500">
                    You must be over 18 to apply!
                  </p>
                )}
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
                disabled={!formData.dateOfBirthValid}
                onClick={() => router.push("/professionals-form/profile-photo")}
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
