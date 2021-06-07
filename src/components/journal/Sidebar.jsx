import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutFirebase } from "../../actions/login";
import { startNewNote } from "../../actions/notes";
import { JournalEntries } from "./JournalEntries";

export const Sidebar = memo(() => {
  const { displayName } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogoutFirebase());
  };
  const { activeResize } = useSelector((state) => state.screen);
  console.log(activeResize);
  const handleEntry = () => {
    dispatch(startNewNote());
  };
  return (
    <aside
      className={
        activeResize
          ? "journal__sidebar show "
          : "journal__sidebar animate__animated animate__bounceInLeft animate__delay-.2s"
      }
    >
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> {displayName}</span>
        </h3>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="journal__new-entry" onClick={handleEntry}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
});
