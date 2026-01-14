
import React from 'react';
import { ArrowLeft, Trash2, ShieldCheck, Zap, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartSectionProps {
  items: CartItem[];
  onUpdate: (id: number, delta: number) => void;
  onProceed: () => void;
  onBack: () => void;
}

const CartSection: React.FC<CartSectionProps> = ({ items, onUpdate, onProceed, onBack }) => {
  const total = items.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center">
        <ShoppingBag size={80} className="text-gray-200 mb-6" />
        <p className="text-2xl font-black text-gray-400 mb-8 uppercase tracking-widest">Your Shoping Cart is Emty!</p>
        <button 
          onClick={onBack} 
          className="bg-pink-600 text-white px-12 py-4 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all"
        >
          Go Back to Beauti Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      <div className="p-6 md:p-10">
        <button onClick={onBack} className="flex items-center text-sm font-black text-pink-600 mb-8 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft size={18} className="mr-2" /> ADD MORE BEAUTI ITEMS
        </button>

        <h2 className="text-3xl font-black text-gray-800 mb-8 tracking-tighter uppercase flex items-center gap-3">
            My Beauti Cart
            <span className="bg-pink-100 text-pink-600 text-sm px-4 py-1 rounded-full">{items.length} ITEMES</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* List of Items */}
            <div className="lg:col-span-2 space-y-6">
                {items.map(item => (
                    <div key={item.id} className="group bg-white p-4 rounded-2xl border-2 border-gray-50 flex flex-col sm:flex-row gap-6 hover:border-pink-200 transition-all shadow-sm">
                        <div className="w-full sm:w-32 h-32 overflow-hidden rounded-xl border-2 border-gray-100">
                             <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-black text-gray-800 mb-2 leading-tight group-hover:text-pink-600">{item.name}</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl font-black text-pink-600">₹{item.salePrice}</span>
                                <span className="text-sm text-gray-400 line-through font-bold">₹{item.originalPrice}</span>
                                <span className="bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-tighter">95% Discunt</span>
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                                    <button onClick={() => onUpdate(item.id, -1)} className="w-10 h-10 flex items-center justify-center text-xl font-black text-gray-400 hover:text-pink-600 transition-colors">-</button>
                                    <span className="w-12 text-center text-lg font-black text-gray-800">{item.quantity}</span>
                                    <button onClick={() => onUpdate(item.id, 1)} className="w-10 h-10 flex items-center justify-center text-xl font-black text-gray-400 hover:text-pink-600 transition-colors">+</button>
                                </div>
                                <button onClick={() => onUpdate(item.id, -item.quantity)} className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Price Details Card */}
            <div className="lg:col-span-1">
                <div className="sticky top-28 bg-gray-50 p-8 rounded-3xl border-2 border-gray-100 shadow-inner">
                    <h3 className="text-sm font-black text-gray-400 mb-6 border-b-2 border-gray-200 pb-3 uppercase tracking-widest">Final Prise Summary</h3>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between font-bold text-gray-600">
                            <span>Prise ({items.length} itms)</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="flex justify-between font-black text-green-600">
                            <span>Diliveri Charge</span>
                            <span className="bg-green-100 px-2 py-0.5 rounded text-[10px]">FREE</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-600">
                            <span>Festival Tax</span>
                            <span className="line-through">₹249</span>
                        </div>
                        <div className="pt-6 border-t-2 border-dashed border-gray-200 flex justify-between items-end">
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Payable</p>
                                <p className="text-4xl font-black text-gray-800">₹{total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-600 text-white p-4 rounded-2xl mb-6 shadow-lg flex items-start gap-3">
                        <ShieldCheck className="shrink-0 animate-pulse" size={24} />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1">MegaSave Trust Garantee</p>
                            <p className="text-xs leading-tight opacity-90 italic">Your payment is 100% Secure. If you dont like the product, keep it for free!</p>
                        </div>
                    </div>

                    <button 
                        onClick={onProceed}
                        className="w-full bg-red-600 text-white font-black py-5 rounded-2xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 text-2xl group uppercase tracking-tighter"
                    >
                        <Zap size={24} fill="currentColor" className="group-hover:scale-125 transition-transform" />
                        BUY NOW FOR ₹{total}
                    </button>
                    
                    <p className="text-center text-[10px] text-gray-400 mt-6 font-black uppercase tracking-widest leading-none">
                        Diliveri instently in 24 hours Garranteed*
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
