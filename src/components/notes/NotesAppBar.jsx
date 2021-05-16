import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startNotesUpdated } from "../../actions/notes";
export const NotesAppBar = ({ title, body, id }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  const handleSaveNote = () => {
    dispatch(startNotesUpdated(id, body, title));
  };
  return (
    <div className="notes__appbar">
      <span>{moment().format("Do MMMM YYYY")}</span>

      <div>
        <button className="btn">Picture</button>

        <button className="btn" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};
