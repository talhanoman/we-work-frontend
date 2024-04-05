import React from 'react';
import EditableLabel from '../EditableLabel';// Import EditableLabel component
import { FiTrash2 } from 'react-icons/fi'; // Import FiTrash2 icon
import { capitalizeFirstLetter, toCamelCase } from '../../../../utils/utils';

const ParagraphField = ({ question, HandleInputChange, HandleDeleteField,HandleAddLabel , HandleBlurInputChange }) => {
  return (
    <div className='space-y-6'>
    {/* Render specific tag for Dropdown */}
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
          <textarea
            id={toCamelCase(field.fieldLabel)}
            name='paragraph'
            rows='4'
            value={field.paragraph}
            onChange={(e) =>
              HandleInputChange(question.id, field.id, e)
            }
            placeholder={capitalizeFirstLetter(
              field.fieldLabel
            )}
            required
            className={`w-full block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
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

export default ParagraphField;
