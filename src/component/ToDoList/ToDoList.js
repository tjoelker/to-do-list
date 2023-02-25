import { useState, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import ToDoItem from './ToDoItem';
import ToDoMessage from './ToDoMessage';
import logo from '../../logo.svg';
import './ToDoList.css';

const LOCAL_STORAGE_KEY = 'ToDoListApp.tasks';

/**
 * A to do list component.
 */
export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const ToDoReference = useRef();

  /**
   * Check wether there are set tasks in local storage.
   */
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTasks) setTasks(prevTasks => [...prevTasks, ...storedTasks]);
  }, []);

  /** 
   * Save set tasks to local storage.
   */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks]);

  /**
   * Function to toggle task checkbox and change state (task.complete).
   */
  function toggleToDoItem(id) {
    const newTasks = [...tasks];
    const task = newTasks.find(task => task.id === id);
    task.complete = !task.complete;
    setTasks(newTasks);
  }

  /**
   * Get value from <input> and append as task to list.
   */
  function addToDoItem(event) {
    const task = ToDoReference.current.value;
    if (task === '') return;
    setTasks(prevTasks => {
      return [
        ...prevTasks,
        {
          id: uuid(),
          info: task,
          complete: false,
        }
      ];
    });
    console.log(uuid());
    ToDoReference.current.value = null;
  }

  /**
   * Clear completed tasks (task.complete === true).
   */
  function clearCompletedToDoItems(event) {
    const newTasks = tasks.filter(task => !task.complete);
    setTasks(newTasks);
  }

  return (
    <section className="to-do-list-component">
      <h1 className="to-do-heading">This is a <img src={logo} alt="logo"/>React based To-Do List app</h1>
      <ToDoMessage tasks={tasks}/>
      <div className="to-do-input">
        <input ref={ToDoReference} type="text"/>
        <button className="button button-add" onClick={addToDoItem}>Add</button>
        <button className="button button-clear" onClick={clearCompletedToDoItems}>Clear</button>
      </div>
      <ul>
      {
        tasks.map(task => {
          return <ToDoItem key={task.id} task={task} toggleToDoItem={toggleToDoItem}/>
        })
      }
      </ul>
    </section>
  );
}
