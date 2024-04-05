import React, { useRef, useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
// import ProgressCard from "@/components/progress-card";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import { FiPlus } from "react-icons/fi";

const activities = [
  "Activity 1",
  "Activity 2",
  "Activity 3",
  "Activity 4",
  "Activity 5",
  "Activity 6",
  "Activity 7",
  "Activity 8",
];

export default function VolunteerActivities() {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [newActivity, setNewActivity] = useState(false)
  const [customActivities, setCustomActivities] = useState([]);
  const [newActivityName, setNewActivityName] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  const handleActivity = (activity) => {
    // Check if the activity is already selected
    const isSelected = selectedActivities.includes(activity);

    // Update the selectedActivities state based on the selection
    if (isSelected) {
      setSelectedActivities(
        selectedActivities.filter(
          (selectedActivity) => selectedActivity !== activity
        )
      );
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleCreateItem = () => {
    if (newActivityName.trim() !== "" && !customActivities.includes(newActivityName)) {
      setCustomActivities([...customActivities, newActivityName]);
      setNewActivityName("");
    }
  };

  const handleInputFocus = () => {
    inputRef.current?.focus()
  };

  const handleAddButton = (e) => {
    e.preventDefault()
    setNewActivity(true)

    handleInputFocus
  };

  const handleInputChange = (e) => {
    setNewActivityName(e.target.value);
  };

  const handleInputBlur = () => {
    if (newActivityName.trim() !== '') {
      setNewActivity(false)
      handleCreateItem();
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === ",") {
      e.preventDefault();
      setNewActivity(false)
      handleCreateItem();
    }
  };

  const handleDeleteCustomActivity = (activityName) => {
    setCustomActivities(customActivities.filter((activity) => activity !== activityName));
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
        {/* Transport */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              What kind of{" "}
              <span className="text-primary-700">volunteer activities</span> are
              you interested in?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              We want to make sure you have a fun and fulfilling experience!
            </p>
          </div>

          <div className="space-y-6">
            {/* Form */}
            <form
              action=""
              className="grid grid-cols-3 gap-x-3 justify-items-center gap-y-4"
            >
              {activities.map((activity, index) => (
                <button
                  key={activity}
                  onClick={(e) => {
                    e.preventDefault();
                    handleActivity(activity);
                  }}
                  className={`w-full h-11 flex justify-center items-center text-sm-semibold 2xl:text-md-semibold text-gray-700 border ${selectedActivities.includes(activity)
                    ? "border-primary-300 shadow-xs-focused-primary-100"
                    : "border-gray-300"
                    } bg-white rounded-lg py-2.5 shadow-xs`}
                >
                  {activity}
                </button>
              ))}
              {customActivities.map((activityName) => (
                <button
                  key={activityName}
                  onClick={(e) => {
                    e.preventDefault()
                    handleDeleteCustomActivity(activityName)
                  }}
                  className={`w-full h-11 flex justify-center items-center text-sm-semibold 2xl:text-md-semibold text-gray-700 border ${customActivities.includes(activityName)
                    ? "border-primary-300 shadow-xs-focused-primary-100"
                    : "border-gray-300"
                    } bg-white rounded-lg px-[18px] py-2.5 shadow-xs truncate`}
                >
                  {activityName}
                </button>
              ))}
              {newActivity && <div className="w-full">
                <input
                  type="text"
                  value={newActivityName}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onBlur={handleInputBlur}
                  ref={inputRef}
                  placeholder="Enter Activity"
                  className="w-full h-11 flex justify-center items-center text-md-semibold text-gray-700 border border-gray-300 bg-white rounded-lg py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-sm-medium placeholder:text-gray-500 truncate"
                />
              </div>}

              <button className="flex items-center gap-2 text-xs-semibold 2xl:text-sm-semibold text-gray-600" onClick={handleAddButton}>
                <FiPlus className="w-4 2xl:w-5 h-auto text-gray-600" />
                <span>Add your own</span>
              </button>
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
                onClick={() => router.push("/volunteers-form/volunteer-availability-calender")}
              >
                Continue
              </button>
            </div>
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
