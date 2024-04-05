import { capitalizeFirstLetter } from '@/utils/utils';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiX,
} from 'react-icons/fi';

export default function ToastPopup({ toastType, message }) {
  const [showToast, setShowToast] = useState(true);

  const hideToast = () => {
    setShowToast(false);
  };

  const success = toastType?.toLowerCase() == 'success';
  const warning = toastType?.toLowerCase() == 'warning';
  const error = toastType?.toLowerCase() == 'error';

  return (
    <Transition appear show={showToast} as={Fragment}>
      <Dialog as='div' className='relative z-40' onClose={hideToast}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0' />
        </Transition.Child>

        <div className='fixed right-3 bottom-3 overflow-y-auto'>
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
              <Dialog.Panel
                className={`w-full max-w-sm transform overflow-hidden rounded-xl border ${
                  success
                    ? 'bg-success-50 border-success-300'
                    : warning
                    ? 'bg-warning-50 border-warning-500'
                    : 'bg-error-50 border-error-300'
                } p-4 text-left align-middle shadow-xl transition-all`}
              >
                <div className='flex gap-3'>
                  <div className='flex justify-center'>
                    {success ? (
                      <FiCheckCircle className='w-6 h-6 text-success-600' />
                    ) : warning ? (
                      <FiAlertTriangle className='w-6 h-6 text-warning-600' />
                    ) : (
                      <FiAlertCircle className='w-6 h-6 text-error-600' />
                    )}
                  </div>

                  <div className='flex gap-3 justify-between'>
                    <div className='space-y-3'>
                      <div className='space-y-1'>
                        <Dialog.Title
                          as='h6'
                          className={`w-full text-sm-semibold ${
                            success
                              ? 'text-success-700'
                              : warning
                              ? 'text-warning-700'
                              : 'text-error-700'
                          }`}
                        >
                          {message && capitalizeFirstLetter(message)}
                        </Dialog.Title>
                        {/* <Dialog.Description
                        as="p"
                        className={`text-sm-regular ${success ? "text-success-700" : warning ? "text-warning-700" : "text-error-700"}`}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                      </Dialog.Description> */}
                      </div>

                      {/* <div className="flex items-center gap-3">
                      <a
                        className={`block text-sm-semibold ${success ? "text-success-600" : warning ? "text-warning-600" : "text-error-600"} hover:underline`}
                      >
                        Learn more
                      </a>
                      <a className={`block text-sm-semibold ${success ? "text-success-700" : warning ? "text-warning-700" : "text-error-700"} hover:underline`}>
                        View changes
                      </a>
                      <FiArrowRight className={`text-sm-regular ${success ? "text-success-700" : warning ? "text-warning-700" : "text-error-700"}`} />
                    </div> */}
                    </div>

                    <div className='flex justify-center'>
                      <FiX
                        className={`text-xl-regular ${
                          success
                            ? 'text-success-600'
                            : warning
                            ? 'text-warning-600'
                            : 'text-error-600'
                        } cursor-pointer`}
                        onClick={hideToast}
                      />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
