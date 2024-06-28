// import React from "react";
// import styles from "../../../styles/RevisionSchedule.module.css";

// // for controlling the calendar interface.
// const CalendarControls = ({
//   months, // Array of month names to populate the month selector
//   currentDate, // Currently selected date
//   changeMonth,
//   handleMonthChange,
//   handleYearChange,
//   years, // Array of years to populate the year selector
//   startDate,
//   endDate,
//   setEvents, // Function to clear or set events on the calendar
//   generateSpacedRepetitionSchedule,
// }) => {
//   return (
//     <div className={styles.controls}>
//       <div className={styles.dateSelector}>
//         {/* Button to clear events on the calendar */}
//         <button onClick={() => setEvents({})} className={styles.clearButton}>
//           Clear Events
//         </button>
//         {/* Button to generate a spaced repetition schedule based on the provided start and end dates */}
//         <button
//           onClick={() => generateSpacedRepetitionSchedule(startDate, endDate)}
//           className={styles.generateButton}
//           disabled={!startDate || !endDate} // Disable button if no start or end date is provided
//         >
//           Generate Schedule
//         </button>
//       </div>
//       <div className={styles.header}>
//         {/* Button to navigate to the previous month */}
//         <button onClick={() => changeMonth(-1)} className={styles.navButton}>
//           Prev
//         </button>
//         {/* Dropdown to select a month; triggers handleMonthChange */}
//         <select
//           onChange={handleMonthChange}
//           value={currentDate.getMonth()} // Set the current month as the selected value
//           className={styles.monthSelect}
//         >
//           {months.map((month, index) => (
//             <option key={month} value={index}>
//               {month}
//             </option>
//           ))}
//         </select>
//         {/* Dropdown to select a year; triggers handleYearChange */}
//         <select
//           onChange={handleYearChange}
//           value={currentDate.getFullYear()} // Set the current year as the selected value
//           className={styles.yearSelect}
//         >
//           {years.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//         {/* Button to navigate to the next month */}
//         <button onClick={() => changeMonth(1)} className={styles.navButton}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CalendarControls; // Export the component for use in other parts of the application
