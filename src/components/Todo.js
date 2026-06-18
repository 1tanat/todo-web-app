import { useState, useEffect, useRef } from "react";
import {
  TrashIcon,
  PencilSimpleIcon,
  TimerIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { playAlarm } from "../utils/sound";

function formatRemaining(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export const Todo = ({
  task,
  now,
  toggleComplete,
  deleteTodo,
  editTodo,
  setTimer,
  finishTimer,
}) => {
  const [settingTimer, setSettingTimer] = useState(false);
  const [minutes, setMinutes] = useState("");
  const [shaking, setShaking] = useState(false);
  const firedRef = useRef(false);

  const hasActiveTimer = !!task.timer && !task.completed;
  const remaining = hasActiveTimer ? task.timer.endsAt - now : null;
  const expired = remaining !== null && remaining <= 0;

  // Когда таймер дошёл до нуля: трясём + звук 2 секунды, затем зачёркиваем.
  useEffect(() => {
    if (expired && !firedRef.current) {
      firedRef.current = true;
      setShaking(true);
      playAlarm();
      const t = setTimeout(() => {
        setShaking(false);
        finishTimer(task.id);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [expired, task.id, finishTimer]);

  // Сбрасываем "сработал" при снятии/новом таймере, чтобы он мог сработать снова.
  useEffect(() => {
    if (!task.timer) firedRef.current = false;
  }, [task.timer]);

  const handleSetTimer = (e) => {
    e.preventDefault();
    const val = parseFloat(String(minutes).replace(",", "."));
    if (!isNaN(val) && val > 0) {
      setTimer(task.id, Math.round(val * 60000));
    }
    setMinutes("");
    setSettingTimer(false);
  };

  // Цвет: зелёный (всё время) → жёлтый (половина) → красный (конец).
  const fraction = hasActiveTimer
    ? Math.max(0, Math.min(1, remaining / task.timer.duration))
    : 1;
  const timerColor = `hsl(${Math.round(120 * fraction)}, 75%, 45%)`;

  // Полоса слева: при активном таймере — градиент времени, после завершения остаётся
  // зелёной (досрочно) или красной (таймер истёк).
  let borderColor = null;
  if (hasActiveTimer) borderColor = timerColor;
  else if (task.completedEarly) borderColor = "#2e9e4f";
  else if (task.completedExpired) borderColor = "#e53935";

  const todoStyle = borderColor
    ? { borderLeft: `6px solid ${borderColor}` }
    : undefined;

  const textClass = task.completed
    ? task.completedEarly
      ? "completed completed-early"
      : task.completedExpired
        ? "completed completed-expired"
        : "completed"
    : "incompleted";

  return (
    <div className={`Todo ${shaking ? "shake" : ""}`} style={todoStyle}>
      <p
        onClick={() => toggleComplete(task.id)}
        className={`cursorPoint ${textClass}`}
      >
        {task.task}
      </p>

      {hasActiveTimer && (
        <span className="todo-timer-badge" style={{ color: timerColor }}>
          {formatRemaining(remaining)}
        </span>
      )}

      <div className="todo-buttons">
        {!task.completed && !settingTimer && (
          <TimerIcon
            className="timer-icon todo-icon"
            size={20}
            onClick={() => setSettingTimer(true)}
          />
        )}
        {settingTimer && (
          <form className="todo-timer-form" onSubmit={handleSetTimer}>
            <input
              className="todo-timer-input"
              type="number"
              step="0.1"
              min="0"
              autoFocus
              value={minutes}
              placeholder="мин"
              onChange={(e) => setMinutes(e.target.value)}
            />
            <CheckIcon
              className="todo-icon"
              size={20}
              onClick={handleSetTimer}
            />
          </form>
        )}
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
