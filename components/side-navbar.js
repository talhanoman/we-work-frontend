import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ConfirmLogout from './confirm-logout';
import {
  FiBarChart2,
  FiUser,
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
  FiHome,
  FiUserCheck,
  FiCalendar,
  FiUsers,
} from 'react-icons/fi';

const navbar_primary_options = [
  {
    title: 'Dashboard',
    href: '',
    icon: FiBarChart2,
  },
  {
    title: 'Profile',
    href: '',
    icon: FiUser,
  },
  {
    title: 'Job board',
    href: '',
    icon: FiClipboard,
  },
  {
    title: 'Projects',
    href: '',
    icon: FiAperture,
  },
  {
    title: 'Contracts',
    href: '',
    icon: FiFileText,
  },
  {
    title: 'Account',
    href: '',
    icon: FiCreditCard,
  },
];

const navbar_secondary_options = [
  {
    title: 'Inbox',
    href: '',
    icon: FiMessageCircle,
  },
  {
    title: 'Settings',
    href: '',
    icon: FiSettings,
  },
  {
    title: 'Support',
    href: '',
    icon: FiHeadphones,
  },
];

function SideNavbar({ dashboard, headcount, talent, scheduling, settings }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [open, setOpen] = useState(true);

  // Function to update 'open' state based on screen width
  const updateOpenState = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1024) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    updateOpenState();
    const handleResize = () => {
      updateOpenState();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div
      className={`relative transition-all ${open ? 'w-[246px]' : 'w-[89px]'
        } duration-300 h-screen bg-primary-800 px-4 py-8 flex flex-col justify-between`}
    >
      {/* Toggle Navbar button */}
      <button
        className='w-9 h-9 absolute z-30 top-[30px] -right-[18px] p-2 bg-primary-600 flex items-center justify-center rounded-full'
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <FiArrowLeft className='w-5 h-5 text-gray-200' />
        ) : (
          <FiArrowRight className='w-5 h-5 text-gray-200' />
        )}
      </button>
      {/* Start to Middle Section */}
      <div className='flex flex-col w-full'>
        <div className='space-y-6 mb-5 sticky inset-0'>
          {/* Logo */}
          {open ? (
            <div className='w-full flex justify-center relative h-auto min-h-[41px]'>
              <img  src='/images/crowd-work-horizontal-logo.png' />
              
            </div>
          ) : (
            <div className='w-full flex justify-center relative h-auto min-h-[41px]'>
            <img  src='/images/short-logo.png' />
            
          </div>
          )}
          {/* Search Bar */}
          <div className={`${open && 'mx-2'} flex items-center`}>
            <input
              type='search'
              name='search'
              placeholder={'Search'}
              className={`w-full ${open ? 'block' : 'hidden'
                } duration-100 text-sm-regular text-white bg-primary-600 h-11 rounded-lg px-3.5 py-2.5 box-border border border-primary-600 focus:ring-1 focus:ring-white outline-none shadow-xs placeholder:text-white`}
            />
            {!open && (
              <button className='flex flex-1 items-center justify-center bg-primary-600 h-11 rounded-lg px-3.5 py-2.5 box-border border border-primary-600 focus:ring-1 focus:ring-white outline-none shadow-xs'>
                <FiSearch
                  className={`${open ? 'w-5' : 'w-5'
                    } h-auto text-white`}
                />
              </button>
            )}
          </div>
        </div>
        {/* Navbar primary Options */}
        <div className='w-full flex flex-col gap-1'>
          <a
            href=''
            className={`text-primary-100 text-sm-medium bg-primary-800 rounded-md px-3 py-2 flex items-center gap-3`}
          >
            <FiHome
              className={`${open
                ? 'text-sm-regular w-5 h-5'
                : 'w-5 h-5 mx-auto'
                } text-primary-100`}
            />
            <span className={`${open ? 'block' : 'hidden'}`}>Dashboard</span>
          </a>

          <Link
            href='/headcount/overview'
            className={`text-primary-100 text-sm-medium ${headcount ? 'bg-primary-600' : 'bg-primary-800'
              } rounded-md px-3 py-2 flex items-center gap-3`}
          >
            <FiClipboard
              className={`${open
                ? 'text-sm-regular w-5 h-5'
                : 'w-5 h-5 mx-auto'
                } text-primary-100`}
            />
            <span className={`${open ? 'block' : 'hidden'}`}>Headcount </span>
          </Link>

          <Link
            href='/talent/overview'
            className={`text-primary-100 text-sm-medium ${talent ? 'bg-primary-600' : 'bg-primary-800'
              } rounded-md px-3 py-2 flex items-center gap-3`}
          >
            <FiUsers
              className={`${open
                ? 'text-sm-regular w-5 h-5'
                : 'w-5 h-5 mx-auto'
                } text-primary-100`}
            />
            <span className={`${open ? 'block' : 'hidden'}`}>Talent</span>
          </Link>

          <a
            href=''
            className='text-primary-100 text-sm-medium bg-primary-800 rounded-md px-3 py-2 flex items-center gap-3'
          >
            <FiCalendar
              className={`${open
                ? 'text-sm-regular w-5 h-5'
                : 'w-5 h-5 mx-auto'
                } text-primary-100`}
            />
            <span className={`${open ? 'block' : 'hidden'}`}>Scheduling</span>
          </a>

          <a
            href=''
            className='text-primary-100 text-sm-medium bg-primary-800 rounded-md px-3 py-2 flex items-center gap-3'
          >
            <FiUserCheck
              className={`${open
                ? 'text-sm-regular w-5 h-5'
                : 'w-5 h-5 mx-auto'
                } text-primary-100`}
            />
            <span className={`${open ? 'block' : 'hidden'}`}>
              Worker Welfare
            </span>
          </a>
        </div>
      </div>

      {/* Middle to Bottom Section */}
      <div className='w-full flex flex-col gap-y-6 sticky inset-0'>
        {/* Navbar Secondary Options */}
        <div className='flex flex-col gap-1'>
          <a
            href=''
            className='text-primary-100 text-sm-medium bg-primary-800 rounded-md px-3 py-2 flex items-center gap-3'
          >
            <FiMessageCircle
              className={`${open
                ? 'text-sm-regular'
                : 'w-5 h-5 mx-auto'
                } text-gray-300`}
            />
            <span className={`${open ? 'block' : 'hidden'}`}>Inbox</span>
          </a>

          <Link
            href=''
            className={`text-primary-100 text-sm-medium ${'bg-primary-800'} rounded-md px-3 py-2 flex items-center gap-3`}
          >
            <FiHeadphones
              className={`${open
                ? 'text-sm-regular'
                : 'w-5 h-5 mx-auto'
                } text-gray-300`}
            />
            <span className={`${open ? 'block' : 'hidden'}`}>Support</span>
          </Link>

          <Link
            href='/settings'
            className={`text-primary-100 text-sm-medium ${settings ? 'bg-primary-600' : 'bg-primary-800'
              } rounded-md px-3 py-2 flex items-center gap-3`}
          >
            <FiSettings
              className={`${open
                ? 'text-sm-regular'
                : 'w-5 h-5 mx-auto'
                } text-gray-300`}
            />
            <span className={`${open ? 'block' : 'hidden'}`}>Settings</span>
          </Link>
        </div>
        {/* Separator line */}
        <hr className='bg-gray-600 h-[1px] w-full' />
        {/* User Details */}
        <div
          className={`w-full flex gap-3 ${!open ? 'justify-center' : 'justify-between'
            }`}
        >
          <div className={`flex items-center gap-3`}>
            <Image
              src='/images/profile-avatar.png'
              alt='Profile avatar'
              className='w-10 h-10 rounded-full bg-primary-100'
              width={40}
              height={40}
            />
            <h6
              className={`${open ? 'block' : 'hidden scale-0'
                } duration-200 w-full text-sm-semibold text-white`}
            >
              Amanda Smith
            </h6>
          </div>
          {open && (
            <button
              onClick={() => {
                setShowConfirmModal(true);
              }}
            >
              <FiLogOut className='text-2xl text-primary-300 cursor-pointer' />
            </button>
          )}
        </div>
      </div>
      <ConfirmLogout
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
      />
    </div>
  );
}

export default SideNavbar;
