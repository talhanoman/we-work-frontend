import React from 'react'
import EditableLabel from '../EditableLabel';
import { FiX } from 'react-icons/fi'; 
import { capitalizeFirstLetter, toCamelCase } from '../../../../utils/utils';
const CheckBoxField = ({question , HandleAddLabel,HandleInputChange,HandleDeleteField,HandleBlurInputChange}) => {
  return (
    <div className='space-y-6'>
    {/* Render specific tag for Checkbox */}
    {question.fields.map((field, fieldIndex) => (
      <div
        key={field.id}
        className='w-full flex justify-between items-center gap-x-6'
      >
        <div className='flex items-center'>
          <div className='w-4 2xl:w-5 h-4 2xl:h-5 bg-transparent border border-gray-300 rounded-md' />
          <EditableLabel
            questionId={question.id}
            fieldId={field.id}
            isEditingLabel={field.isEditingLabel}
            onLabelClick = {HandleAddLabel}
            handleBlurInputChange = {HandleBlurInputChange}
            handleInputChange = {HandleInputChange}
            fieldLabel={field.fieldLabel}
            margin='ml-3 mb-0'
            labelClassName='text-sm-medium 2xl:text-md-medium no-underline'
          />
        </div>
        <button type='button'>
          <FiX
            className='w-4 h-4 text-gray-700'
            onClick={() =>
              HandleDeleteField(question.id, field.id)
            }
          />
        </button>
      </div>
    ))}
  </div>
  )
}

export default CheckBoxField