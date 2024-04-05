import { useEffect, useState } from 'react';
import DateCalender from '@/components/date-calender';
import ToastPopup from '@/components/toast/toast-popup';
import Cookies from 'universal-cookie';
import Select from '../select';
import { addPosition } from '@/pages/api/post';
import { updatePosition } from '@/pages/api/put';
import { FiAlertCircle, FiHelpCircle } from 'react-icons/fi';
import PositionsCalendar from './Positions-Calendar';

const workforce_type_options = [
  { value: 'Paid staff', label: 'Paid staff' },
  { value: 'Contractor', label: 'Contractor' },
  { value: 'Volunteer', label: 'Volunteer' },
];

const initial_form_data = {
  position: '',
  event: '',
  department: '',
  function: '',
  workforceType: '',
  role: '',
  reportsTo: '',
  venue: '',
  startDate: '',
  endDate: '',
  shift_per_day: '',
  total_demand: '',
  peak_day: '',
  multiplier: '',
  peak_shift: '',
  positionValid: false,
  eventValid: false,
  departmentValid: false,
  functionValid: false,
  workforceTypeValid: false,
  roleValid: false,
  reportsToValid: false,
  venueValid: false,
  startDateValid: false,
  endDateValid: false,
  shift_per_dayValid: false,
  total_demandValid: false,
  peak_shiftValid: false,
};

const initial_selected_options = {
  event: [],
  department: [],
  function: [],
  workforceType: [],
  role: [],
  reportsTo: [],
  venue: [],
};

const initial_date = [
  {
    startDate: new Date(),
    endDate: null,
    key: 'selection',
  },
];

let role_options;

