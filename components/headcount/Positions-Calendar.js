import React, { useState, useEffect } from "react";
import CalendarRow from "../calendar-row.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {findFirstMonday, findFirstSundayOfNextMonth, findLastMondayOfPreviousMonth, findLastSunday, getLastMondayOfPreviousMonth, getWeeksBetween, DaysInBetween} from "./extras.js";
import "react-big-calendar/lib/css/react-big-calendar.css"
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

// const startDate = new Date("2023-07-02")
// const endDate = new Date("2023-07-27")
export default function PositionsCalendar({startDate, endDate, numberOfShifts, peakShift, peakDay, formData, setFormData, showTable, setShowTable}) {
	const [months, setMonths] = useState(1)
	const [dateRangeStart, setDateRangeStart] = useState(new Date())
	const [dateRangeEnd, setDateRangeEnd] = useState(new Date())
	const [week, setWeek] = useState([])
    const [inputValue, setInputValue] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);

    const [calendarFlag, setCalendarFlag] = useState(false)
    
    const [peakDayTotal, setPeakDayTotal] = useState(0)
    const [peakShiftTotal, setPeakShiftTotal] = useState(0)

    const weekDays = [
        { day: 'M'},
        { day: 'T'},
        { day: 'W'},
        { day: 'T'},
        { day: 'F'},
        { day: 'S'},
        { day: 'S'},
      ];

    // let totalShifts = 3

    const findNextDate = (date, increment) => {
        const currentDate = new Date(date);

        const nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + increment);

        const dateString = nextDay.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
        
        let dateInteger = parseInt(dateString.split(',')[0].split(' ')[1])

        return dateInteger
    }

    const IntializeCalendar = () => {
        if (endDate != null && startDate !=null){ 
            setCalendarFlag(true)
            setWeek([])
            let newDateRangeStart = findFirstMonday(startDate);
            
            if (startDate < newDateRangeStart) {
                console.log("going Prev Month")
                newDateRangeStart = findLastMondayOfPreviousMonth(startDate);
            }
            
            let newDateRangeEnd = findLastSunday(endDate);
            
            if (endDate > newDateRangeEnd) {
                console.log("Going next Month")
                let newEndDate = new Date(endDate);
                newDateRangeEnd = findFirstSundayOfNextMonth(newEndDate);
            }
            
            setDateRangeStart(newDateRangeStart);
            setDateRangeEnd(newDateRangeEnd);
            
			// setMonths(dateRangeEnd.getMonth() - dateRangeStart.getMonth()+1)
			// setWeek(getWeeksBetween(dateRangeStart, dateRangeEnd))
			console.log("MONTH", months)
            // Push states to capture values between date ranges
            const convert_start_date = startDate?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
            });
            
            const convert_end_date = endDate?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
            });
            
            let date_of_start_date = parseInt(convert_start_date?.split(',')[0].split(' ')[1])
            let date_of_end_date = parseInt(convert_end_date?.split(',')[0].split(' ')[1])
            
            console.log("New Dates: ", {date_of_start_date, date_of_end_date})

            let allDaysinAMonth = 31

            let newArray = []
            for (let i = 0; i < numberOfShifts; i++) 
            {
                newArray.push({
                    row_index: i + 1,
                    value: []
                })

                for (let j = 1; j <= allDaysinAMonth; j++)
                {
                    newArray[i].value.push({
                        column_index: j,
                        value: null
                    })
                }            
            }
            console.clear()
            console.log("The Week is: ", week)
            console.log("THe Show Table is: ", showTable)
            console.log("THe Show Calendar is: ", showCalendar)
            console.log("THe Start Date is: ", startDate)
            console.log("THe End Date is: ", endDate)
            console.log("THe Start Date Range is: ", dateRangeStart)
            console.log("THe End Date Range is: ", dateRangeEnd)
            console.log("THe Array is: ", newArray)

            setInputValue(newArray)
            setShowCalendar(true)
		}
		else{
			setShowTable(false)
		}

    }

    /**
     * Running this so that weeks get set when and only date range end has been selected
     */
    useEffect(() => {
        if (calendarFlag)
        {
            setMonths(dateRangeEnd.getMonth() - dateRangeStart.getMonth()+1)
            setWeek(getWeeksBetween(dateRangeStart, dateRangeEnd))
        }
    }, [dateRangeEnd])
	

	useEffect(()=>{
		IntializeCalendar()
	}, [showTable, showCalendar])

	
    return showTable && showCalendar &&(
		<>
        <div>
            <div className="flex flex-1 h-full overflow-x-auto">
                <div className="flex flex-col border border-gray-300 rounded-lg">
                    {/* Row 1 */}
                    <div className="flex justify-between h-1/6">
                        <div className="text-center px-6 py-2 min-w-[95px] border-r">Shifts</div>
                        {
                            week?.map((item, index)=>{

                                    console.log("My itemsss: ", item)
        
                                    const currentDate = item.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                    });

                                    const nextDate = (index + 1) != week?.length ? week[index + 1].toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                    }) : ""
                                    
                                    if ((index + 1) != week?.length)
                                    {    
                                        return <div className="flex-1 text-center px-6 pb-2 min-w-[95px] border-r border-b">{currentDate + " - " + nextDate}</div>
                                    }
                            })
                        }
                    </div>
                    {/* Row 2 */}
                    <div className="flex h-2/6">
                        <div className="text-center px-6 py-2 border-y border-r min-w-[95px]"></div>
                        {
                            week?.map((item, index)=>{
                                
                                if ((index + 1) != week?.length)
                                {
                                    return (    <div className="flex-1 text-center min-w-[95px] py-2 border flex">
                                        {
                                            weekDays?.map((obj, i) => (
                                                    <div className="flex flex-col justify-between p-2 flex-1">
                                                        <p>{obj.day}</p>
                                                        <p>{findNextDate(item, i)}</p>
                                                    </div>
                                            ))
                                        }
                                                </div>
                                            );
                                }
                            })
                            
                        }
                    </div>
                    {/* Shift Rows */}
                    {
                        Array.from({ length: numberOfShifts }, (_, index) => (
                            <CalendarRow shift_name = {index + 1} intervals = {week} no_of_days = {weekDays} startDate = {new Date(startDate)} endDate = {new Date(endDate)} inputValue = {inputValue} setInputValue = {setInputValue} numberOfShifts={numberOfShifts} peakShift={peakShift} peakDay={peakDay} formData={formData} setFormData={setFormData} peakDayTotal={peakDayTotal} setPeakDayTotal={setPeakDayTotal} peakShiftTotal={peakShiftTotal} setPeakShiftTotal={setPeakShiftTotal}/>
                        ))
                    }
                    {/* Total Row */}
                    <CalendarRow shift_name = {"Total"} intervals = {week} no_of_days = {weekDays} startDate = {new Date(startDate)} endDate = {new Date(endDate)} inputValue = {inputValue} setInputValue = {setInputValue} numberOfShifts={numberOfShifts} peakShift={peakShift} peakDay={peakDay} formData={formData} setFormData={setFormData} peakDayTotal={peakDayTotal} setPeakDayTotal={setPeakDayTotal} peakShiftTotal={peakShiftTotal} setPeakShiftTotal={setPeakShiftTotal}/>
                </div>
            </div>
        </div>
        </>)

}


