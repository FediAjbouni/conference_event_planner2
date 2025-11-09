# 🎉 Conference Expense Planner

A modern, professional React-based web application for planning and budgeting conference events. This application helps event organizers calculate costs for venues, add-ons, and meals with an intuitive and beautiful user interface.

![Conference Expense Planner](https://img.shields.io/badge/React-18.2.0-blue) ![Redux](https://img.shields.io/badge/Redux-Toolkit-purple) ![Vite](https://img.shields.io/badge/Vite-5.2.0-yellow)

## ✨ Features

### 🏢 Venue Selection
- Choose from 5 different venue types with varying capacities
- Real-time cost calculation
- Smart quantity limits (max 3 Auditorium Halls, max 10 for other venues)
- Visual cards with images and pricing

### 🎤 Add-ons Management
- Select from 5 essential conference add-ons:
  - Projectors
  - Speakers
  - Microphones
  - Whiteboards
  - Signage
- Flexible quantity selection
- Individual cost tracking

### 🍽️ Meals Planning
- 4 meal options: Breakfast, High Tea, Lunch, Dinner
- Per-person pricing calculation
- Dynamic number of attendees (1-1000 people)
- Checkbox selection for easy meal planning

### 💰 Cost Breakdown
- Comprehensive cost summary
- Category-wise breakdown (Venue, Add-ons, Meals)
- Detailed itemized list
- Grand total calculation
- Beautiful gradient UI with animations

### ✅ Validation & Error Handling
- Real-time form validation
- User-friendly error messages
- Animated notifications
- Input constraints enforcement
- Prevents invalid selections

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd conference_event_planner2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Built With

- **React 18.2.0** - UI library
- **Redux Toolkit 2.2.3** - State management
- **Vite 5.2.0** - Build tool and dev server
- **React Redux 9.1.1** - React bindings for Redux

## 📁 Project Structure

```
conference_event_planner2/
├── public/
│   ├── AUdi.png
│   ├── bgevent.png
│   └── conference.png
├── src/
│   ├── assets/
│   ├── AboutUs.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── ConferenceEvent.jsx
│   ├── ConferenceEvent.css
│   ├── TotalCost.jsx
│   ├── TotalCost.css
│   ├── venueSlice.js
│   ├── avSlice.js
│   ├── mealsSlice.js
│   ├── store.js
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Key Components

### App.jsx
Main landing page with "Get Started" button and About Us section.

### ConferenceEvent.jsx
Core component handling:
- Venue selection
- Add-ons management
- Meals planning
- Navigation between sections

### TotalCost.jsx
Displays comprehensive cost breakdown with:
- Category totals
- Itemized list
- Grand total
- Back navigation

### Redux Slices
- **venueSlice.js** - Manages venue state
- **avSlice.js** - Manages add-ons state
- **mealsSlice.js** - Manages meals state

## 💡 Usage Guide

1. **Start Planning**: Click "Get Started" on the landing page
2. **Select Venues**: Choose your conference venues and quantities
3. **Add Equipment**: Select necessary add-ons (projectors, microphones, etc.)
4. **Plan Meals**: Enter number of attendees and select meal options
5. **View Details**: Click "Show Details" to see complete cost breakdown
6. **Review**: Check itemized costs and total amount

## 🎯 Features in Detail

### Smart Validation
- Minimum 1 venue required
- Maximum 3 Auditorium Halls
- Maximum 10 items per venue type
- Number of people: 1-1000
- Real-time error feedback

### Beautiful UI/UX
- Gradient backgrounds
- Smooth animations
- Hover effects
- Responsive design
- Professional color scheme

### State Management
- Centralized Redux store
- Immutable state updates
- Predictable state changes
- Easy debugging

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and optimized builds. Configuration can be found in `vite.config.js`.

### ESLint Configuration
Linting rules are defined in `.eslintrc.cjs` for code quality.

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Color Scheme

- Primary Blue: `#133b6a`
- Accent Gold: `#EFC16B`
- Gradient Purple: `#667eea` to `#764ba2`
- Success: `#5291D9`
- Warning: `#52D7D9`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 About BudgetEase Solutions

Welcome to BudgetEase Solutions, your trusted partner in simplifying budget management and financial solutions. We understand the importance of effective budget planning and strive to provide intuitive, user-friendly solutions to meet diverse needs.

## 🙏 Acknowledgments

- Images from Pixabay
- Icons and design inspiration from modern UI/UX practices
- React and Redux communities for excellent documentation

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Made with ❤️ by BudgetEase Solutions**