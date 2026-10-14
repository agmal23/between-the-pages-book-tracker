# AI Development Log — Between the Pages

This document records key prompts used to guide the development of the Between the Pages Book Tracker.

## Five Key Prompts

### Prompt 1 — Project Planning and Design

"Help me build a Book Tracker web application from scratch, step by step. Use HTML, CSS, and vanilla JavaScript. I want a polished, responsive interface with a premium editorial bookstore aesthetic. Explain each stage clearly and wait for my confirmation before moving to the next stage."

### Prompt 2 — HTML Structure

"Create a semantic HTML structure for a responsive Book Tracker dashboard. Include navigation, a welcome section, reading statistics, a book collection area, search, status filters, and an accessible form for adding books."

### Prompt 3 — Visual Design

"Style the Book Tracker with a warm paper background, dark ink tones, amber accents, elegant serif headings, refined cards, clear spacing, and responsive layouts. Include accessible focus states and respect reduced-motion preferences."

### Prompt 4 — Application Functionality

"Implement the Book Tracker using vanilla JavaScript. Allow users to add books with a title, author, and reading status; validate required fields; show newest books first; search by title or author without case sensitivity; filter by status; update reading statistics; and remove books with confirmation."

### Prompt 5 — Persistence and Testing

"Add browser localStorage persistence to the Book Tracker so the collection and reading statuses survive a page refresh. Help me test the application's functionality, responsive layout, validation, search, filters, and delete behavior before deployment."

## AI Mistake and Correction

**Mistake:** During the initial development process, the Add Book form's HTML structure and styling were created before the JavaScript functionality was implemented. As a result, the form controls were not functional initially.

**How I identified it:** I tested the application in the browser and checked whether clicking the Add Book button opened the form and whether submitting the form added a book to the collection.

**Correction:** I implemented JavaScript event listeners for the Add Book button, form submission, and modal close controls. I also added form validation and connected book creation to the dashboard rendering function.

**Result:** After implementing the missing JavaScript functionality, I tested the form in the browser and verified that books could be added, the statistics updated, and the collection displayed the newly added books.


## Development Approach

The application was built incrementally, with the HTML structure, CSS design, JavaScript functionality, browser storage, and documentation developed in separate stages.

Each feature should be tested in the browser before being considered complete.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage
- AI-assisted development and debugging