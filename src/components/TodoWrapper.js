import { useEffect } from "react";
import { useTodoState } from "../hooks/useTodoState";
import { useContainerWidth } from "../hooks/useContainerWidth";
import { ThemeToggle } from "./ThemeToggle";
import { CategoryTabs } from "./CategoryTabs";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export function TodoWrapper() {
  const {
    categories,
    todos,
    activeTab,
    theme,
    tabEditing,
    setActiveTab,
    setTheme,
    setTabEditing,
    addCategory,
    renameCategory,
    deleteCategory,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    editTask,
    setTimer,
    finishTimer,
  } = useTodoState();

  const containerWidth = useContainerWidth(categories.length, tabEditing);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      className="TodoWrapper"
      style={{ width: containerWidth, minWidth: containerWidth }}
    >
      <ThemeToggle
        theme={theme}
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
      />

      <h1>Список дел</h1>
      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddCategory={addCategory}
        onRenameCategory={renameCategory}
        onDeleteCategory={deleteCategory}
        onEditingChange={setTabEditing}
      />

      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos[activeTab]}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        editTask={editTask}
        setTimer={setTimer}
        finishTimer={finishTimer}
      />
    </div>
  );
}
