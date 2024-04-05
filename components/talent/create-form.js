import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useMemo,
  createRef,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ToastPopup from '@/components/toast/toast-popup';
import { getEvent } from '@/pages/api/get';
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
import {
  IoApps,
  IoReorderTwoOutline,
  IoExtensionPuzzleOutline,
} from 'react-icons/io5';
import { TbSubtask } from 'react-icons/tb';
import { RiCheckboxMultipleLine } from 'react-icons/ri';
import { BsCircleHalf } from 'react-icons/bs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ProgressBar from '@/components/progress-bar';
import { v4 as uuidv4 } from 'uuid';
import COUNTRIES from '../../data/countries.json';
import { PhoneInput, usePhoneValidation } from 'react-international-phone';
import { capitalizeFirstLetter, toCamelCase } from '../../utils/utils';

import DateInput from '@/components/date-input';
import Select from '../select';
import { SwitchButton } from '@/components/switch-button';
import PhoneNumberInput from '@/components/phone-number-input';
import CheckboxMultiSelectCombobox from '@/components/checkbox-multiselect-combobox';
import LocationCombobox from '@/components/location-combobox';
import { getList } from 'country-list-with-dial-code-and-flag';
import SelectWithIcon from '@/components/select-with-icon';
import FlagCombobox from '../flag-combobox';
import { EditChoiceModal } from './edit-choices-modal';
import MultipleChoiceGridModal from './multiple-choice-grid-modal';
import { addForm } from '@/pages/api/post';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import TipTap from './tip-tap';
import parse from 'html-react-parser';

// const event_options = [
//   { label: 'Daira', value: 'Daira', isChecked: false },
//   { label: 'Expo', value: 'Expo', isChecked: false },
// ];

const workforce_type_options = [
  { label: 'Paid Staff', value: 'Paid Staff' },
  { label: 'Volunteer', value: 'Volunteer' },
];

const skill_efficiency_options = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
  { label: 'Expert', value: 'Expert' },
];

const skill_options = [
  { name: 'First-aid', value: 'First-aid' },
  { name: 'Carpentry', value: 'Carpentry' },
  { name: 'Stage-setup', value: 'Stage-setup' },
  { name: 'photography', value: 'photography' },
];

const activities_options = [
  'Activity 1',
  'Activity 2',
  'Activity 3',
  'Activity 4',
  'Activity 5',
  'Activity 6',
  'Activity 7',
  'Activity 8',
];

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const day_time_options = [
  { icon: <FiSunrise className='w-6 h-6 text-gray-700' />, daytime: 'Morning' },
  { icon: <FiSun className='w-6 h-6 text-gray-700' />, daytime: 'Noon' },
  {
    icon: <FiSunset className='w-6 h-6 text-gray-700' />,
    daytime: 'Afternoon',
  },
  { icon: <FiMoon className='w-6 h-6 text-gray-700' />, daytime: 'Night' },
];

const gender_options = [
  { value: 'Female' },
  { value: 'Male' },
  { value: 'Nonbinary' },
  { value: 'Prefer not to say' },
  { value: 'Other' },
];

const modules = {
  toolbar: [['bold', 'italic', 'underline', 'strike', 'color'], ['link']],
};
const formats = ['bold', 'italic', 'underline', 'strike', 'color', 'link'];

const datatype_options = [
  { name: 'Short Text', icon: <IoReorderTwoOutline /> },
  { name: 'Date', icon: <FiCalendar /> },
  { name: 'Phone number', icon: <FiPhone /> },
  { name: 'Address', icon: <FiMap /> },
  { name: 'Paragraph', icon: <FiAlignLeft /> },
  { name: 'Multiple choice', icon: <FiDisc /> },
  { name: 'Yes/No', icon: <BsCircleHalf /> },
  { name: 'Checkbox', icon: <FiCheckSquare /> },
  { name: 'Dropdown', icon: <FiArrowDownCircle /> },
  { name: 'Multiple choice grid', icon: <IoApps /> },
  { name: 'File upload', icon: <FiUploadCloud /> },
  { name: 'Time', icon: <FiClock /> },
  { name: 'Location', icon: <FiGlobe /> },
  { name: 'Document', icon: <FiFileText /> },
  { name: 'Skills', icon: <IoExtensionPuzzleOutline /> },
  { name: 'End screen', icon: <RiCheckboxMultipleLine /> },
];

const updated_datatype_options = [
  { name: 'Short Text', icon: <IoReorderTwoOutline /> },
  { name: 'Date', icon: <FiCalendar /> },
  { name: 'Phone number', icon: <FiPhone /> },
  { name: 'Address', icon: <FiMap /> },
  { name: 'Paragraph', icon: <FiAlignLeft /> },
  { name: 'Multiple choice', icon: <FiDisc /> },
  { name: 'Yes/No', icon: <BsCircleHalf /> },
  { name: 'Checkbox', icon: <FiCheckSquare /> },
  { name: 'Dropdown', icon: <FiArrowDownCircle /> },
  { name: 'Multiple choice grid', icon: <IoApps /> },
  { name: 'File upload', icon: <FiUploadCloud /> },
  { name: 'Time', icon: <FiClock /> },
  { name: 'Location', icon: <FiGlobe /> },
  { name: 'Document', icon: <FiFileText /> },
  { name: 'Skills', icon: <IoExtensionPuzzleOutline /> },
  { name: 'End screen', icon: <RiCheckboxMultipleLine /> },
  { name: 'Skip', icon: <FiX /> },
];

