# EcoCity AI 🌍⚡
> **Advanced Smart City Intelligence, Environmental Diagnostics & Urban Policy Simulation Platform**

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Backend-Flask-green.svg)](https://flask.palletsprojects.com/)
[![Open-Meteo](https://img.shields.io/badge/Live%20Data-Open--Meteo-orange.svg)](https://open-meteo.com/)
[![OpenStreetMap](https://img.shields.io/badge/GIS-OpenStreetMap%20Overpass-brightgreen.svg)](https://www.openstreetmap.org/)
[![AI Vision](https://img.shields.io/badge/AI%20Vision-Gemini%201.5%20Flash-purple.svg)](https://ai.google.dev/)

---

## 🌟 Overview & Key Innovations

**EcoCity AI** is an end-to-end urban intelligence and citizen engagement platform designed for municipal authorities, urban planners, and citizens. It transforms live physical sensor feeds and geospatial datasets into actionable sustainability metrics, policy simulations, and civic hazard workflows.

### 🛡️ 100% Real Data Feeds (No Hallucination)
- **Real-Time Meteorology**: Live weather, precipitation, solar irradiance (W/m²), and 5-day forecasts via Open-Meteo.
- **Physical Atmospheric AQI**: Live PM2.5, PM10, NO₂, SO₂, CO, and O₃ readings calibrated against US EPA and EU CAQI standards.
- **Live Geospatial Infrastructure**: Real-world EV charging stations, recycling centers, and public transit nodes queried dynamically via OpenStreetMap Overpass API within a 10 km radius.
- **Backend TTL Caching**: High-performance in-memory caching layer preventing API rate-limiting during high traffic or live hackathon demos.

---

## ✨ Features & Modules

### 1. 🏥 Dynamic City Health & Sustainability Index (0–100)
- Evidence-based multi-factor weighted composite scoring:
  - **Air Quality Resilience (35%)**: Real PM2.5/PM10 concentration penalties.
  - **Climate & Thermal Comfort (20%)**: Heat index, humidity, and cloud dynamics.
  - **Renewable Solar Utilization (20%)**: Direct normal irradiance & rooftop PV capacity.
  - **Circular Economy & Mobility (25%)**: Waste recycling rate and transit infrastructure.
- **Vulnerable Group Health Advisories**: Real-time guidance for children, elderly individuals, athletes, and asthma patients.
- **Voice Read-Aloud (TTS)**: 1-click audio playback in English and Hindi.

### 2. 🎛️ "What-If" Urban Policy & Climate Simulation Sandbox
- Interactive levers allowing city administrators to model:
  - **Solar Mandate Expansion (+MW)**
  - **Municipal & Bus Fleet EV Transition (%)**
  - **Mandatory Source Segregation & Biomethanation (%)**
  - **Urban Forest Canopy Coverage (+%)**
- **Live Physics Math**: Instant calculation of annual CO₂ avoided, projected AQI drop, landfill diversion tonnage, and municipal budget savings in ₹ Lakhs.
- **Interactive Comparative Charting**: Powered by Chart.js.

### 3. 📸 Multimodal Citizen Waste & Civic Hazard Scanner
- **Dual-Engine Computer Vision**: Uses Google Gemini 1.5 Flash Vision (when API key is present) with an intelligent fallback classifier.
- Classifies waste types (PET plastic, wet organic, e-waste, hazardous materials) and identifies urban civic hazards (potholes, waterlogging, illegal dump sites).
- **Interactive Map Geotagging**: 1-click pinning of reported hazards to the live Leaflet map.
- **Green Civic Reward Points**: Gamified civic incentives for community participation.

### 4. 📄 1-Click Official Municipal Sustainability Report (PDF / Print)
- Clean, printer-friendly municipal executive briefing exportable with 1 click (`@media print` optimized).

### 5. 🤖 Grounded AI Municipal Advisor (`/api/chat`)
- Multilingual chatbot with live context injection (active city name, live AQI, temperature, solar capacity, health score).
- Text-to-speech audio button on every reply.

### 6. 🌐 Full Multilingual Parity (English & हिन्दी)
- Instant real-time UI switching across all charts, widgets, tools, and calculators.

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.9+
- Modern Web Browser (Chrome, Edge, Firefox, Safari)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/EcoCityAI.git
cd EcoCityAI
pip install -r requirement.txt
```

### 2. Configure Environment (Optional)
Create or edit `.env`:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```
*(If the Gemini key is omitted, the platform seamlessly uses its built-in rule-based expert systems without crashing).*

### 3. Start the Server
```bash
python server.py
```
Backend API will start at `http://127.0.0.1:5000`.

### 4. Launch the Frontend
Open `index.html` directly in your browser or serve it using any local static file server (e.g., Live Server).

---

## 🏗️ Architecture

```
EcoCityAI/
├── server.py              # Flask backend with caching, live APIs & endpoints
├── index.html             # Clean responsive UI with 11 specialized intelligence sections
├── style.css              # Custom styling, widget themes & print stylesheet
├── app.js                 # Frontend state, Leaflet GIS, Chart.js, TTS & calculations
├── requirement.txt        # Python package dependencies
├── README.md              # Project documentation
└── .env                   # Environment config (API keys, port)
```

---

## 🏆 Hackathon Highlights
- **Zero Dummy Data**: Uses live Open-Meteo, OpenStreetMap Overpass, and Nominatim API feeds.
- **Offline & Rate-Limit Resilience**: In-memory caching and fallback models guarantee 100% uptime during live presentations.
- **Dual-Audience Utility**: Empowers both civic authorities (policy simulation, infrastructure GIS) and citizens (voice search, scanner, habit calculators).
