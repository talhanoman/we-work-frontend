import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { FlagIcon } from "react-flag-kit";
import { FiBriefcase, FiMapPin, FiSearch } from "react-icons/fi";

export default function CheckboxStatusMultiSelectCombobox({
  options,
  selectedOption,
  onSelect,
  className,
  panelWidth,
}) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState(false);

  const filteredStatus =
    query === ""
      ? options
      : options.filter((status) =>
          status?.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const optionLength = view ? filteredStatus.length : 5;

  return (
    <div className="w-full">
      <Combobox
        multiple
        onChange={onSelect}
      >
        <div className="relative">
          <Combobox.Button className="relative w-full h-11 bg-white flex justify-between items-center gap-2 cursor-default rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 focus:border-primary-300 outline-none shadow-xs text-gray-900 text-md-regular">
            <div className="flex items-center gap-2">
              <FiBriefcase className="w-5 h-5 text-gray-900" />
              <h3 className={`text-gray-700 ${className}`}>Status</h3>
              {selectedOption.length > 0 && (<span className="text-xs-medium text-success-700 flex items-center justify-center rounded-full bg-success-50 py-[1px] px-[7px]">{selectedOption.length}</span>)}
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
            <Combobox.Options
              className={`text-md-regular absolute right-0 max-h-60 custom-height-mq:h-48 z-10 overflow-auto mt-4 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none ${panelWidth}`}
            >
              <div className="relative w-full flex items-center gap-2 px-4 py-2.5 border-b border-gray-100">
                <FiSearch className="w-4 h-4 text-gray-200" />
                <Combobox.Input
                  placeholder="Search status"
                  className={`w-full flex items-center text-left text-sm-medium text-gray-900 focus:border-none focus:ring-0 truncate outline-none border-none placeholder:text-sm-medium p-0 placeholder:text-gray-200 ${className}`}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              {filteredStatus.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredStatus.slice(0, optionLength).map((status) => (
                  <Combobox.Option
                    key={status?.id}
                    className={({ active }) =>
                      `relative cursor-default select-none px-3.5 py-2.5 text-md-regular text-gray-900 ${
                        active ? "bg-gray-50" : "bg-white"
                      }`
                    }
                    value={status}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="w-full flex items-center gap-3">
                          <input
                            name={`${status?.name}`}
                            type="checkbox"
                            value={status?.name}
                            checked={selected}
                            className="h-4 w-4 border border-gray-300 rounded-[4px] checked:border-primary-600 checked:bg-primary-100 focus:bg-primary-100 focus:ring-1 focus:ring-primary-600 outline-none"
                          />
                          <label
                            htmlFor={`${status?.name}`}
                            className={`h-[22px] px-2 py-[2px] text-xs-medium rounded-2xl break-all ${
                              status?.name?.toLowerCase() == "applied"
                                ? "bg-gray-100 text-gray-700"
                                : status?.name?.toLowerCase() == "under review"
                                ? "bg-warning-50 text-warning-700"
                                : status?.name?.toLowerCase() == "interview"
                                ? "bg-[#FFF6ED] text-[#C4320A]"
                                : status?.name?.toLowerCase() == "offered"
                                ? "bg-success-50 text-success-700"
                                : status?.name?.toLowerCase() == "hired"
                                ? "bg-[#EFF8FF] text-[#175CD3]"
                                : null
                            } ${className}`}
                          >
                            {status?.name}
                          </label>
                        </div>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
              {!view && <button
                className="w-full text-sm-medium text-gray-700 text-left px-4 py-2.5"
                onClick={(e) => {
                  e.preventDefault()
                  setView(true)
                }}
              >
                View all...
              </button>}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
