# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# React Big Calendar with Bar Graph

## Features
- React Big Calendar integration (day, week, month views).
- Dummy JSON data with random dates.
- Dates with data are shown in the calendar.
- Selected date is highlighted.
- On clicking a highlighted date → popup with bar chart.
- On clicking an empty date → shows warning: *No data found for the selected date.*
- Works on Windows, macOS, and Linux.

---

## Installation

1. Create a Vite + React project:
   ```bash
   npm create vite@latest react-big-calendar-bar-graph
   cd react-big-calendar-bar-graph
