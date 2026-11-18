# GeoLerner

Geographie-Trainer für Klasse 10 mit Lernpfad, Herzen, Streak und XP – begleitet von Magmus, dem frechen kleinen Vulkan.

Aktueller Inhalt: der Stoff der Klassenarbeit am 20.11.2026 in 8 Einheiten, 24 Lektionen und 207 Fragen, dazu 66 weitere Fragen in der Arena.

| Einheit | Thema |
| --- | --- |
| 1 | Gesteinskreislauf |
| 2 | Schalenaufbau der Erde (mit Tiefe, Temperatur, Druck) |
| 3 | Wegeners Theorie der Plattenverschiebung |
| 4 | Plattentektonik: Lage der Platten, Prozesse an den Plattengrenzen |
| 5 | Vulkanismus: Grundlagen |
| 6 | Verbreitung und Ausmaß von Erdbeben |
| 7 | Schutz vor Erdbeben |
| 8 | Seebeben |

## Was drin ist

- **Lernpfad**: pro Einheit drei Lektionen (Grundlagen, Vertiefung, KA-Niveau), alle sofort spielbar. 5 Herzen pro Lektion, falsche Fragen kommen einmal wieder, bis zu 3 Sterne.
- **13 Aufgabentypen**: Auswahl, Mehrfachauswahl, richtig/falsch, Paare, Lückentext, Reihenfolge, Einsortieren, Fachbegriff eintippen, Zahl eintippen, Skizze beschriften, Skizze antippen, Material auswerten (Tabelle, Diagramm, Karte, Schaubild mit Teilaufgaben) und KA-Aufgaben mit Operator, Musterlösung und Punkte-Checkliste.
- **Spickzettel** zu jeder Einheit: Fachbegriffe, Merksätze und beschriftete Skizzen.
- **Boss-Fight**: KA-Simulation mit 24 gemischten Aufgaben von „nennen“ bis „bewerten“, 25 Minuten, Note 1–6 und Auswertung der Schwachstellen pro Thema.
- **Blitzrunde**: 60 Sekunden mit Serien-Multiplikator und Rekord.
- **Fehler-Training**: Falsch beantwortete Fragen kommen wieder, bis sie zweimal sitzen.
- **Zahlen-Drill**: Tiefe, Temperatur und Druck der Erdschalen, bis jede Zahl sitzt.
- **Material-Training**: nur Tabellen, Diagramme und Karten auswerten.
- **Operatoren-Trainer**: Was verlangen nennen, beschreiben, erklären, auswerten, bewerten?
- **Profil**: Level, Tages-Streak, Abzeichen, Töne an/aus, helles und dunkles Design.

Der Fortschritt liegt nur im Browser (`localStorage`). Es gibt keinen Server, keine Anmeldung, keine externen Schriften, Skripte oder Tracker.

## Wichtig: die Zahlen zum Schalenaufbau

Tiefe, Temperatur und Druck der Erdschalen unterscheiden sich je nach Schulbuch. Die Werte stehen deshalb an genau einer Stelle: **`js/werte.js`**. Alle Zahlen-Fragen, der Zahlen-Drill, die Tabelle im Spickzettel und das Diagramm in Einheit 2 werden daraus erzeugt.

Voreingestellt ist ein **Vorschlag** aus gängigen, gerundeten Schulbuch-Angaben. Die App zeigt dazu einen Warnhinweis. So passt du die Werte an dein Heft an:

1. `js/werte.js` öffnen (auf GitHub: Datei anklicken, dann auf den Stift).
2. Die Zahlen bei `tiefe`, `temp` und `druck` ändern. Steht ein Wert nicht im Heft, `null` eintragen – dann wird nicht danach gefragt.
3. Wenn die Einheit für den Druck im Heft anders heißt, `druckEinheit` ändern.
4. `geprueft: true` setzen. Dann verschwindet der Warnhinweis.
5. Speichern (Commit). Nach etwa einer Minute ist die Seite aktualisiert.

## Auf GitHub Pages veröffentlichen

Die Seite ist reines HTML, CSS und JavaScript. Es gibt keinen Build-Schritt.

