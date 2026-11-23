# Fabian AI Command Center · versie 1.1

Een mobielvriendelijke werkplek met een **AI Workflow Studio**, **acht herbruikbare sjablonen** en een eenvoudige lokale takenlijst. Dit is een openbaar GitHub-project van Fabian Vroom.

**Open de website:** https://borninsuriname.github.io/ai-automation-lab/

## Drie onderdelen

### 1. Workflowbibliotheek

**[Open de bibliotheek](https://borninsuriname.github.io/ai-automation-lab/workflows.html)**

Zoek of filter een van de acht startopdrachten:

| Categorie | Sjablonen |
|---|---|
| Zuidoost | Beleidsdossier onderzoeken, mondelinge vragen, toezegging opvolgen, bewonerssignalen onderzoeken |
| Technologie | AI-tool bouwen, veilige app-koppeling beoordelen |
| Creatief | FROMU muziekconcept, muziekrelease plannen |

Elk sjabloon opent de AI Workflow Studio met een **vooringevuld onderwerp en context**. Je kunt de teksten volledig aanpassen. Alleen de ID van het gekozen sjabloon staat in de URL; zelf ingevoerde informatie wordt niet aan de URL toegevoegd.

Een sjabloon voor een externe app-koppeling is alleen een **onderzoeksopdracht**. Het maakt zelf geen verbinding.

### 2. AI Workflow Studio

**[Open de Studio](https://borninsuriname.github.io/ai-automation-lab/studio.html)**

- Kies onderzoek, actieplan, AI-project of creatief concept.
- Vul een volledige vraag in, zonder de oude limiet van 140 tekens.
- Pas eventueel het vooraf ingevulde sjabloon aan.
- Kies lengte, bronnen en controle van aannames/tegenargumenten.
- Kopieer de opdracht of bewaar deze als tekstbestand.

De Studio **maakt prompts**. Ze gebruikt geen AI-model, doet geen brononderzoek en voert geen externe acties uit.

### 3. Mijn taken

Op de [startpagina](https://borninsuriname.github.io/ai-automation-lab/) kun je niet-vertrouwelijke taken toevoegen, afvinken, filteren, wissen en exporteren. Deze taken worden uitsluitend **lokaal opgeslagen in de browser (localStorage)**. Ze synchroniseren niet met GitHub of tussen apparaten. Browseropslag is niet versleuteld. Bewaar hier geen gevoelige informatie.

## Privacy en beveiliging

- Geen account, trackingcode of externe AI-API.
- Sjablonen zijn openbaar en bevatten geen persoonsgegevens of geheime sleutels.
- Ingevoerde vragen in de Studio worden niet automatisch opgeslagen of verzonden.
- De takenlijst staat op het apparaat in je eigen browserprofiel; iedereen met toegang tot dat profiel zou die gegevens mogelijk kunnen lezen.
- Plak nooit wachtwoorden, API-sleutels of vertrouwelijke gegevens in deze openbare tool.
- Externe koppelingen vereisen afzonderlijke beoordeling van rechten, noodzaak, kosten, privacy en toestemming.
- Als je zelf een gegenereerde opdracht in een andere AI-dienst plakt, gelden de voorwaarden van die dienst.

## Technische opbouw

Statische HTML, CSS en JavaScript, zonder externe dependencies of betaalde infrastructuur:

| Bestand | Functie |
|---|---|
| `index.html` + `command-center.js` + `command-center.css` | Dashboard met lokaal takenoverzicht |
| `workflows.html` + `workflow-library.js` + `workflow-library.css` | Zoekbare workflowbibliotheek |
| `presets.js` | Acht goedgekeurde, openbare sjablonen |
| `studio.html` + `app.js` + `styles.css` | Aanpasbare promptgenerator |
| `tests/` | Functionele Node.js-tests |
| `.github/workflows/check.yml` | Automatische syntax- en gedragstests |

GitHub Actions voert bij wijzigingen syntaxcontroles en tests uit. Een groene testuitslag betekent niet dat iedere Android-browser interactief is getest.

## Testen op Samsung

1. Open de [bibliotheek](https://borninsuriname.github.io/ai-automation-lab/workflows.html).
2. Kies bijvoorbeeld **Drie mondelinge vragen**.
3. Controleer of de Studio het onderwerp en de context vooraf invult.
4. Pas de tekst aan en klik op **Maak mijn opdracht**.
5. Probeer **Kopieer opdracht** of **Bewaar als .txt**.
6. Controleer daarna op het dashboard of je lokale taken nog aanwezig zijn.

**Veranderde functionaliteit:** het Command Center bevat nu een bibliotheek van herbruikbare opdrachten; er zijn nog steeds geen externe AI- of app-koppelingen.

## Mogelijke vervolgstap

Eerst het mobiele gebruik verifiëren. Daarna eventueel per externe dienst een beveiligd ontwerp beoordelen, met minimale rechten en zonder geheimen in openbare broncode.

**Beheer:** Fabian Vroom · Amsterdam Zuidoost  
[Persoonlijk portfolio](https://borninsuriname.github.io/) · [GitHub-profiel](https://github.com/BornInSuriname)
