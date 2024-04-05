import React from 'react';
import EditableLabel from '../EditableLabel';
import { FiTrash2 } from 'react-icons/fi'; 
import { capitalizeFirstLetter, toCamelCase } from '../../../../utils/utils';
import DateInput from '@/components/talent/Forms/date-input';

const DateField = ({ question, HandleDeleteField,HandleAddLabel ,HandleDateSelect,HandleInputChange,HandleBlurInputChange }) => {
  return (
    <div className='space-y-6'>
    
    {question.fields.map((field, fieldIndex) => (
      <div key={field.id} className='w-full'>
          <EditableLabel
            questionId={question.id}
            fieldId={field.id}
            isEditingLabel={field.isEditingLabel}
            onLabelClick = {HandleAddLabel}
            handleBlurInputChange={HandleBlurInputChange}
            handleInputChange = {HandleInputChange}
            fieldLabel={capitalizeFirstLetter(field.fieldLabel)}
            required={question.questionRequired}
          />
        <div className='flex items-center gap-x-2'>
          <DateInput
            srOnly='hidden'
            width='w-full'
            id={toCamelCase(field.fieldLabel)}
            title={capitalizeFirstLetter(
              field.fieldLabel
            )}
            selectedDate={field.date}
            onSelect={(_, date) =>
              HandleDateSelect(
                question.id,
                field.id,
                'date',
                date
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
  );
};

export default DateField;
