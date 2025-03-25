import { 
    getDaysInMonth, 
    setDate, 
    getDay, 
    format, 
    lastDayOfMonth, 
    formatISO 
  } from 'date-fns';
  
  const makeSortableMonths = (images) =>
    images.reduce(
      (acc, cur) => ({
        ...acc,
        [format(new Date(cur.creationTime), 'MMMM y')]: cur.creationTime,
      }),
      {}
    );
  
  const makeMonthList = (sortedMonthLabels, months, imagesByDateString) =>
    sortedMonthLabels.flatMap((month) => {
      const date = new Date(months[month]);
      const daysInMonth = getDaysInMonth(date);
      const days = new Array(daysInMonth).fill(null).map((_, i) => {
        const dateString = formatISO(setDate(date, i + 1), {
          representation: 'date',
        });
        return {
          type: 'day',
          data: {
            image: imagesByDateString[dateString],
            dateString,
            day: i + 1,
          },
        };
      });
  
      return padMonth(days, date, month);
    });
  
  const padMonth = (days, date, month) => {
    const firstOfMonth = setDate(date, 1);
    const lastOfMonth = lastDayOfMonth(date);
    const firstOfMonthWeekday = getDay(firstOfMonth);
    const lastOfMonthWeekday = getDay(lastOfMonth);
    
    // Add blank spaces before first day of month
    for (let i = 0; i < firstOfMonthWeekday; i++) {
      days.unshift({ type: 'blank', data: null });
    }
    
    // Add blank spaces after last day of month
    for (let i = lastOfMonthWeekday; i < 6; i++) {
      days.push({ type: 'blank', data: null });
    }
    
    // Add month header
    days.unshift({ type: 'header', data: month });
    return days;
  };
  
  export const transformImagesToCalendarData = (imagesByDateString) => {
    const images = Object.values(imagesByDateString);
  
    // Determine which months have images
    const months = makeSortableMonths(images);
  
    // Ensure current month is always present
    const currentMonthAndYear = format(Date.now(), 'MMMM y');
    months[currentMonthAndYear] = Date.now();
  
    // Sort the months
    const sortedMonthLabels = Object.keys(months).sort(
      (month1, month2) => months[month1] - months[month2]
    );
  
    // Add days
    return makeMonthList(sortedMonthLabels, months, imagesByDateString);
  };