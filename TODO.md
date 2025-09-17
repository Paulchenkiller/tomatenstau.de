# TODO / Backlog für tomatenstau.de

Sammlung sinnvoller Verbesserungen und offener Punkte für die Weiterentwicklung der Seite. Die Liste ist priorisierbar und soll als lebendes Dokument dienen.

- Inhalt & Struktur
  - [ ] Startseite: Teaser-Abschnitte mit „Mehr erfahren“-Links strukturieren (Hero → Highlights → ausgewählte Code-Themen).
  - [x] Code-Bereiche: Einleitungstexte vereinheitlichen, Beispiele mit kurzen Erklärungen einleiten und Querverweise zwischen Sprachen ergänzen.
  - [x] Breadcrumb/Navigation: Einheitliche Schreibweise und ggf. neutrales Key-Schema für Navigationslabels (z. B. NAV.\*) vorbereiten, ohne bestehende Routen zu brechen.
  - [x] 404-Seite ausbauen: Link zur Startseite, ggf. Suchfeld oder Themenübersicht.

- Internationalisierung (i18n)
  - [x] Einheitliche Keys für Navigations-/Breadcrumb‑Labels konzipieren (z. B. NAV.HOME, NAV.CODE, NAV.JAVASCRIPT), behutsam migrieren.
  - [x] Fehlende/abweichende Übersetzungen prüfen (z. B. deutsche Begriffe als Schlüssel vs. neutrale Schlüssel).
  - [x] Initialsprache beim App-Start aus localStorage/Browser ermitteln (APP_INITIALIZER), Fallback sauber definieren.
  - [x] Title/Meta pro Route ebenfalls internationalisieren (TitleService + TranslateService).

- Barrierefreiheit (A11y)
  - [ ] Sichtbarer Tastaturfokus für alle interaktiven Elemente (Buttons, Links, Sprachumschalter).
  - [ ] Skip-Link („Zum Inhalt springen“) einführen.
  - [ ] aria-current für aktiven Menüpunkt/Breadcrumb setzen.
  - [x] Kontrast-Check (WCAG AA) für Farben; ggf. Alternativthema für hohen Kontrast.
  - [x] Codeblöcke: „Copy“-Button mit aussagekräftigem aria-label und Tastaturbedienbarkeit.

- Performance
  - [ ] Routen-Lazy-Loading prüfen/aktivieren, falls noch nicht überall genutzt.
  - [ ] PreloadStrategy für häufig besuchte Routen konfigurieren.
  - [ ] Bilder optimieren (Logo/Assets, responsive sizes), ggf. modernere Formate (WebP/AVIF) bereitstellen.
  - [ ] Font Awesome: Bündel minimieren (nur benötigte Icons laden) oder alternative Icon-Strategie.
  - [ ] Angular build budgets in angular.json schärfen und regelmäßig überwachen.

- SEO & Meta
  - [x] Dynamische Title- und Meta-Descriptions pro Route (inkl. Sprache).
  - [x] robots.txt und sitemap.xml erzeugen; Canonical-URLs setzen.
  - [x] hreflang-Tags für DE/EN ausliefern.
  - [x] Strukturierte Daten (JSON-LD), z. B. Person (Homepage) und BreadcrumbList.

- UI/Design & Responsiveness
  - [ ] Mobile Navigation (Burger-Menü) fertigstellen und zugänglich machen; Header-Verhalten < 768px verfeinern.
  - [ ] Dark Mode (prefers-color-scheme) und manuelle Umschaltung berücksichtigen.
  - [ ] Typografische Skala, Lesbarkeit (Zeilenlänge/Zeilenhöhe) konsistent abstimmen.

