import React, {
  useEffect,
  useRef,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { useForm } from '../../hooks/useForm';
import {
  activeNote,
  deleteImage,
} from '../../redux/actions/notes';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: notes } = useSelector((state) => state.notes);
  const { activeResize } = useSelector((state) => state.screen);
  console.log(activeResize);
  const [inputsValue, handleInputChange, reset] = useForm(notes);
  const { title, body } = inputsValue;
  /**
   * This code fix when user touch on entries done
   * returning data in inpuntValue
   */
  console.log(notes);
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
  const handleDeleteImage = () => {
    console.log("click");
    dispatch(deleteImage(notes.id));
  };
  return (
    <div className="notes__main-content">
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
            <i onClick={handleDeleteImage} className="fas fa-trash trash" />
            <img src={notes.url} alt="imagen" />
          </div>
        )}
      </div>
    </div>
  );
};
