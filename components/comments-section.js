import React from "react";
import { FiMoreVertical } from "react-icons/fi";

function CommentsSection() {
  return (
    <div className="bg-white space-y-4 pb-6 border border-gray-200 rounded-2xl">
      {/* Dropdown Menu */}
      <div className="flex justify-between gap-4 px-5 py-5 border border-gray-200 rounded-t-2xl">
        <h6>Recent activities</h6>
        <FiMoreVertical className="w-6 h-6 text-gray-500" />
      </div>
      {/* Comment Section */}
      <div className="flex gap-6 px-6 pt-3 divide-y divide-gray-200">
        {/* 1st comment */}
        <div className="flex gap-4">
          <Image
            src="/images/avatar1.png"
            alt={avatar.alt}
            className="w-10 h-10 rounded-full bg-gray-100 shadow-green"
            width={40}
            height={40}
          />
          <div className="space-y-2">
            <div className="flex justify-between gap-2.5">
              <div>
                <h3 className="text-md-semibold text-gray-800">Pavel Novak</h3>
                <h4 className="text-sm-medium text-gray-800">
                  International Trade Expo
                </h4>
              </div>
              <h6 className="text-sm-regular text-gray-600">Just now</h6>
            </div>
            <h5 className="text-sm-regular text-gray-800">
              Added a shift on 24/04/2023
            </h5>
          </div>
        </div>
        {/* 2nd comment */}
        <div className="flex gap-4">
          <Image
            src="/images/avatar2.png"
            alt="avatar2"
            className="w-10 h-10 rounded-full bg-gray-100 shadow-blue"
            width={40}
            height={40}
          />
          <div className="space-y-2">
            <div className="flex justify-between gap-2.5">
              <div>
                <h3 className="text-md-semibold text-gray-800">Anita Cruz</h3>
                <h4 className="text-sm-medium text-gray-800">
                  Summer Music Festival
                </h4>
              </div>
              <h6 className="text-sm-regular text-gray-600">Today 16:23</h6>
            </div>
            <h5 className="text-sm-regular text-gray-800">
              Sent you a message
            </h5>
            {/* Message */}
            <div className="bg-gray-50 flex p-2 border border-gray-200 rounded-tr-lg rounded-b-lg">
              <p className="text-sm-regular text-gray-800">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
              <button className="text-sm-regular text-gray-600 flex self-end">
                See more
              </button>
            </div>
          </div>
        </div>
        {/* 3rd comment */}
        <div className="flex gap-4">
          <Image
            src="/images/avatar3.png"
            alt="avatar3"
            className="w-10 h-10 rounded-full bg-gray-100 shadow-pink"
            width={40}
            height={40}
          />
          <div className="space-y-2">
            <div className="flex justify-between gap-2.5">
              <div>
                <h3 className="text-md-semibold text-gray-800">Lana Steiner</h3>
                <h4 className="text-sm-medium text-gray-800">
                  College Career Fair
                </h4>
              </div>
              <h6 className="text-sm-regular text-gray-600">Today 15:08</h6>
            </div>
            <h5 className="text-sm-regular text-gray-800">
              Sent you a message
            </h5>
            {/* File */}
            <div className="bg-white flex gap-4">
              <svg
                width="37"
                height="37"
                viewBox="0 0 37 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2.5"
                  y="2.5"
                  width="32"
                  height="32"
                  rx="16"
                  fill="#FFF4D3"
                />
                <path
                  d="M19.1665 11.833H14.4998C14.1462 11.833 13.8071 11.9735 13.557 12.2235C13.307 12.4736 13.1665 12.8127 13.1665 13.1663V23.833C13.1665 24.1866 13.307 24.5258 13.557 24.7758C13.8071 25.0259 14.1462 25.1663 14.4998 25.1663H22.4998C22.8535 25.1663 23.1926 25.0259 23.4426 24.7758C23.6927 24.5258 23.8332 24.1866 23.8332 23.833V16.4997M19.1665 11.833L23.8332 16.4997M19.1665 11.833V16.4997H23.8332"
                  stroke="#FF7F03"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <rect
                  x="2.5"
                  y="2.5"
                  width="32"
                  height="32"
                  rx="16"
                  stroke="#FFFAEC"
                  stroke-width="4"
                />
              </svg>

              <div>
                <h6 className="text-sm-medium text-gray-700">
                  Non disclosure agreement.pdf
                </h6>
                <h6 className="text-sm-regular text-gray-500">16 MB</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsSection;
