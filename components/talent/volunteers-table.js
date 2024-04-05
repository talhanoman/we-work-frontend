import React, { useState, useEffect } from 'react';
import {
  FiArrowDown,
  FiCopy,
  FiEdit3,
  FiMoreVertical,
  FiTrash2,
} from 'react-icons/fi';
import styles from '../../styles/checkbox.module.css';
import MoreMenu from '../more-menu';
import Image from 'next/image';

const iconSize = 'w-4 h-4';

const main_menu_options = [
  {
    title: 'Duplicate all',
    icon: <FiCopy className={iconSize} />,
  },
  {
    title: 'Delete',
    icon: <FiTrash2 className={iconSize} />,
  },
];

const menu_options = [
  {
    title: 'Duplicate',
    icon: <FiCopy className={iconSize} />,
  },
  {
    title: 'Edit',
    icon: <FiEdit3 className={iconSize} />,
  },
  {
    title: 'Delete',
    icon: <FiTrash2 className={iconSize} />,
  },
];

function VolunteersTable({
  selectedOption,
  isChecked,
  setIsChecked,
  table_data,
}) {
  const [tableInput, setTableInput] = useState(table_data);

  // const cookies = new Cookies()
  // const token = cookies.get('token')
  // const router = useRouter()

  const initialState = {
    applicant_name_column: false,
    fa_confirmed_column: false,
    user_id_column: false,
    email_address_column: false,
    dob_column: false,
    contact_no_column: false,
    function_column: false,
    role_column: false,
    application_status_column: false,
    application_progress_column: false,
  };

  const [columnOptionsFlags, setColumnOptionsFlags] = useState(initialState);

  const [selectedRows, setSelectedRows] = useState([]);
  const changeIcon =
    selectedRows.length != 0 && selectedRows.length < tableInput.length;
  const areAllRowsSelected =
    selectedRows.length === tableInput.length && !changeIcon;

  useEffect(() => {
    checkSelectedColumns();
  }, [selectedOption]);

  const resetColumnsToFalse = () => {
    setColumnOptionsFlags(initialState);
  };

  const checkSelectedColumns = () => {
    resetColumnsToFalse();
    // To reset and to check again if anyone is still true or it was false
    selectedOption.map((obj) => {
      if (obj.name === 'Applicant Name') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          applicant_name_column: true,
        }));
      } else if (obj.name === 'FA Confirmed') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          fa_confirmed_column: true,
        }));
      } else if (obj.name === 'User ID') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          user_id_column: true,
        }));
      } else if (obj.name === 'Email Address') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          email_address_column: true,
        }));
      } else if (obj.name === 'Date of Birth') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          dob_column: true,
        }));
      } else if (obj.name === 'Contact Number') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          contact_no_column: true,
        }));
      } else if (obj.name === 'Function') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          function_column: true,
        }));
      } else if (obj.name === 'Role') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          role_column: true,
        }));
      } else if (obj.name === 'Application Status') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          application_status_column: true,
        }));
      } else if (obj.name === 'Application Progress') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          application_progress_column: true,
        }));
      }
    });
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows(tableInput.map((item) => item.id));
      const allIds = table_data.map((item) => item.id);
      setIsChecked(allIds);
    } else {
      setSelectedRows([]);
      setIsChecked([]);
    }
  };

  const handleRowSelectChange = (e, rowId) => {
    const checkMe = e.target.checked;
    if (checkMe) {
      setIsChecked((prevState) => [...prevState, rowId]);
    } else {
      setIsChecked((prevState) =>
        prevState.filter((selectedId) => selectedId !== rowId)
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'all_select_checkbox') {
      let tempInput = tableInput.map((data) => {
        return { ...data, isChecked: checked };
      });
      setTableInput(tempInput);
    } else {
      let tempInput = tableInput.map((data) =>
        data?.eventName?.toLowerCase() === name.toLowerCase()
          ? { ...data, isChecked: checked }
          : data
      );
      setTableInput(tempInput);
    }
  };

  const handleMenu = (menu, item) => {
    console.log('Menu', menu);
    console.log('Item', item);
    if (menu.option.toLowerCase() === 'duplicate') {
      const duplicateRow = tableInput.find(
        (item) => item.event_guid === menu.id
      );
      setTableInput([
        ...tableInput,
        { ...duplicateRow, id: new Date().getTime().toString() },
      ]);
      duplicateMyEvent(item);
    } else if (menu.option.toLowerCase() === 'edit') {
      const editRow = tableInput.find((item) => item.id === menu.id);
      setSelectedRow(item);
      // console.log('Edit Row Data', table_data)
      showEditModal({ showModal: true, editRowData: editRow });
      console.log('Edit');
    } else if (menu.option.toLowerCase() === 'delete' && menu.id !== 'all') {
      const updatedTable = tableInput.filter((item) => item.id !== menu.id);
      setTableInput(updatedTable);
      console.log('delete');
      deleteMyEvent(menu.id);
    } else if (menu.option.toLowerCase() === 'duplicate all') {
      let duplicateTable = tableInput.map((item, index) => ({
        ...item,
        id: tableInput.length + (index + 1),
      }));
      setTableInput([...tableInput, ...duplicateTable]);
    } else if (menu.option.toLowerCase() === 'delete' && menu.id == 'all') {
      setTableInput(table_data);
    }
  };

  // const deleteMyEvent = async (eventGuid) => {
  //   let res = await deleteEvent(eventGuid)
  //   let { valid } = res
  //   if (valid) {
  //     console.log("deleted")
  //     getMyEvents()
  //   }
  // }

  // const duplicateMyEvent = async (item) => {
  //   let res = await addEvent(token, item.event_name, item.venue_guid, item.start_date, item.end_date, item.event_description, item.max_shifts)

  //   let { valid } = res
  //   if (valid) {
  //     getMyEvents()
  //   }
  // }

  // const searchBarQuery = (item) => {
  //   if (item.event_name.toLowerCase().includes(searchFilter.toLowerCase()) || item.event_code.toLowerCase().includes(searchFilter.toLowerCase()))
  //   {
  //     return true
  //   }
  //   else
  //   {
  //     return false
  //   }
  // }

  return (
    <div className='w-full overflow-x-auto min-h-[340px] rounded-2xl'>
      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-gray-50 text-left'>
            <th className='bg-gray-50 text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 rounded-tl-2xl'>
              <div className='inline-flex items-center gap-3 '>
                <label htmlFor='all_select_checkbox'>
                  <input
                    name='all_select_checkbox'
                    type='checkbox'
                    checked={areAllRowsSelected}
                    onChange={handleSelectAllChange}
                    className={`w-4 2xl:w-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${styles['input-checkbox']}`}
                  />
                </label>
                <span
                  className={`inline-flex items-center gap-1 ${
                    selectedOption.length <= 0 ||
                    columnOptionsFlags.applicant_name_column
                      ? ''
                      : 'hidden'
                  }`}
                >
                  <span className='text-xs-medium 2xl:text-sm-medium text-gray-600'>
                    Applicant Name
                  </span>
                  <FiArrowDown className='w-4 h-4 text-gray-600' />
                </span>
              </div>
            </th>
            <th
              className={`bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 ${
                selectedOption.length <= 0 ||
                columnOptionsFlags.fa_confirmed_column
                  ? ''
                  : 'hidden'
              }`}
            >
              FA Confirmed
            </th>
            <th
              className={`bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 ${
                selectedOption.length <= 0 || columnOptionsFlags.user_id_column
                  ? ''
                  : 'hidden'
              }`}
            >
              User ID
            </th>
            <th
              className={`bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 ${
                selectedOption.length <= 0 ||
                columnOptionsFlags.email_address_column
                  ? ''
                  : 'hidden'
              }`}
            >
              Email Address
            </th>
            <th
              className={`bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 ${
                selectedOption.length <= 0 || columnOptionsFlags.dob_column
                  ? ''
                  : 'hidden'
              }`}
            >
              Date of Birth
            </th>
            <th
              className={`bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 ${
                selectedOption.length <= 0 ||
                columnOptionsFlags.contact_no_column
                  ? ''
                  : 'hidden'
              }`}
            >
              Contact Number
            </th>
            <th
              className={`bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 ${
                selectedOption.length <= 0 || columnOptionsFlags.function_column
                  ? ''
                  : 'hidden'
              }`}
            >
              Function
            </th>
            <th
              className={`bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 ${
                selectedOption.length <= 0 || columnOptionsFlags.role_column
                  ? ''
                  : 'hidden'
              }`}
            >
              Role
            </th>
            <th
              className={`bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 ${
                selectedOption.length <= 0 ||
                columnOptionsFlags.application_status_column
                  ? ''
                  : 'hidden'
              }`}
            >
              Application Status
            </th>
            <th
              className={`bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 ${
                selectedOption.length <= 0 ||
                columnOptionsFlags.application_progress_column
                  ? ''
                  : 'hidden'
              }`}
            >
              Application Progress
            </th>
            <th className='bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 rounded-tr-2xl'>
              <MoreMenu
                id={'all'}
                options={main_menu_options}
                onClick={handleMenu}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {table_data?.map((item, index) => (
            <tr
              key={index}
              className={`${
                isChecked.includes(item.id)
                  ? 'bg-[#F8FBFE]'
                  : index % 2 == 0
                  ? 'bg-white'
                  : 'bg-gray-50'
              }`}
            >
              <td className='text-xs-medium 2xl:text-sm-medium text-gray-900 px-6 py-4 border-b border-gray-200'>
                <div className='inline-flex items-center gap-3'>
                  <label htmlFor={`position_checkbox${index}`}>
                    <input
                      name={item?.id}
                      type='checkbox'
                      checked={isChecked.includes(item.id)}
                      onChange={(e) => handleRowSelectChange(e, item.id)}
                      className={`w-4 2xl:w-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${styles['input-checkbox']}`}
                    />
                  </label>
                  <span className='relative w-10'>
                    <Image src={item.img} width={500} height={500} />
                  </span>
                  <span
                    className={`${
                      selectedOption.length <= 0 ||
                      columnOptionsFlags.applicant_name_column
                        ? ''
                        : 'hidden'
                    }`}
                  >
                    {item.applicantName}
                  </span>
                </div>
              </td>
              <td
                className={`text-xs-regular 2xl:text-sm-regular text-gray-900 px-6 py-4 border-b border-gray-200 ${
                  selectedOption.length <= 0 ||
                  columnOptionsFlags.fa_confirmed_column
                    ? ''
                    : 'hidden'
                }`}
              >
                <span
                  className={`tile  ${
                    item.faConfirmed === 'true' ? 'green-tile' : 'red-tile'
                  }`}
                >
                  {item.faConfirmed}
                </span>
              </td>
              <td
                className={`text-xs-regular 2xl:text-sm-regular text-gray-900 px-6 py-4 border-b border-gray-200 ${
                  selectedOption.length <= 0 ||
                  columnOptionsFlags.user_id_column
                    ? ''
                    : 'hidden'
                }`}
              >
                {item.userId}
              </td>
              <td
                className={`text-xs-regular 2xl:text-sm-regular text-gray-900 px-6 py-4 border-b border-gray-200 ${
                  selectedOption.length <= 0 ||
                  columnOptionsFlags.email_address_column
                    ? ''
                    : 'hidden'
                }`}
              >
                {item.emailAddress}
              </td>
              <td
                className={`text-xs-regular 2xl:text-sm-regular text-gray-900 px-6 py-4 border-b border-gray-200 ${
                  selectedOption.length <= 0 ||
                  columnOptionsFlags.contact_no_column
                    ? ''
                    : 'hidden'
                }`}
              >
                {item.dob}
              </td>
              <td
                className={`text-xs-regular 2xl:text-sm-regular text-gray-900 px-6 py-4 border-b border-gray-200 ${
                  selectedOption.length <= 0 || columnOptionsFlags.dob_column
                    ? ''
                    : 'hidden'
                }`}
              >
                {item.contactNo}
              </td>
              <td
                className={`text-xs-regular 2xl:text-sm-regular text-gray-900 px-6 py-4 border-b border-gray-200 ${
                  selectedOption.length <= 0 ||
                  columnOptionsFlags.function_column
                    ? ''
                    : 'hidden'
                }`}
              >
                {item.function}
              </td>
              <td
                className={`text-xs-regular 2xl:text-sm-regular text-gray-900 px-6 py-4 border-b border-gray-200 ${
                  selectedOption.length <= 0 || columnOptionsFlags.role_column
                    ? ''
                    : 'hidden'
                }`}
              >
                {item.role}
              </td>
              <td
                className={`text-xs-regular 2xl:text-sm-regular text-gray-900 px-6 py-4 border-b border-gray-200 ${
                  selectedOption.length <= 0 ||
                  columnOptionsFlags.application_status_column
                    ? ''
                    : 'hidden'
                }`}
              >
                <span
                  className={`tile  ${
                    item.applicationStatus === 'Active'
                      ? 'green-tile'
                      : item.applicationStatus === 'Inactive'
                      ? 'red-tile'
                      : 'yellow-tile'
                  }`}
                >
                  {item.applicationStatus}
                </span>
              </td>
              <td
                className={`text-xs-regular 2xl:text-sm-regular text-gray-900 px-6 py-4 border-b border-gray-200 ${
                  selectedOption.length <= 0 ||
                  columnOptionsFlags.application_progress_column
                    ? ''
                    : 'hidden'
                }`}
              >
                <div class='inline-block w-full bg-gray-200 rounded-full h-2.5'>
                  <div
                    class='bg-blue-600 h-2.5 rounded-full'
                    style={{ width: `${item.applicationProgress}%` }}
                  ></div>
                </div>
                <span className='ml-3'>{item.applicationProgress}% </span>
              </td>
              <td
                className='px-6 py-4 border-b border-gray-200'
                onClick={(e) => e.stopPropagation()}
              >
                <MoreMenu
                  id={item?.id}
                  options={menu_options}
                  onClick={(menu) => handleMenu(menu, item)}
                  panelPosition={
                    tableInput.length != 1 &&
                    (tableInput.length - 1 == index ||
                      tableInput.length - 2 == index)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VolunteersTable;
