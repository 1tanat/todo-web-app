import { MoonStarsIcon, SunIcon } from "@phosphor-icons/react";

export function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle theme-btn"
      onClick={onToggle}
      aria-label={theme === "light" ? "Тёмная тема" : "Светлая тема"}
    >
      {theme === "light" ? (
        <MoonStarsIcon size={32} />
      ) : (
        <SunIcon color="#f7f7f7" size={32} />
      )}
    </button>
  );
}
