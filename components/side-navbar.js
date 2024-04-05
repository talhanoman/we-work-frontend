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
              <Image
                src='/images/crowd-work-horizontal-logo.svg'
                alt='Crowd Tonic Logo'
                className='object-contain'
                fill
                priority
              />
            </div>
          ) : (
            <svg
              width='41'
              height='40'
              viewBox='0 0 41 40'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='mx-auto'
            >
              <path
                d='M20.4444 11.3519C23.1003 11.3424 25.4754 10.1763 27.1127 8.33431L32.9575 11.6756L36.6605 9.5385L35.8323 9.05778C35.8323 9.05778 35.818 9.05777 35.8085 9.06253L28.9546 5.13584C28.9546 5.13584 28.9642 5.11204 28.9689 5.09776L25.2136 2.93213C24.9423 5.33098 22.9147 7.19676 20.4397 7.20152C18.0076 7.21104 15.9942 5.4119 15.6563 3.07016L11.92 5.21675C11.92 5.21675 11.9295 5.24531 11.939 5.26435L5.06133 9.20532C5.06133 9.20532 5.03756 9.19104 5.02328 9.18628L4.2998 9.60037L8.07416 11.7136L13.8143 8.4295C15.4611 10.2239 17.8171 11.3519 20.4444 11.3472'
                fill='white'
              />
              <path
                d='M8.56021 27.0966C9.77867 29.1909 9.2361 31.8182 7.39889 33.2842L19.0124 39.9524L18.9838 35.8877L12.882 32.3893C13.6816 30.0238 13.5007 27.3441 12.1442 25.0167C10.7735 22.6607 8.49358 21.1661 6.00429 20.7092L5.98053 13.784L2.43457 11.7944V13.9981C2.43457 13.9981 2.43934 13.9981 2.4441 14.0029L2.46316 20.7711C2.46316 20.7711 2.44409 20.7711 2.43457 20.7758V25.1214C4.65732 24.1314 7.30843 24.9548 8.56021 27.1014'
                fill='white'
              />
              <path
                d='M28.6943 25.0117C27.3283 27.3582 27.1569 30.0617 27.9756 32.4415L21.8071 35.9779L21.8309 39.9998L33.4682 33.303C31.6072 31.8418 31.0598 29.2002 32.2831 27.0964C33.5015 25.0022 36.0574 24.1692 38.2421 25.0498V20.7376C38.2421 20.7376 38.2231 20.7376 38.2183 20.7376L38.2373 13.9075C38.2373 13.9075 38.2421 13.9075 38.2468 13.9075V11.8799L34.7009 13.9313L34.6771 20.7423C32.2545 21.2326 30.046 22.708 28.7038 25.0117'
                fill='white'
              />
              <path
                d='M20.4267 4.77869C21.7451 4.77869 22.816 3.70302 22.8113 2.37984C22.8113 2.04667 22.7399 1.73253 22.6161 1.44695C22.2496 0.590219 21.3977 -0.00473128 20.4124 2.83524e-05C19.3558 2.83524e-05 18.461 0.69493 18.1468 1.64686C18.0707 1.88484 18.0278 2.13234 18.0278 2.39412C18.0278 3.71254 19.1035 4.78345 20.4267 4.77869Z'
                fill='white'
              />
              <path
                d='M6.46123 28.3197C5.79488 27.1774 4.33362 26.7919 3.19131 27.4534C2.88193 27.6343 2.62969 27.877 2.43454 28.1531C1.91574 28.8909 1.8396 29.8951 2.32508 30.7233C2.86292 31.6467 3.92434 32.075 4.90958 31.8561C5.1428 31.8037 5.37599 31.7181 5.59018 31.5896C6.73249 30.928 7.11805 29.462 6.45646 28.3197'
                fill='white'
              />
              <path
                d='M37.6464 27.4534C36.5041 26.7919 35.0429 27.1774 34.3765 28.3197C33.7149 29.462 34.1005 30.9232 35.2428 31.5896C35.476 31.7228 35.7188 31.8133 35.9663 31.8656C36.942 32.0655 37.9844 31.6372 38.5127 30.7281C39.0458 29.8142 38.9029 28.6957 38.2366 27.9437C38.07 27.7533 37.8749 27.5915 37.6464 27.4582'
                fill='white'
              />
            </svg>
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
