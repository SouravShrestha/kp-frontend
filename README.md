# Kriva Pictures - Photography Portfolio Website

A modern, responsive React-based photography portfolio website for Kriva Pictures, specializing in capturing life's most precious moments including weddings, engagements, birthdays, maternity shoots, baby showers, and other celebrations.

## 🌟 Features

- **Multi-page Portfolio**: Showcase different photography services and galleries
- **Responsive Design**: Optimized for all devices using Tailwind CSS
- **Dynamic Gallery**: Interactive photo galleries with masonry layout
- **Contact System**: Integrated contact form for client inquiries
- **Service Packages**: Detailed photography service offerings
- **FAQ Section**: Comprehensive answers to common questions
- **Smooth Animations**: Enhanced user experience with moving text banners and transitions

## 🚀 Live Demo

- **Production**: [https://souravshrestha.github.io/kp-frontend](https://souravshrestha.github.io/kp-frontend)
- **Backend API**: [https://kp-backend-pfn7.onrender.com](https://kp-backend-pfn7.onrender.com)

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Routing**: React Router DOM 7.9.1
- **Styling**: Tailwind CSS with PostCSS
- **Image Management**: Cloudinary integration
- **UI Components**: 
  - Splide.js for carousels and sliders
  - React Responsive Masonry for gallery layouts
  - React Fast Marquee for moving text animations
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
src/
├── App.js                 # Main application component with routing
├── index.js              # Application entry point
├── apis/                 # API configuration and services
│   ├── config.js         # API endpoints and request configuration
│   ├── index.js          # Main API exports
│   └── functions/        # API service functions
│       ├── communication.js  # Contact/email services
│       ├── content.js    # Content management
│       ├── folder.js     # Gallery folder operations
│       └── media.js      # Image/media operations
├── assets/              # Static assets
│   ├── fonts/           # Custom font files
│   ├── icons/           # Icon assets
│   ├── images/          # Image assets
│   └── styles/          # CSS styles
├── components/          # Reusable UI components
│   ├── MovingTextBanner.jsx  # Animated text banner
│   ├── Navbar.jsx       # Navigation component
│   └── SlidingNavbar.jsx     # Mobile navigation
├── pages/              # Page components
│   ├── Home/           # Homepage sections and components
│   ├── Gallery/        # Photo gallery and viewer
│   ├── Packages/       # Photography service packages
│   ├── Contact/        # Contact form and information
│   ├── FAQ/            # Frequently asked questions
│   ├── Footer/         # Website footer
│   └── NotFound.jsx    # 404 error page
├── constants/          # Application constants
│   └── api.js          # API-related constants
├── resources/          # Content and text resources
│   └── texts.js        # Static text content
└── utils/              # Utility functions
    ├── dateUtils.js    # Date formatting utilities
    └── iconMapping.js  # Icon mapping utilities
```

## 🎯 Key Pages & Features

### Home Page
- Hero section with image carousel
- Service overview sections
- Moving text banner showcasing photography types
- Call-to-action sections

### Gallery
- Dynamic photo galleries organized by folders
- Masonry layout for optimal image display
- Individual gallery viewer with navigation
- Cloudinary integration for optimized image delivery

### Packages
- Detailed photography service offerings
- Pricing and package information
- Service comparison features

### Contact
- Contact form with email integration
- Business information and location details
- Social media links

### FAQ
- Comprehensive frequently asked questions
- Organized by categories for easy navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SouravShrestha/kp-frontend.git
   cd kp-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_BASE_URL=your_backend_api_url
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📜 Available Scripts

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimized performance.

### `npm run deploy`
Deploys the built application to GitHub Pages.

## 🌐 API Integration

The application connects to a backend API for:
- **Image Management**: Fetching gallery images and folders
- **Content Management**: Dynamic content and testimonials  
- **Contact Forms**: Processing client inquiries
- **Package Information**: Service details and pricing
- **FAQ Data**: Dynamic FAQ content

API endpoints are configured in `src/apis/config.js` with full error handling and loading states.

## 🎨 Styling & Design

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Custom Fonts**: Almarai, Barlow, Meysha, and TT Jenevers for unique typography
- **Responsive Design**: Mobile-first approach ensuring compatibility across all devices
- **Color Scheme**: Professional photography-focused color palette defined in Tailwind config

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and inquiries, please contact Kriva Pictures through the website's contact form or reach out via the provided social media channels.

## 📄 License

This project is proprietary software owned by Kriva Pictures. All rights reserved.
