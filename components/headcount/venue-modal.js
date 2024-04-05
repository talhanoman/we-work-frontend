import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import DateCalender from '@/components/date-calender';
import ToastPopup from '@/components/toast/toast-popup';
import { addVenue } from '@/pages/api/post';
import Cookies from 'universal-cookie';
import CheckboxMultiSelectCombobox from '@/components/checkbox-multiselect-combobox';
import { FiPlus } from 'react-icons/fi';
import { updateVenue } from '@/pages/api/put';

const initial_form_data = {
  venue_name: '',
  venue_address: '',
  venue_code: '',
  venue_description: '',
  venueNameValid: false,
  venueAddressValid: false,
  venueIdValid: false,
  descriptionValid: false,
};

function VenueModal({
  showVenueModal,
  setShowVenueModal,
  editRowData,
  handleDataChange,
  getMyVenues,
}) {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const [toastData, setToastData] = useState(null);
  const [formData, setFormData] = useState(initial_form_data);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
      [`${name}Valid`]: value.length >= 1,
    });
  };

  async function handleAddVenue(e) {
    e.preventDefault();
    handleDataChange(formData);

    const venueDescription = formData.venue_description || '';
    const venueAddress = formData.venue_address || '';

    let res = await addVenue(
      token,
      formData.venue_name,
      formData.venue_code,
      venueAddress,
      venueDescription
    );
    console.log(res);

    let { valid } = res;
    if (valid) {
      getMyVenues();

      setToastData({
        type: 'success',
        message: 'Venue added successfully!',
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
    setShowVenueModal(false);
  }

  const addEditRowData = () => {
    setFormData({
      ...formData,
      ...editRowData,
    });
  };

  const handleUpdateVenue = async () => {
    const venueDescription = formData.venue_description || '';
    const venueAddress = formData.venue_address || '';

    const res = await updateVenue(
      formData.VenueGUID,
      formData.venue_name,
      formData.venue_code,
      venueAddress,
      venueDescription
    );
    const { valid } = res;
    if (valid) {
      getMyVenues();

      setToastData({
        type: 'success',
        message: 'Venue updates saved successfully!',
      });
      setTimeout(() => {
        handleReset();
        setToastData(null);
      }, 2000);
    } else {
      showToast('error', 'Oops, something went wrong. Please try again later.');
    }
  };
  useEffect(() => {
    addEditRowData();
  }, [editRowData, showVenueModal]);

  const handleReset = () => {
    setFormData(initial_form_data);
    setShowVenueModal(false);
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
    <Transition appear show={showVenueModal} as={Fragment}>
      <Dialog as='div' className='relative z-30' onClose={handleToast}>
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
                        {editRowData === false ? 'Add Venue' : 'Update Venue'}
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
                      {/* Venue name Row */}
                      <div className='w-full'>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='venue_name'
                        >
                          Venue name
                          <span className='text-primary-600'>*</span>
                          <div className='relative'>
                            <input
                              id='venue_name'
                              name='venue_name'
                              type='text'
                              value={formData.venue_name}
                              onChange={handleInputChange}
                              placeholder='Enter venue name'
                              required
                              className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                            />
                          </div>
                        </label>
                      </div>

                      {/* Venue Address Row */}
                      <div className='w-full'>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='venue_address'
                        >
                          Venue address
                          <div className='relative'>
                            <input
                              id='venue_address'
                              name='venue_address'
                              type='text'
                              value={formData.venue_address}
                              onChange={handleInputChange}
                              placeholder='Enter venue address'
                              required
                              className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                            />
                          </div>
                        </label>
                      </div>

                      {/* Venue id Row */}
                      <div className='w-full'>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='venue_code'
                        >
                          Venue ID
                          <span className='text-primary-600'>*</span>
                          <div className='relative'>
                            <input
                              id='venue_code'
                              name='venue_code'
                              type='text'
                              value={formData.venue_code}
                              onChange={handleInputChange}
                              placeholder='Enter venue Id'
                              required
                              className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                            />
                          </div>
                        </label>
                      </div>

                      {/* Description */}
                      <div>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='venue_description'
                        >
                          Description
                          <div className='relative mt-1.5 w-full'>
                            <textarea
                              name='venue_description'
                              id='venue_description'
                              value={formData.venue_description}
                              onChange={handleInputChange}
                              className='w-full h-32 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 shadow-xs focus:ring-1 focus:ring-primary-600 outline-none'
                            />

                            {formData.descriptionValid && (
                              <svg
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='absolute ml-2 top-3.5 right-3.5'
                              >
                                <rect
                                  x='0.5'
                                  y='0.5'
                                  width='15'
                                  height='15'
                                  rx='7.5'
                                  fill='#2F68D6'
                                />
                                <path
                                  d='M11.3332 5.5L6.74984 10.0833L4.6665 8'
                                  stroke='white'
                                  strokeWidth='1.66667'
                                  strokeLinecap='round'
                                  stroke-linejoin='round'
                                />
                                <rect
                                  x='0.5'
                                  y='0.5'
                                  width='15'
                                  height='15'
                                  rx='7.5'
                                  stroke='#2F68D6'
                                />
                              </svg>
                            )}
                          </div>
                        </label>
                      </div>

                      {/* Add another button */}
                      {/* <button className="flex items-center gap-2">
                        <FiPlus className="w-4 2xl:w-5 h-auto text-primary-700" />

                        <p className="text-xs-semibold 2xl:text-sm-semibold text-primary-700">
                          Add another
                        </p>
                      </button> */}
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
                            formData.venue_name?.length > 0 &&
                            formData.venue_code?.length > 0
                          )
                        }
                        onClick={handleAddVenue}
                      >
                        Add Venue
                      </button>
                    ) : (
                      <button
                        className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                        disabled={
                          !(
                            formData.venue_name?.length > 0 &&
                            formData.venue_code?.length > 0
                          )
                        }
                        onClick={handleUpdateVenue}
                      >
                        Update Venue
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

export default VenueModal;
