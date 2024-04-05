import React from 'react';
import { capitalizeFirstLetter, toCamelCase } from '../../../utils/utils';

const EditableLabel = ({
    questionId,
    fieldId,
    isEditingLabel,
    onLabelClick,
    handleBlurInputChange,
    handleInputChange,
    fieldLabel,
    margin,
    inputClassName,
    display,
    labelClassName,
    required,
    multiInputLabel,
  }) => {
   //  console.log(fieldId, ' required');
    return (
      <div className={`${margin ? margin : 'mb-1.5'} ${display}`}>
        {isEditingLabel ? (
          <input
            type='text'
            name='fieldLabel'
            value={fieldLabel}
            onChange={(e) =>
              handleInputChange(questionId, fieldId, e, multiInputLabel)
            }
            onBlur={(e) =>
                handleBlurInputChange(
                questionId,
                fieldId,
                'isEditingLabel',
                multiInputLabel
              )
            }
            autoFocus
            className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500 ${inputClassName}`}
          />
        ) : (
          <label
            className={`block w-full text-gray-700 underline cursor-pointer ${labelClassName
              ? labelClassName
              : 'text-xs-medium 2xl:text-sm-medium'
              }`}
            htmlFor={toCamelCase(fieldLabel)}
            onClick={() => onLabelClick(questionId, fieldId, multiInputLabel)}
          >
            {capitalizeFirstLetter(fieldLabel)}
            {required && <span className='text-primary-600'>*</span>}
          </label>
        )}
      </div>
    );
  };

  export default EditableLabel