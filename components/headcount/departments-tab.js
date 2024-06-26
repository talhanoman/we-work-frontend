import React, { useEffect } from 'react';
import { useState, useMemo } from 'react';
import { getDepartment, getEvent } from '@/pages/api/get';
import Cookies from 'universal-cookie';
import { FiDownload, FiPlus, FiSearch, FiUpload } from 'react-icons/fi';
import Pagination from '../pagination/Pagination';
import CheckboxAllFilterMultiSelectCombobox from '../checkbox-allfilter-multiselect-combobox';
import DepartmentsTable from './departments-table';
import DepartmentModal from './department-modal';
import { addDepartmentFile } from '@/pages/api/post';
import CheckboxMultiSelect from '../checkbox-multiselect';
import { handleExport } from './export-excel-file/export-excel-file';
import { useRouter } from 'next/router';

const column_options = [
  { name: 'Department Name', isChecked: false },
  { name: 'Department Code', isChecked: false },
  { name: 'Department Venue', isChecked: false },
];

function DepartmentsTab() {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const [departments, setDepartments] = useState([]);
  const [events, setEvents] = useState([]);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [departmentModalData, setDepartmentModalData] = useState(null);
  const [selectWithBadge, setSelectWithBadge] = useState(column_options);
  const [selectedRow, setSelectedRow] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [query, setQueryParamEvent] = useState(null);

  const changeAttatchment = React.useRef(null);

  const [attatchment, setAttatchment] = useState('');
  const router = useRouter();
  const router_query = router?.query;
  let event_guid = null;
  if (router_query.item !== undefined) {
    event_guid = JSON.parse(router_query.item).event_guid;
  }

  // Filter Options
  const [filterOptions, setFilterOptions] = useState([]);

  const filter_options_title = filterOptions?.map((opt) =>
    opt?.title.toLowerCase()
  );
  const initial_all_filters_options = Object.assign(
    {},
    ...filter_options_title.map((key) =>
      key == 'date' ? { [key]: '' } : { [key]: [] }
    )
  );

  const [allFiltersOptions, setAllFiltersOptions] = useState(
    initial_all_filters_options
  );

  useEffect(() => {
    if (departments?.length > 0) {
      const obj = [
        {
          title: 'Department Name',
          filterOptions: departments
            ?.filter((item) => item.department_name)
            ?.map((item) => ({
              name: item.department_name,
              isChecked: false,
            })),
        },
        {
          title: 'Code',
          filterOptions: departments
            ?.filter((item) => item.department_code)
            ?.map((item) => ({
              name: item.department_code,
              isChecked: false,
            })),
        },
        {
          title: 'Event Name',
          filterOptions: departments
            ?.filter((item) => item.event_name)
            ?.map((item) => ({
              name: item.event_name,
              isChecked: false,
            })),
        },
      ];
      setFilterOptions(obj);
    }
  }, [departments]);

  useEffect(() => {
    getMyEvents();
    getMyDepartments();
    setQueryParamEvent(router?.query);
  }, []);

  const getMyEvents = async () => {
    let data = await getEvent();    
      let options = [];
      data?.map((obj) => {
        let item = {
          value: obj.event_guid,
          label: obj.event_name,
        };

        options.push(item);
      });
      setEvents(options);
    
  };

  const getMyDepartments = async () => {
    let res = await getDepartment();
    let data = res;    
      setDepartments(data);    
  };

  /**
   * Filter export data on row traversal
   */
  const HandleRowClickExportData = () => {
    const event_guid = JSON.parse(query.item).event_guid;
    const eventDepartments = departments.filter(
      (item) => item.event_guid === event_guid
    );
    handleExport(
      eventDepartments,
      ['department_name', 'department_code'],
      'departments.xlsx'
    );
  };

  const handleClickAttatchment = (event) => {
    changeAttatchment.current.click();
  };

  const handleAttatchmentChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    setAttatchment(file);
    alert('File has been selected');

    // upload file
    const formData = new FormData();
    formData.append('file', file);
    alert('File is ready to go');
    let res = await addDepartmentFile(formData);
    let { valid } = res;
    if (!valid) {
      alert('Error: ' + res.message + ' on row ' + res.data);
    }
    getMyDepartments();
    event.target.value = '';
    console.log(res);
  };

  const saveAttatchment = async () => {
    const formData = new FormData();
    formData.append('file', attatchment);
    alert('File is ready to go');
    let res = await addDepartmentFile(formData);
    console.log(res);
  };

  const handleSelectWithBadge = (option) => {
    setSelectWithBadge(option);
  };

  const handleDataChange = (data) => {
    setDepartmentModalData(data);
  };

  const handleEditModal = (data) => {
    setShowDepartmentModal(data?.showModal);

    setEditRowData(data?.editRowData);
  };
  // Search Functionality
  const [searchDept, setSearchDept] = useState('');

  const handleSelectAllFilters = (options) => {
    let index = 0;

    for (const key of Object.keys(options)) {
      if (options[key]?.length === 0) {
        index++;
      }
    }

    if (index === Object.keys(options).length) {
      setAllFiltersOptions({});
    } else {
      setAllFiltersOptions(options);
    }
  };

  const handleQuery = (item) => {
    if (!event_guid) return departments;
    else if (item.event_guid === event_guid) {
      return true;
    } else {
      return false;
    }
  };

  console.log('Select All Filters: ', allFiltersOptions);
  console.log('Options Filters: ', filterOptions);
  console.log('department: ', departments);
  console.log('guid: ', event_guid);

  return (
    <>
      {/* Actions */}
      <div className='fixed top-24 right-8 z-20 flex gap-3'>
        <div>
          <input
            type='file'
            className='hidden'
            ref={changeAttatchment}
            onChange={handleAttatchmentChange}
          />
          <button
            onClick={handleClickAttatchment}
            className='h-10 text-xs-semibold 2xl:text-sm-semibold text-gray-700 text-center inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-300 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'
          >
            <FiUpload className='w-4 2xl:w-5 h-auto text-gray-700' />
            <span>Import</span>
          </button>
        </div>

        <button
          onClick={() => {
            if (query?.item !== undefined) {
              HandleRowClickExportData();
            } else {
              handleExport(
                departments,
                ['department_name', 'department_code'],
                'departments.xlsx'
              );
            }
          }}
          className='h-10 text-xs-semibold 2xl:text-sm-semibold text-gray-700 text-center inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-300 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'
        >
          <FiDownload className='w-4 2xl:w-5 h-auto text-gray-700' />
          <span>Export</span>
        </button>
        <button
          className='h-10 text-xs-semibold 2xl:text-sm-semibold text-white text-center inline-flex items-center gap-2 bg-primary-600 px-4 py-2.5 rounded-lg border border-primary-600 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'
          onClick={() => {
            setShowDepartmentModal(true);
            setSelectedRow(false);
          }}
        >
          <FiPlus className='w-4 2xl:w-5 h-auto text-white' />
          <span>Add department</span>
        </button>
      </div>

      {/* Department Modal */}
      <DepartmentModal
        event_options={events}
        getMyDepartments={getMyDepartments}
        showDepartmentModal={showDepartmentModal}
        setShowDepartmentModal={setShowDepartmentModal}
        handleDataChange={handleDataChange}
        editRowData={selectedRow}
      />

      <div
        className={`w-full h-[calc(100vh-203px)] ${
          !departments && 'flex items-center'
        } overflow-y-auto rounded-bl-[40px] bg-gray-50 px-8 pt-8 pb-16 space-y-6`}
      >
        {/* Job Board form */}
        {departments && (
          <form className='w-full space-y-6'>
            {/* Search Bar and Tabs */}
            <div className='flex gap-4 justify-between items-center'>
              <div className='w-80 relative'>
                <FiSearch className='w-4 2xl:w-5 h-auto text-grey-300 absolute left-3.5 top-3.5 2xl:top-3' />
                <input
                  type='search'
                  name='search'
                  placeholder='Search'
                  className='w-full block text-sm-regular 2xl:text-md-regular text-grey-300 bg-white h-11 rounded-lg pl-[42px] pr-3.5 py-2.5 box-border border border-grey-300 focus:ring-1 focus:ring-white outline-none shadow-xs placeholder:text-grey-300'
                  value={searchDept}
                  onChange={(e) => {
                    setSearchDept(e.target.value);
                  }}
                />
              </div>

              {/* <label className='hover:cursor-pointer'>
                <input type="file" className='hidden' onChange={handleAttatchmentChange} />
                <div className="flex items-center">
                  <div className='flex-1 h-full'>
                    <div className='h-[44.2px] p-2 w-full rounded-md rounded-r-none border border-gray-300 border-r-0 py-1.5 text-gray-900 text-xs sm:leading-6 inter font-normal flex flex-col justify-center'>
                      Upload a Document
                    </div>
                  </div>
                  <div className='h-full'>
                    <div className='h-[44.2px] p-2 w-full border border-l-0 rounded-l-none border-gray-300 py-1.5 rounded-md flex flex-col justify-center'>
                      <input type="file" className='hidden' ref={changeAttatchment} onChange={handleAttatchmentChange} />
                      <button onClick={handleClickAttatchment} >Browse</button>
                    </div>
                  </div>

                </div>
              </label>

              <div>
                <button onClick={saveAttatchment}> Save </button>
              </div> */}

              <div className='w-full flex justify-end items-center gap-3'>
                {/* More Filters Button */}
                <div className=''>
                  <label
                    className='text-gray-700 text-sm-medium sr-only'
                    htmlFor='filterOptions'
                  >
                    All Filter<span className='text-primary-600'>*</span>
                  </label>
                  {filterOptions && (
                    <CheckboxAllFilterMultiSelectCombobox
                      allFiltersOptions={allFiltersOptions}
                      setAllFiltersOptions={handleSelectAllFilters}
                      className={'text-xs-semibold 2xl:text-sm-semibold'}
                      panelWidth={'w-[240px]'}
                      options={filterOptions}
                    />
                  )}
                </div>
                {/* Columns Dropdown */}
                <div className='w-[154px]'>
                  <label
                    className='text-gray-700 text-sm-medium sr-only'
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
            {/* Board */}
            <div className='w-full bg-gray-50 border-x border-t border-gray-200 rounded-2xl shadow-sm'>
              {/* Departments Table */}

              <DepartmentsTable
                selectedFilters={allFiltersOptions}
                selectedOption={selectWithBadge}
                searchFilter={searchDept}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                getMyDepartments={getMyDepartments}
                departments={departments?.filter(handleQuery)}
                showEditModal={handleEditModal}
                setSelectedRow={setSelectedRow}
              />
            </div>
          </form>
        )}
        {!departments && (
          <div className='w-full px-8'>
            {/* Empty State */}
            <div className='max-w-[512px] mx-auto'>
              <div className='w-[352px] mx-auto flex flex-col gap-y-6 items-center justify-center'>
                <div className='w-full flex flex-col justify-center items-center gap-y-4'>
                  <svg
                    width='152'
                    height='118'
                    viewBox='0 0 152 118'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='cursor-pointer'
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDepartmentModal(true);
                    }}
                  >
                    <circle cx='76' cy='52' r='52' fill='#F2F2F2' />
                    <g filter='url(#filter0_d_947_91388)'>
                      <path
                        d='M37.0816 16.1933L16.7959 21.6239C15.2587 22.0354 13.9609 23.0877 13.1879 24.5492C12.4149 26.0107 12.23 27.7618 12.6739 29.4172L26.0655 79.3503C26.5095 81.0057 27.5459 82.4298 28.9468 83.3094C30.3476 84.1889 31.9982 84.4519 33.5354 84.0404L68.3108 74.7307C69.848 74.3192 71.1458 73.2669 71.9188 71.8054C72.6919 70.3439 72.8767 68.5928 72.4328 66.9374L63.226 32.6084L37.0816 16.1933Z'
                        fill='#FEFDFD'
                      />
                      <path
                        d='M37.0816 16.1933L42.9404 38.039L63.226 32.6084'
                        fill='#FEFDFD'
                      />
                    </g>
                    <path
                      d='M37.0816 16.1933L16.7959 21.624C15.2587 22.0355 13.9609 23.0877 13.1879 24.5492C12.4149 26.0108 12.23 27.7618 12.6739 29.4172L26.0655 79.3504C26.5095 81.0058 27.5459 82.4299 28.9468 83.3094C30.3476 84.189 31.9982 84.4519 33.5354 84.0404L68.3108 74.7307C69.848 74.3192 71.1458 73.267 71.9188 71.8054C72.6919 70.3439 72.8767 68.5929 72.4328 66.9375L63.226 32.6084L37.0816 16.1933Z'
                      fill='url(#paint0_linear_947_91388)'
                    />
                    <path
                      d='M37.0816 16.1933L42.9404 38.0391L63.226 32.6084'
                      fill='#D2D2D2'
                    />
                    <g filter='url(#filter1_d_947_91388)'>
                      <path
                        d='M78.9044 10H57.9044C56.3131 10 54.7869 10.6808 53.6617 11.8926C52.5365 13.1045 51.9044 14.748 51.9044 16.4618V68.1564C51.9044 69.8702 52.5365 71.5138 53.6617 72.7256C54.7869 73.9375 56.3131 74.6183 57.9044 74.6183H93.9044C95.4957 74.6183 97.0218 73.9375 98.147 72.7256C99.2722 71.5138 99.9044 69.8702 99.9044 68.1564V32.6164L78.9044 10Z'
                        fill='#FEFDFD'
                      />
                      <path d='M78.9044 10V32.6164H99.9044' fill='#FEFDFD' />
                    </g>
                    <path
                      d='M78.9044 10H57.9044C56.3131 10 54.7869 10.6808 53.6617 11.8927C52.5365 13.1045 51.9044 14.7481 51.9044 16.4619V68.1565C51.9044 69.8702 52.5365 71.5138 53.6617 72.7257C54.7869 73.9375 56.3131 74.6183 57.9044 74.6183H93.9044C95.4957 74.6183 97.0218 73.9375 98.147 72.7257C99.2722 71.5138 99.9044 69.8702 99.9044 68.1565V32.6164L78.9044 10Z'
                      fill='url(#paint1_linear_947_91388)'
                    />
                    <path d='M78.9044 10V32.6164H99.9044' fill='#D2D2D2' />
                    <g filter='url(#filter2_d_947_91388)'>
                      <path
                        d='M121.103 16.9823L100.818 11.5516C99.2806 11.1401 97.6301 11.403 96.2292 12.2826C94.8283 13.1621 93.7919 14.5863 93.348 16.2416L79.9564 66.1748C79.5124 67.8302 79.6973 69.5812 80.4703 71.0428C81.2433 72.5043 82.5412 73.5565 84.0783 73.9681L118.854 83.2777C120.391 83.6892 122.041 83.4263 123.442 82.5467C124.843 81.6672 125.88 80.2431 126.324 78.5877L135.53 44.2587L121.103 16.9823Z'
                        fill='#FEFDFD'
                      />
                      <path
                        d='M121.103 16.9823L115.245 38.828L135.53 44.2587'
                        fill='#FEFDFD'
                      />
                    </g>
                    <path
                      d='M121.103 16.9823L100.818 11.5516C99.2806 11.1401 97.6301 11.4031 96.2292 12.2826C94.8283 13.1622 93.7919 14.5863 93.348 16.2417L79.9564 66.1748C79.5124 67.8302 79.6973 69.5813 80.4703 71.0428C81.2433 72.5043 82.5412 73.5566 84.0783 73.9681L118.854 83.2778C120.391 83.6893 122.041 83.4263 123.442 82.5468C124.843 81.6672 125.88 80.2431 126.324 78.5877L135.53 44.2587L121.103 16.9823Z'
                      fill='url(#paint2_linear_947_91388)'
                    />
                    <path
                      d='M121.103 16.9823L115.245 38.828L135.53 44.2587'
                      fill='#D2D2D2'
                    />
                    <circle cx='20' cy='15' r='5' fill='#E2E2E2' />
                    <circle cx='18' cy='109' r='7' fill='#E2E2E2' />
                    <circle cx='145' cy='35' r='7' fill='#E2E2E2' />
                    <circle cx='134' cy='8' r='4' fill='#E2E2E2' />
                    <g filter='url(#filter3_b_947_91388)'>
                      <rect
                        x='52'
                        y='62'
                        width='48'
                        height='48'
                        rx='24'
                        fill='#344054'
                        fill-opacity='0.4'
                      />
                      <path
                        d='M76 79V93M69 86H83'
                        stroke='white'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </g>
                    <defs>
                      <filter
                        id='filter0_d_947_91388'
                        x='10.4371'
                        y='15.1933'
                        width='64.2326'
                        height='72.037'
                        filterUnits='userSpaceOnUse'
                        color-interpolation-filters='sRGB'
                      >
                        <feFlood
                          flood-opacity='0'
                          result='BackgroundImageFix'
                        />
                        <feColorMatrix
                          in='SourceAlpha'
                          type='matrix'
                          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                          result='hardAlpha'
                        />
                        <feOffset dy='1' />
                        <feGaussianBlur stdDeviation='1' />
                        <feColorMatrix
                          type='matrix'
                          values='0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0'
                        />
                        <feBlend
                          mode='normal'
                          in2='BackgroundImageFix'
                          result='effect1_dropShadow_947_91388'
                        />
                        <feBlend
                          mode='normal'
                          in='SourceGraphic'
                          in2='effect1_dropShadow_947_91388'
                          result='shape'
                        />
                      </filter>
                      <filter
                        id='filter1_d_947_91388'
                        x='49.9044'
                        y='9'
                        width='52'
                        height='68.6183'
                        filterUnits='userSpaceOnUse'
                        color-interpolation-filters='sRGB'
                      >
                        <feFlood
                          flood-opacity='0'
                          result='BackgroundImageFix'
                        />
                        <feColorMatrix
                          in='SourceAlpha'
                          type='matrix'
                          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                          result='hardAlpha'
                        />
                        <feOffset dy='1' />
                        <feGaussianBlur stdDeviation='1' />
                        <feColorMatrix
                          type='matrix'
                          values='0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0'
                        />
                        <feBlend
                          mode='normal'
                          in2='BackgroundImageFix'
                          result='effect1_dropShadow_947_91388'
                        />
                        <feBlend
                          mode='normal'
                          in='SourceGraphic'
                          in2='effect1_dropShadow_947_91388'
                          result='shape'
                        />
                      </filter>
                      <filter
                        id='filter2_d_947_91388'
                        x='77.7195'
                        y='10.3616'
                        width='59.8109'
                        height='76.1061'
                        filterUnits='userSpaceOnUse'
                        color-interpolation-filters='sRGB'
                      >
                        <feFlood
                          flood-opacity='0'
                          result='BackgroundImageFix'
                        />
                        <feColorMatrix
                          in='SourceAlpha'
                          type='matrix'
                          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                          result='hardAlpha'
                        />
                        <feOffset dy='1' />
                        <feGaussianBlur stdDeviation='1' />
                        <feColorMatrix
                          type='matrix'
                          values='0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0'
                        />
                        <feBlend
                          mode='normal'
                          in2='BackgroundImageFix'
                          result='effect1_dropShadow_947_91388'
                        />
                        <feBlend
                          mode='normal'
                          in='SourceGraphic'
                          in2='effect1_dropShadow_947_91388'
                          result='shape'
                        />
                      </filter>
                      <filter
                        id='filter3_b_947_91388'
                        x='44'
                        y='54'
                        width='64'
                        height='64'
                        filterUnits='userSpaceOnUse'
                        color-interpolation-filters='sRGB'
                      >
                        <feFlood
                          flood-opacity='0'
                          result='BackgroundImageFix'
                        />
                        <feGaussianBlur
                          in='BackgroundImageFix'
                          stdDeviation='4'
                        />
                        <feComposite
                          in2='SourceAlpha'
                          operator='in'
                          result='effect1_backgroundBlur_947_91388'
                        />
                        <feBlend
                          mode='normal'
                          in='SourceGraphic'
                          in2='effect1_backgroundBlur_947_91388'
                          result='shape'
                        />
                      </filter>
                      <linearGradient
                        id='paint0_linear_947_91388'
                        x1='33.3196'
                        y1='75.9973'
                        x2='72.3853'
                        y2='26.6945'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stop-color='#E2E2E2' />
                        <stop
                          offset='0.350715'
                          stop-color='white'
                          stop-opacity='0'
                        />
                      </linearGradient>
                      <linearGradient
                        id='paint1_linear_947_91388'
                        x1='59.7794'
                        y1='66.7934'
                        x2='110.286'
                        y2='29.2761'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stop-color='#E2E2E2' />
                        <stop
                          offset='0.350715'
                          stop-color='white'
                          stop-opacity='0'
                        />
                      </linearGradient>
                      <linearGradient
                        id='paint2_linear_947_91388'
                        x1='87.9166'
                        y1='66.8947'
                        x2='146.428'
                        y2='43.7278'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stop-color='#E2E2E2' />
                        <stop
                          offset='0.350715'
                          stop-color='white'
                          stop-opacity='0'
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <h3 className='text-sm-semibold 2xl:text-md-semibold text-gray-900 text-center'>
                    Add Your First Department
                  </h3>
                  <p className='text-xs-regular 2xl:text-sm-regular text-gray-600 text-center max-w-[38ch]'>
                    Looks like you haven't added any departments yet. Click the
                    "Add Department" button to get started!
                  </p>
                </div>
                {/* Buttons */}
                <div className='w-full flex flex-row justify-between gap-3'>
                  <button
                    className='h-11 text-xs-semibold 2xl:text-sm-semibold text-gray-700 px-4 py-2.5 flex justify-center items-center flex-1 border border-gray-300 bg-white rounded-lg shadow-xs'
                    // onClick={}
                  >
                    Support article
                  </button>
                  <button
                    className='h-11 text-xs-semibold 2xl:text-sm-semibold text-white px-4 py-2.5 inline-flex gap-2 justify-center items-center flex-1 border border-primary-600 bg-primary-600 rounded-lg shadow-xs'
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedRow(false);
                      setShowDepartmentModal(true);
                    }}
                  >
                    <FiPlus className='w-4 2xl:w-5 h-auto text-white' />
                    <span>Add department</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DepartmentsTab;