- Testing & Code-Quality
  - [x] Unit-Tests für Breadcrumb-Berechnung und Sprachumschalter (Persistenz, Events, aria-Attribute) erweitern; aktuelle Abdeckung: 96,86% Statements (Ziel: ≥ 80% für Kernkomponenten erreicht).
  - [x] Jest als Test-Runner eingerichtet mit TypeScript-Support und Coverage-Reports (lcov, text).
  - [x] Linting-Regeln (ESLint 8 + TypeScript-ESLint 8) mit Angular-spezifischen Regeln und Prettier-Integration.
  - [x] Playwright E2E-Tests für Kernpfade (Navigation, Sprachwechsel, 404) mit GitHub Actions CI-Integration.
  - [ ] Test-Performance optimieren: Highlight.js-Mocks für Unit-Tests implementieren (reduziert Console-Warnings).
  - [ ] Mutation Testing mit Stryker.js einführen für Qualitätsbewertung der Test-Suite.
  - [ ] Visual Regression Tests für kritische UI-Komponenten (Chromatic/Percy) evaluieren.
  - [ ] Bundle-Analyzer und Lighthouse CI in Pipeline integrieren für Performance-Monitoring.
  - [ ] TypeScript strict-Modus aktivieren und schrittweise Code-Qualität erhöhen.
  - [ ] SonarQube/SonarCloud für Code-Quality-Metriken und Security-Scans konfigurieren.

- Build/Deploy & Automatisierung
  - [x] GitHub Actions (CI) mit Lint, Build und Test.
  - [x] Conventional Commits per commitlint + husky erzwingen.
  - [x] Dependency-Updates automatisieren (Dependabot/Renovate).
  - [x] Pre-commit hook für automatisches linting, formatting und commitlint.

- PWA & Offline
  - [ ] Web App Manifest und Icons ergänzen; ng add @angular/pwa prüfen.
  - [ ] Service Worker für Caching-Strategien (statische Assets, i18n-Dateien) evaluieren.

- Datenschutz & Rechtliches
  - [ ] Impressum und Datenschutzseite (DE/EN) anlegen und im Footer verlinken.
  - [ ] Externe Links mit rel="noopener noreferrer" prüfen.
  - [ ] Analytics nur mit Consent-Banner integrieren (sofern benötigt), IP-Anonymisierung sicherstellen.

- Fehlertoleranz & UX
  - [ ] Globale Fehler-/Loading-Zustände (Spinner/Skeleton) einführen.
  - [ ] Fallbacks bei fehlenden Übersetzungen sichtbar machen (Debug-Option im Dev-Modus).

- Dokumentation
  - [ ] README aktualisieren (i18n-Policy, How-to für neue Seiten/Keys, Dev-Setup).
  - [ ] CONTRIBUTING.md mit Konventionen (Commits, Branching, Code-Stil) erstellen.

- Code-Qualität & TypeScript
  - [ ] TypeScript strict-Modus vollständig aktivieren (bereits in tsconfig.json aktiv, aber Compliance prüfen).
  - [ ] Utility-Types für häufige Patterns einführen (Route-Daten, Translation-Keys, Meta-Tags).
  - [ ] Generic-Types für wiederverwendbare Komponenten implementieren.
  - [ ] Unused imports und dead code per ESLint-Rule automatisch entfernen.
  - [ ] Code-Dokumentation (JSDoc) für öffentliche APIs und komplexe Business-Logic.

- Performance & Bundle-Optimierung
  - [ ] Tree-shaking für FontAwesome-Icons optimieren (nur verwendete Icons bundlen).
  - [ ] Lazy-loading für Code-Beispiel-Komponenten implementieren (erst bei Bedarf laden).
  - [ ] Prefetch-Strategy für häufig besuchte Routen konfigurieren.
  - [ ] Critical CSS inline ausliefern, Rest defer laden.
  - [ ] Image-Sprites für wiederkehrende Icons erwägen.
  - [ ] Service Worker für statische Assets (CSS, JS, Images) caching.

- Developer Experience
  - [ ] VS Code Extensions-Empfehlungen (.vscode/extensions.json) erstellen.
  - [ ] Debug-Konfiguration für VS Code (.vscode/launch.json) bereitstellen.
  - [ ] Git-Hooks für automatische Codeformatierung bei Commit erweitern.
  - [ ] npm scripts für häufige Dev-Tasks vereinfachen (dev, build:prod, test:watch).

- Monitoring & Analytics
  - [ ] Error-Boundary-Komponente für unbehandelte Fehler implementieren.
  - [ ] Client-seitige Error-Logging-Strategie definieren (Console, externe Services).
  - [ ] Performance-Monitoring mit Core Web Vitals implementieren.
  - [ ] User-Journey-Tracking für A/B-Tests vorbereiten (datenschutzkonform).