1. Im Repository **Settings → Pages** öffnen.
2. Unter **Build and deployment** bei *Source* **Deploy from a branch** wählen.
3. Branch **main** und Ordner **/ (root)** auswählen, dann **Save**.
4. Nach etwa einer Minute ist die Seite unter `https://<benutzername>.github.io/GeoLerner/` erreichbar.

Jeder weitere Push auf `main` aktualisiert die Seite automatisch.

## Lokal ausprobieren

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

Ein Doppelklick auf `index.html` funktioniert ebenfalls.

## Aufbau

```
index.html            Einstieg, lädt alle Skripte
css/style.css         Gestaltung (hell und dunkel)
js/geo.js             Namensraum, KA-Termin, Helfer
js/werte.js           DIE ZAHLEN zum Schalenaufbau – hier anpassen
js/store.js           Speicherstand, Level, Streak
js/sfx.js             Töne und Konfetti
js/magmus.js          Maskottchen, Endgegner, Sprüche
js/diagrams.js        Skizzen als SVG
js/material.js        Tabellen und Diagramme für „Material auswerten“
js/operatoren.js      Operatoren-Übersicht und Fragen des Operatoren-Trainers
js/questions.js       Aufgabentypen
js/app.js             Lernpfad, Arena, Profil, Spielrunden
js/units/*.js         Inhalte: eine Datei pro Einheit
tools/validate.js     Prüft alle Fragen auf formale Fehler
```

## Neue Themen ergänzen

1. In `js/units/` eine neue Datei anlegen, z. B. `09-klima.js`, nach dem Muster der vorhandenen Dateien (`GEO.unit({...})`).
2. Die Datei in `index.html` vor `js/questions.js` einbinden.
3. Prüfen:

```bash
node tools/validate.js
```

Der KA-Termin für den Countdown steht in `js/geo.js` (`GEO.KA.date`).

### Aufgabentypen in Kurzform

```js
{ t: 'mc',     q: 'Frage', o: ['richtig', 'falsch', 'falsch'], a: 0, w: 'Erklärung' }
{ t: 'multi',  q: 'Frage', o: ['A', 'B', 'C', 'D'], a: [0, 1], w: 'Erklärung' }
{ t: 'tf',     q: 'Aussage', a: false, w: 'Erklärung' }
{ t: 'match',  q: 'Auftrag', pairs: [['Begriff', 'Bedeutung'], ['…', '…'], ['…', '…']] }
{ t: 'cloze',  text: 'Satz mit {0} und {1}.', blanks: ['Wort', 'Wort'], extra: ['Ablenker'] }
{ t: 'order',  q: 'Ordne …', items: ['erster Schritt', 'zweiter', 'dritter'] }
{ t: 'sort',   q: 'A oder B?', buckets: ['A', 'B'], items: [['Ding', 0], ['Ding', 1], ['…', 0], ['…', 1]] }
{ t: 'type',   q: 'Wie heißt …?', accept: ['Antwort', 'Schreibvariante'], w: 'Erklärung' }
{ t: 'num',    q: 'Wie tief …?', a: 2900, unit: 'km', w: 'Erklärung' }
{ t: 'label',  d: 'vulkan', target: 'schlot', w: 'Erklärung' }
{ t: 'tap',    d: 'platten', target: 'nazca', q: 'Tippe auf …', w: 'Erklärung' }
{ t: 'material', mat: { kind: 'table', title: 'M1: …', head: ['A', 'B'], rows: [['…', '…'], ['…', '…']] },
  parts: [ { t: 'mc', … }, { t: 'num', … } ] }
{ t: 'explain', op: 'Erkläre', q: 'Aufgabe', points: ['Punkt 1', 'Punkt 2', 'Punkt 3'], model: 'Musterlösung' }
```

Die Optionen werden beim Anzeigen gemischt, die richtige Antwort darf also immer an erster Stelle stehen. Mit `zusatz: true` wird eine Frage als „Zusatz“ gekennzeichnet und kommt nicht im Boss-Fight vor. Material gibt es als `table`, `bar` (Balkendiagramm), `line` (Liniendiagramm), `fig` (Skizze oder Karte) und `text`.

Vorhandene Skizzen: `schalen`, `kreislauf`, `divergent`, `konvergent`, `konservativ`, `platten`, `vulkan`, `schild`, `tsunami`, `beben`, `haus`, `pangaea`.
