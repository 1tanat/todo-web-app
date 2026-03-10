import { useState, useRef, useEffect } from "react";
import { MAX_TAB_NAME_LENGTH } from "../constants";
import { TabEdit } from "./TabEdit";

export default function Tab({
  setActiveTab,
  activeTab,
  tabValue,
  tabName,
  onRename,
  onDelete,
  canDelete,
  onEditingChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(tabName);
  const clickTimeout = useRef(null);

  useEffect(() => {
    onEditingChange?.(isEditing);
  }, [isEditing, onEditingChange]);

  const handleClick = () => {
    if (isEditing) return;
    clickTimeout.current = setTimeout(() => {
      setActiveTab(tabValue);
      clickTimeout.current = null;
    }, 200);
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
    setIsEditing(true);
    setEditValue(tabName);
  };

  const handleSave = () => {
    const name = editValue.trim();
    if (!name || name.length > MAX_TAB_NAME_LENGTH) return;
    onRename?.(tabValue, name);
    setIsEditing(false);
  };

  const handleBlur = () => {
    const name = editValue.trim();
    if (name && name.length <= MAX_TAB_NAME_LENGTH) {
      onRename?.(tabValue, name);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setEditValue(tabName);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete?.(tabValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TabEdit
        tabValue={tabValue}
        tabName={tabName}
        editValue={editValue}
        setEditValue={setEditValue}
        onSave={handleSave}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onDelete={handleDelete}
        canDelete={canDelete}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`category-tab-btn ${activeTab === tabValue ? "active" : ""}`}
    >
      {tabName}
    </button>
  );
}
