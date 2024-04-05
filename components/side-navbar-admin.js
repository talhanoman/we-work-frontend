import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FiBarChart2,
  FiClipboard,
  FiAperture,
  FiFileText,
  FiCreditCard,
  FiMessageCircle,
  FiSettings,
  FiHeadphones,
  FiLogOut,
  FiArrowLeft,
  FiArrowRight,
  FiSearch,
  FiUsers,
  FiBarChart,
} from "react-icons/fi";

const navbar_primary_options = [
  {
    title: "Dashboard",
    href: "",
    icon: FiBarChart2,
  },
  {
    title: "Job board",
    href: "",
    icon: FiClipboard,
  },
  {
    title: "Candidates",
    href: "",
    icon: FiUsers,
  },
  {
    title: "Projects",
    href: "",
    icon: FiAperture,
  },
  {
    title: "Analytics",
    href: "",
    icon: FiBarChart,
  },
  {
    title: "Documents",
    href: "",
    icon: FiFileText,
  },
  {
    title: "Account",
    href: "",
    icon: FiCreditCard,
  },
];

const navbar_secondary_options = [
  {
    title: "Inbox",
    href: "",
    icon: FiMessageCircle,
  },
  {
    title: "Settings",
    href: "",
    icon: FiSettings,
  },
  {
    title: "Support",
    href: "",
    icon: FiHeadphones,
  },
];

