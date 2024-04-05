import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { addFunction } from '@/pages/api/post';
import Cookies from 'universal-cookie';
import ToastPopup from '@/components/toast/toast-popup';
import { FiPlus } from 'react-icons/fi';
import { updateFunction } from '@/pages/api/put';
import Select from '../select';
import { useRouter } from 'next/router';

const initial_form_data = {
  function_name: '',
  function_id: '',
  function_description: '',
  department: '',
  event: '',
  functionNameValid: false,
  functionIdValid: false,
  descriptionValid: false,
  eventValid: false,
  departmentValid: false,
};

const Workforce_type_options = [
  { value: 'Volunteer', label: 'Volunteer' },
  { value: 'Contractor', label: 'Contractor' },
  { value: 'Paid Staff', label: 'Paid Staff' },
];
const priorityOptions = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
];

function FunctionModal({
  getMyFunctions,
  showFunctionModal,
  setShowFunctionModal,
  editRowData,
  handleDataChange,
  event_options,
  department_options,
}) {
  // const [selectedWorkforceType, setSelectedWorkforceType] = useState([]);
  // const [selectedPriority, setSelectedPriority] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [toastData, setToastData] = useState(null);
  const [formData, setFormData] = useState(initial_form_data);
  const [departmentFilterOptions, setDepartmentFilterOptions] = useState([])

  const cookies = new Cookies();
  const token = cookies.get('token');

  const router = useRouter();
  const query = router?.query;
  let row_click = false;
  let department_guid = null;
  let event_guid = null;
  if (query.item !== undefined) {
    row_click = true;
    department_guid = JSON.parse(query.item).department_guid;
    event_guid = JSON.parse(query.item).event_guid;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
      [`${name}Valid`]: value.length >= 1,
    });
  };

  const handleSelectEvent = (option) => {
    setSelectedEvent(option);
    setSelectedDepartment([])

    setFormData({
      ...formData,
      event: option,
      eventValid: option.length >= 1,
    });

    let myoptions = []
    department_options.map((obj) => {
      if (obj.event_guid === option.value)
      {
        let myobj = {
          label: obj.department_name,
          value: obj.department_guid
        }

        myoptions.push(myobj)
      }
    })

    setDepartmentFilterOptions(myoptions)
  };

  const handleSelectDepartment = (option) => {
    setSelectedDepartment(option);

    setFormData({
      ...formData,
      department: option,
      departmentValid: option.length >= 1,
    });
  };

  async function handleAddFunction(e) {
    e.preventDefault();
    handleDataChange(formData);

    const functionDescription = formData.function_description ?? '';

    console.log('Yes: ', formData);

    let res = await addFunction(
      token,
      formData.function_name,
      formData.function_id,
      functionDescription,
      formData.event?.value == null ? event_guid : formData.event.value,
      formData.department?.value == null
        ? department_guid
        : formData.department.value
    );

    let { valid, message } = res;

    if (valid) {
      getMyFunctions();

      setToastData({
        type: 'success',
        message: 'Function added successfully!',
      });
      setTimeout(() => {
        handleReset();
        setToastData(null);
      }, 2000);
    } else {
      showToast('error', 'Oops, something went wrong. Please try again later.');
    }
  }

  const handleUpdateFunction = async () => {
    const functionDescription = formData.function_description || '';
    const res = await updateFunction(
      formData.function_guid,
      formData.function_name,
      String(formData.function_id),
      functionDescription,
      formData?.event?.value === undefined
        ? editRowData?.event_guid
        : formData?.event?.value,
      formData?.department?.value === undefined
        ? editRowData?.department_guid
        : formData?.department?.value
    );
    let { valid } = res;

    if (valid) {
      getMyFunctions();

      setToastData({
        type: 'success',
        message: 'Function updates saved successfully!',
      });
      setTimeout(() => {
        handleReset();
        setToastData(null);
      }, 2000);
    } else {
      showToast('error', 'Oops, something went wrong. Please try again later.');
    }
  };

  function handleToast() {
    setToastData(null);
    setShowFunctionModal(false)
  }

  const addEditRowData = () => {
    console.log('I have: ', editRowData);
    // setSelectedWorkforceType({ value: editRowData?.workforce_type, label: editRowData?.workforce_type })
    // setSelectedPriority({ value: editRowData?.priority_order, label: editRowData?.priority_order })
    setSelectedEvent({
      value: editRowData?.event_guid,
      label: editRowData?.event_name,
    });
    setSelectedDepartment({
      value: editRowData?.department_guid,
      label: editRowData?.department_name,
    });
    setFormData({
      ...editRowData,
    });
  };

  useEffect(() => {
    addEditRowData();
    console.log('Function Data', editRowData);
  }, [editRowData, showFunctionModal]);

  const handleReset = () => {
    setShowFunctionModal(false);
    setFormData(initial_form_data);
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
    <Transition appear show={showFunctionModal} as={Fragment}>
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
                        {editRowData === false
                          ? 'Add Function'
                          : 'Update Function'}
                      </Dialog.Title>
                      <Dialog.Description
                        as='p'
                        className='text-xs-regular 2xl:text-sm-regular text-gray-500'
                      >
                        Your new function has been created.
                      </Dialog.Description>
                    </div>

                    <div className='space-y-3'>
                      {/* Function name Row */}
                      <div className='w-full'>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='function_name'
                        >
                          Function name
                          <span className='text-primary-600'>*</span>
                          <div className='relative'>
                            <input
                              id='function_name'
                              name='function_name'
                              type='text'
                              value={formData.function_name}
                              onChange={handleInputChange}
                              placeholder='Enter function name'
                              required
                              className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                            />
                          </div>
                        </label>
                      </div>

                      {/* Function id Row */}
                      <div className='w-full'>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='ID'
                        >
                          Function ID
                          <span className='text-primary-600'>*</span>
                          <div className='relative'>
                            <input
                              id='function_id'
                              name='function_id'
                              type='text'
                              value={formData.function_id}
                              onChange={handleInputChange}
                              placeholder='Enter function Id'
                              disabled={editRowData}
                              required
                              className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500 disabled:pointer-events-none disabled:opacity-50`}
                            />
                          </div>
                        </label>
                      </div>
                      {/* Workforce Type */}
                      {/* <div className="w-full">
                        <label
                          className="block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5"
                          htmlFor="workforce_type"
                        >
                          Workforce Type
                        </label>
                        <Select
                          panelPosition={"w-full bottom-11 mb-1"}
                          options={Workforce_type_options}
                          selectedOption={selectedWorkforceType}
                          onSelect={handleSelect}
                          placeholder={"Workforce Type"}
                        />
                      </div> */}
                      {/* Workforce Type */}
                      {/* <div className="w-full">
                        <label
                          className="block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5"
                          htmlFor="workforce_type"
                        >
                          Priority Order
                        </label>
                        <Select
                          panelPosition={"w-full bottom-11 mb-1"}
                          options={priorityOptions}
                          selectedOption={selectedPriority}
                          onSelect={handleSelectPriority}
                          placeholder={"Select Priority Order"}
                        />
                      </div> */}
                      {/* Description */}
                      <div>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='function_description'
                        >
                          Description
                          <div className='relative mt-1.5 w-full'>
                            <textarea
                              name='function_description'
                              id='function_description'
                              value={formData.function_description}
                              onChange={handleInputChange}
                              className='w-full h-32 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 shadow-xs focus:ring-1 focus:ring-primary-600 outline-none'
                            />
                          </div>
                        </label>
                      </div>
                      {/* Event */}
                      {!row_click && (
                        <div className='w-full'>
                          <label className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'>
                            Event<span className='text-primary-600'>*</span>
                          </label>
                          <Select
                            placeholder={'Event Name'}
                            panelPosition={'bottom-11 mb-1'}
                            options={event_options}
                            selectedOption={selectedEvent}
                            onSelect={handleSelectEvent}
                          />
                        </div>
                      )}
                      {/* Department */}
                      {!row_click && (
                        <div className='w-full'>
                          <label className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'>
                            Department
                          </label>
                          <Select
                            placeholder={'Department Name'}
                            panelPosition={'bottom-11 mb-1'}
                            options={departmentFilterOptions}
                            selectedOption={selectedDepartment}
                            onSelect={handleSelectDepartment}
                          />
                        </div>
                      )}

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
                            formData.function_name?.length > 0 &&
                            formData.function_id?.length > 0
                          )
                        }
                        onClick={handleAddFunction}
                      >
                        Add function
                      </button>
                    ) : (
                      <button
                        className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                        disabled={
                          !(
                            formData.function_name?.length > 0 &&
                            formData.function_id?.length > 0
                          )
                        }
                        onClick={handleUpdateFunction}
                      >
                        Update function
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

export default FunctionModal;
