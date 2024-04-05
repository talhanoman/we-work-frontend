import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ToastPopup from '../toast/toast-popup';
import { v4 as uuidv4 } from 'uuid';

export default function MultipleChoiceGridModal({
  showGridModal,
  setShowGridModal,
  HandleAddOption,
}) {
  const [dragging, setDragging] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [choiceInput, setChoiceInput] = useState('');
  const [toastData, setToastData] = useState(null);

  const HandleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const HandleDragLeave = () => {
    setDragging(false);
  };

  const HandleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const HandleFiles = ({ target: { files } }) => {
    if (files) {
      setUploadFile(files[0]);
    }
  };

  const HandleInputChange = (event) => {
    const { value } = event.target;

    setChoiceInput(value);
  };

  function HandleSave() {
    HandleAddOption({
      id: uuidv4(),
      image: uploadFile,
      option: choiceInput?.trim(),
    });

    showToast('success', 'Choice added successfully!');
  }

  function handleToast() {
    setToastData(null);
  }

  const HandleReset = () => {
    setChoiceInput('');
    setUploadFile(null);
    setShowGridModal(false);
  };

  const showToast = (type, message) => {
    setToastData({ type, message });

    setTimeout(() => {
      HandleReset();
      setToastData(null);
    }, 2000);
  };

  return (
    <>
      <Transition appear show={showGridModal} as={Fragment}>
        <Dialog as='div' className='relative z-30' onClose={setShowGridModal}>
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
                <Dialog.Panel className='w-full max-w-[544px] transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='space-y-8'>
                    <div className='space-y-5'>
                      <div className='space-y-2'>
                        <Dialog.Title
                          as='h3'
                          className='text-lg-semibold text-gray-900'
                        >
                          Add Choice Option
                        </Dialog.Title>
                        <Dialog.Description
                          as='p'
                          className='text-sm-regular text-gray-500 space-y-4'
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </Dialog.Description>
                      </div>

                      <form className='w-full space-y-3'>
                        {!uploadFile && (
                          <div
                            className={`px-6 py-4 bg-white rounded-lg border border-dashed border-gray-200 cursor-pointer ${
                              dragging
                                ? 'ring-1 ring-primary-600 opacity-40'
                                : ''
                            }`}
                            onClick={() =>
                              document.getElementById('uploadPhoto').click()
                            }
                            onDragOver={HandleDragOver}
                            onDrop={HandleDrop}
                            onDragLeave={HandleDragLeave}
                          >
                            <div className='flex flex-col justify-center gap-3 w-full'>
                              <svg
                                width='46'
                                height='46'
                                viewBox='0 0 46 46'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='self-center'
                              >
                                <rect
                                  x='3'
                                  y='3'
                                  width='40'
                                  height='40'
                                  rx='20'
                                  fill='#F2F2F2'
                                />
                                <g clip-path='url(#clip0_690_46732)'>
                                  <path
                                    d='M26.3335 26.3334L23.0002 23M23.0002 23L19.6669 26.3334M23.0002 23V30.5M29.9919 28.325C30.8047 27.8819 31.4467 27.1808 31.8168 26.3322C32.1868 25.4837 32.2637 24.5361 32.0354 23.6389C31.807 22.7418 31.2865 21.9463 30.5558 21.3779C29.8251 20.8095 28.9259 20.5006 28.0002 20.5H26.9502C26.698 19.5244 26.2278 18.6186 25.5752 17.8509C24.9225 17.0831 24.1042 16.4732 23.182 16.0672C22.2597 15.6612 21.2573 15.4695 20.2503 15.5066C19.2433 15.5437 18.2578 15.8086 17.3679 16.2814C16.4779 16.7542 15.7068 17.4226 15.1124 18.2363C14.518 19.0501 14.1158 19.988 13.936 20.9795C13.7563 21.9711 13.8036 22.9905 14.0746 23.9611C14.3455 24.9317 14.8329 25.8282 15.5002 26.5834'
                                    stroke='#7A797A'
                                    stroke-width='1.66667'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                  />
                                </g>
                                <rect
                                  x='3'
                                  y='3'
                                  width='40'
                                  height='40'
                                  rx='20'
                                  stroke='#FCFBFB'
                                  stroke-width='6'
                                />
                                <defs>
                                  <clipPath id='clip0_690_46732'>
                                    <rect
                                      width='20'
                                      height='20'
                                      fill='white'
                                      transform='translate(13 13)'
                                    />
                                  </clipPath>
                                </defs>
                              </svg>

                              <div className='space-y-1 text-center w-full'>
                                <h6 className='text-sm-regular text-gray-500'>
                                  <span className='font-semibold text-primary-700 hover:underline'>
                                    Click to upload
                                  </span>{' '}
                                  or drag and drop
                                </h6>
                                <p className='text-xs-regular text-gray-500'>
                                  PNG or JPG (max. 400x400px)
                                </p>
                              </div>
                            </div>
                            <input
                              id='uploadPhoto'
                              accept='.png,.jpg'
                              type='file'
                              hidden
                              onChange={HandleFiles}
                              className='hidden'
                            />
                          </div>
                        )}

                        {uploadFile ? (
                          <div className='flex justify-between gap-1 bg-white rounded-lg border border-primary-500 p-4'>
                            <div className='w-full flex items-start gap-4'>
                              {uploadFile ? (
                                <img
                                  src={URL.createObjectURL(uploadFile)}
                                  alt={uploadFile.name}
                                  className='w-8 h-8 rounded-full bg-gray-100'
                                />
                              ) : (
                                <svg
                                  width='36'
                                  height='36'
                                  viewBox='0 0 36 36'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <rect
                                    x='2'
                                    y='2'
                                    width='32'
                                    height='32'
                                    rx='16'
                                    fill='#FFF4D3'
                                  />
                                  <path
                                    d='M13.3333 24H22.6667C23.403 24 24 23.403 24 22.6667V13.3333C24 12.597 23.403 12 22.6667 12H13.3333C12.597 12 12 12.597 12 13.3333V22.6667C12 23.403 12.597 24 13.3333 24ZM13.3333 24L20.6667 16.6667L24 20M16.6667 15.6667C16.6667 16.219 16.219 16.6667 15.6667 16.6667C15.1144 16.6667 14.6667 16.219 14.6667 15.6667C14.6667 15.1144 15.1144 14.6667 15.6667 14.6667C16.219 14.6667 16.6667 15.1144 16.6667 15.6667Z'
                                    stroke='#FF7F03'
                                    stroke-width='1.33333'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                  />
                                  <rect
                                    x='2'
                                    y='2'
                                    width='32'
                                    height='32'
                                    rx='16'
                                    stroke='#FFFAEC'
                                    stroke-width='4'
                                  />
                                </svg>
                              )}

                              <div className='space-y-1 w-full'>
                                <div>
                                  <h6 className='text-sm-medium text-gray-700'>
                                    {uploadFile.name ?? 'Photo.jpeg'}
                                  </h6>
                                  <p className='text-sm-regular text-gray-500'>
                                    {(uploadFile.size / 1024).toFixed(0) ??
                                      '200'}{' '}
                                    KB
                                  </p>
                                </div>

                                <div className='flex justify-between items-center gap-3'>
                                  {/* Progress bar */}
                                  <div className='h-2 flex-1 w-full bg-gray-100 rounded-full'>
                                    <div
                                      className={`h-full rounded-full bg-primary-600`}
                                      style={{
                                        width: `100%`,
                                        transition: 'width 0.3s',
                                      }}
                                    />
                                  </div>
                                  <p className='text-sm-regular text-gray-700'>
                                    100%
                                  </p>
                                </div>
                              </div>
                            </div>

                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <rect
                                x='0.5'
                                y='0.5'
                                width='15'
                                height='15'
                                rx='7.5'
                                fill='#54BB27'
                              />
                              <path
                                d='M11.3332 5.5L6.74984 10.0833L4.6665 8'
                                stroke='white'
                                stroke-width='1.66667'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              />
                              <rect
                                x='0.5'
                                y='0.5'
                                width='15'
                                height='15'
                                rx='7.5'
                                stroke='#54BB27'
                              />
                            </svg>
                          </div>
                        ) : null}

                        <div className='w-full'>
                          <label
                            className='text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only'
                            htmlFor='choice'
                          >
                            Choice
                            <span className='text-primary-600'>*</span>
                          </label>
                          <input
                            id='choice'
                            name='choiceInput'
                            type='text'
                            value={choiceInput}
                            onChange={HandleInputChange}
                            placeholder='Enter option'
                            className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
                          />
                        </div>
                      </form>
                    </div>

                    <div className='flex justify-between gap-3'>
                      <button
                        className='h-11 text-md-semibold flex items-center justify-center flex-1 border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 outline-none shadow-xs'
                        onClick={HandleReset}
                      >
                        Cancel
                      </button>
                      <button
                        className='h-11 text-md-semibold flex items-center justify-center flex-1 border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 outline-none shadow-xs disabled:pointer-events-none disabled:opacity-50'
                        onClick={HandleSave}
                        disabled={choiceInput?.trim()?.length < 1}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {toastData && (
        <ToastPopup toastType={toastData.type} message={toastData.message} />
      )}
    </>
  );
}
