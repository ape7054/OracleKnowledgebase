# MarketPulse

MarketPulse is a modern cryptocurrency market intelligence platform built with React and Material UI. This project showcases a responsive, feature-rich dashboard for monitoring cryptocurrency markets, making trades, and managing your portfolio.

## Features

- **Interactive Dashboard**: Comprehensive market overview with key metrics and insights
- **Real-time Price Charts**: Visualize cryptocurrency price movements with advanced charts
- **Market Sentiment Analysis**: Gauge the overall market sentiment (fear & greed index)
- **Responsive Design**: Optimized experience across desktop and mobile devices
- **Dark/Light Theme**: Toggle between dark and light mode based on your preference
- **Trading Interface**: Demo trading functionality with various order types
- **Portfolio Management**: Track your digital assets and performance

## Technology Stack

- **React**: Frontend library for building user interfaces
- **Material UI**: Component library with customizable themes
- **Recharts**: Responsive charting library for visualizations
- **React Router**: Navigation and routing between different pages
- **Vite**: Next-generation frontend build tool
- **Cryptocurrency Icons**: Library of crypto asset icons

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/market-pulse.git
   cd market-pulse
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
market-pulse/
├── src/                 # Source code
│   ├── api/             # API services and requests
│   ├── assets/          # Static assets like images
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers
│   ├── pages/           # Page components
│   │   ├── Dashboard.jsx   # Main dashboard page
│   │   ├── Trade.jsx       # Trading interface
│   │   └── Account.jsx     # User account and settings
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── public/              # Public assets
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Learning Opportunities

This project is excellent for learning:

1. **React Component Architecture**: How to structure a complex application
2. **Material UI Customization**: Advanced theming and component customization
3. **Data Visualization**: Creating interactive and responsive charts
4. **Context API**: State management across components
5. **Responsive Design**: Building interfaces that work on any device
6. **Modern JavaScript Practices**: ES6+ features, hooks, and functional components

## Future Enhancements

- Connect to real cryptocurrency APIs for live data
- Implement user authentication system
- Add portfolio tracking with historical performance
- Create mobile app using React Native
- Add social features like comments and sharing
- Implement notifications for price alerts

## License

MIT 