import React, { memo } from 'react';

import moment from 'moment';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  startNotesUpdated,
  startUploading,
} from '../../redux/actions/notes';
import { screenResizeAction } from '../../redux/actions/screen';

export const NotesAppBar = memo(() => {
  const dispatch = useDispatch();
  const { notes, screen } = useSelector((state) => state);
  console.log(screen.activeResize);
  const handleSaveNote = () => {
    dispatch(startNotesUpdated(notes.active));
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
  const handleHide = () => {
    dispatch(screenResizeAction(false));
  };
  return (
    <div className="notes__appbar">
      <button
        className={
          screen.activeResize
            ? "btn  animate__animated animate__bounceInLeft animate__delay-.2s"
            : "btn_hide"
        }
        onClick={handleHide}
      >
        <i className="fas fa-arrow-right"></i>
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
