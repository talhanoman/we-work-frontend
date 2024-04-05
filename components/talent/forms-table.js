import React, { useState, useEffect } from "react";
import { FiCopy, FiTrash2, FiLink, FiFolder, FiDownload, FiBarChart2 } from "react-icons/fi";
import MoreMenu from "../more-menu";
import Image from 'next/image'

const iconSize = "w-4 h-4";

const menu_options = [
    {
        title: "Open",
        icon: <FiFolder className={iconSize} />,
    },
    {
        title: "Copy Link",
        icon: <FiLink className={iconSize} />,
    },
    {
        title: "Duplicate",
        icon: <FiCopy className={iconSize} />,
    },
    {
        title: "Results",
        icon: <FiBarChart2 className={iconSize} />,
    },
    {
        title: "Export",
        icon: <FiDownload className={iconSize} />,
    },
    {
        title: "Delete",
        icon: <FiTrash2 className={iconSize} />,
    },
];

function VolunteersTable({ selectedOption, table_data }) {
    const [tableInput, setTableInput] = useState(table_data);

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

    useEffect(() => {
    },)

    const handleMenu = (menu, item) => {
        console.log('Menu', menu)
        console.log('Item', item)
        if (menu.option.toLowerCase() === "duplicate") {
            const duplicateRow = tableInput.find((item) => item.event_guid === menu.id);
            setTableInput([
                ...tableInput,
                { ...duplicateRow, id: new Date().getTime().toString() },
            ]);
            duplicateMyEvent(item)
        } else if (menu.option.toLowerCase() === "edit") {
            const editRow = tableInput.find((item) => item.id === menu.id)
            setSelectedRow(item)
            showEditModal({ showModal: true, editRowData: editRow })
            console.log("Edit")
        } else if (menu.option.toLowerCase() === "delete" && menu.id !== "all") {
            const updatedTable = tableInput.filter((item) => item.id !== menu.id);
            setTableInput(updatedTable);
            console.log('delete')
            deleteMyEvent(menu.id)
        } else if (menu.option.toLowerCase() === "duplicate all") {
            let duplicateTable = tableInput.map((item, index) => ({
                ...item,
                id: tableInput.length + (index + 1),
            }));
            setTableInput([...tableInput, ...duplicateTable]);
        } else if (menu.option.toLowerCase() === "delete" && menu.id == "all") {
            setTableInput(table_data);
        }
    };

    return (
        <div className="w-full overflow-x-auto min-h-[340px] rounded-2xl">
            <div className="w-full flex flex-wrap">
                {/* Card */}
                {table_data?.map((item, index) => (
                    <div className="w-full md:w-1/3 flex p-3" key={index}>
                        <div className={`flex flex-col h-full w-full gap-4 p-6 pb-8 rounded-lg border hover:border-primary-600 dark:hover:border-primary-300 bg-white shadow-xl`}>
                            {/* Card Header */}
                            <div className="flex justify-between flex-grow">
                                <div className="flex">
                                    <span><Image
                                        className="rounded-md"
                                        src={"/images/TM_form-icon.png"}
                                        width={56}
                                        height={56}
                                    /></span>
                                    <span className="px-2">
                                        <div className="text-lg font-semibold text-gray-900">
                                            {item.heading}
                                        </div>
                                        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                            {item.description}
                                        </div>
                                    </span>
                                </div>

                                <div onClick={(e) => e.stopPropagation()} >
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
                                </div>
                            </div>
                            {/* Card Content */}
                            <div className="w-full">
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-wrap gap-2 lg:flex-row">
                                        <span className="rounded-lg bg-orange-100 p-4 flex-1 min-w-[88px] truncate">
                                            <span className="flex gap-1 item-center text-orange-900 text-xl font-medium">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.833 1.66699H4.99967C4.55765 1.66699 4.13372 1.84259 3.82116 2.15515C3.5086 2.46771 3.33301 2.89163 3.33301 3.33366V16.667C3.33301 17.109 3.5086 17.5329 3.82116 17.8455C4.13372 18.1581 4.55765 18.3337 4.99967 18.3337H14.9997C15.4417 18.3337 15.8656 18.1581 16.1782 17.8455C16.4907 17.5329 16.6663 17.109 16.6663 16.667V7.50033M10.833 1.66699L16.6663 7.50033M10.833 1.66699V7.50033H16.6663" stroke="#7E2410" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                                {item.pages}
                                            </span>
                                            <span className="text-orange-900 font-normal text-xs truncate" title="Pages">
                                                Pages
                                            </span>
                                        </span>
                                        <span className="rounded-lg bg-orange-100 p-4 flex-1 min-w-[88px] truncate">
                                            <span className="flex gap-1 item-center text-orange-900 text-xl font-medium">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.833 1.66699H4.99967C4.55765 1.66699 4.13372 1.84259 3.82116 2.15515C3.5086 2.46771 3.33301 2.89163 3.33301 3.33366V16.667C3.33301 17.109 3.5086 17.5329 3.82116 17.8455C4.13372 18.1581 4.55765 18.3337 4.99967 18.3337H14.9997C15.4417 18.3337 15.8656 18.1581 16.1782 17.8455C16.4907 17.5329 16.6663 17.109 16.6663 16.667V7.50033M10.833 1.66699L16.6663 7.50033M10.833 1.66699V7.50033H16.6663" stroke="#7E2410" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                                {item.participants}
                                            </span>
                                            <span className="text-orange-900 font-normal text-xs" title="Participants">
                                                Participants
                                            </span>
                                        </span>
                                        <span className="flex-1 p-4 min-w-[88px] hidden xl:block"></span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 lg:flex-row">
                                        <span className="rounded-lg bg-orange-100 p-4 flex-1 min-w-[88px] truncate">
                                            <span className="flex gap-1 item-center text-orange-900 text-xl font-medium">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.833 1.66699H4.99967C4.55765 1.66699 4.13372 1.84259 3.82116 2.15515C3.5086 2.46771 3.33301 2.89163 3.33301 3.33366V16.667C3.33301 17.109 3.5086 17.5329 3.82116 17.8455C4.13372 18.1581 4.55765 18.3337 4.99967 18.3337H14.9997C15.4417 18.3337 15.8656 18.1581 16.1782 17.8455C16.4907 17.5329 16.6663 17.109 16.6663 16.667V7.50033M10.833 1.66699L16.6663 7.50033M10.833 1.66699V7.50033H16.6663" stroke="#7E2410" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                                {item.started}
                                            </span>
                                            <span className="text-orange-900 font-normal text-xs" title="Started">
                                                Started
                                            </span>
                                        </span>
                                        <span className="rounded-lg bg-orange-100 p-4 flex-1 min-w-[88px] truncate">
                                            <span className="flex gap-1 item-center text-orange-900 text-xl font-medium">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.833 1.66699H4.99967C4.55765 1.66699 4.13372 1.84259 3.82116 2.15515C3.5086 2.46771 3.33301 2.89163 3.33301 3.33366V16.667C3.33301 17.109 3.5086 17.5329 3.82116 17.8455C4.13372 18.1581 4.55765 18.3337 4.99967 18.3337H14.9997C15.4417 18.3337 15.8656 18.1581 16.1782 17.8455C16.4907 17.5329 16.6663 17.109 16.6663 16.667V7.50033M10.833 1.66699L16.6663 7.50033M10.833 1.66699V7.50033H16.6663" stroke="#7E2410" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                                {item.completed}
                                            </span>
                                            <span className="text-orange-900 font-normal text-xs" title="Completed">
                                                Completed
                                            </span>
                                        </span>
                                        <span className="rounded-lg bg-orange-100 p-4 flex-1 min-w-[88px] truncate">
                                            <span className="flex gap-1 item-center text-orange-900 text-xl font-medium">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.833 1.66699H4.99967C4.55765 1.66699 4.13372 1.84259 3.82116 2.15515C3.5086 2.46771 3.33301 2.89163 3.33301 3.33366V16.667C3.33301 17.109 3.5086 17.5329 3.82116 17.8455C4.13372 18.1581 4.55765 18.3337 4.99967 18.3337H14.9997C15.4417 18.3337 15.8656 18.1581 16.1782 17.8455C16.4907 17.5329 16.6663 17.109 16.6663 16.667V7.50033M10.833 1.66699L16.6663 7.50033M10.833 1.66699V7.50033H16.6663" stroke="#7E2410" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                                {item.dropOff}
                                            </span>
                                            <span className="text-orange-900 font-normal text-xs" title="Drop-off">
                                                Drop-off
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="flex justify-between">
                                <span className="flex">
                                    <svg className="mx-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3333 1.66699V5.00033M6.66667 1.66699V5.00033M2.5 8.33366H17.5M4.16667 3.33366H15.8333C16.7538 3.33366 17.5 4.07985 17.5 5.00033V16.667C17.5 17.5875 16.7538 18.3337 15.8333 18.3337H4.16667C3.24619 18.3337 2.5 17.5875 2.5 16.667V5.00033C2.5 4.07985 3.24619 3.33366 4.16667 3.33366Z" stroke="#7A797A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="leading-5 text-gray-600 text-sm font-medium">{item.dateStart}-{item.dateEnd}</span>
                                </span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#403D3E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >

    );
}

export default VolunteersTable;
