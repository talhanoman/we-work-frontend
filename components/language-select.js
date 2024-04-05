import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FlagIcon } from "react-flag-kit";

export default function LanguageSelect({ options, selectedOption, onSelect }) {
  return (
    <div className="w-full">
      <Listbox
        value={selectedOption}
        onChange={onSelect}
        className="bg-white w-full"
      >
        <div className="relative">
          <Listbox.Button className="relative w-full h-11 flex justify-between items-center cursor-default rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs text-gray-900 text-sm-regular 2xl:text-md-regular">
            <div className="flex items-center gap-2">
              {selectedOption?.code ? (
                <FlagIcon
                  code={selectedOption?.code}
                  className="w-4 h-4 2xl:w-5 2xl:h-5 rounded-full bg-slate-500"
                />
              ) : (
                // <FiMapPin className="w-5 h-5 rounded-full text-gray-900 bg-slate-100" />
                ""
              )
              }
              <h3 className="text-left text-sm-regular 2xl:text-md-regular text-gray-900 truncate">
              {selectedOption?.language ?? "Select Language"}
              </h3>
            </div>
            <span className="pointer-events-none flex items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="#979798"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="text-sm-regular 2xl:text-md-regular text-gray-900 absolute max-h-60 w-full z-10 overflow-auto mt-1 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none">
              {options?.map((other_lang) => (
                <Listbox.Option
                  key={other_lang?.code}
                  className={({ active }) =>
                    `relative cursor-default select-none px-3.5 py-2.5 text-gray-900 ${
                      active ? "bg-gray-50" : "bg-white"
                    }`
                  }
                  value={other_lang}
                >
                  {({ selected }) => (
                    <>
                    <div className="flex justify-between items-center gap-2">
                      <div className="w-full flex items-center gap-2">
                        <FlagIcon
                          code={other_lang?.code}
                          className="w-4 h-4 2xl:w-5 2xl:h-5 rounded-full bg-slate-500"
                        />
                        <h3 className="text-sm-regular 2xl:text-md-regular text-gray-900 break-all">
                          {other_lang?.language}
                        </h3>
                      </div>
                      {selected ? (
                        <span className="flex items-center text-primary-600">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.6668 5L7.50016 14.1667L3.3335 10"
                              stroke="#FF7F03"
                              stroke-width="1.66667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
