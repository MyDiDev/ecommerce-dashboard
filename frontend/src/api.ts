import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
}
export interface ProductCreate {
  name: string;
  description?: string;
  price: number;
  stock: number;
}
export interface Stats {
  total_products: number;
  total_value: number;
  total_orders: number;
  total_revenue: number;
  total_customers: number;
}
export interface Customer {
  id: number;
  name: string;
  email: string;
  join_date: string;
}
export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
}
export interface Order {
  id: number;
  customer_id: number;
  order_date: string;
  total_amount: number;
  status: string;
  customer: Customer;
  items: OrderItem[];
}
export interface RevenueSummary {
  date: string;
  revenue: number;
}
export interface TopProduct {
  name: string;
  sold: number;
}
export interface OrderDistribution {
  name: string;
  value: number;
}
export interface AdvancedCustomer {
  id: number;
  name: string;
  email: string;
  join_date: string;
  total_spent: number;
  order_count: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};
export const createProduct = async (
  product: ProductCreate,
): Promise<Product> => {
  const response = await axios.post(`${API_BASE_URL}/products`, product);
  return response.data;
};
export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/products/${id}`);
};
export const getStats = async (): Promise<Stats> => {
  const response = await axios.get(`${API_BASE_URL}/stats`);
  return response.data;
};
export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_BASE_URL}/orders`);
  return response.data;
};
export const getCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get(`${API_BASE_URL}/customers`);
  return response.data;
};
export const getRevenueSummary = async (): Promise<RevenueSummary[]> => {
  const response = await axios.get(`${API_BASE_URL}/revenue-summary`);
  return response.data;
};
export const getTopProducts = async (): Promise<TopProduct[]> => {
  const response = await axios.get(`${API_BASE_URL}/top-products`);
  return response.data;
};
export const getOrderDistribution = async (): Promise<OrderDistribution[]> => {
  const response = await axios.get(`${API_BASE_URL}/order-distribution`);
  return response.data;
};
export const getCustomersAdvanced = async (): Promise<AdvancedCustomer[]> => {
  const response = await axios.get(`${API_BASE_URL}/customers-advanced`);
  return response.data;
};
