import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startNotesUpdated, startUploading } from "../../actions/notes";

export const NotesAppBar = ({ title, body, id, link }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  const handleSaveNote = () => {
    dispatch(startNotesUpdated(id, body, title, link));
  };
  const handleClickImg = () => {
    document.querySelector("#fileImg").click();
  };
  const handleInputFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };
  return (
    <div className="notes__appbar">
      <span>{moment().format("Do MMMM YYYY")}</span>
      <input
        type="file"
        name="file"
        id="fileImg"
        style={{ display: "none" }}
        onChange={handleInputFile}
      />
      <div>
        <button className="btn" onClick={handleClickImg}>
          Picture
        </button>

        <button className="btn" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};
