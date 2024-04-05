import Image from 'next/image';
import React, { useState, useEffect, useMemo } from 'react';
import {
  FiArrowDown,
  FiArrowUp,
  FiCopy,
  FiEdit3,
  FiMoreVertical,
  FiTrash2,
} from 'react-icons/fi';
import styles from '../../styles/checkbox.module.css';
import MoreMenu from '../more-menu';
import { DeleteAllDepartments, deleteDepartment } from '@/pages/api/delete';
import { useRouter } from 'next/router';
import ConfirmModal from '../confirm-modal';
import Pagination from '../pagination/Pagination';
import { pushUniqueObject } from '@/functions/functions';

const table_data = [
  {
    id: 1,
    department_name: 'Event Operations',
    department_code: 'EVT9A7G',
    head_of_department_name: '10 Apr 2023',
    email: 'phoenix@email.com',
    avatar_img: 'avatar1.png',
    contact_phone: '(555) 987-6543',
  },
  {
    id: 2,
    department_name: 'Marketing & Promotions',
    department_code: 'EVT2C4H',
    head_of_department_name: '20 Jun 2023',
    email: 'phoenix@email.com',
    avatar_img: 'avatar1.png',
    contact_phone: '(555) 987-6543',
  },
  {
    id: 3,
    department_name: 'Event Production',
    department_code: 'EVT9A7G',
    head_of_department_name: '10 Apr 2023',
    email: 'phoenix@email.com',
    avatar_img: 'avatar1.png',
    contact_phone: '(555) 987-6543',
  },
  {
    id: 4,
    department_name: 'Guest Services',
    department_code: 'EVT9A7G',
    head_of_department_name: '10 Apr 2023',
    email: 'phoenix@email.com',
    avatar_img: 'avatar1.png',
    contact_phone: '(555) 987-6543',
  },
];

const iconSize = 'w-4 h-4';

const main_menu_options = [
  // {
  //   title: "Duplicate all",
  //   icon: <FiCopy className={iconSize} />,
  // },
  {
    title: 'Delete All',
    icon: <FiTrash2 className={iconSize} />,
  },
];

const menu_options = [
  // {
  //   title: "Duplicate",
  //   icon: <FiCopy className={iconSize} />,
  // },
  {
    title: 'Edit',
    icon: <FiEdit3 className={iconSize} />,
  },
  {
    title: 'Delete',
    icon: <FiTrash2 className={iconSize} />,
  },
];

const initial_confirm_modal_data = {
  showModal: false,
  option: 'cancel',
  id: '',
  action: '',
};

const pageHeight = window.innerHeight;

const rowHeight = 56;
const topUiElementsCombinedHeight = 302;
const tableHeaderHeight = 45;
const bottomPaddingHeight = 85;
const paginationHeight = 76;
const outerMarginHeight = 12;

const availableHeightForTable =
  topUiElementsCombinedHeight +
  tableHeaderHeight +
  bottomPaddingHeight +
  paginationHeight +
  outerMarginHeight;

const itemsPerTable =
  availableHeightForTable <= pageHeight
    ? Math.floor((pageHeight - availableHeightForTable) / rowHeight)
    : 1;

