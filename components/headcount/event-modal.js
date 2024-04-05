import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import DateCalender from '@/components/date-calender';
import ToastPopup from '@/components/toast/toast-popup';
// import CheckboxMultiSelectCombobox from "@/components/checkbox-multiselect-combobox";
// import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Select from '../select';
import Cookies from 'universal-cookie';
import DateInput from '../talent/Forms/date-input';
import { addEvent } from '@/pages/api/post';
import { updateEvent } from '@/pages/api/put';

const initial_form_data = {
  event_name: '',
  start_date: '',
  end_date: '',
  venue_name: '',
};

const initial_date = {
  start_date: null,
  end_date: null,
};

function EventModal({
  showEventModal,
  setShowEventModal,
  editRowData,
  handleDataChange,
  venue_options,
  getMyEvents,
}) {
  const [selectedDate, setSelectedDate] = useState(initial_date);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [toastData, setToastData] = useState(null);
  const [formData, setFormData] = useState(initial_form_data);

  const [venueCrossSign, setVenueCrossSign] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleDateChange = (name, date) => {
    setSelectedDate({
      ...selectedDate,
      [name]: date,
    });

    setFormData({
      ...formData,
      [name]: date?.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      [`${name}Valid`]: date != undefined && toString(date).length > 0,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
      [`${name}Valid`]: value.length >= 1,
    });
  };

  const handleSelect = (option) => {
    setSelectedVenue(option);

    setFormData({
      ...formData,
      venue_name: option,
      venue_nameValid: option.length >= 1,
    });

    setVenueCrossSign(true);
  };

  const HandleResetVenueBox = () => {
    setSelectedVenue([]);
    setVenueCrossSign(false);
  };

  const handleReset = () => {
    setFormData(initial_form_data);
    setSelectedVenue([]);
    setSelectedDate(initial_date);
    setShowEventModal(false);
  };

  const handleAddEvent = async () => {
    console.log('Data', formData);
    const eventDescription = formData.event_description || '';
    const maxShifts = formData.max_shifts || '';

    let res = await addEvent(
      token,
      formData.event_name,
      formData.venue_name.value === undefined ? '' : formData.venue_name.value,
      formData.start_date,
      formData.end_date,
      eventDescription,
      maxShifts
    );

    let { valid } = res;
    if (valid) {
      getMyEvents();

      setToastData({
        type: 'success',
        message: 'Event added successfully!',
      });
      setTimeout(() => {
        handleReset();
        handleDataChange(formData);
        setToastData(null);
      }, 2000);
    } else {
      showToast('error', 'Oops, something went wrong. Please try again later.');
    }
  };

  const addEditRowData = () => {
    const startDateParts = editRowData?.start_date?.split(' ');
    const start_date =
      editRowData &&
      new Date(
        `${startDateParts[1]} ${startDateParts[0]} ${startDateParts[2]}`
      );

    const endDateParts = editRowData?.end_date?.split(' ');
    const end_date =
      editRowData &&
      new Date(`${endDateParts[1]} ${endDateParts[0]} ${endDateParts[2]}`);

    setSelectedDate({
      start_date: start_date,
      end_date: end_date,
    });

    editRowData &&
      setSelectedVenue({
        value: editRowData?.venue_guid,
        label: editRowData?.venue_name,
      });

    setFormData({
      ...formData,
      ...editRowData,
    });
  };

  useEffect(() => {
    if (editRowData === false) {
      setFormData(initial_form_data);
      setSelectedDate(initial_date);
      setSelectedVenue([]);
      return;
    }
    addEditRowData();
  }, [showEventModal]);

  const handleUpdateEvent = async () => {
    const eventDescription = formData.event_description || '';
    const maxShifts = formData.max_shifts || '';

    const res = await updateEvent(
      editRowData.event_guid,
      formData.event_name,
      editRowData.event_code,
      formData.start_date,
      formData.end_date,
      eventDescription,
      maxShifts,
      formData.venue_name.value === undefined
        ? editRowData.venue_guid
        : formData.venue_name.value
    );

    const { valid } = res;
    if (valid) {
      getMyEvents();

      setToastData({
        type: 'success',
        message: 'Event updates saved successfully!',
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

  console.log('editRow', editRowData);
  console.log('formData', formData);

  return (
    <Transition appear show={showEventModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-30'
        onClose={() => {
         setShowEventModal(false);
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
                        {editRowData === false ? 'Add Event' : 'Update Event'}
                      </Dialog.Title>
                      <Dialog.Description
                        as='p'
                        className='text-xs-regular 2xl:text-sm-regular text-gray-500'
                      >
                        Your new project has been created. Invite colleagues to
                        collaborate on this project.
                      </Dialog.Description>
                    </div>

                    <div className='space-y-3'>
                      {/* Event Name Row */}
                      <div className='w-full'>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='event_name*'
                        >
                          Event name
                          <span className='text-primary-600'>*</span>
                          <div className='relative'>
                            <input
                              id='event_name'
                              name='event_name'
                              type='text'
                              value={formData.event_name}
                              onChange={handleInputChange}
                              placeholder='Enter event name'
                              required
                              className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                            />
                          </div>
                        </label>
                      </div>

                      <div className='flex gap-3'>
                        <DateInput
                          width={'w-full'}
                          id={'start_date'}
                          title={'Start date'}
                          selectedDate={selectedDate.start_date}
                          onSelect={handleDateChange}
                          minDate={null}
                          maxDate={null}
                        />
                        <DateInput
                          width={'w-full'}
                          id={'end_date'}
                          title={'End date'}
                          selectedDate={selectedDate.end_date}
                          onSelect={handleDateChange}
                          minDate={selectedDate.start_date || null}
                          maxDate={null}
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='event_description'
                        >
                          Description
                          <div className='relative mt-1.5 w-full'>
                            <textarea
                              name='event_description'
                              id='event_description'
                              value={formData.event_description}
                              onChange={handleInputChange}
                              className='w-full h-32 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 shadow-xs focus:ring-1 focus:ring-primary-600 outline-none'
                            />
                          </div>
                        </label>
                      </div>

                      {/* Description */}
                      <div>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='function_description'
                        >
                          Maximum number of shifts (volunteer specific)
                          <div className='relative mt-1.5 w-full'>
                            <input
                              type='number'
                              name='max_shifts'
                              id='max_shifts'
                              value={formData.max_shifts}
                              onChange={handleInputChange}
                              className='w-full block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 shadow-xs focus:ring-1 focus:ring-primary-600 outline-none'
                            />
                          </div>
                        </label>
                      </div>

                      {/* Venue Name Row */}
                      <div className='w-full'>
                        <label
                          className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                          htmlFor='venue_name'
                        >
                          Venue name
                        </label>
                        <div className='flex relative'>
                          <Select
                            panelPosition={'w-full bottom-11 mb-1'}
                            options={venue_options}
                            selectedOption={selectedVenue}
                            onSelect={handleSelect}
                            placeholder={'Venue name'}
                          />
                          <div
                            className={`absolute right-10 top-2.5 ${
                              venueCrossSign ? '' : 'hidden'
                            }`}
                          >
                            <button
                              onClick={HandleResetVenueBox}
                              class='w-6 h-6 bg-[#2f68d6] text-white rounded-full focus:outline-none'
                            >
                              <span class='text-sm'>x</span>
                            </button>
                          </div>
                        </div>
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
                    {editRowData === false ? (
                      <button
                        disabled={
                          !(
                            formData.event_name?.length > 0 &&
                            formData.start_date?.length > 0 &&
                            formData.end_date?.length > 0
                          )
                        }
                        className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                        onClick={handleAddEvent}
                      >
                        Add event
                      </button>
                    ) : (
                      <button
                        disabled={
                          !(
                            formData.event_name?.length > 0 &&
                            formData.start_date?.length > 0 &&
                            formData.end_date?.length > 0
                          )
                        }
                        className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                        onClick={handleUpdateEvent}
                      >
                        Update event
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

export default EventModal;
