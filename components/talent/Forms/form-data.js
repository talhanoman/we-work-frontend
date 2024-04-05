// data.js
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
  import { RiCheckboxMultipleLine } from 'react-icons/ri';
  import { BsCircleHalf } from 'react-icons/bs';
  import {
    IoApps,
    IoReorderTwoOutline,
    IoExtensionPuzzleOutline,
  } from 'react-icons/io5';
  export const event_options = [
      { label: 'Daira', value: 'Daira', isChecked: false },
      { label: 'Expo', value: 'Expo', isChecked: false },
    ];
    
    export const workforce_type_options = [
      { label: 'Paid Staff', value: 'Paid Staff' },
      { label: 'Volunteer', value: 'Volunteer' },
    ];
    
    export const skill_efficiency_options = [
      { label: 'Beginner', value: 'Beginner' },
      { label: 'Intermediate', value: 'Intermediate' },
      { label: 'Advanced', value: 'Advanced' },
      { label: 'Expert', value: 'Expert' },
    ];
    
    export const skill_options = [
      { name: 'First-aid', value: 'First-aid' },
      { name: 'Carpentry', value: 'Carpentry' },
      { name: 'Stage-setup', value: 'Stage-setup' },
      { name: 'photography', value: 'photography' },
    ];
    
    export const activities_options = [
      'Activity 1',
      'Activity 2',
      'Activity 3',
      'Activity 4',
      'Activity 5',
      'Activity 6',
      'Activity 7',
      'Activity 8',
    ];
    
    export const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    
    export const day_time_options = [
      { icon: '<FiSunrise className="w-6 h-6 text-gray-700" />', daytime: 'Morning' },
      { icon: '<FiSun className="w-6 h-6 text-gray-700" />', daytime: 'Noon' },
      { icon: '<FiSunset className="w-6 h-6 text-gray-700" />', daytime: 'Afternoon' },
      { icon: '<FiMoon className="w-6 h-6 text-gray-700" />', daytime: 'Night' },
    ];
    
    export const gender_options = [
      { value: 'Female' },
      { value: 'Male' },
      { value: 'Nonbinary' },
      { value: 'Prefer not to say' },
      { value: 'Other' },
    ];
    export const datatype_options = [
      { name: 'Short Text', icon: <IoReorderTwoOutline className="w-5 h-5 text-gray-700" /> },
      { name: 'Date', icon: <FiCalendar className="w-5 h-5 text-gray-700" /> },
      { name: 'Phone number', icon: <FiPhone className="w-5 h-5 text-gray-700" /> },
      { name: 'Address', icon: <FiMap className="w-5 h-5 text-gray-700" /> },
      { name: 'Paragraph', icon: <FiAlignLeft className="w-5 h-5 text-gray-700" /> },
      { name: 'Multiple choice', icon: <FiDisc className="w-5 h-5 text-gray-700" /> },
      { name: 'Yes/No', icon: <BsCircleHalf className="w-5 h-5 text-gray-700" /> },
      { name: 'Checkbox', icon: <FiCheckSquare className="w-5 h-5 text-gray-700" /> },
      { name: 'Dropdown', icon: <FiArrowDownCircle className="w-5 h-5 text-gray-700" /> },
      { name: 'Multiple choice grid', icon: <IoApps className="w-5 h-5 text-gray-700" /> },
      { name: 'File upload', icon: <FiUploadCloud className="w-5 h-5 text-gray-700" /> },
      { name: 'Time', icon: <FiClock className="w-5 h-5 text-gray-700" /> },
      { name: 'Location', icon: <FiGlobe className="w-5 h-5 text-gray-700" /> },
      { name: 'Document', icon: <FiFileText className="w-5 h-5 text-gray-700" /> },
      { name: 'Skills', icon: <IoExtensionPuzzleOutline className="w-5 h-5 text-gray-700" /> },
      { name: 'End screen', icon: <RiCheckboxMultipleLine className="w-5 h-5 text-gray-700" /> },
    ];
    
    export const updated_datatype_options = [
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
    
    export const initial_form_data = {
      event_name: '',
      start_date: '',
      end_date: '',
      workforce_type: '',
      questions: [{}],
    };
    