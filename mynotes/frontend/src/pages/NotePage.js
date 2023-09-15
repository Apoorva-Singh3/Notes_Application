import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  // Define getNote as a useCallback
  const getNote = useCallback(async () => {
    if (id === 'new') return;
    let response = await fetch(`/api/notes/${id}`);
    let data = await response.json();
    setNote(data);
  }, [id]);

  useEffect(() => {
    // Call getNote inside the useEffect
    getNote();
  }, [id, getNote]);

  const createNote = async () => {
    // fetch(`/api/notes/create/`, {
    fetch(`/api/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };

  const updateNote = async () => {
    // fetch(`/api/notes/${id}/update/`, {
      fetch(`/api/notes/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };

  const deleteNote = async () => {
    // fetch(`/api/notes/${id}/delete/`, {
      fetch(`/api/notes/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    navigate('/');
  };

  const handleSubmit = () => {
    if (id !== 'new' && note.body === '') {
      deleteNote();
    } else if (id !== 'new') {
      updateNote();
    } else if (id === 'new' && note !== null) {
      createNote();
    }
    navigate('/');
  };

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        defaultValue={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
