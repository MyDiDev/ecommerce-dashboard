import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  getProducts,
  createProduct,
  deleteProduct,
  type Product,
  type ProductCreate,
} from "../api";
import ProductList from "../components/ProductList";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import TopProductsChart from "../components/TopProductsChart";
import { useState, useEffect } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setProducts(await getProducts());
  };

  const handleAddProduct = async (newProduct: ProductCreate) => {
    await createProduct(newProduct);
    fetchData();
    setIsModalOpen(false);
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    fetchData();
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: "tween", ease: "anticipate", duration: 0.5 }}
    >
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter">
            Product Catalog
          </h1>
          <p className="text-slate-500 mt-1">
            Manage inventory and track top performers.
          </p>
        </div>
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 20px -5px rgba(99, 102, 241, 0.15)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/20 font-bold flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>New Product</span>
        </motion.button>
      </header>

      <div className="mb-8">
        <TopProductsChart />
      </div>

      <ProductList products={products} onDelete={handleDeleteProduct} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <ProductForm
          onAdd={handleAddProduct}
          onSuccess={() => setIsModalOpen(false)}
        />
      </Modal>
    </motion.div>
  );
}
