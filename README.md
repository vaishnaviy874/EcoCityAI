<div align="center">

# 🌿 EcoCity AI
### *Smart City & Climate Intelligence Platform*

[![Python Version](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Backend-Flask%203.x-black?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Leaflet.js](https://img.shields.io/badge/Maps-Leaflet.js-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Open-Meteo](https://img.shields.io/badge/Live%20Data-Open--Meteo-orange?style=for-the-badge)](https://open-meteo.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

*A comprehensive municipal intelligence dashboard and citizen engagement system powered by live environmental APIs, OpenStreetMap GIS telemetry, and multimodal AI analysis.*

[Explore Features](#-key-modules--features) • [Quickstart](#-quickstart--installation) • [API Reference](#-api-endpoints) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Overview

**EcoCity AI** is an advanced climate intelligence and smart municipal operations platform. It aggregates live weather, air quality indexes (AQI), and spatial infrastructure data to provide evidence-based city health analytics, interactive policy sandboxes, citizen reporting tools, and AI-driven upcycling recommendations.

### 🛡️ 100% Real-Data Philosophy
- **Live Environmental Telemetry:** Real-time atmospheric metrics & 7-day forecasts from **Open-Meteo**.
- **Accredited Air Quality Standards:** Live calculation of PM2.5, PM10, $\text{NO}_2$, $\text{SO}_2$, and $\text{O}_3$ based on US EPA and European Air Quality Index guidelines.
- **Dynamic Infrastructure Mapping:** Real-time GIS querying via **OpenStreetMap Overpass API** for recycling hubs, EV charging networks, transit stops, and municipal bins.
- **Resilient Multi-Engine AI:** Powered by **Google Gemini Vision & Flash** with automatic fallback to an in-house deterministic Smart City Analytical Engine.

---

## ✨ Key Modules & Features

| # | Module | Description |
|---|---|---|
| **01** | **Smart City Overview** | Composite municipal health index, resilience score, and key urban sustainability KPIs. |
| **02** | **Waste Management** | Live municipal bin density, landfill telemetry, waste stream breakdown, and route optimization. |
| **03** | **Recycling & E-Waste** | Automated recycling center locator, e-waste drop-off points, and material acceptance guide. |
| **04** | **Energy & Solar Potential** | Rooftop photovoltaic yield calculator, solar irradiance analytics, and clean energy transition metrics. |
| **05** | **EV & Clean Mobility** | Real-time EV charging station locator, connector types, fast-charging availability, and mobility metrics. |
| **06** | **Public Transit** | Transit network density, bus & metro station mapping, and multi-modal connectivity index. |
| **07** | **Weather & Air Quality** | Live temperature, humidity, wind, and multi-pollutant AQI breakdown with interactive Chart.js graphs. |
| **08** | **Resource Saving & Reuse** | Practical water harvesting calculators, household food waste mitigation, and upcycling guides. |
| **09** | **Carbon Footprint Calculator** | Multi-category personal and household emissions calculator with localized reduction benchmarks. |
| **10** | **Urban What-If Simulator** | Policy sandbox to model the impact of EV mandates, solar subsidies, green cover, and waste taxes. |
| **11** | **AI Civic & Waste Scanner** | Multimodal Computer Vision to classify waste (biodegradable, recyclable, hazardous) and report civic hazards. |
| **12** | **Smart City AI Assistant** | Context-aware bilingual (English & Hindi) conversational assistant with automatic city geocoding. |
| **13** | **Data Transparency & Sources** | Open methodology, scientific formulas, and live sensor attribution. |

---

## 🛠️ Tech Stack

### **Backend**
- **Runtime:** Python 3.10+
- **Framework:** Flask 3.x with Flask-CORS
- **Caching:** In-Memory TTL Store for resilient live demo & hackathon traffic
- **Network & Parsing:** Requests, Python-Dotenv
- **Deployment:** Gunicorn / WSGI compatible

### **Frontend**
- **Core:** HTML5 (Semantic & Accessible), CSS3 (Modern Glassmorphism & Responsive Grid)
- **Scripting:** Vanilla JavaScript (ES6+ modular design, no heavy bundle dependencies)
- **Data Visualization:** [Chart.js 4.x](https://www.chartjs.org/)
- **Geospatial Maps:** [Leaflet.js](https://leafletjs.com/) with OpenStreetMap & CartoDB tiles
- **Internationalization (i18n):** Full English (`EN`) & Hindi (`HI`) bilingual support

### **External APIs & Integrations**
- **Geocoding & Reverse Geocoding:** OpenStreetMap Nominatim
- **Spatial Overpass API:** OpenStreetMap Infrastructure querying
- **Meteorological Data:** Open-Meteo Weather & Air Quality APIs
- **LLM / Multimodal Vision:** Google Gemini API / OpenAI API

---

## 🚀 Quickstart & Installation

### 1. Prerequisites
- [Python 3.10+](https://www.python.org/downloads/)
- [Git](https://git-scm.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/vaishnaviy874/EcoCityAI.git
cd EcoCityAI
