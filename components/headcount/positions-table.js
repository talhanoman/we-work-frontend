import React, { useState, useEffect, useMemo } from 'react';
import {
  FiArrowDown,
  FiCopy,
  FiEdit3,
  FiMoreVertical,
  FiTrash2,
  FiHelpCircle,
  FiArrowUp,
} from 'react-icons/fi';
import styles from '../../styles/checkbox.module.css';
import Cookies from 'universal-cookie';
import MoreMenu from '../more-menu';
import { useRouter } from 'next/router';
import { addPosition } from '@/pages/api/post';
import { DeleteAllPositions, deletePosition } from '@/pages/api/delete';
import ConfirmModal from '../confirm-modal';
import Pagination from '../pagination/Pagination';

const table_head_data = [
  'Event',
  'Department',
  'Function',
  'Role',
  'Workforce type',
  'Start date',
  'End date',
  'Reports to',
  'Venue',
  'Number of shifts per day',
  'Total demand',
  'Peak shift',
];

const iconSize = 'w-4 h-4';

const main_menu_options = [
  {
    title: 'Duplicate All',
    icon: <FiCopy className={iconSize} />,
  },
  {
    title: 'Delete All',
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

const initialState = {
  position_name_column: false,
  position_event_column: false,
  position_department_column: false,
  position_function_column: false,
  position_role_column: false,
  position_workforce_column: false,
  position_startdate_column: false,
  position_enddate_column: false,
  position_reportsto_column: false,
  position_venue_column: false,
  position_numberofshifts_column: false,
  position_totaldemand_column: false,
  position_peakshift_column: false,
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

function PositionsTable({
  showEditModal,
  positions,
  getMyPositions,
  setSelected,
  isChecked,
  setIsChecked,
  setConfirmationModal,
  setPositionGuid,
  searchFilter,
  selectedOption,
  selectedFilters,
}) {
  var [message, setMessage]  = useState("")
  const [tableInput, setTableInput] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columnOptionsFlags, setColumnOptionsFlags] = useState(initialState);
  const [showConfirmModal, setShowConfirmModal] = useState(
    initial_confirm_modal_data
  );
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const query = router?.query;
  let role_guid = null;
  if (query.item !== undefined) {
    role_guid = JSON.parse(query.item).RoleGUID;
  }

  let cookie = new Cookies();
  let token = cookie.get('token');
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'start_date',
    direction: 'ascending',
  });

  const changeIcon =
    selectedRows.length != 0 && selectedRows.length < tableInput.length;
  const areAllRowsSelected =
    selectedRows.length === tableInput.length && !changeIcon;

  const columnOptionsFlagsValuesArray = Object.values(columnOptionsFlags);

  console.log(changeIcon, 'changeIcon');
  console.log(areAllRowsSelected, 'areAllRowsSelected');
  console.log(selectedRows, 'selectedRows');
  console.log(tableInput, 'tableInput');

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
      if (obj.name === 'Position') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_name_column: true,
        }));
      } else if (obj.name === 'Event') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_event_column: true,
        }));
      } else if (obj.name === 'Department') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_department_column: true,
        }));
      } else if (obj.name === 'Function') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_function_column: true,
        }));
      } else if (obj.name === 'Role') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_role_column: true,
        }));
      } else if (obj.name === 'Workforce type') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_workforce_column: true,
        }));
      } else if (obj.name === 'Start date') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_startdate_column: true,
        }));
      } else if (obj.name === 'End date') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_enddate_column: true,
        }));
      } else if (obj.name === 'Reports to') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_reportsto_column: true,
        }));
      } else if (obj.name === 'Venue') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_venue_column: true,
        }));
      } else if (obj.name === 'Number of shifts per day') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_numberofshifts_column: true,
        }));
      } else if (obj.name === 'Total demand') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_totaldemand_column: true,
        }));
      } else if (obj.name === 'Peak shift') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          position_peakshift_column: true,
        }));
      }
    });
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows(tableInput.map((item) => item.id));
      const allIds = positions?.map((item) => item.position_guid);
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
      console.log('Checked', isChecked);
    } else {
      setIsChecked((prevState) =>
        prevState.filter((selectedId) => selectedId !== rowId)
      );
      console.log('Checked', isChecked);
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
        data?.position?.toLowerCase() === name?.toLowerCase()
          ? { ...data, isChecked: checked }
          : data
      );
      setTableInput(tempInput);
    }
  };

  const handleMenu = (menu, item) => {
    if (menu.option?.toLowerCase() === 'duplicate') {
      const duplicateRow = tableInput.find((item) => item.id === menu.id);
      setTableInput([
        ...tableInput,
        { ...duplicateRow, id: new Date().getTime().toString() },
      ]);
      duplicateMyPosition(item);
    } else if (menu.option?.toLowerCase() === 'edit') {
      const editRow = tableInput.find((item) => item.id === menu.id);
      console.log('Tlha code: ', item);
      setSelected(item);
      showEditModal({ showModal: true, editRowData: editRow });
    } else if (menu.option?.toLowerCase() === 'delete' && menu.id !== 'all') {
      setMessage("Do you want to delete?")
      setShowConfirmModal({
        ...showConfirmModal,
        showModal: true,
        id: menu.id,
        action: 'delete',
      });
    } else if (menu.option?.toLowerCase() === 'duplicate all') {
      let duplicateTable = tableInput.map((item, index) => ({
        ...item,
        id: tableInput.length + (index + 1),
      }));
      setTableInput([...tableInput, ...duplicateTable]);
    } else if (menu.option?.toLowerCase() === 'delete all' && menu.id == 'all') {
      setMessage("Do you want to delete all Positions?")
      setShowConfirmModal({
        ...showConfirmModal,
        showModal: true,
        action: 'delete_all',
      });
    }
  };

  const deleteMyPosition = async (positionGuid) => {
    let res = await deletePosition(positionGuid);
    if (res.valid) {
      getMyPositions();
    }
  };

  const DeleteMyAllPositions = async () => {
    let response = await DeleteAllPositions();
    if (response?.valid) {
      getMyPositions();
    }
  };

  const duplicateMyPosition = async (item) => {
    let res = await addPosition(
      token,
      item.role_guid,
      item.venue_guid,
      item.event_guid,
      item.department_guid,
      item.report_to_guid,
      item.role_workforce_type,
      item.shift_per_day.toString(),
      item.total_demand.toString(),
      item.peak_shift.toString(),
      item.start_date,
      item.end_date,
      item.peak_day.toString(),
      item.multiplier.toString()
    );

    let { valid } = res;
    if (valid) {
      getMyPositions();
    }
  };

  const searchBarQuery = (item) => {
    if (
      item.position_code?.toLowerCase().includes(searchFilter?.toLowerCase())
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
        selectedFilters?.code?.some((obj) => obj.name === item.position_code)
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

      if (
        selectedFilters?.function?.some(
          (obj) => obj.name === item.function_name
        )
      ) {
        return true;
      }

      if (selectedFilters?.role?.some((obj) => obj.name === item.role_name)) {
        return true;
      }

      if (
        selectedFilters?.workforce?.some(
          (obj) => obj.name === item.position_workforce_type
        )
      ) {
        return true;
      }

      if (
        selectedFilters?.reports_to?.some(
          (obj) => obj.name === item.report_to_role_name
        )
      ) {
        return true;
      }

      if (selectedFilters?.venue?.some((obj) => obj.name === item.venue_name)) {
        return true;
      }

      if (
        selectedFilters?.shifts?.some(
          (obj) => obj.name === String(item.shift_per_day)
        )
      ) {
        return true;
      }

      if (
        selectedFilters?.demand?.some(
          (obj) => String(obj.name) === String(item.total_demand)
        )
      ) {
        return true;
      }

      if (
        selectedFilters?.peak_shift?.some(
          (obj) => String(obj.name) === String(item.peak_shift)
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
      setPositionGuid(id);
      deleteMyPosition(id);
      console.log('delete');
    } else if (!showModal && option == 'confirm' && action == 'delete_all') {
      console.log('Delete all');
      DeleteMyAllPositions();
    }

    setShowConfirmModal(initial_confirm_modal_data);
  };

  let updatedFilterPositions;

  const sortedItems = useMemo(() => {
    return positions
      ? [...positions].sort((a, b) => {
        const first = new Date(a[sortDescriptor.column]);
        const second = new Date(b[sortDescriptor.column]);
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      })
      : positions;
  }, [sortDescriptor, positions]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerTable;
    const lastPageIndex = firstPageIndex + itemsPerTable;
    updatedFilterPositions = sortedItems
      ?.filter(searchBarQuery)
      ?.filter(handleFiltersQuery);
    return updatedFilterPositions?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedItems, searchFilter]);

  console.log(currentTableData);

  return (
    <>
      <div className='w-full overflow-x-auto rounded-2xl overflow-y-visible'>
        <table className='w-full table-auto'>
          <thead>          
            <tr className='bg-gray-50 text-left'>
              {
                columnOptionsFlags.position_name_column ?
                  <th className='bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 rounded-tl-2xl'>
                    <div className='w-full inline-flex items-center gap-3 '>
                      <label htmlFor='all_select_checkbox'>
                        <input
                          name='all_select_checkbox'
                          type='checkbox'
                          checked={
                            isChecked?.length == positions?.length &&
                            positions?.length
                          }
                          onChange={handleSelectAllChange}
                          className={`w-5 h-5 2xl:w-5 h-5 2xl:h-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${isChecked?.length !== positions?.length &&
                              isChecked?.length &&
                              positions?.length
                              ? styles['input-checkbox-minus']
                              : styles['input-checkbox']
                            }`}
                        />
                      </label>
                      <span>Position</span>
                    </div>
                  </th>
                  :
                  <th className='bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 pl-6 py-3 border-b border-gray-200 rounded-tl-2xl w-[25px]'>
                    <div className='w-full inline-flex items-center gap-3 '>
                      <label htmlFor='all_select_checkbox'>
                        <input
                          name='all_select_checkbox'
                          type='checkbox'
                          checked={
                            isChecked?.length == positions?.length &&
                            positions?.length
                          }
                          onChange={handleSelectAllChange}
                          className={`w-5 h-5 2xl:w-5 2xl:h-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${isChecked?.length !== positions?.length &&
                              isChecked?.length &&
                              positions?.length
                              ? styles['input-checkbox-minus']
                              : styles['input-checkbox']
                            }`}
                        />
                      </label>                     
                    </div>
                  </th>
              }

              {table_head_data?.map((head, index) => (
                <th className={`bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200 ${columnOptionsFlagsValuesArray[index + 1] ? '' : 'hidden'
              }`}>
                  <div className='flex items-center'>
                    <span
                      className={`${columnOptionsFlagsValuesArray[index + 1] ? '' : 'hidden'
                        }`}
                    >
                      {head == 'Start date' ? (
                        <span className={`inline-flex items-center gap-1`}>
                          <span>{head}</span>
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
                      ) : (
                        <span>{head}</span>
                      )}
                    </span>

                    {head === 'Total demand' ? (
                      <>
                        <FiHelpCircle
                          data-tooltip-target='tooltip-default'
                          className='w-5 h-5 hover:cursor-pointer'
                        />
                        <div
                          id='tooltip-default'
                          role='tooltip'
                          class='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
                        >
                          Tooltip content
                          <div class='tooltip-arrow' data-popper-arrow></div>
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                    {head === 'Peak shift' ? (
                      <>
                        <FiHelpCircle className='w-5 h-5 hover:cursor-pointer' />
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </th>
              ))}
              <th className='w-[68px] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 rounded-tr-2xl ml-auto flex justify-end'>
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
                key={index}
                className={`h-14 ${isChecked.includes(item.position_guid)
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
                        name={item?.position_code}
                        type='checkbox'
                        checked={isChecked.includes(item.position_guid)}
                        onChange={(e) =>
                          handleRowSelectChange(e, item.position_guid)
                        }
                        className={`w-5 h-5 2xl:w-5 2xl:h-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${styles['input-checkbox']} hover:cursor-pointer`}
                      />
                    </label>
                    <span
                      className={`${columnOptionsFlags.position_name_column ? '' : 'hidden'
                        }`}
                    >
                      {item.position_code}
                    </span>
                  </div>
                </td>
                <td
                  className={`${columnOptionsFlags.position_event_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.event_name}
                </td>
                <td
                  className={`${columnOptionsFlags.position_department_column
                      ? ''
                      : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.department_name}
                </td>
                <td
                  className={`${columnOptionsFlags.position_function_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.function_name}
                </td>
                <td
                  className={`${columnOptionsFlags.position_role_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.role_name}
                </td>
                <td
                  className={`${columnOptionsFlags.position_workforce_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.position_workforce_type}
                </td>
                <td
                  className={`${columnOptionsFlags.position_startdate_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.start_date}
                </td>
                <td
                  className={`${columnOptionsFlags.position_enddate_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.end_date}
                </td>
                <td
                  className={`${columnOptionsFlags.position_reportsto_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.report_to_role_name}
                </td>
                <td
                  className={`${columnOptionsFlags.position_venue_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.venue_name}
                </td>
                <td
                  className={`${columnOptionsFlags.position_peakshift_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.shift_per_day}
                </td>
                <td
                  className={`${columnOptionsFlags.position_totaldemand_column
                      ? ''
                      : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.total_demand}
                </td>
                <td
                  className={`${columnOptionsFlags.position_peakshift_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.position_name_column? 'px-6' : 'pr-6 -left-3 relative'}   py-4 border-b border-gray-200`}
                >
                  {item.peak_shift}
                </td>
                <td className='px-6 py-4 border-b border-gray-200 ml-auto flex justify-end'>
                  <MoreMenu
                    id={item?.position_guid}
                    options={menu_options}
                    onClick={(menu) => {
                      handleMenu(menu, item);
                    }}
                    panelPosition={
                      tableInput?.length != 1 &&
                      (tableInput?.length - 1 == index ||
                        tableInput?.length - 2 == index)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {positions?.length > 0 && (
        <div className={`bg-white rounded-b-2xl`}>
          <Pagination
            currentPage={currentPage}
            totalCount={
              updatedFilterPositions &&
                (searchFilter.length > 0 || updatedFilterPositions?.length > 0)
                ? updatedFilterPositions?.length
                : positions?.length
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

export default PositionsTable;