function SideNavbarAdmin({ profilePage, jobPage, settings, projectPage }) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`relative ${
        open ? "w-[280px] lg:w-[22%] 2xl:w-[25%]" : "w-[89px]"
      } duration-300 h-screen bg-gray-900 px-4 py-8 flex flex-col justify-between`}
    >
      {/* Toggle Navbar button */}
      <button
        className="w-9 h-9 absolute z-30 top-[30px] -right-[18px] p-2 bg-gray-800 flex items-center justify-center rounded-full"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <FiArrowLeft className="w-5 h-5 text-gray-200" />
        ) : (
          <FiArrowRight className="w-5 h-5 text-gray-200" />
        )}
      </button>
      {/* Start to Middle Section */}
      <div className="flex flex-col w-full">
        <div className="space-y-5 2xl:space-y-6 mb-4 2xl:mb-6 sticky inset-0">
          {/* Logo */}
          {open ? (
            <div className="w-full flex justify-center relative h-auto 2xl:h-12 min-h-[41px]">
              <Image
                src="/images/side-navbar-logo.svg"
                alt="Crowd Tonic Logo"
                className="object-contain"
                layout="fill"
                priority
              />
            </div>
          ) : (
            <svg
              width="36"
              height="48"
              viewBox="0 0 36 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <path
                opacity="0.8"
                d="M20.5333 31.3333C28.6335 31.3333 35.2 24.7668 35.2 16.6667C35.2 8.56649 28.6335 2 20.5333 2H0V31.3333H20.5333Z"
                fill="white"
              />
              <path
                opacity="0.6"
                d="M0 2L35.2 46H11.7333L0 31.3333V2Z"
                fill="white"
              />
              <path
                d="M23.2637 31.0796C22.379 31.2462 21.4664 31.3333 20.5333 31.3333H0V2L23.2637 31.0796Z"
                fill="white"
              />
            </svg>
          )}
          {/* Search Bar */}
          <div className={`${open && "mx-2"} flex items-center`}>
            <input
              type="search"
              name="search"
              placeholder={"Search"}
              className={`w-full ${
                open ? "block" : "hidden"
              } duration-100 text-xs-regular 2xl:text-lg-regular text-white bg-gray-700 h-11 rounded-lg px-3.5 py-2.5 box-border border border-gray-700 focus:ring-1 focus:ring-white outline-none shadow-sm placeholder:text-white`}
            />
            {!open && (
              <button className="flex flex-1 items-center justify-center bg-gray-700 h-11 rounded-lg px-3.5 py-2.5 box-border border border-gray-700 focus:ring-1 focus:ring-white outline-none shadow-sm">
                <FiSearch className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>
        {/* Navbar primary Options */}
        <div className="w-full flex flex-col gap-1">
          <Link
            href="/admin-dashboard"
            className={`text-gray-100 text-xs-medium 2xl:text-lg-medium bg-gray-900 rounded-md px-3 py-2 flex items-center gap-3`}
          >
            <FiBarChart2
              className={`${
                open ? "text-xs-regular 2xl:text-lg-regular" : "w-5 h-5 mx-auto"
              } text-gray-300`}
            />
            <span className={`${open ? "block" : "hidden"}`}>Dashboard</span>
          </Link>

          <Link
            href="/admin-job-board"
            className={`text-gray-100 text-xs-medium 2xl:text-lg-medium ${
              profilePage ? "bg-gray-700" : "bg-gray-900"
            } rounded-md px-3 py-2 flex items-center gap-3`}
          >
            <FiClipboard
              className={`${
                open ? "text-xs-regular 2xl:text-lg-regular" : "w-5 h-5 mx-auto"
              } text-gray-300`}
            />
            <span className={`${open ? "block" : "hidden"}`}>Job board</span>
          </Link>

          <Link
            href="/admin-candidates"
            className={`text-gray-100 text-xs-medium 2xl:text-lg-medium ${
              jobPage ? "bg-gray-700" : "bg-gray-900"
            } rounded-md px-3 py-2 flex items-center gap-3`}
          >
            <FiUsers
              className={`${
                open ? "text-xs-regular 2xl:text-lg-regular" : "w-5 h-5 mx-auto"
              } text-gray-300`}
            />
            <span className={`${open ? "block" : "hidden"}`}>Candidates</span>
          </Link>

          <Link
            href="/admin-projects"
            className={`text-gray-100 text-xs-medium 2xl:text-lg-medium ${
              projectPage ? "bg-gray-700" : "bg-gray-900"
            } rounded-md px-3 py-2 flex items-center gap-3`}
          >
            <FiAperture
              className={`${
                open ? "text-xs-regular 2xl:text-lg-regular" : "w-5 h-5 mx-auto"
              } text-gray-300`}
            />
            <span className={`${open ? "block" : "hidden"}`}>Projects</span>
          </Link>

          <Link
            href="/admin-analytics"
            className="text-gray-100 text-xs-medium 2xl:text-lg-medium bg-gray-900 rounded-md px-3 py-2 flex items-center gap-3"
          >
            <FiBarChart
              className={`${
                open ? "text-xs-regular 2xl:text-lg-regular" : "w-5 h-5 mx-auto"
              } text-gray-300`}
            />
            <span className={`${open ? "block" : "hidden"}`}>Analytics</span>
          </Link>

          <Link
            href="/admin-documents"
            className="text-gray-100 text-xs-medium 2xl:text-lg-medium bg-gray-900 rounded-md px-3 py-2 flex items-center gap-3 custom-height-mq:hidden"
          >
            <FiFileText
              className={`${
                open ? "text-xs-regular 2xl:text-lg-regular" : "w-5 h-5 mx-auto"
              } text-gray-300`}
            />
            <span className={`${open ? "block" : "hidden"}`}>Documents</span>
          </Link>

          <Link
            href="/admin-account"
            className="text-gray-100 text-xs-medium 2xl:text-lg-medium bg-gray-900 rounded-md px-3 py-2 flex items-center gap-3"
          >
            <FiCreditCard
              className={`${
                open ? "text-xs-regular 2xl:text-lg-regular" : "w-5 h-5 mx-auto"
              } text-gray-300`}
            />
            <span className={`${open ? "block" : "hidden"}`}>Account</span>
          </Link>
        </div>
      </div>

      {/* Middle to Bottom Section */}
      <div className="w-full flex flex-col gap-y-6 sticky inset-0">
        {/* Navbar Secondary Options */}
        <div className="flex flex-col gap-1">
          <a
            href=""
            className="text-gray-100 text-xs-medium 2xl:text-lg-medium bg-gray-900 rounded-md px-3 py-2 flex items-center gap-3"
          >
            <FiMessageCircle
              className={`${
                open ? "text-xs-regular 2xl:text-lg-regular" : "w-5 h-5 mx-auto"
              } text-gray-300`}
            />
            <span className={`${open ? "block" : "hidden"}`}>Inbox</span>
          </a>

          <Link
            href="/settings"
            className={`text-gray-100 text-xs-medium 2xl:text-lg-medium ${
              settings ? "bg-gray-700" : "bg-gray-900"
            } rounded-md px-3 py-2 flex items-center gap-3`}
          >
            <FiSettings
              className={`${
                open ? "text-xs-regular 2xl:text-lg-regular" : "w-5 h-5 mx-auto"
              } text-gray-300`}
            />
            <span className={`${open ? "block" : "hidden"}`}>Settings</span>
          </Link>

          <Link
            href=""
            className={`text-gray-100 text-xs-medium 2xl:text-lg-medium ${"bg-gray-900"} rounded-md px-3 py-2 flex items-center gap-3`}
          >
            <FiHeadphones
              className={`${
                open ? "text-xs-regular 2xl:text-lg-regular" : "w-5 h-5 mx-auto"
              } text-gray-300`}
            />
            <span className={`${open ? "block" : "hidden"}`}>Support</span>
          </Link>
        </div>
        
        {/* Separator line */}
        <hr className="bg-gray-600 h-[1px] w-full" />
        {/* User Details */}
        <div
          className={`w-full flex items-center ${
            !open && "justify-center"
          } gap-3`}
        >
          <Image
            src="/images/profile-avatar.png"
            alt="Profile avatar"
            className="w-10 h-10 rounded-full bg-gray-100"
            width={40}
            height={40}
          />
          <div
            className={`${
              open ? "block" : "hidden scale-0"
            } duration-200 w-full`}
          >
            <div className="flex items-center justify-between">
              <h6 className="text-xs-semibold 2xl:text-lg-semibold text-white">
                Amanda Smith
              </h6>
              <Link href="/login">
                <FiLogOut className="text-sm-regular 2xl:text-lg-regular text-gray-400 cursor-pointer" />
              </Link>
            </div>
            <p className="text-xs-regular 2xl:text-lg-regular text-gray-100 break-all">
              amanda.smith@email.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavbarAdmin;
