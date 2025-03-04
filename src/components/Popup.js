import React from "react";
import Popup from "react-popup";

Popup.registerPlugin("createEvent", (date, callback) => {
  let title = "";

  const createEvent = () => {
    const newEvent = {
      id: Math.random().toString(),
      title,
      start: date,
      end: date,
    };
    callback(newEvent);
  };

  Popup.create({
    title: "Create Event",
    content: (
      <div>
        <input
          type="text"
          placeholder="Event Title"
          onChange={(e) => (title = e.target.value)}
        />
        <button onClick={createEvent}>Save</button>
      </div>
    ),
    buttons: {
      right: ["cancel"],
    },
  });
});

Popup.registerPlugin("editEvent", (event, editCallback, deleteCallback) => {
  let updatedTitle = event.title;

  const saveEdit = () => {
    editCallback({ ...event, title: updatedTitle });
  };

  const deleteEvent = () => {
    deleteCallback(event.id);
  };

  Popup.create({
    title: "Edit/Delete Event",
    content: (
      <div>
        <input
          type="text"
          defaultValue={event.title}
          onChange={(e) => (updatedTitle = e.target.value)}
        />
        <button onClick={saveEdit}>Save</button>
        <button onClick={deleteEvent}>Delete</button>
      </div>
    ),
    buttons: {
      right: ["cancel"],
    },
  });
});

export default Popup;
