# Centrum Kontroli Misji "Krzysiu"

Aplikacja webowa typu Full-Stack pełniąca funkcję panelu kontrolnego (Dashboard). Służy do monitorowania parametrów życiowych "Krzysia" oraz utrzymywania dwustronnej komunikacji tekstowej. Cały system jest skonteneryzowany.

## Co potrafi system?

* **Moduł Telemetrii:** Wyświetla przejrzystą tabelę z historią parametrów życiowych (poziom energii, tętno, temperatura, nastrój) wraz z precyzyjnymi, sformatowanymi znacznikami czasu.
* **Panel Komunikacyjny:** Interfejs czatu, umożliwiający płynną wymianę wiadomości.
* **Trwałość Danych:** Wszystkie odczyty i historia czatu są na trwale zapisywane w relacyjnej bazie danych.

## 🛠️ Wykorzystane technologie

* **Frontend:** React, TypeScript, CSS (Flexbox/Grid)
* **Backend:** Python, FastAPI, Pydantic
* **Baza Danych:** PostgreSQL, SQLAlchemy (ORM)
* **Infrastruktura:** Docker, Docker Compose

## 💻 Jak uruchomić aplikację?

Dzięki wykorzystaniu platformy Docker, uruchomienie pełnego środowiska (baza danych, API, aplikacja kliencka) sprowadza się do jednej komendy.

**Wymagania wstępne:** * Zainstalowany Docker oraz Docker Compose.

**Kroki:**
1. Otwórz terminal w głównym katalogu projektu (tam, gdzie znajduje się plik `docker-compose.yml` i `README.md`).
2. Zbuduj i uruchom wszystkie serwisy w tle, wpisując komendę:
   ```bash
   docker compose up --build -d