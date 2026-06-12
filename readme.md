# Ecommerce Dashboard

A full-stack ecommerce admin dashboard with a **FastAPI** backend and a **React + TypeScript** frontend. Built for managing products, orders, and customers with real-time analytics — designed with a premium, dark-mode-first SaaS aesthetic.

---

## Overview

```
ecommerce-dashboard/
├── backend/    # Python FastAPI REST API with SQLite
└── frontend/   # React 19 + TypeScript + Tailwind CSS SPA
```

---

## Features

### Analytics & Overview
- Aggregate KPIs: total products, inventory value, orders, revenue, and customers
- 30-day revenue trend chart
- Order status distribution (Pending / Shipped / Completed)
- Top 5 best-selling products

### Product Management
- Browse all products with stock and pricing details
- Create new products via a modal form
- Delete products with immediate UI feedback

### Order Management
- View all orders with customer info, status, total, and date
- Color-coded status badges (purple = Pending, blue = Shipped, green = Completed)

### Customer Management
- View all customers with join date, number of orders, and total spend

---

## Tech Stack

### Backend
- **FastAPI** — high-performance Python REST API
- **SQLAlchemy** — ORM for database interactions
- **Pydantic v2** — data validation and serialization
- **SQLite** — file-based database (zero config)
- **Uvicorn** — ASGI server

### Frontend
- **React 19 + TypeScript** — component-based UI
- **Vite 8** — fast build tooling
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — page transitions and micro-animations
- **React Router v7** — client-side routing
- **Recharts** — data visualization charts
- **Axios** — HTTP client

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

---

### 1. Start the Backend

```bash
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

The API will be available at **`http://localhost:8000`**.

API documentation (Swagger UI): **`http://localhost:8000/docs`**

#### Seed the database

On first run, the database is empty. Load sample data:

```bash
curl -X POST http://localhost:8000/seed-data
```

---

### 2. Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The dashboard will be available at **`http://localhost:5173`**.

---

## API Reference (Summary)

| Endpoint | Method | Description |
|---|---|---|
| `/products` | GET | List all products |
| `/products` | POST | Create a product |
| `/products/{id}` | DELETE | Delete a product |
| `/customers` | GET | List all customers |
| `/customers-advanced` | GET | Customers with spend metrics |
| `/orders` | GET | List all orders |
| `/stats` | GET | Aggregate KPI statistics |
| `/revenue-summary` | GET | Daily revenue for the last 30 days |
| `/top-products` | GET | Top 5 products by units sold |
| `/order-distribution` | GET | Order count by status |
| `/seed-data` | POST | Reset and seed the database |

---

## Project Architecture

```
                    ┌──────────────────────┐
                    │   React Frontend      │
                    │   (localhost:5173)    │
                    │                       │
                    │  Pages:               │
                    │  • Overview           │
                    │  • Products           │
                    │  • Orders             │
                    │  • Customers          │
                    │  • Settings           │
                    └──────────┬───────────┘
                               │ HTTP (Axios)
                               ▼
                    ┌──────────────────────┐
                    │   FastAPI Backend     │
                    │   (localhost:8000)    │
                    │                       │
                    │  • REST endpoints     │
                    │  • Pydantic schemas   │
                    │  • SQLAlchemy ORM     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   SQLite Database     │
                    │   (ecommerce.db)      │
                    └──────────────────────┘
```

---

## Design Philosophy

The dashboard is designed as a premium SaaS admin experience — dark-mode first, minimal, and data-focused — inspired by Stripe, Linear, Vercel, and Supabase.

Key design principles:
- Glassmorphism on elevated surfaces (sidebar, modals, dropdowns)
- Spring-physics animations via Framer Motion
- Staggered entrance animations for cards and table rows
- Status-aware color coding throughout

---

## License

MIT — see [LICENSE](./LICENSE) for details.