import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: notes } = useSelector((state) => state.notes);

  const [inputsValue, handleInputChange, reset] = useForm(notes);
  const { title, body } = inputsValue;
  /**
   * This code fix when user touch on entries done
   * returning data in inpuntValue
   */
  const activeId = useRef(notes.id);
  useEffect(() => {
    if (notes.id !== activeId.current) {
      reset(notes.id);
      activeId.current = notes.id;
    }
  }, [reset, notes.id]);

  useEffect(() => {
    dispatch(activeNote(inputsValue.id, { ...inputsValue }));
  }, [dispatch, inputsValue]);
  return (
    <div className={`notes__main-content `}>
      <NotesAppBar {...inputsValue} />

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

        {notes.url && (
          <div className="notes__image">
            <img src={notes.url} alt="imagen" />
          </div>
        )}
      </div>
    </div>
  );
};
