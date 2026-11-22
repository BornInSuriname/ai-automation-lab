# Fabian AI Command Center

**Eén startpagina voor AI-opdrachten, persoonlijke taken en digitale projecten.** Een open-source experiment van Fabian Vroom, ontworpen om ook op een Samsung-telefoon te gebruiken.

## Open de website

**[Fabian AI Command Center](https://borninsuriname.github.io/ai-automation-lab/)**

De website heeft momenteel twee werkende onderdelen.

### 1. AI Workflow Studio

Open rechtstreeks: [AI Workflow Studio](https://borninsuriname.github.io/ai-automation-lab/studio.html).

- Maak een bruikbare AI-opdracht voor onderzoek, actieplannen, AI-projecten of creatieve concepten.
- Beschrijf je volledige onderzoeksvraag in een **meerregelig onderwerpveld zonder korte tekenlimiet**. Extra context kan in het tweede tekstvak.
- Kies tussen beknopte, normale en uitgebreide instructies.
- Vraag in de prompt om verifieerbare bronnen, onzekerheden en tegenargumenten.
- Kopieer de prompt of bewaar die als .txt-bestand.

**De Studio gebruikt geen AI-API.** Zij stelt prompts op maar voert zelf geen onderzoek of acties uit.

### 2. Mijn taken (lokaal)

- Voeg taken toe, kies een categorie en vink afgeronde taken af.
- Filter op open of afgeronde taken.
- Verwijder taken, wis alle taken of exporteer een lokaal tekstbestand.
- De takenlijst wordt **uitsluitend in lokale browseropslag (localStorage)** opgeslagen. Er is geen account of synchronisatie. Op een ander apparaat zie je deze taken niet.

**Privacy en beperkingen:** lokale browseropslag is niet versleuteld. Andere gebruikers van hetzelfde browserprofiel kunnen mogelijk bij de gegevens. Bewaar hier dus geen persoonlijke dossiers, medische/financiële informatie, wachtwoorden of API-sleutels. Taken kunnen verdwijnen wanneer je browsergegevens verwijdert. Exporteer ze als je een back-up nodig hebt.

### Projectoverzicht

Het Command Center bevat directe links naar de werkende Studio en GitHub-repository. **Zuidoost Monitor** en **FROMU Creative Studio** worden als mogelijke toekomstige projecten vermeld; ze zijn **niet** gebouwd of gekoppeld.

## Technologie

Alle onderdelen zijn statische bestanden, zonder externe scripts, accounts of vereiste betaalde diensten:

| Bestand | Doel |
|---|---|
| `index.html` | Command Center-startpagina |
| `command-center.css` | Responsief dashboard |
| `command-center.js` | Lokale takenlijst, filters en export |
| `studio.html` | AI Workflow Studio met uitgebreid onderwerpveld |
| `styles.css` | Stijl van de Studio |
| `app.js` | Generator voor gestructureerde opdrachten |
| `tests/` | Geautomatiseerde functionele controles |
| `.github/workflows/check.yml` | GitHub Actions-testworkflow |

Je kunt het project lokaal openen door `index.html` te openen. De website staat op GitHub Pages, vanaf de `main`-branch.

## Tests en kwaliteitsborging

GitHub Actions controleert JavaScript-syntax en draait Node-tests bij wijzigingen. Het testpakket omvat onder meer opdrachtgeneratie, onderwerpveld, lokale taken, filters, verwijderen en veilige tekstverwerking.

Automatische tests vervangen **geen** handmatige test in Samsung Internet of Chrome op je eigen telefoon.

## Werkwijze en veiligheid

- De website vraagt geen wachtwoorden of API-sleutels.
- Er zitten geen trackers, analytische scripts of externe AI-diensten in deze versie.
- De Studio verstuurt je ingevoerde opdracht niet. Je kiest zelf of en waar je tekst plakt.
- De lokale takenlijst staat niet op GitHub: in GitHub staat alleen de **broncode**, niet je taken.
- Er is nog geen geautomatiseerde aansturing van apps, berichten of externe accounts.

## Volgende ontwikkelstappen (voorstellen)

1. Het mobiel gebruik verbeteren op basis van praktijkervaring.
2. Een bibliotheek met herbruikbare promptsjablonen toevoegen.
3. Onderzoeken of beveiligde externe koppelingen zinvol zijn; nooit tokens in openbare broncode plaatsen.
4. Pas daarna aanvullende modules ontwikkelen.

## Eigenaar

Fabian Vroom · Amsterdam Zuidoost  
[GitHub-profiel](https://github.com/BornInSuriname) · [Persoonlijk portfolio](https://borninsuriname.github.io/)

*This is a static, privacy-conscious browser dashboard for AI prompts and non-sensitive local tasks, not a connected autonomous AI agent.*
