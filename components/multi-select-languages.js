import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FlagIcon } from "react-flag-kit";

const languages_array = [
  { code: 'US', language: "English (US)" },
  { code: 'ES', language: "Español - Spanish" },
  { code: 'PK', language: "Urdu" },
  { code: 'IR', language: "Persian" },
  { code: 'SA', language: "Arabic" },
];

export default function MultiSelectLanguage({languages, selectedLanguages, onSelect}) {

  const lang = selectedLanguages.length < 1 ? languages.slice(0, 1) : selectedLanguages
  
  return (
    <div className="w-full">
      <Listbox value={selectedLanguages} onChange={onSelect} multiple className="bg-white">
        <div className="relative">
          <Listbox.Button className="relative flex items-center w-full min-h-[44px] overflow-auto cursor-default rounded-lg border border-gray-300 px-3.5 py-2 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs text-gray-900 text-md-regular optional:disabled:text-gray-600">
            <div className="flex items-center gap-2 flex-wrap">
              {lang?.map((badge, badgeIndex) => (
                <div key={`badge${badgeIndex + 1}`} className="h-7 text-sm-medium text-gray-900 text-center flex items-center gap-2 bg-gray-100 pl-[2px] pr-2.5 py-[2px] rounded-2xl whitespace-nowrap mix-blend-multiply">
                  <FlagIcon
                code={badge?.code ?? 'US'}
                className="w-5 h-5 rounded-full bg-slate-500"
              />
              <h3 className="text-md-regular text-gray-900 text-center truncate">
                {badge?.language ?? "English (US)"}
              </h3>
                </div>
            ))}
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
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
            <Listbox.Options className="text-md-regular absolute max-h-60 w-full z-10 overflow-auto mt-1 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none">
              {languages?.map((country) => (
                <Listbox.Option
                  key={country?.code}
                  className={({ active }) =>
                    `relative cursor-default select-none px-3.5 py-2.5 text-gray-900 ${
                      active ? "bg-gray-50" : "bg-white"
                    }`
                  }
                  value={country}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center gap-2">
                        <FlagIcon
                          code={country?.code}
                          className="w-5 h-5 rounded-full bg-slate-500"
                        />
                        <h3 className="text-md-regular text-gray-900">
                          {country?.language}
                        </h3>
                      </div>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600">
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
