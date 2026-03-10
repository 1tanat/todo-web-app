import Tab from "./Tab";
import { MAX_TABS } from "../constants";

export function CategoryTabs({
  categories,
  activeTab,
  setActiveTab,
  onAddCategory,
  onRenameCategory,
  onDeleteCategory,
  onEditingChange,
}) {
  const canDelete = categories.length > 1;
  const canAdd = categories.length < MAX_TABS;

  return (
    <div className="category-tabs">
      {categories.map((cat) => (
        <Tab
          key={cat.id}
          tabValue={cat.id}
          tabName={cat.name}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onRename={onRenameCategory}
          onDelete={onDeleteCategory}
          canDelete={canDelete}
          onEditingChange={onEditingChange}
        />
      ))}
      {canAdd && (
        <button
          type="button"
          className="category-tab-add"
          onClick={onAddCategory}
          title="Добавить вкладку"
          aria-label="Добавить вкладку"
        >
          +
        </button>
      )}
    </div>
  );
}
