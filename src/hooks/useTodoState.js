import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultCategories } from "../constants";
import { loadState, saveState } from "../utils/storage";

export function useTodoState() {
  const [categories, setCategories] = useState(() => {
    const s = loadState();
    return s ? s.categories : defaultCategories;
  });
  const [todos, setTodos] = useState(() => {
    const s = loadState();
    if (s) return s.todos;
    const initial = {};
    defaultCategories.forEach((cat) => {
      initial[cat.id] = [];
    });
    return initial;
  });
  const [activeTab, setActiveTab] = useState(() => {
    const s = loadState();
    return s ? s.activeTab : defaultCategories[0].id;
  });
  const [theme, setTheme] = useState(() => {
    const s = loadState();
    return s ? s.theme : "light";
  });
  const [tabEditing, setTabEditing] = useState(false);

  useEffect(() => {
    saveState({ categories, todos, activeTab, theme });
  }, [categories, todos, activeTab, theme]);

  const addCategory = () => {
    if (categories.length >= 5) return;
    const id = uuidv4();
    setCategories((prev) => [
      ...prev,
      { id, name: `Категория ${prev.length + 1}` },
    ]);
    setTodos((prev) => ({ ...prev, [id]: [] }));
    setActiveTab(id);
  };

  const renameCategory = (id, newName) => {
    if (!newName) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: newName.trim() } : c)),
    );
  };

  const deleteCategory = (id) => {
    if (categories.length <= 1) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setTodos((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (activeTab === id) {
      const remaining = categories.filter((c) => c.id !== id);
      setActiveTab(remaining[0]?.id ?? null);
    }
  };

  const addTodo = (task) => {
    if (!activeTab) return;
    setTodos((prev) => ({
      ...prev,
      [activeTab]: [
        ...(prev[activeTab] ?? []),
        { id: uuidv4(), task, completed: false, isEditing: false },
      ],
    }));
  };

  const toggleComplete = useCallback(
    (id) => {
      if (!activeTab) return;
      setTodos((prev) => ({
        ...prev,
        [activeTab]: (prev[activeTab] ?? []).map((todo) => {
          if (todo.id !== id) return todo;
          const completed = !todo.completed;
          // Завершили вручную раньше времени — зачёркиваем, помечаем "досрочно" (зелёным) и снимаем таймер.
          if (completed) {
            return {
              ...todo,
              completed: true,
              completedEarly: !!todo.timer,
              completedExpired: false,
              timer: null,
            };
          }
          return {
            ...todo,
            completed: false,
            completedEarly: false,
            completedExpired: false,
          };
        }),
      }));
    },
    [activeTab],
  );

  // Поставить таймер на задачу (длительность в миллисекундах).
  const setTimer = useCallback(
    (id, durationMs) => {
      if (!activeTab) return;
      setTodos((prev) => ({
        ...prev,
        [activeTab]: (prev[activeTab] ?? []).map((todo) =>
          todo.id === id
            ? {
                ...todo,
                completed: false,
                completedEarly: false,
                completedExpired: false,
                timer: { duration: durationMs, endsAt: Date.now() + durationMs },
              }
            : todo,
        ),
      }));
    },
    [activeTab],
  );

  // Таймер истёк сам — зачёркиваем задачу и снимаем таймер.
  const finishTimer = useCallback((id) => {
    setTodos((prev) => {
      const next = {};
      for (const key of Object.keys(prev)) {
        next[key] = prev[key].map((todo) =>
          todo.id === id
            ? {
                ...todo,
                completed: true,
                completedEarly: false,
                completedExpired: true,
                timer: null,
              }
            : todo,
        );
      }
      return next;
    });
  }, []);

  const deleteTodo = (id) => {
    if (!activeTab) return;
    setTodos((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] ?? []).filter((todo) => todo.id !== id),
    }));
  };

  const editTodo = (id) => {
    if (!activeTab) return;
    setTodos((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] ?? []).map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
      ),
    }));
  };

  const editTask = (task, id) => {
    if (!activeTab) return;
    setTodos((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] ?? []).map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: false } : todo,
      ),
    }));
  };

  return {
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
  };
}
