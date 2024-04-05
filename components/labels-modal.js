import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const initialTags = ["In progress", "Design", "Web"]

export default function LabelsModal() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[400px] transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <svg
                      width="56"
                      height="57"
                      viewBox="0 0 56 57"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="4"
                        y="4.09326"
                        width="48"
                        height="48"
                        rx="24"
                        fill="#FFF4D3"
                      />
                      <path
                        d="M23.5 23.5933H23.51M37.09 30.0033L29.92 37.1733C29.7343 37.3592 29.5137 37.5067 29.2709 37.6074C29.0281 37.708 28.7678 37.7598 28.505 37.7598C28.2422 37.7598 27.9819 37.708 27.7391 37.6074C27.4963 37.5067 27.2757 37.3592 27.09 37.1733L18.5 28.5933V18.5933H28.5L37.09 27.1833C37.4625 27.558 37.6716 28.0649 37.6716 28.5933C37.6716 29.1216 37.4625 29.6285 37.09 30.0033Z"
                        stroke="#FF7F03"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="4"
                        y="4.09326"
                        width="48"
                        height="48"
                        rx="24"
                        stroke="#FFFAEC"
                        stroke-width="8"
                      />
                    </svg>

                    <div className="space-y-2">
                      <Dialog.Title
                        as="h3"
                        className="text-lg-semibold text-gray-900"
                      >
                        Add labels to project
                      </Dialog.Title>
                      <Dialog.Description
                        as="p"
                        className="text-sm-regular text-gray-500"
                      >
                        Labels help organize projects.
                      </Dialog.Description>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full h-11 flex items-center gap-2 rounded-lg px-3.5 py-2.5 border border-gray-300 shadow-xs">
                      <FiSearch className="w-5 h-5 text-gray-500" />
                      <input
                        placeholder={`Search for label`}
                        className={`w-full h-full flex items-center text-left text-md-medium text-gray-900 focus:border-none focus:ring-0 truncate outline-none placeholder:text-md-regular p-0 placeholder:text-gray-500`}
                      />
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2">
                      {initialTags.map((tag, badgeIndex) => (
                          <div
                            key={`badge${badgeIndex + 1}`}
                            className={`text-sm-medium ${
                              tag.toLowerCase() == "in progress" ? "bg-info-50 text-info-700" : 
                              tag.toLowerCase() == "design" ? "bg-[#EEF4FF] text-[#3538CD]" : 
                              tag.toLowerCase() == "web" ? "bg-[#FDF2FA] text-[#C11574]" : null
                            } text-center inline-flex items-center justify-center gap-2 bg-gray-100 pl-2.5 pr-2 py-[2px] rounded-2xl whitespace-nowrap`}
                          >
                            <span>{tag}</span>
                            <FiX className={`w-3 h-3 ${
                              tag.toLowerCase() == "in progress" ? "text-info-500" : 
                              tag.toLowerCase() == "design" ? "text-[#6172F3]" : 
                              tag.toLowerCase() == "web" ? "text-[#EE46BC]" : null
                            }`} />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-between gap-3">
                    <button
                      className="h-11 text-md-semibold flex items-center justify-center flex-1 border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 outline-none shadow-xs"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button className="h-11 text-md-semibold flex items-center justify-center flex-1 border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 outline-none shadow-xs">
                      Add labels
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
