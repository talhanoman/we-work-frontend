import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { getList } from "country-list-with-dial-code-and-flag";
import { FlagIcon } from "react-flag-kit";

function PhoneNumberInput({ phoneNumber, onPhoneNumberChange, phoneValid }) {
  // Get the list of countries with dial codes and flags
  const countryListWithDialCodeAndFlag = getList();

  const [selected, setSelected] = useState(countryListWithDialCodeAndFlag[0]);
  //   formats each group with parentheses and dashes and joins them together to form the final formatted phone number
  const formatPhoneNumber = (inputPhoneNumber) => {
    // Remove all non-numeric characters from the input and only give first 10 numbers and excludes all remaining typed numbers
    const numericPhoneNumber = inputPhoneNumber
      .replace(/[^\d]/g, "")
      .slice(0, 10);

    const regex = /^(\d{0,3})(\d{0,3})(\d{0,4})$/; // splits the numeric phone number into three groups of three, two, and four digits
    const match = numericPhoneNumber.match(regex);
    if (!match) {
      return numericPhoneNumber;
    }
    const groups = match.slice(1);
    const formattedGroups = groups.map((group, index) => {
      switch (index) {
        case 0:
          return group ? `(${group}` : "";
        case 1:
          return group ? `) ${group}` : "";
        case 2:
          return group ? ` - ${group}` : "";
        default:
          return group;
      }
    });
    return formattedGroups.join("");
  };

  function handlePhoneNumberChange(inputPhoneNumber, dialCode) {
    // It first checks if the input phone number already contains the dial code, and if so, removes it from the input.
    if (inputPhoneNumber.includes(dialCode.replace("+", ""))) {
      let splitted_value = inputPhoneNumber.split(" ");
      splitted_value.shift();
      inputPhoneNumber = splitted_value.join(" ");
    }

    // Format the phone number with parentheses and dashes
    let formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber);

    // Update the state variable with the formatted phone number and dialcode
    // setPhoneNumber(dialCode + " " + formattedPhoneNumber);
    onPhoneNumberChange(dialCode + " " + formattedPhoneNumber);
  }

  const handleSelect = (event) => {
    setSelected(event); // Here, event is selected country object
    handlePhoneNumberChange("", event.dial_code); // As new dial code selects, it will empty the phone number
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <label htmlFor="country" className="sr-only">
            Country
          </label>
          <Listbox
            value={selected}
            onChange={handleSelect}
            className="bg-transparent"
          >
            <div className="relative">
              <Listbox.Button className="relative w-[73px] h-11 cursor-default rounded-l-lg pl-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none text-gray-900 text-md-regular">
                <FlagIcon
                  code={selected.code}
                  className="w-5 h-5 rounded-full bg-slate-500"
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-2 pr-3">
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
                <Listbox.Options className="text-md-regular absolute max-h-60 w-80 max-w-lg z-10 overflow-auto mt-1 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none">
                  {countryListWithDialCodeAndFlag.map((country) => (
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
                              code={country.code}
                              className="w-5 h-5 rounded-full bg-slate-500"
                            />
                            <h3 className="text-md-regular text-gray-900">
                              {country.name}{" "}
                              <span className="text-gray-500">
                                {country.dial_code}
                              </span>
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
                                  stroke="#2F68D6"
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
        <input
          id="phone_number"
          name="phone_number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          required
          value={phoneNumber}
          onChange={(event) =>
            handlePhoneNumberChange(event.target.value, selected.dial_code)
          }
          autoComplete="tel"
          className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 pl-[74px] pr-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
        />
        {phoneValid && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute ml-2 top-3.5 right-3.5"
          >
            <rect
              x="0.5"
              y="0.5"
              width="15"
              height="15"
              rx="7.5"
              fill="#2F68D6"
            />
            <path
              d="M11.3332 5.5L6.74984 10.0833L4.6665 8"
              stroke="white"
              strokeWidth="1.66667"
              strokeLinecap="round"
              stroke-linejoin="round"
            />
            <rect
              x="0.5"
              y="0.5"
              width="15"
              height="15"
              rx="7.5"
              stroke="#2F68D6"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default PhoneNumberInput;
