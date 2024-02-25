import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { RiEdit2Line } from 'react-icons/ri';
import './App.css';

function App() {
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

   useEffect(() => {
     let savedTodos = JSON.parse(localStorage.getItem('todolist'));
     if (savedTodos) {
       setTodos(savedTodos);
     }
   },[] );




  const handleAddNewToDo = () => {
    let newToDoObj = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newToDoObj);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    // Reset input fields after adding todo
    setNewTitle('');
    setNewDescription('');
  }

  const handleDeleteTodo = index => {
    const isConfirmed = window.confirm("Are you sure you want to delete this todo?");

    if (isConfirmed) {
      let reducedTodos = [...allTodos];
      reducedTodos.splice(index, 1);
      localStorage.setItem('todolist', JSON.stringify(reducedTodos));
      setTodos(reducedTodos);
    }
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    // Populate input fields with current todo's data for editing
    setNewTitle(allTodos[index].title);
    setNewDescription(allTodos[index].description);
  };

  const handleSaveEdit = () => {
    let updatedTodos = [...allTodos];
    updatedTodos[editingIndex] = {
      title: newTitle,
      description: newDescription,
    };
    setTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    // Reset editing state after saving edit
    setEditingIndex(null);
    // Reset input fields
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className='App'>
      <h1>My ToDo's</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input required type='text' value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)} placeholder='Title Here!!!' />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)} placeholder='Description Here...' />
          </div>
          <div className='todo-input-item'>
            {editingIndex !== null ? (
              <button type='button' onClick={handleSaveEdit} className='primaryBtn'>Save</button>
            ) : (
              <button type='button' onClick={handleAddNewToDo} className='primaryBtn'>Add</button>
            )}
          </div>
        </div>

        <div className='btn-area'>
          <button className='secondaryBtn'>ToDo List</button>
        </div>

        <div className='todo-list'>
          {allTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} />
                  <RiEdit2Line className='icon' onClick={() => handleEditTodo(index)} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;


