Date.isLeapYear = function (year) { 
	    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
	    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () { 
	    return Date.isLeapYear(this.getFullYear()); 
};

Date.prototype.getDaysInMonth = function () { 
	    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};
Date.prototype.addMonths = function (value) {
	    var n = this.getDate();
	    this.setDate(1);
	    this.setMonth(this.getMonth() + value);
	    this.setDate(Math.min(n, this.getDaysInMonth()));
	    return this;
};
function findFirstMonday(targetDate) {
	let targetMonth = targetDate.getMonth();
	let targetYear = targetDate.getFullYear();
	let firstDateInMonth = new Date(targetYear, targetMonth, 1);
	let firstWeekdayInMonth = firstDateInMonth.getDay();
	let firstMondayDate = 1 + ((8 - firstWeekdayInMonth) % 7);
	return new Date(targetYear, targetMonth, firstMondayDate)
}
function findLastMondayOfPreviousMonth(d) {
	let d1 = new Date(d.getFullYear(), d.getMonth(), 0);
	let wd = d1.getDay();
	d1.setDate(d1.getDate() - (wd < 1 ? 6 : wd - 1));
	return d1
}

function findLastSunday(target) {
	var date = new Date(target.getFullYear(),target.getMonth(),1,12);
	let weekday = date.getDay();
	let dayDiff = weekday===0 ? 7 : weekday;
	let lastSunday = date.setDate(date.getDate() - dayDiff);
	return date;
}
function findFirstSundayOfNextMonth(target) {
	target = target.addMonths(1)
	let tempDate = new Date(target.getFullYear(), target.getMonth(), 1);
	let day = tempDate.getDay();
	let toNextSun = day !== 0 ? 7 - day : 0;
	tempDate.setDate(tempDate.getDate() + toNextSun);

	return tempDate;
}

function getLastMondayOfPreviousMonth() {
	  const currentDate = new Date();
	  const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
	  
	  while (previousMonth.getDay() !== 1) {
		      previousMonth.setDate(previousMonth.getDate() - 1);
		    }
	  
	  return previousMonth;
}

function getWeeksBetween(startDate, endDate) {
	  var weeks = [];
	  var currentWeek = new Date(startDate);
	  currentWeek.setDate(currentWeek.getDate() + (1 - currentWeek.getDay()));

	  while (currentWeek <= endDate) {
		      weeks.push(new Date(currentWeek));
		      currentWeek.setDate(currentWeek.getDate() + 7);
		    }

	  return weeks;
}

function DaysInBetween(start_date, end_date) {
	const startDate = new Date(start_date);
	const endDate = new Date(end_date);

	const timeDifference = endDate - startDate;

	const numDays = Math.floor(timeDifference / (1000 * 3600 * 24)) + 1;

	return numDays
}

function geting(){
	{[...Array(calculateWeeksBetween(dateRangeStart, dateRangeEnd))].map((_, i) => {
		console.log(dateRangeStart, i)
		return <div className="flex-1 text-center px-6 py-2 border-r border-b">{i}</div>
	}
	)
	}
}
export {findFirstMonday, findLastMondayOfPreviousMonth, findLastSunday, findFirstSundayOfNextMonth, getLastMondayOfPreviousMonth, getWeeksBetween, DaysInBetween};

