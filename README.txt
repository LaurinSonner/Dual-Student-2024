Kundenverwaltungs-Webapplikation

Diese Webapplikation ermöglicht es, Kundendaten aus einer SQLite-Datenbank zu lesen und anzuzeigen. Zunächst wird ein Python-Skript verwendet, um aus einer .csv-Datei eine Datenbank zu erstellen und die Daten darin zu speichern.

Einrichtung und Verwendung:

    Öffne den Projektordner in deiner bevorzugten Entwicklungsumgebung (z.B. Visual Studio Code).
    Gib in der Konsole den Befehl node server.js ein, um den Webserver auf Localhost 3000 zu starten.
    Öffne einen Webbrowser und gehe zur Adresse http://localhost:3000/, um die Webapplikation zu nutzen.

Funktionen:

    Datenfilterung: Verwende die integrierten Filter für Datum und Mindestumsatz, indem du entsprechende Werte eingibst und auf "Apply Filters" klickst.
    Tabellensortierung: Klicke auf die Spaltenüberschriften, um die Tabelle nach einer bestimmten Spalte zu sortieren. Ein erneutes Klicken auf dieselbe Überschrift kehrt die Sortierrichtung um.

Beispielverwendung:

    Gib ein beliebiges Datum und Mindestumsatz in die Filterfelder ein.
    Klicke auf "Apply Filters", um die Tabelle entsprechend zu filtern.
    Klicke auf eine Spaltenüberschrift, um die Tabelle nach dieser Spalte zu sortieren.

Hinweis: Vergewissere dich, dass du die erforderlichen Abhängigkeiten installiert hast, bevor du den Webserver startest
