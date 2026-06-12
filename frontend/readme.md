# Ecommerce Dashboard — Frontend

A premium, enterprise-grade admin dashboard built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Dark-mode first, fully responsive, and designed with SaaS aesthetics inspired by Stripe, Linear, and Vercel.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Routing | React Router v7 |
| HTTP Client | Axios |
| Charts | Recharts |
| Icons | Lucide React + FontAwesome |

---

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx                    # Root component with routing & AnimatePresence
│   ├── AppLayout.tsx              # Shared layout: sidebar + topbar wrapper
│   ├── api/                       # Axios API client & typed service functions
│   ├── pages/
│   │   ├── OverviewPage.tsx       # KPI cards, revenue chart, recent orders
│   │   ├── ProductsPage.tsx       # Product list, top products chart, create modal
│   │   ├── OrdersPage.tsx         # Paginated orders table with status badges
│   │   ├── CustomersPage.tsx      # Customers table with spend metrics
│   │   ├── SettingsPage.tsx       # Settings placeholder
│   │   └── NotFoundPage.tsx       # 404 page
│   └── components/
│       ├── DashboardStats.tsx     # Animated KPI stat cards
│       ├── RevenueChart.tsx       # 30-day revenue line chart
│       ├── RecentOrders.tsx       # Latest orders summary widget
│       ├── TopProductsChart.tsx   # Bar chart of top-selling products
│       ├── OrderStatusChart.tsx   # Pie/donut chart for order status
│       ├── OrdersTable.tsx        # Full orders data table
│       ├── CustomersTable.tsx     # Customers data table
│       ├── ProductList.tsx        # Product card grid
│       ├── ProductForm.tsx        # Create product form
│       ├── Modal.tsx              # Reusable animated modal wrapper
│       └── LoadingSpinner.tsx     # Loading state component
├── public/                        # Static assets
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Pages & Features

### Overview `/`
- Aggregate KPI cards: total products, inventory value, orders, revenue, customers
- 30-day revenue line chart
- Order status distribution chart
- Top 5 products bar chart
- Recent orders table widget

### Products `/products`
- Product card grid with stock and price info
- Create new product via animated modal form
- Delete product with instant UI update
- Top products bar chart

### Orders `/orders`
- Full paginated orders table
- Status badges: `Pending` (purple), `Shipped` (blue), `Completed` (green)
- Export button

### Customers `/customers`
- Customers table showing email, join date, order count, and total spent
- Export button

---

## Design System

The UI follows a dark-mode-first design with a custom color palette:

| Token | Value |
|---|---|
| Primary Background | `#070B14` |
| Card Surface | `#111827` |
| Elevated Surface | `#1E293B` |
| Accent Blue | `#3B82F6` |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |
| Text Primary | `#F8FAFC` |
| Text Secondary | `#94A3B8` |
| Border | `rgba(255,255,255,0.08)` |

Glassmorphism is applied selectively to the sidebar, modals, and dropdowns using `backdrop-filter: blur(16px)`.

---

## Animations

All page transitions and component entries use Framer Motion with spring physics:

```js
{ type: "spring", stiffness: 300, damping: 25 }
```

- Page transitions: fade + slide via `AnimatePresence`
- KPI cards: staggered entrance (`0.08s` delay each)
- Table rows: staggered entrance (`0.04s` delay each)
- Modal: scale + opacity

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend running on `http://localhost:8000`

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output is placed in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## API Configuration

The frontend expects the backend to run at `http://localhost:8000`. If your backend is hosted elsewhere, update the base URL in `src/api/`.

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop | Full sidebar, multi-column layout |
| Tablet | Compact sidebar, responsive cards |
| Mobile | Drawer navigation, horizontal table scroll |
