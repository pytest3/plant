import { parse, differenceInCalendarDays, format } from "date-fns";

export const capitalize = (stringOfWords) => {
  const words = stringOfWords.split(" ");
  console.log(words);
  const formattedWords = words.map((word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });
  const formattedString = formattedWords.join(" ");
  return formattedString;
};

export const getRandomInt = () => {
  return Math.random().toFixed(5);
};

// Sorting related

export const sortDaysAsc = (data) => {
  return [...data].sort((a, b) => a.daysSinceLast - b.daysSinceLast);
};

export const sortDaysDesc = (data) => {
  return [...data].sort((a, b) => b.daysSinceLast - a.daysSinceLast);
};

export const sortDatesAsc = (data) => {
  return [...data].sort(
    (a, b) => new Date(a.lastWatered) - new Date(b.lastWatered)
  );
};

export const sortDatesDesc = (data) => {
  return [...data].sort(
    (a, b) => new Date(b.lastWatered) - new Date(a.lastWatered)
  );
};

export const sortNamesAsc = (data) => {
  return [...data].sort((a, b) => a.name.localeCompare(b.name));
};

export const sortNamesDesc = (data) => {
  return [...data].sort((a, b) => a.name.localeCompare(b.name)).reverse();
};

// Date object related //

export const calculateDaysSinceLast = (enteredDate) => {
  const today = new Date();
  const parsedDate = parse(enteredDate, "yyyy-MM-dd", new Date());
  const daysSinceLast = differenceInCalendarDays(today, parsedDate);
  return daysSinceLast;
};

// converts date from "yyyy-MM-dd" to "dd-MMM"
export const formatLastWatered = (date) => {
  const formattedDate = format(parse(date, "yyyy-MM-dd", new Date()), "dd-MMM");
  return formattedDate;
};

export const checkIfDateLesserThanToday = (enteredDate) => {
  const parsedDate = parse(enteredDate, "yyyy-MM-dd", new Date());
  return parsedDate <= new Date();
};
