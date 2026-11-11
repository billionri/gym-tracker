# 🏋️ GymForge — Minimal Gym Tracker & Workout Audio Forge

[![Build Android APK & Publish Release](https://github.com/alam-rashid039/gymforge/actions/workflows/build-apk.yml/badge.svg)](https://github.com/alam-rashid039/gymforge/actions/workflows/build-apk.yml)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/alam-rashid039/gymforge?color=ea580c&label=Android%20APK)](https://github.com/alam-rashid039/gymforge/releases/latest)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

> Minimal, clean gym tracker with streak notifications, 100 exercise database, workout routine presets, live rest timers, synthesized electronic workout beats, and custom athlete diet planning.

---

## 📱 Download Android APK

The Android APK is automatically compiled and published through GitHub Actions on every release:

- **[Download Latest GymForge.apk](../../releases/latest)** (Direct GitHub Release download)
- **[View All GitHub Releases](../../releases)**

### How to Install the APK on your Android Phone:
1. Tap the **[Download Latest GymForge.apk](../../releases/latest)** link on your Android device.
2. Open the downloaded `.apk` file from your notification bar or Downloads folder.
3. If prompted by Android, enable **"Allow from this source"** in Settings.
4. Tap **Install** & launch GymForge!

---

## 🚀 How GitHub Actions Builds the APK Automatically

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/build-apk.yml`](.github/workflows/build-apk.yml).

Whenever you push to `main` or trigger a release:
1. It builds the production web application using Vite (`npm run build`).
2. Bundles the complete offline app into the native Android application assets (`android/app/src/main/assets/www`).
3. Uses the Android SDK and Gradle to assemble the signed Android APK (`GymForge-v1.0.0.apk`).
4. Automatically attaches the APK to the latest **GitHub Release** and uploads it as an action artifact.

### How to Push and Trigger the APK Build on GitHub:
```bash
# Add your GitHub remote (replace with your repository URL):
git remote add origin https://github.com/<your-username>/gymforge.git

# Push to main:
git branch -M main
git push -u origin main
```
As soon as you push, navigate to the **Actions** tab in GitHub to watch the build complete and grab your APK!

---

## ⚡ Features
- **100 Gym Exercises**: Complete movement database across 11 disciplines (Chest, Shoulders, Back, Legs, Arms, Core, Cardio, Flexibility, Pilates, Strength, Outdoor).
- **Live Workout Logger**: Track sets, weights, reps, volume moved, and automatic rest timer countdown with beeps.
- **Workout Audio Forge**: Synthesized Web Audio electronic gym beats (Phonk, Heavy Iron, Cardio Rush, Cybernetic Grind) with live tempo/BPM slider.
- **Daily Streak Engine**: Streak tracking with in-app reminders, streak freeze guards, and achievement badges.
- **Custom Athlete Diet Plan**: Target calorie and macro calculator with 6-meal daily schedule and 8-glass water hydration logger.
- **Human Muscular Anatomy**: Zoomable high-definition muscle architecture diagram with Mifflin-St Jeor BMR, TDEE, and WHtR body fat calculators.
- **Shopping Store (₹ INR)**: Home gym gear catalog featuring low-price dumbbells starting at ₹399, lifting straps, and whey isolate.
- **GymForge Rewards Menu**: Gamified fitness milestones and lifestyle treat rewards.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start Vite dev server on port 3000
npm run dev

# Build production bundle
npm run build

# Prepare Android assets
node scripts/copy-dist-to-android.cjs
```

---

## 📄 License
Apache-2.0
