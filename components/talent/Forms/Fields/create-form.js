import React, { useEffect, useState, useRef } from 'react';

import {
  FiEye,
  FiPlus,
  FiLink,
  FiTrash2,
  FiCopy,
  FiMoon,
  FiSun,
  FiSunrise,
  FiSunset,
  FiAlignLeft,
  FiDisc,
  FiCheckSquare,
  FiArrowDownCircle,
  FiUploadCloud,
  FiClock,
  FiCalendar,
  FiMap,
  FiGlobe,
  FiPhone,
  FiFileText,
  FiX,
  FiImage,
  FiFile,
} from 'react-icons/fi';

import { TbSubtask } from 'react-icons/tb';

import Image from 'next/image';
import { useRouter } from 'next/router';
import ProgressBar from '@/components/progress-bar';
import { v4 as uuidv4 } from 'uuid';
import COUNTRIES from '../../../../data/countries.json';
import { PhoneInput, usePhoneValidation } from 'react-international-phone';
import { capitalizeFirstLetter, toCamelCase } from '../../../../utils/utils';
import ActionButtons from '../actionButtons';
import FormDetails from '../form-details';
import ModalComponent from '../popup-modal';
import EditableLabel from '../EditableLabel';
import parse from 'html-react-parser';

import AddressField from './Address';

import DateInput from '@/components/talent/Forms/date-input';
import Select from '../../../select';
import { SwitchButton } from '@/components/talent/Forms/switch-button';
import PhoneNumberInput from '@/components/phone-number-input';
import { getList } from 'country-list-with-dial-code-and-flag';
import SelectWithIcon from '@/components/select-with-icon';
import FlagCombobox from '../../../flag-combobox';
import { EditChoiceModal } from '../edit-choices-modal';
import MultipleChoiceGridModal from '../../multiple-choice-grid-modal';
import {
  event_options,
  workforce_type_options,
  skill_options,
  datatype_options,
  updated_datatype_options,
  initial_form_data,
} from '../form-data';
import ShortTextField from './ShortText';
import ParagraphField from './Paragraph';
import LocationField from './Location';
import DateField from './Date';
import PhoneNumberField from './PhoneNumber';
import CheckBoxField from './Checkbox';
import FileUploadField from './FileUpload';
import DocumentField from './Document';
import DropdownField from './DropDown';
import SkillsField from './Skills';
import MultipleChoiceGrid from './MultipleChoiceGrid';
import TimeInputField from './Time';
import MultipleChoiceField from './MultipleChoice';
import YesNoField from './YesNo';
import YesNoParentField from './YesNoParent';
import TipTap from '../../tip-tap';

