"use strict";

const FORMATS = Object.freeze({
  kort: "Maak het antwoord kort: maximaal ongeveer 250 woorden, met alleen de kern en een concrete vervolgstap.",
  normaal: "Geef een helder en praktisch antwoord met korte alinea's, onderbouwde afwegingen en concrete vervolgstappen.",
  uitgebreid: "Werk het onderwerp grondig uit: deelvragen, aannames, bewijs, tegenbewijs, beperkingen, risico's, haalbaarheid en een uitvoerbaar stappenplan."
});

const WORKFLOWS = Object.freeze({
  onderzoek: {
    title: "Onderzoek en feitencheck",
    role: "Je bent een onafhankelijke onderzoeker die zorgvuldig en kritisch werkt.",
    goal: "Onderzoek de hoofdvraag en scheid wat vaststaat van wat nog niet bewezen is.",
    tasks: [
      "Formuleer de hoofdvraag en maximaal vijf gerichte deelvragen.",
      "Scheid feiten, signalen, aannames, interpretaties en voorstellen.",
      "Onderzoek meerdere verklaringen en maak geen causaal verband zonder voldoende bewijs.",
      "Benoem welke mensen gevolgen ervaren en welke informatie nog ontbreekt.",
      "Sluit af met een controleerbare conclusie, onzekerheden en drie mogelijke vervolgacties."
    ],
    deliverable: "Een kernantwoord, een overzicht van bewijs en onzekerheid, de belangrijkste tegenwerping en maximaal drie concrete acties."
  },
  actie: {
    title: "Actieplan en opvolging",
    role: "Je bent een projectcoördinator die verantwoordelijkheden en voortgang concreet maakt.",
    goal: "Zet het onderwerp om in een klein, haalbaar en toetsbaar actieplan.",
    tasks: [
      "Bepaal het doel, de doelgroep en wat aantoonbaar moet veranderen.",
      "Splits het werk op in kleine acties en geef per actie een mogelijke verantwoordelijke.",
      "Noem benodigde middelen, afhankelijkheden en realistische termijnen, zonder verzonnen toezeggingen.",
      "Benoem belangrijkste risico's, alternatieven en het sterkste bezwaar.",
      "Leg uit hoe en wanneer resultaten worden gecontroleerd en hoe betrokkenen terugkoppeling krijgen."
    ],
    deliverable: "Een compacte actietabel met actie, eigenaar (of nog vast te stellen), termijn, middelen en toetsbaar resultaat."
  },
  project: {
    title: "AI-project en automatisering",
    role: "Je bent een pragmatische productontwerper en AI-automatiseringsadviseur.",
    goal: "Werk een idee uit tot een veilig en haalbaar klein prototype.",
    tasks: [
      "Beschrijf het concrete gebruikersprobleem, de doelgroep en wat de oplossing wel en niet doet.",
      "Ontwerp eerst een minimale werkende versie en onderscheid handmatige stappen van echte automatisering.",
      "Noem geschikte bouwstenen met aandacht voor mobiel gebruik, onderhoud en kosten.",
      "Controleer welke data nodig zijn; gebruik geen echte geheimen, tokens of vertrouwelijke persoonsgegevens in voorbeeldcode.",
      "Beschrijf drie testgevallen, risico's, beperkingen en een haalbare vervolgstap."
    ],
    deliverable: "Een kort productplan met de eerste werkende versie, gebruikersstappen, veiligheid, tests en volgende ontwikkeling."
  },
  creatief: {
    title: "Creatief concept",
    role: "Je bent een creatieve schrijver en conceptontwikkelaar met gevoel voor publiek, ritme en heldere taal.",
    goal: "Ontwikkel een origineel en menselijk concept met een duidelijke boodschap.",
    tasks: [
      "Bepaal voor wie het is bedoeld, welk gevoel het moet oproepen en wat de kernboodschap is.",
      "Ontwikkel een herkenbaar hoofdidee en vermijd clichématige of lege formuleringen.",
      "Stel een logische opbouw voor en zorg dat iedere passage of onderdeel iets toevoegt.",
      "Controleer toon, natuurlijk taalgebruik en samenhang; presenteer fictie niet als feit.",
      "Geef één sterke voorkeursrichting en een relevante creatieve variant."
    ],
    deliverable: "Een helder concept met doel, publiek, kernboodschap, uitgewerkte opbouw en een alternatief."
  }
});

