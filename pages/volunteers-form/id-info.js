import React, { useState } from 'react';
import CandidateSignupFooter from '@/components/candidate-signup-footer';
// import ProgressCard from "@/components/progress-card";
import { useRouter } from 'next/router';
import ProgressBar from '@/components/progress-bar';
import Logo from '@/components/logo';
import Select from '@/components/select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import DateInput from '@/components/talent/Forms/date-input';

const id_type_options = [
  { label: 'Passport', value: 'passport' },
  { label: 'Emirates ID', value: 'emirates id' },
];

const initial_form_data = {
  idType: '',
  idNumber: '',
  expirationDate: '',
  idTypeValid: false,
  idNumberValid: false,
  expirationDateValid: false,
};

export default function Address() {
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState(initial_form_data);
  const router = useRouter();

  const handleSelect = (option) => {
    setSelectedOption(option);

    setFormData({
      ...formData,
      idType: option?.value,
      idTypeValid: option?.value?.length >= 1,
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    setFormData({
      ...formData,
      idNumber: value,
      idNumberValid: value.length >= 1,
    });
  };

  const handleDateChange = (_, date) => {
    setSelectedDate(date);

    setFormData({
      ...formData,
      expirationDate: date?.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      expirationDateValid: date != undefined && toString(date).length > 0,
    });
  };

  return (
    <div className='flex h-screen bg-white justify-center'>
      {/* Left Section */}
      {/* <div className="w-4/12">
        <ProgressCard progress={4} />
      </div> */}

      {/* Right Section */}
      <div className='relative w-8/12 flex flex-col bg-white'>
        {/* Logo */}
        <Logo
          src={'crowd-work-vertical-logo'}
          alt={'Company Logo'}
          className={'relative mt-6 custom-height-mq:h-[60px] sm:h-[94px]'}
        />
        {/* Id Info */}
        <div className='w-full h-screen max-w-[512px] mx-auto flex flex-col justify-center gap-y-8'>
          <div className='space-y-3'>
            <h1 className='text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900'>
              Please provide your{' '}
              <span className='text-primary-700'>ID information</span>.
            </h1>
            <p className='text-sm-regular 2xl:text-md-regular text-gray-700'>
              This information is necessary for security purposes.
            </p>
          </div>

          <div className='space-y-6'>
            {/* Form */}
            <form action='' className='space-y-6'>
              {/* Id type Row */}
              <div className='w-full'>
                <label
                  className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                  htmlFor='idType'
                >
                  ID type<span className='text-primary-600'>*</span>
                </label>
                <Select
                  options={id_type_options}
                  selectedOption={selectedOption}
                  onSelect={handleSelect}
                  placeholder={'Please choose an option'}
                />
              </div>

              {/* Id number and Expiration date Row */}
              <div className='w-full flex justify-between gap-6'>
                <div className='w-full'>
                  <label
                    className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                    htmlFor='idNumber'
                  >
                    ID number<span className='text-primary-600'>*</span>
                  </label>
                  <input
                    id='idNumber'
                    name='idNumber'
                    type='text'
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    placeholder='123-45-6789'
                    className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
                  />
                </div>
                <DateInput
                  width={'max-w-[174px] w-full'}
                  id={'expirationDate'}
                  title={'Expiration date'}
                  selectedDate={selectedDate}
                  onSelect={handleDateChange}
                />
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
                disabled={
                  !(
                    formData.idTypeValid &&
                    formData.idNumberValid &&
                    formData.expirationDateValid
                  )
                }
                onClick={() =>
                  router.push('/volunteers-form/first-aid-certificates-choice')
                }
              >
                Continue
              </button>
            </div>
          </div>

          <ProgressBar progress={45} width='w-full max-w-[320px] mx-auto' />
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
