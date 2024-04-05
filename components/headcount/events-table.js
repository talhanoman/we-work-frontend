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
import { DeleteAllEvents, deleteEvent } from '@/pages/api/delete';
import { addEvent } from '@/pages/api/post';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import ConfirmModal from '../confirm-modal';
import Pagination from '../pagination/Pagination';
import { pushUniqueObject } from '@/functions/functions';

const table_data = [
  {
    id: 1,
    eventName: 'Summer Music Festival',
    eventCode: 'EVT9A7G',
    startDate: '10 Apr 2023',
    endDate: '15 Apr 2023',
    venueName: 'Central Park Amphitheater',
  },
  {
    id: 2,
    eventName: 'International Trade Expo',
    eventCode: 'EVT2C4H',
    startDate: '20 Jun 2023',
    endDate: '25 Jun 2023',
    venueName: 'Grand Plaza Hotel',
  },
  {
    id: 3,
    eventName: 'Neighborhood Block Party',
    eventCode: 'EVT9A7G',
    startDate: '10 Apr 2023',
    endDate: '15 Apr 2023',
    venueName: 'Central Park Amphitheater',
  },
  {
    id: 4,
    eventName: 'Charity Walkathon',
    eventCode: 'EVT9A7G',
    startDate: '10 Apr 2023',
    endDate: '15 Apr 2023',
    venueName: 'Central Park Amphitheater',
  },
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
  event_name_column: false,
  event_code_column: false,
  event_start_date_column: false,
  event_end_date_column: false,
  event_venue_column: false,
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

function EventsTable({
  showEditModal,
  events,
  getMyEvents,
  setSelectedRow,
  isChecked,
  setIsChecked,
  searchFilter,
  selectedOption,
}) {
  const [tableInput, setTableInput] = useState(table_data);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'start_date',
    direction: 'ascending',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const cookies = new Cookies();
  const token = cookies.get('token');
  const router = useRouter();

  const [columnOptionsFlags, setColumnOptionsFlags] = useState(initialState);

  const [selectedRows, setSelectedRows] = useState([]);

  const changeIcon =
    selectedRows.length != 0 && selectedRows.length < tableInput.length;
  const areAllRowsSelected =
    selectedRows.length === tableInput.length && !changeIcon;
  const [showConfirmModal, setShowConfirmModal] = useState(
    initial_confirm_modal_data
  );

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
      if (obj.name === 'Event Name') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          event_name_column: true,
        }));
      } else if (obj.name === 'Event code') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          event_code_column: true,
        }));
      } else if (obj.name === 'Start Date') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          event_start_date_column: true,
        }));
      } else if (obj.name === 'End Date') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          event_end_date_column: true,
        }));
      } else if (obj.name === 'Venue') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          event_venue_column: true,
        }));
      }
    });
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows(tableInput.map((item) => item.id));
      const allIds = events?.map((item) => item.event_guid);
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
    } else if (menu.option.toLowerCase() === 'delete' && menu.id == 'all') {
      setShowConfirmModal({
        ...showConfirmModal,
        showModal: true,
        action: 'delete_all',
      });
    }
  };

  const deleteMyEvent = async (eventGuid) => {
    let res = await deleteEvent(eventGuid);
    let { valid } = res;
    if (valid) {
      console.log('deleted');
      getMyEvents();
    }
  };

  /**
   * The Function will call the end point for deleting all the events
   */
  const DeleteAllMyEvents = async () => {
    let response = await DeleteAllEvents();

    if (response?.valid) {
      getMyEvents();
    }
  };

  const duplicateMyEvent = async (item) => {
    let res = await addEvent(
      token,
      item.event_name,
      item.venue_guid,
      item.start_date,
      item.end_date,
      item.event_description,
      item.max_shifts
    );

    let { valid } = res;
    if (valid) {
      getMyEvents();
    }
  };

  const searchBarQuery = (item) => {
    if (
      item.event_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.event_code.toLowerCase().includes(searchFilter.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleConfirmModal = (value) => {
    const { showModal, option, id, action } = value;

    if (!showModal && option == 'confirm' && action == 'delete') {
      const updatedTable = tableInput.filter((item) => item.id !== id);
      setTableInput(updatedTable);
      console.log('delete');
      deleteMyEvent(id);
    } else if (!showModal && option == 'confirm' && action == 'delete_all') {
      console.log('Delete all');
      setTableInput(table_data);
      DeleteAllMyEvents();
    }

    setShowConfirmModal(initial_confirm_modal_data);
  };

  let updatedFilterEvents;

  const sortedItems = useMemo(() => {
    return events
      ? [...events].sort((a, b) => {
        const first = new Date(a[sortDescriptor.column]);
        const second = new Date(b[sortDescriptor.column]);
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      })
      : events;
  }, [sortDescriptor, events]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerTable;
    const lastPageIndex = firstPageIndex + itemsPerTable;
    updatedFilterEvents = sortedItems?.filter(searchBarQuery);
    return updatedFilterEvents?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedItems, searchFilter]);

  console.log(currentPage, 'curPage');

  return (
    <>
      <div className='w-full overflow-x-auto rounded-2xl overflow-y-visible'>
        <table className='min-w-full'>
          <thead>
            <tr className='bg-gray-50 text-left'>
              {/* Condition for hiding the first column and displaying checkbox seperately if condition evaluates to false. */}
              {
                columnOptionsFlags.event_name_column ?
                  <th
                    className={`bg-gray-50 text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 rounded-tl-2xl max-w-[17rem] min-w-[12rem]`}
                  >
                    <div className='inline-flex items-center gap-3 '>
                      <label htmlFor='all_select_checkbox'>
                        <input
                          name='all_select_checkbox'
                          type='checkbox'
                          checked={
                            isChecked?.length == events?.length && events?.length
                          }
                          onChange={handleSelectAllChange}
                          className={`w-5 h-5 2xl:w-5 h-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${isChecked?.length !== events?.length &&
                            isChecked?.length &&
                            events?.length
                            ? styles['input-checkbox-minus']
                            : styles['input-checkbox']
                            }`}
                        />
                      </label>
                      <span
                        className={`text-xs-medium 2xl:text-sm-medium text-gray-600  ${columnOptionsFlags.event_name_column ? '' : 'hidden'
                          }`}
                      >
                        Event Name
                      </span>
                    </div>
                  </th>
                  :
                  <th
                    className={`bg-gray-50 text-sm-medium text-gray-600 pl-6 py-3 border-b border-gray-200 rounded-tl-2xl w-[25px]`}
                  >
                    <div className='inline-flex items-center'>
                      <label htmlFor='all_select_checkbox'>
                        <input
                          name='all_select_checkbox'
                          type='checkbox'
                          checked={
                            isChecked?.length == events?.length && events?.length
                          }
                          onChange={handleSelectAllChange}
                          className={`w-5 2xl:w-5 h-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${isChecked?.length !== events?.length &&
                            isChecked?.length &&
                            events?.length
                            ? styles['input-checkbox-minus']
                            : styles['input-checkbox']
                            }`}
                        />
                      </label>
                    </div>
                  </th>
              }

              <th
                className={`max-w-[17rem] min-w-[12rem] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'}  py-3 border-b border-gray-200 ${columnOptionsFlags.event_code_column ? '' : 'hidden'
                  }`}
              >
                Event code
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200 ${columnOptionsFlags.event_start_date_column ? '' : 'hidden'
                  }`}
              >
                <span className={`inline-flex items-center gap-1`}>
                  <span className='text-xs-medium 2xl:text-sm-medium text-gray-600'>
                    Start Date
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
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200 ${columnOptionsFlags.event_end_date_column ? '' : 'hidden'
                  }`}
              >
                End Date
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200 ${columnOptionsFlags.event_venue_column ? '' : 'hidden'
                  }`}
              >
                Venue
              </th>
              <th className=' bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200 rounded-tr-2xl flex justify-end ml-auto'>
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
                        pathname: '/headcount/departments',
                        query: { item: JSON.stringify(item) },
                      },
                      '/headcount/departments'
                    );
                  }
                }}
                key={index}
                className={`h-14 ${isChecked.includes(item.event_guid)
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
                        name={item?.event_name}
                        type='checkbox'
                        checked={isChecked.includes(item.event_guid)}
                        onChange={(e) =>
                          handleRowSelectChange(e, item.event_guid)
                        }
                        className={`w-5 h-5 2xl:w-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${styles['input-checkbox']}`}
                      />
                    </label>
                    <span
                      className={`${columnOptionsFlags.event_name_column ? '' : 'hidden'
                        }`}
                    >
                      {item.event_name}
                    </span>
                  </div>
                </td>
                <td
                  className={`text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200 ${columnOptionsFlags.event_code_column ? '' : 'hidden'
                    }`}
                >
                  {item.event_code}
                </td>
                <td
                  className={`text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200 ${columnOptionsFlags.event_start_date_column ? '' : 'hidden'
                    }`}
                >
                  {item.start_date}
                </td>
                <td
                  className={`text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200 ${columnOptionsFlags.event_end_date_column ? '' : 'hidden'
                    }`}
                >
                  {item.end_date}
                </td>
                <td
                  className={`text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.event_name_column? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200 ${columnOptionsFlags.event_venue_column ? '' : 'hidden'
                    }`}
                >
                  {item.venue_name}
                </td>
                <td
                  className='px-6 py-4 border-b border-gray-200 flex justify-end'
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreMenu
                    id={item?.event_guid}
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

      {events?.length > 0 && (
        <div className={`bg-white rounded-b-2xl`}>
          <Pagination
            currentPage={currentPage}
            totalCount={
              updatedFilterEvents ? updatedFilterEvents?.length : events.length
            }
            pageSize={itemsPerTable}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
      <ConfirmModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={handleConfirmModal}
      />
    </>
  );
}

export default EventsTable;
