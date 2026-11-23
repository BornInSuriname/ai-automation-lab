"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

function read(name) {
  return fs.readFileSync(path.join(__dirname, "..", name), "utf8");
}
const presetsCode = read("presets.js");
const appCode = read("app.js");
const libraryCode = read("workflow-library.js");

function getPresets() {
  const context = vm.createContext({window: {}});
  vm.runInContext(presetsCode, context);
  return context.window.AI_PRESETS;
}

test("eight distinct public presets have valid fields", () => {
  const presets = getPresets();
  assert.equal(presets.length, 8);
  assert.equal(new Set(presets.map(p => p.id)).size, 8);
  for (const p of presets) {
    assert.match(p.id, /^[a-z0-9-]{1,40}$/);
    assert.ok(["onderzoek","actie","project","creatief"].includes(p.workflow));
    assert.ok(["Zuidoost","Technologie","Creatief"].includes(p.category));
    assert.ok(["kort","normaal","uitgebreid"].includes(p.length));
    assert.ok(p.title.length > 5 && p.description.length > 10);
    assert.ok(p.subject.length > 5 && p.context.length > 20 && p.context.length <= 1500);
    assert.equal(typeof p.sources, "boolean");
    assert.equal(typeof p.counterevidence, "boolean");
  }
});

test("studio loads preset library before generator", () => {
  const html = read("studio.html");
  assert.ok(html.indexOf('src="presets.js"') > 0);
  assert.ok(html.indexOf('src="app.js"') > html.indexOf('src="presets.js"'));
  assert.match(read("workflows.html"), /id="template-grid"/);
  assert.match(libraryCode, /link\.href = "studio\.html\?preset="/);
  assert.doesNotMatch(libraryCode, /\.innerHTML\s*=/);
});

function setupStudio(query) {
  const elements = new Map();
  function element(id) {
    if (!elements.has(id)) {
      elements.set(id, {
        value: "", checked: false, disabled: true, textContent: "",
        events: Object.create(null),
        addEventListener(event, handler) { this.events[event] = handler; },
        setCustomValidity() {}, reportValidity() {},
        focus() {}, select() {}, setSelectionRange() {},
        appendChild() {}, remove() {}, click() {}
      });
    }
    return elements.get(id);
  }
  const context = vm.createContext({
    document: {
      getElementById: element,
      querySelector: element,
      createElement: element,
      body: {appendChild() {}}
    },
    window: { location: { search: query }, isSecureContext: true },
    URLSearchParams,
    navigator: {},
    Blob,
    URL: {createObjectURL() { return "blob:test"; }, revokeObjectURL() {}},
    console
  });
  vm.runInContext(presetsCode, context);
  vm.runInContext(appCode, context);
  return {element, context};
}

test("known preset fills the full subject, extra context and options", () => {
  const {element} = setupStudio("?preset=bestuursvragen");
  assert.equal(element("workflow").value, "onderzoek");
  assert.match(element("onderwerp").value, /drie mondelinge vragen/);
  assert.match(element("context").value, /dagelijks bestuur/);
  assert.equal(element("bronnen").checked, true);
  assert.equal(element("tegenbewijs").checked, true);
  assert.match(element(".status-pill").textContent || "", /^$/);
  assert.match(element("feedback").textContent, /Sjabloon geladen/);
});

test("invalid preset is ignored and cannot inject subject through URL", () => {
  const {element} = setupStudio("?preset=%3Cscript%3E&subject=untrusted");
  assert.equal(element("onderwerp").value, "");
  assert.equal(element("context").value, "");
});

test("creative preset disables unnecessary citations without removing the option", () => {
  const {element} = setupStudio("?preset=fromu-song");
  assert.equal(element("workflow").value, "creatief");
  assert.equal(element("bronnen").checked, false);
  assert.equal(element("tegenbewijs").checked, false);
});
