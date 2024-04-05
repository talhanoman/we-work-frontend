import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Tab } from "@headlessui/react";
import { usePagination, DOTS } from "./usePagination";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pagination({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) {
    
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

    console.log( paginationRange)
    
  // if (paginationRange?.length > 1 && currentPage > paginationRange?.length) {
  //   onPageChange(currentPage - 1);
  // }

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 2) {
    onPageChange(1);
    return null;
  }

  const onNext = (e) => {
    e.preventDefault();
    onPageChange(currentPage + 1);
  };

  const onPrevious = (e) => {
    e.preventDefault();
    onPageChange(currentPage - 1)
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-50 px-4 sm:px-6 py-4 rounded-b-2xl">
      {/* Left navigation arrow */}
      <button
        className="inline-flex justify-center items-center gap-x-2 text-xs-medium 2xl:text-sm-medium text-gray-700 px-3.5 py-2 rounded-lg bg-white border border-gray-300 cursor-pointer shadow-xs disabled:pointer-events-none disabled:opacity-50"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <FiArrowLeft className="w-4 2xl:w-5 h-auto text-gray-700" />
        <span>
          Previous
        </span>
      </button>

      <ul className="hidden sm:flex gap-x-[2px]">
        {paginationRange?.map((pageNumber, index) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li
                key={index + "a"}
                className="text-sm-medium text-gray-500 p-3 rounded-lg w-10 h-10 outline-none"
              >
                &#8230;
              </li>
            );
          }

          // Render our Page
          return (
            <Tab.Group key={pageNumber}>
              <Tab.List className="flex gap-x-[2px]">
                <Tab defaultValue={1}
                  className={({ selected }) =>
                    classNames(
                      "text-xs-medium 2xl:text-sm-medium p-3 outline-none rounded-lg w-10 h-10",
                      pageNumber === currentPage
                        ? "bg-primary-50 text-primary-600 z-10"
                        : "text-gray-500 hover:text-gray-600",
                      "flex justify-center items-center whitespace-nowrap transition-colors duration-200 ease-out"
                    )
                  }
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </Tab>
              </Tab.List>
            </Tab.Group>
          );
        })}
      </ul>
      {/*  Right Navigation arrow */}
      <button
        className="inline-flex justify-center items-center gap-x-2 text-xs-medium 2xl:text-sm-medium text-gray-700 px-3.5 py-2 rounded-lg bg-white border border-gray-300 cursor-pointer shadow-xs disabled:pointer-events-none disabled:opacity-50"
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <span>
          Next
        </span>
        <FiArrowRight className="w-4 2xl:w-5 h-auto text-gray-700" />
      </button>
    </div>
  );  
}
