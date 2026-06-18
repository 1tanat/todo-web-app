import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { useNow } from "../hooks/useNow";

export function TodoList({
  todos,
  toggleComplete,
  deleteTodo,
  editTodo,
  editTask,
  setTimer,
  finishTimer,
}) {
  const now = useNow(500);

  // Задачи с активным таймером — выше обычных; среди них чем меньше времени осталось, тем выше.
  const ordered = [...(todos ?? [])].sort((a, b) => {
    const aActive = a.timer && !a.completed;
    const bActive = b.timer && !b.completed;
    if (aActive && bActive) return a.timer.endsAt - b.timer.endsAt;
    if (aActive) return -1;
    if (bActive) return 1;
    return 0;
  });

  return (
    <>
      {ordered.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} task={todo} editTodo={editTask} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            now={now}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            setTimer={setTimer}
            finishTimer={finishTimer}
          />
        ),
      )}
    </>
  );
}
