import Image from 'next/image';
import { getRole } from '@/pages/api/get';
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
import { DeleteAllRoles, deleteRole } from '@/pages/api/delete';
import { pushUniqueObject } from '@/functions/functions';
import { useRouter } from 'next/router';
import ConfirmModal from '../confirm-modal';
import Pagination from '../pagination/Pagination';

const table_data = [
  {
    id: 1,
    roleName: 'Production Coordinator',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    roleCode: 'EVT9A7G',
    workforceType: 'Paid staff',
  },
  {
    id: 2,
    roleName: 'Set Designer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    roleCode: 'EVT2C4H',
    workforceType: 'Paid staff',
  },
  {
    id: 3,
    roleName: 'Stage Manager',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    roleCode: 'EVT9A7G',
    workforceType: 'Contractor',
  },
  {
    id: 4,
    roleName: 'Set Designer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    roleCode: 'EVT9A7G',
    workforceType: 'Volunteer',
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

const initialState = {
  role_name_column: false,
  role_code_column: false,
  role_description_column: false,
  role_workforce_column: false,
  role_function_name: false,
};

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

function RolesTable({
  showEditModal,
  roles,
  getMyRoles,
  setSelectedRow,
  isChecked,
  setIsChecked,
  searchFilter,
  selectedOption,
  selectedFilters,
}) {
  var [message, setMessage]  = useState("")
  const [tableInput, setTableInput] = useState(table_data);
  const [columnOptionsFlags, setColumnOptionsFlags] = useState(initialState);
  const [showConfirmModal, setShowConfirmModal] = useState(
    initial_confirm_modal_data
  );
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'role_name',
    direction: 'ascending',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const query = router?.query;
  let function_guid = null;
  if (query.item !== undefined) {
    function_guid = JSON.parse(query.item).function_guid;
    console.log('Hello: ', function_guid);
  }
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
      if (obj.name === 'Role name') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          role_name_column: true,
        }));
      } else if (obj.name === 'Role description') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          role_description_column: true,
        }));
      } else if (obj.name === 'Role code') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          role_code_column: true,
        }));
      } else if (obj.name === 'Workforce type') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          role_workforce_column: true,
        }));
      } else if (obj.name === 'Function name') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          role_function_name: true,
        }));
      }
    });
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows(tableInput.map((item) => item.id));
      const allIds = roles?.map((item) => item.role_guid);
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
        data?.roleName?.toLowerCase() === name.toLowerCase()
          ? { ...data, isChecked: checked }
          : data
      );
      setTableInput(tempInput);
    }
  };

  const handleMenu = (menu, item) => {
    if (menu.option.toLowerCase() === 'duplicate') {
      const duplicateRow = tableInput.find((item) => item.id === menu.id);
      setTableInput([
        ...tableInput,
        { ...duplicateRow, id: new Date().getTime().toString() },
      ]);
    } else if (menu.option.toLowerCase() === 'edit') {
      const editRow = tableInput.find((item) => item.id === menu.id);
      showEditModal({ showModal: true, editRowData: editRow });
      setSelectedRow(item);
      console.log('Edit');
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
    } else if (menu.option.toLowerCase() === 'delete all' && menu.id == 'all') {
      setMessage("Do you want to delete all Roles?")
      setShowConfirmModal({
        ...showConfirmModal,
        showModal: true,
        action: 'delete_all',
      });
    }
  };

  const deleteMyRole = async (roleGuid) => {
    let res = await deleteRole(roleGuid);
    if (res.valid) {
      getMyRoles();
    }
  };

  /**
   * This Function calls the endpoint to delete all roles
   */

  const DeleteMyAllRoles = async () => {
    let response = await DeleteAllRoles();
    if (response?.valid) {
      getMyRoles();
    }
  };

  const searchBarQuery = (item) => {
    if (
      item.role_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.role_code.toLowerCase().includes(searchFilter.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleFiltersQuery = (item) => {
    if (Object.keys(selectedFilters).length === 0) {
      return true;
    } else {
      if (selectedFilters?.name?.some((obj) => obj.name === item.role_name)) {
        return true;
      }

      if (selectedFilters?.code?.some((obj) => obj.name === item.role_code)) {
        return true;
      }

      if (
        selectedFilters?.description?.some(
          (obj) => obj.name === item.role_description
        )
      ) {
        return true;
      }

      if (
        selectedFilters?.workforce?.some(
          (obj) => obj.name === item.workforce_type
        )
      ) {
        return true;
      }

      if (
        selectedFilters?.function?.some(
          (obj) => obj.name === item.function_name
        )
      ) {
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
      deleteMyRole(id);
      console.log('delete');
    } else if (!showModal && option == 'confirm' && action == 'delete_all') {
      console.log('Delete all');
      DeleteMyAllRoles();
    }

    setShowConfirmModal(initial_confirm_modal_data);
  };

  let updatedFilterRoles;

  const sortedItems = useMemo(() => {
    return roles
      ? [...roles].sort((a, b) => {
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
      : roles;
  }, [sortDescriptor, roles]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerTable;
    const lastPageIndex = firstPageIndex + itemsPerTable;
    updatedFilterRoles = sortedItems
      ?.filter(searchBarQuery)
      ?.filter(handleFiltersQuery);
    return updatedFilterRoles?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedItems, searchFilter]);

  console.log(roles, 'roles');

  return (
    <>
      <div className='w-full overflow-x-auto rounded-2xl overflow-visible'>
        <table className='min-w-full'>
          <thead>
            <tr className='bg-gray-50 text-left'>         
              {
                columnOptionsFlags.role_name_column ?
                  <th className='max-w-[17rem] min-w-[12rem] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 rounded-tl-2xl'>
                    <div className='inline-flex items-center gap-3 '>
                      <label htmlFor='all_select_checkbox'>
                        <input
                          name='all_select_checkbox'
                          type='checkbox'
                          checked={
                            isChecked?.length == roles?.length && roles?.length
                          }
                          onChange={handleSelectAllChange}
                          className={`w-5 h-5 2xl:w-5 h-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none  ${isChecked?.length !== roles?.length &&
                              isChecked?.length &&
                              roles?.length
                              ? styles['input-checkbox-minus']
                              : styles['input-checkbox']
                            }`}
                        />
                      </label>
                      <span
                        className={`${columnOptionsFlags.role_name_column ? '' : 'hidden'
                          } inline-flex items-center gap-1`}
                      >
                        <span>Role name</span>
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
                            isChecked?.length == roles?.length && roles?.length
                          }
                          onChange={handleSelectAllChange}
                          className={`w-5 h-5 2xl:w-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none  ${isChecked?.length !== roles?.length &&
                              isChecked?.length &&
                              roles?.length
                              ? styles['input-checkbox-minus']
                              : styles['input-checkbox']
                            }`}
                        />
                      </label>
                    </div>
                  </th>
              }

              <th
                className={`max-w-[17rem] min-w-[12rem] ${columnOptionsFlags.role_description_column ? '' : 'hidden'
                  } bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600    ${columnOptionsFlags.role_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200`}
              >
                Role description
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] ${columnOptionsFlags.role_code_column ? '' : 'hidden'
                  } bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600    ${columnOptionsFlags.role_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200`}
              >
                Role code
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] ${columnOptionsFlags.role_workforce_column ? '' : 'hidden'
                  } bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600    ${columnOptionsFlags.role_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200`}
              >
                Workforce type
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] ${columnOptionsFlags.role_function_name ? '' : 'hidden'
                  } bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600    ${columnOptionsFlags.role_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200`}
              >
                Function Name
              </th>
              <th className=' bg-gray-50 text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 rounded-tr-2xl ml-auto flex justify-end'>
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
                        pathname: '/headcount/positions',
                        query: { item: JSON.stringify(item) },
                      },
                      '/headcount/positions'
                    );
                  }
                }}
                key={index}
                className={`h-14 ${isChecked.includes(item.role_guid)
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
                        name={item?.role_code}
                        type='checkbox'
                        checked={isChecked.includes(item.role_guid)}
                        onChange={(e) =>
                          handleRowSelectChange(e, item.role_guid)
                        }
                        className={`w-5 h-5 2xl:w-5 2xl:h-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${styles['input-checkbox']}`}
                      />
                    </label>
                    <span
                      className={`${columnOptionsFlags.role_name_column ? '' : 'hidden'
                        }`}
                    >
                      {item.role_name}
                    </span>
                  </div>
                </td>
                <td
                  className={`${columnOptionsFlags.role_description_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900    ${columnOptionsFlags.role_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200`}
                >
                  {item.role_description}
                </td>
                <td
                  className={`${columnOptionsFlags.role_code_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900    ${columnOptionsFlags.role_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200`}
                >
                  {item.role_code}
                </td>
                <td
                  className={`${columnOptionsFlags.role_workforce_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900    ${columnOptionsFlags.role_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200`}
                >
                  {item.workforce_type}
                </td>
                <td
                  className={`${columnOptionsFlags?.role_function_name ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900    ${columnOptionsFlags.role_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200`}
                >
                  {item.function_name}
                </td>
                <td
                  className='px-6 py-4 border-b border-gray-200 ml-auto flex justify-end'
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreMenu
                    id={item?.role_guid}
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
      {roles?.length > 0 && (
        <div className={`bg-white rounded-b-2xl`}>
          <Pagination
            currentPage={currentPage}
            totalCount={
              updatedFilterRoles &&
                (searchFilter.length > 0 || updatedFilterRoles?.length > 0)
                ? updatedFilterRoles?.length
                : roles?.length
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

export default RolesTable;
