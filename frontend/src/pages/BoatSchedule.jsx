import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const moveColors = {
  Launch: 'bg-blue-600',
  'Haul in': 'bg-green-600',
  'Boat Drop off': 'bg-indigo-600',
  'Boat pick up': 'bg-purple-600',
  'Trailer drop off': 'bg-teal-600',
  'Trailer pick up': 'bg-orange-600',
  other: 'bg-gray-400'
};

export default function BoatSchedule() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await fetch('http://localhost:5000/api/schedule');
    const data = await res.json();
    setEvents(data.map(e => ({
      ...e,
      start: new Date(e.start),
      end: new Date(e.end)
    })));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectSlot = async ({ start, end }) => {
    const description = prompt('Description');
    if (!description) return;
    const type = prompt('Type of Move (Launch, Haul in, Boat Drop off, Boat pick up, Trailer drop off, Trailer pick up, other)', 'Launch');
    const event = { start, end, description, type };
    await fetch('http://localhost:5000/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    await fetch('http://localhost:5000/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add schedule', description })
    });
    fetchEvents();
  };

  const eventPropGetter = (event) => {
    const color = moveColors[event.type] || moveColors.other;
    return { className: color + ' text-white' };
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
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
}
