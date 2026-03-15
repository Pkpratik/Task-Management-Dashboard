# Task Management Dashboard

A high-performance, visually stunning Task Management Dashboard built with React, TypeScript, and Redux Toolkit. This application features a premium dark/light mode, smooth animations, and robust task management capabilities.

## ✨ Features

- **Core Task Management**: Create, edit, delete, and track tasks (Pending/Completed).
- **Task Attributes**: Manage Title, Description, Priority (Low/Medium/High), and Due Date.
- **Advanced UI/UX**:
  - **Glassmorphism Design**: Modern, premium aesthetic with subtle blurs and gradients.
  - **Dark Mode**: Seamlessly toggle between light and dark themes.
  - **Dual Views**: Toggle between streamlined List View and visual Card View.
  - **Animations**: Fluid transitions and micro-interactions using Framer Motion.
- **Productivity Tools**:
  - **Real-time Search**: Search tasks by title or description.
  - **Filtering**: Filter by Status and Priority.
  - **Stats Dashboard**: Overview of Total, Pending, and Completed tasks.
  - **Drag-and-Drop**: Effortlessly reorder tasks (Bonus Point).
- **Persistence**: Automatic state saving to LocalStorage.
- **Reliability**: Unit tests for core components using Vitest and React Testing Library.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Vanilla CSS with custom Utility System (no Tailwind dependencies)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Drag & Drop**: @hello-pangea/dnd
- **Testing**: Vitest, React Testing Library

## 📸 Screenshots

| View | Screenshot |
|------|------------|
| **List View (Light)** | ![List View](/home/user/.gemini/antigravity/brain/3564b0a7-a36e-44a3-93cf-0071f1fc1cda/list_view_light_mode_v2_1773437029112.png) |
| **Card View (Dark)** | ![Card View](/home/user/.gemini/antigravity/brain/3564b0a7-a36e-44a3-93cf-0071f1fc1cda/card_view_dark_mode_1773437031532.png) |
| **Modal (Dark)** | ![Modal](/home/user/.gemini/antigravity/brain/3564b0a7-a36e-44a3-93cf-0071f1fc1cda/modal_dark_mode_screenshot_1773437032320.png) |

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Run tests: `npm test`

## 📝 Design Decisions

- **Utility CSS System**: I implemented a custom Tailwind-like utility system in `index.css` to ensure visual consistency without adding heavy CSS dependencies. This allowed for granular control over premium effects like glassmorphism.
- **Redux Consistency**: Using Redux Toolkit ensures state is predictable and easily persisted to `localStorage`.
- **Z-Index Layering**: Modals use a robust layering system (z-index 50-70) to ensure they always appear above the dashboard and have proper focus with backdrop blurring.
