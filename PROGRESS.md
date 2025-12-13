# YAPS — Development Progress

This document tracks YAPS through **iterations** and **development logs**.  
Each iteration introduces meaningful technical and conceptual growth.

---

## Iterations

### BURST #1 — Barebones HTTP Server & Dynamic Responses

**Goal:** Understand raw HTTP mechanics.

- Built a Node.js HTTP server using only core modules
- Served plaintext responses based on URL paths
- Implemented simple dynamic behavior (e.g. `/today`, `/tomorrow`)
- Learned:
  - How requests and responses work at a low level
  - Why hardcoded routing does not scale

---

### BURST #2 — HTML Rendering & Custom Router

**Goal:** Move from plaintext responses to structured HTML.

- Served HTML pages instead of plaintext
- Injected dynamic content into HTML
- Introduced a `Router` class to centralize request handling
- Router supported **GET requests only**
- Design inspired by Express.js, implemented manually
- Learned:
  - Why routers exist
  - How URL-to-handler mapping works
  - The value of separation of concerns

---

### BURST #3 — Signup System & MVC Direction

**Goal:** Introduce user input and persistence.

- Created a signup form
- Implemented POST request handling
- Stored users in a JSON file (mock database)
- Added password validation rules
- Introduced:
  - Controllers (HTTP logic)
  - Services (business logic)
  - Models (data representation)
- Architecture began resembling MVC
- Learned:
  - How POST differs from GET
  - Why validation belongs in the service layer
  - Why services should not depend on HTTP details

---

### BURST #4 — Authentication System v1

**Goal:** Enable login and structured API routing.

- Implemented login functionality
- Added a controller-based route registry
- Distinguished:
  - Page routes (HTML)
  - API routes (JSON)
- Built a frontend that communicates with backend endpoints
- Clarified terminology:
  - Routes → URL + HTTP method
  - Controllers → request handlers
  - Services → domain logic
- Learned:
  - How frontend/backend contracts must align
  - Why consistent URL design matters

---

### BURST #4.1 — Async Frontend & Inline Feedback

**Goal:** Improve UX and async communication.

- Converted auth flow to use `fetch` and async requests
- Added inline success/error feedback
- Removed full-page reloads
- Introduced URL rewriting and canonical URLs
- Learned:
  - Why async bugs are harder to trace
  - How small URL mismatches break entire flows

---

### BURST #4.2 — Password Hashing & Security

**Goal:** Secure user credentials.

- Integrated `argon2` for password hashing
- Stored hashed passwords instead of plaintext
- Implemented secure password verification
- Learned:
  - Why hashing ≠ encryption
  - How salts prevent rainbow table attacks
  - Why proper libraries are mandatory for security

---