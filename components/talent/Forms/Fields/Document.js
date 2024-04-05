import React from 'react';
import EditableLabel from '../EditableLabel';// Import EditableLabel component
import { FiTrash2 } from 'react-icons/fi'; // Import FiTrash2 icon
import { capitalizeFirstLetter, toCamelCase } from '../../../../utils/utils';
import Select from '../../../select';
import DateInput from '@/components/talent/Forms/date-input';
import { EditChoiceModal } from '../edit-choices-modal';

const DocumentField = ({ question, HandleInputChange, HandleDeleteField, HandleSelectDropdown, HandleChoiceModal, HandleChoices, HandleDateSelect,HandleAddLabel, HandleBlurInputChange}) => {
    return (
        <div className='space-y-6'>
            {/* Render specific tag for Short Text */}
            {question.fields.map((field, fieldIndex) => (
                <div key={field.id} className='w-full'>
                    <div className='w-full space-y-6'>
                        <div className='w-full space-y-1.5'>
                            <EditableLabel
                                questionId={question.id}
                                fieldId={field.id}
                                isEditingLabel={field.documentType.isEditingLabel}
                                onLabelClick = {HandleAddLabel}
                                handleBlurInputChange = {HandleBlurInputChange}
                                handleInputChange = {HandleInputChange}
                                fieldLabel={capitalizeFirstLetter(field.documentType.fieldLabel)}
                                multiInputLabel='documentType'
                                margin='mb-0'
                                required={question.questionRequired}
                            />
                            <Select
                                options={
                                    field.documentType?.documentTypeChoices
                                }
                                selectedOption={field.documentType.value}
                                onSelect={(value) =>
                                    HandleSelectDropdown(question.id, field.id,'documentType',value,true)
                                }
                                placeholder={capitalizeFirstLetter(field.documentType.fieldLabel)}
                                disabled={
                                    !field.documentType?.documentTypeChoices
                                        ?.length
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
                                            'documentType',
                                            true
                                        );
                                    }}
                                >
                                    Edit choices
                                </button>
                                <h6 className='text-sm-regular text-gray-500'>
                                    Choice
                                    {field.documentType.documentTypeChoices
                                        ?.length > 1 && 's'}{' '}
                                    <span className='text-gray-700 underline'>
                                        {field.documentType.documentTypeChoices
                                            ?.length ?? 0}
                                    </span>
                                </h6>
                            </div>
                            <EditChoiceModal
                                showChoiceModal={
                                    field.documentType.showChoiceModal
                                }
                                setShowChoiceModal={(value) =>
                                    HandleChoiceModal(
                                        question.id,
                                        field.id,
                                        'documentType',
                                        value
                                    )
                                }
                                HandleChoices={(choices) =>
                                    HandleChoices(
                                        question.id,
                                        field.id,
                                        'documentType',
                                        'documentTypeChoices',
                                        choices
                                    )
                                }
                            />
                        </div>
                        <div className='w-full'>
                            <EditableLabel
                                questionId={question.id}
                                fieldId={field.id}
                                isEditingLabel={
                                    field.documentNumber.isEditingLabel
                                }
                                onLabelClick = {HandleAddLabel}
                                handleBlurInputChange = {HandleBlurInputChange}
                                handleInputChange = {HandleInputChange}
                                fieldLabel={capitalizeFirstLetter(
                                    field.documentNumber.fieldLabel
                                )}
                                multiInputLabel='documentNumber'
                                required={question.questionRequired}
                            />
                            <input
                                id={`idNumber-${fieldIndex}`}
                                name='documentNumber'
                                type='number'
                                min={0}
                                value={field.documentNumber.value}
                                onChange={(e) =>
                                    HandleInputChange(
                                        question.id,
                                        field.id,
                                        e,
                                        'documentNumber'
                                    )
                                }
                                placeholder={capitalizeFirstLetter(
                                    field.documentNumber.fieldLabel
                                )}
                                className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                            />
                        </div>
                        <div className='w-full'>
                            <EditableLabel
                                questionId={question.id}
                                fieldId={field.id}
                                isEditingLabel={field.date.isEditingLabel}
                                onLabelClick = {HandleAddLabel}
                                handleBlurInputChange = {HandleBlurInputChange}
                                handleInputChange = {HandleInputChange}
                                fieldLabel={capitalizeFirstLetter(
                                    field.date.fieldLabel
                                )}
                                multiInputLabel='date'
                                required={question.questionRequired}
                            />
                            <DateInput
                                width='w-full'
                                id={`date-${fieldIndex}`}
                                title={'Date'}
                                selectedDate={field.date.value}
                                onSelect={(_, date) =>
                                    HandleDateSelect(
                                        question.id,
                                        field.id,
                                        'date',
                                        date,
                                        true
                                    )
                                }
                                srOnly='hidden'
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
    );
};

export default DocumentField;
