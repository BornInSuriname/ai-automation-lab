"use strict";
(function () {
  const presets = Array.isArray(window.AI_PRESETS) ? window.AI_PRESETS : [];
  const grid = document.getElementById("template-grid");
  const search = document.getElementById("template-search");
  const filter = document.getElementById("template-filter");
  const counter = document.getElementById("template-count");
  const empty = document.getElementById("template-empty");

  function render() {
    const term = search.value.trim().toLocaleLowerCase("nl-NL");
    const category = filter.value;
    const items = presets.filter(function (item) {
      const matchCategory = category === "Alle" || item.category === category;
      const combined = (item.title + " " + item.description + " " + item.subject).toLocaleLowerCase("nl-NL");
      return matchCategory && combined.includes(term);
    });
    grid.replaceChildren();
    for (const item of items) {
      const card = document.createElement("article");
      card.className = "library-card";
      const badge = document.createElement("span");
      badge.className = "library-tag";
      badge.textContent = item.category;
      const heading = document.createElement("h3");
      heading.textContent = item.title;
      const description = document.createElement("p");
      description.textContent = item.description;
      const link = document.createElement("a");
      link.href = "studio.html?preset=" + encodeURIComponent(item.id);
      link.textContent = "Gebruik dit sjabloon ↗";
      card.append(badge, heading, description, link);
      grid.appendChild(card);
    }
    counter.textContent = items.length === 1 ? "1 workflow gevonden" : items.length + " workflows gevonden";
    empty.hidden = items.length !== 0;
  }

  search.addEventListener("input", render);
  filter.addEventListener("change", render);
  render();
})();
