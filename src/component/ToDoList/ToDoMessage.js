/**
 * Feedback message for the ToDoList component.
 */
export default function ToDoMessage({tasks}) {
  let index = tasks.filter(task => !task.complete).length;
  
  return (
    <div className="to-do-message">
      <p>
        There {index === 1 ? 'is' : 'are'} {index} task{index !== 1 ? 's' : ''} to do.
      </p>
    </div>
  );
}
