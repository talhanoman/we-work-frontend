import React from 'react'
import EditableLabel from '../EditableLabel';// Import EditableLabel component
import { FiTrash2 } from 'react-icons/fi'; // Import FiTrash2 icon
import { capitalizeFirstLetter, toCamelCase } from '../../../../utils/utils';
import Select from '../../../select';
import { EditChoiceModal } from '../edit-choices-modal';
import { SwitchButton } from '@/components/talent/Forms/switch-button';
import CheckboxMultiSelectCombobox from '@/components/checkbox-multiselect-combobox';

const SkillsField = ({
    question,
    HandleSelectDropdown,
    HandleChoiceModal,
    HandleChoices,
    HandleMultipleCheckboxSelect,
    HandleDeleteField,
    HandleBlurInputChange,
    HandleInputChange,
    HandleAddLabel
}) => {
    return (
        <div className='space-y-6'>
            {question.fields.map((field, fieldIndex) => (
                <div className='w-full space-y-6' key={fieldIndex}>
                    <div className='flex justify-between items-center'>
                        <SwitchButton isChecked={true} labelText='Multiple answers' />
                        <h6 className='text-sm-regular text-gray-500'>
                            Up to {field.skills.value?.length > 1 && 's'}{' '}
                            <span className='text-gray-700 underline'>
                                {field.skills.value?.length ?? 0}
                            </span>{' '}
                            answers
                        </h6>
                    </div>

                    <div
                        key={fieldIndex}
                        className='flex items-center gap-x-2'
                    >
                        <div className='w-full flex justify-between gap-x-6'>
                            <div className='w-1/2 space-y-1.5'>
                                <EditableLabel
                                    questionId={question.id}
                                    fieldId={field.id}
                                    isEditingLabel={field.skills.isEditingLabel}
                                    onLabelClick = {HandleAddLabel}
                                    handleBlurInputChange = {HandleBlurInputChange}
                                    handleInputChange = {HandleInputChange}
                                    fieldLabel={capitalizeFirstLetter(field.skills.fieldLabel)}
                                    multiInputLabel='skills'
                                    margin='mb-0'
                                    required={question.questionRequired}
                                />
                                <CheckboxMultiSelectCombobox
                                    options={field.skills.skillChoices}
                                    selectedOption={field.skills.value}
                                    onSelect={(value) => HandleMultipleCheckboxSelect(question.id,field.id,'skills', value,true)}
                                    filterTitle='Select Options'
                                    disabled={
                                        !field.skills.skillChoices?.length
                                    }
                                    panelWidth='w-full'
                                />
                                <div className='flex justify-between items-center'>
                                    <button className='text-sm-regular text-gray-500 underline'
                                        onClick={(e) => { e.preventDefault(); HandleChoiceModal(question.id,field.id,'skills', true);
                                    }}
                                    >
                                        Edit choices
                                    </button>
                                    <h6 className='text-sm-regular text-gray-500'>
                                        Choice
                                        {field.skills.skillChoices?.length >
                                            1 && 's'}{' '}
                                        <span className='text-gray-700 underline'>
                                            {field.skills.skillChoices?.length ??
                                                0}
                                        </span>
                                    </h6>
                                </div>
                                <EditChoiceModal
                                    showChoiceModal={field.skills.showChoiceModal}
                                    setShowChoiceModal={(value) =>
                                        HandleChoiceModal(
                                            question.id,
                                            field.id,
                                            'skills',
                                            value
                                        )
                                    }
                                    HandleChoices={(choices) =>
                                        HandleChoices(
                                            question.id,
                                            field.id,
                                            'skills',
                                            'skillChoices',
                                            choices
                                        )
                                    }
                                />
                            </div>
                            <div className='w-1/2 space-y-1.5'>
                                <EditableLabel
                                    questionId={question.id}
                                    fieldId={field.id}
                                    isEditingLabel={field.skillEfficiency.isEditingLabel}
                                    onLabelClick = {HandleAddLabel}
                                    handleBlurInputChange = {HandleBlurInputChange}
                                    handleInputChange = {HandleInputChange}
                                    fieldLabel={capitalizeFirstLetter(field.skillEfficiency.fieldLabel)}
                                    multiInputLabel='skillEfficiency'
                                    margin='mb-0'
                                    required={question.questionRequired}
                                />
                                <Select
                                    options={field.skillEfficiency.skillEfficiencyChoices }
                                    selectedOption={field.skillEfficiency.value}
                                    onSelect={(value) =>
                                        HandleSelectDropdown(
                                            question.id,
                                            field.id,
                                            'skillEfficiency',
                                            value,
                                            true
                                        )
                                    }
                                    placeholder={capitalizeFirstLetter(field.skillEfficiency.fieldLabel)}
                                    disabled={!field.skillEfficiency .skillEfficiencyChoices?.length}
                                />
                                <div className='flex justify-between items-center'>
                                    <button
                                        className='text-sm-regular text-gray-500 underline'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            HandleChoiceModal(
                                                question.id,
                                                field.id,
                                                'skillEfficiency',
                                                true
                                            );
                                        }}
                                    >
                                        Edit choices
                                    </button>
                                    <h6 className='text-sm-regular text-gray-500'>
                                        Choice
                                        {field.skillEfficiency
                                            .skillEfficiencyChoices?.length > 1 &&
                                            's'}{' '}
                                        <span className='text-gray-700 underline'>
                                            {field.skillEfficiency
                                                .skillEfficiencyChoices?.length ??
                                                0}
                                        </span>
                                    </h6>
                                </div>
                                <EditChoiceModal
                                    showChoiceModal={field.skillEfficiency.showChoiceModal}
                                    setShowChoiceModal={(value) =>
                                        HandleChoiceModal(question.id,field.id,'skillEfficiency',value)
                                    }
                                    HandleChoices={(choices) =>
                                        HandleChoices(
                                            question.id,
                                            field.id,
                                            'skillEfficiency',
                                            'skillEfficiencyChoices',
                                            choices
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
                </div>
            ))}
        </div>
    );
};

export default SkillsField;