export function CategoryTabs({ activeTab, setActiveTab }) {
  return (
    <div className="category-tabs">
      <button
        onClick={() => setActiveTab("personal")}
        className={activeTab === "personal" ? "active" : ""}
      >
        Личное
      </button>

      <button
        onClick={() => setActiveTab("work")}
        className={activeTab === "work" ? "active" : ""}
      >
        Работа
      </button>

      <button
        onClick={() => setActiveTab("study")}
        className={activeTab === "study" ? "active" : ""}
      >
        Учёба
      </button>
    </div>
  );
}
