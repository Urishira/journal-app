import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const { active: notes } = useSelector((state) => state.notes);

  const [inputsValue, handleInputChange, reset] = useForm(notes);
  const { title, body, id } = inputsValue;
  /**
   * This code fix when user touch on entries done
   * returning data in inpuntValue
   */
  const activeId = useRef(id);
  useEffect(() => {
    if (notes.id !== activeId.current) {
      reset(notes.id);
      activeId.current = notes.id;
    }
  }, [reset, notes.id]);
  return (
    <div className="notes__main-content">
      <NotesAppBar title={title} id={id} body={body} />

      <div className="notes__content">
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        <div className="notes__image">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
            alt="imagen"
          />
        </div>
      </div>
    </div>
  );
};
