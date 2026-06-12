from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import random
from datetime import datetime, timedelta

from services import crud
from models import models
from schema import schemas
from data import database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

@app.post("/seed-data")
def seed_data(db: Session = Depends(database.get_db)):
    db.query(models.OrderItem).delete()
    db.query(models.Order).delete()
    db.query(models.Customer).delete()
    db.query(models.Product).delete()
    db.commit()

    customers = [
        crud.create_customer(db, schemas.CustomerCreate(name="John Doe", email="john.doe@example.com")),
        crud.create_customer(db, schemas.CustomerCreate(name="Jane Smith", email="jane.smith@example.com")),
        crud.create_customer(db, schemas.CustomerCreate(name="Mike Johnson", email="mike.j@example.com")),
    ]
    
    products = [
        crud.create_product(db, schemas.ProductCreate(name="Wireless Mouse", description="Ergonomic", price=25.99, stock=150)),
        crud.create_product(db, schemas.ProductCreate(name="Mechanical Keyboard", description="RGB", price=89.99, stock=75)),
        crud.create_product(db, schemas.ProductCreate(name="4K Monitor", description="27-inch", price=349.99, stock=50)),
        crud.create_product(db, schemas.ProductCreate(name="USB-C Hub", description="7-in-1", price=39.99, stock=200)),
    ]

    for i in range(15):
        customer = random.choice(customers)
        product1 = random.choice(products)
        product2 = random.choice(products)
        order_create = schemas.OrderCreate(
            customer_id=customer.id,
            status=random.choice(["Completed", "Pending", "Shipped"]),
            items=[
                schemas.OrderItemCreate(product_id=product1.id, quantity=random.randint(1, 3)),
                schemas.OrderItemCreate(product_id=product2.id, quantity=random.randint(1, 2)),
            ]
        )
        order = crud.create_order(db, order_create)
        if order:
            order.order_date = datetime.utcnow() - timedelta(days=random.randint(0, 30))
            db.commit()

    return {"message": "Database seeded successfully"}

@app.get("/products", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return crud.get_products(db, skip=skip, limit=limit)

@app.post("/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(database.get_db)):
    return crud.create_product(db=db, product=product)

@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(database.get_db)):
    return crud.delete_product(db=db, product_id=product_id)

@app.get("/customers", response_model=List[schemas.Customer])
def read_customers(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return crud.get_customers(db, skip=skip, limit=limit)

@app.get("/orders", response_model=List[schemas.Order])
def read_orders(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return crud.get_orders(db, skip=skip, limit=limit)

@app.get("/stats")
def get_stats(db: Session = Depends(database.get_db)):
    total_products = db.query(models.Product).count()
    total_value = sum(p.price * p.stock for p in db.query(models.Product).all())
    total_orders = db.query(models.Order).count()
    total_revenue = db.query(func.sum(models.Order.total_amount)).scalar() or 0
    total_customers = db.query(models.Customer).count()
    return {
        "total_products": total_products, 
        "total_value": total_value,
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "total_customers": total_customers
    }

@app.get("/revenue-summary")
def get_revenue_summary(db: Session = Depends(database.get_db)):
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    summary = db.query(
        func.date(models.Order.order_date),
        func.sum(models.Order.total_amount)
    ).filter(models.Order.order_date >= thirty_days_ago).group_by(
        func.date(models.Order.order_date)
    ).order_by(
        func.date(models.Order.order_date)
    ).all()
    return [{"date": str(date), "revenue": revenue} for date, revenue in summary]

@app.get("/top-products")
def get_top_products(db: Session = Depends(database.get_db)):
    results = db.query(
        models.Product.name,
        func.sum(models.OrderItem.quantity).label("total_sold")
    ).join(models.OrderItem).group_by(models.Product.id).order_by(func.sum(models.OrderItem.quantity).desc()).limit(5).all()
    return [{"name": name, "sold": sold} for name, sold in results]

@app.get("/order-distribution")
def get_order_distribution(db: Session = Depends(database.get_db)):
    results = db.query(
        models.Order.status,
        func.count(models.Order.id).label("count")
    ).group_by(models.Order.status).all()
    
    distribution = [{"name": status if status else "Pending", "value": count} for status, count in results]
    
    existing_statuses = [d["name"] for d in distribution]
    for s in ["Completed", "Pending", "Shipped"]:
        if s not in existing_statuses:
            distribution.append({"name": s, "value": 0})
            
    return distribution

@app.get("/customers-advanced", response_model=List[dict])
def read_customers_advanced(db: Session = Depends(database.get_db)):
    customers = db.query(models.Customer).all()
    output = []
    for c in customers:
        total_spent = sum(o.total_amount for o in c.orders)
        order_count = len(c.orders)
        output.append({
            "id": c.id,
            "name": c.name,
            "email": c.email,
            "join_date": c.join_date,
            "total_spent": total_spent,
            "order_count": order_count
        })
    return output
