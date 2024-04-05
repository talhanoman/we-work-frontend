import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { getList } from 'country-list-with-dial-code-and-flag'
import { FlagIcon } from "react-flag-kit";

export default function ComboBox() {
  const countryListWithDialCodeAndFlag = getList();

  const [selected, setSelected] = useState(countryListWithDialCodeAndFlag[0])
  const [query, setQuery] = useState('')

  const filteredCountry =
    query === ''
      ? countryListWithDialCodeAndFlag
      : countryListWithDialCodeAndFlag.filter((country) =>
          country?.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="fixed left-1/3 top-16 w-72">
      <Combobox value={selected} onChange={setSelected} className="bg-white">
        <div className="relative">
          <div className="relative w-full h-11 cursor-default overflow-hidden rounded-lg bg-white border border-gray-300 text-left focus:ring-1 focus:ring-primary-600 outline-none shadow-xs text-gray-900 text-md-regular  placeholder:text-gray-600">
          <div className="flex items-center gap-2 px-3">
              {selected?.code ? (
                <FlagIcon
                  code={selected?.code}
                  className="w-5 h-5 rounded-full bg-slate-500"
                />
              ) : (
                <FiMapPin className="w-5 h-5 rounded-full text-gray-900 bg-slate-100" />
              )}
              <Combobox.Input
              className="block w-full border-none py-2.5 text-md-regular text-gray-500 focus:ring-0"  
              displayValue={(selected) => selected?.name}
              onChange={(event) => {
                const position = selected.length;
                event.target.setSelectionRange(position, position);
                setQuery(event.target.value)
              }}
            />
            </div>
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3.5">
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
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="text-md-regular  absolute max-h-60 w-full overflow-auto mt-1 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none">
              {filteredCountry.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCountry.map((country) => (
                  <Combobox.Option
                    key={country?.id}
                    className={({ active }) =>
                      `relative cursor-default select-none px-3.5 py-2.5 text-gray-900 ${
                        active ? "bg-gray-50" : "bg-white"
                      }`
                    }
                    value={country}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className="block truncate"
                        >
                          {country?.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                              active ? 'text-white' : 'text-primary-600'
                            }`}
                          >
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
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
