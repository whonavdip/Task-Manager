import './App.css';

import React, { useState } from 'react';

const sharedClasses = {
  container: 'container mx-auto p-4',
  input: 'border p-2',
  button: 'border p-2 flex-1',
};

const TaskManager = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState([
    { title: 'Sample Task', description: 'Description', dueDate: '2024-04-24' }
  ]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  }

  const handleAddTask = () => {
    // Save data to variables or perform any desired action
    
    const newTask = {
      title: title,
      description: description,
      dueDate: date, // Example due date
    };
  
    setTasks(prevTasks => [...prevTasks, newTask]);
    // Optionally, you can clear the input fields after saving the data
    setTitle('');
    setDescription('');
    setDate('');
  };

  const handleDeleteTask = (indexto) => {
    setTasks(prevTasks => {
      // Filter out the task with the specified index
      return prevTasks.filter((task, index) => index !== indexto);
    });
  };

  return (
    <div className={sharedClasses.container}>
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Task:</h2>
        <div className="flex gap-2 mb-2">
          <input type="text" placeholder="Title" className={sharedClasses.input} value={title} onChange={handleTitleChange}/>
          <input type="text" placeholder="Description" className={sharedClasses.input} value={description} onChange={handleDescriptionChange}/>
          <input type="date" className={sharedClasses.input} value={date} onChange={handleDateChange}/>
          <button className="bg-blue-500 text-white p-2" onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="flex gap-2">
          <button className={sharedClasses.button} onClick={}>All</button>
          <button className={sharedClasses.button}>Completed</button>
          <button className={sharedClasses.button}>Pending</button>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Tasks:</h2>
        <ul className="list-disc pl-5">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center gap-2 mb-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="flex-1">{`${task.title} - ${task.description} - Due: ${task.dueDate}`}</span>
              <button className="text-red-500" onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
