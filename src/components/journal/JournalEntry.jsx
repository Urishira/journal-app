import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

export const JournalEntry = ({ id, title, body, date, url }) => {
  const dispatch = useDispatch();
  const dateTime = moment(date);

  const handleClickNoteActive = () => {
    dispatch(activeNote(id, { body, title, url }));
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
        <p className="journal__entry-title"> {title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{dateTime.format("dddd")}</span>
        <h4>{dateTime.format("Do")}</h4>
      </div>
    </div>
  );
};
