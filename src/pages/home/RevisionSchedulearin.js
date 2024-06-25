import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


// import '@fullcalendar/daygrid/main.css';

function MyCalendar({ events }) {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        // eventColor={events.color}
      />
    </div>
  );
}

export default MyCalendar;