- Content & UX Enhancement
  - [ ] Code-Syntax-Highlighting für weitere Sprachen erweitern (C++, Rust, Go).
  - [ ] Suchfunktionalität für Code-Beispiele implementieren (Client-seitig).
  - [ ] Tag-System für Code-Beispiele einführen (Schwierigkeit, Thema).
  - [ ] "Verwandte Artikel"-Funktion basierend auf Tags/Sprachen.
  - [ ] Bookmark-Funktion für Code-Beispiele (localStorage-basiert).
  - [ ] Code-Beispiele bewerten lassen (5-Sterne, localStorage).

- Security & Best Practices
  - [ ] Content-Security-Policy (CSP) Headers konfigurieren.
  - [ ] Subresource Integrity (SRI) für externe Assets implementieren.
  - [ ] Security-Headers (HSTS, X-Frame-Options) via Server/CDN setzen.
  - [ ] Dependency-Scanning für bekannte Vulnerabilities automatisieren.

- Future Features
  - [ ] Offline-Modus für wichtigste Code-Beispiele (Service Worker Cache).
  - [ ] Druck-optimierte CSS-Version für Code-Beispiele.
  - [ ] Export-Funktion für Code-Beispiele (PDF, einzelne Dateien).
  - [ ] Interaktive Code-Playground-Integration (CodeSandbox/StackBlitz-Links).

- Progressive Web App (PWA) & Moderne Standards
  - [ ] Service Worker mit ng add @angular/pwa implementieren.
  - [ ] Web App Manifest mit Offline-Capabilities erstellen.
  - [ ] Push-Notifications für neue Tutorial-Releases einführen.
  - [ ] App-Shortcuts für häufig besuchte Programmiersprachen hinzufügen.
  - [ ] Web Share API für Tutorial-Sharing implementieren.
  - [ ] File System Access API für Download von Code-Beispielen.
  - [ ] Clipboard API für verbesserte Code-Kopier-Funktionalität.
  - [ ] Web Workers für schwere Berechnungen (Syntax-Highlighting).

- Erweiterte Barrierefreiheit & WCAG 2.1 AA (EAA 2025)
  - [ ] WCAG 2.1 AA Compliance-Audit mit axe-core durchführen.
  - [ ] Aria-live-Regionen für dynamische Content-Updates hinzufügen.
  - [ ] Screen-Reader-Announcements für Route-Änderungen implementieren.
  - [ ] Focus-Trap für modale Dialoge und Overlays erstellen.
  - [ ] Voice-Navigation-Kompatibilität implementieren.
  - [ ] Reduced-Motion-Präferenzen unterstützen.
  - [ ] Accessible Farbpalette mit 4.5:1 Kontrast-Minimum erstellen.
  - [ ] Alt-Text-Generierung für Code-Diagramm-Screenshots.
  - [ ] Accessibility-Statement erstellen (EAA-Pflicht ab Juni 2025).

- Core Web Vitals & Performance-Optimierung
  - [ ] Largest Contentful Paint (LCP) unter 2.5s optimieren.
  - [ ] Cumulative Layout Shift (CLS) unter 0.1 minimieren.
  - [ ] First Input Delay (FID) unter 100ms reduzieren.
  - [ ] OnPush Change Detection Strategy implementieren.
  - [ ] Virtual Scrolling für lange Code-Beispiel-Listen.
  - [ ] Selective Hydration für interaktive Komponenten.
  - [ ] Progressive Image Loading mit Blur-up-Effekt.
  - [ ] WebP/AVIF-Bildformat-Support mit Fallbacks.
  - [ ] Real User Monitoring (RUM) für Performance-Tracking.

- Moderne Architektur & Entwicklungsmuster
  - [ ] Micro-Frontend-Architektur für Skalierbarkeit evaluieren.
  - [ ] Module Federation Setup für zukünftige Erweiterung.
  - [ ] Feature-basierte Ordnerstruktur implementieren.
  - [ ] Domain-Driven Design Prinzipien anwenden.
  - [ ] Event-driven Architecture zwischen Modulen.
  - [ ] Custom TypeScript Transformers bei Bedarf.
  - [ ] Branded Types für Type-Safety implementieren.
  - [ ] Template Literal Types für Route-Management.