function DepartmentsTable({
  showEditModal,
  departments,
  getMyDepartments,
  setSelectedRow,
  isChecked,
  setIsChecked,
  filterDepartments,
  searchFilter,
  selectedOption,
  selectedFilters,
}) {
  const [tableInput, setTableInput] = useState(table_data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(
    initial_confirm_modal_data
  );
  const [currentPage, setCurrentPage] = useState(1);
  var [message, setMessage]  = useState("")

  const router = useRouter();
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'department_name',
    direction: 'ascending',
  });

  const changeIcon =
    selectedRows.length != 0 && selectedRows.length < tableInput.length;
  const areAllRowsSelected =
    selectedRows.length === tableInput.length && !changeIcon;
  // console.log(JSON.parse(router.query.item))

  const initialState = {
    department_name_column: false,
    department_code_column: false,
    department_venue_column: false,
  };

  const [columnOptionsFlags, setColumnOptionsFlags] = useState(initialState);

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
      if (obj.name === 'Department Name') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          department_name_column: true,
        }));
      } else if (obj.name === 'Department Code') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          department_code_column: true,
        }));
      } else if (obj.name === 'Department Venue') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          department_venue_column: true,
        }));
      }
    });
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows(tableInput.map((item) => item.id));
      const allIds = departments?.map((item) => item.department_guid);
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
        data?.department_name?.toLowerCase() === name.toLowerCase()
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
      const duplicateRow = tableInput.find((item) => item.id === menu.id);
      setTableInput([
        ...tableInput,
        { ...duplicateRow, id: new Date().getTime().toString() },
      ]);
    } else if (menu.option.toLowerCase() === 'edit') {
      const editRow = tableInput.find((item) => item.id === menu.id);
      setSelectedRow(item);
      showEditModal({ showModal: true, editRowData: editRow });
    } else if (menu.option.toLowerCase() === 'delete' && menu.id !== 'all') {
      setMessage("Do you want to delete?")
      setShowConfirmModal({
        ...showConfirmModal,
        showModal: true,
        id: menu.id,
        action: 'delete',
      });
    } else if (menu.option.toLowerCase() === 'duplicate all') {
      let duplicateTable = tableInput.map((item, index) => ({
        ...item,
        id: tableInput.length + (index + 1),
      }));
      setTableInput([...tableInput, ...duplicateTable]);
    } else if (menu.option.toLowerCase() === "delete all" && menu.id == "all") {
      setMessage("Do you want to delete all Departments?")
      setShowConfirmModal({
        ...showConfirmModal,
        showModal: true,
        action: "delete_all",
      });
    }
  };

  const deleteMyDepartment = async (departmentGuid) => {
    console.log(departmentGuid);
    let res = await deleteDepartment(departmentGuid);
    if (res.valid) {
      getMyDepartments();
    }
  };

  /**
   * This Function calls the endpoint to delete all departments
   */

  const DeleteMyAllDepartments = async () => {
    let response = await DeleteAllDepartments();
    if (response?.valid) {
      getMyDepartments();
    }
  };

  const handleFiltersQuery = (item) => {
    if (Object.keys(selectedFilters).length === 0) {
      return true;
    } else {
      if (
        selectedFilters?.name?.some((obj) => obj.name === item.department_name)
      ) {
        return true;
      }

      if (
        selectedFilters?.code?.some((obj) => obj.name === item.department_code)
      ) {
        return true;
      }

      if (selectedFilters?.event?.some((obj) => obj.name === item.event_name)) {
        return true;
      }

      return false;
    }
  };

  const handleConfirmModal = (value) => {
    const { showModal, option, id, action } = value;

    if (!showModal && option == 'confirm' && action == 'delete') {
      const updatedTable = tableInput.filter((item) => item.id !== id);
      setTableInput(updatedTable);
      console.log('delete');
      deleteMyDepartment(id);
    } else if (!showModal && option == 'confirm' && action == 'delete_all') {
      console.log('Delete all');
      setTableInput(table_data);
      DeleteMyAllDepartments();
    }

    setShowConfirmModal(initial_confirm_modal_data);
  };

  const searchBarQuery = (item) => {
    if (
      item.department_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.department_code.toLowerCase().includes(searchFilter.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  let updatedFilterDepartments;

  const sortedItems = useMemo(() => {
    return departments
      ? [...departments].sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp =
          first?.toLowerCase() < second?.toLowerCase()
            ? -1
            : first?.toLowerCase() > second?.toLowerCase()
              ? 1
              : 0;

        return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      })
      : departments;
  }, [sortDescriptor, departments]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerTable;
    const lastPageIndex = firstPageIndex + itemsPerTable;
    updatedFilterDepartments = sortedItems
      ?.filter(searchBarQuery)
      ?.filter(handleFiltersQuery);
    return updatedFilterDepartments?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedItems, searchFilter]);

  return (
    <>
      <div className='w-full overflow-x-auto rounded-2xl overflow-visible'>
      <table className='min-w-full'>
          <thead>
            <tr className='bg-gray-50 text-left'>
              {
                columnOptionsFlags.department_name_column ?
                  <th className=' bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 rounded-tl-2xl max-w-[17rem] min-w-[12rem]'>
                    <div className='inline-flex items-center gap-3 '>
                      <label htmlFor='all_select_checkbox'>
                        <input
                          name='all_select_checkbox'
                          type='checkbox'
                          checked={
                            isChecked?.length == departments?.length &&
                            departments?.length
                          }
                          onChange={handleSelectAllChange}
                          className={`w-5 h-5 2xl:w-5 h-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${isChecked?.length !== departments?.length &&
                              isChecked?.length &&
                              departments?.length
                              ? styles['input-checkbox-minus']
                              : styles['input-checkbox']
                            }`}
                        />
                      </label>
                      <span
                        className={`inline-flex items-center gap-1 ${columnOptionsFlags.department_name_column ? '' : 'hidden'
                          }`}
                      >
                        <span>Department Name</span>
                        {sortDescriptor.direction == 'ascending' ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSortDescriptor({
                                ...sortDescriptor,
                                direction: 'descending',
                              });
                            }}
                          >
                            <FiArrowUp className='w-4 h-4 text-gray-600' />
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSortDescriptor({
                                ...sortDescriptor,
                                direction: 'ascending',
                              });
                            }}
                          >
                            <FiArrowDown className='w-4 h-4 text-gray-600' />
                          </button>
                        )}
                      </span>
                    </div>
                  </th>
                  :
                  <th className='w-[25px] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 pl-6 py-3 border-b border-gray-200 rounded-tl-2xl'>
                    <div className='inline-flex items-center gap-3 '>
                      <label htmlFor='all_select_checkbox'>
                        <input
                          name='all_select_checkbox'
                          type='checkbox'
                          checked={
                            isChecked?.length == departments?.length &&
                            departments?.length
                          }
                          onChange={handleSelectAllChange}
                          className={`w-5 h-5 2xl:w-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${isChecked?.length !== departments?.length &&
                              isChecked?.length &&
                              departments?.length
                              ? styles['input-checkbox-minus']
                              : styles['input-checkbox']
                            }`}
                        />
                      </label>
                    </div>
                  </th>

              }

              <th
                className={`max-w-[17rem] min-w-[12rem] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'}   border-b border-gray-200 ${columnOptionsFlags.department_code_column ? '' : 'hidden'
                  }`}
              >
                Code
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'}   border-b border-gray-200 ${columnOptionsFlags.department_venue_column ? '' : 'hidden'
                  }`}
              >
                Event Name
              </th>
              <th className=' bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 rounded-tr-2xl ml-auto flex justify-end'>
                <MoreMenu
                  id={'all'}
                  options={main_menu_options}
                  onClick={handleMenu}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTableData?.map((item, index) => (
              <tr
                onDoubleClick={(e) => {
                  const isCheckbox =
                    e.target?.tagName?.toLowerCase() === 'input' &&
                    e.target?.type === 'checkbox';
                  if (!isCheckbox) {
                    let path = sessionStorage.getItem('breadcrumbs');
                    if (path) {
                      let pathParsed = JSON.parse(path);
                      pushUniqueObject(pathParsed, {
                        item: item,
                        pathname: router.pathname,
                      });
                      sessionStorage.setItem(
                        'breadcrumbs',
                        JSON.stringify(pathParsed)
                      );
                    } else {
                      let breadcrumbsArray = [];
                      pushUniqueObject(breadcrumbsArray, {
                        item: item,
                        pathname: router.pathname,
                      });
                      sessionStorage.setItem(
                        'breadcrumbs',
                        JSON.stringify(breadcrumbsArray)
                      );
                    }

                    router.push(
                      {
                        pathname: '/headcount/functions',
                        query: { item: JSON.stringify(item) },
                      },
                      '/headcount/functions'
                    );
                  }
                }}
                key={index}
                className={`h-14 ${isChecked.includes(item.department_guid)
                    ? 'bg-[#F8FBFE]'
                    : index % 2 == 0
                      ? 'bg-white'
                      : 'bg-gray-50'
                  }`}
              >
                <td className='w-fit text-xs-medium 2xl:text-sm-medium text-gray-900 px-6 py-4 border-b border-gray-200'>
                  <div className='inline-flex items-center gap-3'>
                    <label htmlFor={`position_checkbox${index}`}>
                      <input
                        name={item?.department_name}
                        type='checkbox'
                        checked={isChecked.includes(item.department_guid)}
                        onChange={(e) =>
                          handleRowSelectChange(e, item.department_guid)
                        }
                        className={`w-5 h-5 2xl:w-5 h-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${styles['input-checkbox']}`}
                      />
                    </label>
                    <span
                      className={`${columnOptionsFlags.department_name_column
                          ? ''
                          : 'hidden'
                        }`}
                    >
                      {item.department_name}
                    </span>
                  </div>
                </td>
                <td
                  className={`text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200 ${columnOptionsFlags.department_code_column ? '' : 'hidden'
                    }`}
                >
                  {item.department_code}
                </td>
                <td
                  className={`text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200 ${columnOptionsFlags.department_venue_column ? '' : 'hidden'
                    }`}
                >
                  {item.event_name}
                </td>
                <td
                  className='px-6 py-4 border-b border-gray-200 ml-auto flex justify-end'
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreMenu
                    id={item?.department_guid}
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
      {departments?.length > 0 && (
        <div className={`bg-white rounded-b-2xl`}>
          <Pagination
            currentPage={currentPage}
            totalCount={
              updatedFilterDepartments &&
                (searchFilter.length > 0 || updatedFilterDepartments?.length > 0)
                ? updatedFilterDepartments?.length
                : departments.length
            }
            pageSize={itemsPerTable}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
      <ConfirmModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={handleConfirmModal}
        message={message}
      />
    </>
  );
}

export default DepartmentsTable;
