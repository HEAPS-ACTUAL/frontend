
// // set default value of endDate as null
// // endDate = null;

// // from FE, ask user if they want to input endDate
//     // if user wants to input endDate, get the endDate from user

//     // if user does not want to input endDate, endDate = null

// const CalculateSpacedRepetitionDates = (startDate, endDate) => {

    
//     const currentDate = new Date(startDate); // dont change this, need this for the while loop calculation
//     const currentDateCorrectFormat = currentDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD to push into reviewDates array
//     const reviewDates = [currentDateCorrectFormat];
    
//     let intervals;

//     if (endDate === null) {

//         intervals = [3, 6 , 9 ,12 ];

//         let IntervalIndex = 0;
    
//         while ( IntervalIndex < intervals.length) {
//             currentDate.setDate(currentDate.getDate() + intervals[IntervalIndex]);
//             const formattedDate = currentDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
//             reviewDates.push(formattedDate); // Store the formatted date
//             IntervalIndex++;
//         }
//     }

//     else{
   
//         const end = new Date(endDate);

//         // ensure start date is before end date
//         if (currentDate >= end) {
//             throw new Error('Start date must be before End date'); // window alert for this
//         }

//         // Calculate the number of days between start date and end date
//         const daysBetween = Math.ceil((end - currentDate) / (1000 * 60 * 60 * 24));

//         console.log(daysBetween);

//         // set the intervals based on the number of days btwn startDate and endDate
//         if (daysBetween <= 7) {
//             intervals = [1, 2, 4, 6];
//         } else if (daysBetween <= 14) {
//             intervals = [2, 4, 7];
//         } else if (daysBetween <= 30) {
//             intervals = [4, 8, 15];
//         } else {
//             intervals = [7, 14, 28];
//         }

//         let IntervalIndex = 0;
    
//         while (currentDate < end && IntervalIndex < intervals.length) {
//         currentDate.setDate(currentDate.getDate() + intervals[IntervalIndex]);
//         const formattedDate = currentDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
//         reviewDates.push(formattedDate); // Store the formatted date
//         IntervalIndex++;
//     }
//         }
        

//     return reviewDates;
// }

// const startDate = new Date().toISOString().split('T')[0];
// // const endDate = '2024-07-31';
// const endDate = null;
// const reviewDates = CalculateSpacedRepetitionDates(startDate, endDate);
// console.log(reviewDates);

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { SketchPicker } from 'react-color';

const App = () => {
  const [color, setColor] = useState('#ff0000'); // Default color
  const startDate = new Date().toISOString().split('T')[0];
  const endDate = null;
  
  const CalculateSpacedRepetitionDates = (startDate, endDate) => {
    const currentDate = new Date(startDate); // don't change this, need this for the while loop calculation
    const currentDateCorrectFormat = currentDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD to push into reviewDates array
    const reviewDates = [currentDateCorrectFormat];
    
    let intervals;

    if (endDate === null) {
      intervals = [3, 6, 9, 12];
      let IntervalIndex = 0;

      while (IntervalIndex < intervals.length) {
        currentDate.setDate(currentDate.getDate() + intervals[IntervalIndex]);
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        reviewDates.push(formattedDate); // Store the formatted date
        IntervalIndex++;
      }
    } else {
      const end = new Date(endDate);

      // ensure start date is before end date
      if (currentDate >= end) {
        throw new Error('Start date must be before End date'); // window alert for this
      }

      // Calculate the number of days between start date and end date
      const daysBetween = Math.ceil((end - currentDate) / (1000 * 60 * 60 * 24));

      // set the intervals based on the number of days btwn startDate and endDate
      if (daysBetween <= 7) {
        intervals = [1, 2, 4, 6];
      } else if (daysBetween <= 14) {
        intervals = [2, 4, 7];
      } else if (daysBetween <= 30) {
        intervals = [4, 8, 15];
      } else {
        intervals = [7, 14, 28];
      }

      let IntervalIndex = 0;

      while (currentDate < end && IntervalIndex < intervals.length) {
        currentDate.setDate(currentDate.getDate() + intervals[IntervalIndex]);
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        reviewDates.push(formattedDate); // Store the formatted date
        IntervalIndex++;
      }
    }

    return reviewDates;
  };

  const reviewDates = CalculateSpacedRepetitionDates(startDate, endDate);

  const handleDateTile = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (reviewDates.includes(dateString)) {
        return (
          <div style={{ backgroundColor: color, color: 'white' }}>
            {date.getDate()}
          </div>
        );
      }
    }
  };

  return (
    <div>
      <h1>Spaced Repetition Calendar</h1>
      <h3>Select Subject Color</h3>
      <SketchPicker
        color={color}
        onChangeComplete={(color) => setColor(color.hex)}
      />
      <h3>Review Dates Calendar</h3>
      <Calendar tileContent={handleDateTile} />
    </div>
  );
};

export default App;
