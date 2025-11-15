import { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { CategoryTabs } from "./CategoryTabs";
import { MoonStarsIcon, SunIcon } from "@phosphor-icons/react";
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState({
    personal: [],
    work: [],
    study: [],
  });

  const [activeTab, setActiveTab] = useState("personal");

  const [theme, setTheme] = useState("light");

  const addTodo = (task) => {
    setTodos({
      ...todos,
      [activeTab]: [
        ...todos[activeTab],
        { id: uuidv4(), task, completed: false, isEditing: false },
      ],
    });
  };

  const toggleComplete = (id) => {
    setTodos({
      ...todos,
      [activeTab]: todos[activeTab].map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    });
  };

  const deleteTodo = (id) => {
    setTodos({
      ...todos,
      [activeTab]: todos[activeTab].filter((todo) => todo.id !== id),
    });
  };

  const editTodo = (id) => {
    setTodos({
      ...todos,
      [activeTab]: todos[activeTab].map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
      ),
    });
  };

  const editTask = (task, id) => {
    setTodos({
      ...todos,
      [activeTab]: todos[activeTab].map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: false } : todo,
      ),
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="TodoWrapper">
      <button
        className="theme-toggle theme-btn"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <MoonStarsIcon size={32} />
        ) : (
          <SunIcon color="#f7f7f7" size={32} />
        )}
      </button>

      <h1>Список дел</h1>
      <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <TodoForm addTodo={addTodo} />
      {todos[activeTab].map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} task={todo} editTodo={editTask} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ),
      )}
    </div>
  );
};