- Erweiterte Testing-Strategien
  - [ ] 90%+ Unit-Test-Coverage mit sinnvollen Tests erreichen.
  - [ ] Visual Regression Testing mit Chromatic/Percy.
  - [ ] Contract Testing für API-Integrationen.
  - [ ] Fuzz Testing für Input-Validierung.
  - [ ] Property-based Testing für komplexe Logik.
  - [ ] Chaos Engineering für Resilience Testing.
  - [ ] Cross-Browser Testing Automatisierung.
  - [ ] Load Testing für High-Traffic-Szenarien.

- Datenschutz, Compliance & rechtliche Aspekte
  - [ ] GDPR-konforme Cookie-Consent-Verwaltung implementieren.
  - [ ] Datenschutzerklärung und AGB-Seiten (DE/EN) erstellen.
  - [ ] Data Portability Features implementieren.
  - [ ] User Data Deletion Capabilities hinzufügen.
  - [ ] Audit Logging für Compliance-Zwecke.
  - [ ] Transparente Datensammlung-Praktiken implementieren.
  - [ ] Impressum im Footer verlinken (rechtliche Pflicht DE).
  - [ ] Altersverifikation bei Bedarf implementieren.

- Technisches SEO & Content-Strategie
  - [ ] Strukturierte Daten (JSON-LD) für Rich Snippets erweitern.
  - [ ] FAQ-Schema für Tutorial-Seiten implementieren.
  - [ ] Open Graph und Twitter Card Meta-Tags hinzufügen.
  - [ ] Breadcrumb-strukturierte Daten implementieren.
  - [ ] Headless CMS Integration (Strapi/Contentful) evaluieren.
  - [ ] Content-Versionierung und A/B-Testing.
  - [ ] Editorial Workflow mit Approval-Prozessen.
  - [ ] Related Content Recommendations implementieren.
  - [ ] Full-Text-Indexing für Content-Suche.

- Emerging Technologies Integration
  - [ ] WebAssembly für performance-kritische Code-Ausführung evaluieren.
  - [ ] Real-time Code-Ausführung im Browser mit WASM.
  - [ ] AI-powered Code-Completion-Suggestions implementieren.
  - [ ] Intelligente Code-Fehler-Erkennung und Vorschläge.
  - [ ] Personalisierte Lernpfad-Empfehlungen.
  - [ ] Natural Language zu Code Konvertierung.
  - [ ] Code-Ähnlichkeits-Erkennung für Plagiatsprävention.
  - [ ] Edge-Side Rendering für globale Performance.
  - [ ] Serverless Functions für dynamische Content-Generierung.

- Nachhaltigkeit & Green Coding
  - [ ] Carbon Footprint Messung und Reporting implementieren.
  - [ ] Energieeffiziente Coding-Praktiken anwenden.
  - [ ] Dark Mode für Energiekonservierung optimieren.
  - [ ] Green Metrics ins Performance-Monitoring integrieren.
  - [ ] Sustainable Hosting Provider evaluieren.
  - [ ] ESG-Compliance Reporting Dashboard.
  - [ ] Green Coding Guidelines für Contributors erstellen.

- Erweiterte Developer Experience
  - [ ] Development Environment Containerization (Docker).
  - [ ] Hot Module Replacement für schnellere Entwicklung.
  - [ ] Automated Changelog Generation implementieren.
  - [ ] Code Complexity Analysis und Reporting.
  - [ ] Dependency Update Automation mit Risk Assessment.
  - [ ] Feature Flag Deployment Strategies.
  - [ ] Blue-Green Deployment Capabilities.
  - [ ] Canary Deployments mit automatischem Rollback.
  - [ ] Infrastructure as Code (Terraform/CDK).

- Monitoring, Analytics & Observability
  - [ ] Application Performance Monitoring (APM) implementieren.
  - [ ] Error Tracking und Alerting mit Sentry.
  - [ ] User Session Recording und Analysis.
  - [ ] Synthetic Monitoring für Uptime.
  - [ ] Distributed Tracing für komplexe Operationen.
  - [ ] User Behavior Analytics implementieren.
  - [ ] Conversion Funnel Analysis hinzufügen.
  - [ ] Cohort Analysis für User Retention.
  - [ ] Predictive Analytics für Content-Empfehlungen.

