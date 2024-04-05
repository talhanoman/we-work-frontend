import React, {useState} from 'react';

const CalendarRow = ({shift_name, intervals, no_of_days, startDate, endDate, inputValue, setInputValue, numberOfShifts, peakShift, peakDay, formData, setFormData, peakDayTotal, setPeakDayTotal, peakShiftTotal, setPeakShiftTotal}) => {

    /**
     * It is used to compare the column wise total so that wecan figure out peak day
     * @param {number} newTotal 
     */

    const CalculatePeakDayTotal = (newTotal) => {
        if (parseInt(newTotal) > parseInt(peakDayTotal))
        {
            setPeakDayTotal(parseInt(newTotal))
            formData.peak_day = parseInt(newTotal)
            setFormData({...formData})
        }
    }

    /**
     * It is used to compare the column wise total so that wecan figure out peak shift
     * @param {number} newTotal 
     */

    const CalculatePeakShiftTotal = (newTotal) => {
        if (parseInt(newTotal) > parseInt(peakShiftTotal))
        {
            setPeakShiftTotal(parseInt(newTotal))
            formData.peak_shift = parseInt(newTotal)
            setFormData({...formData})
        }
    }

    const parseNumberFromDate = (cdate) => {
        const currentDate = cdate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });

        let dateNumber = parseInt(currentDate.split(',')[0].split(' ')[1])
        return dateNumber
    }

    const findIndexByValue = (row_index, val) => {
        let column_i = inputValue[row_index - 1]?.value.findIndex((object) => object.column_index === val)
        return column_i
    }

    const appendValueAtIndex = (row_i, column_i, val) => {
        const updatedInputValue = [...inputValue];
        updatedInputValue[row_i - 1].value[column_i].value = val
        setInputValue(updatedInputValue)
    }
    
    const showTotal = (currentDate) => {
        let dateNumber = parseNumberFromDate(new Date(currentDate))
        let columnIndex = findIndexByValue(1 ,dateNumber)
        let total = 0
        if (columnIndex != -1)
        {
            for (let i = 0; i < numberOfShifts; i++)
            {
                if (inputValue[i]?.value[columnIndex].value != null)
                {
                    total += parseInt(inputValue[i]?.value[columnIndex].value)
                    CalculatePeakShiftTotal(inputValue[i]?.value[columnIndex].value)
                }
                CalculatePeakDayTotal(total)
            }
        }

        return total
    }

    const showText = (currentDate, val) => {
        // find current date and add a value on its index
        let dateNumber = parseNumberFromDate(new Date(currentDate))
        let columnIndex = findIndexByValue(shift_name ,dateNumber)
        // append at that column
        if (columnIndex != -1)
        {
            appendValueAtIndex(shift_name, columnIndex, val)
        }
    }

  return (
    <div className="flex h-1/6">
        <div className="text-center px-6 py-2 w-[95px] border-b">{shift_name}</div>
        {
            intervals?.map((interval, index) => {
                return (
                (index + 1) != intervals?.length ?
                <div className="flex-1 text-center flex border-b">
                    {
                        shift_name === "Total"?
                        no_of_days?.map((day, days_index) => {
                            const currentDate = new Date(new Date(interval)).setDate(new Date(interval).getDate() + days_index);
                            let total = showTotal(currentDate)
                            return (
                                <div
                                    key={days_index}
                                    className={`border flex-1 p-2 w-[10px] ${!((new Date(new Date(interval)).setDate(new Date(interval).getDate() + days_index) >= startDate) && (new Date(new Date(interval)).setDate(new Date(interval).getDate() + days_index) <= endDate)) ? "bg-[#D2D2D2]" : total >= peakDay ? "bg-[#C99605]" : ""}`}
                                >
                                {!((new Date(new Date(interval)).setDate(new Date(interval).getDate() + days_index) >= startDate) && (new Date(new Date(interval)).setDate(new Date(interval).getDate() + days_index) <= endDate)) ? "" : total}
                                </div>
                            );
                        })
                        :
                        no_of_days?.map((day, days_index) => {

                            const [value, setValue] = useState('');

                            const currentDate = new Date(new Date(interval)).setDate(new Date(interval).getDate() + days_index);
                            const isDisabled = !(currentDate >= startDate && currentDate <= endDate);

                            return (
                                <input
                                    key={days_index}
                                    className={`border flex-1 p-2 w-[10px] ${isDisabled ? "bg-[#D2D2D2]" : parseInt(value) >= peakShift ? "bg-[#FF614C]" : ""}`}
                                    disabled={isDisabled}
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                        setPeakDayTotal(0)
                                        setPeakShiftTotal(0)
                                        showText(currentDate, e.target.value)
                                    }}
                                />
                            );
                        })
                    }
                </div>
                :
                ""
                );
            })
        }
    </div>
  );
};

export default CalendarRow;