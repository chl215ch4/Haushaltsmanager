# 📱 Haushaltsmanager Android-App (APK) & Installations-Anleitung

Dieses System enthält nun die vollständige Unterstützung für **Android Smartphone & Tablet**:
- **Mobile Version (`mobile.html`)**: Optimiert für Einhand-Bedienung im Hochformat mit 3 Haupt-Tabs (Bestand, Einkauf, Aufgaben).
- **Tablet / Desktop Version (`index.html`)**: Große Übersicht mit 4 Tabs, Kalender-Integration, Bestandsspalten und Schnellkacheln.
- **Nahtloser Modus-Wechsel**: Ein Klick auf `[📱 Handy-Modus]` bzw. `[🖥️ Tablet-Modus]` wechselt blitzschnell hin und her. Beide Modi nutzen denselben Datenspeicher (`localStorage`) und denselben Google Sheets Live-Sync ohne Konflikte.

---

## 🚀 Option 1: 1-Klick-Installation direkt auf Android (WebAPK – Schnellste Methode)

Dank der integrierten **PWA & WebAPK-Technologie** kann die App sofort ohne Entwickler-Tools auf jedem Android-Handy oder Tablet als vollwertige native Android-App installiert werden:

1. Öffne die App im mobilen Browser (z. B. Google Chrome oder Microsoft Edge).
2. Tippe oben rechts auf das Drei-Punkte-Menü `⋮`.
3. Wähle **„App installieren“** (oder **„Zum Startbildschirm hinzufügen“**).
4. Bestätige mit **„Installieren“**.

> 💡 **Was passiert im Hintergrund?** Android erzeugt über die Google Play Services automatisch eine echte **WebAPK**. Die App erscheint mit dem Haushalts-Icon in deiner Android-App-Übersicht, startet im Vollbildmodus (ohne Adressleiste) und funktioniert dank Service Worker (`sw.js`) auch offline!

---

## 🛠️ Option 2: Echte Standalone-APK über Android Studio bauen

Im Ordner `android-app/` ist das vollständige, sofort einsatzbereite Android-Studio-Projekt hinterlegt:

1. **Android Studio** öffnen (kostenlos von developer.android.com).
2. Klicke auf **„Open“** und wähle den Ordner:  
   `haushalts-manager/android-app/`
3. Warte kurz, bis Gradle die Abhängigkeiten synchronisiert hat.
4. Klicke in der Menüleiste auf:  
   **Build** ➔ **Build Bundle(s) / APK(s)** ➔ **Build APK(s)**.
5. Nach 30–60 Sekunden erscheint unten rechts eine Benachrichtigung mit einem Link **„locate“**.
6. Deine fertige Datei **`app-debug.apk`** liegt in:  
   `android-app/app/build/outputs/apk/debug/app-debug.apk`
7. Sende diese APK an dein Android-Gerät (per USB, Google Drive, WhatsApp o. ä.) und tippe darauf zum Installieren.

---

## ☁️ Option 3: Kostenlose Online-APK-Generierung (Ohne Installation am PC)

### A. Über GitHub Actions (Vollautomatisch)
Das Repository enthält bereits die fertige CI/CD-Pipeline unter `.github/workflows/build-apk.yml`:
1. Lade den Ordner in ein (auch privates) GitHub-Repository hoch.
2. Gehe auf den Tab **Actions** ➔ **Build Android APK** ➔ **Run workflow**.
3. Nach ca. 2 Minuten kannst du unter **Artifacts** die fertige **`HaushaltsManager-Debug-APK`** direkt herunterladen!

### B. Über PWABuilder (Offizielles Tool von Microsoft/Google)
1. Lade deine Dateien auf deinen Webspace oder hoste sie über GitHub Pages / Netlify / Vercel.
2. Öffne [pwabuilder.com](https://www.pwabuilder.com).
3. Gib deine Web-Adresse ein.
4. Klicke auf **„Package for Android“** ➔ **„Generate APK“**.
5. Du erhältst sofort eine signierte Android-APK zum Download.

---

## 🔄 Wie funktioniert der Modus-Wechsel in der App?

- **In der Tablet-Ansicht (`index.html`)**:  
  In der oberen Leiste befindet sich der Button **`[📱 Handy-Modus]`**. Ein Klick wechselt sofort in die mobile Ansicht.
- **In der Handy-Ansicht (`mobile.html`)**:  
  In der oberen Leiste befindet sich der Button **`[🖥️ Tablet-Modus]`**. Ein Klick wechselt sofort in die Tablet-Ansicht.
- **Intelligente Vorliebe**:  
  Deine Auswahl wird im Browser/in der App gemerkt (`localStorage.household_preferred_view`). Beim nächsten Öffnen startet automatisch dein bevorzugter Modus.
- **Automatische Erkennung**:  
  Wird die App zum ersten Mal auf einem Smartphone im Hochformat geöffnet, wird automatisch der Handy-Modus gestartet; auf Tablets oder am PC startet der Tablet-Modus.

---

## 🔒 Daten-Kompatibilität & Google Sheets

- **100% kompatibel**: Alle Datenbanken (Lagerbestand, Haltbarkeiten, Einkaufsliste, Aufgaben, Punkte, Personen, Emojis) sind in beiden Modi identisch.
- **Live-Sync**: Beide Apps synchronisieren in Echtzeit mit derselben Google Apps Script URL. Du kannst z. B. am Tablet ein Produkt erfassen und siehst es Sekunden später auf deinem Smartphone im Handy-Modus.
