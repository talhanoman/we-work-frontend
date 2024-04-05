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
    role: "Admin"
  },
  {
    name: "Demi Wilkinson",
    email: "demi@untitledui.com",
    avatar_img: "avatar2.png",
    role: "Admin"
  },
  {
    name: "Drew Cano",
    email: "drew@untitledui.com",
    avatar_img: "avatar3.png",
    role: "Editor"
  },
];


export default function SharePeopleModal() {
  let [isOpen, setIsOpen] = useState(true);
  const [selectWithIcon, setSelectedWithIcon] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSelectWithIcon = (option) => {
    setSelectedWithIcon(option);
  };

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
                    {/* Avatars */}
                    <div className="flex justify-center items-end -space-x-4">
                    <Image
                              src={`/images/avatar1.png`}
                              alt="avatar1"
                              className="w-12 h-12 rounded-full bg-gray-100"
                              width={48}
                              height={48}
                            />
                    <Image
                              src={`/images/avatar3.png`}
                              alt="avatar3"
                              className="w-14 h-14 rounded-full bg-gray-100 relative z-10"
                              width={56}
                              height={56}
                            />
                    <Image
                              src={`/images/avatar2.png`}
                              alt="avatar2"
                              className="w-12 h-12 rounded-full bg-gray-100"
                              width={48}
                              height={48}
                            />
                    </div>

                    <div className="space-y-2">
                      <Dialog.Title
                        as="h3"
                        className="text-lg-semibold text-gray-900 text-center"
                      >
                        Add your team members
                      </Dialog.Title>
                      <Dialog.Description
                        as="p"
                        className="text-sm-regular text-gray-500 text-center"
                      >
                        You’ve created a new project! Invite colleagues to
                        collaborate on this project.
                      </Dialog.Description>
                    </div>

                    {/* People Data */}
                    <div className="space-y-3">
                      {peopleData.map((people, index) => (
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-3">
                            <input
                              name="member_select"
                              type="checkbox"
                              className="h-4 w-4 bg-50 border border-gray-300 text-primary-600 rounded-[4px] checked:border-0 focus:ring-1 focus:ring-primary-600 outline-none"
                            />
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
                          <h6 className="text-xs-medium text-gray-500">
                            {people.role}
                          </h6>
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
                      Add to project
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
