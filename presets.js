/* Public, non-sensitive built-in presets. Never place private case details here. */
"use strict";
window.AI_PRESETS = Object.freeze([
  {
    id: "dossier",
    category: "Zuidoost",
    title: "Beleidsdossier onderzoeken",
    description: "Bekijk besluiten, uitvoering, tegenbewijs en gevolgen voor bewoners.",
    workflow: "onderzoek",
    subject: "Onderzoek een openbaar beleidsdossier in Amsterdam Zuidoost",
    context: "Gebruik zo mogelijk officiële beleidsstukken, raadsinformatie, besluiten en voortgangsrapportages. Controleer per relevante claim de bron en datum. Maak onderscheid tussen voornemen, toezegging, besluit, uitvoering en resultaat. Onderzoek wie gevolgen ervaart, welke cijfers ontbreken en welk tegenbewijs het oordeel kan veranderen.",
    length: "uitgebreid",
    sources: true,
    counterevidence: true
  },
  {
    id: "bestuursvragen",
    category: "Zuidoost",
    title: "Drie mondelinge vragen",
    description: "Kritisch, begrijpelijk en gericht op concrete uitvoering.",
    workflow: "onderzoek",
    subject: "Bereid maximaal drie mondelinge vragen aan het dagelijks bestuur voor",
    context: "Controleer eerst of de feiten en antwoorden al openbaar zijn, en of het onderwerp binnen de bevoegdheid van het dagelijks bestuur valt. Vermijd administratieve vragen die de griffie kan beantwoorden. Stel maximaal drie korte vragen over verantwoordelijkheid, uitvoering, termijn en merkbaar resultaat voor bewoners. Citeer relevante primaire bronnen en zeg wanneer verificatie niet mogelijk was. Dien niets in.",
    length: "normaal",
    sources: true,
    counterevidence: true
  },
  {
    id: "toezegging",
    category: "Zuidoost",
    title: "Toezegging opvolgen",
    description: "Wat is afgesproken, wie is verantwoordelijk en wat is aantoonbaar gebeurd?",
    workflow: "actie",
    subject: "Maak een opvolgplan voor een openbare toezegging of motie",
    context: "Zet de oorspronkelijke tekst, datum, verantwoordelijke, deadline en beoogd resultaat apart. Maak duidelijk of er bewijs is van uitvoering, niet alleen een nieuw plan. Markeer ontbrekende gegevens expliciet. Formuleer één concrete vervolgvraag en een toetsmoment. Vul geen onbekende data of besluiten in.",
    length: "normaal",
    sources: true,
    counterevidence: true
  },
  {
    id: "bewoners",
    category: "Zuidoost",
    title: "Bewonerssignalen onderzoeken",
    description: "Neem ervaringen serieus zonder een signaal direct als patroon te presenteren.",
    workflow: "onderzoek",
    subject: "Onderzoek een bewonerssignaal zorgvuldig en respectvol",
    context: "Scheid individuele ervaringen van aantoonbare patronen. Zoek naar openbare gegevens die steun of tegenbewijs leveren, en benoem wat niet bekend is. Vraag niet om namen, adressen of andere herleidbare gegevens. Maak een plan voor veilige signalering, mogelijke ondersteuning en één gerichte bestuurlijke vervolgstap.",
    length: "uitgebreid",
    sources: true,
    counterevidence: true
  },
  {
    id: "ai-prototype",
    category: "Technologie",
    title: "AI-tool bouwen",
    description: "Een klein prototype, risicoanalyse en drie testgevallen.",
    workflow: "project",
    subject: "Ontwerp een klein, mobielvriendelijk AI-project",
    context: "Begin bij het gebruikersprobleem en de eenvoudigste bruikbare oplossing. Maak onderscheid tussen een promptgenerator, echte AI-functionaliteit en automatisering. Benoem benodigde accounts, kosten, gegevens en beveiligingsrisico's. Gebruik geen echte tokens of persoonsgegevens in code. Werk naar een testbaar prototype en een haalbare eerste release.",
    length: "uitgebreid",
    sources: true,
    counterevidence: true
  },
  {
    id: "integratie",
    category: "Technologie",
    title: "Veilige app-koppeling",
    description: "Controleer bevoegdheden, privacy, kosten en alternatieven vóór je koppelt.",
    workflow: "project",
    subject: "Onderzoek of een externe app veilig gekoppeld kan worden",
    context: "Bepaal welke taak de koppeling oplost en welke minimale rechten nodig zijn. Vergelijk een handmatige route, een officiële connector en een API-integratie. Onderzoek actuele documentatie als die toegankelijk is, vraag om expliciete toestemming voor handelingen en beschrijf risico's rond OAuth, tokens, opslag en intrekken van toegang. Voer zelf geen koppeling uit.",
    length: "uitgebreid",
    sources: true,
    counterevidence: true
  },
  {
    id: "fromu-song",
    category: "Creatief",
    title: "FROMU muziekconcept",
    description: "Een origineel nummer met warme tekst, ritme en natuurlijk taalgebruik.",
    workflow: "creatief",
    subject: "Ontwikkel een origineel, warm muziekconcept voor FROMU",
    context: "Stel een duidelijk thema, doelgroep, muzikale richting, intro, coupletten en refrein voor. Schrijf natuurlijk, ritmisch Nederlands zonder clichézinnen. Streef naar ongeveer drie minuten speelduur als dat past bij het genre. De artiestennaam blijft FROMU en wordt FROH-MOE uitgesproken. Neem geen bestaande songteksten of melodieën over.",
    length: "uitgebreid",
    sources: false,
    counterevidence: false
  },
  {
    id: "release",
    category: "Creatief",
    title: "Muziekrelease plannen",
    description: "Een realistische checklist voor distributie, video en promotie.",
    workflow: "actie",
    subject: "Maak een praktisch releaseplan voor een eigen muzieknummer",
    context: "Werk met fasen: master, metadata, cover, distributie, kanalen, korte video's, publicatiemoment en evaluatie. Scheid taken van bevestigde publicaties. Controleer actuele eisen van platforms in hun officiële documentatie als die beschikbaar is. Gebruik geen inloggegevens of privéstatistieken. Kies een volgorde die vanaf een Samsung uitvoerbaar is.",
    length: "normaal",
    sources: true,
    counterevidence: true
  }
]);
