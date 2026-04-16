# Sentinel Response: AI-Driven Disaster Pipeline 🛰️🌊

An automated, end-to-end pipeline designed to classify flood severity from satellite imagery, mapping regional risks in real-time to assist first responders.

## 📌 Overview
During extreme weather events, optical satellite imagery is often obstructed by heavy cloud cover. **Sentinel Response** solves this by leveraging Sentinel-1 Synthetic Aperture Radar (SAR) data, which penetrates clouds to provide clear topological insights. This project orchestrates geospatial data fetching, deep learning inference, and automated alerting into a single continuous workflow.

## 🚀 Key Features
- **High-Precision Segmentation:** Fine-tuned a U-Net architecture with a ResNet34 backbone, achieving **97.85% Pixel Accuracy** in flood water detection.
- **Geospatial Automation:** Engineered scripts using the Google Earth Engine (GEE) API to programmatically fetch pre- and post-flood radar data for specific disaster zones (e.g., Brahmaputra River Basin).
- **Real-Time Responder Alerts:** Deployed a Telegram Bot API integration to instantly deliver critical hazard maps and flood expansion metrics (quantified in km²) directly to field teams.


*Comparison of SAR Amplitude against Coherence data to isolate flooded regions, ensuring the system operates reliably regardless of weather conditions.*

## 🛠️ Tech Stack
- **Deep Learning & Vision:** PyTorch, Computer Vision (Semantic Segmentation)
- **Geospatial Processing:** Google Earth Engine API
- **Automation:** Telegram API

## 📂 Repository Structure
- `sentinel1.ipynb` / `sentinelv1.ipynb`: Core Jupyter Notebooks containing the model fine-tuning, Earth Engine data fetching pipelines, and Telegram bot execution scripts.

## ⚙️ Usage & Execution
1. Clone the repository:
   ```bash
   git clone [https://github.com/shataksha45-shiiii/SentinelResponse.git](https://github.com/shataksha45-shiiii/SentinelResponse.git)
