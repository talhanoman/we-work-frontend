import React, { Fragment, useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import CheckboxMultiSelect from '../../checkbox-multiselect';
import { Tab } from '@headlessui/react';
import StackChart from './StackChart';
import {
  getEventCount,
  getDepartmentCount,
  getRoleCount,
  getFunctionCount,
} from '@/pages/api/get';

const column_options = [];

// Sample data
const data = [
  { name: 'A', x: 12, y: 23, z: 122 },
  { name: 'B', x: 22, y: 3, z: 73 },
  { name: 'C', x: 13, y: 15, z: 32 },
  { name: 'D', x: 44, y: 35, z: 23 },
  { name: 'E', x: 35, y: 45, z: 20 },
  { name: 'F', x: 62, y: 25, z: 29 },
  { name: 'G', x: 37, y: 17, z: 61 },
  { name: 'H', x: 28, y: 32, z: 45 },
  { name: 'I', x: 19, y: 43, z: 93 },
];

export default function MultibarChartCard({ title }) {
  const [selectWithBadge, setSelectWithBadge] = useState([]);
  const [eventCount, setEventCount] = useState([]);
  const [departmentCount, setDepartmentCount] = useState([]);
  const [roleCount, setroleCount] = useState([]);
  const [functionCount, setfunctionCount] = useState([]);
  const [eventColumnOptions, setEventColumnOptions] = useState([]);
  const [eventCheck, setEventCheck] = useState(false)

  useEffect(() => {
    getEventData(), getDepartmentData(), getFunctionData(), getRoleData();
  }, []);


  // This useEffect Handles the MultiSelect Checkbox rerendering
  useEffect(() => {
    if (eventCount?.length > 0 && eventCheck === false) {
      const obj = []
      eventCount.map((item) => {
        obj.push({ name: item.Name, isChecked: false })
      });     
      setEventColumnOptions(obj);
      setEventCheck(true)
    }
  }, [eventCount])

  const getEventData = async () => {
    let res = await getEventCount();
    let { valid, data } = res;
    if (valid) {
      let myData = []
      data?.map((obj) => {
        let newObj = obj
        newObj.IsChecked = false
        myData.push(newObj)
      })
      setEventCount(myData);
    }
  };

  const getDepartmentData = async () => {
    let res = await getDepartmentCount();
    let { valid, data } = res;
    if (valid) {
      setDepartmentCount(data);
    }
  };

  const getRoleData = async () => {
    let res = await getRoleCount();
    let { valid, data } = res;
    if (valid) {
      setroleCount(data);
    }
  };

  const getFunctionData = async () => {
    let res = await getFunctionCount();
    let { valid, data } = res;
    if (valid) {
      setfunctionCount(data);
    }
  };
  const handleSelectWithBadge = (option) => {
    setSelectWithBadge(option);
    
    const updatedEvent = eventCount.map((item) => {
      const match = option.find((newItem) => newItem.name === item.Name);
      if (match) 
      {
        return { ...item, IsChecked: true };
      }
      else
      {
        return { ...item, IsChecked: false };
      }
      return item;
    });

    setEventCount(updatedEvent);
  };
  return (
    <div className='w-full p-6 shadow-sm rounded-lg border border-[#E2E2E2] overflow-x-auto'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h6 className='font-semibold text-base text-[#231F20]'>{title}</h6>
        </div>
        {/* <FiMoreVertical role='button' className='w-5 h-5 text-[#B4B5B6]' /> */}
      </div>
      {/* Tabs */}
      <Tab.Group>
        <div className='flex justify-between mt-6'>
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? 'p-3 text-[#084CD0] text-sm bg-[#F1F6FD] rounded-md font-medium'
                      : 'p-3 text-[#979798] text-sm rounded-md'
                  }
                >
                  Event
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? 'p-3 text-[#084CD0] text-sm bg-[#F1F6FD] rounded-md font-medium'
                      : 'p-3 text-[#979798] text-sm rounded-md'
                  }
                >
                  Department
                </button>
              )}
            </Tab>

            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? 'p-3 text-[#084CD0] text-sm bg-[#F1F6FD] rounded-md font-medium'
                      : 'p-3 text-[#979798] text-sm rounded-md'
                  }
                >
                  Function
                </button>
              )}
            </Tab>

            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? 'p-3 text-[#084CD0] text-sm bg-[#F1F6FD] rounded-md font-medium'
                      : 'p-3 text-[#979798] text-sm rounded-md'
                  }
                >
                  Role
                </button>
              )}
            </Tab>
          </Tab.List>
          {/* Select */}
          <div className='w-[154px]'>
            <CheckboxMultiSelect
              options={eventColumnOptions}
              selectedOption={selectWithBadge}
              onSelect={handleSelectWithBadge}
              panelWidth={'w-[280px]'}
              label={'Events'}
            />
          </div>
        </div>
        <Tab.Panels className='p-3 mt-6'>
          <Tab.Panel>
            {/* Event */}
            <StackChart xAxisLabel={'Event'} data={eventCount} />
          </Tab.Panel>
          <Tab.Panel>
            {/* Department */}
            <StackChart xAxisLabel={'Department'} data={departmentCount} />
          </Tab.Panel>
          <Tab.Panel>
            {/* Function */}
            <StackChart xAxisLabel={'Function'} data={functionCount} />
          </Tab.Panel>
          <Tab.Panel>
            {/* Role */}
            <StackChart xAxisLabel={'Role'} data={roleCount} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
