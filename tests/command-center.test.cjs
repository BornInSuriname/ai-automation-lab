"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const code = fs.readFileSync(path.join(__dirname, "..", "command-center.js"), "utf8");
const html = fs.readFileSync(path.join(__dirname, "..", "studio.html"), "utf8");

function mock() {
  const elements = new Map();
  const values = new Map();
  const filters = ["all", "open", "done"].map(function (value) {
    return {
      dataset: { filter: value },
      events: {},
      classList: { toggle() {} },
      setAttribute() {},
      addEventListener(name, handler) { this.events[name] = handler; }
    };
  });
  function element(id) {
    if (!elements.has(id)) {
      elements.set(id, {
        id,
        value: "",
        textContent: "",
        disabled: false,
        checked: false,
        hidden: false,
        events: {},
        classList: { toggle() {} },
        addEventListener(name, handler) { this.events[name] = handler; },
        setCustomValidity() {},
        reportValidity() {},
        setAttribute() {},
        replaceChildren() { this.children = []; },
        appendChild(child) { (this.children ||= []).push(child); },
        append(...children) { (this.children ||= []).push(...children); },
        remove() {},
        click() {}
      });
    }
    return elements.get(id);
  }
  const document = {
    getElementById: element,
    querySelectorAll() { return filters; },
    createElement() { return element(Math.random().toString()); },
    body: { appendChild() {} }
  };
  const storage = {
    setItem(k,v) { values.set(k,v); },
    getItem(k) { return values.get(k) ?? null; },
    removeItem(k) { values.delete(k); }
  };
  const window = { localStorage: storage, confirm() { return true; }, crypto: { randomUUID() { return "test-uuid"; } } };
  const context = vm.createContext({ document, window, URL: { createObjectURL() { return "blob:test"; }, revokeObjectURL() {} }, Blob, Date, console });
  vm.runInContext(code, context);
  return { element, context, storage };
}

test("full research questions are allowed in the studio", function () {
  assert.match(html, /<textarea id="onderwerp"/);
  assert.doesNotMatch(html, /id="onderwerp"[^>]*maxlength/);
});

test("normalization ignores invalid stored entries", function () {
  const {context} = mock();
  const result = vm.runInContext('normalizeTasks([{id:"a",title:"Taak",category:"ai",done:false},{id:"b",title:"",category:"ai",done:false},{id:"c",title:"Test",category:"unknown",done:true}])', context);
  assert.equal(result.length, 1);
  assert.equal(result[0].title, "Taak");
});

test("task filters work", function () {
  const {context} = mock();
  const value = vm.runInContext('visibleTasks([{done:false},{done:true},{done:false}],"open").length', context);
  assert.equal(value, 2);
  const completed = vm.runInContext('visibleTasks([{done:false},{done:true}],"done").length', context);
  assert.equal(completed, 1);
});

test("task creation saves locally and a full reset clears the list", function () {
  const {element, storage} = mock();
  element("task-title").value = "Mijn AI-project testen";
  element("task-category").value = "ai";
  element("task-form").events.submit({preventDefault() {}});
  assert.match(storage.getItem("fabian-ai-command-center-tasks-v1"), /Mijn AI-project testen/);
  assert.equal(element("open-tasks").textContent, "1");
  element("clear-tasks").events.click();
  assert.equal(element("open-tasks").textContent, "0");
});

test("user input is displayed as text, not injected as HTML", function () {
  assert.match(code, /name\.textContent = task\.title/);
  assert.doesNotMatch(code, /\.innerHTML\s*=/);
  assert.doesNotMatch(code, /\bfetch\s*\(/);
});
