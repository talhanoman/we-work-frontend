import React, { useRef, useState } from "react";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
import { useRouter } from "next/router";
import ProgressBar from "@/components/progress-bar";
import Logo from "@/components/logo";
import { FiPlus } from "react-icons/fi";
// import ProgressCard from "@/components/progress-card";
import DateInput from "@/components/talent/Forms/date-input";

const initial_form_data = {
  certificateName: "",
  issuingInstitution: "",
  expirationDate: "",
  certificateName1: "",
  issuingInstitution1: "",
  expirationDate1: "",
  certificateNameValid: false,
  issuingInstitutionValid: false,
  expirationDateValid: false,
  certificateName1Valid: false,
  issuingInstitution1Valid: false,
  expirationDate1Valid: false,
};

export default function Certificates() {
  const [selectedDate, setSelectedDate] = useState({
    expirationDate: null,
    expirationDate1: null,
  });
  const [newCertificate, setNewCertificate] = useState(false);
  const [formData, setFormData] = useState(initial_form_data);
  const [dateStatus, setDateStatus] = useState(false);
  const router = useRouter();
  const calRef = useRef();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
      [`${name}Valid`]: value.length >= 1,
    });
  };

  const handleDateChange = (name, date) => {
    setSelectedDate({
      ...selectedDate,
      [name]: date,
    });

    setFormData({
      ...formData,
      [name]: date?.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      [`${name}Valid`]: date != undefined && toString(date).length > 0,
    });
  };

  const handleNewCertificate = (e) => {
    e.preventDefault();

    setNewCertificate(true);
  };

  return (
    <div className="flex h-screen bg-white justify-center">
      {/* Left Section */}
      {/* <div className="w-4/12">
        <ProgressCard progress={4} />
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
        {/* Certificates */}
        <div className="w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8">
          <div className="space-y-3">
            <h1 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              Which <span className="text-primary-700">certificate(s)</span> do
              you currently hold?
            </h1>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-700">
              Let us know below so we can assign you the right tasks!
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              {/* Form */}
              <form action="" className="space-y-6">
                {/* Certificate Name Row */}
                <div className="w-full">
                  <label
                    className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                    htmlFor="certificateName"
                  >
                    Name<span className="text-primary-600">*</span>
                  </label>
                  <input
                    id="certificateName"
                    name="certificateName"
                    type="text"
                    value={formData.certificateName}
                    onChange={handleInputChange}
                    placeholder="Certificate name"
                    className="w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500"
                  />
                </div>

                {/* Issuing Institution and Expiration date */}
                <div className="w-full flex justify-between gap-6">
                  <div className="w-full">
                    <label
                      className="block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5"
                      htmlFor="issuingInstitution"
                    >
                      Issuing institution
                      <span className="text-primary-600">*</span>
                    </label>
                    <input
                      id="issuingInstitution"
                      name="issuingInstitution"
                      type="text"
                      value={formData.issuingInstitution}
                      onChange={handleInputChange}
                      placeholder="Institution"
                      className="w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500"
                    />
                  </div>

                  <DateInput
                    width={"max-w-[174px] w-full"}
                    id={"expirationDate"}
                    title={"Expiration date"}
                    selectedDate={selectedDate.expirationDate}
                    onSelect={handleDateChange}
                  />
                </div>

                {newCertificate && (
                  <div className="space-y-6">
                    {/* Certificate Name Row */}
                    <div className="w-full">
                      <label
                        className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                        htmlFor="certificateName1"
                      >
                        Name<span className="text-primary-600">*</span>
                      </label>
                      <input
                        id="certificateName1"
                        name="certificateName1"
                        type="text"
                        value={formData.certificateName1}
                        onChange={handleInputChange}
                        placeholder="Certificate name"
                        className="w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500"
                      />
                    </div>

                    {/* Issuing Institution and Expiration date */}
                    <div className="w-full flex justify-between gap-6">
                      <div className="w-full">
                        <label
                          className="block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5"
                          htmlFor="issuingInstitution1"
                        >
                          Issuing institution
                          <span className="text-primary-600">*</span>
                        </label>
                        <input
                          id="issuingInstitution1"
                          name="issuingInstitution1"
                          type="text"
                          value={formData.issuingInstitution1}
                          onChange={handleInputChange}
                          placeholder="Institution"
                          className="w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500"
                        />
                      </div>
                      <DateInput
                        width={"max-w-[174px] w-full"}
                        id={"expirationDate1"}
                        title={"Expiration date"}
                        selectedDate={selectedDate.expirationDate1}
                        onSelect={handleDateChange}
                      />
                    </div>
                  </div>
                )}
              </form>
              {/* Add another button */}
              <button
                className="flex items-center gap-2 text-xs-semibold 2xl:text-sm-semibold text-gray-600 disabled:pointer-events-none disabled:opacity-40"
                onClick={handleNewCertificate}
              >
                <FiPlus className="w-4 2xl:w-5 h-auto text-gray-600" />
                <span>Add another</span>
              </button>
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
                disabled={
                  !(
                    formData.certificateNameValid &&
                    formData.issuingInstitutionValid &&
                    formData.expirationDateValid &&
                    (newCertificate
                      ? formData.certificateName1Valid &&
                      formData.issuingInstitution1Valid &&
                      formData.expirationDate1Valid
                      : true)
                  )
                }
                onClick={() =>
                  router.push("/volunteers-form/driving-license-choice")
                }
              >
                Continue
              </button>
            </div>
          </div>

          <ProgressBar progress={45} width="w-full max-w-[320px] mx-auto" />
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
