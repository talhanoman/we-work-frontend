import React, { useEffect, useState, useMemo } from 'react';
import {
  FiDownload,
  FiPlus,
  FiUpload,
  FiSearch,
  FiFilter,
} from 'react-icons/fi';
import CheckboxMultiSelect from '../checkbox-multiselect';
import VolunteersTable from './volunteers-table';
import Pagination from '../pagination/Pagination';

const itemsPerTable = 2;

const table_data = [
  {
    id: 1,
    applicantName: 'Alec Whitten',
    img: '/images/avatar1.png',
    faConfirmed: 'true',
    userId: '518714',
    emailAddress: 'alec.w@gmail.com',
    dob: '15 April 2000',
    contactNo: '(555) 987-6543',
    function: 'Guest Service',
    role: 'Team Leader',
    applicationStatus: 'Active',
    applicationProgress: 40,
  },
  {
    id: 2,
    applicantName: 'Alec Whitten',
    img: '/images/avatar2.png',
    faConfirmed: 'true',
    userId: '518714',
    emailAddress: 'alec.w@gmail.com',
    dob: '15 April 2000',
    contactNo: '(555) 987-6543',
    function: 'Guest Service',
    role: 'Team Leader',
    applicationStatus: 'Inactive',
    applicationProgress: 70,
  },
  {
    id: 3,
    applicantName: 'Alec Whitten',
    img: '/images/avatar3.png',
    faConfirmed: 'true',
    userId: '518714',
    emailAddress: 'alec.w@gmail.com',
    dob: '15 April 2000',
    contactNo: '(555) 987-6543',
    function: 'Guest Service',
    role: 'Team Leader',
    applicationStatus: 'Active',
    applicationProgress: 20,
  },
  {
    id: 4,
    applicantName: 'Alec Whitten',
    img: '/images/avatar4.png',
    faConfirmed: 'false',
    userId: '518714',
    emailAddress: 'alec.w@gmail.com',
    dob: '15 April 2000',
    contactNo: '(555) 987-6543',
    function: 'Guest Service',
    role: 'Team Leader',
    applicationStatus: 'Pending',
    applicationProgress: 87,
  },
];

const column_options = [
  { name: 'Applicant Name', isChecked: false },
  { name: 'FA Confirmed', isChecked: false },
  { name: 'User ID', isChecked: false },
  { name: 'Email Address', isChecked: false },
  { name: 'Date of Birth', isChecked: false },
  { name: 'Contact Number', isChecked: false },
  { name: 'Function', isChecked: false },
  { name: 'Role', isChecked: false },
  { name: 'Application Status', isChecked: false },
  { name: 'Application Progress', isChecked: false },
];

const skill_options = [
  { name: 'STL_Tier1', isChecked: false },
  { name: 'STL_Tier2', isChecked: false },
  { name: 'STL_Tier3', isChecked: false },
  { name: 'STL_Tier4', isChecked: false },
  { name: 'STL_Tier5', isChecked: false },
];

function VolunteersTab() {
  const [selectWithBadge, setSelectWithBadge] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [isChecked, setIsChecked] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {}, []);

  const handleSelectWithBadge = (option) => {
    setSelectWithBadge(option);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerTable;
    const lastPageIndex = firstPageIndex + itemsPerTable;
    return table_data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, table_data]);

  return (
    <>
      {/* Actions */}
      <div className='fixed top-[94px] 2xl:top-24 right-8 z-20 flex gap-3'>
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
        <button className='h-10 text-xs-semibold 2xl:text-sm-semibold text-white text-center inline-flex items-center gap-2 bg-primary-600 px-4 py-2.5 rounded-lg border border-primary-600 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'>
          <FiPlus className='w-4 2xl:w-5 h-auto text-white' />
          <span>Add Applicant</span>
        </button>
      </div>

      <div className='w-full h-[calc(100vh-249px)] overflow-y-auto rounded-bl-[40px] bg-gray-50 px-8 pb-16 space-y-6'>
        {/* 1st Section Container */}
        <div className='space-y-6'>
          {/* Job Board form */}
          <form className='space-y-6'>
            {/* Search Bar and Tabs */}
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
                {/* Status Button */}
                <label className='h-10 text-xs-semibold 2xl:text-sm-semibold inline-flex items-center gap-2 bg-white text-gray-700 px-4 py-2.5 rounded-lg border border-gray-300 shadow-xs cursor-pointer'>
                  <input type='radio' className='' />
                  <span>Status</span>
                </label>
                {/* Skill Match Button */}
                <div className='w-[154px]'>
                  <label
                    className='text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only'
                    htmlFor='skill_options'
                  >
                    Skill Match<span className='text-primary-600'>*</span>
                  </label>
                  <CheckboxMultiSelect
                    label={'Skill Match'}
                    options={skill_options}
                    selectedOption={selectWithBadge}
                    onSelect={handleSelectWithBadge}
                    panelWidth={'w-[200px]'}
                  />
                </div>
                {/* <button
                                    className="h-10 text-xs-semibold 2xl:text-sm-semibold text-white text-center inline-flex items-center gap-2 bg-primary-600 px-4 py-2.5 rounded-lg border border-primary-600 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 2xl:w-5 h-auto"
                                    >
                                        <path
                                            d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                                            stroke="#ffffff"
                                            stroke-width="1.67"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <span>Skills Match</span>
                                    <span style={{ padding: '1px 7px' }} className="bg-white text-primary-600 rounded-full">3</span>
                                </button> */}
                {/* Columns Dropdown */}
                <div className='w-[154px]'>
                  <label
                    className='text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only'
                    htmlFor='column_options'
                  >
                    Columns<span className='text-primary-600'>*</span>
                  </label>
                  <CheckboxMultiSelect
                    options={column_options}
                    selectedOption={selectWithBadge}
                    onSelect={handleSelectWithBadge}
                    panelWidth={'w-[240px]'}
                  />
                </div>
              </div>
            </div>

            <div className='w-full bg-gray-50 border-x border-t border-gray-200 rounded-2xl shadow-sm'>
              {/* Volunteers Table */}
              <VolunteersTable
                selectedOption={selectWithBadge}
                searchFilter={searchFilter}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
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
    </>
  );
}

export default VolunteersTab;
