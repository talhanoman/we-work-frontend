import React, { useEffect, useState } from "react";
import { TbSubtask } from "react-icons/tb";
import SelectWithIcon from "@/components/select-with-icon";

const YesNoField = ({
  question,
  updated_datatype_options,
  HandleSelectFieldDatatypeNested,
  HandleYesNoFields,
  nestedQuestions,
}) => {
 // console.log("In Yes No Component: ", question);
 // console.log("nestedQuestions in yes/no: ", nestedQuestions);

  const FindQuestionType = (isquestionType, isYes) => {
    for (let i = 0; i < nestedQuestions.length; i++) {
      if (
        nestedQuestions[i].parentId === question.id &&
        nestedQuestions[i].type === "typeYesFields" &&
        isYes
      ) {
        if (isquestionType) {
          return nestedQuestions[i].questionType;
        } else {
          return nestedQuestions[i].type;
        }
      }
      if (
        nestedQuestions[i].parentId === question.id &&
        nestedQuestions[i].type === "typeNoFields" &&
        !isYes
      ) {
        if (isquestionType) {
          return nestedQuestions[i].questionType;
        } else {
          return nestedQuestions[i].type;
        }
      }
    }
  };
  //Here n can be 0 or 1. 0 will return the name of datatype and 1 will return the whole question
  const FindYesNoFieldsQuestions = (n , isYes) => {
    for (let i = 0; i < nestedQuestions.length; i++) {
      if (
        nestedQuestions[i].parentId === question.id && nestedQuestions[i].type =="typeYesFields"  && isYes
      ) {
        if (n == 1) {
      //    console.log("sendYesQuestion: ", nestedQuestions[i]);
          return nestedQuestions[i];
        } else if (n == 0) {
          return nestedQuestions[i].questionType.name;
        }
      }
      if (
        nestedQuestions[i].parentId === question.id && nestedQuestions[i].type =="typeNoFields"  &&!isYes
      ) {
        if (n == 1) {
       //   console.log("sendNoQuestion: ", nestedQuestions[i]);
          return nestedQuestions[i];
        } else if (n == 0) {
          return nestedQuestions[i].questionType.name;
        }
      }
    }
  };
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
            <h6 className="text-sm-medium text-gray-700">If choice is</h6>
            <div className="w-[61px] h-6 flex justify-center items-center bg-primary-100 px-[9px] py-[2px] rounded-md border border-primary-700">
              <span className="text-sm-medium text-primary-700">Yes</span>
            </div>
          </div>
          <div className="w-full max-w-[260px]">
              <SelectWithIcon
                options={updated_datatype_options}
                selectedOption={FindQuestionType(true , true)}
                onSelect={(value) =>
                  HandleSelectFieldDatatypeNested(
                    question,
                    "fieldTypeYes",
                    value,
                    true
                  )
                }
                placeholder={"Choose an option"}
              />
          
          </div>
        </div>
        { FindQuestionType(false , true) == "typeYesFields" && HandleYesNoFields(
          FindYesNoFieldsQuestions(0 , true),
          FindYesNoFieldsQuestions(1 , true),
          "typeYesFields",
          false
        )}
        
        <div className="flex justify-between items-center gap-x-2">
          <div className="flex items-center gap-x-2">
            <button className="w-9 h-9 flex justify-center items-center bg-primary-50 p-2 rounded-lg border border-primary-700">
              <TbSubtask className="w-5 h-5 text-primary-700" />
            </button>
            <h6 className="text-sm-medium text-gray-700">If choice is</h6>
            <div className="w-[61px] h-6 flex justify-center items-center bg-primary-100 px-[9px] py-[2px] rounded-md border border-primary-700">
              <span className="text-sm-medium text-primary-700">No</span>
            </div>
          </div>
          <div className="w-full max-w-[260px]">
            <SelectWithIcon
              options={updated_datatype_options}
              selectedOption={FindQuestionType(true , false)}
              onSelect={(value) =>
                HandleSelectFieldDatatypeNested(
                  question,
                  "fieldTypeNo",
                  value,
                  false
                )
              }
              placeholder={"Choose an option"}
              
            />
          </div>
        </div>
       {FindQuestionType(false , false) == "typeNoFields" && HandleYesNoFields(
          FindYesNoFieldsQuestions(0 , false),//get the datatype of question
          FindYesNoFieldsQuestions(1 , false),// get the question
          "typeNoFields",
          false
        )}
      </div>
    </div>
  );
};

export default YesNoField;
