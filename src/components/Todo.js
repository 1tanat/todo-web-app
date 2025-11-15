import { TrashIcon, PencilSimpleIcon } from "@phosphor-icons/react";

export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="Todo">
      <p
        onClick={() => toggleComplete(task.id)}
        className={`cursorPoint ${task.completed ? "completed" : "incompleted"}`}
      >
        {task.task}
      </p>
      <div className="todo-buttons">
        <PencilSimpleIcon
          className="edit-icon todo-icon"
          size={20}
          onClick={() => editTodo(task.id)}
        />
        <TrashIcon
          className="delete-icon todo-icon"
          onClick={() => deleteTodo(task.id)}
          size={20}
        />
      </div>
    </div>
  );
};