const form = document.getElementById("prompt-form");
const subject = document.getElementById("onderwerp");
const context = document.getElementById("context");
const workflow = document.getElementById("workflow");
const length = document.getElementById("lengte");
const sources = document.getElementById("bronnen");
const counterevidence = document.getElementById("tegenbewijs");
const result = document.getElementById("resultaat");
const copyButton = document.getElementById("kopieer");
const downloadButton = document.getElementById("download");
const feedback = document.getElementById("feedback");
const stateLabel = document.querySelector(".status-pill");

function clean(text) {
  return String(text || "").replace(/\r\n?/g, "\n").trim();
}

function buildPrompt(values) {
  const selected = WORKFLOWS[values.workflow] || WORKFLOWS.onderzoek;
  const lines = [
    "AI-OPDRACHT",
    "",
    "Rol",
    selected.role,
    "Schrijf in helder, begrijpelijk Nederlands. Begin met de kern.",
    "",
    "Soort werk",
    selected.title,
    "",
    "Onderwerp",
    values.subject,
    "",
    "Context",
    values.context || "Geen aanvullende context meegegeven.",
    "",
    "Doel",
    selected.goal,
    "",
    "Aanpak"
  ];

  selected.tasks.forEach(function (task, index) {
    lines.push(String(index + 1) + ". " + task);
  });

  lines.push("", "Kwaliteitsafspraken");
  lines.push("- " + (FORMATS[values.length] || FORMATS.normaal));
  lines.push("- Verzin geen feiten, cijfers, besluiten, citaten, bronnen of uitgevoerde handelingen.");
  lines.push("- Maak duidelijk wat zeker, aannemelijk of nog onbekend is.");
  lines.push("- Stel alleen aanvullende vragen als een ontbrekend gegeven het resultaat wezenlijk verandert.");
  lines.push("- Gebruik geen persoonlijke of vertrouwelijke gegevens die niet nodig zijn.");

  if (values.sources) {
    lines.push("- Onderbouw relevante feitelijke claims met controleerbare bronnen en publicatiedatums. Controleer actuele informatie als brononderzoek beschikbaar is.");
    lines.push("- Als je geen actuele bronnen kunt raadplegen, zeg dat duidelijk. Claim geen broncontrole die je niet hebt uitgevoerd.");
  }
  if (values.counterevidence) {
    lines.push("- Onderzoek het sterkste tegenargument, benoem onzekere aannames en leg uit welk nieuw bewijs je conclusie zou veranderen.");
  }

  lines.push("", "Oplevering", selected.deliverable);
  lines.push("", "Let op: dit is een opdracht voor een AI-assistent, geen bewijs dat het gevraagde onderzoek of werk al is uitgevoerd.");

  return lines.join("\n");
}

function updateFeedback(message) {
  feedback.textContent = message;
}

subject.addEventListener("input", function () {
  subject.setCustomValidity("");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const value = clean(subject.value);
  if (!value) {
    subject.setCustomValidity("Vul eerst een onderwerp in.");
    subject.reportValidity();
    return;
  }

  const prompt = buildPrompt({
    workflow: workflow.value,
    subject: value,
    context: clean(context.value),
    length: length.value,
    sources: sources.checked,
    counterevidence: counterevidence.checked
  });

  result.value = prompt;
  copyButton.disabled = false;
  downloadButton.disabled = false;
  stateLabel.textContent = "Opdracht gereed";
  updateFeedback("Je opdracht is gemaakt. Je kunt hem nu kopiëren of als tekstbestand bewaren.");
});

form.addEventListener("reset", function () {
  subject.setCustomValidity("");
  result.value = "";
  copyButton.disabled = true;
  downloadButton.disabled = true;
  stateLabel.textContent = "Klaar om te maken";
  updateFeedback("De opdracht en invoervelden zijn gewist.");
});

copyButton.addEventListener("click", async function () {
  if (!result.value) return;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(result.value);
    } else {
      result.focus();
      result.select();
      const success = document.execCommand("copy");
      if (!success) throw new Error("Kopiëren niet toegestaan");
      result.setSelectionRange(0, 0);
    }
    updateFeedback("Gekopieerd. Plak je opdracht in de AI-chat van jouw keuze.");
  } catch (error) {
    result.focus();
    result.select();
    updateFeedback("Automatisch kopiëren lukt niet. Selecteer en kopieer de tekst handmatig.");
  }
});

downloadButton.addEventListener("click", function () {
  if (!result.value) return;
  const file = new Blob([result.value], {type: "text/plain;charset=utf-8"});
  const address = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = address;
  link.download = "ai-opdracht.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(function () { URL.revokeObjectURL(address); }, 1000);
  updateFeedback("Je tekstbestand wordt opgeslagen via je browser.");
});
