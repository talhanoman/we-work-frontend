import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ToastPopup from '@/components/toast/toast-popup';
import CheckboxMultiSelectCombobox from '@/components/checkbox-multiselect-combobox';
import { FiAlertCircle, FiPlus } from 'react-icons/fi';
import Select from '../select';
import { addRole } from '@/pages/api/post';
import Cookies from 'universal-cookie';
import { updateRole } from '@/pages/api/put';
import { useRouter } from 'next/router';

const workforce_type_options = [
  { value: 'Paid staff', label: 'Paid staff' },
  { value: 'Volunteer', label: 'Volunteer' },
  { value: 'Contractor', label: 'Contractor' },
];

const initial_form_data = {
  role_name: '',
  role_description: '',
  workforce_type: '',
  function: '',
  roleNameValid: false,
  descriptionValid: false,
  workforceTypeValid: false,
  functionValid: false,
};

function RoleModal({
  showRoleModal,
  setShowRoleModal,
  editRowData,
  handleDataChange,
  function_options,
  getMyRoles,
}) {
  const [selectedWorkforceType, setSelectedWorkforceType] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState([]);
  const [toastData, setToastData] = useState(null);
  const [formData, setFormData] = useState(initial_form_data);

  const cookies = new Cookies();
  const token = cookies.get('token');

  const router = useRouter();
  const query = router?.query;
  let function_guid = null;
  let row_click = false;
  if (query.item !== undefined) {
    row_click = true;
    function_guid = JSON.parse(query.item).function_guid;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
      [`${name}Valid`]: value.length >= 1,
    });
  };

  const handleSelect = (option) => {
    setSelectedWorkforceType(option);

    setFormData({
      ...formData,
      workforce_type: option,
      workforceTypeValid: option.length >= 1,
    });
  };

  const handleSelectFunction = (option) => {
    setSelectedFunction(option);

    setFormData({
      ...formData,
      function: option,
      functionValid: option.length >= 1,
    });
  };

  async function handleAddRole(e) {
    e.preventDefault();
    handleDataChange(formData);

    const roleDescription = formData.role_description || '';

    let res = await addRole(
      token,
      formData.role_name,
      formData.function?.value == null
        ? function_guid
        : formData.function.value,
      roleDescription,
      formData.workforce_type.value
    );
    if (res.valid) {
      getMyRoles();

      setToastData({
        type: 'success',
        message: 'Role added successfully!',
      });
      setTimeout(() => {
        handleReset();
        setShowRoleModal(false);
        setToastData(null);
      }, 2000);
    } else {
      showToast('error', 'Oops, something went wrong. Please try again later.');
    }
  }

  const handleUpdateRole = async () => {
    const roleDescription = formData.role_description || '';
    console.log(' HI: ', formData);

    let testWorkForceType =
      typeof formData.workforce_type === 'object'
        ? formData.workforce_type.value
        : formData.workforce_type;

    const res = await updateRole(
      formData.role_guid,
      formData.role_name,
      String(formData.role_code),
      roleDescription,
      testWorkForceType,
      formData.function?.value == null
        ? formData.function_guid
        : formData.function.value
    );
    if (res.valid) {
      getMyRoles();

      setToastData({
        type: 'success',
        message: 'Role updates saved successfully!',
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
    setShowRoleModal(false)
  }

  const addEditRowData = () => {
    console.log('My parsing: ', editRowData);

    setSelectedWorkforceType({
      value: editRowData?.workforce_type,
      label: editRowData?.workforce_type,
    });

    setSelectedFunction({
      value: editRowData?.FunctionGUID,
      label: editRowData?.function_name,
    });

    setFormData({
      ...formData,
      ...editRowData,
    });
  };

  useEffect(() => {
    addEditRowData();
    console.log('Role Row', editRowData);
  }, [editRowData, showRoleModal]);

  const handleReset = () => {
    setFormData(initial_form_data);
    setSelectedWorkforceType([]);
    setSelectedFunction([]);
    setShowRoleModal(false);
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
    <Transition appear show={showRoleModal} as={Fragment}>
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
                        {editRowData === false ? 'Add Role' : 'Update Role'}
                      </Dialog.Title>
                      <Dialog.Description
                        as='p'
                        className='text-xs-regular 2xl:text-sm-regular text-gray-500'
                      >
                        Your new role has been created.
                      </Dialog.Description>
                    </div>

                    <div className='space-y-3'>
                      {/* Function name Row */}
                      <div className='w-full'>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='role_name'
                        >
                          Role name
                          <span className='text-primary-600'>*</span>
                          <div className='relative'>
                            <input
                              id='role_name'
                              name='role_name'
                              type='text'
                              value={formData.role_name}
                              onChange={handleInputChange}
                              placeholder='Enter role name'
                              required
                              className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border ${
                                formData?.role_name?.length > 39
                                  ? 'border-error-300'
                                  : 'border-gray-300'
                              } my-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                            />
                            {formData?.role_name?.length > 39 && (
                              <>
                                <p className='text-sm-regular text-error-500'>
                                  Character limit for Role name is 40 characters
                                </p>
                                <FiAlertCircle className='w-4 h-4 text-error-500 absolute top-3.5 right-3.5' />
                              </>
                            )}
                          </div>
                        </label>
                      </div>

                      {/* Description */}
                      <div>
                        <label
                          className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                          htmlFor='role_description'
                        >
                          Description
                          <div className='relative mt-1.5 w-full'>
                            <textarea
                              name='role_description'
                              id='role_description'
                              value={formData.role_description}
                              onChange={handleInputChange}
                              className='w-full h-32 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 shadow-xs focus:ring-1 focus:ring-primary-600 outline-none'
                            />
                          </div>
                        </label>
                      </div>

                      {/* Workforce type Row */}
                      <div className='w-full'>
                        <label
                          className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                          htmlFor='workforce_type'
                        >
                          Workforce type
                          <span className='text-primary-600'>*</span>
                        </label>
                        <Select
                          placeholder={'Workforce type'}
                          panelPosition={'bottom-11 mb-1'}
                          options={workforce_type_options}
                          selectedOption={selectedWorkforceType}
                          onSelect={handleSelect}
                        />
                      </div>

                      {/* Workforce type Row */}
                      {!row_click && (
                        <div className='w-full'>
                          <label
                            className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                            htmlFor='workforce_type'
                          >
                            Function <span className='text-primary-600'>*</span>
                          </label>
                          <Select
                            placeholder={'Function Name'}
                            panelPosition={'bottom-11 mb-1'}
                            options={function_options}
                            selectedOption={selectedFunction}
                            onSelect={handleSelectFunction}
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
                            formData.role_name?.length > 0 &&
                            formData.workforce_type?.value?.length > 0
                          )
                        }
                        onClick={handleAddRole}
                      >
                        Add role
                      </button>
                    ) : (
                      <button
                        className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                        disabled={!(formData.role_name?.length > 0)}
                        onClick={handleUpdateRole}
                      >
                        Update role
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

export default RoleModal;
