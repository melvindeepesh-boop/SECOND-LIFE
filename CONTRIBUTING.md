# Contributing to SECOND-LIFE

First off, thank you for taking the time to contribute to SecondLife! We are excited to build the future of the circular economy with you. 

As a contributor, please follow these guidelines to make the process smooth and productive for everyone.

## Code of Conduct

This project and everyone participating in it is governed by the [SecondLife Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs
If you find a bug, please open a new issue using our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md). Please include:
* A clear description of the issue.
* Step-by-step instructions to reproduce it.
* Details about your runtime environment (OS, Browser, Node.js version).
* Screenshots or screen recordings if applicable.

### Suggesting Features
We welcome ideas to make SecondLife better! To propose a feature, use our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md). Please specify:
* The goal/problem you are trying to solve.
* A detailed explanation of your proposed solution.
* Any alternative designs or flows considered.

### Pull Requests
To submit a code change:
1. **Fork** the repository and create your branch from `main`.
2. Ensure you install the project dependencies using `npm install`.
3. If you've added code, make sure to test it locally.
4. Run `npm run lint` to ensure code style compliance.
5. Run `npm run build` to make sure the Next.js application compiles successfully.
6. Commit your changes using descriptive commit messages (e.g., `feat: add camera scan transition`, `fix: resolving map sizing issue`).
7. Open a pull request against the `main` branch, following the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md).

## Local Development Workflow

### Requirements
* Node.js (v20+ recommended)
* npm or yarn

### Setup Instructions
1. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/SECOND-LIFE.git
   cd SECOND-LIFE
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build the application for production:
   ```bash
   npm run build
   ```
5. Run linter checks:
   ```bash
   npm run lint
   ```

Thank you for contributing! 🌍
