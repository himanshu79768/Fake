
import React from 'react';
import { Star, Zap, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductSectionProps {
  products: Product[];
  onBuyNow: (product: Product) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ products, onBuyNow }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6">
      {products.map((product) => (
        <div key={product.id} className="group border-2 border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl flex flex-col bg-white transition-all duration-300 hover:border-pink-200">
          <div className="h-48 overflow-hidden relative">
             {/* Stretched images for suspicious look */}
             <img src={product.image} alt={product.name} className="stretched-img grayscale-[5%] group-hover:scale-110 transition-transform duration-500" />
             <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg animate-pulse">
                95% OFF
             </div>
             <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-pink-600 shadow-md">
                <ShoppingCart size={16} />
             </div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-sm font-black text-gray-800 line-clamp-2 mb-2 leading-tight min-h-[2.5rem] group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-3">
              <div className="flex text-yellow-400">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold">({product.reviews.toLocaleString()})</span>
            </div>
            <div className="mt-auto">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xl font-black text-pink-700">₹{product.salePrice}</span>
                <span className="text-xs text-gray-400 line-through font-bold">₹{product.originalPrice}</span>
              </div>
              <button 
                onClick={() => onBuyNow(product)}
                className="w-full bg-pink-600 text-white py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all hover:bg-pink-700 uppercase tracking-widest"
              >
                <Zap size={14} fill="currentColor" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSection;
