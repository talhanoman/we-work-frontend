import React from 'react';
import EditableLabel from '../EditableLabel';// Import EditableLabel component
import { FiTrash2 } from 'react-icons/fi'; // Import FiTrash2 icon
import { capitalizeFirstLetter, toCamelCase } from '../../../../utils/utils';
import FlagCombobox from '../../../flag-combobox';
import { PhoneInput } from 'react-international-phone';
import COUNTRIES from '../../../../data/countries.json';

const PhoneNumberField = ({ question, HandleInputChange, HandleDeleteField,HandleAddLabel , HandleBlurInputChange,HandlePhoneNumberChange }) => {
  return (
    <div className='space-y-6'>
    {/* Render specific tag for Phone number */}
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
          <div className='flex flex-1 items-center'>
            <FlagCombobox
              options={COUNTRIES}
              selectedOption={
                field.phoneNumber.phone_country
              }
              onSelect={(value) => {
                const { flagCode, dialCode } = value;
                console.log(value);
                HandlePhoneNumberChange(
                  question.id,
                  field.id,
                  dialCode,
                  flagCode
                );
              }}
            />
            <PhoneInput
              defaultCountry='us'
              className='w-full'
              onChange={(value, country) =>
                HandlePhoneNumberChange(
                  question.id,
                  field.id,
                  value,
                  country
                )
              }
              value={field.phoneNumber?.phone_number}
            />
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
      </div>
    ))}
  </div>
  );
};

export default PhoneNumberField;
