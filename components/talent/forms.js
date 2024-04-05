import React, { useEffect, useState, useMemo, Fragment } from 'react';
import { FiDownload, FiPlus, FiUpload, FiSearch } from 'react-icons/fi';
import CheckboxAllFilterMultiSelectCombobox from '../checkbox-allfilter-multiselect-combobox';
import Pagination from '../pagination/Pagination';
import FormsTable from './forms-table';
import { Dialog, Transition } from '@headlessui/react';
import ToastPopup from '@/components/toast/toast-popup';
import Select from '../select';
import { useRouter } from 'next/router';

const itemsPerTable = 4;

const table_data = [
  {
    id: 1,
    heading: 'Charity Walkathon',
    description: 'Volunteers',
    img: '/images/avatar1.png',
    pages: 52,
    participants: 53,
    started: 12,
    completed: 5,
    dropOff: 30,
    dateStart: '23/03/2022',
    dateEnd: '25/03/2022',
  },
  {
    id: 2,
    heading: 'International Trade Expo',
    description: 'Paid staff • Contactors',
    img: '/images/avatar2.png',
    pages: 52,
    participants: 53,
    started: 12,
    completed: 5,
    dropOff: 30,
    dateStart: '23/03/2022',
    dateEnd: '25/03/2022',
  },
  {
    id: 3,
    heading: 'Neighborhood Block Party',
    description: 'Paid staff • Contactors',
    img: '/images/avatar3.png',
    pages: 52,
    participants: 53,
    started: 12,
    completed: 5,
    dropOff: 30,
    dateStart: '23/03/2022',
    dateEnd: '25/03/2022',
  },
  {
    id: 4,
    heading: 'Charity Walkathon',
    description: 'Volunteers',
    img: '/images/avatar4.png',
    pages: 52,
    participants: 53,
    started: 12,
    completed: 5,
    dropOff: 30,
    dateStart: '23/03/2022',
    dateEnd: '25/03/2022',
  },
  {
    id: 5,
    heading: 'Charity Walkathon',
    description: 'Volunteers',
    img: '/images/avatar4.png',
    pages: 52,
    participants: 53,
    started: 12,
    completed: 5,
    dropOff: 30,
    dateStart: '23/03/2022',
    dateEnd: '25/03/2022',
  },
];

const template_options = [
  {
    label: 'Standard volunteering template',
    value: 'Standard volunteering template',
  },
  {
    label: 'High school diploma or equivalent',
    value: 'High school diploma or equivalent',
  },
  {
    label: 'Vocational training or apprenticeship',
    value: 'Vocational training or apprenticeship',
  },
  { label: "Bachelor's degree", value: "Bachelor's degree" },
  { label: "Master's degree", value: "Master's degree" },
  { label: 'Doctorate degree', value: 'Doctorate degree' },
];

