# Azure Cloud Resume Challenge ☁️

A full-stack, serverless resume application featuring a live visitor counter, automated CI/CD pipelines, and cloud-native security. Built as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/).

## 🌐 Live Demo
**View the live site:** [www.moezy.co.uk](https://www.moezy.co.uk)

## 🏗️ Architecture
This project demonstrates a modern, event-driven architecture on Microsoft Azure.

![Architecture Diagram](./architecture.png?v=1)

### 🛠️ The Tech Stack
* **Frontend:** HTML5, CSS3, and Vanilla JavaScript hosted on **Azure Static Web Apps**.
* **Backend API:** **Azure Functions** (Python) triggered by HTTP requests.
* **Database:** **Azure Cosmos DB** (NoSQL) for high-availability data storage.
* **CI/CD:** **GitHub Actions** for automated testing and deployment of both Frontend and Backend.
* **Security:** Managed via **GitHub Secrets** and Environment Variables with automated secret scanning.

## 🚀 Key Features
* **Serverless Visitor Counter:** A custom JavaScript snippet fetches and updates the live visitor count from the Azure Function API on every page load.
* **Automated Full-Stack Pipeline:** A unified GitHub Actions workflow that automatically builds and deploys the entire stack (Frontend + API) upon every `git push`.
* **Infrastructure as Code:** Deployment logic defined in YAML, ensuring a repeatable and reliable release process.

## 🧠 Technical Challenges & Lessons Learned
* **CI/CD Resilience:** Experienced a workflow sync issue during development; resolved it by manually reconstructing the `.yml` deployment files and performing a clean re-sync with Azure.
* **Security Best Practices:** Implemented **Secret Rotation** for Cosmos DB keys after a potential exposure, ensuring all production credentials are kept out of version control.
* **Cross-Origin Resource Sharing (CORS):** Configured Azure Function policies to strictly allow communication only from the authorized resume domain.

## 📂 Repository Structure
- `cloud-resume-frontend/`: The website source code (HTML/CSS/JS).
- `cloud-resume-backend/`: The Python Azure Function code.
- `.github/workflows/`: The CI/CD automation scripts.