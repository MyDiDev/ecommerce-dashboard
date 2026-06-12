from sqlalchemy.orm import Session, joinedload
from models import models
from schema import schemas

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product

def get_customers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Customer).offset(skip).limit(limit).all()

def create_customer(db: Session, customer: schemas.CustomerCreate):
    db_customer = models.Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Order).options(joinedload(models.Order.customer), joinedload(models.Order.items).joinedload(models.OrderItem.product)).order_by(models.Order.order_date.desc()).offset(skip).limit(limit).all()

def create_order(db: Session, order: schemas.OrderCreate):
    total_amount = 0
    db_items = []
    for item in order.items:
        product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if not product or product.stock < item.quantity:
            return None
        
        total_amount += product.price * item.quantity
        product.stock -= item.quantity
        
        db_item = models.OrderItem(product_id=item.product_id, quantity=item.quantity, price=product.price)
        db_items.append(db_item)

    db_order = models.Order(customer_id=order.customer_id, total_amount=total_amount, items=db_items, status=order.status)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order
