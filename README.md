# YAPS — Yet Another Picture Sharing App

## Overview

**YAPS (Yet Another Picture Sharing App)** is a project-based learning exercise aimed at developing a strong, practical understanding of **full-stack web development fundamentals**.

Conceptually, YAPS is inspired by the earliest versions of **Instagram** — a minimal platform focused on user accounts and photo sharing, without feeds, algorithms, or social complexity. The purpose of the project is not feature completeness, but **architectural clarity and technical depth**.

---

## Motivation & Context

This project is developed under mentorship as part of a learning experience that emphasizes:

- Understanding systems from first principles
- Building abstractions only after experiencing the underlying problems
- Learning *why* tools and frameworks exist, not just how to use them

Rather than starting with modern frameworks, YAPS intentionally begins close to the metal using **Node.js core modules**. Routing, request parsing, static file serving, and authentication are implemented manually to expose the problems that frameworks like Express.js solve.

Frameworks will be introduced later — **after their value is earned**.

---

## Core Learning Principles

- **No frameworks initially**
  - No Express, no middleware libraries
  - Routing and HTTP handling implemented manually
- **Minimal dependencies**
  - External libraries are added only when they solve a real problem
  - Example: `argon2` for secure password hashing
- **Explicit architecture**
  - Gradual movement toward an MVC-like structure:
    - Router
    - Controllers
    - Services
    - Models
- **Intentional friction**
  - Writing verbose or repetitive code on purpose to understand abstractions
- **Limited AI usage**
  - AI used as a debugging partner and reviewer, not as a solution generator
- **Iterative development**
  - Work is done in focused sprints with clear goals and takeaways

---

## End Goal

By the end of YAPS, the project aims to provide:

- A clear mental model of how web applications work end-to-end
- Confidence in designing and debugging backend systems
- A deep appreciation for frameworks based on experience, not assumption
- A documented trail of technical and conceptual growth

YAPS is less about building *an app* and more about building **engineering competence**.
