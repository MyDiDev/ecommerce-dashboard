from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: int

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    class Config:
        from_attributes = True

class CustomerBase(BaseModel):
    name: str
    email: str

class CustomerCreate(CustomerBase):
    pass

class Customer(CustomerBase):
    id: int
    join_date: datetime
    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    price: float
    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    customer_id: int
    status: Optional[str] = "Pending"

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class Order(OrderBase):
    id: int
    order_date: datetime
    total_amount: float
    items: List[OrderItem] = []
    customer: Customer
    model_config = {
        "from_attributes": True
    }