function CreateForm() {
  const [formData, setFormData] = useState(initial_form_data);
  const [template_name, setTemplateName] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [showNameModalToast, setShowNameModalToast] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+93 ');
  const [selectedLocation, setSelectedLocation] = useState([]);
  const countryListWithDialCodeAndFlag = getList();
  const [date, setDate] = useState(null);
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [nestedQuestions, setNestedQuestions] = useState([]);
  const [otherInput, setOtherInput] = useState(false);
  const [selectedMultipleCheckbox, setSelectedMultipleCheckbox] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [newActivity, setNewActivity] = useState(false);
  const [customActivities, setCustomActivities] = useState([]);
  const [newActivityName, setNewActivityName] = useState('');
  const inputRef = useRef(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [parent, setParent] = useState(true);
  const [selectedDayTime, setSelectedDayTime] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    event: null,
    workforceType: null,
  });
  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [showGridModal, setShowGridModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [focusedQuestion, setFocusedQuestion] = useState(null);

  const handleFocusQuestion = (id) => {
    setFocusedQuestion(id);
  };

  const HandleSelect = (name, value) => {
    console.log(name, value);
    setSelectedOption({ ...selectedOption, [name]: value });
  };

  const HandleDateChange = (dateProperty, date) => {
    setSelectedDate({
      ...selectedDate,
      [dateProperty]: date,
    });
    console.log(date);
  };

  const HandleNameModalReset = () => {
    setShowNameModal(false);
    // setFormData(initial_form_data);
    setTemplateName('');
  };

  const HandleNameModalToast = () => {
    setShowNameModalToast(false);
  };

  /**
   *
   * multipleChoiceGrid == Activities || Timings
   * @returns {{
   *   fieldName: string,
   *   fieldData: string,
   *   multipleChoiceGrid:  string,
   *   options: {
   *     label: string,
   *     value: boolean,
   *   }[]
   * }}
   */
  const createField = () => {
    return {
      fieldName: 'Field Name',
      fieldData: '',
      // multipleChoiceGrid: "Timings",
      options: [
        { label: 'Option 1', value: false },
        { label: 'Option 2', value: false },
        { label: 'Option 3', value: false },
      ],
    };
  };

  /**
   * Add Question object
   */

  const AddQuestion = () => {
    console.log('Questions: ', questions);
    checkParents();
    console.log('Nested: ', nestedQuestions);
    const newQuestion = {
      id: uuidv4(),
      questionName: '',
      questionType: 'Short Text',
      questionDescription: '',
      questionRequired: false,
    };

    handleFocusQuestion(newQuestion.id);

    setQuestions([...questions, newQuestion]);
  };
  const getInitialDataType = (name) => {
    let newFieldInitialData;
    if (name == 'Short Text') {
      return (newFieldInitialData = {
        id: uuidv4(),
        shortText: '',
        fieldLabel: 'Field Name',
        isEditingLabel: false,
      });
    } else if (name == 'Date') {
      return (newFieldInitialData = {
        id: uuidv4(),
        date: null,
        fieldLabel: 'Date',
        isEditingLabel: false,
      });
    } else if (name == 'Address') {
      return (newFieldInitialData = {
        id: uuidv4(),
        address: {
          value: '',
          fieldLabel: 'Address',
          isEditingLabel: false,
        },
        cityOrEmirate: {
          value: '',
          fieldLabel: 'City/Emirate',
          isEditingLabel: false,
        },
        stateOrRegionOrProvince: {
          value: '',
          fieldLabel: 'State/Region/Province',
          isEditingLabel: false,
        },
        zipOrPostalCode: {
          value: '',
          fieldLabel: 'Zip/Postal code',
          isEditingLabel: false,
        },
        country: {
          value: '',
          fieldLabel: 'Country',
          isEditingLabel: false,
        },
      });
    } else if (name == 'Phone number') {
      return (newFieldInitialData = {
        id: uuidv4(),
        phoneNumber: { phone_number: '', phone_country: '' },
        fieldLabel: 'Phone number',
        isEditingLabel: false,
      });
    } else if (name == 'Location') {
      return (newFieldInitialData = {
        id: uuidv4(),
        location: '',
        fieldLabel: 'Location',
        isEditingLabel: false,
      });
    } else if (name == 'Multiple choice') {
      return (newFieldInitialData = {
        id: uuidv4(),
        multipleChoiceValue: '',
        fieldLabel: 'Option',
        isEditingLabel: false,
        otherChoiceInput: '',
      });
    } else if (name == 'Checkbox') {
      return (newFieldInitialData = {
        id: uuidv4(),
        checkboxValue: '',
        fieldLabel: 'Option',
        isEditingLabel: false,
      });
    } else if (name == 'File upload') {
      return (newFieldInitialData = {
        id: uuidv4(),
        file: '',
      });
    } else if (name == 'Document') {
      return (newFieldInitialData = {
        id: uuidv4(),
        documentType: {
          showChoiceModal: false,
          documentTypeChoices: [],
          value: '',
          fieldLabel: 'Document type',
          isEditingLabel: false,
        },
        documentNumber: {
          value: '',
          fieldLabel: 'Document number',
          isEditingLabel: false,
        },
        date: {
          value: '',
          fieldLabel: 'Expiration date',
          isEditingLabel: false,
        },
      });
    } else if (name == 'Dropdown') {
      return (newFieldInitialData = {
        id: uuidv4(),
        dropdown: {
          showChoiceModal: false,
          dropdownChoices: [],
          value: '',
          fieldLabel: 'Dropdown',
          isEditingLabel: false,
        },
      });
    } else if (name == 'Paragraph') {
      return (newFieldInitialData = {
        id: uuidv4(),
        paragraph: '',
        fieldLabel: 'Paragraph',
        isEditingLabel: false,
      });
    } else if (name == 'Skills') {
      return (newFieldInitialData = {
        id: uuidv4(),
        skills: {
          showChoiceModal: false,
          skillChoices: [],
          value: [],
          fieldLabel: 'Skills',
          isEditingLabel: false,
        },
        skillEfficiency: {
          showChoiceModal: false,
          skillEfficiencyChoices: [],
          value: '',
          fieldLabel: 'Level',
          isEditingLabel: false,
        },
      });
    } else if (name == 'Multiple choice grid') {
      return (newFieldInitialData = {
        activities: [],
        columnNumber: 2,
        isEditingColumnNumber: false,
      });
    } else if (name == 'End screen') {
      return (newFieldInitialData = {
        id: uuidv4(),
        endScreen: '',
      });
    } else if (name == 'Yes/No') {
      return (newFieldInitialData = {
        id: uuidv4(),
        fieldTypeYes: '',
        fieldTypeNo: '',
        typeYesFields: {},
        typeNoFields: {},
      });
    } else if (name == 'Time') {
      return (newFieldInitialData = {
        id: uuidv4(),
        time: '',
        fieldLabel: 'Time',
        isEditingLabel: false,
      });
    }
  };
  /**
   * Add fields in selected question object
   * @param {number} index
   */
  const AddField = (questionId, questionType) => {
    const { name } = questionType;

    let newFieldInitialData = getInitialDataType(name);

    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? { ...question, fields: [...question.fields, newFieldInitialData] }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleSelectDatatype = (id, value) => {
    const { name } = value;
    let initialDataTypeBasedFieldData = getInitialDataType(name);
    const updatedQuestions = questions?.map((question) =>
      question.id === id
        ? {
            ...question,
            questionType: value,
            fields: [initialDataTypeBasedFieldData],
          }
        : question
    );
    console.log('updatedQuestions', updatedQuestions);

    if (name === 'Yes/No') {
      const currentQuestion = updatedQuestions.find(
        (question) => question.id === id
      );
      if (currentQuestion) {
        const newQuestion = {
          id: currentQuestion.id,
          parentId: null,
          questionName: currentQuestion.questionName,
          questionType: currentQuestion.questionType,
          questionDescription: currentQuestion.questionDescription,
          questionRequired: currentQuestion.questionRequired,
          fields: currentQuestion.fields,
        };
        setNestedQuestions((prevNestedQuestions) => [
          ...prevNestedQuestions,
          newQuestion,
        ]);
      }
    }
    setQuestions(updatedQuestions);
  };

  /**
   * Delete selected field for a specific question
   * @param {number} questionIndex
   * @param {number} fieldIndex
   */
  const HandleDeleteField = (questionId, fieldId) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.filter((field) => field.id !== fieldId),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleDeleteActivity = (questionId, activityId) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                activities: question.fields[0].activities.filter(
                  (activity) => activity.id !== activityId
                ),
              },
            ],
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleCopyQuestion = (id) => {
    const questionToBeCopiedIndex = questions.findIndex(
      (question) => question.id === id
    );

    const questionToBeCopied = {
      ...questions[questionToBeCopiedIndex],
      id: uuidv4(),
    };

    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionToBeCopiedIndex + 1, 0, questionToBeCopied);

    setQuestions(updatedQuestions);
    handleFocusQuestion(questionToBeCopied.id);
  };

  /**
   * Delete selected question
   * @param {number} questionIndex
   */
  const HandleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);

    const deletedQuestionIndex = questions.findIndex(
      (question) => question.id === id
    );

    deletedQuestionIndex &&
      handleFocusQuestion(questions[deletedQuestionIndex - 1].id);
    setQuestions(updatedQuestions);
  };

  const HandleShortTextInput = (questionId, fieldId, e) => {
    const { value } = e.target;

    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId ? { ...field, shortText: value } : field
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  /**
   * Phone Datatype
   */
  const HandlePhoneNumberChange = (questionId, fieldId, value, flag) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    phoneNumber: { phone_number: value, phone_country: flag },
                  }
                : field
            ),
          }
        : question
    );

    setQuestions(updatedQuestions);
  };

  /**
   * Date Datatype
   */
  const HandleDateSelect = (
    questionId,
    fieldId,
    name,
    selectedDate,
    multiInputLabel
  ) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [name]: multiInputLabel
                      ? { ...field[name], value: selectedDate }
                      : selectedDate,
                  }
                : field
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleBlurInputChange = (
    questionId,
    fieldId,
    name,
    multiInputLabel
  ) => {
    const key = multiInputLabel ? multiInputLabel : name;
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [key]: multiInputLabel
                      ? { ...field[multiInputLabel], isEditingLabel: false }
                      : false,
                  }
                : field
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleQuestionEditorInputChange = (id, name, value) => {
    const updatedQuestions = questions?.map((question) =>
      question.id === id ? { ...question, [name]: value } : question
    );

    setQuestions(updatedQuestions);
  };

  const HandleQuestionInputChange = (id, event) => {
    const { name, value } = event.target;

    const updatedQuestions = questions?.map((question) =>
      question.id === id ? { ...question, [name]: value } : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleSwitch = (id, value) => {
    const updatedQuestions = questions?.map((question) =>
      question.id === id ? { ...question, questionRequired: value } : question
    );

    setQuestions(updatedQuestions);
  };

  const HandleAddLabel = (questionId, fieldId, multiInputLabel) => {
    const key = multiInputLabel ? multiInputLabel : 'isEditingLabel';
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [key]: multiInputLabel
                      ? { ...field[multiInputLabel], isEditingLabel: true }
                      : true,
                  }
                : field
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleAddColumnNumber = (questionId, name) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [{ ...question.fields[0], [name]: true }],
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleInputChange = (questionId, fieldId, event, multiInputLabel) => {
    const { name, value } = event.target;
    const key = multiInputLabel ? multiInputLabel : name;
    const multiInputLabelKey =
      multiInputLabel && (name == 'fieldLabel' ? 'fieldLabel' : 'value');

    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [key]: multiInputLabel
                      ? {
                          ...field[multiInputLabel],
                          [multiInputLabelKey]: value,
                        }
                      : value,
                  }
                : field
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };
  const HandleColumnNumberInputChange = (questionId, event) => {
    const { name, value } = event.target;

    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [{ ...question.fields[0], [name]: value }],
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleBlurColumnNumberInputChange = (questionId, name) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [{ ...question.fields[0], [name]: false }],
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleCheckboxInputChange = (
    questionId,
    fieldId,
    event,
    option,
    index
  ) => {
    const { name, checked } = event.target;

    const values = [...event_options];
    values[index].isChecked = checked;

    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId ? { ...field, [name]: values } : field
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  /**
   * Location Datatype
   * @param {any} option
   */
  const HandleLocationSelect = (
    questionId,
    fieldId,
    name,
    location,
    multiInputLabel
  ) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [name]: multiInputLabel
                      ? { ...field[name], value: location }
                      : location,
                  }
                : field
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const handleGenderSelect = (questionId, fieldId, selectedGender) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    multipleChoiceValue: selectedGender,
                    otherChoiceInput: '',
                  }
                : field
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleSelectDropdown = (
    questionId,
    fieldId,
    name,
    option,
    multiInputLabel
  ) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [name]: multiInputLabel
                      ? { ...field[name], value: option }
                      : option,
                  }
                : field
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  /**
   * Upload File Datatype
   * @param {any} event
   */
  const HandleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const HandleDragLeave = () => {
    setDragging(false);
  };

  const HandleDrop = (questionId, fieldId, event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const updatedQuestions = questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              fields: question.fields.map((field) =>
                field.id === fieldId ? { ...field, file: file } : field
              ),
            }
          : question
      );
      setQuestions(updatedQuestions);
    }
  };

  const HandleFiles = (questionId, fieldId, { target: { files } }) => {
    if (files) {
      const updatedQuestions = questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              fields: question.fields.map((field) =>
                field.id === fieldId ? { ...field, file: files[0] } : field
              ),
            }
          : question
      );
      setQuestions(updatedQuestions);
    }
  };

  /**
   * Skills Datatype
   * @param {any} selected
   */
  const HandleMultipleCheckboxSelect = (
    questionId,
    fieldId,
    name,
    selectedOption,
    multiInputLabel
  ) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [name]: multiInputLabel
                      ? { ...field[name], value: selectedOption }
                      : selectedOption,
                  }
                : field
            ),
          }
        : question
    );

    setQuestions(updatedQuestions);
  };

  /**
   * Multiple Choice Grid Datatype -> Activities
   * @param {any} activity
   */
  const HandleActivity = (activity) => {
    // Check if the activity is already selected
    const isSelected = selectedActivities.includes(activity);

    // Update the selectedActivities state based on the selection
    if (isSelected) {
      setSelectedActivities(
        selectedActivities.filter(
          (selectedActivity) => selectedActivity !== activity
        )
      );
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const HandleCreateItem = () => {
    if (
      newActivityName.trim() !== '' &&
      !customActivities.includes(newActivityName)
    ) {
      setCustomActivities([...customActivities, newActivityName]);
      setNewActivityName('');
    }
  };

  const HandleInputFocus = () => {
    inputRef.current?.focus();
  };

  const HandleActivityInputChange = (e) => {
    setNewActivityName(e.target.value);
  };

  const HandleInputBlur = () => {
    if (newActivityName.trim() !== '') {
      setNewActivity(false);
      HandleCreateItem();
    }
  };

  const HandleInputKeyDown = (e) => {
    if (e.key === ',') {
      e.preventDefault();
      setNewActivity(false);
      HandleCreateItem();
    }
  };

  const HandleDeleteCustomActivity = (activityName) => {
    setCustomActivities(
      customActivities.filter((activity) => activity !== activityName)
    );
  };

  /**
   * Multiple Choice Grid Datatype -> Timings
   * @param {string} day
   */
  const HandleDays = (day) => {
    const isSelected = selectedDays.includes(day);

    if (isSelected) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const HandleDayTime = (dayTime) => {
    const isSelected = selectedDayTime.includes(dayTime);

    if (isSelected) {
      setSelectedDayTime(
        selectedDayTime.filter((selectDayTime) => selectDayTime !== dayTime)
      );
    } else {
      setSelectedDayTime([...selectedDayTime, dayTime]);
    }
  };

  const EditableColumnNumber = ({
    questionId,
    isEditingLabel,
    columnNumber,
    inputClassName,
  }) => {
    return (
      <>
        {isEditingLabel ? (
          <input
            type='number'
            name='columnNumber'
            value={columnNumber}
            min={2}
            onChange={(e) => HandleColumnNumberInputChange(questionId, e)}
            onBlur={(e) =>
              HandleBlurColumnNumberInputChange(
                questionId,
                'isEditingColumnNumber'
              )
            }
            autoFocus
            className={`w-[172px] h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500 ${inputClassName}`}
          />
        ) : (
          <button
            className='text-sm-regular text-gray-500 outline-none'
            onClick={() =>
              HandleAddColumnNumber(questionId, 'isEditingColumnNumber')
            }
          >
            Column
            {columnNumber?.length > 1 && 's'}{' '}
            <span className='text-gray-700 underline'>{columnNumber}</span>
          </button>
        )}
      </>
    );
  };
  const HandleChoices = (
    questionId,
    fieldId,
    fieldName,
    choiceOptionsName,
    choices
  ) => {
    const choiceKey = choiceOptionsName == 'skillChoices' ? 'name' : 'value';

    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [fieldName]: {
                      ...field[fieldName],
                      [choiceOptionsName]: choices?.map((choice) => ({
                        [choiceKey]: choice.toLowerCase(),
                        label: capitalizeFirstLetter(choice),
                      })),
                      showChoiceModal: false,
                    },
                  }
                : field
            ),
          }
        : question
    );

    setQuestions(updatedQuestions);
  };

  const HandleChoiceModal = (questionId, fieldId, name, value) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [name]: {
                      ...field[name],
                      showChoiceModal: value,
                    },
                  }
                : field
            ),
          }
        : question
    );

    setQuestions(updatedQuestions);
  };

  const HandleGridModal = (value) => {
    setShowGridModal(value);
  };

  const HandleAddChoiceGridOption = (questionId, value) => {
    console.log(value, 'grid choice');
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                activities: [...question.fields[0].activities, value],
              },
            ],
          }
        : question
    );

    setQuestions(updatedQuestions);
  };

  //This function remove each child that has no parent
  const removeChild = (children) => {
    let updatedQuestions = [...nestedQuestions];
    children.forEach((child) => {
      updatedQuestions = nestedQuestions.filter(
        (question) => question.id !== child.id
      );
    });
    setNestedQuestions(updatedQuestions);
    console.log('removed: ', updatedQuestions);
  };

  //This function check is the parent exits for each child
  const checkParents = () => {
    let haveParent = false;
    let noParents = [];
    for (let i = nestedQuestions.length - 1; i >= 0; i--) {
      let currentQuestion = nestedQuestions[i];
      for (let j = 0; j < nestedQuestions.length; j++) {
        if (currentQuestion.parentId == nestedQuestions[j].id) {
          haveParent = true;
          break;
        }
      }
      if (!haveParent && nestedQuestions[i].parentId != null) {
        console.log('Dont have parent: ', nestedQuestions[i]);
        noParents.push(nestedQuestions[i]);
      }
      haveParent = false;
    }
    removeChild(noParents);
    //  console.log("After: ", nestedQuestions);
  };
  const HandleSelectFieldDatatype = (
    questionId,
    boolFieldSelectName,
    value,
    booleanChoice
  ) => {
    const { name } = value;
    let initialDataTypeBasedFieldData = getInitialDataType(name);
    console.log(initialDataTypeBasedFieldData);
    const key = booleanChoice ? 'typeYesFields' : 'typeNoFields';
    const newNestedQuestion = {
      id: uuidv4(),
      questionName: '',
      parentId: questionId,
      questionType: value,
      type: key,
      questionDescription: '',
      questionRequired: false,
      fields: [initialDataTypeBasedFieldData],
    };
    const updatedQuestions = questions?.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                [boolFieldSelectName]: value,
                [key]: newNestedQuestion,
              },
            ],
          }
        : question
    );
    //The purpose of remove is to filter out the previous question at same field of same parent
    const remove = nestedQuestions?.filter((question) => {
      return !(question.parentId === questionId && question.type === key);
    });
    // console.log("remove: ", remove);
    setNestedQuestions(remove);
    const updatedNestedQuestions = remove?.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                [boolFieldSelectName]: value,
                [key]: newNestedQuestion,
              },
            ],
          }
        : question
    );
    //console.log('yono', updatedQuestions);
    setQuestions(updatedQuestions);
    setNestedQuestions([...updatedNestedQuestions, newNestedQuestion]);
  };

  const HandleSelectFieldDatatypeNested = (
    Question,
    boolFieldSelectName,
    value,
    booleanChoice,
    isParent
  ) => {
    // console.log(Question, " hello");
    const { name } = value;
    let initialDataTypeBasedFieldData = getInitialDataType(name);
    console.log(initialDataTypeBasedFieldData);
    const key = booleanChoice ? 'typeYesFields' : 'typeNoFields';
    const newNestedQuestion = {
      id: uuidv4(),
      parentId: Question.id,
      type: key,
      questionType: value,
      fields: [initialDataTypeBasedFieldData],
    };
    const remove = nestedQuestions?.filter((question) => {
      return !(question.parentId === Question.id && question.type === key);
    });
    //console.log("remove: ",remove)
    setNestedQuestions(remove);

    const updatedNestedQuestions = remove?.map((question) =>
      question.id === Question.id
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                [boolFieldSelectName]: value,
                [key]: newNestedQuestion,
              },
            ],
          }
        : question
    );
    //  console.log('NestedUpdateFields: ', updatedNestedQuestions);
    setNestedQuestions([...updatedNestedQuestions, newNestedQuestion]);
  };
  const HandleNestedBlurInputChange = (
    questionId,
    fieldId,
    name,
    multiInputLabel
  ) => {
    const key = multiInputLabel ? multiInputLabel : name;
    const updatedQuestions = nestedQuestions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [key]: multiInputLabel
                      ? { ...field[multiInputLabel], isEditingLabel: false }
                      : false,
                  }
                : field
            ),
          }
        : question
    );
    setNestedQuestions(updatedQuestions);
  };
  const HandleNestedAddLabel = (questionId, fieldId, multiInputLabel) => {
    const key = multiInputLabel ? multiInputLabel : 'isEditingLabel';
    const updatedQuestions = nestedQuestions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [key]: multiInputLabel
                      ? { ...field[multiInputLabel], isEditingLabel: true }
                      : true,
                  }
                : field
            ),
          }
        : question
    );
    setNestedQuestions(updatedQuestions);
  };

  const HandleNestedInputChange = (
    questionId,
    fieldId,
    event,
    multiInputLabel
  ) => {
    const { name, value } = event.target;
    const key = multiInputLabel ? multiInputLabel : name;
    const multiInputLabelKey =
      multiInputLabel && (name == 'fieldLabel' ? 'fieldLabel' : 'value');

    const updatedQuestions = nestedQuestions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [key]: multiInputLabel
                      ? {
                          ...field[multiInputLabel],
                          [multiInputLabelKey]: value,
                        }
                      : value,
                  }
                : field
            ),
          }
        : question
    );
    setNestedQuestions(updatedQuestions);
  };
  const HandleNestedDeleteField = (questionId, fieldId) => {
    const updatedQuestions = nestedQuestions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.filter((field) => field.id !== fieldId),
          }
        : question
    );
    setNestedQuestions(updatedQuestions);
    //  console.log("Del ", updatedQuestions)
  };
  const HandleYesNoFields = (dataType, question, boolFieldName, isParent) => {
    //console.log("NestedQyestions Array: ", nestedQuestions)
    // console.log("Question: " , question)

    if (boolFieldName == 'typeYesFields' && isParent) {
      question = question.fields[0]?.typeYesFields;
      const foundQuestion = nestedQuestions.find((q) => q.id === question.id);
      question = foundQuestion;
    } else if (boolFieldName == 'typeNoFields' && isParent) {
      question = question.fields[0]?.typeNoFields;
      const foundQuestion = nestedQuestions.find((q) => q.id === question.id);
      question = foundQuestion;
    }
    switch (dataType) {
      case 'Short Text': {
        return (
          <ShortTextField
            question={question}
            HandleInputChange={HandleNestedInputChange}
            HandleDeleteField={HandleNestedDeleteField}
            HandleAddLabel={HandleNestedAddLabel}
            HandleBlurInputChange={HandleNestedBlurInputChange}
          />
        );
      }
      case 'Location': {
        return (
          <LocationField
            question={question}
            HandleInputChange={HandleNestedInputChange}
            HandleDeleteField={HandleNestedDeleteField}
            HandleAddLabel={HandleNestedAddLabel}
            HandleBlurInputChange={HandleNestedBlurInputChange}
            HandleLocationSelect={HandleLocationSelect}
            countryListWithDialCodeAndFlag={countryListWithDialCodeAndFlag}
          />
        );
      }
      case 'Date': {
        return (
          <DateField
            question={question}
            HandleInputChange={HandleNestedInputChange}
            HandleDeleteField={HandleNestedDeleteField}
            HandleAddLabel={HandleNestedAddLabel}
            HandleBlurInputChange={HandleNestedBlurInputChange}
            HandleDateSelect={HandleDateSelect}
          />
        );
      }
      case 'Address': {
        return (
          <AddressField
            question={question}
            HandleInputChange={HandleNestedInputChange}
            HandleDeleteField={HandleNestedDeleteField}
            HandleAddLabel={HandleNestedAddLabel}
            HandleBlurInputChange={HandleNestedBlurInputChange}
            countryListWithDialCodeAndFlag={countryListWithDialCodeAndFlag}
          />
        );
      }
      case 'Phone number': {
        return (
          <PhoneNumberField
            question={question}
            HandleInputChange={HandleNestedInputChange}
            HandleDeleteField={HandleNestedDeleteField}
            HandleAddLabel={HandleNestedAddLabel}
            HandleBlurInputChange={HandleNestedBlurInputChange}
            HandlePhoneNumberChange={HandlePhoneNumberChange}
          />
        );
      }
      case 'Checkbox': {
        return (
          <CheckBoxField
            question={question}
            HandleInputChange={HandleNestedInputChange}
            HandleDeleteField={HandleNestedDeleteField}
            HandleAddLabel={HandleNestedAddLabel}
            HandleBlurInputChange={HandleNestedBlurInputChange}
          />
        );
      }
      case 'File upload': {
        return (
          <FileUploadField
            question={question}
            HandleDragOver={HandleDragOver}
            HandleDrop={HandleDrop}
            HandleDragLeave={HandleDragLeave}
            HandleFiles={HandleFiles}
            HandleDeleteField={HandleNestedDeleteField}
            dragging={dragging}
          />
        );
      }
      case 'Document': {
        return (
          <DocumentField
            question={question}
            HandleInputChange={HandleNestedInputChange}
            HandleDeleteField={HandleNestedDeleteField}
            HandleAddLabel={HandleNestedAddLabel}
            HandleBlurInputChange={HandleNestedBlurInputChange}
            HandleSelectDropdown={HandleSelectDropdown}
            HandleChoiceModal={HandleChoiceModal}
            HandleChoices={HandleChoices}
            HandleDateSelect={HandleDateSelect}
          />
        );
      }
      case 'Dropdown': {
        return (
          <DropdownField
            question={question}
            HandleSelectDropdown={HandleSelectDropdown}
            HandleChoiceModal={HandleChoiceModal}
            HandleChoices={HandleChoices}
            HandleInputChange={HandleNestedInputChange}
            HandleDeleteField={HandleNestedDeleteField}
            HandleAddLabel={HandleNestedAddLabel}
            HandleBlurInputChange={HandleNestedBlurInputChange}
          />
        );
      }
      case 'Paragraph': {
        return (
          <ParagraphField
            question={question}
            HandleInputChange={HandleNestedInputChange}
            HandleDeleteField={HandleNestedDeleteField}
            HandleAddLabel={HandleNestedAddLabel}
            HandleBlurInputChange={HandleNestedBlurInputChange}
          />
        );
      }
      case 'Time': {
        return (
          <TimeInputField
            question={question}
            HandleInputChange={HandleNestedInputChange}
            HandleDeleteField={HandleNestedDeleteField}
            HandleAddLabel={HandleNestedAddLabel}
            HandleBlurInputChange={HandleNestedBlurInputChange}
          />
        );
      }
      case 'Multiple choice': {
        return <MultipleChoiceField />;
      }
      case 'Skills': {
        return (
          <SkillsField
            question={question}
            HandleSelectDropdown={HandleSelectDropdown}
            HandleChoiceModal={HandleChoiceModal}
            HandleChoices={HandleChoices}
            HandleMultipleCheckboxSelect={HandleMultipleCheckboxSelect}
            HandleInputChange={HandleNestedInputChange}
            HandleDeleteField={HandleNestedDeleteField}
            HandleAddLabel={HandleNestedAddLabel}
            HandleBlurInputChange={HandleNestedBlurInputChange}
          />
        );
      }
      case 'Multiple choice grid': {
        return (
          <MultipleChoiceGrid
            question={question}
            showGridModal={showGridModal}
            HandleGridModal={HandleGridModal}
            HandleAddChoiceGridOption={HandleAddChoiceGridOption}
            HandleDeleteActivity={HandleDeleteActivity}
          />
        );
      }
      case 'Yes/No':
        return (
          <div>
            <YesNoField
              question={question}
              updated_datatype_options={updated_datatype_options}
              HandleSelectFieldDatatypeNested={HandleSelectFieldDatatypeNested}
              HandleYesNoFields={HandleYesNoFields}
              nestedQuestions={nestedQuestions}
            />
          </div>
        );

      default:
        break;
    }
  };

  // console.log(questions, 'ques');
  return (
    <>
      {/* Actions */}
      <ActionButtons />
      <div className='w-full h-[calc(100vh-185px)] overflow-y-auto rounded-bl-[40px] bg-white px-8 pb-16 space-y-6'>
        <div className='space-y-6'>
          <form className='flex gap-6'>
            <div className='w-2/3 lg:w-3/4'>
              <div className='bg-gray-50 border border-gray-200 rounded-xl shadow-sm'>
                {/* Form */}
                <FormDetails
                  event_options={event_options}
                  selectedOption={selectedOption}
                  HandleSelect={HandleSelect}
                  workforce_type_options={workforce_type_options}
                  selectedDate={selectedDate}
                  HandleDateChange={HandleDateChange}
                  router={router}
                  setShowNameModal={setShowNameModal}
                />
                <ModalComponent
                  showNameModal={showNameModal}
                  setShowNameModal={setShowNameModal}
                  template_name={template_name}
                  setTemplateName={setTemplateName}
                  showNameModalToast={showNameModalToast}
                  HandleNameModalToast={HandleNameModalToast}
                  HandleNameModalReset={HandleNameModalReset}
                  router={router}
                />
              </div>
              {/* Render question divs */}
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className='mt-4 flex gap-1'>
                  <div
                    className={`w-full ${
                      focusedQuestion === question.id &&
                      'bg-primary-600 pl-2 rounded-xl'
                    }`}
                    onClick={() => handleFocusQuestion(question.id)}
                  >
                    <div
                      className={`bg-gray-50 border border-gray-200 ${
                        focusedQuestion === question.id
                          ? 'pt-1 pb-8 px-8'
                          : 'p-8'
                      } rounded-xl shadow-sm`}
                    >
                      {focusedQuestion === question.id && (
                        <div className='flex justify-center items center mb-2'>
                          <Image
                            src='/images/braile.svg'
                            alt='braile icon'
                            width={20}
                            height={20}
                            className='w-5 h-5'
                          />
                        </div>
                      )}
                      <div className='space-y-6'>
                        <div className='flex justify-between gap-x-6'>
                          {/* Select question */}
                          <div className='w-1/2'>
                            <label
                              className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                              htmlFor='question'
                            >
                              Question
                              <span className='text-primary-600'>*</span>
                              <div className='relative'>
                                <TipTap
                                  text={question.questionName}
                                  onChange={(value) =>
                                    HandleQuestionEditorInputChange(
                                      question.id,
                                      'questionName',
                                      value
                                    )
                                  }
                                />
                              </div>
                            </label>
                          </div>
                          {/* Select datatype */}
                          <div className='w-1/2'>
                            <label
                              className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                              htmlFor={`datatype-${questionIndex}`}
                            >
                              Select Datatype
                              <span className='text-primary-600'>*</span>
                            </label>
                            <SelectWithIcon
                              options={datatype_options}
                              selectedOption={question.questionType}
                              onSelect={(value) =>
                                HandleSelectDatatype(question.id, value)
                              }
                              placeholder={'Please choose an option'}
                            />
                          </div>
                        </div>
                        <div className='w-full'>
                          <label
                            className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                            htmlFor='description'
                          >
                            Description
                            <span className='text-primary-600'>*</span>
                            <div className='relative'>
                              <input
                                id='description'
                                name='questionDescription'
                                type='text'
                                value={question.questionDescription}
                                placeholder='Enter question description'
                                onChange={(e) =>
                                  HandleQuestionInputChange(question.id, e)
                                }
                                required
                                className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                              />
                            </div>
                          </label>
                        </div>
                        <div className='w-full flex justify-between items-center gap-x-6'>
                          <SwitchButton
                            isChecked={question.questionRequired}
                            onChange={(value) =>
                              HandleSwitch(question.id, value)
                            }
                            labelText='Required'
                          />
                          {question.questionType.name ===
                            'Multiple choice grid' && (
                            <EditableColumnNumber
                              questionId={question.id}
                              isEditingLabel={
                                question.fields[0].isEditingColumnNumber
                              }
                              columnNumber={question.fields[0]?.columnNumber}
                            />
                          )}
                        </div>
                        <div className='w-full h-px bg-gray-200' />
                        {/* Rendering fields */}
                        {question.questionType.name === 'Date' && (
                          <DateField
                            question={question}
                            HandleDeleteField={HandleDeleteField}
                            HandleAddLabel={HandleAddLabel}
                            HandleDateSelect={HandleDateSelect}
                            HandleInputChange={HandleInputChange}
                            HandleBlurInputChange={HandleBlurInputChange}
                          />
                        )}
                        {question.questionType.name === 'Short Text' && (
                          <div className='space-y-6'>
                            <ShortTextField
                              question={question}
                              HandleInputChange={HandleInputChange}
                              HandleDeleteField={HandleDeleteField}
                              HandleAddLabel={HandleAddLabel}
                              HandleBlurInputChange={HandleBlurInputChange}
                            />
                          </div>
                        )}
                        {question.questionType.name === 'Address' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for Address */}
                            <AddressField
                              question={question}
                              HandleInputChange={HandleInputChange}
                              HandleDeleteField={HandleDeleteField}
                              HandleAddLabel={HandleAddLabel}
                              HandleBlurInputChange={HandleBlurInputChange}
                              countryListWithDialCodeAndFlag={
                                countryListWithDialCodeAndFlag
                              }
                            />
                          </div>
                        )}
                        {question.questionType.name === 'Phone number' && (
                          <PhoneNumberField
                            question={question}
                            HandleInputChange={HandleInputChange}
                            HandleDeleteField={HandleDeleteField}
                            HandleAddLabel={HandleAddLabel}
                            HandleBlurInputChange={HandleBlurInputChange}
                            HandlePhoneNumberChange={HandlePhoneNumberChange}
                          />
                        )}
                        {question.questionType.name === 'Location' && (
                          <LocationField
                            question={question}
                            HandleInputChange={HandleInputChange}
                            HandleDeleteField={HandleDeleteField}
                            HandleAddLabel={HandleAddLabel}
                            HandleBlurInputChange={HandleBlurInputChange}
                            HandleLocationSelect={HandleLocationSelect}
                            countryListWithDialCodeAndFlag={
                              countryListWithDialCodeAndFlag
                            }
                          />
                        )}
                        {question.questionType.name === 'Multiple choice' && (
                          <MultipleChoiceField />
                        )}
                        {question.questionType.name === 'Checkbox' && (
                          <CheckBoxField
                            question={question}
                            HandleInputChange={HandleInputChange}
                            HandleDeleteField={HandleDeleteField}
                            HandleAddLabel={HandleAddLabel}
                            HandleBlurInputChange={HandleBlurInputChange}
                          />
                        )}
                        {question.questionType.name === 'File upload' && (
                          <FileUploadField
                            question={question}
                            HandleDragOver={HandleDragOver}
                            HandleDrop={HandleDrop}
                            HandleDragLeave={HandleDragLeave}
                            HandleFiles={HandleFiles}
                            HandleDeleteField={HandleDeleteField}
                            dragging={dragging}
                          />
                        )}
                        {question.questionType.name === 'Document' && (
                          <DocumentField
                            question={question}
                            HandleInputChange={HandleInputChange}
                            HandleDeleteField={HandleDeleteField}
                            HandleSelectDropdown={HandleSelectDropdown}
                            HandleChoiceModal={HandleChoiceModal}
                            HandleChoices={HandleChoices}
                            HandleDateSelect={HandleDateSelect}
                            HandleAddLabel={HandleAddLabel}
                            HandleBlurInputChange={HandleBlurInputChange}
                          />
                        )}
                        {question.questionType.name === 'Dropdown' && (
                          <DropdownField
                            question={question}
                            HandleSelectDropdown={HandleSelectDropdown}
                            HandleChoiceModal={HandleChoiceModal}
                            HandleChoices={HandleChoices}
                            HandleDeleteField={HandleDeleteField}
                            HandleBlurInputChange={HandleBlurInputChange}
                            HandleInputChange={HandleInputChange}
                            HandleAddLabel={HandleAddLabel}
                          />
                        )}
                        {question.questionType.name === 'Paragraph' && (
                          <ParagraphField
                            question={question}
                            HandleInputChange={HandleInputChange}
                            HandleDeleteField={HandleDeleteField}
                            HandleAddLabel={HandleAddLabel}
                            HandleBlurInputChange={HandleBlurInputChange}
                          />
                        )}
                        {question.questionType.name === 'Skills' && (
                          <SkillsField
                            question={question}
                            HandleSelectDropdown={HandleSelectDropdown}
                            HandleChoiceModal={HandleChoiceModal}
                            HandleChoices={HandleChoices}
                            HandleMultipleCheckboxSelect={
                              HandleMultipleCheckboxSelect
                            }
                            HandleDeleteField={HandleDeleteField}
                            HandleBlurInputChange={HandleBlurInputChange}
                            HandleInputChange={HandleInputChange}
                            HandleAddLabel={HandleAddLabel}
                          />
                        )}
                        {question.questionType.name ===
                          'Multiple choice grid' && (
                          <MultipleChoiceGrid
                            question={question}
                            showGridModal={showGridModal}
                            HandleGridModal={HandleGridModal}
                            HandleAddChoiceGridOption={
                              HandleAddChoiceGridOption
                            }
                            HandleDeleteActivity={HandleDeleteActivity}
                          />
                        )}
                        {question.questionType.name === 'End screen' && <></>}
                        {question.questionType.name === 'Yes/No' && (
                          <YesNoParentField
                            question={question}
                            updated_datatype_options={updated_datatype_options}
                            HandleSelectFieldDatatype={
                              HandleSelectFieldDatatype
                            }
                            HandleYesNoFields={HandleYesNoFields}
                          />
                        )}
                        {question.questionType.name === 'Time' && (
                          <TimeInputField
                            question={question}
                            HandleInputChange={HandleInputChange}
                            HandleDeleteField={HandleDeleteField}
                            HandleBlurInputChange={HandleBlurInputChange}
                            HandleAddLabel={HandleAddLabel}
                          />
                        )}
                        {question.questionType.name &&
                          question.questionType.name != 'Yes/No' &&
                          question.questionType.name != 'File upload' &&
                          question.questionType.name != 'End screen' && (
                            <button
                              type='button'
                              className='inline-flex items-center gap-x-2 text-xs-semibold 2xl:text-sm-semibold text-gray-600 text-center disabled:opacity-75 disabled:pointer-events-none'
                              onClick={() =>
                                AddField(question.id, question.questionType)
                              }
                            >
                              Add Another
                              <FiPlus className='w-4 2xl:w-5 h-auto text-gray-600' />
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className='pt-6 space-y-2'>
                    <button
                      className='w-9 h-9 rounded-lg flex items-center justify-center'
                      onClick={() => HandleCopyQuestion(question.id)}
                    >
                      <FiCopy className='w-5 h-5 text-gray-700' />
                    </button>
                    <button
                      className='w-9 h-9 rounded-lg flex items-center justify-center'
                      onClick={() => HandleDeleteQuestion(question.id)}
                    >
                      <FiTrash2 className='w-5 h-5 text-gray-700' />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type='button'
                className='h-10 text-center inline-flex items-center gap-2 mt-2 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-primary-600 px-4 py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                onClick={AddQuestion}
              >
                Add Question
                <FiPlus className='w-4 2xl:w-5 h-auto text-primary-700' />
              </button>
            </div>
            <div className='border-l border-gray-300' />
            <div className='sticky top-0 right-0 w-1/3 lg:w-1/4 h-[calc(100vh-227px)] bg-gray-50 space-y-6 p-8 border border-gray-200 rounded-2xl shadow-sm'>
              {/* Right Modal */}
              <div className='w-full flex items-center gap-x-[15px]'>
                <div className='w-10 h-10 flex justify-center items-center bg-primary-100 rounded-full'>
                  <FiFile className='w-5 h-5 text-primary-600' />
                </div>
                <p className='text-md-semibold text-black'>Form Content</p>
              </div>
              <div className='h-[calc(100vh-365px)] overflow-y-auto space-y-1'>
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className='w-full flex gap-x-2 text-md-regular text-gray-600'
                  >
                    <p>{index + 1}.</p>
                    <p>{parse(question.questionName)}</p>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default CreateForm;
