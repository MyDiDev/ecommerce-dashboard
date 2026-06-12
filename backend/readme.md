# Ecommerce Dashboard — Backend

REST API for the Ecommerce Dashboard, built with **FastAPI** and **SQLite** via SQLAlchemy. It exposes endpoints for products, customers, orders, and analytics that power the React frontend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI |
| ORM | SQLAlchemy |
| Database | SQLite (`ecommerce.db`) |
| Validation | Pydantic v2 |
| Server | Uvicorn |

---

## Project Structure

```
backend/
├── main.py              # FastAPI app, route definitions, CORS config
├── models/
│   └── models.py        # SQLAlchemy ORM models
├── schema/
│   └── schemas.py       # Pydantic request/response schemas
├── services/
│   └── crud.py          # Database CRUD operations
├── data/
│   └── database.py      # SQLAlchemy engine & session setup
├── ecommerce.db         # SQLite database file (auto-generated)
└── requirements.txt     # Python dependencies
```

---

## Data Models

**Product** — `id`, `name`, `description`, `price`, `stock`

**Customer** — `id`, `name`, `email`, `join_date`

**Order** — `id`, `customer_id`, `order_date`, `total_amount`, `status` (`Pending` | `Shipped` | `Completed`)

**OrderItem** — `id`, `order_id`, `product_id`, `quantity`, `price`

---

## API Endpoints

### Products
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/products` | List all products (supports `skip` & `limit`) |
| `POST` | `/products` | Create a new product |
| `DELETE` | `/products/{product_id}` | Delete a product by ID |

### Customers
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/customers` | List all customers |
| `GET` | `/customers-advanced` | Customers with total spent & order count |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/orders` | List all orders (with customer & items eager-loaded) |

### Analytics
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/stats` | Aggregate KPIs: total products, orders, revenue, customers |
| `GET` | `/revenue-summary` | Daily revenue for the last 30 days |
| `GET` | `/top-products` | Top 5 products by units sold |
| `GET` | `/order-distribution` | Order count grouped by status |

### Utilities
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/seed-data` | Clears the database and loads sample data |

---

## Getting Started

### Prerequisites

- Python 3.10+

### Installation

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment (recommended)
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Running the Server

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### Seed Sample Data

On first run, the database is empty. Call the seed endpoint to populate it with sample customers, products, and orders:

```bash
curl -X POST http://localhost:8000/seed-data
```

### Interactive API Docs

FastAPI generates Swagger UI automatically:

```
http://localhost:8000/docs
```

---

## Environment & Configuration

The database URL is configured in `data/database.py`:

```python
SQLALCHEMY_DATABASE_URL = "sqlite:///./ecommerce.db"
```

To switch to PostgreSQL or another database, replace this URL and remove the `check_same_thread` argument.

---

## CORS

CORS is configured to allow all origins (`*`) for local development. Before deploying to production, restrict `allow_origins` to your frontend's domain in `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    ...
)
```

---

## Dependencies

```
fastapi
uvicorn
sqlalchemy
pydantic
```

Install via:

```bash
pip install -r requirements.txt
```