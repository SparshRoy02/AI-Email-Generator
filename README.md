<div align="center">

#  AI Email Generator

**Generate professional, context-aware emails instantly using a local AI — powered by Ollama & Llama 3.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Ollama](https://img.shields.io/badge/AI-Ollama%20Llama%203-FF6B35?style=for-the-badge)](https://ollama.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

##  Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Set Up Ollama & Llama 3](#2-set-up-ollama--llama-3)
  - [3. Backend Setup](#3-backend-setup)
  - [4. Frontend Setup](#4-frontend-setup)
- [API Reference](#-api-reference)
- [How It Works](#-how-it-works)
- [Usage Guide](#-usage-guide)
- [Contributing](#-contributing)
- [License](#-license)

---

##  Overview

**AI Email Generator** is a full-stack web application that lets you compose professional emails in seconds. Describe what you want to say, pick a **tone** and **length**, and the app uses a locally-running **Llama 3** model (via Ollama) to generate a polished, ready-to-send email — streamed live to your screen.

Your email data stays **100% private** — no data is sent to any third-party API. Everything runs on your own machine.

---

##  Features

| Feature | Description |
|---|---|
|  **AI Email Generation** | Generates context-aware emails based on your prompt using Llama 3 |
|  **Real-time Streaming** | Email content streams word-by-word via SSE (Server-Sent Events) |
|  **Tone Control** | Choose from Formal, Casual, Friendly, or Apologetic tones |
|  **Length Control** | Generate Short, Medium, or Long emails |
|  **Recipient & Subject** | Optionally add recipient name and email subject for richer context |
|  **Email History** | Save generated emails to MongoDB and browse them anytime |
|  **Delete Emails** | Remove saved emails from your history |
|  **One-Click Copy** | Copy any email to clipboard instantly |
|  **100% Private** | Fully local AI inference via Ollama — your data never leaves your machine |
|  **Responsive UI** | Works on desktop and mobile browsers |

---

##  Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | ^19.2.7 | UI framework |
| Vite | ^8.1.1 | Build tool & dev server |
| React Router DOM | ^7.18.1 | Client-side routing |
| Axios | ^1.18.1 | HTTP requests |
| Lucide React | ^1.24.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | ^4.19.2 | REST API server |
| Mongoose | ^8.5.1 | MongoDB ODM |
| Axios | ^1.7.2 | HTTP client for Ollama API |
| CORS | ^2.8.5 | Cross-origin resource sharing |
| dotenv | ^16.4.5 | Environment variable management |
| Nodemon | ^3.1.4 | Dev auto-restart |

### AI & Database
| Technology | Purpose |
|---|---|
| Ollama | Local AI model runner |
| Llama 3 (Meta) | Large Language Model for email generation |
| MongoDB | NoSQL database for email history |

---

##  Project Structure

```
AI-Email-Generator/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection
│   │   ├── controllers/
│   │   │   └── emailController.js  # Request handlers
│   │   ├── models/
│   │   │   └── Email.js        # Mongoose schema
│   │   ├── routes/
│   │   │   └── emailRoutes.js  # Express routes
│   │   ├── services/
│   │   │   └── ollamaService.js  # Ollama API integration
│   │   └── index.js            # App entry point
│   ├── .env                    # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmailForm.jsx   # Prompt & settings form
│   │   │   ├── EmailOutput.jsx # Generated email display
│   │   │   └── Navbar.jsx      # Navigation bar
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Main generation page
│   │   │   └── History.jsx     # Saved emails history page
│   │   ├── services/
│   │   │   └── api.js          # Axios API calls
│   │   ├── App.jsx             # Root component & router
│   │   └── main.jsx            # React entry point
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

##  Prerequisites

Before you begin, make sure all of the following tools are installed and working on your system. Each step below explains how to verify you have them correctly set up.

### Step 1 — Install Node.js

Node.js is the JavaScript runtime needed to run both the backend server and the frontend build tools.

1. Go to [https://nodejs.org/en/download/](https://nodejs.org/en/download/) and download the **LTS (Long-Term Support)** version.
2. Run the installer and follow the default steps.
3. After installation, open a terminal and verify both Node.js and npm are installed:
   ```bash
   node -v
   # Should print: v18.x.x or higher

   npm -v
   # Should print: 9.x.x or higher
   ```
   > ⚠️ If `node` or `npm` is not recognized, restart your terminal (or PC) after installation.

---

### Step 2 — Install & Start MongoDB

MongoDB is the database that stores your generated email history.

**Option A — Local MongoDB (Recommended for development)**

1. Download MongoDB Community Edition from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
2. Run the installer. Make sure to select **"Install MongoDB as a Service"** so it starts automatically.
3. After installation, verify MongoDB is running by opening a terminal and typing:
   ```bash
   mongosh
   # You should see a MongoDB shell prompt. Type exit to quit.
   ```
   > If MongoDB is not running, start it manually:
   > - **Windows:** Search for "Services" → find "MongoDB" → click "Start"

**Option B — MongoDB Atlas (Cloud, free tier)**

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a new **free M0 cluster**.
3. Under "Security" → "Database Access", create a username and password.
4. Under "Network Access", allow connections from your IP (`0.0.0.0/0` for development).
5. Click "Connect" → "Connect your application" → copy the connection string (you'll use this in the `.env` file later).
   > Example: `mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/ai-email-generator`

---

### Step 3 — Install Ollama & Download Llama 3

Ollama lets you run open-source AI models like Llama 3 locally on your machine — completely offline and private.

1. Go to [https://ollama.com](https://ollama.com) and download the installer for your OS.
2. Run the installer. Ollama will run as a background service on port `11434`.
3. Open a **new terminal** and pull the Llama 3 model:
   ```bash
   ollama run llama3
   ```
   > ⏳ This will download the model (~4.7 GB) on the first run. This only happens once.
   > 
   > Once downloaded, you'll see an interactive prompt. Type `/bye` to exit — the Ollama server keeps running in the background.

4. Verify Ollama is reachable:
   ```bash
   curl http://localhost:11434
   # Expected output: Ollama is running
   ```
   > **Windows users without `curl`:** Open `http://localhost:11434` in your browser. You should see "Ollama is running".

---

##  Getting Started

Now that all prerequisites are in place, follow these steps to run the application.

---

### Step 4 — Clone the Repository

1. Open a terminal in the directory where you want to store the project.
2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/AI-Email-Generator.git
   ```
3. Move into the project folder:
   ```bash
   cd AI-Email-Generator
   ```
4. Confirm the folder structure looks correct:
   ```bash
   ls
   # You should see: backend/  frontend/  README.md
   ```

---

### Step 5 — Set Up & Run the Backend

The backend is an Express.js server that handles API requests, communicates with Ollama, and stores data in MongoDB.

**a) Open a terminal and navigate to the backend folder:**
```bash
cd backend
```

**b) Install all Node.js dependencies:**
```bash
npm install
```
> This reads `package.json` and installs Express, Mongoose, Axios, dotenv, CORS, and Nodemon into `node_modules/`.

**c) Create the `.env` environment file:**

The backend needs a `.env` file to know which ports and services to connect to. Create it inside the `backend/` folder:

```bash
# Windows (PowerShell)
New-Item -Name ".env" -ItemType File

# macOS / Linux
touch .env
```

**d) Open the `.env` file and paste the following configuration:**

```env
# ─────────────────────────────────────────
# Backend Server Configuration
# ─────────────────────────────────────────

# The port the Express server will listen on
PORT=5000

# ─────────────────────────────────────────
# MongoDB Connection
# ─────────────────────────────────────────

# Option A: Local MongoDB (default)
MONGODB_URI=mongodb://localhost:27017/ai-email-generator

# Option B: MongoDB Atlas (comment out Option A and uncomment this)
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ai-email-generator

# ─────────────────────────────────────────
# Ollama AI Configuration
# ─────────────────────────────────────────

# The local Ollama API endpoint for Llama 3 generation
# Do not change this unless Ollama is running on a different port
OLLAMA_API_URL=http://localhost:11434/api/generate
```

>  **Important:** Never commit your `.env` file to Git. The `.gitignore` file already excludes it.

**e) Start the backend in development mode:**
```bash
npm run dev
```

**f) Confirm the backend is running correctly.** You should see output like this:
```
[nodemon] starting `node src/index.js`
🚀 Server running on port 5000
✅ MongoDB Connected: 127.0.0.1
```

> ✅ **Keep this terminal open and running** throughout your session.

---

### Step 6 — Set Up & Run the Frontend

The frontend is a React + Vite application that provides the user interface.

**a) Open a NEW terminal window** (do not close the backend terminal).

**b) Navigate to the frontend folder from the project root:**
```bash
cd AI-Email-Generator/frontend
```

**c) Install all frontend dependencies:**
```bash
npm install
```
> This installs React, Vite, React Router, Axios, and Lucide React into `node_modules/`.

**d) (Optional) Configure the backend URL:**

If you changed the backend port from the default `5000`, create a `.env` file in the `frontend/` folder:

```bash
# Windows (PowerShell)
New-Item -Name ".env" -ItemType File
```

Add the following line (adjust the port if needed):
```env
# All Vite environment variables must be prefixed with VITE_
VITE_BACKEND_URL=http://localhost:5000
```

> If you skip this step, the frontend will try to connect to `http://localhost:5000` by default.

**e) Start the frontend development server:**
```bash
npm run dev
```

**f) Confirm the frontend is running.** You should see:
```
  VITE v8.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**g) Open the app in your browser:**

Navigate to **[http://localhost:5173](http://localhost:5173)**

>  **Keep this terminal open and running** throughout your session.

---

###  Final Checklist

Before using the app, confirm all 4 services are running simultaneously:

| Service | Status Check | Expected Output |
|---|---|---|
| **MongoDB** | `mongosh --eval "db.runCommand({ ping: 1 })"` | `{ ok: 1 }` |
| **Ollama** | Open `http://localhost:11434` in browser | `Ollama is running` |
| **Backend** | Open `http://localhost:5000/api/health` in browser | `{"status":"ok"}` |
| **Frontend** | Open `http://localhost:5173` in browser | App loads in browser |

Open your browser at **`http://localhost:5173`**.

---

##  API Reference

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check — returns `{ status: "ok" }` |
| `POST` | `/api/email/generate` | Generate an email (streams SSE response) |
| `POST` | `/api/email/save` | Save a generated email to MongoDB |
| `GET` | `/api/email/history` | Retrieve all saved emails |
| `DELETE` | `/api/email/:id` | Delete a saved email by ID |

### `POST /api/email/generate` — Request Body

```json
{
  "prompt": "Write a professional follow-up email after a job interview",
  "tone": "formal",
  "length": "medium",
  "recipient": "Jane Smith",
  "subject": "Follow-up: Software Engineer Interview"
}
```

| Field | Type | Required | Options |
|---|---|---|---|
| `prompt` | `string` | ✅ Yes | Any text description |
| `tone` | `string` | No | `formal`, `casual`, `friendly`, `apologetic` |
| `length` | `string` | No | `short`, `medium`, `long` |
| `recipient` | `string` | No | Recipient's name |
| `subject` | `string` | No | Email subject line |

**Response:** Server-Sent Events (SSE) stream — each event contains a JSON chunk:
```
data: {"chunk": "Dear Jane,\n\n"}
data: {"chunk": "Thank you for taking the time..."}
data: [DONE]
```

---

##  How It Works

```
User fills form
     │
     ▼
React (Frontend)
  Sends POST /api/email/generate with form data
     │
     ▼
Express (Backend)
  Builds a structured prompt for Llama 3
     │
     ▼
Ollama (Local AI)
  Streams tokens from llama3 model
     │
     ▼
Express (Backend)
  Forwards chunks as SSE events to frontend
     │
     ▼
React (Frontend)
  Renders text word-by-word in real-time
     │
     ▼
User clicks "Save"
  POST /api/email/save → Stored in MongoDB
```

---

##  Usage Guide

1. **Open the app** at `http://localhost:5173`.

2. **Fill in the form:**
   - **Description (required):** Describe the email you want — be specific!
     > *e.g. "Write a formal apology email to a client explaining why their software delivery is delayed by 2 weeks."*
   - **Tone:** Select `Formal`, `Casual`, `Friendly`, or `Apologetic`.
   - **Length:** Choose `Short`, `Medium`, or `Long`.
   - **Recipient (optional):** Add the recipient's name to personalize the email.
   - **Subject (optional):** Provide a subject to guide the AI further.

3. **Click "Generate Magic Mail"** — Watch the email stream in real-time!

4. **Review the output** — You can read and edit the email as needed.

5. **Save it** using the Save button, or **Copy** it directly to your clipboard.


6. **Browse History** — Click the "History" link in the navbar to view, copy, or delete past emails.

---

##  Conclusion

**AI Email Generator** demonstrates how powerful, privacy-first AI applications can be built entirely on open-source tools — without relying on paid APIs or sending your data to the cloud.

Whether you're writing a formal business proposal, a casual follow-up, or a heartfelt apology, this app helps you communicate better and faster. It's a solid foundation you can extend with new AI models, additional email templates, user authentication, or export features.

> **Tip:** The more specific your prompt, the better the output. Include details like the recipient's role, the email's purpose, and any relevant context — Llama 3 will tailor the result accordingly.

---

## Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository.
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: describe your change"`
4. **Push** the branch: `git push origin feature/your-feature-name`
5. **Open a Pull Request** describing what changed and why.

Found a bug or have a feature idea? Open an issue on GitHub.

---

## License

This project is licensed under the MIT License — free to use, modify, and distribute.

---

<div align="center">
  <p>Built with love using <strong>React</strong>, <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>Ollama Llama 3</strong></p>
  <p>If you found this project useful, consider giving it a star on GitHub!</p>
</div>

