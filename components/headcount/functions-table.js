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
import { DeleteAllFunctions, deleteFunction } from '@/pages/api/delete';
import { pushUniqueObject } from '@/functions/functions';
import { useRouter } from 'next/router';
import ConfirmModal from '../confirm-modal';
import Pagination from '../pagination/Pagination';

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

function FunctionsTable({
  data,
  showEditModal,
  showColumns,
  functions,
  getMyFunctions,
  setSelectedRow,
  isChecked,
  setIsChecked,
  searchFilter,
  selectedOption,
  selectedFilters,
}) {
  var [message, setMessage]  = useState("")
  const [tableInput, setTableInput] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(
    initial_confirm_modal_data
  );
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'function_name',
    direction: 'ascending',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const router_query = router?.query;
  let department_guid = null;
  if (router_query.item !== undefined) {
    department_guid = JSON.parse(router_query.item).department_guid;
  }

  const filteredColumns = showColumns?.map((column) =>
    column?.name.toLowerCase()
  );
  const columnNames = Object.keys(tableInput[0]).filter(
    (column) =>
      !filteredColumns.includes(column.replace(/([A-Z])/g, ' $1').toLowerCase())
  );
  console.log(filteredColumns);
  const changeIcon =
    selectedRows.length != 0 && selectedRows.length < tableInput.length;
  const areAllRowsSelected =
    selectedRows.length === tableInput.length && !changeIcon;

  console.log(changeIcon);

  const initialState = {
    function_name_column: false,
    function_id_column: false,
    function_description_column: false,
    event_name_column: false,
    department_name_column: false,
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
      if (obj.name === 'Function name') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          function_name_column: true,
        }));
      } else if (obj.name === 'Function id') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          function_id_column: true,
        }));
      } else if (obj.name === 'Function description') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          function_description_column: true,
        }));
      } else if (obj.name === 'Event Name') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          event_name_column: true,
        }));
      } else if (obj.name === 'Department Name') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          department_name_column: true,
        }));
      }
    });
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows(tableInput.map((item) => item.id));
      const allIds = functions?.map((item) => item.function_guid);
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
      setMessage("Do you want to delete all Functions?")
      setShowConfirmModal({
        ...showConfirmModal,
        showModal: true,
        action: 'delete_all',
      });
    }
  };

  const deleteMyFunction = async (functionGuid) => {
    let res = await deleteFunction(functionGuid);
    if (res.valid) {
      getMyFunctions();
    }
  };

  /**
   * This Function calls the endpoint to delete all functions
   */

  const DeleteMyAllFunctions = async () => {
    let response = await DeleteAllFunctions();
    if (response?.valid) {
      getMyFunctions();
    }
  };

  const showTitle = (inputString) => {
    const convertedString = inputString
      ?.replace(/([A-Z])/g, ' $1')
      ?.toLowerCase();

    const finalString =
      convertedString?.charAt(0)?.toUpperCase() + convertedString?.slice(1);

    return finalString;
  };

  const searchBarQuery = (item) => {
    if (
      item.function_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.function_code.toLowerCase().includes(searchFilter.toLowerCase())
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
      if (
        selectedFilters?.name?.some((obj) => obj.name === item.function_name)
      ) {
        return true;
      }

      if (selectedFilters?.id?.some((obj) => obj.name === item.function_id)) {
        return true;
      }

      if (
        selectedFilters?.description?.some(
          (obj) => obj.name === item.function_description
        )
      ) {
        return true;
      }

      if (selectedFilters?.event?.some((obj) => obj.name === item.event_name)) {
        return true;
      }

      if (
        selectedFilters?.department?.some(
          (obj) => obj.name === item.department_name
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
      deleteMyFunction(id);
      console.log('delete');
    } else if (!showModal && option == 'confirm' && action == 'delete_all') {
      console.log('Delete all');
      DeleteMyAllFunctions();
    }

    setShowConfirmModal(initial_confirm_modal_data);
  };

  let updatedFilterFunctions;

  const sortedItems = useMemo(() => {
    return functions
      ? [...functions].sort((a, b) => {
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
      : functions;
  }, [sortDescriptor, functions]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerTable;
    const lastPageIndex = firstPageIndex + itemsPerTable;
    updatedFilterFunctions = sortedItems
      ?.filter(searchBarQuery)
      ?.filter(handleFiltersQuery);
    return updatedFilterFunctions?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedItems, searchFilter]);

  return (
    <>

      <div className='w-full overflow-x-auto rounded-2xl overflow-visible'>
        <table className='min-w-full'>
          <thead>
            <tr className='bg-gray-50 text-left'>
              {columnOptionsFlags.function_name_column ?
                <th className='max-w-[17rem] min-w-[12rem] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 rounded-tl-2xl'>
                  <div className='inline-flex items-center gap-3 '>
                    <label htmlFor='all_select_checkbox'>
                      <input
                        name='all_select_checkbox'
                        type='checkbox'
                        checked={
                          isChecked?.length == functions?.length &&
                          functions?.length
                        }
                        onChange={handleSelectAllChange}
                        className={`h-5 w-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none  ${isChecked?.length !== functions?.length &&
                            isChecked?.length &&
                            functions?.length
                            ? styles['input-checkbox-minus']
                            : styles['input-checkbox']
                          }`}
                      />
                    </label>
                    <span
                      className={`${columnOptionsFlags.function_name_column ? '' : 'hidden'
                        } inline-flex items-center gap-1`}
                    >
                      <span>
                        Function name
                        {/* {showTitle(columnNames[1])} */}
                      </span>
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
                          isChecked?.length == functions?.length &&
                          functions?.length
                        }
                        onChange={handleSelectAllChange}
                        className={`h-5 w-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none  ${isChecked?.length !== functions?.length &&
                            isChecked?.length &&
                            functions?.length
                            ? styles['input-checkbox-minus']
                            : styles['input-checkbox']
                          }`}
                      />
                    </label>
                  </div>
                </th>
              }

              <th
                className={`max-w-[17rem] min-w-[12rem] ${columnOptionsFlags.function_id_column ? '' : 'hidden'
                  } bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.function_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200`}
              >
                Function id
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] ${columnOptionsFlags.function_description_column ? '' : 'hidden'
                  } bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.function_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200`}
              >
                Function description
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] ${columnOptionsFlags.event_name_column ? '' : 'hidden'
                  } bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.function_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200`}
              >
                Event Name
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] ${columnOptionsFlags.department_name_column ? '' : 'hidden'
                  } bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.function_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200`}
              >
                Department Name
              </th>
              {/* <th className="bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200">
              Priority Order
            </th>
            <th className="bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200">
              Workforce type
            </th> */}
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
                        pathname: '/headcount/roles',
                        query: { item: JSON.stringify(item) },
                      },
                      '/headcount/roles'
                    );
                  }
                }}
                key={index}
                className={`h-14 ${isChecked.includes(item.function_guid)
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
                        name={item?.function_name}
                        type='checkbox'
                        checked={isChecked.includes(item.function_guid)}
                        onChange={(e) =>
                          handleRowSelectChange(e, item.function_guid)
                        }
                        className={`h-5 w-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${styles['input-checkbox']}`}
                      />
                    </label>
                    {/* <span>{item.functionName}</span> */}
                    <span
                      className={`${columnOptionsFlags.function_name_column ? '' : 'hidden'
                        }`}
                    >
                      {item?.function_name}
                    </span>
                  </div>
                </td>
                <td
                  className={`${columnOptionsFlags.function_id_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.function_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200`}
                >
                  {item?.function_id}
                </td>
                <td
                  className={`${columnOptionsFlags.function_description_column
                      ? ''
                      : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.function_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200`}
                >
                  {item?.function_description}
                </td>
                <td
                  className={`${columnOptionsFlags.event_name_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.function_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200`}
                >
                  {item?.event_name}
                </td>
                <td
                  className={`${columnOptionsFlags.department_name_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.function_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200`}
                >
                  {item?.department_name}
                </td>
                {/* <td className="text-xs-regular 2xl:text-sm-regular text-gray-900 px-6 py-4 border-b border-gray-200">
                {item?.priority_order}
              </td>
              <td className="text-xs-regular 2xl:text-sm-regular text-gray-900 px-6 py-4 border-b border-gray-200">
                <div className="flex gap-x-2">
                  {
                    item?.workforce_type === "Contractor" ?
                    <div className="px-2 py-1 rounded-2xl bg-[#F1F6FD]">
                      <p className="text-[#084CD0] font-medium text-xs">Con</p>
                    </div>
                    :
                    item?.workforce_type === "Volunteer" ?
                    <div className="px-2 py-1 rounded-2xl bg-[#FFF3F1]">
                      <p className="text-red-700 font-medium text-xs">Vol</p>
                    </div>
                    :
                    <div className="px-2 py-1 rounded-2xl bg-[#F0FCE9]">
                      <p className="text-[#327219] font-medium text-xs">Pst</p>
                    </div>
                  }
                </div>
              </td> */}
                <td
                  className='px-6 py-4 border-b border-gray-200 ml-auto flex justify-end'
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreMenu
                    id={item?.function_guid}
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
      {functions?.length > 0 && (
        <div className={`bg-white rounded-b-2xl`}>
          <Pagination
            currentPage={currentPage}
            totalCount={
              updatedFilterFunctions &&
                (searchFilter.length > 0 || updatedFilterFunctions?.length > 0)
                ? updatedFilterFunctions?.length
                : functions?.length
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

export default FunctionsTable;
