# Cloud Resume Challenge (Azure) 🚀

This repository contains the frontend and CI/CD configuration for my professional resume, hosted on Azure. This project was built as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/).

## 🌐 Live Demo
Check out the live site: [www.moezy.co.uk](https://www.moezy.co.uk)

## 🏗️ Architecture
The project follows a serverless, full-stack architecture:
* **Frontend:** HTML5, CSS3, and Vanilla JavaScript.
* **Hosting:** Azure Static Web Apps with a custom domain and SSL.
* **Backend:** Azure Functions (Serverless API) to handle visitor logic.
* **Database:** Azure CosmosDB (NoSQL) for persistent visitor counting.
* **CI/CD:** GitHub Actions for automated deployment on every push.



[Image of Azure Cloud Architecture Diagram]


## 🛠️ Key Features
* **Serverless Visitor Counter:** A custom JavaScript snippet fetches the live visitor count from an Azure Function API.
* **Automated Deployment:** Integrated a GitHub Actions workflow that automatically builds and deploys the site to Azure.
* **Responsive Design:** Fully mobile-responsive UI with a smooth theme-switching canvas.

## 🧠 Lessons Learned
The biggest challenge was mastering **GitHub Actions**. During development, I encountered a major sync issue where a "force push" accidentally deleted the Azure deployment workflow. I learned how to:
1. Manually recreate `.yml` deployment files.
2. Securely manage sensitive data using **GitHub Secrets** (API tokens).
3. Configure **CORS** in Azure Functions to allow secure communication between the frontend and backend.

## 📂 Repository Structure
- `.github/workflows/`: Deployment automation scripts.
- `css/`: Custom styling.
- `js/main.js`: Main logic and API interaction.
- `index.html`: The resume structure.