function AddPosition({
  showPositionModal,
  setShowPositionModal,
  editRowData,
  handleDataChange,
  venue_options,
  functions,
  roles,
  events,
  departments,
  event_options,
  reports_to_options,
  getMyPositions,
}) {
  const [selectedOption, setSelectedOption] = useState(
    initial_selected_options
  );
  const [dateRange, setDateRange] = useState(initial_date);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [toastData, setToastData] = useState(null);
  const [formData, setFormData] = useState(initial_form_data);

  const [roleOptionsBackup, setRoleOptionsBackup] = useState([]);

  const [isVolunteerForCalendarCheck, setIsVolunteerForCalendarCheck] =
    useState(false);

  const [calculationText, setCalculationText] = useState(false);

  const [showTable, setShowTable] = useState(false);

  let cookie = new Cookies();
  let token = cookie.get('token');

  const department_options = departments
    ?.filter((func) => func?.event_name == selectedOption?.event?.label)
    ?.sort((a, b) => a.department_name.localeCompare(b.department_name))
    ?.map((filterFunc) => ({
      value: filterFunc.department_guid,
      label: filterFunc.department_name,
    }));
  const function_options = functions
    ?.filter(
      (func) => func?.department_name == selectedOption?.department?.label
    )
    ?.sort((a, b) => a.function_name.localeCompare(b.function_name))
    ?.map((filterFunc) => ({
      value: filterFunc.function_guid,
      label: filterFunc.function_name,
    }));

  const handleSelect = (name, option) => {
    if (name == 'workforceType') {
      setSelectedOption((prevValues) => ({
        ...prevValues,
        [name]: option,
        role: [],
        reportsTo: [],
        venue: [],
      }));

      setFormData({
        ...formData,
        [name]: option?.value,
        [`${name}Valid`]: option?.value?.length >= 1,
        role: [],
        reportsTo: [],
        venue: [],
        roleValid: false,
        reportsToValid: false,
      });
    } else if (name == 'event') {
      setSelectedOption(() => ({
        department: [],
        function: [],
        workforceType: [],
        role: [],
        reportsTo: [],
        venue: [],
        [name]: option,
      }));

      setDateRange(initial_date);

      setFormData({
        ...formData,
        department: [],
        function: [],
        workforceType: [],
        role: [],
        reportsTo: [],
        venue: [],
        [name]: option?.value,
        [`${name}Valid`]: option?.value?.length >= 1,
      });
    } else if (name == 'department') {
      setSelectedOption((prevValues) => ({
        ...prevValues,
        function: [],
        workforceType: [],
        role: [],
        reportsTo: [],
        venue: [],
        [name]: option,
      }));

      setFormData({
        ...formData,
        function: [],
        workforceType: [],
        role: [],
        reportsTo: [],
        venue: [],
        [name]: option?.value,
        [`${name}Valid`]: option?.value?.length >= 1,
      });
    } else if (name == 'function') {
      setSelectedOption((prevValues) => ({
        ...prevValues,
        workforceType: [],
        role: [],
        reportsTo: [],
        venue: [],
        [name]: option,
      }));

      setFormData({
        ...formData,
        workforceType: [],
        role: [],
        reportsTo: [],
        venue: [],
        [name]: option?.value,
        [`${name}Valid`]: option?.value?.length >= 1,
      });
    } else if (name == 'role') {
      setSelectedOption((prevValues) => ({
        ...prevValues,
        reportsTo: [],
        venue: [],
        [name]: option,
      }));

      setFormData({
        ...formData,
        reportsTo: [],
        venue: [],
        [name]: option?.value,
        [`${name}Valid`]: option?.value?.length >= 1,
      });
    } else if (name == 'reportsTo') {
      setSelectedOption((prevValues) => ({
        ...prevValues,
        venue: [],
        [name]: option,
      }));

      setFormData({
        ...formData,
        venue: [],
        [name]: option?.value,
        [`${name}Valid`]: option?.value?.length >= 1,
      });
    } else if (name == 'venue') {
      setSelectedOption((prevValues) => ({
        ...prevValues,
        [name]: option,
      }));

      setFormData({
        ...formData,
        [name]: option?.value,
        [`${name}Valid`]: option?.value?.length >= 1,
      });
    }
  };

  const handleDate = (date) => {
    setDateRange(date);
  };

  const start_date = dateRange[0]?.startDate?.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const end_date = dateRange[0]?.endDate?.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    const selectedEvent = events?.filter(
      (event) => event.event_guid == selectedOption.event.value
    );
    const isOutOfRange = !(
      new Date(start_date) >= new Date(selectedEvent[0]?.start_date) &&
      new Date(end_date) <= new Date(selectedEvent[0]?.end_date)
    );
    if (selectedOption.event.value && end_date && isOutOfRange) {
      showToast('warning', 'Date is out of range');
    }
    console.log(selectedEvent, 'selectedEvent');
    console.log(isOutOfRange, 'isOutofrange');
  }, [selectedOption.event, dateRange]);
  console.log(events);

  function addDateInfo() {
    setFormData({
      ...formData,
      startDate: `${start_date}`,
      endDate: `${end_date}`,
      startDateValid: true,
      endDateValid: !(end_date === undefined),
    });
  }

  useEffect(() => {
    addDateInfo();
  }, [start_date, end_date, editRowData, showPositionModal]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name == 'position') {
      setFormData({
        ...formData,
        [name]: value,
        [`${name}Valid`]: value.length >= 1,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        [`${name}Valid`]: /^[0-9\b]+$/.test(value),
      });
    }
  };

  async function handleAddEvent(e) {
    e.preventDefault();
    handleDataChange(formData);

    if (parseInt(formData.peak_shift) < parseInt(formData.total_demand)) {
      if (editRowData === false) {
        console.log('Form Data: ', formData);
        let res = await addPosition(
          token,
          formData.role,
          formData.venue,
          formData.event,
          formData.department,
          formData.reportsTo,
          formData.workforceType,
          formData.shift_per_day.toString(),
          formData.total_demand.toString(),
          formData.peak_shift.toString(),
          formData.startDate,
          formData.endDate,
          formData.peak_day.toString(),
          formData.multiplier.toString()
        );

        let { valid } = res;
        if (valid) {
          getMyPositions();

          setToastData({
            type: 'success',
            message: 'Position added successfully!',
          });
          setTimeout(() => {
            handleReset();
            setToastData(null);
          }, 2000);
        } else {
          showToast(
            'error',
            'Oops, something went wrong. Please try again later.'
          );
        }
      } else {
        let res = await updatePosition(
          editRowData.position_guid,
          formData.role,
          formData.venue,
          formData.event,
          formData.department,
          formData.reportsTo,
          formData.workforceType,
          formData.shift_per_day.toString(),
          formData.total_demand.toString(),
          formData.peak_shift.toString(),
          formData.startDate,
          formData.endDate,
          formData.peak_day.toString(),
          formData.multiplier.toString()
        );

        let { valid } = res;
        if (valid) {
          getMyPositions();

          setToastData({
            type: 'success',
            message: 'Position updates saved successfully!',
          });
          setTimeout(() => {
            handleReset();
            setToastData(null);
          }, 2000);
        } else {
          showToast(
            'error',
            'Oops, something went wrong. Please try again later.'
          );
        }
      }
    } else {
      setInvalidPeakShift(true);
      showToast('warning', 'Warning!');
    }
  }

  function handleToast() {
    setToastData(null);
  }

  const addEditRowData = () => {
    const startDateParts = editRowData?.start_date?.split(' ');
    const startDate =
      editRowData &&
      new Date(
        `${startDateParts[1]} ${startDateParts[0]} ${startDateParts[2]}`
      );

    const endDateParts = editRowData?.end_date?.split(' ');
    const endDate =
      editRowData &&
      new Date(`${endDateParts[1]} ${endDateParts[0]} ${endDateParts[2]}`);

    editRowData &&
      setDateRange([
        {
          startDate: startDate,
          endDate: endDate,
          key: 'selection',
        },
      ]);

    console.log('Hello guys: ', roleOptionsBackup);

    setSelectedOption({
      event: { value: editRowData?.event_guid, label: editRowData?.event_name },
      department: {
        value: editRowData?.department_guid,
        label: editRowData?.department_name,
      },
      function: {
        value: editRowData?.function_guid,
        label: editRowData?.function_name,
      },
      workforceType: {
        value: editRowData?.role_workforce_type,
        label: editRowData?.role_workforce_type,
      },
      role: { value: editRowData?.role_guid, label: editRowData?.role_name },
      reportsTo: {
        value: editRowData?.report_to_guid,
        label: editRowData?.report_to_role_name,
      },
      venue: { value: editRowData?.venue_guid, label: editRowData?.venue_name },
    });

    formData.position = editRowData?.position_code;

    setFormData({
      ...formData,
      ...editRowData,
    });
  };

  const checkRoleCode = (item) => {
    if (item.label === 'Contractor') {
      setIsVolunteerForCalendarCheck(false);
    } else if (item.label === 'Volunteer') {
      setIsVolunteerForCalendarCheck(true);
    } else {
      setIsVolunteerForCalendarCheck(false);
    }

    role_options = roles
      ?.filter(
        (role) =>
          role?.function_name == selectedOption?.function?.label &&
          role.workforce_type == item?.label
      )
      ?.sort((a, b) => a.role_name.localeCompare(b.role_name))
      ?.map((filterRole) => ({
        value: filterRole.role_guid,
        label: filterRole.role_name,
      }));
    console.log(role_options, 'role_options');

    setRoleOptionsBackup(role_options);
  };

  useEffect(() => {
    if (editRowData != false) {
      addEditRowData();
    } else {
      initial_form_data.position = '';
      setFormData(initial_form_data);
      setInvalidPeakShift(false);
      setSelectedOption(initial_selected_options);
    }
  }, [editRowData != false, showPositionModal]);

  const handleReset = () => {
    setShowPositionModal(false);
    setFormData(initial_form_data);
    setSelectedOption(initial_selected_options);
    setDateRange(initial_date);
  };

  useEffect(() => {
    handleMultiplierAndDemand();
  }, [formData.peak_day, formData.peak_shift]);

  const handleMultiplierAndDemand = () => {
    if (formData.peak_shift > 0 && formData.peak_day > 0 && start_date != undefined && end_date != undefined) {
      let startDate = parseInt(start_date?.split(',')[0].split(' ')[1]);
      let endDate = parseInt(end_date?.split(',')[0].split(' ')[1]);

      let mul = (
        parseFloat(endDate - startDate + 1) / parseFloat(formData.peak_shift)
      ).toFixed(1);

      formData.total_demand = Math.ceil(
        parseFloat(mul) * parseFloat(formData.peak_day)
      ).toString();

      formData.multiplier = mul.toString();
      setFormData({ ...formData });
    }
  };

  const handleCalculations = () => {
    console.log('first...');
    if (
      formData.shift_per_day.length > 0 &&
      dateRange[0].startDate != null &&
      dateRange[0].endDate != null &&
      isVolunteerForCalendarCheck
    ) {
      console.log('first');
      setCalculationText(!calculationText);
      setShowTable(!showTable);
    }
  };

  const showToast = (type, message) => {
    setToastData({ type, message });

    setTimeout(() => {
      setToastData(null);
    }, 2000);
  };

  // Constraint
  const [invalidPeakShift, setInvalidPeakShift] = useState(false);

  return (
    <>
      <div className='flex'>
        <div className='w-3/12'>
          <p className=' text-sm font-medium text-[#5D5B5C]'>
            {editRowData === false ? 'Add position' : 'Update Position'}
          </p>
        </div>
        <div className='w-6/12'>
          <div className='space-y-8'>
            <div className='space-y-5'>
              <div className='space-y-4'>
                {/* Position name/code Row
                <div className="w-full">
                  <label
                    className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                    htmlFor="position*"
                  >
                    Position name/code
                    <span className="text-primary-600">*</span>
                    <div className="relative">
                      <input
                        id="position"
                        name="position"
                        type="text"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="Position name/code"
                        required
                        className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                      />
                    </div>
                  </label>
                </div> */}

                {/* Select event Row */}
                <div className='w-full'>
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
                    onSelect={(value) => handleSelect('event', value)}
                    placeholder={'Please choose an option'}
                  />
                </div>

                {/* Select department Row */}
                <div className='w-full'>
                  <label
                    className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                    htmlFor='department'
                  >
                    Select department
                  </label>
                  <Select
                    options={department_options}
                    selectedOption={selectedOption.department}
                    onSelect={(value) => handleSelect('department', value)}
                    placeholder={'Please choose an option'}
                    disabled={
                      selectedOption?.event?.length == 0 ||
                      department_options?.length == 0
                    }
                  />
                </div>

                {/* Select function Row */}
                <div className='w-full'>
                  <label
                    className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                    htmlFor='function'
                  >
                    Select function
                    <span className='text-primary-600'>*</span>
                  </label>
                  <Select
                    options={function_options}
                    selectedOption={selectedOption.function}
                    onSelect={(value) => handleSelect('function', value)}
                    placeholder={'Please choose an option'}
                    disabled={
                      selectedOption?.department?.length == 0 ||
                      function_options?.length == 0
                    }
                  />
                </div>

                {/* Select workforce type and role Row */}
                <div className='flex gap-4'>
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
                      onSelect={(value) => {
                        handleSelect('workforceType', value);
                        checkRoleCode(value);
                      }}
                      placeholder={'Please choose an option'}
                      disabled={
                        selectedOption?.function?.length == 0 ||
                        workforce_type_options?.length == 0
                      }
                    />
                  </div>

                  <div className='w-1/2'>
                    <label
                      className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                      htmlFor='role'
                    >
                      Select role
                      <span className='text-primary-600'>*</span>
                    </label>
                    <Select
                      options={roleOptionsBackup}
                      selectedOption={selectedOption.role}
                      onSelect={(value) => handleSelect('role', value)}
                      placeholder={'Please choose an option'}
                      disabled={
                        selectedOption?.function?.length == 0 ||
                        selectedOption?.workforceType?.length == 0 ||
                        role_options?.length == 0
                      }
                    />
                  </div>
                </div>

                {/* Reports to Row */}
                <div className='w-full'>
                  <label
                    className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                    htmlFor='reportsTo'
                  >
                    Reports to
                    <span className='text-primary-600'>*</span>
                  </label>
                  <Select
                    options={roleOptionsBackup}
                    selectedOption={selectedOption.reportsTo}
                    onSelect={(value) => handleSelect('reportsTo', value)}
                    placeholder={'Please choose an option'}
                    disabled={
                      selectedOption?.function?.length == 0 ||
                      selectedOption?.role?.length == 0 ||
                      role_options?.length == 0
                    }
                  />
                </div>

                {/* Select venue Row */}
                <div className='w-full'>
                  <label
                    className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                    htmlFor='venue'
                  >
                    Select venue
                    <span className='text-primary-600'>*</span>
                  </label>
                  <Select
                    options={venue_options}
                    selectedOption={selectedOption.venue}
                    onSelect={(value) => handleSelect('venue', value)}
                    placeholder={'Please choose an option'}
                  />
                </div>

                <div className='flex justify-between gap-4'>
                  {/* Select Date Row */}
                  <div className='w-full relative'>
                    <label
                      className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                      htmlFor='eventDate'
                    >
                      Date
                      <span className='text-primary-600'>*</span>
                      <div className='relative'>
                        <div
                          className='relative'
                          onClick={() => {
                            if (!showTable) {
                              setCalendarOpen(!calendarOpen);
                            }
                          }}
                        >
                          <input
                            id='eventDate'
                            name='eventDate'
                            type='text'
                            required
                            placeholder='Select event date...'
                            // value={`${start_date ? `${start_date} - ${end_date || "..."}` : "Select date"}`}
                            value={`${start_date} - ${end_date || '...'}`}
                            readOnly={true}
                            disabled={!selectedOption?.event.value}
                            onClick={() => (
                              <DateCalender
                                dateRange={dateRange}
                                setDateRange={handleDate}
                              />
                            )}
                            className='w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 bg-white mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500 disabled:opacity-50'
                          />

                          {formData.selectedDateValid && (
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
                        {calendarOpen && (
                          <DateCalender
                            dateRange={dateRange}
                            setDateRange={handleDate}
                            onClose={() => setCalendarOpen(false)}
                          />
                        )}
                      </div>
                    </label>
                  </div>

                  {/* Number of shifts per day Row */}
                  <div className='w-full'>
                    <label
                      className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                      htmlFor='position*'
                    >
                      Number of shifts per day
                      <span className='text-primary-600'>*</span>
                      <div className='relative'>
                        <input
                          id='shift_per_day'
                          name='shift_per_day'
                          type='text'
                          value={formData.shift_per_day}
                          onChange={handleInputChange}
                          placeholder='Number of shifts per day'
                          required
                          className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div
                  onClick={handleCalculations}
                  className='flex items-center cursor-pointer w-fit'
                >
                  <p className='text-[#084CD0] font-semibold text-sm'>
                    {calculationText ? 'Close Stats' : 'Calculate Stats'}
                  </p>
                  <FiHelpCircle className='ml-1 w-4 h-4 text-[#9CC7F3]' />
                </div>
                <div className='flex justify-between gap-4'>
                  {/* Peak Day Row */}
                  <div className='w-full'>
                    <label
                      className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                      htmlFor='position*'
                    >
                      Peak day
                      <span className='text-primary-600'>*</span>
                      <div className='relative'>
                        <input
                          id='peak_day'
                          name='peak_day'
                          type='text'
                          value={formData.peak_day}
                          onChange={handleInputChange}
                          placeholder='Add peak day'
                          required
                          className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                        />
                      </div>
                    </label>
                  </div>

                  {/* Peak shift Row */}
                  <div className='w-full'>
                    <label
                      className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                      htmlFor='peak_shift'
                    >
                      Peak shift
                      <span className='text-primary-600'>*</span>
                      <div className='relative'>
                        <input
                          id='peak_shift'
                          name='peak_shift'
                          type='text'
                          value={formData.peak_shift}
                          onChange={handleInputChange}
                          placeholder='Add peak shift'
                          required
                          className={
                            invalidPeakShift === false
                              ? `w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`
                              : `w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-red-600 outline-none shadow-xs placeholder:text-gray-500 appearance-none`
                          }
                        />
                        <div
                          className={
                            invalidPeakShift === true
                              ? 'absolute top-0 right-0 flex items-center h-full px-3 pointer-events-none'
                              : 'hidden'
                          }
                        >
                          <FiAlertCircle className='text-red-500' />
                        </div>
                      </div>
                    </label>
                    <p
                      className={
                        invalidPeakShift === true
                          ? 'text-red-500 text-sm block mt-1'
                          : 'text-red-500 text-sm hidden'
                      }
                    >
                      Peak shift cannot be higher than Total demand
                    </p>
                  </div>
                </div>
                <div className='flex justify-between gap-4'>
                  {/* Multiplier Row */}
                  <div className='w-full'>
                    <label
                      className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                      htmlFor='peak_shift'
                    >
                      Multiplier
                      <span className='text-primary-600'>*</span>
                      <div className='relative'>
                        <input
                          id='multiplier'
                          name='multiplier'
                          type='text'
                          value={formData.multiplier}
                          onChange={handleInputChange}
                          placeholder='Add multiplier'
                          required
                          className={
                            invalidPeakShift === false
                              ? `w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`
                              : `w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-red-600 outline-none shadow-xs placeholder:text-gray-500 appearance-none`
                          }
                        />
                      </div>
                    </label>
                  </div>
                  {/* Total demand Row */}
                  <div className='w-full'>
                    <label
                      className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                      htmlFor='position*'
                    >
                      Total demand
                      <span className='text-primary-600'>*</span>
                      <div className='relative'>
                        <input
                          id='total_demand'
                          name='total_demand'
                          type='text'
                          value={formData.total_demand}
                          onChange={handleInputChange}
                          placeholder='Add total demand'
                          required
                          className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toastData && (
        <ToastPopup toastType={toastData.type} message={toastData.message} />
      )}
      {console.log('DateRange', dateRange)}
      <PositionsCalendar
        startDate={dateRange[0].startDate}
        endDate={dateRange[0].endDate}
        numberOfShifts={parseInt(formData.shift_per_day)}
        peakShift={parseInt(formData.peak_shift)}
        peakDay={parseInt(formData.peak_day)}
        formData={formData}
        setFormData={setFormData}
        showTable={showTable}
        setShowTable={setShowTable}
      />
      {/* Last section */}
      <div className='w-3/12 ml-auto'>
        <div className='flex gap-3'>
          <button
            className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs'
            onClick={handleReset}
          >
            Cancel
          </button>
          <button
            className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
            onClick={handleAddEvent}
          >
            {editRowData === false ? 'Save' : 'Update'}
          </button>
        </div>
      </div>

      <hr />
    </>
  );
}

export default AddPosition;
