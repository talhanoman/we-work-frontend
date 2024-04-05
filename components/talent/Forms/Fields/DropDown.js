import React from 'react'
import EditableLabel from '../EditableLabel';// Import EditableLabel component
import { FiTrash2 } from 'react-icons/fi'; // Import FiTrash2 icon
import { capitalizeFirstLetter, toCamelCase } from '../../../../utils/utils';
import Select from '../../../select';
import { EditChoiceModal } from '../edit-choices-modal';
const DropdownField = ({
    question,
    HandleSelectDropdown,
    HandleChoiceModal,
    HandleChoices,
    HandleDeleteField,
    HandleBlurInputChange,
    HandleInputChange,
    HandleAddLabel
}) => {
    return (
        <div className='space-y-6'>
            {question.fields.map((field, fieldIndex) => (
                <div key={field.id} className='flex items-center gap-x-2'>
                    <div className='w-full space-y-1.5'>
                        <EditableLabel
                            questionId={question.id}
                            fieldId={field.id}
                            isEditingLabel={field.dropdown.isEditingLabel}
                            onLabelClick = {HandleAddLabel}
                            handleBlurInputChange = {HandleBlurInputChange}
                            handleInputChange = {HandleInputChange}
                            fieldLabel={capitalizeFirstLetter(field.dropdown.fieldLabel)}
                            multiInputLabel='dropdown'
                            margin='mb-0'
                            required={question.questionRequired}
                        />

                        <Select
                            options={field.dropdown.dropdownChoices}
                            selectedOption={field.dropdown.value}
                            onSelect={(value) =>
                                HandleSelectDropdown(
                                    question.id,
                                    field.id,
                                    'dropdown',
                                    value,
                                    true
                                )
                            }
                            placeholder={capitalizeFirstLetter(
                                field.dropdown.fieldLabel
                            )}
                            disabled={
                                !field.dropdown.dropdownChoices?.length
                            }
                        />

                        <div className='flex justify-between items-center'>
                            <button
                                className='text-sm-regular text-gray-500 underline'
                                onClick={(e) => {
                                    e.preventDefault();
                                    HandleChoiceModal(
                                        question.id,
                                        field.id,
                                        'dropdown',
                                        true
                                    );
                                }}
                            >
                                Edit choices
                            </button>
                            <h6 className='text-sm-regular text-gray-500'>
                                Choice
                                {field.dropdown.dropdownChoices?.length >
                                    1 && 's'}{' '}
                                <span className='text-gray-700 underline'>
                                    {field.dropdown.dropdownChoices?.length ??
                                        0}
                                </span>
                            </h6>
                        </div>
                        <EditChoiceModal
                            showChoiceModal={
                                field.dropdown.showChoiceModal
                            }
                            setShowChoiceModal={(value) =>
                                HandleChoiceModal(
                                    question.id,
                                    field.id,
                                    'dropdown',
                                    value
                                )
                            }
                            HandleChoices={(choices) =>
                                HandleChoices(
                                    question.id,
                                    field.id,
                                    'dropdown',
                                    'dropdownChoices',
                                    choices
                                )
                            }
                        />
                    </div>

                    <button type='button' className='p-2'>
                        <FiTrash2
                            className='w-4 h-4 text-gray-700'
                            onClick={() => HandleDeleteField(question.id, field.id)}
                        />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default DropdownField;