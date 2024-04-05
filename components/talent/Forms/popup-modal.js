// ModalComponent.js

import {React , Fragment} from 'react';
import { Transition, Dialog } from '@headlessui/react';
import ToastPopup from '@/components/toast/toast-popup';


const ModalComponent = ({
  showNameModal,
  setShowNameModal,
  template_name,
  setTemplateName,
  showNameModalToast,
  HandleNameModalToast,
  HandleNameModalReset,
  router,
}) => {
  return (
    <Transition appear show={showNameModal} as={Fragment}>
                        <Dialog
                    as='div'
                    className='relative z-30'
                    onClose={() => {
                      null;
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
                                    {'Template Created'}
                                  </Dialog.Title>
                                  <Dialog.Description
                                    as='p'
                                    className='text-xs-regular 2xl:text-sm-regular text-gray-500'
                                  >
                                    Please enter a name for this template.
                                  </Dialog.Description>
                                </div>

                                <div className='space-y-3'>
                                  {/* Template Name */}
                                  <div className='w-full'>
                                    <label
                                      className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                                      htmlFor='template_name'
                                    >
                                      Template Name
                                      <span className='text-primary-600'>
                                        *
                                      </span>
                                      <div className='relative'>
                                        <input
                                          id='template_name'
                                          name='template_name'
                                          type='text'
                                          value={template_name}
                                          onChange={(e) =>
                                            setTemplateName(e.target.value)
                                          }
                                          placeholder='Enter template name'
                                          required
                                          className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                                        />
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className='flex justify-between gap-3'>
                                <button
                                  className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs'
                                  onClick={HandleNameModalReset}
                                >
                                  Cancel
                                </button>
                                <button
                                  className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                                  onClick={() => {
                                    setShowNameModal(false);
                                    router.push('/talent/forms');
                                  }}
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>

                    {/* Toast */}
                    <ToastPopup
                      success={true}
                      showToast={showNameModalToast}
                      handleToast={HandleNameModalToast}
                    />
                  </Dialog>
    </Transition>
  );
};

export default ModalComponent;
