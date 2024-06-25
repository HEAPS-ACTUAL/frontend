// import React from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';


// function MyCalendar({ events }) {
//   return (
//     <div className="container mx-auto p-5 shadow-lg rounded-lg">
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         height="auto"
//         className="rounded-lg shadow"
//       />
//     </div>
//   );
// }

// export default MyCalendar;

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
import '../../styles/MonitorProgress.module.css'; // Import the custom CSS file

function MyCalendar({ events }) {
  return (
    // Use flex layout to center its content both vertically and horizontally. 
    <div className="flex items-center justify-center min-h-screen"> 
    
    {/* styling for the calendar */}
      <div className='max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md'> 
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
        />
      </div>
    </div>
  );
}

export default MyCalendar;

