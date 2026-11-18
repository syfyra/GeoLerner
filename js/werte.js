/* GeoLerner – DIE ZAHLEN ZUM SCHALENAUFBAU (Tiefe, Temperatur, Druck)
   ==================================================================
   Das hier ist die einzige Stelle, an der diese Zahlen stehen.
   Alle Zahlen-Fragen, der Zahlen-Drill, die Tabelle im Spickzettel und das
   Diagramm in Einheit 2 werden daraus automatisch erzeugt.

   ACHTUNG: Die Werte unten sind ein VORSCHLAG aus gängigen, gerundeten
   Schulbuch-Angaben. Je nach Buch weichen sie ab. Gleiche sie mit deinem
   Heft ab und ändere, was bei dir anders steht.

   So änderst du etwas:
     tiefe: [von, bis]  Tiefe in km (Obergrenze, Untergrenze der Schale)
     temp:  Zahl        Temperatur an der Untergrenze der Schale in °C
     druck: Zahl        Druck an der Untergrenze der Schale (Einheit: druckEinheit)
   Steht ein Wert nicht in deinem Heft, schreib  null  – dann wird nicht danach gefragt.
   Wenn alles stimmt:  geprueft: true  – dann verschwindet der Warnhinweis in der App. */
(function () {
  'use strict';

  GEO.WERTE = {
    geprueft: false,          // auf true setzen, sobald die Zahlen mit dem Heft übereinstimmen
    druckEinheit: 'kbar',     // z. B. 'kbar', 'bar', 'GPa' – so, wie es im Heft steht

    schalen: [
      { id: 'kruste', name: 'Erdkruste', nom: 'die Erdkruste', gen: 'der Erdkruste', dat: 'in der Erdkruste',
        tiefe: [0, 40], temp: 1000, druck: 10,
        zustand: 'fest', stoff: 'leichtes Gestein (Granit, Basalt)' },

      { id: 'omantel', name: 'oberer Erdmantel', nom: 'der obere Erdmantel', gen: 'des oberen Erdmantels', dat: 'im oberen Erdmantel',
        tiefe: [40, 700], temp: 2000, druck: 250,
        zustand: 'fest, in der Asthenosphäre zähplastisch', stoff: 'schweres Gestein' },

      { id: 'umantel', name: 'unterer Erdmantel', nom: 'der untere Erdmantel', gen: 'des unteren Erdmantels', dat: 'im unteren Erdmantel',
        tiefe: [700, 2900], temp: 3000, druck: 1400,
        zustand: 'fest (sehr langsam fließend)', stoff: 'schweres Gestein' },

      { id: 'akern', name: 'äußerer Erdkern', nom: 'der äußere Erdkern', gen: 'des äußeren Erdkerns', dat: 'im äußeren Erdkern',
        tiefe: [2900, 5100], temp: 5000, druck: 3300,
        zustand: 'flüssig', stoff: 'Eisen und Nickel' },

      { id: 'ikern', name: 'innerer Erdkern', nom: 'der innere Erdkern', gen: 'des inneren Erdkerns', dat: 'im inneren Erdkern',
        tiefe: [5100, 6370], temp: 6000, druck: 3600,
        zustand: 'fest', stoff: 'Eisen und Nickel' }
    ],

    // Weitere Zahlen rund um die Kruste (jeweils [von, bis] in km; null = nicht abfragen)
    ozeanischeKruste: [5, 10],
    kontinentaleKruste: [30, 70],
    lithosphaere: 100          // ungefähre Dicke der Lithosphäre in km
  };
})();
