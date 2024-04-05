import { Fragment, useEffect, useState } from 'react';
import { addDepartment } from '@/pages/api/post';
import Cookies from 'universal-cookie';
import Select from '../select';
import { Dialog, Transition } from '@headlessui/react';
import ToastPopup from '@/components/toast/toast-popup';
import { updateDepartment } from '@/pages/api/put';
import { useRouter } from 'next/router';

const venue_names_options = [
  { value: 'Central Park Amphitheater' }, 
  { value: 'Zaman Park, Lahore' },
  { value: 'Centauras Mall, Islamabad' },
  { value: 'Diamond Mall, Lahore' },
];

const initial_selected_options = { 
  event: [],
};

const initial_form_data = {
  departmentName: '',
  departmentId: '',
  selectedDate: '',
  description: '',
  venueName: '',
  event_name: '',
  eventNameValid: false,
  selectedDateValid: false,
  descriptionValid: false,
  venueNameValid: false,
};

const initial_date = [
  {
    startDate: new Date(),
    endDate: null,
    key: 'selection',
  },
];

function DepartmentModal({
  showDepartmentModal,
  setShowDepartmentModal,
  editRowData,
  handleDataChange,
  getMyDepartments,
  event_options,
}) {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const [selectedEvent, setSelectedEvent] = useState([]);
  const [toastData, setToastData] = useState(null);
  const [formData, setFormData] = useState(initial_form_data);

  const [departmentName, setDepartmentName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departmentDesc, setDepartmentDesc] = useState('');

  const router = useRouter();
  const query = router?.query;
  let row_click = false;
  let event_guid = null;
  if (query.item !== undefined) {
    event_guid = JSON.parse(query.item).event_guid;
    row_click = true;
  }

  const handleDate = (date) => {
    setDateRange(date);
  };

  function addDateInfo() {
    // setFormData(editRowData)
    setDepartmentName(editRowData.department_name);
    setDepartmentId(editRowData.department_code);
  }

  useEffect(() => {
    if (editRowData === false) {
      setDepartmentName('');
      setDepartmentId('');
      setSelectedEvent([]);
      return;
    }
    addDateInfo();
    addEditRowData();
    console.log('Dept Row', editRowData);
  }, [editRowData, showDepartmentModal]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
      [`${name}Valid`]: value.length >= 1,
    });
  };

  const handleSelect = (option) => {
    setSelectedEvent(option);

    setFormData({
      ...formData,
      event_name: option,
      event_nameValid: option.length >= 1,
    });
  };

  async function handleAddEvent(e) {
    e.preventDefault();

    handleDataChange(formData);

    let res = await addDepartment(
      token,
      departmentName,
      departmentId,
      formData.event_name?.value == null
        ? event_guid
        : formData.event_name.value
    );

    let { valid } = res;
    if (valid) {
      getMyDepartments();

      setToastData({
        type: 'success',
        message: 'Department added successfully!',
      });
      setTimeout(() => {
        handleReset();
        setToastData(null);
      }, 2000);
    } else {
      showToast('error', 'Oops, something went wrong. Please try again later.');
    }
  }

  function handleToast() {
    setToastData(null);
  }

  const addEditRowData = () => {
    editRowData &&
      setSelectedEvent({
        value: editRowData?.event_guid,
        label: editRowData?.event_name,
      });

    setFormData({
      ...formData,
      ...editRowData,
    });
  };

  const handleReset = () => {
    setShowDepartmentModal(false);
    setFormData(initial_form_data);
    setSelectedEvent([]);
    // setSelectedVenue([]);
    // setDateRange(initial_date);
  };

  console.log('editRow', editRowData);
  console.log('formData', formData);

  const handleUpdate = async () => {
    const res = await updateDepartment(
      editRowData.department_guid,
      departmentName,
      departmentId,
      formData.event_name.value === undefined
        ? editRowData?.event_guid
        : formData.event_name.value
    );
    const { valid } = res;
    if (valid) {
      getMyDepartments();

      setToastData({
        type: 'success',
        message: 'Department updates saved successfully!',
      });
      setTimeout(() => {
        handleReset();
        setToastData(null);
      }, 2000);
    } else {
      showToast('error', 'Oops, something went wrong. Please try again later.');
    }
  };

  const showToast = (type, message) => {
    setToastData({ type, message });

    setTimeout(() => {
      setToastData(null);
    }, 2000);
  };

  return (
    <Transition appear show={showDepartmentModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-30'
        onClose={() => {
          setShowDepartmentModal(false);
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
              <Dialog.Panel className='w-full max-w-[480px] transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
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
                        Add Department
                      </Dialog.Title>
                      <Dialog.Description
                        as='p'
                        className='text-xs-regular 2xl:text-sm-regular text-gray-500'
                      >
                        Your new function has been created.
                      </Dialog.Description>
                    </div>

                    <div className='space-y-3'>
                      {/* Event Name Row */}
                      <div className='w-full'>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='eventName*'
                        >
                          Department name
                          <span className='text-primary-600'>*</span>
                          <div className='relative'>
                            <input
                              id='eventName'
                              name='eventName'
                              type='text'
                              value={departmentName}
                              onChange={(e) => {
                                setDepartmentName(e.target.value);
                              }}
                              placeholder='Enter department name'
                              required
                              className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                            />
                          </div>
                        </label>
                      </div>

                      <div className='w-full'>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='eventName*'
                        >
                          Department ID
                          <span className='text-primary-600'>*</span>
                          <div className='relative'>
                            <input
                              id='eventName'
                              name='eventName'
                              type='text'
                              value={departmentId}
                              onChange={(e) => {
                                setDepartmentId(e.target.value);
                              }}
                              placeholder='Enter department ID'
                              required
                              className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                            />
                          </div>
                        </label>
                      </div>

                      {/* Select event Row */}
                      {!row_click && (
                        <div className='w-full'>
                          <label
                            className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                            htmlFor='event'
                          >
                            Select Event
                            <span className='text-primary-600'>*</span>
                          </label>
                          <Select
                            panelPosition={'w-full bottom-11 mb-1'}
                            options={event_options}
                            selectedOption={selectedEvent}
                            onSelect={handleSelect}
                            placeholder={'Please choose an option'}
                          />
                        </div>
                      )}

                      {/* Select Date Row */}
                      {/* <div className="w-full relative">
                        <label
                          className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                          htmlFor="eventDate"
                        >
                          Event date
                          <span className="text-primary-600">*</span>
                          <div className="relative">
                            <div
                              className="relative"
                              onClick={() => setCalendarOpen(!calendarOpen)}
                            >
                              <input
                                id="eventDate"
                                name="eventDate"
                                type="text"
                                required
                                placeholder="Select event date..."
                                value={`${start_date} - ${end_date || "..."}`}
                                readOnly={true}
                                onClick={() => (
                                  <DateCalender
                                    dateRange={dateRange}
                                    setDateRange={handleDate}
                                  />
                                )}
                                className="w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 bg-white mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500"
                              />

                              {formData.selectedDateValid && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="absolute ml-2 top-3.5 right-3.5"
                                >
                                  <rect
                                    x="0.5"
                                    y="0.5"
                                    width="15"
                                    height="15"
                                    rx="7.5"
                                    fill="#2F68D6"
                                  />
                                  <path
                                    d="M11.3332 5.5L6.74984 10.0833L4.6665 8"
                                    stroke="white"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <rect
                                    x="0.5"
                                    y="0.5"
                                    width="15"
                                    height="15"
                                    rx="7.5"
                                    stroke="#2F68D6"
                                  />
                                </svg>
                              )}
                            </div>
                            {calendarOpen && (
                              <DateCalender
                                dateRange={dateRange}
                                setDateRange={handleDate}
                                onClose={() => setCalendarOpen(false)}
                              />
                            )}
                          </div>
                        </label>
                      </div> */}

                      {/* Description */}
                      {/* <div>
                        <label
                          className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                          htmlFor="description"
                        >
                          Description<span className="text-primary-600">*</span>
                          <div className="relative mt-1.5 w-full">
                            <textarea
                              name="description"
                              id="description"
                              value={departmentDesc}
                              onChange={(e) => { setDepartmentDesc(e.target.value) }}
                              className="w-full h-32 block rounded-lg text-sm-regular 2xl:text-md-regular text-gray-900 border border-gray-300 shadow-xs focus:ring-1 focus:ring-primary-600 outline-none"
                            />

                            {formData.descriptionValid && (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute ml-2 top-3.5 right-3.5"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="15"
                                  height="15"
                                  rx="7.5"
                                  fill="#2F68D6"
                                />
                                <path
                                  d="M11.3332 5.5L6.74984 10.0833L4.6665 8"
                                  stroke="white"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  stroke-linejoin="round"
                                />
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="15"
                                  height="15"
                                  rx="7.5"
                                  stroke="#2F68D6"
                                />
                              </svg>
                            )}
                          </div>
                        </label>
                      </div> */}

                      {/* Venue Name Row */}
                      {/* <div className="w-full">
                        <label
                          className="block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5"
                          htmlFor="venueName"
                        >
                          Venue name<span className="text-primary-600">*</span>
                        </label>
                        <Select
                          panelPosition={"w-full bottom-11 mb-1"}
                          options={venue_names_options}
                          selectedOption={selectedVenue}
                          onSelect={handleSelect}
                          placeholder={"Venue name"}
                        />
                      </div> */}
                    </div>
                  </div>

                  <div className='flex justify-between gap-3'>
                    <button
                      className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs'
                      onClick={handleReset}
                    >
                      Cancel
                    </button>
                    {editRowData === false ? (
                      <button
                        className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                        disabled={
                          !(
                            departmentName?.length > 0 &&
                            departmentId?.length > 0
                          )
                        }
                        onClick={handleAddEvent}
                      >
                        Add department
                      </button>
                    ) : (
                      <button
                        className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                        disabled={
                          !(
                            departmentName?.length > 0 &&
                            departmentId?.length > 0
                          )
                        }
                        onClick={handleUpdate}
                      >
                        Update department
                      </button>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>

        {/* Toast */}
        {toastData && (
          <ToastPopup toastType={toastData.type} message={toastData.message} />
        )}
      </Dialog>
    </Transition>
  );
}

export default DepartmentModal;
