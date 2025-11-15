import { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value !== "") addTodo(value);

    setValue("");
  };
  return (
    <form className="TodoForm todo-row" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        value={value}
        placeholder="Твоя задача"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn todo-add-btn">
        Добавить
      </button>
    </form>
  );
};
