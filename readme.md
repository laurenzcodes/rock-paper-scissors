# Rock Paper Scissors

#### Play it here (click the badge)

[![Netlify Status](https://api.netlify.com/api/v1/badges/5b0b1384-e236-44d5-a4e1-e64c3308caf8/deploy-status)](https://rps-pareto.netlify.app)

## Description

Rock Paper Scissors is a simple browser game built with HTML, SCSS, and Vanilla JS. The game allows players to either play against a computer (PvC) or watch a computer vs computer match (CvC). The history of previous games is also displayed.

## Installation and Setup

### Prerequisites

- NodeJS Version v18.17.0
- Npm version 9.6.7

### Running the Project

1. Clone the repository to your local machine.
2. Navigate to the project folder.
3. Install the dependencies with:
   ```
   npm install
   ```
4. Run the local development build with:
   ```
   npm start
   ```
   Mainly developed with Chrome 115.0.5790.172, but also tested with Firefox & MS Edge.

## Game details & instructions

- **Player vs Computer (PvC):** To play against a Computer, select this option and choose the hand you want to play.
- **Computer vs Computer (CvC):** To watch a computer vs computer match (CvC), simply select the option.
- **Previous Games:** Previous game results can be viewed on the right side panel on the start screen, where there is also the option to clear the history.

## Technical Highlights

- **Bundler used:** Parcel, a lightweight and efficient bundler that fits well with the project's simplicity and build needs.
- **HTML Structure:** Utilized `posthtml-include` to manage HTML files, allowing for the creation of separate HTML partials that are automatically merged during build time. This modular approach avoids code duplication, simplifies maintenance, and ensures a clean, ready-to-serve HTML file without affecting flexibility in development.
- **Styling:** Used SCSS for better styling structure (nested rules and variables).
- **Code Style:** Used a combination of Prettier and ESLint with the Airbnb ruleset (and some custom overrides) to ensure code style consistency.

## Code Structure

Breakdown of the files in the `./src` folder:

- `index.html`: Wrapper HTML file, containing the main structure of the page.
- `index.js`: Initializing JavaScript file that starts the UI script, initializes local storage, and populates previous games.
- `styles.scss`: Main SCSS file, importing specific styles for variables, base styling, header, UI, and game components.
- `assets`: Contains images and icons used in the project.
- `partials`: Contains HTML fragments like headers, main content, new-game, previous-games, etc.
- `scripts`: Holds the JavaScript logic files
  - `data-store.js`: Handles data storage getters and setters.
  - `game-logic.js`: Contains core game logic and interactions.
  - `previous-games.js`: Responsible for rendering previous game records.
  - `ui-logic.js`: Manages UI interactions and updates.
  - `tests`: Contains unit tests
- `styles`: Contains various SCSS files for specific parts of the UI.

## Testing

### Running Unit Tests

To execute the unit tests for the project, simply run the following command:

```bash
npm t
```

### End-to-End Testing with Cypress

To run the end-to-end tests for the application, use the command:

```bash
npm run cypress:open
```

This command concurrently launches the local development server and the Cypress testing suite.

You can find the Cypress test files within the `./cypress/e2e/` directory. Currently, there are tests for both "Player vs. Computer" and "Computer vs. Computer" modes, which together provide comprehensive coverage of the site's primary user interactions.

### Testing Strategy Overview

Please note that test coverage for the following files may appear to be limited. This is primarily because many functions within these files interact directly with the DOM, making them more suitable for evaluation through E2E tests (using `cypress`) rather than unit tests.

- `scripts/ui-logic.js`
- `scripts/game-logic.js`
- `scripts/previous-games.js`