- Erweiterte Internationalisierung
  - [ ] Right-to-Left (RTL) Sprach-Support implementieren.
  - [ ] Pluralization Rules für komplexe Sprachen.
  - [ ] Date/Time Lokalisierung hinzufügen.
  - [ ] Number Formatting Lokalisierung.
  - [ ] Currency Formatting für internationale User.
  - [ ] Locale-spezifische Sortierung und Suche.
  - [ ] Translation Management Workflow mit professionellen Übersetzern.

- Community & Open Source
  - [ ] User-generated Content Features implementieren.
  - [ ] Community-driven Code Example Contributions.
  - [ ] Voting und Rating System für Tutorials.
  - [ ] Discussion Forums oder Comment System.
  - [ ] User Profiles und Achievement System.
  - [ ] Social Features für Knowledge Sharing.
  - [ ] Mentorship Matching System.
  - [ ] Security Vulnerability Reporting Process.
  - [ ] Automated Contributor Recognition.

- Business & Monetarisierungs-Strategie
  - [ ] Subscription-basierte Premium Content Implementation.
  - [ ] Affiliate Marketing Integration für Development Tools.
  - [ ] Course Certification System implementieren.
  - [ ] Corporate Training Program Features.
  - [ ] Job Board Integration hinzufügen.
  - [ ] Sponsored Content Management.
  - [ ] Marketplace für User-generated Content.
  - [ ] User Lifetime Value Tracking.
  - [ ] Churn Prediction und Retention Strategies.
  - [ ] Pricing Optimization Testing.

- Erweiterte Content & UX Features
  - [ ] Adaptive Difficulty basierend auf User Performance.
  - [ ] Gamification Elements (Badges, Achievements, Leaderboards).
  - [ ] Progressive Disclosure für komplexe Code-Beispiele.
  - [ ] Contextual Help System mit Tooltips und Guides.
  - [ ] Advanced Code Editor mit IntelliSense-ähnlichen Features.
  - [ ] Code Diff Visualization für Versionsvergleiche.
  - [ ] Interactive Code Execution mit Sandboxing.
  - [ ] Collaborative Coding Features (Shared Sessions).
  - [ ] Code Review und Peer Learning Features.

- Backend & Infrastructure
  - [ ] GraphQL API für flexible Datenabfragen implementieren.
  - [ ] Redis Caching für häufig abgerufene Daten.
  - [ ] Database Indexing Optimierung.
  - [ ] API Rate Limiting und Throttling.
  - [ ] Microservices Architecture für Skalierbarkeit.
  - [ ] Event Sourcing für Audit Trail.
  - [ ] CQRS (Command Query Responsibility Segregation).
  - [ ] Multi-tenancy Support für Enterprise-Kunden.
  - [ ] Backup und Disaster Recovery Strategy.

- Mobile & Cross-Platform
  - [ ] Responsive Design für alle Bildschirmgrößen optimieren.
  - [ ] Touch-optimierte Interaktionen für mobile Geräte.
  - [ ] Offline-first Mobile Experience.
  - [ ] Native App Wrapper (Capacitor/Cordova) evaluieren.
  - [ ] Mobile-spezifische Performance-Optimierungen.
  - [ ] Gesture-basierte Navigation für Touch-Devices.
  - [ ] Voice Commands für Accessibility und moderne UX.

- Erweiterte Sicherheitsmaßnahmen
  - [ ] Web Authentication (WebAuthn) für passwortlose Anmeldung.
  - [ ] Two-Factor Authentication (2FA) implementieren.
  - [ ] OAuth 2.0/OpenID Connect Integration.
  - [ ] JSON Web Token (JWT) Security Best Practices.
  - [ ] SQL Injection Prevention (falls Backend-Integration).
  - [ ] Cross-Site Request Forgery (CSRF) Protection.
  - [ ] Regular Security Audits und Penetration Testing.
  - [ ] Dependency Vulnerability Monitoring (Snyk/npm audit).

- DevOps & Deployment
  - [ ] Kubernetes Deployment Configuration.
  - [ ] Container Orchestration mit Docker Swarm/K8s.
  - [ ] GitOps Workflow für Deployment Automation.
  - [ ] Multi-environment Configuration Management.
  - [ ] Automated Database Migrations.
  - [ ] Zero-downtime Deployments implementieren.
  - [ ] Infrastructure Monitoring mit Prometheus/Grafana.
  - [ ] Log Aggregation mit ELK Stack (Elasticsearch/Logstash/Kibana).
