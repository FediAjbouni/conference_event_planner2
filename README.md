# Conference Expense Planner

A React-based web application for planning and budgeting conference events. Calculate costs for venues, equipment, and meals with real-time validation and comprehensive cost breakdowns.

![Conference Expense Planner](https://img.shields.io/badge/React-18.2.0-blue) ![Redux](https://img.shields.io/badge/Redux-Toolkit-purple) ![Vite](https://img.shields.io/badge/Vite-5.2.0-yellow)

## Features

- **Venue Selection**: Choose from 5 venue types with capacity-based pricing and quantity limits
- **Equipment Add-ons**: Select projectors, speakers, microphones, whiteboards, and signage
- **Meal Planning**: Configure meals for 1-1000 attendees with per-person pricing
- **Cost Breakdown**: View itemized costs by category with grand total calculation
- **Validation**: Real-time input validation with user-friendly error messages

## Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Installation

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- React 18.2.0
- Redux Toolkit 2.2.3
- Vite 5.2.0
- React Redux 9.1.1

## Project Structure

```
src/
├── ConferenceEvent.jsx    # Main event planning interface
├── TotalCost.jsx          # Cost breakdown display
├── venueSlice.js          # Venue state management
├── avSlice.js             # Add-ons state management
├── mealsSlice.js          # Meals state management
└── store.js               # Redux store configuration
```

## Usage

1. Click "Get Started" on the landing page
2. Select venues and quantities
3. Choose equipment add-ons
4. Configure meals and attendee count
5. View detailed cost breakdown

## License

This project is licensed under the MIT License.
