import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ToastPopup from '../../toast/toast-popup';
import { FiX } from 'react-icons/fi';

export function EditChoiceModal({
  showChoiceModal,
  setShowChoiceModal,
  HandleChoices,
}) {
  const [choiceInput, setChoiceInput] = useState('');
  const [choices, setChoices] = useState([]);
  const [isEditingChoiceIndex, setIsEditingChoiceIndex] = useState(null);
  const [toastData, setToastData] = useState(null);

  const HandleInputChoices = (event) => {
    const { value } = event.target;

    setChoiceInput(value);
  };

  const AddChoice = (e) => {
    if (e.key === 'Enter' && choiceInput.trim() !== '') {
      e.preventDefault();

      setChoices([...choices, choiceInput.trim()]);

      setChoiceInput('');
    }
  };

  const HandleChoiceUpdateInputBlur = () => {};

  const updateChoice = (index, updatedText) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = updatedText;
    setChoices(updatedChoices);
  };

  const DeleteChoice = (index) => {
    const updatedChoices = choices.filter((_, i) => i !== index);
    setChoices(updatedChoices);
  };

  const HandleSave = () => {
    setToastData({
      type: 'success',
      message: 'Choices updated successfully!',
    });
    setTimeout(() => {
      setChoiceInput('');
      HandleChoices(choices);
      setToastData(null);
      // setShowChoiceModal(false);
      // setChoices([]);
    }, 2000);
  };

  return (
    <>
      <Transition appear show={showChoiceModal} as={Fragment}>
        <Dialog as='div' className='relative z-30' onClose={setShowChoiceModal}>
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
                <Dialog.Panel className='w-full max-w-[400px] transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='space-y-8'>
                    <div className='space-y-5'>
                      <div className='space-y-2'>
                        <Dialog.Title
                          as='h3'
                          className='text-lg-semibold text-gray-900'
                        >
                          Edit choices
                        </Dialog.Title>
                        <Dialog.Description
                          as='p'
                          className='text-sm-regular text-gray-500 space-y-4'
                        >
                          Write or paste your choices below. Each choice must be
                          on a separate line.
                        </Dialog.Description>
                      </div>
                      <div className='space-y-2'>
                        <textarea
                          className='w-full min-h-[44px] block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
                          name='choices'
                          value={choiceInput}
                          onKeyDown={AddChoice}
                          onChange={HandleInputChoices}
                        />
                        <ul className='space-y-1 max-h-32 overflow-y-auto'>
                          {choices?.map((choice, index) => (
                            <li
                              key={index}
                              className='flex items-center justify-between gap-x-2'
                            >
                              {isEditingChoiceIndex == index ? (
                                <input
                                  type='text'
                                  value={choice}
                                  onChange={(e) =>
                                    updateChoice(index, e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      updateChoice(index, e.target.value);
                                      setIsEditingChoiceIndex(null);
                                    }
                                  }}
                                  onBlur={() => setIsEditingChoiceIndex(null)}
                                  className='w-full min-h-[44px] block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
                                />
                              ) : (
                                <span
                                  className='block w-full text-gray-900 text-sm-regular 2xl:text-md-regular'
                                  onClick={() => setIsEditingChoiceIndex(index)}
                                >
                                  {choice}
                                </span>
                              )}
                              <button
                                className='p-2'
                                onClick={() => DeleteChoice(index)}
                              >
                                <FiX className='w-4 h-4 text-gray-500' />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className='flex justify-between gap-3'>
                      <button
                        className='h-11 text-md-semibold flex items-center justify-center flex-1 border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 outline-none shadow-xs'
                        onClick={() => setShowChoiceModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className='h-11 text-md-semibold flex items-center justify-center flex-1 border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 outline-none shadow-xs disabled:pointer-events-none disabled:opacity-50'
                        onClick={HandleSave}
                        disabled={!choices?.length}
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
