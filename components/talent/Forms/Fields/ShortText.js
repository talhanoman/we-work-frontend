import React from 'react';
import EditableLabel from '../EditableLabel';
import { FiTrash2 } from 'react-icons/fi'; 
import { capitalizeFirstLetter, toCamelCase } from '../../../../utils/utils';

const ShortTextField = ({ question, HandleInputChange, HandleDeleteField,HandleAddLabel , HandleBlurInputChange }) => {
//console.log("In Short Text: " , question)
  return (

    <div className='space-y-6'>
      {/* Render specific tag for Short Text */}
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
            <input
              id={toCamelCase(field.fieldLabel)}
              name={`shortText`}
              type='text'
              value={field.shortText}
              placeholder={capitalizeFirstLetter(field.fieldLabel)}
              onChange={(e) => HandleInputChange(question.id, field.id, e)}
              required
              className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
            />
            <button type='button' className='p-2'>
              <FiTrash2
                className='w-4 h-4 text-gray-700'
                onClick={() => HandleDeleteField(question.id, field.id)}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShortTextField;
