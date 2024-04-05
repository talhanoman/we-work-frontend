import React from "react";
import Logo from "./logo";

const text_and_supporting_text_data = [
  {
    title: "Let's get started!",
    subtitle: "One small thing before we move forward!",
  },
  {
    title: "Contact Information",
    subtitle: "Let us know how to reach you so we can stay in touch!",
  },
  {
    title: "Personal Information",
    subtitle: "Fill in your profile and be one of our top applicants. ",
  },
  {
    title: "Verification",
    subtitle: "Help us ensure a safe and secure environment.",
  },
  { title: "You’re all set!", subtitle: "Thank you for completing the form." },
];

function ProgressCardProfessionals({ progress }) {
  return (
    <div className="flex flex-col h-full justify-center items-center px-4 py-5">
      <div className="flex items-start gap-4">
        {/* Progress Steps */}
        <div className="flex flex-col gap-y-2 justify-center items-center">
          {[...Array(5)].map((_, index) => (
            <div
              key={`progress${index + 1}`}
              className="flex flex-col gap-y-2 justify-center items-center"
            >
              {index < progress - 1 ? (
                <>
                  <div className="w-7 h-7 bg-primary-100 rounded-full flex justify-center items-center">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.9459 0.62169L4.59259 8.68336L2.37592 6.31502C1.96759 5.93002 1.32592 5.90669 0.859254 6.23336C0.404254 6.57169 0.275921 7.16669 0.55592 7.64502L3.18092 11.915C3.43759 12.3117 3.88092 12.5567 4.38259 12.5567C4.86092 12.5567 5.31592 12.3117 5.57259 11.915C5.99259 11.3667 14.0076 1.81169 14.0076 1.81169C15.0576 0.738356 13.7859 -0.206643 12.9459 0.610023V0.62169Z"
                        fill="#2F68D6"
                      />
                    </svg>
                  </div>
                  {index == 4 ? null : (
                    <div className="border-l-[1px] border-gray-500 h-10" />
                  )}
                </>
              ) : index == progress - 1 ? (
                <>
                  <div className="w-7 h-7 bg-primary-100 rounded-full flex justify-center items-center">
                    <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />
                  </div>
                  {index == 4 ? null : (
                    <div className="border-l-[1px] border-gray-500 h-10" />
                  )}
                </>
              ) : index >= progress ? (
                <>
                  <div className="w-7 h-7 border border-gray-500 rounded-full flex justify-center items-center">
                    <div className="w-2.5 h-2.5 bg-gray-100 rounded-full" />
                  </div>
                  {index == 4 ? null : (
                    <div className="border-l-[1px] border-gray-500 h-10" />
                  )}
                </>
              ) : null}
            </div>
          ))}
        </div>

        {/* Text and Supporting Text Section */}
        <div className="w-full max-w-[240px] flex flex-col justify-between gap-y-[26px] 2xl:gap-y-[20px]">
          {text_and_supporting_text_data.map((text, index) => (
            <div key={index} className="w-full">
              <h3 className="text-xs-medium 2xl:text-sm-medium text-gray-100">{text?.title}</h3>
              <p className="text-xs-regular 2xl:text-sm-regular text-gray-300 mt-1">
                {text?.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgressCardProfessionals;
