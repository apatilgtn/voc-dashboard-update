# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh





# InsightPulse - Customer Experience Analytics Platform

## Project Overview
InsightPulse is a customer experience analytics dashboard that provides real-time insights and analytics for customer feedback, sentiment analysis, and contact center performance.

## Features
- User Authentication
- Real-time Analytics Dashboard
- Feedback Management
- Contact Center Analytics
- Custom Analytics Views
- Settings Management

## Tech Stack
- React.js
- Tailwind CSS
- Lucide React (for icons)
- Recharts (for charts and graphs)

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation Steps
1. Clone the repository
```bash
git clone [your-repository-url]
cd voc-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Create a virtual environment (for backend if applicable)
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1  # For PowerShell
source venv/bin/activate     # For Unix/Linux
```

### Running the Project Locally
1. Start the development server
```bash
npm run dev
```

2. Access the application
- Open browser and navigate to: `http://localhost:5173/login`
- Use the following credentials:
  - Email: admin@insightpulse.com
  - Password: admin123

## Project Structure
```
src/
├── components/
│   └── DashboardLayout.jsx
├── pages/
│   ├── AnalyticsPage.jsx
│   ├── ContactCenterAnalytics.jsx
│   ├── DashboardPage.jsx
│   ├── FeedbackFormPage.jsx
│   ├── FeedbackPage.jsx
│   ├── LoginPage.jsx
│   └── SettingsPage.jsx
├── hooks/
├── services/
├── App.jsx
├── index.css
└── main.jsx
```

## Development History

### Initial Setup
1. Created React project with Vite
2. Added Tailwind CSS configuration
3. Configured basic project structure

### Authentication Implementation
1. Created Login page with following features:
   - Email/Password authentication
   - Remember me functionality
   - Forgot password option
   - Error handling
   - Protected routes

### Dashboard Layout
1. Created DashboardLayout component with:
   - Responsive sidebar
   - Navigation menu
   - Logout functionality
   - Ocean/Sky blue theme

### Pages Implementation
1. Dashboard Page
   - Real-time metrics
   - Analytics charts
   - Performance indicators

2. Analytics Page
   - Sentiment analysis
   - User engagement metrics
   - Response time analysis

3. Feedback Page
   - Feedback management
   - Category-wise analysis
   - Real-time updates

4. Contact Center Analytics
   - Agent performance
   - Queue metrics
   - Customer satisfaction

5. Settings Page
   - Profile management
   - Notification preferences
   - Display settings
   - Integration options

### Styling and UI Improvements
1. Implemented responsive design
2. Added Tailwind CSS styling
3. Incorporated Lucide icons
4. Created consistent color scheme

## Available Scripts
- `npm run dev` - Starts development server
- `npm run build` - Builds the project for production
- `npm run preview` - Preview production build locally

## Environment Variables
Create a `.env` file in the root directory:
```
VITE_API_URL=your_api_url
```

## Additional Notes
- The project uses local storage for authentication
- Real-time data is currently simulated
- All charts are powered by Recharts library

## Future Improvements
1. Implement real API integration
2. Add unit tests
3. Improve error handling
4. Add more analytics features
5. Enhance mobile responsiveness

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
[Your License Here]

## Contact
Your Name - your.email@example.com
Project Link: [your-repository-url]