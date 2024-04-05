import SelectWithIcon from "@/components/select-with-icon";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const peopleData = [
  {
    name: "Phoenix Baker",
    email: "phoenix@email.com",
    avatar_img: "avatar1.png",
  },
  {
    name: "Demi Wilkinson",
    email: "demi@untitledui.com",
    avatar_img: "avatar2.png",
  },
  {
    name: "Drew Cano",
    email: "drew@untitledui.com",
    avatar_img: "avatar3.png",
  },
];

const teamMemberOptions = [
  {name: "Zubair"},
  {name: "Talha"},
  {name: "Hassan"},
]

export default function SharePeopleModal() {
  let [isOpen, setIsOpen] = useState(true);
  const [selectWithIcon, setSelectedWithIcon] = useState([])

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSelectWithIcon = (option) => {
    setSelectedWithIcon(option);
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
                  <div className="space-y-5">
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
                        d="M32 37.0933V35.0933C32 34.0324 31.5786 33.015 30.8284 32.2648C30.0783 31.5147 29.0609 31.0933 28 31.0933H21C19.9391 31.0933 18.9217 31.5147 18.1716 32.2648C17.4214 33.015 17 34.0324 17 35.0933V37.0933M36 24.0933V30.0933M39 27.0933H33M28.5 23.0933C28.5 25.3024 26.7091 27.0933 24.5 27.0933C22.2909 27.0933 20.5 25.3024 20.5 23.0933C20.5 20.8841 22.2909 19.0933 24.5 19.0933C26.7091 19.0933 28.5 20.8841 28.5 23.0933Z"
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
                        Share with people
                      </Dialog.Title>
                      <Dialog.Description
                        as="p"
                        className="text-sm-regular text-gray-500"
                      >
                        The following users have access to this project:
                      </Dialog.Description>
                    </div>

                    {/* People Data */}
                    <div className="space-y-3">
                      {peopleData.map((people, index) => (
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-3">
                            <Image
                              src={`/images/${people.avatar_img}`}
                              alt={people.name}
                              className="w-10 h-10 rounded-full bg-gray-100"
                              width={40}
                              height={40}
                            />
                            <div>
                              <h6 className="text-sm-semibold text-gray-700">
                                {people.name}
                              </h6>
                              <h6 className="text-sm-regular text-gray-500">
                                {people.email}
                              </h6>
                            </div>
                          </div>
                          <button className="text-sm-semibold text-error-700 hover:underline">
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Team Member Select */}
                    <div className="">
                      <label
                        className="text-gray-700 text-sm-medium block mb-1.5"
                        htmlFor="team_member_select"
                      >
                        Team member
                      </label>
                      <SelectWithIcon
                        options={teamMemberOptions}
                        selectedOption={selectWithIcon}
                        onSelect={handleSelectWithIcon}
                      />
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
                      Done
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
