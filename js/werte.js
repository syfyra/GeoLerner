/* GeoLerner – DIE ZAHLEN ZUM SCHALENAUFBAU (Tiefe, Temperatur, Druck)
   ==================================================================
   Das hier ist die einzige Stelle, an der diese Zahlen stehen.
   Alle Zahlen-Fragen, der Zahlen-Drill, die Tabellen im Spickzettel und das
   Diagramm in Einheit 2 werden daraus automatisch erzeugt.

   Die Werte stammen aus dem Schulbuch, S. 131, M3 „Der Schalenbau der Erde“.
   Die Datei ist aufgebaut wie die Spalte im Buch: Welcher Wert steht in welcher Tiefe?

   So änderst du etwas:
     schalen     tiefe: [von, bis]   Tiefe in km (Obergrenze, Untergrenze der Schale)
     temperatur  [Tiefe in km, Temperatur in °C]
     druck       [Tiefe in km, Druck]   (Einheit: druckEinheit)
   Einen Wert, nach dem nicht gefragt werden soll, einfach löschen.
   geprueft: false  blendet in der App wieder den Hinweis „Vorschlagswerte“ ein. */
(function () {
  'use strict';

  GEO.WERTE = {
    geprueft: true,
    quelle: 'Schulbuch S. 131, M3 „Der Schalenbau der Erde“',
    druckEinheit: 'kbar',

    schalen: [
      { id: 'kruste', name: 'Erdkruste', nom: 'die Erdkruste', gen: 'der Erdkruste', dat: 'in der Erdkruste',
        tiefe: [0, 40], zustand: 'fest', stoff: 'leichtes Gestein (Granit, Basalt)' },

      { id: 'omantel', name: 'oberer Erdmantel', nom: 'der obere Erdmantel', gen: 'des oberen Erdmantels', dat: 'im oberen Erdmantel',
        tiefe: [40, 700], zustand: 'fest, in der Asthenosphäre verformbar', stoff: 'schweres Gestein' },

      { id: 'umantel', name: 'unterer Erdmantel', nom: 'der untere Erdmantel', gen: 'des unteren Erdmantels', dat: 'im unteren Erdmantel',
        tiefe: [700, 2900], zustand: 'fest', stoff: 'schweres Gestein' },

      { id: 'akern', name: 'äußerer Erdkern', nom: 'der äußere Erdkern', gen: 'des äußeren Erdkerns', dat: 'im äußeren Erdkern',
        tiefe: [2900, 5000], zustand: 'flüssig', stoff: 'Eisen und Nickel' },

      { id: 'ikern', name: 'innerer Erdkern', nom: 'der innere Erdkern', gen: 'des inneren Erdkerns', dat: 'im inneren Erdkern',
        tiefe: [5000, 6371], zustand: 'fest', stoff: 'Eisen und Nickel' }
    ],

    // Die Grenze zwischen äußerem und innerem Erdkern steht im Buch zweimal:
    // als „ca. 5000 km“ und als 5150 km. Beide Antworten zählen als richtig.
    gleichwertig: [[5000, 5150]],

    // [Tiefe in km, Temperatur in °C]
    temperatur: [[40, 1000], [700, 2000], [2900, 3600], [5000, 4000], [6371, 6000]],

    // [Tiefe in km, Druck in kbar]
    druck: [[1000, 400], [2900, 1500], [5150, 3400], [6371, 3600]],

    // Mittlere Mächtigkeit der Kruste, jeweils [von, bis] in km (null = nicht abfragen)
    ozeanischeKruste: [6, 8],
    kontinentaleKruste: [30, 60]
  };
})();
