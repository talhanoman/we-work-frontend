import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { FlagIcon } from "react-flag-kit";
import { FiGlobe } from "react-icons/fi";

function FlagCombobox({
    options,
    selectedOption,
    onSelect,
    className,
    disabled
}) {
    const [query, setQuery] = useState("");

    const filteredCountry =
        query === ""
            ? options
            : options.filter((country) =>
                country?.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .startsWith(query.toLowerCase().replace(/\s+/g, ""))
            );
    return (
        <div className="w-full flex-1">
            <Combobox
                value={selectedOption}
                onChange={onSelect}
                className="bg-white rounded-lg"
                disabled={disabled}
            >
                <div className="relative">
                    <Combobox.Button className="w-full min-w-[77px] relative h-11 flex justify-between items-center cursor-default rounded-tl-lg rounded-bl-lg border border-gray-300 pl-3.5 pr-2.5 py-2.5 focus:ring-1 focus:ring-white outline-none shadow-xs text-gray-900 text-md-regular disabled:opacity-50">
                        <div className="flex items-center flex-1">
                            {selectedOption && !disabled ? (
                                <FlagIcon
                                    code={selectedOption.toUpperCase()}
                                    className="w-5 h-5 object-fill object-center rounded-full"
                                />
                            ) : (
                                <FiGlobe className="w-5 h-5 rounded-full text-gray-500 bg-slate-100" />
                            )}
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
                        <Combobox.Options className="text-md-regular absolute max-h-60 custom-height-mq:h-48 w-[250px] z-10 overflow-auto mt-1 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none">
                            <Combobox.Input
                                className={`w-full flex items-center text-left text-md-regular text-gray-900 focus:border-none focus:ring-0 truncate outline-none border-none placeholder:text-gray-500 py-2 px-4 ${className}`}
                                placeholder="Select country"
                                displayValue={(selectedOption) => selectedOption?.value}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            {
                                filteredCountry.map((country) => (
                                    <Combobox.Option
                                        key={country?.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none px-3.5 py-2.5 text-md-regular text-gray-900 ${active ? "bg-gray-50" : "bg-white"
                                            }`
                                        }
                                        value={country}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex justify-between items-center gap-2">
                                                    <div className="w-full flex items-center gap-2">
                                                        <FlagIcon
                                                            code={country?.flagCode}
                                                            className="w-5 h-5 rounded-full object-fill object-center bg-slate-500"
                                                        />
                                                        <h3 className={`text-md-regular text-gray-900 break-all ${className}`}>
                                                            {country?.name === 'Viet Nam' ? 'Vietnam' : country.name}
                                                        </h3>
                                                    </div>
                                                    {selected ? (
                                                        <span className={`flex items-center text-primary-600 ${active ? 'text-white' : 'text-primary-600'}`}>
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
                                    </Combobox.Option>
                                ))
                            }
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}

FlagCombobox.defaultProps = {
    disabled: false
}

export default FlagCombobox