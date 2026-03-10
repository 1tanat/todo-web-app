import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";

export function TodoList({
  todos,
  toggleComplete,
  deleteTodo,
  editTodo,
  editTask,
}) {
  return (
    <>
      {(todos ?? []).map((todo) =>
        todo.isEditing ? (
          <EditTodoForm
            key={todo.id}
            task={todo}
            editTodo={editTask}
          />
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
    </>
  );
}
