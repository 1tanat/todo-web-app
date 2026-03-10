import { TrashIcon, CheckIcon } from "@phosphor-icons/react";
import { MAX_TAB_NAME_LENGTH } from "../constants";

export function TabEdit({
  tabValue,
  tabName,
  editValue,
  setEditValue,
  onSave,
  onBlur,
  onKeyDown,
  onDelete,
  canDelete,
}) {
  const isTooLong = editValue.length > MAX_TAB_NAME_LENGTH;

  return (
    <div className="category-tab category-tab--editing">
      <div className="category-tab-edit-wrap">
        <input
          type="text"
          className={`category-tab-input ${isTooLong ? "too-long" : ""}`}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          maxLength={MAX_TAB_NAME_LENGTH + 5}
          autoFocus
          aria-label="Название вкладки"
          aria-invalid={isTooLong}
        />
        <span
          className={`category-tab-char-hint ${isTooLong ? "too-long" : ""}`}
          role="status"
          aria-live="polite"
        >
          {editValue.length}/{MAX_TAB_NAME_LENGTH}
        </span>
      </div>
      <button
        type="button"
        className="category-tab-action category-tab-action--save"
        onMouseDown={(e) => {
          e.preventDefault();
          onSave();
        }}
        title="Сохранить"
        aria-label="Сохранить"
      >
        <CheckIcon size={18} />
      </button>
      {canDelete && (
        <button
          type="button"
          className="category-tab-action category-tab-action--delete"
          onMouseDown={(e) => {
            e.preventDefault();
            onDelete();
          }}
          title="Удалить вкладку"
          aria-label="Удалить вкладку"
        >
          <TrashIcon size={18} />
        </button>
      )}
    </div>
  );
}
