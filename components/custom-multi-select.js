import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

export default function CustomMultiSelect({
  multiOptions,
  selectedMultiOptions,
  onSelect,
  onDelete,
}) {
  return (
    <div className="w-full">
      <Listbox
        value={selectedMultiOptions}
        onChange={onSelect}
        multiple
        className="bg-white"
      >
        <div className="relative">
          <Listbox.Button className="relative flex items-center w-full min-h-[44px] overflow-auto cursor-default rounded-lg border border-gray-300 px-3.5 py-2 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs text-gray-900 text-base-regular optional:disabled:text-gray-600">
            <div className="flex items-center gap-2 flex-wrap">
              {selectedMultiOptions?.map((badge, badgeIndex) => (
                <div
                  key={`badge${badgeIndex + 1}`}
                  className="h-7 text-sm-medium text-gray-900 flex justify-center items-center gap-1 bg-gray-100 pl-2.5 pr-2 py-[2px] rounded-2xl whitespace-nowrap mix-blend-multiply"
                >
                  <h3 className="text-base-regular text-gray-900 text-center">
                    {badge?.value}
                  </h3>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(badgeIndex);
                    }}
                    className="cursor-pointer"
                  >
                    <path
                      d="M9 3L3 9M3 3L9 9"
                      stroke="#231F20"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
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
            <Listbox.Options className="text-base-regular absolute max-h-60 w-full z-10 overflow-auto mt-1 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none">
              {multiOptions?.map((badge, badgeIndex) => (
                <Listbox.Option
                  key={`badge${badgeIndex + 1}`}
                  className={({ active }) =>
                    `relative cursor-default select-none px-3.5 py-2.5 text-gray-900 ${
                      active ? "bg-gray-50" : "bg-white"
                    }`
                  }
                  value={badge}
                >
                  {({ selected }) => (
                    <>
                      <h3 className="text-base-regular text-gray-900">
                        {badge?.value}
                      </h3>
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
