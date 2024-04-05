import React, { useEffect, useState } from "react";
import { TbSubtask } from "react-icons/tb";
import SelectWithIcon from "@/components/select-with-icon";

const YesNoParentField = ({
  question,
  updated_datatype_options,
  HandleSelectFieldDatatype,
  HandleYesNoFields,
}) => {

  return (
    <div className="w-full space-y-6">
    <div className="flex gap-x-6">
      <button
        type="button"
        className="flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs"
      >
        Yes
      </button>
      <button
        type="button"
        className="flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs"
      >
        No
      </button>
    </div>
    <div className="w-full h-px bg-gray-200" />
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <button className="w-9 h-9 flex justify-center items-center bg-primary-50 p-2 rounded-lg border border-primary-700">
            <TbSubtask className="w-5 h-5 text-primary-700" />
          </button>
          <h6 className="text-sm-medium text-gray-700">
            If choice is
          </h6>
          <div className="w-[61px] h-6 flex justify-center items-center bg-primary-100 px-[9px] py-[2px] rounded-md border border-primary-700">
            <span className="text-sm-medium text-primary-700">
              Yes
            </span>
          </div>
        </div>
        <div className="w-full max-w-[260px]">
          <SelectWithIcon
            options={updated_datatype_options}
            selectedOption={
              question.fields[0]?.fieldTypeYes
            }
            onSelect={(value) =>
              HandleSelectFieldDatatype(
                question.id,
                "fieldTypeYes",
                value,
                true
              )
            }
            placeholder={"Choose an option"}
          />
        </div>
      </div>
      {HandleYesNoFields(
        question.fields[0]?.fieldTypeYes.name,
        question,
        "typeYesFields",
        true
      )}
      <div className="flex justify-between items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <button className="w-9 h-9 flex justify-center items-center bg-primary-50 p-2 rounded-lg border border-primary-700">
            <TbSubtask className="w-5 h-5 text-primary-700" />
          </button>
          <h6 className="text-sm-medium text-gray-700">
            If choice is
          </h6>
          <div className="w-[61px] h-6 flex justify-center items-center bg-primary-100 px-[9px] py-[2px] rounded-md border border-primary-700">
            <span className="text-sm-medium text-primary-700">
              No
            </span>
          </div>
        </div>
        <div className="w-full max-w-[260px]">
          <SelectWithIcon
            options={updated_datatype_options}
            selectedOption={
              question.fields[0]?.fieldTypeNo
            }
            onSelect={(value) =>
              HandleSelectFieldDatatype(
                question.id,
                "fieldTypeNo",
                value,
                false
              )
            }
            placeholder={"Choose an option"}
          />
        </div>
      </div>
      {HandleYesNoFields(
        question.fields[0]?.fieldTypeNo.name,
        question,
        "typeNoFields",
        true
      )}
    </div>
  </div>
  );
};

export default YesNoParentField;
