import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { FlagIcon } from "react-flag-kit";
import { FiGlobe, FiSearch } from "react-icons/fi";

export default function CheckboxLocationMultiSelectCombobox({
  options,
  selectedOption,
  onSelect,
  className,
  panelWidth
}) {
  const [query, setQuery] = useState("");

  const filteredCountry =
    query === ""
      ? options
      : options.filter((country) =>
          country?.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full">
      <Combobox
        multiple
        value={selectedOption}
        onChange={onSelect}
      >
        <div className="relative">
          <Combobox.Button className="relative w-full h-11 bg-white flex justify-between items-center gap-2 cursor-default rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 focus:border-primary-300 outline-none shadow-xs text-gray-900 text-md-regular">
            <div className="w-full flex items-center gap-2">
              <FiGlobe className="w-5 h-5 text-gray-900" />
              <h3 className={`text-gray-700 ${className}`}>Location</h3>
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
          </Combobox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className={`text-md-regular absolute right-0 max-h-60 custom-height-mq:h-48 z-10 overflow-auto mt-1 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none ${panelWidth}`}>
            <div className="relative w-full flex items-center gap-2 px-4 py-2.5 border-b border-gray-100">
                <FiSearch className="w-4 h-4 text-gray-200" />
                <Combobox.Input
                  placeholder="Search status"
                  className={`w-full flex items-center text-left text-sm-medium text-gray-900 focus:border-none focus:ring-0 truncate outline-none border-none placeholder:text-sm-medium p-0 placeholder:text-gray-200 ${className}`}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              {filteredCountry.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCountry.map((country) => (
                  <Combobox.Option
                    key={country?.name}
                    className={({ active }) =>
                      `relative cursor-default select-none px-3.5 py-2.5 text-md-regular text-gray-900 ${
                        active ? "bg-gray-50" : "bg-white"
                      }`
                    }
                    value={country}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex justify-between items-center gap-2">
                          <div className="w-full flex items-center gap-3">
                            <input
                              name={`${country?.name}`}
                              type="checkbox"
                              value={country?.name}
                              checked={selected}
                              className="h-4 w-4 border border-gray-300 text-primary-600 rounded-[4px] checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none"
                            />
                            <label
                              htmlFor={`${country?.name}`}
                              className={`text-sm-medium text-gray-700 capitalize break-all ${className}`}
                            >
                              {country?.name}
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
