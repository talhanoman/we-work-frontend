import React, { useState } from 'react';
import CandidateSignupFooter from '@/components/candidate-signup-footer';
import { useRouter } from 'next/router';
import ProgressBar from '@/components/progress-bar';
import Logo from '@/components/logo';

const initial_form_data = {
  firstName: '',
  lastName: '',
  firstNameValid: false,
  lastNameValid: false,
};

export default function TermsAndConditions() {
  const [formData, setFormData] = useState(initial_form_data);
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
      [`${name}Valid`]: value.length >= 1,
    });
  };

  return (
    <div className='flex h-screen bg-white justify-center'>
      <div className='relative w-8/12 flex flex-col bg-white'>
        {/* Logo */}
        <Logo
          src={'crowd-work-vertical-logo'}
          alt={'Company Logo'}
          className={'relative mt-6 custom-height-mq:h-[60px] sm:h-[94px]'}
        />
        {/* Name */}
        <div className='w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8'>
          <div className='space-y-3'>
            <h1 className='text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900'>
              What's your <span className='text-primary-700'>name</span>?
            </h1>
            <p className='text-sm-regular 2xl:text-md-regular text-gray-700'>
              We'd love to get to know you better.
            </p>
          </div>

          <div className='space-y-6'>
            {/* Form */}
            <form action='' className='space-y-6'>
              {/* First Name Row */}
              <div className='w-full'>
                <label
                  className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                  htmlFor='firstName'
                >
                  First name<span className='text-primary-600'>*</span>
                  <div className='relative'>
                    <input
                      id='firstName'
                      name='firstName'
                      type='text'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder='First name'
                      required
                      className={`w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                    />
                    {formData.firstNameValid && (
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

              {/* Last Name Row */}
              <div className='w-full'>
                <label
                  className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                  htmlFor='lastName'
                >
                  Last name<span className='text-primary-600'>*</span>
                  <div className='relative'>
                    <input
                      id='lastName'
                      name='lastName'
                      type='text'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder='Last name'
                      required
                      className={`w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                    />
                    {formData.lastNameValid && (
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
            </form>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row sm:justify-between gap-3'>
              <button
                className='w-full h-11 flex justify-center items-center flex-1 order-2 sm:order-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs'
                onClick={() => router.back()}
              >
                Back
              </button>
              <button
                className='h-11 py-2.5 flex justify-center items-center flex-1 order-1 sm:order-2 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 text-white rounded-lg disabled:pointer-events-none disabled:opacity-75 shadow-xs'
                disabled={!(formData.firstNameValid && formData.lastNameValid)}
                onClick={() => router.push('/volunteers-form/email-address')}
              >
                Continue
              </button>
            </div>
          </div>

          <ProgressBar progress={15} width='w-full max-w-[320px] mx-auto' />
        </div>
      </div>
      {/* Footer */}
      <CandidateSignupFooter
        company={'© Weteck Events Ltd. 2024'}
        email_id={'hello@crowdedevents.com'}
      />
    </div>
  );
}
