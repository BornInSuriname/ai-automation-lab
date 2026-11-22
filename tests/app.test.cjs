"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

function setup() {
  const elements = new Map();
  function element(id) {
    if (!elements.has(id)) {
      elements.set(id, {
        id,
        value: "",
        checked: false,
        disabled: true,
        textContent: "",
        events: Object.create(null),
        addEventListener(event, handler) { this.events[event] = handler; },
        setCustomValidity(message) { this.validationMessage = message; },
        reportValidity() { this.didReport = true; return false; },
        focus() {},
        select() {},
        setSelectionRange() {},
        appendChild() {},
        remove() {},
        click() {}
      });
    }
    return elements.get(id);
  }

  const document = {
    getElementById: element,
    querySelector: element,
    createElement: element,
    body: { appendChild() {} }
  };

  const context = vm.createContext({
    document,
    navigator: {},
    window: { isSecureContext: true, location: { search: "" } },
    URLSearchParams,
    Blob,
    URL: { createObjectURL() { return "blob:test"; }, revokeObjectURL() {} },
    console
  });
  vm.runInContext(source, context, { filename: "app.js" });
  const buildPrompt = vm.runInContext("buildPrompt", context);
  return { elements, element, buildPrompt };
}

function basic(workflow) {
  return {
    workflow,
    subject: "Een publieke demonstratie",
    context: "Voor inwoners, met beperkte middelen.",
    length: "normaal",
    sources: true,
    counterevidence: true
  };
}

test("alle vier workflows produceren een bruikbare, verschillende opdracht", () => {
  const app = setup();
  const types = ["onderzoek", "actie", "project", "creatief"];
  const outputs = types.map(type => app.buildPrompt(basic(type)));
  assert.equal(new Set(outputs).size, 4);
  for (const output of outputs) {
    assert.match(output, /Een publieke demonstratie/);
    assert.match(output, /Geen aanvullende context meegegeven|Voor inwoners/);
    assert.match(output, /Verzin geen feiten/);
    assert.match(output, /Oplevering/);
  }
});

test("de optionele bron- en tegenbewijscriteria schakelen aan en uit", () => {
  const app = setup();
  const rich = app.buildPrompt(basic("onderzoek"));
  assert.match(rich, /verifieerbare bronnen|controleerbare bronnen/);
  assert.match(rich, /sterkste tegenargument/i);

  const limited = app.buildPrompt({
    ...basic("onderzoek"),
    sources: false,
    counterevidence: false
  });
  assert.doesNotMatch(limited, /publicatiedatums/);
  assert.doesNotMatch(limited, /welk nieuw bewijs je conclusie zou veranderen/);
});

test("een leeg onderwerp maakt geen opdracht aan", () => {
  const app = setup();
  app.element("onderwerp").value = "  ";
  app.element("prompt-form").events.submit({ preventDefault() {} });
  assert.equal(app.element("resultaat").value, "");
  assert.equal(app.element("onderwerp").didReport, true);
});

test("een geldige invoer werkt, en reset wist uitvoer en activeert geen acties", () => {
  const app = setup();
  app.element("onderwerp").value = "Test op mijn telefoon";
  app.element("workflow").value = "project";
  app.element("lengte").value = "kort";
  app.element("bronnen").checked = true;
  app.element("tegenbewijs").checked = true;

  app.element("prompt-form").events.submit({ preventDefault() {} });
  assert.match(app.element("resultaat").value, /Test op mijn telefoon/);
  assert.equal(app.element("kopieer").disabled, false);
  assert.equal(app.element("download").disabled, false);
  assert.match(app.element(".status-pill").textContent, /gereed/);

  app.element("prompt-form").events.reset();
  assert.equal(app.element("resultaat").value, "");
  assert.equal(app.element("kopieer").disabled, true);
  assert.equal(app.element("download").disabled, true);
});

test("de inhoud blijft platte tekst en wordt niet als HTML geïnterpreteerd", () => {
  const app = setup();
  const untrusted = "<img src=x onerror=alert(1)>";
  const output = app.buildPrompt({ ...basic("actie"), context: untrusted });
  assert.ok(output.includes(untrusted));
  assert.match(source, /result\.value = prompt/);
  assert.doesNotMatch(source, /\.innerHTML\s*=/);
});
