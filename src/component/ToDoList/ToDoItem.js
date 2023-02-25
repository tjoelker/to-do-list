/**
 * A single task, that can be placed on the ToDoList component.
 */
export default function ToDoItem({task, toggleToDoItem}) {
  function handleToDoItemOnClick() {
    toggleToDoItem(task.id);
  }

  return (
    <li className="to-do-item">
      <label>
        <input type="checkbox" checked={task.complete} onChange={handleToDoItemOnClick}/>
        {task.complete === true ? <strike>{task.info}</strike> : task.info}
      </label>
    </li>
  );
}
