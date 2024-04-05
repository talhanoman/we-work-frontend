import React, { useEffect, useState } from 'react';
import CandidateSignupFooter from '@/components/candidate-signup-footer';
import { useRouter } from 'next/router';
import ProgressBar from '@/components/progress-bar';
import Logo from '@/components/logo';
import Select from '@/components/select';
import ProgressCardProfessionals from '@/components/progress-card-professionals';

const gender_options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonbinary', label: 'Nonbinary' },
  { value: 'prefer to self-describe', label: 'Prefer to self-describe' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

const initial_form_data = {
  gender: '',
  other: '',
  genderValid: false,
  otherValid: false,
};

export default function Gender() {
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherInput, setOtherInput] = useState(false);
  const [formData, setFormData] = useState(initial_form_data);
  const router = useRouter();

  const handleSelect = (option) => {
    setSelectedOption(option);

    if (option?.value?.toLowerCase() == 'prefer to self-describe') {
      setOtherInput(true);
    } else {
      setOtherInput(false);
    }

    setFormData({
      ...formData,
      gender: option?.value,
      genderValid: option?.value?.length >= 1,
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    setFormData({
      ...formData,
      other: value,
      otherValid: value.length >= 1,
    });
  };

  useEffect(() => {
    if (!otherInput) {
      setFormData({
        ...formData,
        other: '',
        otherValid: false,
      });
    }
  }, [otherInput, setOtherInput]);

  console.log(formData);

  return (
    <div className='flex h-screen bg-gray-800'>
      {/* Left Section */}
      <div className='w-4/12'>
        {/* Nav featured card */}
        <ProgressCardProfessionals progress={3} />
      </div>

      {/* Right Section */}
      <div className='relative w-8/12 flex flex-col bg-white rounded-l-[40px]'>
        {/* Logo */}
        <Logo
          src={'crowd-work-vertical-logo'}
          alt={'Company Logo'}
          className={
            'absolute left-0 top-8 custom-height-mq:h-[60px] sm:h-[94px]'
          }
        />
        {/* Gender */}
        <div className='w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8'>
          <div className='space-y-3'>
            <h1 className='text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900'>
              What <span className='text-primary-700'>gender</span> do you
              identify with most?
            </h1>
            <p className='text-sm-regular 2xl:text-md-regular text-gray-700'>
              We want to make sure we address you correctly.
            </p>
          </div>

          <div className='space-y-6'>
            {/* Form */}
            <form action='' className='space-y-6'>
              <div className='w-full'>
                <label
                  className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                  htmlFor='gender'
                >
                  Gender<span className='text-primary-600'>*</span>
                </label>
                <Select
                  options={gender_options}
                  selectedOption={selectedOption}
                  onSelect={handleSelect}
                  placeholder={'Please choose an option'}
                />
              </div>

              {otherInput && (
                <div className='w-full'>
                  <label
                    className='text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only'
                    htmlFor='other'
                  >
                    other
                    <span className='text-primary-600'>*</span>
                  </label>
                  <input
                    id='other'
                    name='other'
                    type='text'
                    value={formData.other}
                    onChange={handleInputChange}
                    placeholder='Other'
                    className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
                  />
                </div>
              )}
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
                disabled={
                  !(
                    formData.genderValid &&
                    (otherInput ? formData.otherValid : true)
                  )
                }
                onClick={() => router.push('/professionals-form/nationality')}
              >
                Continue
              </button>
            </div>
          </div>

          <ProgressBar progress={50} width='w-full max-w-[320px] mx-auto' />
        </div>

        {/* Footer */}
        <CandidateSignupFooter
          company={'© Weteck Events Ltd. 2024'}
          email_id={'hello@crowdedevents.com'}
        />
      </div>
    </div>
  );
}
