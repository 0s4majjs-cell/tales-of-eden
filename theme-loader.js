// theme-loader.js
(function () {
  const STORAGE_KEY = "toe_theme_v1";
  const root = document.documentElement;

  const DEFAULTS = {
    "--color-bg-main-top": "#020617",
    "--color-bg-main-bottom": "#020617",
    "--color-accent": "#38bdf8",
    "--color-text-main": "#e5e7eb",
    "--color-text-muted": "#9ca3af"
  };

  function applyTheme(vars) {
    const theme = Object.assign({}, DEFAULTS, vars || {});
    Object.keys(theme).forEach((key) => {
      root.style.setProperty(key, theme[key]);
    });
    return theme;
  }

  function loadTheme() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return applyTheme({});
      }
      const data = JSON.parse(raw) || {};
      return applyTheme(data);
    } catch (e) {
      console.warn("[theme-loader] failed to load theme:", e);
      return applyTheme({});
    }
  }

  let currentTheme = loadTheme();

  const api = {
    getTheme() {
      return Object.assign({}, currentTheme);
    },
    getDefaults() {
      return Object.assign({}, DEFAULTS);
    },
    setTheme(partial) {
      currentTheme = Object.assign({}, currentTheme, partial || {});
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTheme));
      applyTheme(currentTheme);
    },
    resetTheme() {
      currentTheme = Object.assign({}, DEFAULTS);
      localStorage.removeItem(STORAGE_KEY);
      applyTheme(currentTheme);
    }
  };

  window.__toeTheme = api;
})();
