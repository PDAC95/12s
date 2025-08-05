# 12s (Soisi Platform)

A social-gaming platform that allows users to create profiles, share gaming victories via social posts, and engage in peer-to-peer challenges with rewards.

## Tech Stack

### Backend
- Node.js with TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- Auth0 Authentication

### Frontend Web
- React with TypeScript
- Vite
- TailwindCSS
- React Router
- Redux Toolkit

### Frontend Mobile
- React Native with TypeScript
- React Navigation
- Redux Toolkit

### Infrastructure
- Monorepo with Nx/Lerna
- GitHub for version control
- Husky for git hooks
- ESLint + Prettier for code quality
- Conventional commits

## Project Structure
12s/
├── apps/
│   ├── backend/          # Express.js API server
│   ├── web/              # React web application
│   └── mobile/           # React Native mobile app
├── packages/
│   ├── shared/           # Shared utilities and types
│   └── ui-components/    # Reusable UI components
├── .husky/               # Git hooks configuration
├── package.json          # Root dependencies and scripts
└── README.md            # This file

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- PostgreSQL (for database)

### Installation

1. Clone the repository:
`ash
git clone https://github.com/PDAC95/12s.git
cd 12s

Install dependencies:

bashnpm install

Install dependencies for each app:

bash# Backend dependencies
cd apps/backend && npm install && cd ../..

# Web app dependencies  
cd apps/web && npm install && cd ../..

# Mobile app dependencies
cd apps/mobile && npm install && cd ../..
Development Workflow
Branch Strategy (GitFlow)

master: Production-ready code
develop: Integration branch for features
feature/SOI-XXX-description: Feature development
release/vX.X.X: Release preparation
hotfix/vX.X.X-description: Production hotfixes

Commit Guidelines
This project uses conventional commits. Format: type(scope): description
Types:

feat: New features
fix: Bug fixes
docs: Documentation changes
style: Code style changes
refactor: Code refactoring
test: Test additions/modifications
chore: Build process or auxiliary tool changes

Code Quality

Pre-commit hooks automatically run ESLint and Prettier
Commit messages are validated against conventional format
All code must pass linting before commit

Available Scripts
bashnpm run prepare          # Initialize Husky git hooks
Contributing

Create feature branch from develop: git checkout -b feature/SOI-XXX-description
Make changes following code standards
Commit using conventional format
Push and create Pull Request to develop branch

Project Status
Current Sprint: Sprint 1 - Technical Setup
Phase: Repository configuration and monorepo structure

For questions or support, contact the development team.
