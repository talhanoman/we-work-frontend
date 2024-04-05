import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiMoreVertical } from "react-icons/fi";

export default function MoreMenu({ id, options, onClick, panelPosition }) {
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex w-full focus:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-opacity-75">
              <FiMoreVertical
                className={`w-4 2xl:w-5 h-auto ${
                  open ? "text-gray-700" : "text-gray-400"
                } hover:text-gray-700`}
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className={`absolute right-0 ${panelPosition && "bottom-8"} mt-2 w-[240px] origin-top-right rounded-lg bg-white border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 focus:outline-none z-10`}>
              <div className="flex flex-col px-1 py-1">
                {options.map((option, index) => (
                  <Menu.Item key={index}>
                    {({ active, close }) => (
                      <button
                        className={`block ${
                          active
                            ? "bg-primary-100 font-semibold"
                            : "text-gray-700"
                        } w-full group inline-flex gap-x-3 items-center rounded-lg px-4 py-2.5 text-xs-medium 2xl:text-sm-medium`}
                        onClick={(e) => {
                          e.preventDefault();
                          close();
                          onClick({option: option.title, id: id});
                        }}
                      >
                        <span
                          className={`${
                            option.title == "Delete"
                              ? "text-error-500"
                              : "text-gray-700"
                          }`}
                        >
                          {option.icon}
                        </span>
                        <span
                          className={`${
                            option.title == "Delete"
                              ? "text-error-500"
                              : "text-gray-700"
                          }`}
                        >
                          {option.title}
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
