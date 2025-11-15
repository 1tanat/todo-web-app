import { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();

    editTodo(value, task.id);

    setValue("");
  };
  return (
    <form className="EditTodo" onSubmit={handleSubmit}>
      <input
        className="edit-input"
        type="text"
        value={value}
        placeholder="Твоя задача"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn edit-btn">
        Изменить
      </button>
    </form>
  );
};
