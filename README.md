# 🌌 Exoplanet Hunter

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://exoplanet-hunter.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

> Discover distant worlds using AI-powered analysis and real NASA data from Kepler, K2, and TESS missions.

## 🚀 Overview

Exoplanet Hunter is an interactive web application that enables users to explore and detect exoplanets using machine learning and authentic NASA mission data. Built for the NASA Space Apps Challenge 2025, this app combines cutting-edge AI with educational resources to make exoplanet science accessible to everyone.

## ✨ Features

### 🔭 AI-Powered Detection
- Upload light curve data (CSV format) to detect potential planetary transits
- Machine learning model analyzes brightness variations to identify exoplanet candidates
- Real-time confidence scores and detailed analysis results
- Support for Kepler, K2, and TESS mission data formats

### 🌍 NASA Data Explorer
- Browse 5,000+ confirmed exoplanets from NASA's Exoplanet Archive
- Filter by mission (Kepler, K2, TESS), discovery method, and planet characteristics
- Interactive data visualization with sortable tables
- Detailed planet information including orbital period, radius, and host star properties

### 📊 Interactive Visualizations
- Dynamic charts showing exoplanet size distributions
- Orbital period analysis across different missions
- Host star temperature comparisons
- Responsive charts built with Recharts

### 📚 Educational Resources
- Comprehensive learning section explaining transit photometry
- Real mission examples from Kepler, K2, and TESS
- Astronomy glossary with key terms
- Step-by-step guides on how exoplanet detection works

### 🎨 Modern UI/UX
- Beautiful space-themed design with starfield backgrounds
- Responsive layout optimized for all devices
- Dark mode support with custom color schemes
- Smooth animations and transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. Clone the repository:
\`\`\`bash
git clone https://github.com/NinGa88/v0-exoplanet-detection-app.git
cd v0-exoplanet-detection-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🗂️ Project Structure

\`\`\`
v0-exoplanet-detection-app/
├── app/
│   ├── page.tsx              # Homepage with hero and features
│   ├── detector/
│   │   └── page.tsx          # AI detection interface
│   ├── explorer/
│   │   └── page.tsx          # NASA data browser
│   ├── learn/
│   │   └── page.tsx          # Educational resources
│   ├── results/
│   │   └── page.tsx          # Detection results display
│   ├── layout.tsx            # Root layout with navigation
│   └── globals.css           # Global styles and theme
├── components/
│   ├── navigation.tsx        # Main navigation bar
│   ├── navigation-wrapper.tsx # Suspense wrapper for navigation
│   └── ui/                   # shadcn/ui components
├── lib/
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
\`\`\`

## 🎯 Usage

### Detecting Exoplanets

1. Navigate to the **Detector** page
2. Upload a CSV file containing light curve data with columns:
   - `time`: Observation timestamps
   - `flux`: Brightness measurements
3. Click "Run AI Detection"
4. View results including:
   - Detection confidence score
   - Transit characteristics
   - Visualization of the light curve

### Exploring NASA Data

1. Go to the **Data Explorer** page
2. Use filters to narrow down exoplanets by:
   - Discovery mission (Kepler, K2, TESS)
   - Planet size and orbital period
   - Host star properties
3. Click on any planet to view detailed information
4. Explore interactive charts showing population statistics

### Learning About Exoplanets

1. Visit the **Learn** page
2. Read about transit photometry and detection methods
3. Explore real mission examples
4. Reference the astronomy glossary for terminology

## 🌐 Live Demo

Visit the live application: [https://exoplanet-hunter.vercel.app](https://exoplanet-hunter.vercel.app)

## 🤝 Contributing

This project was built with [v0.app](https://v0.app). To contribute:

1. Continue building on [v0.app/chat/projects/](https://v0.app/chat/projects/)
2. Changes are automatically synced to this repository
3. Vercel deploys the latest version automatically

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **NASA Exoplanet Archive** for providing comprehensive exoplanet data
- **Kepler, K2, and TESS missions** for groundbreaking exoplanet discoveries
- **NASA Space Apps Challenge** for inspiring this project
- **v0.app** for rapid prototyping and development tools

## 📧 Contact

For questions or feedback, please open an issue on GitHub or reach out through the v0.app chat.

---

**Built with ❤️ for the NASA Space Apps Challenge 2025**
