// MultipleChoiceGrid.js
import React from 'react';
import { capitalizeFirstLetter } from '../../../../utils/utils';
import MultipleChoiceGridModal from '../../multiple-choice-grid-modal';
import { FiX, FiImage, FiPlus } from 'react-icons/fi'; 
const MultipleChoiceGrid = ({question,showGridModal,HandleGridModal,HandleAddChoiceGridOption,HandleDeleteActivity,}) => {
  return (
    <div
      className='w-full grid place-items-center gap-x-3 gap-y-4'
      style={{
        gridTemplateColumns: `repeat(${question.fields[0]?.columnNumber}, minmax(0, 1fr))`,
      }}
    >
      {question.fields[0]?.activities?.map((activity) => (
        <form action='' key={activity.id} className='w-full'>
          {activity && (
            <div
              className={`w-full flex flex-col justify-center items-center gap-y-2 border border-gray-300 bg-white rounded-lg px-[18px] py-2.5 shadow-xs`}
            >
              {activity?.image && (
                <img
                  src={URL.createObjectURL(activity?.image)}
                  alt={activity.image?.name}
                  className='w-8 h-8 rounded-full bg-gray-100'
                />
              )}
              <span className='inline-flex gap-x-2 items-center'>
                <span
                  className={`text-gray-700 underline text-center ${activity?.image
                    ? 'text-xs-semibold 2xl:text-sm-semibold'
                    : 'text-sm-semibold 2xl:text-md-semibold'
                    }`}
                >
                  {capitalizeFirstLetter(activity.option)}
                </span>
                <button
                  onClick={() => HandleDeleteActivity(question.id, activity.id)}
                >
                  <FiX className='w-4 2xl:w-5 h-auto text-gray-500' />
                </button>
              </span>
            </div>
          )}
        </form>
      ))}
      <MultipleChoiceGridModal
        showGridModal={showGridModal}
        setShowGridModal={HandleGridModal}
        HandleAddOption={(value) => HandleAddChoiceGridOption(question.id, value)}
      />
      <button
        className='w-full flex flex-col justify-center items-center gap-y-2 border border-gray-300 bg-white rounded-lg px-[18px] py-2.5 outline-none shadow-xs'
        onClick={(e) => {
          e.preventDefault();
          HandleGridModal(true);
        }}
      >
        <FiImage className='w-4 2xl:w-5 h-auto text-gray-500' />
        <span className='inline-flex gap-x-2 items-center'>
          <span className='text-sm-semibold 2xl:text-md-semibold text-gray-500 text-center'>
            Add option
          </span>
          <FiPlus className='w-4 2xl:w-5 h-auto text-gray-500' />
        </span>
      </button>
    </div>
  );
};

export default MultipleChoiceGrid;
