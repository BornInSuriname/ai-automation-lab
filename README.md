# AI & Automation Lab

Een openbaar experimenteerproject van Fabian Vroom, gemaakt om **AI praktisch en begrijpelijk** te gebruiken.

## Experiment 01: AI Workflow Studio

De eerste werkende demonstratie is een **mobielvriendelijke opdrachtbouwer**. Je kiest het soort taak, vult een onderwerp in en maakt een gestructureerde opdracht voor een AI-chat.

**Open de webtool:** https://borninsuriname.github.io/ai-automation-lab/

### Wat werkt er?

- Vier soorten opdrachten: **onderzoek en feitencheck**, **actieplan**, **AI-project en automatisering**, **creatief concept**.
- Eigen onderwerp en optionele context invullen.
- Keuze uit een korte, normale of uitgebreide uitwerking.
- Opties voor verifieerbare bronnen en controle van aannames/tegenargumenten.
- De gemaakte opdracht kopiëren of als **.txt** opslaan.
- Geschikt voor mobiel en toetsenbordbediening, met een interface in het Nederlands.

**Belangrijk:** de studio **bouwt prompts**, maar is geen zelfstandige AI-agent, voert geen onderzoek uit, controleert zelf geen bronnen en start geen automatische processen. De gebruiker kiest zelf in welke AI-chat de opdracht wordt gebruikt.

### Gebruik op je telefoon

1. Open de [AI Workflow Studio](https://borninsuriname.github.io/ai-automation-lab/) in je browser.
2. Kies **Soort opdracht** en vul **Onderwerp** in.
3. Voeg eventueel context toe en kies je kwaliteitsinstellingen.
4. Druk op **Maak mijn opdracht**.
5. Kies **Kopieer opdracht** en plak de tekst in een AI-chat naar keuze.

### Privacy en veiligheid

- Deze demonstratie verwerkt de tekst **lokaal in de browser** met JavaScript.
- Geen API-sleutels, account, analytics, trackers of netwerkverzoeken naar een AI-dienst.
- De invoer wordt in deze versie niet op een server opgeslagen.
- Wat je **zelf** vervolgens in een AI-chat plakt, valt onder de voorwaarden van die dienst.
- **Voer geen vertrouwelijke persoonsgegevens, wachtwoorden, API-sleutels of niet-openbare dossiers in.**

### Techniek

Statische website zonder frameworks, dependencies of buildstap:

| Bestand | Functie |
|---|---|
| `index.html` | Toegankelijke HTML-interface |
| `styles.css` | Responsive ontwerp |
| `app.js` | Promptlogica, kopiëren en opslaan |
| `.nojekyll` | Directe publicatie als statische GitHub Pages-site |

De website kan ook lokaal worden bekeken door `index.html` te openen. Voor automatisch kopiëren is in sommige browsers HTTPS of een beveiligde context nodig; daarom is een handmatige terugval ingebouwd.

### Handmatige acceptatiecontrole

- [ ] Leeg onderwerp geeft een validatiemelding.
- [ ] Alle vier soorten taken leveren een andere passende opdracht.
- [ ] De knoppen **Kopieer** en **Bewaar** werken na genereren.
- [ ] **Wis invoer** wist ook het eerdere resultaat.
- [ ] De interface blijft bruikbaar op een smal telefoonscherm.
- [ ] Geen persoonlijke informatie of netwerkverzoeken naar externe AI-diensten.

Dit is een testlijst, **geen verklaring dat alle browsertests al zijn uitgevoerd**.

### Wat volgt?

1. Een kleine bibliotheek met herbruikbare workflows.
2. Versiebeheer van prompts en een eenvoudige kwaliteitstest.
3. Verkennen of **echte** automatisering nodig en verantwoord is, vóórdat externe accounts of gegevens worden gekoppeld.

## Auteurschap

Fabian Vroom · Amsterdam Zuidoost  
Persoonlijk portfolio: https://borninsuriname.github.io/

*English: This is a small, privacy-conscious browser tool for creating structured prompts. It does not call an AI model or run automations.*
