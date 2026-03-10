import { STORAGE_KEY } from "../constants";

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    const data = JSON.parse(raw);
    if (
      !data ||
      !Array.isArray(data.categories) ||
      data.categories.length === 0
    )
      return null;

    const categories = data.categories;
    const todos =
      data.todos && typeof data.todos === "object" ? data.todos : {};
    const activeTab =
      data.activeTab && categories.some((c) => c.id === data.activeTab)
        ? data.activeTab
        : categories[0].id;
    const theme = data.theme === "dark" ? "dark" : "light";
    categories.forEach((cat) => {
      if (!(cat.id in todos)) todos[cat.id] = [];
    });

    return { categories, todos, activeTab, theme };
  } catch {
    return null;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}
