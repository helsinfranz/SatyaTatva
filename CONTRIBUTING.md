# Contributing to SatyaTatva

Thank you for considering contributing to **SatyaTatva**! We welcome contributions that help in the development of this platform to explore the wisdom of **Sanatan Dharma** through sacred texts, shlokas, and engaging UI. By contributing, you help make ancient wisdom accessible to everyone in an easy and engaging way. Here's a guide on how to contribute.

---

## Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md) to ensure a welcoming and respectful environment for everyone.

---

## What is SatyaTatva?

**SatyaTatva** is a platform that brings the wisdom of **Sanatan Dharma** to modern users with:
- **Vedas** and **Upanishads** available in **English** and **Hindi**.
- Sacred **Puranas** and **Shlokas** like **Hanuman Chalisa**, **Shiv Tandav Stotram**, etc.
- Additional **books** like the **Ramayana**, **Mahabharata**, **Ram Charitramanas**, etc, Also more coming soon.
- **Offline access** via **Progressive Web App (PWA)** feature, accessible across all devices.
- **Page flipping UI** for reading books and a user-friendly interface for reading texts.

Our goal is to provide an engaging, interactive, and easily accessible interface for all users.

---

## How to Contribute

There are several ways you can contribute to SatyaTatva:

1. **Report Issues:**
   - If you encounter a bug or issue, please report it using the **`bug`** label.
   - For suggestions or feature requests, use the **`feature request`** label.
   - Provide as much detail as possible (steps to reproduce, screenshots, etc.).

2. **Submit Changes (Pull Requests):**
   - Fork the repository and create a new branch:
     - Naming convention: `feature/<feature-name>` or `bugfix/<bug-name>`.
   - Implement your changes and test them locally.
   - Commit your changes following this format: `type(scope): message`.
     - Example: `fix(ui): resolve page flipping UI bug`.
   - Ensure your code adheres to our coding standards.
   - Submit a pull request for review.

3. **Review Pull Requests:**
   - If you're reviewing a pull request, check the code for clarity, potential bugs, and consistency with the project standards.
   - Leave comments, suggestions, or approve the pull request.

4. **Documentation:**
   - Improve existing documentation.
   - Help us write new tutorials or guides for users and developers.

---

## Development Guidelines

- **Code Style:** We follow standard JavaScript (or your language of choice) style guides. For JavaScript, we use [Prettier](https://prettier.io/) for formatting and [ESLint](https://eslint.org/) for linting.
- **Folder Structure:** Ensure that your changes are placed in the correct directory (e.g., `pages`, `public`, `components`).
- **Testing:** Write unit and integration tests where applicable.
- **Dependencies:** Ensure any new dependencies added are necessary and reviewed for security.
- **UI Guidelines:** Follow our design system (if any) or provide clean, readable code that complements the existing UI.

---

## Branching and Naming Conventions

- Create a new branch for your changes:
  - **Features:** `feature/<feature-name>`
  - **Bug Fixes:** `bugfix/<bug-name>`
- Pull requests should be opened for merging into the `develop` branch.
- Direct pushes to `master` or `UAT` branches are **not allowed**.

---

## Labels and Tags

We use the following labels to categorize and prioritize contributions:

- **Types:**
  - `bug`: For bug-related issues.
  - `enhancement`: For minor improvements or optimizations.
  - `feature request`: For adding new features.
  - `documentation`: For documentation changes or additions.
  - `testing`: For adding or modifying tests.
  - `refactor`: For improving code quality without changing functionality.

- **Scopes:**
  - `frontend`: Issues or changes related to the UI or frontend code.
  - `backend`: Issues or changes related to backend or server code.
  - `API`: Issues or changes related to the API layer.
  - `UI/UX`: Issues or improvements related to user experience and interface design.
  - `performance`: Issues or optimizations related to performance.

- **Priority:**
  - `priority: high`: Urgent issues or features.
  - `priority: medium`: Important but not urgent.
  - `priority: low`: Low priority enhancements.

- **Status:**
  - `good first issue`: Issues suitable for beginners.
  - `help wanted`: Issues where the project maintainers need help.
  - `in progress`: Work in progress.
  - `needs review`: Awaiting review.
  - `blocked`: Unable to proceed until certain conditions are met.

---

## Getting Started

To contribute to **SatyaTatva**, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/helsinfranz/satyatatva.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Review Process

- All pull requests must be reviewed by at least one other contributor before being merged.
- Once approved, the PR can be merged into the `develop` branch.

---

We look forward to your contributions! If you have any questions or need assistance, please open an issue or contact us via our community channels.

---

## Thank You for Contributing!

Your contribution helps make **SatyaTatva** a great resource for people seeking the wisdom of Sanatan Dharma. 🙏
