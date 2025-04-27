import { useState, useEffect } from 'react';
import './notes.css';
import Header from './header';
import axios from 'axios';
import Edit from './assets/edit.png';
import { BASE_URL } from '../lib/api';  // Adjust the path as needed

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [search, setSearch] = useState('');

  const now = new Date();
  const year = now.getFullYear();
  const time = now.toLocaleTimeString();
  const day = now.toLocaleDateString(undefined, { weekday: 'long' });

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/collections/notes/records/${id}`,
        updatedData
      );
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? response.data : note))
      );
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  function HandleNotes() {
    if (!content.trim() || !title.trim() || !selectedColor.trim()) {
      return alert('No Empty Inputs!');
    }

    axios
      .post(`${BASE_URL}/api/collections/users/auth-with-password`, {
        identity: 'naominosa296@gmail.com',
        password: 'lovelove123',
      })
      .then((loginResponse) => {
        const token = loginResponse.data.token;

        return axios.post(
          `${BASE_URL}/api/collections/notes/records`,
          {
            title: title,
            content: content,
            color: selectedColor,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .then((response) => {
        setNotes((prev) => [...prev, response.data]);
        setMessage('New Note Added!');
        console.log(response);

        setTimeout(() => {
          setTitle('');
          setContent('');
          setMessage('');
          setSelectedColor('');
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error adding note:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Axios config error:', error.message);
        }
      });
  }

  function HandleDelete(id) {
    axios
      .delete(`${BASE_URL}/api/collections/notes/records/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((err) => console.error('Login failed:', err));
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const params = search ? { filter: `title~'${search}'` } : {};

        const response = await axios.get(
          `${BASE_URL}/api/collections/notes/records`,
          {
            params,
          }
        );

        setNotes(response.data.items);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [search]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/collections/notes/records`)
      .then((response) => {
        setNotes(response.data.items);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  }, []);

  return (
    <div className="notes-container">
      <Header setSearch={setSearch} />
      <div>{message}</div>
      <div>
        <div className="overall">
          <div className="text-container">
            <input
              value={title}
              type="text"
              maxLength={20}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              className="st"
            />

            <textarea
              value={content}
              maxLength={150}
              className="st"
              placeholder="Add Notes"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <label htmlFor="color">Pick a Color:</label>

            <input
              id="color"
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{
                width: '30px',
                height: '20px',
                border: 'none',
                cursor: 'pointer',
              }}
            />

            <div className="add-button">
              <button className="add" onClick={HandleNotes}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="saved-notes">
        <div className="inner-notes">
          {notes.map((note) => (
            <div
              className="note"
              key={note.id}
              style={{ backgroundColor: note.color }}
            >
              <h1>{note.title}</h1>
              <p>{note.content}</p>
              <p>{note.deadline}</p>
              <p>{note.selectedColor}</p>
              <p>
                {[year + ' ', time + ' ', day]}
              </p>
              <div className="icons">
                <p onClick={() => HandleDelete(note.id)}>
                  <svg
                    className="btns"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </p>

                <p>
                  <img
                    onClick={handleEdit}
                    style={{ width: '25px' }}
                    src={Edit}
                    alt="edit"
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;


     {/* <div className="color-picker">
  <button className='pink' onClick={() => setSelectedColor('pink')}></button>
  <button className='blue' onClick={() => setSelectedColor('blue')}></button>
  <button className='red' onClick={() => setSelectedColor('red')}></button>
  <button className='navy' onClick={() => setSelectedColor('navy')}></button>

   </div> */}
    {/* <GeneralInput
    value={title}
placeholders='Title:'
type='text'
/>

<GeneralInput
    value={content}
placeholders='Content:'
type='text'
onChange={(e)=> setContent(e.target.value)}
/>

<GeneralInput
    value={deadline}
placeholders='Deadline:'
type="datetime-local"
/>  */}