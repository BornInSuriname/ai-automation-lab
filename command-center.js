"use strict";

const STORAGE_KEY = "fabian-ai-command-center-tasks-v1";
const ALLOWED_CATEGORIES = Object.freeze({
  algemeen: "Algemeen",
  ai: "AI & technologie",
  zuidoost: "Zuidoost",
  creatief: "Creatief"
});

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const categoryInput = document.getElementById("task-category");
const taskList = document.getElementById("task-list");
const counter = document.getElementById("task-count");
const heroCounter = document.getElementById("open-tasks");
const emptyMessage = document.getElementById("empty-tasks");
const feedback = document.getElementById("task-feedback");
const storageMessage = document.getElementById("storage-message");
const exportButton = document.getElementById("export-tasks");
const clearButton = document.getElementById("clear-tasks");
const filters = Array.from(document.querySelectorAll(".filter"));

function validTask(item) {
  return Boolean(item &&
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    item.title.trim().length > 0 &&
    item.title.length <= 4000 &&
    typeof item.done === "boolean" &&
    Object.prototype.hasOwnProperty.call(ALLOWED_CATEGORIES, item.category));
}

function normalizeTasks(items) {
  if (!Array.isArray(items)) return [];
  return items.filter(validTask).slice(0, 150).map(function (item) {
    return {
      id: item.id,
      title: item.title,
      category: item.category,
      done: item.done,
      createdAt: typeof item.createdAt === "string" ? item.createdAt : ""
    };
  });
}

function getStorage() {
  try {
    const testKey = STORAGE_KEY + "-test";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch (e) {
    return null;
  }
}

const storage = getStorage();
let tasks = [];
let filter = "all";

function readTasks() {
  if (!storage) return [];
  try {
    return normalizeTasks(JSON.parse(storage.getItem(STORAGE_KEY) || "[]"));
  } catch (e) {
    return [];
  }
}

function persist() {
  if (!storage) return false;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (e) {
    storageMessage.textContent = "Opslaan in deze browser is mislukt. De taken blijven alleen zichtbaar zolang deze pagina geopend is.";
    return false;
  }
}

function visibleTasks(items, mode) {
  if (mode === "open") return items.filter(function (task) { return !task.done; });
  if (mode === "done") return items.filter(function (task) { return task.done; });
  return items;
}

function showMessage(message) {
  feedback.textContent = message;
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
}

function render() {
  const open = tasks.filter(function (task) { return !task.done; }).length;
  heroCounter.textContent = String(open);
  counter.textContent = tasks.length + (tasks.length === 1 ? " taak" : " taken") + " · " + open + " open";
  exportButton.disabled = tasks.length === 0;
  clearButton.disabled = tasks.length === 0;
  filters.forEach(function (button) {
    const active = button.dataset.filter === filter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const selection = visibleTasks(tasks, filter);
  taskList.replaceChildren();
  emptyMessage.hidden = selection.length > 0;
  if (!selection.length) {
    emptyMessage.textContent = tasks.length === 0
      ? "Nog geen taken. Voeg je eerste taak toe."
      : "Geen taken binnen dit filter.";
    return;
  }

  selection.forEach(function (task) {
    const item = document.createElement("li");
    item.className = "task-item" + (task.done ? " completed" : "");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = task.done;
    check.setAttribute("aria-label", "Taak afronden: " + task.title.slice(0, 100));
    check.addEventListener("change", function () {
      task.done = check.checked;
      persist();
      render();
    });

    const body = document.createElement("div");
    body.className = "task-body";
    const name = document.createElement("span");
    name.className = "task-title";
    name.textContent = task.title; // Text only: never parse user content as HTML.
    const meta = document.createElement("span");
    meta.className = "task-meta";
    meta.textContent = ALLOWED_CATEGORIES[task.category] + (formatDate(task.createdAt) ? " · " + formatDate(task.createdAt) : "");
    body.append(name, meta);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-task";
    remove.textContent = "Wissen";
    remove.setAttribute("aria-label", "Verwijder taak: " + task.title.slice(0, 100));
    remove.addEventListener("click", function () {
      tasks = tasks.filter(function (other) { return other.id !== task.id; });
      persist();
      render();
      showMessage("Taak verwijderd.");
    });

    item.append(check, body, remove);
    taskList.appendChild(item);
  });
}

function newId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return String(Date.now()) + "-" + Math.random().toString(36).slice(2);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = titleInput.value.trim();
  if (!name) {
    titleInput.setCustomValidity("Vul eerst een taak in.");
    titleInput.reportValidity();
    return;
  }
  titleInput.setCustomValidity("");
  if (name.length > 4000) {
    showMessage("De taak is te lang. Splits deze op in kleinere stappen.");
    return;
  }
  if (tasks.length >= 150) {
    showMessage("Je takenlijst zit vol (150 taken). Wis eerst afgeronde taken.");
    return;
  }
  const category = Object.prototype.hasOwnProperty.call(ALLOWED_CATEGORIES, categoryInput.value) ? categoryInput.value : "algemeen";
  tasks.unshift({ id: newId(), title: name, category, done: false, createdAt: new Date().toISOString() });
  const saved = persist();
  titleInput.value = "";
  render();
  showMessage(saved ? "Taak toegevoegd en lokaal opgeslagen." : "Taak toegevoegd; opslaan op het toestel is niet beschikbaar.");
});

titleInput.addEventListener("input", function () {
  titleInput.setCustomValidity("");
});

filters.forEach(function (button) {
  button.addEventListener("click", function () {
    filter = button.dataset.filter;
    render();
  });
});

clearButton.addEventListener("click", function () {
  if (tasks.length === 0) return;
  if (!window.confirm("Alle taken op dit toestel wissen? Dit kun je niet ongedaan maken.")) return;
  tasks = [];
  persist();
  render();
  showMessage("Alle taken zijn gewist.");
});

exportButton.addEventListener("click", function () {
  if (tasks.length === 0) return;
  const content = [
    "Fabian AI Command Center · Taken",
    "Geëxporteerd op " + new Date().toLocaleDateString("nl-NL"),
    "",
    ...tasks.map(function (task) {
      return (task.done ? "[x] " : "[ ] ") + task.title +
        " (" + ALLOWED_CATEGORIES[task.category] + ")";
    })
  ].join("\n");

  const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "fabian-ai-taken.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  showMessage("Je takenbestand wordt via de browser bewaard.");
});

tasks = readTasks();
if (!storage) {
  storageMessage.textContent = "Lokale browseropslag is geblokkeerd. De taken verdwijnen zodra je de pagina sluit of ververst.";
}
render();
