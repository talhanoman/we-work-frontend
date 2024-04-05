import React from 'react'
import {
    FiEye,
    FiPlus,
    FiLink
} from 'react-icons/fi';
const ActionButtons = () => {
  return (
    <div className='fixed top-[94px] 2xl:top-24 right-8 z-20 flex gap-3'>
    <div>
      <input type='file' className='hidden' />
      <button className='h-10 text-xs-semibold 2xl:text-sm-semibold text-gray-700 text-center inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-300 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'>
        <FiLink className='w-4 2xl:w-5 h-auto text-gray-700' />
        <span>Copy Link</span>
      </button>
    </div>
    <button className='h-10 text-xs-semibold 2xl:text-sm-semibold text-gray-700 text-center inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-300 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'>
      <FiEye className='w-4 2xl:w-5 h-auto text-gray-700' />
      <span>Preview</span>
    </button>
    <button className='h-10 text-xs-semibold 2xl:text-sm-semibold text-white text-center inline-flex items-center gap-2 bg-primary-600 px-4 py-2.5 rounded-lg border border-primary-600 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'>
      <FiPlus className='w-4 2xl:w-5 h-auto text-white' />
      <span>Create Form</span>
    </button>
  </div>
  )
}
export default ActionButtons