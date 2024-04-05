import React, { useEffect, useState } from 'react'

export default function ConfirmationModal({ confirmationModal, setConfirmationModal, deleteMyPosition }) {

    const modalStyle = "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
    const [pin, setPin] = useState('')
    const [warning, setWarning] = useState(false)
    const handleDelete = () => {
        if (pin.length > 0) {
            deleteMyPosition()
        } else {
            setWarning(true)
        }

    }

    useEffect(() => {
        setWarning(false)
        setPin('')
    }, [confirmationModal])

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* <div className={confirmationModal? "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" : 'opacity-0'}/> */}

            <div className={`transition-opacity duration-200 fixed inset-0 z-10 overflow-y-auto ${confirmationModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className={modalStyle}>
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Delete Position</h3>
                                    {/* Description */}
                                    <div className='my-3'>
                                        <label
                                            className="text-gray-700 text-xs-medium 2xl:text-sm-medium"
                                            htmlFor="function_description"
                                        >
                                            Enter Pin
                                            <div className="relative mt-1.5 w-full">
                                                <input
                                                    value={pin}
                                                    onChange={(e) => setPin(e.target.value)}
                                                    type="text"
                                                    className="w-full block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 shadow-xs focus:ring-1 focus:ring-primary-600 outline-none"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        {
                                            warning ?
                                                <p className="text-xs text-red-500">Enter pin to delete position.</p>
                                                :
                                                <p className="text-xs text-gray-500">Are you sure you want to delete your position? This action cannot be undone.</p>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={handleDelete} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
                            <button onClick={() => setConfirmationModal(false)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
