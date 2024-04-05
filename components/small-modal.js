import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function SmallModal() {
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
              <Dialog.Panel className="w-full max-w-[544px] transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex gap-6">
                  <div className="flex justify-center">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="4"
                        y="4"
                        width="48"
                        height="48"
                        rx="24"
                        fill="#DEF7D0"
                      />
                      <path
                        d="M38 27.0801V28.0001C37.9988 30.1565 37.3005 32.2548 36.0093 33.9819C34.7182 35.7091 32.9033 36.9726 30.8354 37.584C28.7674 38.1954 26.5573 38.122 24.5345 37.3747C22.5117 36.6274 20.7847 35.2462 19.611 33.4372C18.4373 31.6281 17.8798 29.4882 18.0217 27.3364C18.1636 25.1847 18.9972 23.1364 20.3983 21.4972C21.7994 19.8579 23.6928 18.7155 25.7962 18.2403C27.8996 17.765 30.1003 17.9824 32.07 18.8601M38 20.0001L28 30.0101L25 27.0101"
                        stroke="#3F951B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="4"
                        y="4"
                        width="48"
                        height="48"
                        rx="24"
                        stroke="#F0FCE9"
                        stroke-width="8"
                      />
                    </svg>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <Dialog.Title
                        as="h3"
                        className="text-lg-semibold text-gray-900"
                      >
                        Self identification data
                      </Dialog.Title>
                      <Dialog.Description
                        as="p"
                        className="text-sm-regular text-gray-500 space-y-4"
                      >
                        <p>
                          We're committed to creating a welcoming and inclusive
                          workplace. If you feel comfortable, please let us know a
                          little more about yourself.
                        </p>
                        <p>
                          This information will be kept confidential and only used for statistical
                          purposes. It won't impact your job application in any
                          way. 
                        </p>
                        <p>
                          Thanks for helping us build a more diverse and
                          inclusive workplace!
                        </p>
                      </Dialog.Description>
                    </div>

                    <div className="flex justify-between gap-3">
                      <button
                        className="h-11 text-md-semibold flex items-center justify-center flex-1 border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 outline-none shadow-xs"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                      <button className="h-11 text-md-semibold flex items-center justify-center flex-1 border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 outline-none shadow-xs">
                        I agree
                      </button>
                    </div>
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
