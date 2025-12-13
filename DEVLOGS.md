## Development Log

### Log #1 — 13/12/2025

#### Current:

- Debugged authentication issues after moving HTML files into `/public/pages`
- Fixed mismatches between:
  - Clean URLs (`/login`)
  - Canonical redirects (`/login.html`)
  - API endpoints (`POST /login`)
- Refactored router logic to:
  - Separate page routing from API routing
  - Normalize `.html` extensions for POST requests
- Ensured frontend fetch endpoints matched backend routes
- Stabilized inline feedback by resolving endpoint inconsistencies

#### Next:

1. Reintroduce **password validation**
   - Enforce uppercase, symbol, number, and minimum length
   - Keep validation in the service layer
2. Formalize the **next task from Jules**
   - Review notes and session recording
   - Define the next iteration goal before coding