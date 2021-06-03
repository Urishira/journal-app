import moment from "moment";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startNotesUpdated, startUploading } from "../../actions/notes";

export const NotesAppBar = memo(() => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);
  console.log(active);
  const handleSaveNote = () => {
    dispatch(startNotesUpdated(active));
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
      <button className="btn notes_appbar-btnMenu">
        <i className="fas fa-bars"></i>
      </button>
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
});
