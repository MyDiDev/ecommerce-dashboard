import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { type ProductCreate } from "../api";
import React, { useState } from "react";

interface ProductFormProps {
  onAdd: (product: ProductCreate) => void;
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAdd, onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) return;
    onAdd({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
    });
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-slate-300 mb-2 tracking-tight">
          Product Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-black border border-[#222] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-[#111] transition-all text-sm text-slate-200"
          placeholder="e.g. Premium Headphones"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-300 mb-2 tracking-tight">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 bg-black border border-[#222] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-[#111] transition-all text-sm text-slate-200"
          placeholder="Detailed product overview..."
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2 tracking-tight">
            Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 bg-black border border-[#222] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-[#111] transition-all text-sm text-slate-200"
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2 tracking-tight">
            Stock Level
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-4 py-3 bg-black border border-[#222] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-[#111] transition-all text-sm text-slate-200"
            placeholder="0"
            required
          />
        </div>
      </div>
      <motion.button
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.2)",
        }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-indigo-600 cursor-pointer text-white py-4 px-6 rounded-xl hover:bg-indigo-700 transition-colors font-bold shadow-lg shadow-indigo-500/10 flex items-center justify-center group mt-4"
      >
        <span>Register Product</span>
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="ml-2 group-hover:translate-x-1 transition-transform"
        />
      </motion.button>
    </form>
  );
};
export default ProductForm;
