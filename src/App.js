import './App.css';
import React, { useState } from 'react';

const sharedClasses = {
  container: 'container mx-auto p-4',
  input: 'border p-2',
  button: 'border p-2 flex-1',
};

const TaskManager = () => {
  const [value, setValue] = useState(0);
  const [checkboxState, setCheckboxState] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [selectedtask, setSelectedtask] = useState([]);
  const [tasks, setTasks] = useState([
    { title: 'Sample Task', description: 'Description', dueDate: '2024-04-24' }
  ]);
  const uniqueTasks = tasks.filter(task => !selectedtask.includes(task));

  const [lastClicked, setLastClicked] = useState(null);

  const handleClick = (buttonName) => {
    setLastClicked(buttonName);
  };
 
  const handleChange = (event, task) => {
    
    const value = event.target.checked ? 1 : 0;
    const title=task.title;
    if(value==1)
    {
      setSelectedtask(prevTasks => [...prevTasks, task]);
      console.log(selectedtask)
    }
    else if(value==0)
    {
      setSelectedtask(prevTasks => prevTasks.filter(task => task.title !== title));
      console.log(selectedtask);
    }
  };

 


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
        <button onClick={() => handleClick("All")}>All</button>
      <button onClick={() => handleClick("Completed")}>Completed</button>
      <button onClick={() => handleClick("Pending")}>Pending</button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">All Tasks:</h2>
        <ul >
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center gap-2 mb-2">
              <input type="checkbox"  
              checked={checkboxState}
              onChange={(event) => handleChange(event,task)}/>
              <span >{`${task.title} - ${task.description} - Due: ${task.dueDate}`}</span>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
        {/* <h2 className="text-xl font-semibold mb-2">Completed Tasks:</h2>
        <ul>
          {selectedtask.map((selectedtask, index) => (
            <li key={index} className="flex items-center gap-2 mb-2">
              <span >{`${selectedtask.title} - ${selectedtask.description} - Due: ${selectedtask.dueDate}`}</span>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Pending Tasks:</h2>
        <ul >
          
          {uniqueTasks.map((uniqueTasks, index) => (
            <li key={index} className="flex items-center gap-2 mb-2">
              <span >{`${uniqueTasks.title} - ${uniqueTasks.description} - Due: ${uniqueTasks.dueDate}`}</span>
            </li>
          ))}
        </ul> */}
        {lastClicked === "All" && <ul >
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center gap-2 mb-2">
              <input type="checkbox"  
              checked={checkboxState}
              onChange={(event) => handleChange(event,task)}/>
              <span >{`${task.title} - ${task.description} - Due: ${task.dueDate}`}</span>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>}
      {lastClicked === "Completed" && <ul>
          {selectedtask.map((selectedtask, index) => (
            <li key={index} className="flex items-center gap-2 mb-2">
              <span >{`${selectedtask.title} - ${selectedtask.description} - Due: ${selectedtask.dueDate}`}</span>
            </li>
          ))}
        </ul>}
      {lastClicked === "Pending" && <ul>
          
          {uniqueTasks.map((uniqueTasks, index) => (
            <li key={index} className="flex items-center gap-2 mb-2">
              <span >{`${uniqueTasks.title} - ${uniqueTasks.description} - Due: ${uniqueTasks.dueDate}`}</span>
            </li>
          ))}
        </ul>}
      </div>
    </div>
  );
};

export default TaskManager;