const initial_form_data = {
  event_name: '',
  start_date: '',
  end_date: '',
  workforce_type: '',
  questions: [{}],
};

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

  const [event_options, setEvent_Options] = useState([]);
  const [focusedQuestion, setFocusedQuestion] = useState(null);

  const handleFocusQuestion = (id) => {
    setFocusedQuestion(id);
  };

  const CreateForm = async () => {
    let allQuestions = [];
    questions.map((obj) => {
      let singleQuestion = {
        question_name: obj.questionName,
        question_description: obj.questionDescription,
        question_type: obj.questionType?.name,
        question_required: obj.questionRequired ? 1 : 0,
      };

      allQuestions.push(singleQuestion);
    });

    let allQuestionsString = JSON.stringify(allQuestions);

    let response = await addForm(
      selectedOption?.event?.value,
      selectedOption?.workforceType?.value,
      selectedDate.startDate.toLocaleDateString(),
      selectedDate.endDate.toLocaleDateString(),
      allQuestionsString
    );
    if (response.valid) {
      alert('Congratulations! Form has been created');
    } else {
      alert('There was some issue in creating the form');
    }
  };

  useEffect(() => {
    if (event_options.length === 0) {
      GetAllEvents();
    }
  });

  const GetAllEvents = async () => {
    let res = await getEvent();
    let { valid, data } = res;
    if (valid) {
      let options = [];
      data.map((obj) => {
        let item = {
          value: obj.event_guid,
          label: obj.event_name,
        };

        options.push(item);
      });
      setEvent_Options(options);
    }
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
    const newQuestion = {
      id: uuidv4(),
      questionName: 'Whats is your name?',
      questionType: 'Short Text',
      questionDescription: 'Name here',
      questionRequired: false,
      allowCustomText: false,
    };

    handleFocusQuestion(newQuestion.id);

    setQuestions([...questions, newQuestion]);
  };

  /**
   * Add fields in selected question object
   * @param {number} index
   */
  const AddField = (questionId, questionType) => {
    const { name } = questionType;

    let newFieldInitialData;
    if (name == 'Short Text') {
      newFieldInitialData = {
        id: uuidv4(),
        shortText: '',
        fieldLabel: 'Field name',
        isEditingLabel: false,
      };
    } else if (name == 'Date') {
      newFieldInitialData = {
        id: uuidv4(),
        date: null,
        fieldLabel: 'Date',
        isEditingLabel: false,
      };
    } else if (name == 'Address') {
      newFieldInitialData = {
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
      };
    } else if (name == 'Phone number') {
      newFieldInitialData = {
        id: uuidv4(),
        phoneNumber: { phone_number: '', phone_country: '' },
        fieldLabel: 'Phone number',
        isEditingLabel: false,
      };
    } else if (name == 'Location') {
      newFieldInitialData = {
        id: uuidv4(),
        location: '',
        fieldLabel: 'Location',
        isEditingLabel: false,
      };
    } else if (name == 'Multiple choice') {
      newFieldInitialData = {
        id: uuidv4(),
        multipleChoiceValue: '',
        fieldLabel: 'Option',
        isEditingLabel: false,
        otherChoiceInput: '',
      };
    } else if (name == 'Checkbox') {
      newFieldInitialData = {
        id: uuidv4(),
        checkboxValue: '',
        fieldLabel: 'Option',
        isEditingLabel: false,
      };
    } else if (name == 'File upload') {
      newFieldInitialData = {
        id: uuidv4(),
        file: '',
      };
    } else if (name == 'Document') {
      newFieldInitialData = {
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
      };
    } else if (name == 'Dropdown') {
      newFieldInitialData = {
        id: uuidv4(),
        dropdown: {
          showChoiceModal: false,
          dropdownChoices: [],
          value: '',
          fieldLabel: 'Dropdown',
          isEditingLabel: false,
        },
      };
    } else if (name == 'Paragraph') {
      newFieldInitialData = {
        id: uuidv4(),
        paragraph: '',
        fieldLabel: 'Paragraph',
        isEditingLabel: false,
      };
    } else if (name == 'Skills') {
      newFieldInitialData = {
        id: uuidv4(),
        isMultipleAnswer: false,
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
      };
    } else if (name == 'Multiple choice grid') {
      newFieldInitialData = {
        activities: [],
        columnNumber: 2,
        isEditingColumnNumber: false,
      };
    } else if (name == 'End screen') {
      newFieldInitialData = {
        id: uuidv4(),
        endScreen: '',
      };
    } else if (name == 'Yes/No') {
      newFieldInitialData = {
        id: uuidv4(),
        fieldTypeYes: '',
        fieldTypeNo: '',
        typeYesFields: {},
        typeNoFields: {},
      };
    } else if (name == 'Time') {
      newFieldInitialData = {
        id: uuidv4(),
        time: '',
        fieldLabel: 'Time',
        isEditingLabel: false,
      };
    }

    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? { ...question, fields: [...question.fields, newFieldInitialData] }
        : question
    );
    setQuestions(updatedQuestions);
  };

  /**
   * Select datatype for selected question object
   * @param {number} index
   * @param {string} value
   */
  const HandleSelectDatatype = (id, value) => {
    const { name } = value;

    let initialDataTypeBasedFieldData;
    if (name == 'Short Text') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        shortText: '',
        fieldLabel: 'Field name',
        isEditingLabel: false,
      };
    } else if (name == 'Date') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        date: null,
        fieldLabel: 'Date',
        isEditingLabel: false,
      };
    } else if (name == 'Address') {
      initialDataTypeBasedFieldData = {
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
      };
    } else if (name == 'Phone number') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        phoneNumber: { phone_number: '', phone_country: '' },
        fieldLabel: 'Phone number',
        isEditingLabel: false,
      };
    } else if (name == 'Location') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        location: '',
        fieldLabel: 'Location',
        isEditingLabel: false,
      };
    } else if (name == 'Multiple choice') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        multipleChoiceValue: '',
        fieldLabel: 'Option',
        isEditingLabel: false,
        otherChoiceInput: '',
      };
    } else if (name == 'Checkbox') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        checkboxValue: '',
        fieldLabel: 'Option',
        isEditingLabel: false,
      };
    } else if (name == 'File upload') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        file: '',
      };
    } else if (name == 'Document') {
      initialDataTypeBasedFieldData = {
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
      };
    } else if (name == 'Dropdown') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        dropdown: {
          showChoiceModal: false,
          dropdownChoices: [],
          value: '',
          fieldLabel: 'Dropdown',
          isEditingLabel: false,
        },
      };
    } else if (name == 'Paragraph') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        paragraph: '',
        fieldLabel: 'Paragraph',
        isEditingLabel: false,
      };
    } else if (name == 'Skills') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        isMultipleAnswer: false,
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
      };
    } else if (name == 'Multiple choice grid') {
      initialDataTypeBasedFieldData = {
        activities: [],
        columnNumber: 2,
        isEditingColumnNumber: false,
      };
    } else if (name == 'End screen') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        endScreen: '',
      };
    } else if (name == 'Yes/No') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        fieldTypeYes: '',
        fieldTypeNo: '',
        typeYesFields: {},
        typeNoFields: {},
      };
    } else if (name == 'Time') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        time: '',
        fieldLabel: 'Time',
        isEditingLabel: false,
      };
    }

    const updatedQuestions = questions?.map((question) =>
      question.id === id
        ? {
            ...question,
            questionType: value,
            fields: [initialDataTypeBasedFieldData],
          }
        : question
    );
    console.log('yo', updatedQuestions);

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

  const HandleYesNoFieldPhoneNumberChange = (
    questionId,
    boolFieldName,
    value,
    flag
  ) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                [boolFieldName]: {
                  ...question.fields[0][boolFieldName],
                  phoneNumber: { phone_number: value, phone_country: flag },
                },
              },
            ],
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

  const HandleYesNoFieldDateSelect = (
    questionId,
    boolFieldName,
    name,
    selectedDate,
    multiInputLabel
  ) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                [boolFieldName]: {
                  ...question.fields[0][boolFieldName],
                  [name]: multiInputLabel
                    ? {
                        ...question.fields[0][boolFieldName][name],
                        value: selectedDate,
                      }
                    : selectedDate,
                },
              },
            ],
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const handleContentChange = (content, id, name) => {
    const updatedQuestions = questions?.map((question) =>
      question.id === id ? { ...question, [name]: content } : question
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

  const HandleQuestionEditorInputChange = (id, name, value) => {
    const updatedQuestions = questions?.map((question) =>
      question.id === id ? { ...question, [name]: value } : question
    );

    setQuestions(updatedQuestions);
  };

  const HandleSwitch = (id, name, value) => {
    const updatedQuestions = questions?.map((question) =>
      question.id === id ? { ...question, [name]: value } : question
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

  const HandleYesNoFieldAddLabel = (
    questionId,
    boolFieldName,
    multiInputLabel
  ) => {
    const key = multiInputLabel ? multiInputLabel : 'isEditingLabel';
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                [boolFieldName]: {
                  ...question.fields[0][boolFieldName],
                  [key]: multiInputLabel
                    ? {
                        ...question.fields[0][boolFieldName][multiInputLabel],
                        isEditingLabel: true,
                      }
                    : true,
                },
              },
            ],
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

  const handleTimeInputChange = (questionId, fieldId, name, time) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [name]: time,
                  }
                : field
            ),
          }
        : question
    );

    setQuestions(updatedQuestions);
  };

  const handleToggleMultipleAnswer = (questionId, fieldId, name, value) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [name]: value,
                  }
                : field
            ),
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

  const HandleYesNoFieldBlurInputChange = (
    questionId,
    boolFieldName,
    name,
    multiInputLabel
  ) => {
    const key = multiInputLabel ? multiInputLabel : name;
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                [boolFieldName]: {
                  ...question.fields[0][boolFieldName],
                  [key]: multiInputLabel
                    ? {
                        ...question.fields[0][boolFieldName][multiInputLabel],
                        isEditingLabel: false,
                      }
                    : false,
                },
              },
            ],
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const HandleColumnNumberInputChange = (questionId, event) => {
    const { name, value } = event.target;
    const updatedValue = value ?? 1;

    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [{ ...question.fields[0], [name]: updatedValue }],
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

  const HandleYesNoFieldLocationSelect = (
    questionId,
    boolFieldName,
    name,
    location,
    multiInputLabel
  ) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                [boolFieldName]: {
                  ...question.fields[0][boolFieldName],
                  [name]: multiInputLabel
                    ? {
                        ...question.fields[0][boolFieldName][name],
                        value: location,
                      }
                    : location,
                },
              },
            ],
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

  const HandleSelectFieldDatatype = (
    questionId,
    boolFieldSelectName,
    value,
    booleanChoice
  ) => {
    const { name } = value;

    let initialDataTypeBasedFieldData;
    if (name == 'Short Text') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        shortText: '',
        fieldLabel: 'Field name',
        isEditingLabel: false,
      };
    } else if (name == 'Date') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        date: null,
        fieldLabel: 'Date',
        isEditingLabel: false,
      };
    } else if (name == 'Address') {
      initialDataTypeBasedFieldData = {
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
      };
    } else if (name == 'Phone number') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        phoneNumber: { phone_number: '', phone_country: '' },
        fieldLabel: 'Phone number',
        isEditingLabel: false,
      };
    } else if (name == 'Location') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        location: '',
        fieldLabel: 'Location',
        isEditingLabel: false,
      };
    } else if (name == 'Multiple choice') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        multipleChoiceValue: '',
        fieldLabel: 'Option',
        isEditingLabel: false,
        otherChoiceInput: '',
      };
    } else if (name == 'Checkbox') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        checkboxValue: '',
        fieldLabel: 'Option',
        isEditingLabel: false,
      };
    } else if (name == 'File upload') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        file: '',
      };
    } else if (name == 'Document') {
      initialDataTypeBasedFieldData = {
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
      };
    } else if (name == 'Dropdown') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        dropdown: {
          showChoiceModal: false,
          dropdownChoices: [],
          value: '',
          fieldLabel: 'Dropdown',
          isEditingLabel: false,
        },
      };
    } else if (name == 'Paragraph') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        paragraph: '',
        fieldLabel: 'Paragraph',
        isEditingLabel: false,
      };
    } else if (name == 'Skills') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        isMultipleAnswer: false,
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
      };
    } else if (name == 'Multiple choice grid') {
      initialDataTypeBasedFieldData = {
        activities: [],
        columnNumber: 2,
        isEditingColumnNumber: false,
      };
    } else if (name == 'End screen') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        endScreen: '',
      };
    } else if (name == 'Yes/No') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        fieldTypeYes: '',
        fieldTypeNo: '',
        typeYesFields: {},
        typeNoFields: {},
      };
    } else if (name == 'Time') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        time: '',
        fieldLabel: 'Time',
        isEditingLabel: false,
      };
    }

    const key = booleanChoice ? 'typeYesFields' : 'typeNoFields';
    const updatedQuestions = questions?.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                [boolFieldSelectName]: value,
                [key]: initialDataTypeBasedFieldData,
              },
            ],
          }
        : question
    );
    // console.log('yono', updatedQuestions);

    setQuestions(updatedQuestions);
  };

  const HandleSelectNestedFieldDatatype = (
    questionId,
    boolFieldSelectName,
    value,
    boolFieldName,
    booleanChoice
  ) => {
    const { name } = value;

    let initialDataTypeBasedFieldData;
    if (name == 'Short Text') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        shortText: '',
        fieldLabel: 'Field name',
        isEditingLabel: false,
      };
    } else if (name == 'Date') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        date: null,
        fieldLabel: 'Date',
        isEditingLabel: false,
      };
    } else if (name == 'Address') {
      initialDataTypeBasedFieldData = {
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
      };
    } else if (name == 'Phone number') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        phoneNumber: { phone_number: '', phone_country: '' },
        fieldLabel: 'Phone number',
        isEditingLabel: false,
      };
    } else if (name == 'Location') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        location: '',
        fieldLabel: 'Location',
        isEditingLabel: false,
      };
    } else if (name == 'Multiple choice') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        multipleChoiceValue: '',
        fieldLabel: 'Option',
        isEditingLabel: false,
        otherChoiceInput: '',
      };
    } else if (name == 'Checkbox') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        checkboxValue: '',
        fieldLabel: 'Option',
        isEditingLabel: false,
      };
    } else if (name == 'File upload') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        file: '',
      };
    } else if (name == 'Document') {
      initialDataTypeBasedFieldData = {
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
      };
    } else if (name == 'Dropdown') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        dropdown: {
          showChoiceModal: false,
          dropdownChoices: [],
          value: '',
          fieldLabel: 'Dropdown',
          isEditingLabel: false,
        },
      };
    } else if (name == 'Paragraph') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        paragraph: '',
        fieldLabel: 'Paragraph',
        isEditingLabel: false,
      };
    } else if (name == 'Skills') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        isMultipleAnswer: false,
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
      };
    } else if (name == 'Multiple choice grid') {
      initialDataTypeBasedFieldData = {
        activities: [],
        columnNumber: 2,
        isEditingColumnNumber: false,
      };
    } else if (name == 'End screen') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        endScreen: '',
      };
    } else if (name == 'Yes/No') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        fieldTypeYes: '',
        fieldTypeNo: '',
        typeYesFields: {},
        typeNoFields: {},
      };
    } else if (name == 'Time') {
      initialDataTypeBasedFieldData = {
        id: uuidv4(),
        time: '',
        fieldLabel: 'Time',
        isEditingLabel: false,
      };
    }

    const key = booleanChoice ? 'typeYesFields' : 'typeNoFields';

    const nestedBoolDataTypeObject = (field) => {
      let count = 0;
      let nestedFieldSelectValue;
      while (field[key][boolFieldSelectName] != '') {
        count++;
        if (key[boolFieldSelectName] == '') {
          nestedFieldSelectValue = {
            [boolFieldSelectName]: value,
            [key]: initialDataTypeBasedFieldData,
          };
          break;
        }
      }
      console.log(count, 'count');
      console.log(nestedFieldSelectValue, 'nestedBoolDataTypeObject');
      return nestedFieldSelectValue;
    };

    const updatedQuestions = questions?.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                // ...nestedBoolDataTypeObject(question.fields[0]),
                [boolFieldName]: {
                  ...question.fields[0][boolFieldName],
                  [boolFieldSelectName]: value,
                  [key]: initialDataTypeBasedFieldData,
                  // ...HandleSelectNestedFieldDatatype(question.id,
                  //   boolFieldSelectName,
                  //   value,
                  //   booleanChoice)
                },
              },
            ],
          }
        : question
    );
    console.log('yono', updatedQuestions);

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

  const EditableLabel = ({
    questionId,
    fieldId,
    isEditingLabel,
    fieldLabel,
    margin,
    inputClassName,
    display,
    labelClassName,
    required,
    multiInputLabel,
  }) => {
    console.log(required, 'required');
    return (
      <div className={`${margin ? margin : 'mb-1.5'} ${display}`}>
        {isEditingLabel ? (
          <input
            type='text'
            name='fieldLabel'
            value={fieldLabel}
            onChange={(e) =>
              HandleInputChange(questionId, fieldId, e, multiInputLabel)
            }
            onBlur={(e) =>
              HandleBlurInputChange(
                questionId,
                fieldId,
                'isEditingLabel',
                multiInputLabel
              )
            }
            autoFocus
            className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 appearance-none px-3.5 py-2.5 border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 rounded-lg shadow-xs outline-none placeholder:text-gray-500 ${inputClassName}`}
          />
        ) : (
          <label
            className={`block w-full text-gray-700 underline cursor-pointer ${
              labelClassName
                ? labelClassName
                : 'text-xs-medium 2xl:text-sm-medium'
            }`}
            htmlFor={toCamelCase(fieldLabel)}
            onClick={() => HandleAddLabel(questionId, fieldId, multiInputLabel)}
          >
            {capitalizeFirstLetter(fieldLabel)}
            {required && <span className='text-primary-600'>*</span>}
          </label>
        )}
      </div>
    );
  };

  const BoolFieldEditableLabel = ({
    questionId,
    isEditingLabel,
    fieldLabel,
    boolFieldName,
    margin,
    inputClassName,
    display,
    labelClassName,
    required,
    multiInputLabel,
  }) => {
    return (
      <div className={`${margin ? margin : 'mb-1.5'} ${display}`}>
        {isEditingLabel ? (
          <input
            type='text'
            name='fieldLabel'
            value={fieldLabel}
            onChange={(e) =>
              HandleYesNoFieldInputChange(
                questionId,
                boolFieldName,
                e,
                multiInputLabel
              )
            }
            onBlur={(e) =>
              HandleYesNoFieldBlurInputChange(
                questionId,
                boolFieldName,
                'isEditingLabel',
                multiInputLabel
              )
            }
            autoFocus
            className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 appearance-none px-3.5 py-2.5 border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 rounded-lg shadow-xs outline-none placeholder:text-gray-500 ${inputClassName}`}
          />
        ) : (
          <label
            className={`block w-full text-gray-700 underline cursor-pointer ${
              labelClassName
                ? labelClassName
                : 'text-xs-medium 2xl:text-sm-medium'
            }`}
            htmlFor={toCamelCase(fieldLabel)}
            onClick={() =>
              HandleYesNoFieldAddLabel(
                questionId,
                boolFieldName,
                multiInputLabel
              )
            }
          >
            {capitalizeFirstLetter(fieldLabel)}
            {required && <span className='text-primary-600'>*</span>}
          </label>
        )}
      </div>
    );
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
            className={`w-[172px] h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 appearance-none px-3.5 py-2.5 border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 rounded-lg shadow-xs outline-none placeholder:text-gray-500 ${inputClassName}`}
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

  const HandleYesNoFieldInputChange = (
    questionId,
    boolFieldName,
    event,
    multiInputLabel
  ) => {
    const { name, value } = event.target;
    const key = multiInputLabel ? multiInputLabel : name;
    const multiInputLabelKey =
      multiInputLabel && (name == 'fieldLabel' ? 'fieldLabel' : 'value');

    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: [
              {
                ...question.fields[0],
                [boolFieldName]: {
                  ...question.fields[0][boolFieldName],
                  [key]: multiInputLabel
                    ? {
                        ...question.fields[0][boolFieldName][multiInputLabel],
                        [multiInputLabelKey]: value,
                      }
                    : value,
                },
              },
            ],
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  // const YesFld = useMemo(() => {
  //   return HandleYesNoNestedFields(
  //     question.fields[0][boolFieldName].fieldTypeYes?.name,
  //     question,
  //     'typeYesFields'
  //   );
  // }, [question.fields[0][boolFieldName].fieldTypeYes?.name]);

  // const NoFld = useMemo(() => {
  //   return HandleYesNoNestedFields(
  //     question.fields[0][boolFieldName].fieldTypeNo?.name,
  //     question,
  //     'typeNoFields'
  //   );
  // }, [question.fields[0][boolFieldName].fieldTypeNo?.name]);

  const handleSelectedValue = (field, boolFieldSelectName) => {
    while (field[boolFieldSelectName] == 'Yes/No') {
      return field[boolFieldSelectName];
    }
  };

  const HandleYesNoNestedFields = (dataType, question, boolFieldName) => {
    switch (dataType) {
      // case 'Short Text': {
      //   return (
      //     <div className='space-y-6'>
      //       <div className='w-full'>
      //         <BoolFieldEditableLabel
      //           questionId={question.id}
      //           isEditingLabel={
      //             question.fields[0][boolFieldName].isEditingLabel
      //           }
      //           fieldLabel={capitalizeFirstLetter(
      //             question.fields[0][boolFieldName].fieldLabel
      //           )}
      //           boolFieldName={boolFieldName}
      //           required={question.questionRequired}
      //         />
      //         <input
      //           id={toCamelCase(question.fields[0][boolFieldName]?.fieldLabel)}
      //           name={`shortText`}
      //           type='text'
      //           value={question.fields[0][boolFieldName].shortText}
      //           placeholder={capitalizeFirstLetter(
      //             question.fields[0][boolFieldName].fieldLabel
      //           )}
      //           onChange={(e) =>
      //             HandleYesNoFieldInputChange(question.id, boolFieldName, e)
      //           }
      //           required
      //           className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
      //         />
      //       </div>
      //     </div>
      //   );
      // }
      // case 'Date': {
      //   return (
      //     <div className='w-full'>
      //       <BoolFieldEditableLabel
      //         questionId={question.id}
      //         isEditingLabel={question.fields[0][boolFieldName].isEditingLabel}
      //         fieldLabel={capitalizeFirstLetter(
      //           question.fields[0][boolFieldName].fieldLabel
      //         )}
      //         boolFieldName={boolFieldName}
      //         required={question.questionRequired}
      //       />
      //       <DateInput
      //         srOnly='hidden'
      //         width='w-full'
      //         id={toCamelCase(question.fields[0][boolFieldName].fieldLabel)}
      //         title={capitalizeFirstLetter(
      //           question.fields[0][boolFieldName].fieldLabel
      //         )}
      //         selectedDate={question.fields[0][boolFieldName].date}
      //         onSelect={(_, date) =>
      //           HandleYesNoFieldDateSelect(
      //             question.id,
      //             boolFieldName,
      //             'date',
      //             date
      //           )
      //         }
      //       />
      //     </div>
      //   );
      // }
      // case 'Phone number': {
      //   return (
      //     <div className='w-full'>
      //       <BoolFieldEditableLabel
      //         questionId={question.id}
      //         isEditingLabel={question.fields[0][boolFieldName].isEditingLabel}
      //         fieldLabel={capitalizeFirstLetter(
      //           question.fields[0][boolFieldName].fieldLabel
      //         )}
      //         boolFieldName={boolFieldName}
      //         required={question.questionRequired}
      //       />
      //       <div className='flex flex-1 items-center'>
      //         <FlagCombobox
      //           options={COUNTRIES}
      //           selectedOption={
      //             question.fields[0][boolFieldName].phoneNumber.phone_country
      //           }
      //           onSelect={(value) => {
      //             const { flagCode, dialCode } = value;
      //             HandleYesNoFieldPhoneNumberChange(
      //               question.id,
      //               boolFieldName,
      //               dialCode,
      //               flagCode
      //             );
      //           }}
      //         />
      //         <PhoneInput
      //           defaultCountry='us'
      //           className='w-full'
      //           onChange={(value, country) =>
      //             HandleYesNoFieldPhoneNumberChange(
      //               question.id,
      //               boolFieldName,
      //               value,
      //               country
      //             )
      //           }
      //           value={
      //             question.fields[0][boolFieldName].phoneNumber?.phone_number
      //           }
      //         />
      //       </div>
      //     </div>
      //   );
      // }
      // case 'Address': {
      //   return (
      //     <div className='w-full'>
      //       <div className='w-full space-y-6'>
      //         <div className='w-full flex justify-between gap-x-6'>
      //           <div className='w-full'>
      //             <BoolFieldEditableLabel
      //               questionId={question.id}
      //               isEditingLabel={
      //                 question.fields[0][boolFieldName].address.isEditingLabel
      //               }
      //               fieldLabel={capitalizeFirstLetter(
      //                 question.fields[0][boolFieldName].address.fieldLabel
      //               )}
      //               boolFieldName={boolFieldName}
      //               multiInputLabel='address'
      //               required={question.questionRequired}
      //             />
      //             <input
      //               // id={`address`}
      //               name='address'
      //               type='text'
      //               value={question.fields[0][boolFieldName].address.value}
      //               onChange={(e) =>
      //                 HandleYesNoFieldInputChange(
      //                   question.id,
      //                   boolFieldName,
      //                   e,
      //                   'address'
      //                 )
      //               }
      //               placeholder={capitalizeFirstLetter(
      //                 question.fields[0][boolFieldName].address.fieldLabel
      //               )}
      //               className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
      //             />
      //           </div>

      //           <div className='w-full'>
      //             <BoolFieldEditableLabel
      //               questionId={question.id}
      //               isEditingLabel={
      //                 question.fields[0][boolFieldName].cityOrEmirate
      //                   .isEditingLabel
      //               }
      //               fieldLabel={capitalizeFirstLetter(
      //                 question.fields[0][boolFieldName].cityOrEmirate.fieldLabel
      //               )}
      //               boolFieldName={boolFieldName}
      //               multiInputLabel='cityOrEmirate'
      //               required={question.questionRequired}
      //             />

      //             <input
      //               // id={`cityOrEmirate`}
      //               name='cityOrEmirate'
      //               type='text'
      //               value={
      //                 question.fields[0][boolFieldName].cityOrEmirate.value
      //               }
      //               onChange={(e) =>
      //                 HandleYesNoFieldInputChange(
      //                   question.id,
      //                   boolFieldName,
      //                   e,
      //                   'cityOrEmirate'
      //                 )
      //               }
      //               placeholder={capitalizeFirstLetter(
      //                 question.fields[0][boolFieldName].cityOrEmirate.fieldLabel
      //               )}
      //               className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
      //             />
      //           </div>
      //         </div>

      //         <div className='w-full flex justify-between gap-x-6'>
      //           <div className='w-full'>
      //             <BoolFieldEditableLabel
      //               questionId={question.id}
      //               isEditingLabel={
      //                 question.fields[0][boolFieldName].stateOrRegionOrProvince
      //                   .isEditingLabel
      //               }
      //               fieldLabel={capitalizeFirstLetter(
      //                 question.fields[0][boolFieldName].stateOrRegionOrProvince
      //                   .fieldLabel
      //               )}
      //               boolFieldName={boolFieldName}
      //               multiInputLabel='stateOrRegionOrProvince'
      //               required={question.questionRequired}
      //             />
      //             <input
      //               id={`stateOrRegionOrProvince`}
      //               name='stateOrRegionOrProvince'
      //               type='text'
      //               value={
      //                 question.fields[0][boolFieldName].stateOrRegionOrProvince
      //                   .value
      //               }
      //               onChange={(e) =>
      //                 HandleYesNoFieldInputChange(
      //                   question.id,
      //                   boolFieldName,
      //                   e,
      //                   'stateOrRegionOrProvince'
      //                 )
      //               }
      //               placeholder={capitalizeFirstLetter(
      //                 question.fields[0][boolFieldName].stateOrRegionOrProvince
      //                   .fieldLabel
      //               )}
      //               className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
      //             />
      //           </div>
      //           <div className='max-w-[170px] w-full'>
      //             <BoolFieldEditableLabel
      //               questionId={question.id}
      //               isEditingLabel={
      //                 question.fields[0][boolFieldName].zipOrPostalCode
      //                   .isEditingLabel
      //               }
      //               fieldLabel={capitalizeFirstLetter(
      //                 question.fields[0][boolFieldName].zipOrPostalCode
      //                   .fieldLabel
      //               )}
      //               boolFieldName={boolFieldName}
      //               multiInputLabel='zipOrPostalCode'
      //               required={question.questionRequired}
      //             />
      //             <input
      //               id={`zipOrPostalCode`}
      //               name='zipOrPostalCode'
      //               type='text'
      //               value={
      //                 question.fields[0][boolFieldName].zipOrPostalCode.value
      //               }
      //               onChange={(e) =>
      //                 HandleYesNoFieldInputChange(
      //                   question.id,
      //                   boolFieldName,
      //                   e,
      //                   'zipOrPostalCode'
      //                 )
      //               }
      //               placeholder={capitalizeFirstLetter(
      //                 question.fields[0][boolFieldName].zipOrPostalCode
      //                   .fieldLabel
      //               )}
      //               className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
      //             />
      //           </div>
      //         </div>

      //         <div className='w-full'>
      //           <BoolFieldEditableLabel
      //             questionId={question.id}
      //             isEditingLabel={
      //               question.fields[0][boolFieldName].country.isEditingLabel
      //             }
      //             fieldLabel={capitalizeFirstLetter(
      //               question.fields[0][boolFieldName].country.fieldLabel
      //             )}
      //             boolFieldName={boolFieldName}
      //             multiInputLabel='country'
      //             required={question.questionRequired}
      //           />
      //           <LocationCombobox
      //             options={countryListWithDialCodeAndFlag}
      //             selectedOption={
      //               question.fields[0][boolFieldName].country.value
      //             }
      //             onSelect={(location) =>
      //               HandleYesNoFieldLocationSelect(
      //                 question.id,
      //                 boolFieldName,
      //                 'country',
      //                 location,
      //                 true
      //               )
      //             }
      //           />
      //         </div>
      //       </div>
      //     </div>
      //   );
      // }
      case 'Yes/No': {
        return (
          <div className='w-full space-y-6'>
            <div className='w-full h-px bg-gray-200' />

            <div className='flex justify-between items-center gap-x-2'>
              <div className='flex items-center gap-x-2'>
                <button className='w-9 h-9 flex justify-center items-center bg-primary-50 p-2 rounded-lg border border-primary-700'>
                  <TbSubtask className='w-5 h-5 text-primary-700' />
                </button>
                <h6 className='text-sm-medium text-gray-700'>If choice is</h6>
                <div className='w-[61px] h-6 flex justify-center items-center bg-primary-100 px-[9px] py-[2px] rounded-md border border-primary-700'>
                  <span className='text-sm-medium text-primary-700'>Yes</span>
                </div>
              </div>
              <div className='w-full max-w-[260px]'>
                <SelectWithIcon
                  options={updated_datatype_options}
                  selectedOption={
                    question.fields[0][boolFieldName].fieldTypeYes
                  }
                  onSelect={(value) =>
                    HandleSelectNestedFieldDatatype(
                      question.id,
                      'fieldTypeYes',
                      value,
                      boolFieldName,
                      true
                    )
                  }
                  placeholder={'Choose an option'}
                />
              </div>
            </div>
            {/* {question.fields[0][boolFieldName].fieldTypeYes?.name &&
              HandleYesNoNestedFields(
                question.fields[0][boolFieldName].fieldTypeYes?.name,
                question,
                'typeYesFields'
              )} */}
            <div className='flex justify-between items-center gap-x-2'>
              <div className='flex items-center gap-x-2'>
                <button className='w-9 h-9 flex justify-center items-center bg-primary-50 p-2 rounded-lg border border-primary-700'>
                  <TbSubtask className='w-5 h-5 text-primary-700' />
                </button>
                <h6 className='text-sm-medium text-gray-700'>If choice is</h6>
                <div className='w-[61px] h-6 flex justify-center items-center bg-primary-100 px-[9px] py-[2px] rounded-md border border-primary-700'>
                  <span className='text-sm-medium text-primary-700'>No</span>
                </div>
              </div>
              <div className='w-full max-w-[260px]'>
                <SelectWithIcon
                  options={updated_datatype_options}
                  selectedOption={question.fields[0][boolFieldName].fieldTypeNo}
                  onSelect={(value) =>
                    HandleSelectNestedFieldDatatype(
                      question.id,
                      'fieldTypeNo',
                      value,
                      boolFieldName,
                      false
                    )
                  }
                  placeholder={'Choose an option'}
                />
              </div>
            </div>
            {/* {question.fields[0][boolFieldName].fieldTypeNo?.name &&
              HandleYesNoNestedFields(
                question.fields[0][boolFieldName].fieldTypeNo?.name,
                question,
                'typeNoFields'
              )} */}
            <div className='w-full h-px bg-gray-200' />
          </div>
        );
      }

      default:
        break;
    }
  };

  const HandleYesNoFields = (dataType, question, boolFieldName) => {
    switch (dataType) {
      case 'Short Text': {
        return (
          <div className='space-y-6'>
            <div className='w-full'>
              <BoolFieldEditableLabel
                questionId={question.id}
                isEditingLabel={
                  question.fields[0][boolFieldName].isEditingLabel
                }
                fieldLabel={capitalizeFirstLetter(
                  question.fields[0][boolFieldName].fieldLabel
                )}
                boolFieldName={boolFieldName}
                required={question.questionRequired}
              />
              <input
                id={toCamelCase(question.fields[0][boolFieldName]?.fieldLabel)}
                name={`shortText`}
                type='text'
                value={question.fields[0][boolFieldName].shortText}
                placeholder={capitalizeFirstLetter(
                  question.fields[0][boolFieldName].fieldLabel
                )}
                onChange={(e) =>
                  HandleYesNoFieldInputChange(question.id, boolFieldName, e)
                }
                required
                className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
              />
            </div>
          </div>
        );
      }
      case 'Date': {
        return (
          <div className='w-full'>
            <BoolFieldEditableLabel
              questionId={question.id}
              isEditingLabel={question.fields[0][boolFieldName].isEditingLabel}
              fieldLabel={capitalizeFirstLetter(
                question.fields[0][boolFieldName].fieldLabel
              )}
              boolFieldName={boolFieldName}
              required={question.questionRequired}
            />
            <DateInput
              srOnly='hidden'
              width='w-full'
              id={toCamelCase(question.fields[0][boolFieldName].fieldLabel)}
              title={capitalizeFirstLetter(
                question.fields[0][boolFieldName].fieldLabel
              )}
              selectedDate={question.fields[0][boolFieldName].date}
              onSelect={(_, date) =>
                HandleYesNoFieldDateSelect(
                  question.id,
                  boolFieldName,
                  'date',
                  date
                )
              }
            />
          </div>
        );
      }
      case 'Phone number': {
        return (
          <div className='w-full'>
            <BoolFieldEditableLabel
              questionId={question.id}
              isEditingLabel={question.fields[0][boolFieldName].isEditingLabel}
              fieldLabel={capitalizeFirstLetter(
                question.fields[0][boolFieldName].fieldLabel
              )}
              boolFieldName={boolFieldName}
              required={question.questionRequired}
            />
            <div className='flex flex-1 items-center'>
              <FlagCombobox
                options={COUNTRIES}
                selectedOption={
                  question.fields[0][boolFieldName].phoneNumber.phone_country
                }
                onSelect={(value) => {
                  const { flagCode, dialCode } = value;
                  HandleYesNoFieldPhoneNumberChange(
                    question.id,
                    boolFieldName,
                    dialCode,
                    flagCode
                  );
                }}
              />
              <PhoneInput
                defaultCountry='us'
                className='w-full'
                onChange={(value, country) =>
                  HandleYesNoFieldPhoneNumberChange(
                    question.id,
                    boolFieldName,
                    value,
                    country
                  )
                }
                value={
                  question.fields[0][boolFieldName].phoneNumber?.phone_number
                }
              />
            </div>
          </div>
        );
      }
      case 'Address': {
        return (
          <div className='w-full'>
            <div className='w-full space-y-6'>
              <div className='w-full flex justify-between gap-x-6'>
                <div className='w-full'>
                  <BoolFieldEditableLabel
                    questionId={question.id}
                    isEditingLabel={
                      question.fields[0][boolFieldName].address.isEditingLabel
                    }
                    fieldLabel={capitalizeFirstLetter(
                      question.fields[0][boolFieldName].address.fieldLabel
                    )}
                    boolFieldName={boolFieldName}
                    multiInputLabel='address'
                    required={question.questionRequired}
                  />
                  <input
                    // id={`address`}
                    name='address'
                    type='text'
                    value={question.fields[0][boolFieldName].address.value}
                    onChange={(e) =>
                      HandleYesNoFieldInputChange(
                        question.id,
                        boolFieldName,
                        e,
                        'address'
                      )
                    }
                    placeholder={capitalizeFirstLetter(
                      question.fields[0][boolFieldName].address.fieldLabel
                    )}
                    className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
                  />
                </div>

                <div className='w-full'>
                  <BoolFieldEditableLabel
                    questionId={question.id}
                    isEditingLabel={
                      question.fields[0][boolFieldName].cityOrEmirate
                        .isEditingLabel
                    }
                    fieldLabel={capitalizeFirstLetter(
                      question.fields[0][boolFieldName].cityOrEmirate.fieldLabel
                    )}
                    boolFieldName={boolFieldName}
                    multiInputLabel='cityOrEmirate'
                    required={question.questionRequired}
                  />

                  <input
                    // id={`cityOrEmirate`}
                    name='cityOrEmirate'
                    type='text'
                    value={
                      question.fields[0][boolFieldName].cityOrEmirate.value
                    }
                    onChange={(e) =>
                      HandleYesNoFieldInputChange(
                        question.id,
                        boolFieldName,
                        e,
                        'cityOrEmirate'
                      )
                    }
                    placeholder={capitalizeFirstLetter(
                      question.fields[0][boolFieldName].cityOrEmirate.fieldLabel
                    )}
                    className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
                  />
                </div>
              </div>

              <div className='w-full flex justify-between gap-x-6'>
                <div className='w-full'>
                  <BoolFieldEditableLabel
                    questionId={question.id}
                    isEditingLabel={
                      question.fields[0][boolFieldName].stateOrRegionOrProvince
                        .isEditingLabel
                    }
                    fieldLabel={capitalizeFirstLetter(
                      question.fields[0][boolFieldName].stateOrRegionOrProvince
                        .fieldLabel
                    )}
                    boolFieldName={boolFieldName}
                    multiInputLabel='stateOrRegionOrProvince'
                    required={question.questionRequired}
                  />
                  <input
                    id={`stateOrRegionOrProvince`}
                    name='stateOrRegionOrProvince'
                    type='text'
                    value={
                      question.fields[0][boolFieldName].stateOrRegionOrProvince
                        .value
                    }
                    onChange={(e) =>
                      HandleYesNoFieldInputChange(
                        question.id,
                        boolFieldName,
                        e,
                        'stateOrRegionOrProvince'
                      )
                    }
                    placeholder={capitalizeFirstLetter(
                      question.fields[0][boolFieldName].stateOrRegionOrProvince
                        .fieldLabel
                    )}
                    className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
                  />
                </div>
                <div className='max-w-[170px] w-full'>
                  <BoolFieldEditableLabel
                    questionId={question.id}
                    isEditingLabel={
                      question.fields[0][boolFieldName].zipOrPostalCode
                        .isEditingLabel
                    }
                    fieldLabel={capitalizeFirstLetter(
                      question.fields[0][boolFieldName].zipOrPostalCode
                        .fieldLabel
                    )}
                    boolFieldName={boolFieldName}
                    multiInputLabel='zipOrPostalCode'
                    required={question.questionRequired}
                  />
                  <input
                    id={`zipOrPostalCode`}
                    name='zipOrPostalCode'
                    type='text'
                    value={
                      question.fields[0][boolFieldName].zipOrPostalCode.value
                    }
                    onChange={(e) =>
                      HandleYesNoFieldInputChange(
                        question.id,
                        boolFieldName,
                        e,
                        'zipOrPostalCode'
                      )
                    }
                    placeholder={capitalizeFirstLetter(
                      question.fields[0][boolFieldName].zipOrPostalCode
                        .fieldLabel
                    )}
                    className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
                  />
                </div>
              </div>

              <div className='w-full'>
                <BoolFieldEditableLabel
                  questionId={question.id}
                  isEditingLabel={
                    question.fields[0][boolFieldName].country.isEditingLabel
                  }
                  fieldLabel={capitalizeFirstLetter(
                    question.fields[0][boolFieldName].country.fieldLabel
                  )}
                  boolFieldName={boolFieldName}
                  multiInputLabel='country'
                  required={question.questionRequired}
                />
                <LocationCombobox
                  options={countryListWithDialCodeAndFlag}
                  selectedOption={
                    question.fields[0][boolFieldName].country.value
                  }
                  onSelect={(location) =>
                    HandleYesNoFieldLocationSelect(
                      question.id,
                      boolFieldName,
                      'country',
                      location,
                      true
                    )
                  }
                />
              </div>
            </div>
          </div>
        );
      }
      case 'Yes/No': {
        return HandleYesNoNestedFields('Yes/No', question, boolFieldName);
      }

      default:
        break;
    }
  };

  const HandleYesNoDeleteField = (
    questionId,
    fieldId,
    boolFieldId,
    boolFieldName
  ) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            fields: question.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    [boolFieldName]: field[boolFieldName].filter(
                      (boolField) => boolField.id !== boolFieldId
                    ),
                  }
                : field
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  return (
    <>
      {/* Actions */}
      <div className='fixed top-[94px] 2xl:top-24 right-8 z-20 flex gap-3'>
        <div>
          <input type='file' className='hidden' />
          <button className='h-10 text-xs-semibold 2xl:text-sm-semibold text-gray-700 text-center inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-300 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'>
            <FiLink className='w-4 2xl:w-5 h-auto text-gray-700' />
            <span>Copy Link</span>
          </button>
        </div>
        <button className='h-10 text-xs-semibold 2xl:text-sm-semibold text-gray-700 text-center inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-300 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'>
          <FiEye className='w-4 2xl:w-5 h-auto text-gray-700' />
          <span>Preview</span>
        </button>
        <button
          onClick={() => {
            CreateForm();
          }}
          className='h-10 text-xs-semibold 2xl:text-sm-semibold text-white text-center inline-flex items-center gap-2 bg-primary-600 px-4 py-2.5 rounded-lg border border-primary-600 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'
        >
          <FiPlus className='w-4 2xl:w-5 h-auto text-white' />
          <span>Create Form</span>
        </button>
      </div>

      <div className='w-full h-[calc(100vh-185px)] overflow-y-auto rounded-bl-[40px] bg-white px-8 pb-16 space-y-6'>
        <form className='relative flex gap-3'>
          <div className='w-2/3 lg:w-3/4'>
            <div className='bg-gray-50 border border-gray-200 rounded-xl shadow-sm'>
              {/* Form */}
              <div className='p-8'>
                <div className='flex items-center space-x-15 mb-6'>
                  <span className='mr-4'>
                    <Image
                      alt='No image'
                      className='rounded-full'
                      src={'/images/TM_form-icon.png'}
                      width={40}
                      height={40}
                    />
                  </span>
                  <p className='text-black text-base font-semibold'>
                    Create Form
                  </p>
                </div>
                <div className='w-full'>
                  <div className='space-y-4'>
                    <div className='flex justify-between gap-4 mb-6'>
                      {/* Select event Row */}
                      <div className='w-1/2'>
                        <label
                          className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                          htmlFor='event'
                        >
                          Select event
                          <span className='text-primary-600'>*</span>
                        </label>
                        <Select
                          options={event_options}
                          selectedOption={selectedOption.event}
                          onSelect={(value) => HandleSelect('event', value)}
                          placeholder={'Please choose an option'}
                        />
                      </div>
                      {/* Select workforce type and role Row */}
                      <div className='w-1/2'>
                        <label
                          className='block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5'
                          htmlFor='workforceType'
                        >
                          Select workforce type
                          <span className='text-primary-600'>*</span>
                        </label>
                        <Select
                          options={workforce_type_options}
                          selectedOption={selectedOption.workforceType}
                          onSelect={(value) =>
                            HandleSelect('workforceType', value)
                          }
                          placeholder={'Please choose an option'}
                        />
                      </div>
                    </div>

                    <div className='flex justify-between gap-4 mb-6'>
                      {/* Select Date Row */}
                      <div className='w-1/2'>
                        <DateInput
                          id={'startDate'}
                          title={'Start Date'}
                          selectedDate={selectedDate.startDate}
                          onSelect={HandleDateChange}
                        />
                      </div>
                      {/* Select Date Row */}
                      <div className='w-1/2'>
                        <DateInput
                          id={'endDate'}
                          title={'End Date'}
                          selectedDate={selectedDate.endDate}
                          onSelect={HandleDateChange}
                        />
                      </div>
                    </div>

                    <div className='flex justify-end'>
                      <div className='w-1/2'>
                        <div className='flex justify-between gap-3'>
                          <button
                            typeof='button'
                            className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs'
                            onClick={() => {
                              router.push('/talent/forms');
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type='button'
                            className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white p-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                            onClick={(e) => {
                              setShowNameModal(true);
                            }}
                          >
                            Save as Template
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Transition appear show={showNameModal} as={Fragment}>
                <Dialog
                  as='div'
                  className='relative z-30'
                  onClose={() => {
                    null;
                  }}
                >
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                  </Transition.Child>

                  <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                      <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                      >
                        <Dialog.Panel className='w-full max-w-[480px] transform rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                          <div className='space-y-8'>
                            <div className='space-y-5'>
                              <svg
                                width='56'
                                height='56'
                                viewBox='0 0 56 56'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <rect
                                  x='4'
                                  y='4'
                                  width='48'
                                  height='48'
                                  rx='24'
                                  fill='#DEEBFB'
                                />
                                <path
                                  d='M32 18V22M24 18V22M19 26H37M21 20H35C36.1046 20 37 20.8954 37 22V36C37 37.1046 36.1046 38 35 38H21C19.8954 38 19 37.1046 19 36V22C19 20.8954 19.8954 20 21 20Z'
                                  stroke='#2F68D6'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                />
                                <rect
                                  x='4'
                                  y='4'
                                  width='48'
                                  height='48'
                                  rx='24'
                                  stroke='#F1F6FD'
                                  stroke-width='8'
                                />
                              </svg>

                              <div className='space-y-2'>
                                <Dialog.Title
                                  as='h3'
                                  className='text-md-semibold 2xl:text-lg-semibold text-gray-900'
                                >
                                  {'Template Created'}
                                </Dialog.Title>
                                <Dialog.Description
                                  as='p'
                                  className='text-xs-regular 2xl:text-sm-regular text-gray-500'
                                >
                                  Please enter a name for this template.
                                </Dialog.Description>
                              </div>

                              <div className='space-y-3'>
                                {/* Template Name */}
                                <div className='w-full'>
                                  <label
                                    className='text-gray-700 text-xs-medium 2xl:text-sm-medium'
                                    htmlFor='template_name'
                                  >
                                    Template Name
                                    <span className='text-primary-600'>*</span>
                                    <div className='relative'>
                                      <input
                                        id='template_name'
                                        name='template_name'
                                        type='text'
                                        value={template_name}
                                        onChange={(e) =>
                                          setTemplateName(e.target.value)
                                        }
                                        placeholder='Enter template name'
                                        required
                                        className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                                      />
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className='flex justify-between gap-3'>
                              <button
                                className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs'
                                onClick={HandleNameModalReset}
                              >
                                Cancel
                              </button>
                              <button
                                className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 shadow-xs disabled:opacity-75 disabled:pointer-events-none'
                                onClick={() => {
                                  setShowNameModal(false);
                                  router.push('/talent/forms');
                                }}
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>

                  {/* Toast */}
                  <ToastPopup
                    success={true}
                    showToast={showNameModalToast}
                    handleToast={HandleNameModalToast}
                  />
                </Dialog>
              </Transition>
            </div>

            {/* Render question divs */}
            <div className='space-y-6'>
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className={`mt-4 flex gap-2`}>
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
                              <div className='space-y-1.5'>
                                {/* <input
                                  id='question'
                                  name='questionName'
                                  type='text'
                                  value={question.questionName}
                                  onChange={(e) =>
                                    HandleQuestionInputChange(question.id, e)
                                  }
                                  placeholder='Enter your question'
                                  required
                                  className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                                /> */}
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
                              placeholder={'Type'}
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
                              HandleSwitch(
                                question.id,
                                'questionRequired',
                                value
                              )
                            }
                            labelText='Required'
                          />
                          {question.questionType?.name ===
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
                        {question.questionType?.name === 'Date' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for Date */}
                            {question.fields.map((field, fieldIndex) => (
                              <div key={field.id} className='w-full'>
                                <EditableLabel
                                  questionId={question.id}
                                  fieldId={field.id}
                                  isEditingLabel={field.isEditingLabel}
                                  fieldLabel={capitalizeFirstLetter(
                                    field.fieldLabel
                                  )}
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
                                      className='w-4 h-4 text-gray-400'
                                      onClick={() =>
                                        HandleDeleteField(question.id, field.id)
                                      }
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name === 'Short Text' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for Short Text */}
                            {question.fields.map((field, fieldIndex) => (
                              <div key={field.id} className='w-full'>
                                <EditableLabel
                                  questionId={question.id}
                                  fieldId={field.id}
                                  isEditingLabel={field.isEditingLabel}
                                  fieldLabel={capitalizeFirstLetter(
                                    field.fieldLabel
                                  )}
                                  required={question.questionRequired}
                                />
                                <div className='flex items-center gap-x-2'>
                                  <input
                                    id={toCamelCase(field.fieldLabel)}
                                    name={`shortText`}
                                    type='text'
                                    value={field.shortText}
                                    placeholder={capitalizeFirstLetter(
                                      field.fieldLabel
                                    )}
                                    onChange={(e) =>
                                      HandleInputChange(
                                        question.id,
                                        field.id,
                                        e
                                      )
                                    }
                                    required
                                    className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                                  />
                                  <button type='button' className='p-2'>
                                    <FiTrash2
                                      className='w-4 h-4 text-gray-400'
                                      onClick={() =>
                                        HandleDeleteField(question.id, field.id)
                                      }
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name === 'Address' && (
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
                                        isEditingLabel={
                                          field.address.isEditingLabel
                                        }
                                        fieldLabel={capitalizeFirstLetter(
                                          field.address.fieldLabel
                                        )}
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
                                        isEditingLabel={
                                          field.cityOrEmirate.isEditingLabel
                                        }
                                        fieldLabel={capitalizeFirstLetter(
                                          field.cityOrEmirate.fieldLabel
                                        )}
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
                                        isEditingLabel={
                                          field.stateOrRegionOrProvince
                                            .isEditingLabel
                                        }
                                        fieldLabel={capitalizeFirstLetter(
                                          field.stateOrRegionOrProvince
                                            .fieldLabel
                                        )}
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
                                          field.stateOrRegionOrProvince
                                            .fieldLabel
                                        )}
                                        className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
                                      />
                                    </div>
                                    <div className='max-w-[170px] w-full'>
                                      <EditableLabel
                                        questionId={question.id}
                                        fieldId={field.id}
                                        isEditingLabel={
                                          field.zipOrPostalCode.isEditingLabel
                                        }
                                        fieldLabel={capitalizeFirstLetter(
                                          field.zipOrPostalCode.fieldLabel
                                        )}
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
                                      isEditingLabel={
                                        field.country.isEditingLabel
                                      }
                                      fieldLabel={capitalizeFirstLetter(
                                        field.country.fieldLabel
                                      )}
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
                                    className='w-4 h-4 text-gray-400'
                                    onClick={() =>
                                      HandleDeleteField(question.id, field.id)
                                    }
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name === 'Phone number' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for Phone number */}
                            {question.fields.map((field, fieldIndex) => (
                              <div key={field.id} className='w-full'>
                                <EditableLabel
                                  questionId={question.id}
                                  fieldId={field.id}
                                  isEditingLabel={field.isEditingLabel}
                                  fieldLabel={capitalizeFirstLetter(
                                    field.fieldLabel
                                  )}
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
                                      className='w-4 h-4 text-gray-400'
                                      onClick={() =>
                                        HandleDeleteField(question.id, field.id)
                                      }
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name === 'Location' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for Location */}
                            {question.fields.map((field, fieldIndex) => (
                              <div key={field.id} className='w-full'>
                                <EditableLabel
                                  questionId={question.id}
                                  fieldId={field.id}
                                  isEditingLabel={field.isEditingLabel}
                                  fieldLabel={capitalizeFirstLetter(
                                    field.fieldLabel
                                  )}
                                  required={question.questionRequired}
                                />
                                <div className='flex items-center gap-x-2'>
                                  <LocationCombobox
                                    options={countryListWithDialCodeAndFlag}
                                    selectedOption={field.location}
                                    onSelect={(location) =>
                                      HandleLocationSelect(
                                        question.id,
                                        field.id,
                                        'location',
                                        location
                                      )
                                    }
                                  />
                                  <button type='button' className='p-2'>
                                    <FiTrash2
                                      className='w-4 h-4 text-gray-400'
                                      onClick={() =>
                                        HandleDeleteField(question.id, field.id)
                                      }
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name === 'Multiple choice' && (
                          <div className='space-y-6'>
                            <SwitchButton
                              isChecked={question.allowCustomText}
                              labelText='Allow custom text'
                              onChange={(value) =>
                                HandleSwitch(
                                  question.id,
                                  'allowCustomText',
                                  value
                                )
                              }
                            />
                            {/* Render specific tag for Multiple Choice */}
                            {question.fields.map((field, fieldIndex) => (
                              <div
                                key={field.id}
                                className='flex justify-between items-center gap-x-2'
                              >
                                <div className='w-full'>
                                  <div className='w-full flex items-center'>
                                    <div className='w-4 h-4 bg-transparent border border-gray-300 rounded-full' />
                                    <EditableLabel
                                      questionId={question.id}
                                      fieldId={field.id}
                                      isEditingLabel={field.isEditingLabel}
                                      fieldLabel={field.fieldLabel}
                                      margin='ml-3 mb-0'
                                      // display='inline-block'
                                      labelClassName='text-sm-medium 2xl:text-md-medium no-underline'
                                    />
                                  </div>
                                  {field.multipleChoiceValue == 'Other' && (
                                    <div className='w-full'>
                                      <label
                                        className='text-gray-700 text-xs-medium 2xl:text-sm-medium sr-only'
                                        htmlFor='other'
                                      >
                                        other
                                        <span className='text-primary-600'>
                                          *
                                        </span>
                                      </label>
                                      <input
                                        id='other'
                                        name='otherChoiceInput'
                                        type='text'
                                        value={field.otherChoiceInput}
                                        onChange={(e) =>
                                          HandleInputChange(
                                            question.id,
                                            field.id,
                                            e
                                          )
                                        }
                                        placeholder='Other'
                                        className='w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 mt-1.5 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500'
                                      />
                                    </div>
                                  )}
                                </div>

                                <button type='button'>
                                  <FiX
                                    className='w-4 h-4 text-gray-400'
                                    onClick={() =>
                                      HandleDeleteField(question.id, field.id)
                                    }
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name === 'Checkbox' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for Checkbox */}
                            {question.fields.map((field, fieldIndex) => (
                              <div
                                key={field.id}
                                className='w-full flex justify-between items-center gap-x-6'
                              >
                                <div className='flex items-center'>
                                  <div className='w-4 2xl:w-5 h-4 2xl:h-5 bg-transparent border border-gray-300 rounded-md' />
                                  <EditableLabel
                                    questionId={question.id}
                                    fieldId={field.id}
                                    isEditingLabel={field.isEditingLabel}
                                    fieldLabel={field.fieldLabel}
                                    margin='ml-3 mb-0'
                                    labelClassName='text-sm-medium 2xl:text-md-medium no-underline'
                                  />
                                </div>
                                <button type='button'>
                                  <FiX
                                    className='w-4 h-4 text-gray-400'
                                    onClick={() =>
                                      HandleDeleteField(question.id, field.id)
                                    }
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name === 'File upload' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for File Upload */}
                            {question.fields.map((field, fieldIndex) => (
                              <div
                                key={field.id}
                                className='w-full flex items-center gap-x-2'
                              >
                                {/* Form */}
                                <form className='w-full space-y-6' action=''>
                                  {/* Click to Upload or drag & drop option */}
                                  {!field.file && (
                                    <div
                                      className={`px-6 py-4 bg-white rounded-lg border border-dashed border-gray-200 cursor-pointer ${
                                        dragging
                                          ? 'ring-1 ring-primary-600 opacity-40'
                                          : ''
                                      }`}
                                      onClick={() =>
                                        document
                                          .getElementById('uploadPhoto')
                                          .click()
                                      }
                                      onDragOver={HandleDragOver}
                                      onDrop={(event) =>
                                        HandleDrop(question.id, field.id, event)
                                      }
                                      onDragLeave={HandleDragLeave}
                                    >
                                      <div className='flex flex-col justify-center gap-3 w-full'>
                                        <svg
                                          width='46'
                                          height='46'
                                          viewBox='0 0 46 46'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                          className='self-center'
                                        >
                                          <rect
                                            x='3'
                                            y='3'
                                            width='40'
                                            height='40'
                                            rx='20'
                                            fill='#F2F2F2'
                                          />
                                          <g clip-path='url(#clip0_690_46732)'>
                                            <path
                                              d='M26.3335 26.3334L23.0002 23M23.0002 23L19.6669 26.3334M23.0002 23V30.5M29.9919 28.325C30.8047 27.8819 31.4467 27.1808 31.8168 26.3322C32.1868 25.4837 32.2637 24.5361 32.0354 23.6389C31.807 22.7418 31.2865 21.9463 30.5558 21.3779C29.8251 20.8095 28.9259 20.5006 28.0002 20.5H26.9502C26.698 19.5244 26.2278 18.6186 25.5752 17.8509C24.9225 17.0831 24.1042 16.4732 23.182 16.0672C22.2597 15.6612 21.2573 15.4695 20.2503 15.5066C19.2433 15.5437 18.2578 15.8086 17.3679 16.2814C16.4779 16.7542 15.7068 17.4226 15.1124 18.2363C14.518 19.0501 14.1158 19.988 13.936 20.9795C13.7563 21.9711 13.8036 22.9905 14.0746 23.9611C14.3455 24.9317 14.8329 25.8282 15.5002 26.5834'
                                              stroke='#7A797A'
                                              stroke-width='1.66667'
                                              stroke-linecap='round'
                                              stroke-linejoin='round'
                                            />
                                          </g>
                                          <rect
                                            x='3'
                                            y='3'
                                            width='40'
                                            height='40'
                                            rx='20'
                                            stroke='#FCFBFB'
                                            stroke-width='6'
                                          />
                                          <defs>
                                            <clipPath id='clip0_690_46732'>
                                              <rect
                                                width='20'
                                                height='20'
                                                fill='white'
                                                transform='translate(13 13)'
                                              />
                                            </clipPath>
                                          </defs>
                                        </svg>

                                        <div className='space-y-1 text-center w-full'>
                                          <h6 className='text-sm-regular text-gray-500'>
                                            <span className='font-semibold text-primary-700 hover:underline'>
                                              Click to upload
                                            </span>{' '}
                                            or drag and drop
                                          </h6>
                                          <p className='text-xs-regular text-gray-500'>
                                            PNG or JPG or PDF(max. 1MB)
                                          </p>
                                        </div>
                                      </div>
                                      <input
                                        id='uploadPhoto'
                                        accept='.png,.jpg,.pdf'
                                        type='file'
                                        hidden
                                        onChange={(value) =>
                                          HandleFiles(
                                            question.id,
                                            field.id,
                                            value
                                          )
                                        }
                                        className='hidden'
                                      />
                                    </div>
                                  )}

                                  {/* Uploaded Image Box */}
                                  {field.file ? (
                                    <div className='flex justify-between gap-1 bg-white rounded-lg border border-primary-500 p-4 mt-2'>
                                      <div className='w-full flex items-start gap-4'>
                                        {field.file ? (
                                          <img
                                            src={URL.createObjectURL(
                                              field.file
                                            )}
                                            alt={field.file?.name}
                                            className='w-8 h-8 rounded-full bg-gray-100'
                                          />
                                        ) : (
                                          <svg
                                            width='36'
                                            height='36'
                                            viewBox='0 0 36 36'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                          >
                                            <rect
                                              x='2'
                                              y='2'
                                              width='32'
                                              height='32'
                                              rx='16'
                                              fill='#DEEBFB'
                                            />
                                            <path
                                              d='M13.3333 24H22.6667C23.403 24 24 23.403 24 22.6667V13.3333C24 12.597 23.403 12 22.6667 12H13.3333C12.597 12 12 12.597 12 13.3333V22.6667C12 23.403 12.597 24 13.3333 24ZM13.3333 24L20.6667 16.6667L24 20M16.6667 15.6667C16.6667 16.219 16.219 16.6667 15.6667 16.6667C15.1144 16.6667 14.6667 16.219 14.6667 15.6667C14.6667 15.1144 15.1144 14.6667 15.6667 14.6667C16.219 14.6667 16.6667 15.1144 16.6667 15.6667Z'
                                              stroke='#2F68D6'
                                              stroke-width='1.33333'
                                              stroke-linecap='round'
                                              stroke-linejoin='round'
                                            />
                                            <rect
                                              x='2'
                                              y='2'
                                              width='32'
                                              height='32'
                                              rx='16'
                                              stroke='#F1F6FD'
                                              stroke-width='4'
                                            />
                                          </svg>
                                        )}

                                        <div className='w-full'>
                                          <div>
                                            <h6 className='text-xs-medium 2xl:text-sm-medium text-gray-700'>
                                              {field.file?.name ??
                                                'Profile photo.jpeg'}
                                            </h6>
                                            <p className='text-xs-regular 2xl:text-sm-regular text-gray-500'>
                                              {(field.file.size / 1024).toFixed(
                                                0
                                              ) ?? '200'}{' '}
                                              KB
                                            </p>
                                          </div>

                                          <ProgressBar progress={100} />
                                        </div>
                                      </div>

                                      <svg
                                        width='16'
                                        height='16'
                                        viewBox='0 0 16 16'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                      >
                                        <rect
                                          x='0.5'
                                          y='0.5'
                                          width='15'
                                          height='15'
                                          rx='7.5'
                                          fill='#2F68D6'
                                        />
                                        <path
                                          d='M11.3332 5.5L6.74984 10.0833L4.6665 8'
                                          stroke='white'
                                          stroke-width='1.66667'
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                        />
                                        <rect
                                          x='0.5'
                                          y='0.5'
                                          width='15'
                                          height='15'
                                          rx='7.5'
                                          stroke='#2F68D6'
                                        />
                                      </svg>
                                    </div>
                                  ) : null}
                                </form>
                                <button type='button' className='p-2'>
                                  <FiTrash2
                                    className='w-4 h-4 text-gray-400'
                                    onClick={() =>
                                      HandleDeleteField(question.id, field.id)
                                    }
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name === 'Document' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for Document */}
                            {question.fields.map((field, fieldIndex) => (
                              <div
                                key={field.id}
                                className='w-full flex items-center gap-x-2'
                              >
                                <div className='w-full space-y-6'>
                                  <div className='w-full space-y-1.5'>
                                    <EditableLabel
                                      questionId={question.id}
                                      fieldId={field.id}
                                      isEditingLabel={
                                        field.documentType.isEditingLabel
                                      }
                                      fieldLabel={capitalizeFirstLetter(
                                        field.documentType.fieldLabel
                                      )}
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
                                        HandleSelectDropdown(
                                          question.id,
                                          field.id,
                                          'documentType',
                                          value,
                                          true
                                        )
                                      }
                                      placeholder={capitalizeFirstLetter(
                                        field.documentType.fieldLabel
                                      )}
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
                                          {field.documentType
                                            .documentTypeChoices?.length ?? 0}
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
                                    className='w-4 h-4 text-gray-400'
                                    onClick={() =>
                                      HandleDeleteField(question.id, field.id)
                                    }
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name === 'Dropdown' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for Dropdown */}
                            {question.fields.map((field, fieldIndex) => (
                              <div
                                key={field.id}
                                className='flex items-center gap-x-2'
                              >
                                <div className='w-full space-y-1.5'>
                                  <EditableLabel
                                    questionId={question.id}
                                    fieldId={field.id}
                                    isEditingLabel={
                                      field.dropdown.isEditingLabel
                                    }
                                    fieldLabel={capitalizeFirstLetter(
                                      field.dropdown.fieldLabel
                                    )}
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
                                        {field.dropdown.dropdownChoices
                                          ?.length ?? 0}
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
                                    className='w-4 h-4 text-gray-400'
                                    onClick={() =>
                                      HandleDeleteField(question.id, field.id)
                                    }
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name === 'Paragraph' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for Dropdown */}
                            {question.fields.map((field, fieldIndex) => (
                              <div key={field.id} className='w-full'>
                                <EditableLabel
                                  questionId={question.id}
                                  fieldId={field.id}
                                  isEditingLabel={field.isEditingLabel}
                                  fieldLabel={capitalizeFirstLetter(
                                    field.fieldLabel
                                  )}
                                  required={question.questionRequired}
                                />
                                <div className='flex items-center gap-x-2'>
                                  <textarea
                                    id={toCamelCase(field.fieldLabel)}
                                    name='paragraph'
                                    rows='4'
                                    value={field.paragraph}
                                    onChange={(e) =>
                                      HandleInputChange(
                                        question.id,
                                        field.id,
                                        e
                                      )
                                    }
                                    placeholder={capitalizeFirstLetter(
                                      field.fieldLabel
                                    )}
                                    required
                                    className={`w-full block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500`}
                                  />

                                  <button type='button' className='p-2'>
                                    <FiTrash2
                                      className='w-4 h-4 text-gray-400'
                                      onClick={() =>
                                        HandleDeleteField(question.id, field.id)
                                      }
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name === 'Skills' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for Skills */}
                            {question.fields.map((field, fieldIndex) => (
                              <div className='w-full space-y-6'>
                                <div className='flex justify-between items-center'>
                                  <SwitchButton
                                    isChecked={field.isMultipleAnswer}
                                    labelText='Multiple answers'
                                    onChange={(value) =>
                                      handleToggleMultipleAnswer(
                                        question.id,
                                        field.id,
                                        'isMultipleAnswer',
                                        value
                                      )
                                    }
                                  />
                                  <h6 className='text-sm-regular text-gray-500'>
                                    Up to
                                    {field.skills.value?.length > 1 && 's'}{' '}
                                    <span className='text-gray-700'>
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
                                        isEditingLabel={
                                          field.skills.isEditingLabel
                                        }
                                        fieldLabel={capitalizeFirstLetter(
                                          field.skills.fieldLabel
                                        )}
                                        multiInputLabel='skills'
                                        margin='mb-0'
                                        required={question.questionRequired}
                                      />
                                      <CheckboxMultiSelectCombobox
                                        options={field.skills.skillChoices}
                                        selectedOption={field.skills.value}
                                        onSelect={(value) =>
                                          HandleMultipleCheckboxSelect(
                                            question.id,
                                            field.id,
                                            'skills',
                                            value,
                                            true
                                          )
                                        }
                                        filterTitle='Select Options'
                                        filterTitleClass='!text-gray-500 !text-sm-regular !2xl:text-md-regular'
                                        disabled={
                                          !field.skills.skillChoices?.length
                                        }
                                        panelWidth='w-full'
                                      />
                                      <div className='flex justify-between items-center'>
                                        <button
                                          className='text-sm-regular text-gray-500 underline'
                                          onClick={(e) => {
                                            e.preventDefault();
                                            HandleChoiceModal(
                                              question.id,
                                              field.id,
                                              'skills',
                                              true
                                            );
                                          }}
                                        >
                                          Edit choices
                                        </button>
                                        <h6 className='text-sm-regular text-gray-500'>
                                          Choice
                                          {field.skills.skillChoices?.length >
                                            1 && 's'}{' '}
                                          <span className='text-gray-700 underline'>
                                            {field.skills.skillChoices
                                              ?.length ?? 0}
                                          </span>
                                        </h6>
                                      </div>
                                      <EditChoiceModal
                                        showChoiceModal={
                                          field.skills.showChoiceModal
                                        }
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
                                        isEditingLabel={
                                          field.skillEfficiency.isEditingLabel
                                        }
                                        fieldLabel={capitalizeFirstLetter(
                                          field.skillEfficiency.fieldLabel
                                        )}
                                        multiInputLabel='skillEfficiency'
                                        margin='mb-0'
                                        required={question.questionRequired}
                                      />
                                      <Select
                                        options={
                                          field.skillEfficiency
                                            .skillEfficiencyChoices
                                        }
                                        selectedOption={
                                          field.skillEfficiency.value
                                        }
                                        onSelect={(value) =>
                                          HandleSelectDropdown(
                                            question.id,
                                            field.id,
                                            'skillEfficiency',
                                            value,
                                            true
                                          )
                                        }
                                        placeholder={capitalizeFirstLetter(
                                          field.skillEfficiency.fieldLabel
                                        )}
                                        disabled={
                                          !field.skillEfficiency
                                            .skillEfficiencyChoices?.length
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
                                            .skillEfficiencyChoices?.length >
                                            1 && 's'}{' '}
                                          <span className='text-gray-700 underline'>
                                            {field.skillEfficiency
                                              .skillEfficiencyChoices?.length ??
                                              0}
                                          </span>
                                        </h6>
                                      </div>
                                      <EditChoiceModal
                                        showChoiceModal={
                                          field.skillEfficiency.showChoiceModal
                                        }
                                        setShowChoiceModal={(value) =>
                                          HandleChoiceModal(
                                            question.id,
                                            field.id,
                                            'skillEfficiency',
                                            value
                                          )
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
                                      className='w-4 h-4 text-gray-400'
                                      onClick={() =>
                                        HandleDeleteField(question.id, field.id)
                                      }
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name ===
                          'Multiple choice grid' && (
                          <div
                            className='w-full grid place-items-center gap-x-3 gap-y-4'
                            style={{
                              gridTemplateColumns: `repeat(${question.fields[0]?.columnNumber}, minmax(0, 1fr))`,
                            }}
                          >
                            {/* Render specific tag for Multiple choice grid */}
                            {question.fields[0]?.activities?.map((activity) => (
                              <form
                                action=''
                                key={activity.id}
                                className='w-full'
                              >
                                {activity && (
                                  <div
                                    className={`w-full flex flex-col justify-center items-center gap-y-2 border border-gray-300 bg-white rounded-lg px-[18px] py-2.5 shadow-xs`}
                                  >
                                    {activity?.image && (
                                      <img
                                        src={URL.createObjectURL(
                                          activity?.image
                                        )}
                                        alt={activity.image?.name}
                                        className='w-8 h-8 rounded-full bg-gray-100'
                                      />
                                    )}
                                    <span className='inline-flex gap-x-2 items-center'>
                                      <span
                                        className={`text-gray-700 underline text-center ${
                                          activity?.image
                                            ? 'text-xs-semibold 2xl:text-sm-semibold'
                                            : 'text-sm-semibold 2xl:text-md-semibold'
                                        }`}
                                      >
                                        {capitalizeFirstLetter(activity.option)}
                                      </span>
                                      <button
                                        onClick={() =>
                                          HandleDeleteActivity(
                                            question.id,
                                            activity.id
                                          )
                                        }
                                      >
                                        <FiX className='w-4 2xl:w-5 h-auto text-gray-500' />
                                      </button>
                                    </span>
                                  </div>
                                )}
                              </form>
                            ))}
                            <MultipleChoiceGridModal
                              showGridModal={showGridModal}
                              setShowGridModal={HandleGridModal}
                              HandleAddOption={(value) =>
                                HandleAddChoiceGridOption(question.id, value)
                              }
                            />
                            <button
                              className='w-full flex flex-col justify-center items-center gap-y-2 border border-gray-300 bg-white rounded-lg px-[18px] py-2.5 outline-none shadow-xs'
                              onClick={(e) => {
                                e.preventDefault();
                                setShowGridModal(true);
                              }}
                            >
                              <FiImage className='w-4 2xl:w-5 h-auto text-gray-500' />
                              <span className='inline-flex gap-x-2 items-center'>
                                <span className='text-sm-semibold 2xl:text-md-semibold text-gray-500 text-center'>
                                  Add option
                                </span>
                                <FiPlus className='w-4 2xl:w-5 h-auto text-gray-500' />
                              </span>
                            </button>
                          </div>
                        )}

                        {question.questionType?.name === 'End screen' && <></>}

                        {question.questionType?.name === 'Yes/No' && (
                          <div className='w-full space-y-6'>
                            <div className='flex gap-x-6'>
                              <button
                                type='button'
                                className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs'
                              >
                                Yes
                              </button>
                              <button
                                type='button'
                                className='flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs'
                              >
                                No
                              </button>
                            </div>

                            <div className='w-full h-px bg-gray-200' />
                            <div className='w-full space-y-6'>
                              <div className='flex justify-between items-center gap-x-2'>
                                <div className='flex items-center gap-x-2'>
                                  <button className='w-9 h-9 flex justify-center items-center bg-primary-50 p-2 rounded-lg border border-primary-700'>
                                    <TbSubtask className='w-5 h-5 text-primary-700' />
                                  </button>
                                  <h6 className='text-sm-medium text-gray-700'>
                                    If choice is
                                  </h6>
                                  <div className='w-[61px] h-6 flex justify-center items-center bg-primary-100 px-[9px] py-[2px] rounded-md border border-primary-700'>
                                    <span className='text-sm-medium text-primary-700'>
                                      Yes
                                    </span>
                                  </div>
                                </div>
                                <div className='w-full max-w-[260px]'>
                                  <SelectWithIcon
                                    options={updated_datatype_options}
                                    selectedOption={
                                      question.fields[0]?.fieldTypeYes
                                    }
                                    onSelect={(value) =>
                                      HandleSelectFieldDatatype(
                                        question.id,
                                        'fieldTypeYes',
                                        value,
                                        true
                                      )
                                    }
                                    placeholder={'Choose an option'}
                                  />
                                </div>
                              </div>
                              {HandleYesNoFields(
                                question.fields[0]?.fieldTypeYes?.name,
                                question,
                                'typeYesFields'
                              )}
                              <div className='flex justify-between items-center gap-x-2'>
                                <div className='flex items-center gap-x-2'>
                                  <button className='w-9 h-9 flex justify-center items-center bg-primary-50 p-2 rounded-lg border border-primary-700'>
                                    <TbSubtask className='w-5 h-5 text-primary-700' />
                                  </button>
                                  <h6 className='text-sm-medium text-gray-700'>
                                    If choice is
                                  </h6>
                                  <div className='w-[61px] h-6 flex justify-center items-center bg-primary-100 px-[9px] py-[2px] rounded-md border border-primary-700'>
                                    <span className='text-sm-medium text-primary-700'>
                                      No
                                    </span>
                                  </div>
                                </div>
                                <div className='w-full max-w-[260px]'>
                                  <SelectWithIcon
                                    options={updated_datatype_options}
                                    selectedOption={
                                      question.fields[0]?.fieldTypeNo
                                    }
                                    onSelect={(value) =>
                                      HandleSelectFieldDatatype(
                                        question.id,
                                        'fieldTypeNo',
                                        value,
                                        false
                                      )
                                    }
                                    placeholder={'Choose an option'}
                                  />
                                </div>
                              </div>
                              {HandleYesNoFields(
                                question.fields[0]?.fieldTypeNo?.name,
                                question,
                                'typeNoFields'
                              )}
                            </div>
                          </div>
                        )}

                        {question.questionType?.name === 'Time' && (
                          <div className='space-y-6'>
                            {/* Render specific tag for Time input */}
                            {question.fields.map((field, fieldIndex) => (
                              <div key={field.id} className='w-full'>
                                <EditableLabel
                                  questionId={question.id}
                                  fieldId={field.id}
                                  isEditingLabel={field.isEditingLabel}
                                  fieldLabel={capitalizeFirstLetter(
                                    field.fieldLabel
                                  )}
                                  required={question.questionRequired}
                                />
                                <div className='flex items-center gap-x-2'>
                                  <TimePicker
                                    id={toCamelCase(field.fieldLabel)}
                                    name='time'
                                    onChange={(time) =>
                                      handleTimeInputChange(
                                        question.id,
                                        field.id,
                                        'time',
                                        time
                                      )
                                    }
                                    value={field.time}
                                    disableClock
                                    clearIcon={null}
                                    hourPlaceholder='hh'
                                    minutePlaceholder='mm'
                                    secondPlaceholder='ss'
                                    className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs`}
                                  />
                                  {/* <input
                                  id={toCamelCase(field.fieldLabel)}
                                  name='time'
                                  type='time'
                                  value={field.time}
                                  onChange={(e) =>
                                    HandleInputChange(question.id, field.id, e)
                                  }
                                  placeholder={capitalizeFirstLetter(
                                    field.fieldLabel
                                  )}
                                  required
                                  className={`w-full h-11 block text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs`}
                                /> */}
                                  <button type='button' className='p-2'>
                                    <FiTrash2
                                      className='w-4 h-4 text-gray-400'
                                      onClick={() =>
                                        HandleDeleteField(question.id, field.id)
                                      }
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.questionType?.name &&
                          question.questionType?.name != 'Yes/No' &&
                          question.questionType?.name != 'End screen' &&
                          question.questionType?.name !=
                            'Multiple choice grid' && (
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
                  <div className='pt-6'>
                    <FiCopy
                      className='w-4 h-4 mb-2 cursor-pointer'
                      onClick={() => HandleCopyQuestion(question.id)}
                    />
                    <FiTrash2
                      className='w-4 h-4 cursor-pointer'
                      onClick={() => HandleDeleteQuestion(question.id)}
                    />
                  </div>
                </div>
              ))}
            </div>

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

          <div className='sticky top-0 right-0 w-1/3 lg:w-1/4 h-[calc(100vh-227px)] bg-white space-y-6 p-8 border border-gray-200 rounded-2xl shadow-sm'>
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
    </>
  );
}

export default CreateForm;
