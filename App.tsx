
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, ShieldCheck, Truck, Clock, ArrowLeft, CreditCard, ChevronRight, CheckCircle } from 'lucide-react';
import { Product, ViewState, CartItem } from './types';
import ProductSection from './components/ProductSection';
import CartSection from './components/CartSection';
import PaymentGateway from './components/PaymentGateway';

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Luxory Matte Lipstik Set (12 Shades) - Specel Edishon",
    originalPrice: 4999,
    salePrice: 199,
    image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=600&auto=format&fit=crop",
    rating: 5,
    reviews: 85210
  },
  {
    id: 2,
    name: "24K Pure Gold Facel Kit - Instent Glow Garranteed",
    originalPrice: 6500,
    salePrice: 249,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop",
    rating: 5,
    reviews: 22800
  },
  {
    id: 3,
    name: "Pro Eyeshado Pallete 120 Colors - Water Proof",
    originalPrice: 3500,
    salePrice: 299,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop",
    rating: 5,
    reviews: 1240
  },
  {
    id: 4,
    name: "Skin Whitening Cream - Megic Whitening Formula",
    originalPrice: 1800,
    salePrice: 99,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop",
    rating: 5,
    reviews: 510
  },
  {
    id: 5,
    name: "Herbal Hair Growt Serim (100ml) - No Side Efect",
    originalPrice: 2800,
    salePrice: 159,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&auto=format&fit=crop",
    rating: 5,
    reviews: 456
  },
  {
    id: 6,
    name: "Waterproof Megic Maskara - Extra Long Lashes",
    originalPrice: 1299,
    salePrice: 79,
    image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?w=600&auto=format&fit=crop",
    rating: 5,
    reviews: 399
  },
  {
    id: 7,
    name: "Oreginal French Perfume Mini Gift Box - 5 Fragrance",
    originalPrice: 8999,
    salePrice: 499,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop",
    rating: 5,
    reviews: 15400
  },
  {
    id: 8,
    name: "Hydrating Face Primar - Smoth Skin Base",
    originalPrice: 1500,
    salePrice: 120,
    image: "https://images.unsplash.com/photo-1596462502278-27bf8d433e60?w=600&auto=format&fit=crop",
    rating: 5,
    reviews: 820
  },
  {
    id: 9,
    name: "Matte Finis Compact Powder - Oil Control",
    originalPrice: 1200,
    salePrice: 85,
    image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=600&auto=format&fit=crop",
    rating: 5,
    reviews: 2100
  },
  {
    id: 10,
    name: "Authentec Korean Sheet Mask - Pack of 10",
    originalPrice: 3000,
    salePrice: 199,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop",
    rating: 5,
    reviews: 6700
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('SHOP');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [timeLeft, setTimeLeft] = useState(485); 
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ name: 'Sneha', city: 'Delhi' });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const names = ['Pooja', 'Deepak', 'Riya', 'Anjali', 'Karan', 'Sneha', 'Monika', 'Rajesh'];
    const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Pune', 'Surat', 'Hyderabad', 'Chennai'];
    const interval = setInterval(() => {
      setPopupData({
        name: names[Math.floor(Math.random() * names.length)],
        city: cities[Math.floor(Math.random() * cities.length)]
      });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setView('CART');
    window.scrollTo(0, 0);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);

  return (
    <div className="min-h-screen flex flex-col bg-white shadow-sm relative overflow-x-hidden">
      {/* Scam Banner */}
      <div className="bg-red-600 text-white text-center py-2 text-xs font-bold font-comic flex justify-center items-center gap-4 overflow-hidden border-b-2 border-yellow-300">
        <span className="flash-sale whitespace-nowrap uppercase">🔥 BEAUTI CLEARANCE SALE - 95% OFF! HURY UP! 🔥</span>
        <span className="flash-sale whitespace-nowrap uppercase">🔥 ONLY FEW STOCKS LEFT - BESST DEAL EVER! 🔥</span>
        <span className="flash-sale whitespace-nowrap uppercase">🔥 BEAUTI CLEARANCE SALE - 95% OFF! HURY UP! 🔥</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('SHOP')}>
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">M</div>
          <span className="font-scam-header text-2xl tracking-tighter font-black text-pink-700 leading-tight">MegaSave Cosmetiks</span>
        </div>
        <div className="flex gap-6 items-center">
          <div className="hidden md:flex gap-4 text-sm font-bold text-gray-600">
            <span className="hover:text-pink-600 cursor-pointer">Best Sellers</span>
            <span className="hover:text-pink-600 cursor-pointer">New Arrivels</span>
            <span className="text-red-500">Flash Sales!</span>
          </div>
          <div className="relative cursor-pointer group" onClick={() => setView('CART')}>
            <ShoppingCart size={28} className="text-gray-700 group-hover:text-pink-600 transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black border-2 border-white animate-bounce">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {view === 'SHOP' && (
          <>
            <section className="bg-gradient-to-b from-yellow-300 to-yellow-500 p-8 text-center border-b-8 border-pink-600">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-scam-header font-black text-pink-700 leading-none mb-4 drop-shadow-lg">95% OFF</h1>
                <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-6 tracking-tighter uppercase italic">GRAND BEAUTI FESTIVAL SALE!</h2>
                <div className="bg-white rounded-2xl p-4 inline-block shadow-2xl border-4 border-red-600">
                  <p className="text-sm text-gray-700 uppercase font-black mb-2 flex items-center justify-center gap-2">
                    <Clock size={16} className="text-red-600 animate-pulse" />
                    Discunt Offer Ends In:
                  </p>
                  <div className="text-4xl md:text-6xl font-mono font-black text-red-600 tracking-widest">{formatTime(timeLeft)}</div>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-black text-pink-900 uppercase">
                  <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><CheckCircle size={14}/> 100% Authentec</span>
                  <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><CheckCircle size={14}/> Fast Diliveri</span>
                  <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><CheckCircle size={14}/> Pay on Diliveri*</span>
                </div>
              </div>
            </section>

            <div className="container mx-auto">
              <ProductSection products={PRODUCTS} onBuyNow={handleAddToCart} />
            </div>

            <section className="p-8 bg-pink-50 border-y border-pink-200">
              <div className="max-w-6xl mx-auto">
                <h3 className="text-2xl font-black mb-6 border-b-2 border-pink-300 pb-2 uppercase text-pink-800 flex items-center gap-2">
                  <Star className="fill-pink-800" />
                  What Our Happy Ladyes Say
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-100 transform hover:-translate-y-1 transition-transform">
                    <div className="flex text-yellow-400 mb-2">
                      <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                    </div>
                    <p className="text-sm italic font-medium text-gray-700">"The Lipstik is realy good! Very cheap Prise but high quality. Recieved in just 24 hours. Best site for makeup."</p>
                    <p className="mt-4 text-xs font-bold text-pink-600">— Anjali Sharma, Mumbai</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-100 transform hover:-translate-y-1 transition-transform">
                    <div className="flex text-yellow-400 mb-2">
                      <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                    </div>
                    <p className="text-sm italic font-medium text-gray-700">"Beauti products at 100 rupees? I was shocked but it's real! My skin is glowing now thanks to MegaSave."</p>
                    <p className="mt-4 text-xs font-bold text-pink-600">— Riya Gupta, Delhi</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-100 transform hover:-translate-y-1 transition-transform">
                    <div className="flex text-yellow-400 mb-2">
                      <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                    </div>
                    <p className="text-sm italic font-medium text-gray-700">"Very good deal on combo pack. I ordered 5 sets. All oreginal brands at 90% discount. Hury up girls!"</p>
                    <p className="mt-4 text-xs font-bold text-pink-600">— Monika, Bangalore</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'CART' && (
          <div className="container mx-auto max-w-5xl py-8 px-4">
            <CartSection 
              items={cart} 
              onUpdate={updateQuantity} 
              onProceed={() => setView('PAYMENT')} 
              onBack={() => setView('SHOP')}
            />
          </div>
        )}

        {view === 'PAYMENT' && (
          <PaymentGateway 
            amount={totalAmount} 
            onSuccess={() => {
                setCart([]);
                setView('SUCCESS');
            }} 
            onCancel={() => setView('CART')}
          />
        )}

        {view === 'SUCCESS' && (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b from-green-50 to-white">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 border-4 border-green-200 animate-pulse">
              <ShieldCheck size={64} />
            </div>
            <h1 className="text-4xl font-black text-gray-800 mb-4">Payment Succesfull!</h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg">Your order is <span className="font-bold text-green-600">Garranteed</span> to reach you in 2-4 days. Confirmation mesage sent to your mobile phone!</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setView('SHOP')}
                className="bg-pink-600 text-white font-black py-4 px-12 rounded-2xl shadow-xl hover:bg-pink-700 active:scale-95 transition-all text-xl"
              >
                Continue Shoping
              </button>
              <button 
                className="bg-white text-gray-800 border-2 border-gray-200 font-bold py-4 px-12 rounded-2xl hover:bg-gray-50 active:scale-95 transition-all"
              >
                Track My Order
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white p-12 mt-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-scam-header text-2xl text-pink-500 mb-4">MegaSave Cosmetiks</h4>
            <p className="text-gray-400 text-sm mb-6 max-w-md">We are No.1 Discount Shop in India for high quality makeup. All our products are 100% Authentec and tested by experts. No hidden charge.</p>
            <div className="flex gap-4">
               <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
               <div className="w-8 h-8 bg-pink-600 rounded-full"></div>
               <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            </div>
          </div>
          <div className="text-sm text-gray-400 space-y-2">
            <h4 className="font-bold text-gray-200 mb-4 uppercase tracking-widest">HELP & SUPPORT</h4>
            <p className="hover:text-white cursor-pointer">Track My Parcel</p>
            <p className="hover:text-white cursor-pointer">Return Garantee</p>
            <p className="hover:text-white cursor-pointer">Refund Polecy</p>
            <p className="hover:text-white cursor-pointer">About Us</p>
          </div>
          <div className="text-sm text-gray-400 space-y-2">
            <h4 className="font-bold text-gray-200 mb-4 uppercase tracking-widest">CONTAK US</h4>
            <p>support.beauti@gmail.com</p>
            <p>Help Line: 1800-FAKE-SAVINGS</p>
            <p>Address: Secret Warehouse, Mumbai North</p>
          </div>
        </div>
        <div className="container mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
           <p>100% Garranteed Beauti Products. MegaSave Mart Solutions &copy; 2024. All Right Reserved.</p>
           <p className="mt-2">No physical shop. No GST details. No liability for any damage.</p>
        </div>
      </footer>

      {showPopup && view === 'SHOP' && (
        <div className="fixed bottom-10 left-4 z-[100] bg-white shadow-2xl border-l-8 border-pink-500 p-4 rounded-xl flex items-center gap-4 animate-bounce max-w-xs">
          <div className="bg-pink-100 p-3 rounded-full text-pink-600 shrink-0">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-sm font-black text-gray-800">{popupData.name} from {popupData.city}</p>
            <p className="text-xs text-gray-500">Ordered 12 Lipstik set 2 min ago!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
