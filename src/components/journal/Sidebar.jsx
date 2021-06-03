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
  const state = useSelector((state) => state);
  console.log(state);
  const handleEntry = () => {
    dispatch(startNewNote());
  };
  return (
    <aside className="journal__sidebar">
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
