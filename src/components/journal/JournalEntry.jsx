import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote, noteDeleting } from "../../actions/notes";
import { screenResizeAction } from "../../actions/screen";

export const JournalEntry = ({ id, title, body, date, url }) => {
  const dispatch = useDispatch();
  const dateTime = moment(date);

  const handleClickNoteActive = () => {
    dispatch(activeNote(id, { body, title, url }));
  };
  const handleDelete = () => {
    dispatch(noteDeleting(id));
  };
  return (
    <div onClick={handleClickNoteActive} className="journal__entry pointer">
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{dateTime.format("dddd")}</span>
        <h4>{dateTime.format("Do")}</h4>
      </div>

      <button onClick={handleDelete} className="btn-delete pointer">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

/**
 * escribir custom hooks para los actions
 */