function FormsTab() {
  const [searchFilter, setSearchFilter] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  const [toastData, setToastData] = useState(null);

  useEffect(() => {});

  const router = useRouter();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerTable;
    const lastPageIndex = firstPageIndex + itemsPerTable;
    return table_data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, table_data]);

  const handleSelect = (option) => {
    setSelectedTemplate(option);

    // setFormData({
    //   ...formData,
    //   venue_name: option,
    //   venue_nameValid: option.length >= 1,
    // });
  };

  const handleReset = () => {
    setShowFormModal(false);
    // setFormData(initial_form_data);
    setSelectedTemplate([]);
  };

  function handleToast() {
    setToastData(null);
  }

  const handleCreateForm = () => {
    setToastData({
      type: 'success',
      message: 'Form added successfully!',
    });
    setTimeout(() => {
      setShowFormModal(false);
      router.push('/talent/create-form');
      setToastData(null);
    }, 2000);
  };

  return (
    <>
      {/* Actions */}
      <div className='bg-white fixed top-[94px] 2xl:top-24 right-8 z-20 flex gap-3'>
        <div>
          <input type='file' className='hidden' />
          <button className='h-10 text-xs-semibold 2xl:text-sm-semibold text-gray-700 text-center inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-300 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'>
            <FiUpload className='w-4 2xl:w-5 h-auto text-gray-700' />
            <span>Import</span>
          </button>
        </div>
        <button className='h-10 text-xs-semibold 2xl:text-sm-semibold text-gray-700 text-center inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-300 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'>
          <FiDownload className='w-4 2xl:w-5 h-auto text-gray-700' />
          <span>Export</span>
        </button>
        <button
          className='h-10 text-xs-semibold 2xl:text-sm-semibold text-white text-center inline-flex items-center gap-2 bg-primary-600 px-4 py-2.5 rounded-lg border border-primary-600 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'
          onClick={(e) => {
            setShowFormModal(true);
          }}
        >
          <FiPlus className='w-4 2xl:w-5 h-auto text-white' />
          <span>Create Form</span>
        </button>
      </div>

      <div className='w-full h-[calc(100vh-249px)] overflow-y-auto rounded-bl-[40px] bg-white px-8 pb-16 space-y-6'>
        <div className='space-y-6'>
          <form className='space-y-6'>
            {/* Search Bar */}
            <div className='flex gap-4 justify-between items-center'>
              <div className='w-80 relative'>
                <FiSearch className='w-4 2xl:w-5 h-auto text-gray-500 absolute left-3.5 top-3.5 2xl:top-3' />
                <input
                  type='search'
                  name='search'
                  placeholder='Search'
                  value={searchFilter}
                  onChange={(e) => {
                    setSearchFilter(e.target.value);
                  }}
                  className='w-full block text-sm-regular 2xl:text-md-regular text-gray-500 bg-white h-11 rounded-lg pl-[42px] pr-3.5 py-2.5 box-border border border-gray-300 focus:ring-1 focus:ring-white outline-none shadow-xs placeholder:text-gray-500'
                />
              </div>

              <div className='w-full flex justify-end items-center gap-3'>
                {/* More Filters Button */}
                <div className=''>
                  <label
                    className='text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only'
                    htmlFor='filter_options'
                  >
                    All Filter<span className='text-primary-600'>*</span>
                  </label>
                  <CheckboxAllFilterMultiSelectCombobox
                    className={'text-xs-semibold 2xl:text-sm-semibold'}
                    panelWidth={'w-[240px]'}
                    options={filterOptions}
                  />
                </div>
              </div>
            </div>
            <div className='w-full bg-white rounded-xl'>
              {/* Forms Table */}
              <FormsTable
                searchFilter={searchFilter}
                table_data={currentTableData}
              />

              <div className={`bg-white rounded-b-2xl`}>
                {table_data?.length > 0 && (
                  <div className={`bg-white rounded-b-2xl`}>
                    <Pagination
                      currentPage={currentPage}
                      totalCount={table_data?.length}
                      pageSize={itemsPerTable}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <Transition appear show={showFormModal} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-30'
          onClose={() => {
            setShowFormModal(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-[480px] transform rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='space-y-8'>
                    <div className='space-y-5'>
                      <svg
                        width='56'
                        height='56'
                        viewBox='0 0 56 56'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          x='4'
                          y='4'
                          width='48'
                          height='48'
                          rx='24'
                          fill='#DEEBFB'
                        />
                        <path
                          d='M32 18V22M24 18V22M19 26H37M21 20H35C36.1046 20 37 20.8954 37 22V36C37 37.1046 36.1046 38 35 38H21C19.8954 38 19 37.1046 19 36V22C19 20.8954 19.8954 20 21 20Z'
                          stroke='#2F68D6'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <rect
                          x='4'
                          y='4'
                          width='48'
                          height='48'
                          rx='24'
                          stroke='#F1F6FD'
                          stroke-width='8'
                        />
                      </svg>

                      <div className='space-y-2'>
                        <Dialog.Title
                          as='h3'
                          className='text-md-semibold 2xl:text-lg-semibold text-gray-900'
                        >
                          {'Create New Form'}
                        </Dialog.Title>
                        <Dialog.Description
                          as='p'
                          className='text-xs-regular 2xl:text-sm-regular text-gray-500'
                        >
                          Choose a template or start from scratch to personalize
                          your form.
                        </Dialog.Description>
                      </div>

                      <div className='space-y-3'>
                        {/* Venue Name Row */}
                        <div className='w-full'>
                          <label
                            className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                            htmlFor='template'
                          >
                            Select template
                          </label>
                          <Select
                            panelPosition={'w-full bottom-11 mb-1'}
                            options={template_options}
                            selectedOption={selectedTemplate}
                            onSelect={handleSelect}
                            placeholder={'Template'}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='flex justify-between gap-3'>
                      <button
                        className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs'
                        onClick={handleReset}
                      >
                        Cancel
                      </button>
                      <button className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-primary-600 py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'>
                        Create Blank
                      </button>
                      <button
                        className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                        onClick={handleCreateForm}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

          {/* Toast */}
          {toastData && (
            <ToastPopup
              toastType={toastData.type}
              message={toastData.message}
            />
          )}
        </Dialog>
      </Transition>
    </>
  );
}

export default FormsTab;
