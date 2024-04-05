import { Tab } from '@headlessui/react';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import {
  getPreviousIndexItem,
  removeItemsAfterPathname,
} from '@/functions/functions';
import {
  FiChevronRight,
  FiDownload,
  FiHome,
  FiPlus,
  FiUpload,
} from 'react-icons/fi';
import dynamic from 'next/dynamic';
const EventsTab = dynamic(() => import('./events-tab'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const FunctionsTab = dynamic(() => import('./functions-tab'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const RolesTab = dynamic(() => import('./roles-tab'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const VenuesTab = dynamic(() => import('./venues-tab'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const OverviewTab = dynamic(() => import('./overview'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const PositionsTab = dynamic(() => import('./positions-tab'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const DepartmentsTab = dynamic(() => import('./departments-tab'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});

import Link from 'next/link';
import LoaderOverlay from './loader-overlay';

const horizontal_tabs = [
  {
    name: 'Overview',
    href: 'overview',
  },
  {
    name: 'Events',
    href: 'events',
  },
  {
    name: 'Departments',
    href: 'departments',
  },
  {
    name: 'Functions',
    href: 'functions',
  },
  {
    name: 'Roles',
    href: 'roles',
  },
  {
    name: 'Venues',
    href: 'venues',
  },
  {
    name: 'Positions',
    href: 'positions',
  },
];

function HeadcountPageWithHeaderSection({ tab }) {
  const [selectedTab, setSelectedTab] = useState(tab);

  const [heading, setHeading] = useState('Headcount Management');
  const [description, setDescription] = useState('');

  const router = useRouter();
  const { query } = useRouter();

  const TabToRender = useMemo(() => {
    console.log(selectedTab);
    let Component = <OverviewTab />;
    switch (selectedTab) {
      case 'Overview':
        Component = <OverviewTab />;
        break;
      case 'Events':
        Component = <EventsTab />;
        break;
      case 'Departments':
        Component = <DepartmentsTab />;
        break;
      case 'Functions':
        Component = <FunctionsTab />;
        break;
      case 'Roles':
        Component = <RolesTab />;
        break;
      case 'Venues':
        Component = <VenuesTab />;
        break;
      case 'Positions':
        Component = <PositionsTab />;
        break;
      default:
        break;
    }

    return Component;
  }, [selectedTab]);

  const setHeadingAndDescription = () => {
    const parsed = query?.item ? JSON.parse(query?.item) : '';
    console.log('My parsed: ', parsed);

    switch (selectedTab) {
      case 'Overview':
        setHeading('Headcount Management');
        setDescription('Optimize your workspace allocation and tracking.');
        break;
      case 'Events':
        setHeading('Events');
        setDescription('Gain full visibility and control over your events.');
        break;
      case 'Departments':
        setHeading(parsed ? parsed.event_name : 'Departments');
        setDescription(
          parsed
            ? parsed.event_description
            : 'Track and manage departments efficiently'
        );
        break;
      case 'Functions':
        setHeading(parsed ? parsed.department_name : 'Functions');
        setDescription('Streamline functions for enhanced efficiency');
        break;
      case 'Roles':
        setHeading(parsed ? parsed.function_name : 'Roles');
        setDescription(
          parsed
            ? parsed.function_description
            : 'Efficiently manage diverse roles within your event'
        );
        break;
      case 'Venues':
        setHeading('Venues');
        setDescription('Efficiently track and oversee multiple event venues');
        break;
      case 'Positions':
        setHeading(parsed ? parsed.role_name : 'Headcount Management');
        setDescription('Easily access and update position details.');
        break;
      default:
        break;
    }
  };

  const [breadcrumbs, setbreadcrumbs] = useState([]);
  useEffect(() => {
    setHeadingAndDescription();
    let path = sessionStorage.getItem('breadcrumbs');
    if (path) {
      setbreadcrumbs(JSON.parse(path));
    }
  }, []);

  return (
    <div className='mt-3 bg-gray-50 rounded-l-[40px] relative overflow-hidden'>
      <Tab.Group onChange={(i) => console.log('tab index', i)}>
        <div className='px-8 pt-8 rounded-tl-[40px] space-y-6 bg-gray-50 sticky inset-0 z-20'>
          <div className='flex items-center gap-3'>
            {/* Home Icon */}
            <a href='' className='block'>
              <FiHome className='w-4 2xl:w-5 h-auto text-gray-500' />
            </a>
            {/* Chevron-right icon */}
            <FiChevronRight className='w-4 2xl:w-5 h-auto text-gray-300' />
            {/* Dynamic tab title */}
            {breadcrumbs?.length === 0 ? (
              <Link
                href={`/headcount/${selectedTab.toLowerCase()}`}
                className='block text-xs-semibold 2xl:text-sm-semibold text-primary-700'
              >
                {selectedTab}
              </Link>
            ) : (
              breadcrumbs?.map(({ guid, pathname }, index) => {
                let breadcrumbsArray = [];
                let path = sessionStorage.getItem('breadcrumbs');
                if (path) {
                  breadcrumbsArray = JSON.parse(path);
                }
                return (
                  <button
                    onClick={() => {
                      let breadcrumbsArrayUpdated = removeItemsAfterPathname(
                        breadcrumbsArray,
                        pathname
                      );
                      let previousItem = getPreviousIndexItem(
                        breadcrumbsArrayUpdated,
                        index
                      );
                      sessionStorage.setItem(
                        'breadcrumbs',
                        JSON.stringify(breadcrumbsArrayUpdated)
                      );
                      if (previousItem === null) {
                        router.push(
                          {
                            pathname: pathname,
                            query: { item: false },
                          },
                          pathname
                        );
                      } else {
                        router.push(
                          {
                            pathname: pathname,
                            query: { item: JSON.stringify(previousItem) },
                          },
                          pathname
                        );
                      }
                    }}
                    className='block text-sm-semibold text-primary-700'
                  >
                    {pathname
                      .split('/')[2]
                      .replace(/^./, pathname.split('/')[2][0].toUpperCase()) +
                      ' > '}
                  </button>
                );
              })
            )}
          </div>

          {/* Page Header */}
          <div className='flex gap-4 justify-between'>
            <div className='space-y-1'>
              <h1 className='w-full text-display-sm-medium text-gray-900'>
                {heading}
              </h1>
              <p className='text-md-regular text-gray-500'>
                {description}
              </p>
            </div>
          </div>

          {/* Horizontal Tabs */}
          <Tab.List className='flex items-center gap-4 border-b border-gray-200'>
            {horizontal_tabs.map((tab, index) => (
              <Tab as={Fragment}>
                {({ selected }) => (
                  <Link
                    href={`/headcount/${tab.name.toLowerCase()}`}
                    onClick={() => sessionStorage.removeItem('breadcrumbs')}
                    key={index}
                    className={`block text-sm-medium text-center px-1 pb-4 outline-none ${
                      router.pathname.includes(tab.name.toLowerCase())
                        ? 'border-b-2 text-primary-700 border-primary-700 pointer-events-none'
                        : 'text-gray-600 pointer-events-auto'
                    }`}
                  >
                    {tab.name}
                  </Link>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          {horizontal_tabs.map(() => (
            <Tab.Panel className='transition-all ease-in-out outline-none'>
              {TabToRender}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default HeadcountPageWithHeaderSection;
