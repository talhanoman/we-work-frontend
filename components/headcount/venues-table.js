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
import { DeleteAllVenues, deleteVenue } from '@/pages/api/delete';
import ConfirmModal from '../confirm-modal';
import Pagination from '../pagination/Pagination';

const table_data = [
  {
    id: 1,
    venueName: 'Central Park Amphitheater',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    venueId: 'EVT9A7G',
    venueAddress: '2468 Park Avenue, Central City, IL 60007',
  },
  {
    id: 2,
    venueName: 'Grand Plaza Hotel',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    venueId: 'EVT2C4H',
    venueAddress: '2468 Park Avenue, Central City, IL 60007',
  },
  {
    id: 3,
    venueName: 'Civic Center Exhibition Hall',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    venueId: 'EVT9A7G',
    venueAddress: '2468 Park Avenue, Central City, IL 60007',
  },
  {
    id: 4,
    venueName: 'Sunset Beach Resort',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    venueId: 'EVT9A7G',
    venueAddress: '2468 Park Avenue, Central City, IL 60007',
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
  venue_name_column: false,
  venue_code_column: false,
  venue_description_column: false,
  venue_address_column: false,
};

const initial_confirm_modal_data = {
  showModal: false,
  option: 'cancel',
  id: '',
  action: '',
};

const itemsPerTable = 4;

function VenuesTable({
  showEditModal,
  venues,
  getMyVenues,
  setSelectedRow,
  isChecked,
  setIsChecked,
  searchFilter,
  selectedOption,
  selectedFilters,
}) {
  const [tableInput, setTableInput] = useState(table_data);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'venue_name',
    direction: 'ascending',
  });
  const [currentPage, setCurrentPage] = useState(1);
  var [message, setMessage]  = useState("")
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(
    initial_confirm_modal_data
  );

  const changeIcon =
    selectedRows.length != 0 && selectedRows.length < venues.length;
  const areAllRowsSelected =
    selectedRows.length === venues.length && !changeIcon;

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
      if (obj.name === 'Venue Name') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          venue_name_column: true,
        }));
      } else if (obj.name === 'Venue description') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          venue_description_column: true,
        }));
      } else if (obj.name === 'Venue code') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          venue_code_column: true,
        }));
      } else if (obj.name === 'Address') {
        setColumnOptionsFlags((prevState) => ({
          ...prevState,
          venue_address_column: true,
        }));
      }
    });
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows(tableInput.map((item) => item.id));
      const allIds = venues?.map((item) => item.VenueGUID);
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
        data?.venueName?.toLowerCase() === name.toLowerCase()
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
      setMessage("Do you want to delete all Venues?")
      setShowConfirmModal({
        ...showConfirmModal,
        showModal: true,
        action: 'delete_all',
      });
    }
  };

  const deleteMyVenue = async (venueGuid) => {
    let res = await deleteVenue(venueGuid);
    if (res.valid) {
      getMyVenues();
    }
  };

  const DeleteMyAllVenues = async () => {
    let response = await DeleteAllVenues();
    if (response?.valid) {
      getMyVenues();
    }
  };

  const searchBarQuery = (item) => {
    if (
      item.venue_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.venue_code.toLowerCase().includes(searchFilter.toLowerCase())
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
        selectedFilters?.name?.some(
          (obj) =>
            String(obj.name)?.toLowerCase() ===
            String(item.venue_name)?.toLowerCase()
        )
      ) {
        return true;
      }

      if (
        selectedFilters?.code?.some(
          (obj) =>
            String(obj.name)?.toLowerCase() ===
            String(item.venue_code)?.toLowerCase()
        )
      ) {
        return true;
      }

      if (
        selectedFilters?.description?.some(
          (obj) =>
            String(obj.name)?.toLowerCase() ===
            String(item.venue_description)?.toLowerCase()
        )
      ) {
        return true;
      }

      if (
        selectedFilters?.address?.some(
          (obj) =>
            String(obj.name)?.toLowerCase() ===
            String(item.venue_address)?.toLowerCase()
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
      deleteMyVenue(id);
      console.log('delete');
    } else if (!showModal && option == 'confirm' && action == 'delete_all') {
      console.log('Delete all');
      DeleteMyAllVenues();
    }

    setShowConfirmModal(initial_confirm_modal_data);
  };

  let updatedFilterVenues;

  const sortedItems = useMemo(() => {
    return venues
      ? [...venues].sort((a, b) => {
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
      : venues;
  }, [sortDescriptor, venues]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerTable;
    const lastPageIndex = firstPageIndex + itemsPerTable;
    updatedFilterVenues = sortedItems
      ?.filter(searchBarQuery)
      ?.filter(handleFiltersQuery);
    return updatedFilterVenues?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedItems, searchFilter, selectedFilters]);

  return (
    <>
      <div className='w-full overflow-x-auto rounded-2xl overflow-visible'>
        <table className='min-w-full'>
          <thead>
            <tr className='bg-gray-50 text-left'>
              {
                columnOptionsFlags.venue_name_column ?
                  <th className='max-w-[17rem] min-w-[12rem] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 px-6 py-3 border-b border-gray-200'>
                    <div className='inline-flex items-center gap-3 '>
                      <label htmlFor='all_select_checkbox'>
                        <input
                          name='all_select_checkbox'
                          type='checkbox'
                          checked={
                            isChecked?.length == venues?.length && venues.length
                          }
                          onChange={handleSelectAllChange}
                          className={`w-5 h-5 2xl:w-5 h-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${isChecked?.length !== venues?.length &&
                            isChecked?.length &&
                            venues.length
                            ? styles['input-checkbox-minus']
                            : styles['input-checkbox']
                            }`}
                        />
                      </label>
                      <span
                        className={`${columnOptionsFlags.venue_name_column ? '' : 'hidden'
                          } inline-flex items-center gap-1`}
                      >
                        <span>Venue Name</span>
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
                  <th className='w-[25px] bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 pl-6 py-3 border-b border-gray-200'>
                    <div className='inline-flex items-center gap-3 '>
                      <label htmlFor='all_select_checkbox'>
                        <input
                          name='all_select_checkbox'
                          type='checkbox'
                          checked={
                            isChecked?.length == venues?.length && venues.length
                          }
                          onChange={handleSelectAllChange}
                          className={`w-5 h-5 2xl:w-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${isChecked?.length !== venues?.length &&
                              isChecked?.length &&
                              venues.length
                              ? styles['input-checkbox-minus']
                              : styles['input-checkbox']
                            }`}
                        />
                      </label>
                    </div>
                  </th>
              }

              <th
                className={`max-w-[17rem] min-w-[12rem] ${columnOptionsFlags.venue_description_column ? '' : 'hidden'
                  } bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.venue_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200`}
              >
                Venue description
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] ${columnOptionsFlags.venue_code_column ? '' : 'hidden'
                  } bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.venue_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200`}
              >
                Venue code
              </th>
              <th
                className={`max-w-[17rem] min-w-[12rem] ${columnOptionsFlags.venue_address_column ? '' : 'hidden'
                  } bg-gray-50 text-xs-medium 2xl:text-sm-medium text-gray-600 ${columnOptionsFlags.venue_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-3 border-b border-gray-200`}
              >
                Address
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
                key={index}
                className={`h-14 ${isChecked.includes(item.VenueGUID)
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
                        name={item?.venue_code}
                        type='checkbox'
                        checked={isChecked.includes(item.VenueGUID)}
                        onChange={(e) =>
                          handleRowSelectChange(e, item.VenueGUID)
                        }
                        className={`w-5 h-5 2xl:w-5 h-5 bg-white border border-gray-300 checked:text-primary-50 rounded-md checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none ${styles['input-checkbox']}`}
                      />
                    </label>
                    <span
                      className={`${columnOptionsFlags.venue_name_column ? '' : 'hidden'
                        }`}
                    >
                      {item.venue_name}
                    </span>
                  </div>
                </td>
                <td
                  className={`${columnOptionsFlags.venue_description_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.venue_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200`}
                >
                  {item.venue_description}
                </td>
                <td
                  className={`${columnOptionsFlags.venue_code_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.venue_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200`}
                >
                  {item.venue_code}
                </td>
                <td
                  className={`${columnOptionsFlags.venue_address_column ? '' : 'hidden'
                    } text-xs-regular 2xl:text-sm-regular text-gray-900 ${columnOptionsFlags.venue_name_column ? 'px-6' : 'pr-6 -left-3 relative'} py-4 border-b border-gray-200`}
                >
                  {item.venue_address}
                </td>
                <td className='px-6 py-4 border-b border-gray-200 ml-auto flex justify-end'>
                  <MoreMenu
                    id={item.VenueGUID}
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
      {venues?.length > 0 && (
        <div className={`bg-white rounded-b-2xl`}>
          <Pagination
            currentPage={currentPage}
            totalCount={
              updatedFilterVenues &&
                (searchFilter.length > 0 || updatedFilterVenues?.length > 0)
                ? updatedFilterVenues?.length
                : venues?.length
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

export default VenuesTable;
