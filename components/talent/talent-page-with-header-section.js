import { Tab } from '@headlessui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import dynamic from 'next/dynamic';
const FormsTab = dynamic(() => import('./forms'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const StaffContractorsTab = dynamic(() => import('./staff-contractors'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const VolunteersTab = dynamic(() => import('./volunteers'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const VenuesTab = dynamic(() => import('./venues'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const OverviewTab = dynamic(() => import('./overview'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const DuplicatesTab = dynamic(() => import('./duplicates'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const SkillMatchTab = dynamic(() => import('./skill-match'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const HiringProcessTab = dynamic(() => import('./hiring-process'), {
  ssr: false,
  loading: () => <LoaderOverlay />,
});
const CreateFormTab = dynamic(() => import('./Forms/Fields/create-form'), {
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
    name: 'Forms',
    href: 'forms',
  },
  {
    name: 'Staff and Contractors',
    href: 'staff-contractors',
  },
  {
    name: 'Volunteers',
    href: 'volunteers',
  },
  {
    name: 'Duplicates',
    href: 'duplicates',
  },
  {
    name: 'Skill Match',
    href: 'skill-match',
  },
  {
    name: 'Hiring Process',
    href: 'hiring-process',
  },
  {
    name: 'Venues',
    href: 'venues',
  },
];

function TalentPageWithHeaderSection({ tab }) {
  const [selectedTab, setSelectedTab] = useState(tab);

  const [heading, setHeading] = useState('Talent Management');
  const [description, setDescription] = useState('');

  const router = useRouter();
  const { query } = useRouter();

  const TabToRender = () => {
    let Component = <OverviewTab />;
    switch (selectedTab) {
      case 'Overview':
        Component = <OverviewTab />;
        break;
      case 'Forms':
        Component = <FormsTab />;
        break;
      case 'Staff and Contractors':
        Component = <StaffContractorsTab />;
        break;
      case 'Volunteers':
        Component = <VolunteersTab />;
        break;
      case 'Duplicates':
        Component = <DuplicatesTab />;
        break;
      case 'Skill Match':
        Component = <SkillMatchTab />;
        break;
      case 'Hiring Process':
        Component = <HiringProcessTab />;
        break;
      case 'Venues':
        Component = <VenuesTab />;
        break;
      case 'Create Form':
        Component = <CreateFormTab />;
        break;
      default:
        break;
    }

    return Component;
  };

  const setHeadingAndDescription = () => {
    const parsed = query?.item ? JSON.parse(query?.item) : '';
    console.log('My parsed: ', parsed);

    switch (selectedTab) {
      case 'Overview':
        setHeading('Talent Management');
        setDescription('Optimize your workspace allocation and tracking.');
        break;
      case 'Forms':
        setHeading('Forms');
        setDescription(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        );
        break;
      case 'Staff and Contractors':
        setHeading('Staff and Contractors');
        setDescription(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        );
        break;
      case 'Volunteers':
        setHeading('Volunteers');
        setDescription('Streamline functions for enhanced efficiency');
        break;
      case 'Duplicates':
        setHeading('Duplicates');
        setDescription(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        );
        break;
      case 'Skill Match':
        setHeading('Skill Match');
        setDescription(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        );
        break;
      case 'Hiring Process':
        setHeading('Hiring Process');
        setDescription(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        );
        break;
      case 'Interviews':
        setHeading('Interviews');
        setDescription(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        );
        break;
      case 'Create Form':
        setHeading('Create Form');
        setDescription(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setHeadingAndDescription();
  }, []);

  return (
    <div className='mt-3 relative overflow-hidden'>
      <Tab.Group>
        <div className='space-y-8 rounded-tl-[40px] bg-white'>
          <div className='px-8 pt-8 rounded-tl-[40px] space-y-6 bg-white sticky inset-0 z-20'>
            <div className='flex items-center gap-3'>
              {/* Home Icon */}
              <a href='' className='block'>
                <FiHome className='w-4 2xl:w-5 h-auto text-gray-500' />
              </a>
              {selectedTab != 'Create Form' && (
                <>
                  <FiChevronRight className='w-4 2xl:w-5 h-auto text-gray-300' />
                  {/* Dynamic tab title */}
                  <Link
                    href={`/talent/${selectedTab.toLowerCase()}`}
                    className='block text-xs-semibold 2xl:text-sm-semibold text-primary-700'
                  >
                    {selectedTab}
                  </Link>
                </>
              )}
              {/* Additional arrow and link for create-form */}
              {selectedTab === 'Create Form' && (
                <>
                  <FiChevronRight className='w-4 2xl:w-5 h-auto text-gray-300' />
                  <Link
                    href={`/talent/overview`}
                    className='block text-xs-semibold 2xl:text-sm-semibold text-primary-700'
                  >
                    Talent
                  </Link>
                  <FiChevronRight className='w-4 2xl:w-5 h-auto text-gray-300' />
                  <Link
                    href={`/talent/${selectedTab.toLowerCase()}`}
                    className='block text-xs-semibold 2xl:text-sm-semibold text-primary-700'
                  >
                    Create Rule
                  </Link>
                </>
              )}
            </div>

            {/* Page Header */}
            <div className='flex gap-4 justify-between'>
              <div className='space-y-1'>
                <h1 className='w-full text-display-xs-medium 2xl:text-display-sm-medium text-gray-900'>
                  {heading}
                </h1>
                <p className='text-sm-regular 2xl:text-md-regular text-gray-500'>
                  {description}
                </p>
              </div>
            </div>

            {/* Horizontal Tabs */}
            {selectedTab != 'Create Form' && (
              <Tab.List className='flex items-center gap-4 border-b border-gray-200'>
                {horizontal_tabs.map((tab, index) => (
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        onClick={() => {
                          router.push(`/talent/${tab.href.toLowerCase()}`);
                        }}
                        key={index}
                        className={`block text-xs-medium 2xl:text-sm-medium text-gray-500 text-center px-1 pb-4 outline-none ${
                          router.pathname.includes(tab.name.toLowerCase()) &&
                          'border-b-2 text-primary-700 border-primary-700'
                        }`}
                      >
                        {tab.name}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            )}
          </div>
          <Tab.Panels as={Fragment}>
            {horizontal_tabs.map(() => (
              <Tab.Panel className='transition-all ease-in-out bg-primary-800'>
                {TabToRender}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
}

export default TalentPageWithHeaderSection;
