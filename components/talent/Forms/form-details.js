// FormComponent.js

import React from 'react';
import Select from '../../select';
import DateInput from '@/components/talent/Forms/date-input';
import Image from 'next/image';

const FormDetails = ({
  event_options,
  selectedOption,
  HandleSelect,
  workforce_type_options,
  selectedDate,
  HandleDateChange,
  router,
  setShowNameModal,
}) => {
  return (
    <div className='p-8'>
              <div className='p-8'>
                  <div className='flex items-center space-x-15 mb-6'>
                    <span className='mr-4'>
                      <Image
                        alt='No image'
                        className='rounded-full'
                        src={'/images/TM_form-icon.png'}
                        width={40}
                        height={40}
                      />
                    </span>
                    <p className='text-black text-base font-semibold'>
                      Create Form
                    </p>
                  </div>
                  <div className='w-full'>
                    <div className='space-y-4'>
                      <div className='flex justify-between gap-4 mb-6'>
                        {/* Select event Row */}
                        <div className='w-1/2'>
                          <label
                            className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                            htmlFor='event'
                          >
                            Select event
                            <span className='text-primary-600'>*</span>
                          </label>
                          <Select
                            options={event_options}
                            selectedOption={selectedOption.event}
                            onSelect={(value) => HandleSelect('event', value)}
                            placeholder={'Please choose an option'}
                          />
                        </div>
                        {/* Select workforce type and role Row */}
                        <div className='w-1/2'>
                          <label
                            className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                            htmlFor='workforceType'
                          >
                            Select workforce type
                            <span className='text-primary-600'>*</span>
                          </label>
                          <Select
                            options={workforce_type_options}
                            selectedOption={selectedOption.workforceType}
                            onSelect={(value) =>
                              HandleSelect('workforceType', value)
                            }
                            placeholder={'Please choose an option'}
                          />
                        </div>
                      </div>

                      <div className='flex justify-between gap-4 mb-6'>
                        {/* Select Date Row */}
                        <div className='w-1/2'>
                          <DateInput
                            id={'startDate'}
                            title={'Start Date'}
                            selectedDate={selectedDate.startDate}
                            onSelect={HandleDateChange}
                          />
                        </div>
                        {/* Select Date Row */}
                        <div className='w-1/2'>
                          <DateInput
                            id={'endDate'}
                            title={'End Date'}
                            selectedDate={selectedDate.endDate}
                            onSelect={HandleDateChange}
                          />
                        </div>
                      </div>

                      <div className='flex justify-end'>
                        <div className='w-1/2'>
                          <div className='flex justify-between gap-3'>
                            <button
                              typeof='button'
                              className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs'
                              onClick={() => {
                                router.push('/talent/forms');
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              type='button'
                              className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white p-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                              onClick={(e) => {
                                setShowNameModal(true);
                              }}
                            >
                              Save as Template
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    </div>
  );
};

export default FormDetails;
