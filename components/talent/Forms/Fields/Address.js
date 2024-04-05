import React from 'react'
import EditableLabel from '../EditableLabel';
import { FiTrash2 } from 'react-icons/fi'; 
import { capitalizeFirstLetter, toCamelCase } from '../../../../utils/utils';
import LocationCombobox from '@/components/location-combobox';

const AddressField = ({question, HandleInputChange, HandleDeleteField,HandleAddLabel , HandleBlurInputChange ,countryListWithDialCodeAndFlag}) => {
  //console.log(question)
    return (
    <div className='space-y-6'>
    {/* Render specific tag for Address */}
    {question.fields.map((field, fieldIndex) => (
      <div
        key={field.id}
        className='w-full flex items-center gap-x-2'
      >
        <div className='w-full space-y-6'>
          <div className='w-full flex justify-between gap-x-6'>
            <div className='w-full'>
              <EditableLabel
                questionId={question.id}
                fieldId={field.id}
                isEditingLabel={field.address.isEditingLabel}
                onLabelClick = {HandleAddLabel}
                handleBlurInputChange={HandleBlurInputChange}
                handleInputChange = {HandleInputChange}
                fieldLabel={capitalizeFirstLetter(field.address.fieldLabel)}
                multiInputLabel='address'
                required={question.questionRequired}
              />
              <input
                id={`address-${fieldIndex}`}
                name='address'
                type='text'
                value={field.address.value}
                onChange={(e) =>
                  HandleInputChange(
                    question.id,
                    field.id,
                    e,
                    'address'
                  )
                }
                placeholder={capitalizeFirstLetter(
                  field.address.fieldLabel
                )}
                className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
              />
            </div>

            <div className='w-full'>
              <EditableLabel
                questionId={question.id}
                fieldId={field.id}
                isEditingLabel={field.cityOrEmirate.isEditingLabel}
                onLabelClick = {HandleAddLabel}
                handleBlurInputChange={HandleBlurInputChange}
                handleInputChange = {HandleInputChange}
                fieldLabel={capitalizeFirstLetter(field.cityOrEmirate.fieldLabel)}
                multiInputLabel='cityOrEmirate'
                required={question.questionRequired}
              />
              <input
                id={`cityOrEmirate-${fieldIndex}`}
                name='cityOrEmirate'
                type='text'
                value={field.cityOrEmirate.value}
                onChange={(e) =>
                  HandleInputChange(
                    question.id,
                    field.id,
                    e,
                    'cityOrEmirate'
                  )
                }
                placeholder={capitalizeFirstLetter(
                  field.cityOrEmirate.fieldLabel
                )}
                className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
              />
            </div>
          </div>

          <div className='w-full flex justify-between gap-x-6'>
            <div className='w-full'>
              <EditableLabel
                questionId={question.id}
                fieldId={field.id}
                isEditingLabel={field.stateOrRegionOrProvince.isEditingLabel}
                onLabelClick = {HandleAddLabel}
                handleBlurInputChange={HandleBlurInputChange}
                handleInputChange = {HandleInputChange}
                fieldLabel={capitalizeFirstLetter(field.stateOrRegionOrProvince.fieldLabel)}
                multiInputLabel='stateOrRegionOrProvince'
                required={question.questionRequired}
              />
              <input
                id={`stateOrRegionOrProvince-${fieldIndex}`}
                name='stateOrRegionOrProvince'
                type='text'
                value={
                  field.stateOrRegionOrProvince.value
                }
                onChange={(e) =>
                  HandleInputChange(
                    question.id,
                    field.id,
                    e,
                    'stateOrRegionOrProvince'
                  )
                }
                placeholder={capitalizeFirstLetter(
                  field.stateOrRegionOrProvince.fieldLabel
                )}
                className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
              />
            </div>
            <div className='max-w-[170px] w-full'>
              <EditableLabel
                questionId={question.id}
                fieldId={field.id}
                isEditingLabel={field.zipOrPostalCode.isEditingLabel}
                onLabelClick = {HandleAddLabel}
                handleBlurInputChange={HandleBlurInputChange}
                handleInputChange = {HandleInputChange}
                fieldLabel={capitalizeFirstLetter(field.zipOrPostalCode.fieldLabel)}
                multiInputLabel='zipOrPostalCode'
                required={question.questionRequired}
              />
              <input
                id={`zipOrPostalCode-${fieldIndex}`}
                name='zipOrPostalCode'
                type='text'
                value={field.zipOrPostalCode.value}
                onChange={(e) =>
                  HandleInputChange(
                    question.id,
                    field.id,
                    e,
                    'zipOrPostalCode'
                  )
                }
                placeholder={capitalizeFirstLetter(
                  field.zipOrPostalCode.fieldLabel
                )}
                className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
              />
            </div>
          </div>

          <div className='w-full'>
            <EditableLabel
              questionId={question.id}
              fieldId={field.id}
              isEditingLabel={field.country.isEditingLabel}
              onLabelClick = {HandleAddLabel}
              handleBlurInputChange={HandleBlurInputChange}
              handleInputChange = {HandleInputChange}
              fieldLabel={capitalizeFirstLetter(field.country.fieldLabel)}
              multiInputLabel='country'
              required={question.questionRequired}
            />
            <LocationCombobox
              options={countryListWithDialCodeAndFlag}
              selectedOption={field.country.value}
              onSelect={(location) =>
                HandleLocationSelect(
                  question.id,
                  field.id,
                  'country',
                  location,
                  true
                )
              }
            />
          </div>
        </div>
        <button type='button' className='p-2'>
          <FiTrash2
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

export default AddressField