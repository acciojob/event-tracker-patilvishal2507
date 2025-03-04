import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Popup from "react-popup";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-popup/style.css";
import "./Popup";

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelect = ({ start }) => {
    const existingEvent = events.find((event) =>
      moment(event.start).isSame(start, "day")
    );
    if (existingEvent) {
      setSelectedEvent(existingEvent);
      Popup.plugins().editEvent(
        existingEvent,
        handleEditEvent,
        handleDeleteEvent
      );
    } else {
      Popup.plugins().createEvent(start, handleAddEvent);
    }
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    Popup.close();
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setSelectedEvent(null);
    Popup.close();
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setSelectedEvent(null);
    Popup.close();
  };

  const showAllEvents = () => setEvents(events);

  const showPastEvents = () =>
    setEvents(events.filter((event) => moment(event.start).isBefore(moment())));

  const showUpcomingEvents = () =>
    setEvents(events.filter((event) => moment(event.start).isAfter(moment())));

  return (
    <div className="App">
      <h1>Event Tracker Calendar</h1>
      <div>
        <button onClick={showAllEvents}>All</button>
        <button onClick={showPastEvents}>Past</button>
        <button onClick={showUpcomingEvents}>Upcoming</button>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={(event) => setSelectedEvent(event)}
      />
      <Popup />
    </div>
  );
}

export default App;
