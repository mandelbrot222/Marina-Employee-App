import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function StaffSchedule() {
  const [events, setEvents] = useState([]);

  const load = async () => {
    const res = await fetch('http://localhost:5000/api/staff');
    const data = await res.json();
    setEvents(data.map(e => ({ ...e, start: new Date(e.start), end: new Date(e.end) })));
  };

  useEffect(() => { load(); }, []);

  const add = async ({ start, end }) => {
    const employee = prompt('Employee Name');
    if (!employee) return;
    const event = { employee, start, end };
    await fetch('http://localhost:5000/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    await fetch('http://localhost:5000/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add staff schedule', employee })
    });
    load();
  };

  const eventPropGetter = (event) => {
    const colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-red-600'];
    const idx = event.employee ? event.employee.charCodeAt(0) % colors.length : 0;
    return { className: colors[idx] + ' text-white' };
  };

  return (
    <div className="p-4">
      <img src="/logo.png" alt="Logo" className="mb-4 w-32" />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '80vh' }}
        selectable
        onSelectSlot={add}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
}
