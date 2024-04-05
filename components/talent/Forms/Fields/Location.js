import React from 'react'
import EditableLabel from '../EditableLabel';
import { FiTrash2 } from 'react-icons/fi'; 
import LocationCombobox from '@/components/location-combobox';

import { capitalizeFirstLetter } from '../../../../utils/utils';
const LocationField = ({question, HandleInputChange, HandleDeleteField,HandleAddLabel , HandleBlurInputChange,HandleLocationSelect,countryListWithDialCodeAndFlag }) => {
  return (
    <div className='space-y-6'>
    {/* Render specific tag for Location */}
    {question.fields.map((field, fieldIndex) => (
      <div key={field.id} className='w-full'>
          <EditableLabel
            questionId={question.id}
            fieldId={field.id}
            isEditingLabel={field.isEditingLabel}
            onLabelClick = {HandleAddLabel}
            handleBlurInputChange = {HandleBlurInputChange}
            handleInputChange = {HandleInputChange}
            fieldLabel={capitalizeFirstLetter(field.fieldLabel)}
            required={question.questionRequired}
          />
        <div className='flex items-center gap-x-2'>
          <LocationCombobox
            options={countryListWithDialCodeAndFlag}
            selectedOption={field.location}
            onSelect={(location) =>
              HandleLocationSelect(
                question.id,
                field.id,
                'location',
                location
              )
            }
          />
          <button type='button' className='p-2'>
            <FiTrash2
              className='w-4 h-4 text-gray-700'
              onClick={() =>
                HandleDeleteField(question.id, field.id)
              }
            />
          </button>
        </div>
      </div>
    ))}
  </div>
  )
}

export default LocationField