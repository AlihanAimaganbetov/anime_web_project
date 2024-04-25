import React from 'react';

function parseDateString(dateString: string): Date {
  const dateParts = dateString.split(' to '); // Разделяем строку по " to ", если она содержит период
  const startDate = new Date(dateParts[0]); // Создаем объект Date для начальной даты
  if (dateParts.length === 1) {
      return startDate; // Если нет второй части (то есть нет периода), возвращаем только начальную дату
  } else {
      const endDate = new Date(dateParts[1]); // Создаем объект Date для конечной даты
      return endDate; // Возвращаем конечную дату
  }
}

function compareDates(date1: Date, date2: Date): number {
  if (date1 < date2) {
      return -1;
  } else if (date1 > date2) {
      return 1;
  } else {
      return 0;
  }
}

const date1String = "Oct 4, 2015 to Mar 27, 2016";
const date2String = "Oct 10, 2014 to Mar 20, 2015";
const date13String = "Jan 19, 2010";



const date1 = parseDateString(date1String);
const date2 = parseDateString(date2String);
const date13= parseDateString(date13String)
const comparisonResult = compareDates(date1, date2);

console.log(comparisonResult," ", date1," ", date13); // Отрицательное число, если date1 раньше date2, положительное, если date1 позже date2, иначе 0

const SimplePage: React.FC = () => {
  return (
    <div>
      <h1>Привет, это отдельная страница с использованием TypeScript!</h1>
      <p>Это простой пример использования TypeScript с React для создания отдельной страницы.</p>
    </div>
  );
}

export default SimplePage;
