
import React, { useState } from 'react';
import { CreditCard, Smartphone, ShieldCheck, ArrowLeft, Loader2, Lock, Verified, Landmark, Star } from 'lucide-react';

interface PaymentGatewayProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ amount, onSuccess, onCancel }) => {
  const [method, setMethod] = useState<'CARD' | 'UPI' | 'SELECT'>('SELECT');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 4000);
  };

  if (isProcessing) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="relative mb-8">
            <Loader2 className="animate-spin text-blue-600" size={80} />
            <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500" size={32} />
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">Processeng Your Prise...</h2>
        <p className="text-lg text-gray-500 max-w-sm">Doo not close the window or press back button while we secure your discunt.</p>
        <div className="mt-12 flex gap-4 opacity-30 grayscale">
            <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-10" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-10" alt="Mastercard" />
            <img src="https://img.icons8.com/color/48/000000/pci-compliance.png" className="h-10" alt="PCI" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f4f9] min-h-screen">
      {/* Flashy Header */}
      <div className="bg-white p-6 border-b-4 border-blue-600 flex flex-col md:flex-row justify-between items-center shadow-lg gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <div className="flex items-center gap-2">
                <Lock size={12} className="text-green-600" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secure Beauti Gateway</p>
            </div>
            <p className="text-xl font-black text-blue-900">MegaSave Mart Global Payments</p>
          </div>
        </div>
        <div className="bg-blue-900 text-white px-8 py-3 rounded-2xl text-center shadow-inner">
          <p className="text-[10px] uppercase font-bold text-blue-300">Total Payable Amunt</p>
          <p className="text-3xl font-black">₹{amount}.00</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Side: Trust Badges */}
            <div className="col-span-1 space-y-4">
                <div className="bg-green-600 text-white p-4 rounded-2xl shadow-lg flex items-center gap-3">
                    <Verified size={32} />
                    <div>
                        <p className="font-bold text-sm leading-tight">Garranteed Transaction</p>
                        <p className="text-[10px] opacity-80">Verified by Security Team</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-4 border-b pb-2">Why Pay Now?</p>
                    <ul className="text-xs space-y-3 font-medium text-gray-700">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> 100% Secure Gateway</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Fast Dispatch in 1 Hour</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> 95% Discount Locked</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Priority Support</li>
                    </ul>
                </div>
            </div>

            {/* Right Side: Methods */}
            <div className="col-span-1 md:col-span-2 space-y-6">
                {method === 'SELECT' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-gray-600 mb-2 uppercase tracking-tighter">Choose Your Fast Pay Method</h3>
                        
                        <button 
                            onClick={() => setMethod('UPI')}
                            className="w-full bg-white border-2 border-transparent p-6 rounded-3xl flex items-center justify-between hover:border-blue-600 transition-all shadow-xl hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner">
                                <Smartphone size={32} />
                            </div>
                            <div className="text-left">
                                <p className="font-black text-lg text-gray-800 tracking-tight">UPI (PhonePe, GPay, Paytm)</p>
                                <p className="text-xs text-gray-400">Pay using any moble UPI app instently</p>
                            </div>
                            </div>
                            <div className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm animate-pulse">RECOMMENDED</div>
                        </button>

                        <button 
                            onClick={() => setMethod('CARD')}
                            className="w-full bg-white border-2 border-transparent p-6 rounded-3xl flex items-center justify-between hover:border-blue-600 transition-all shadow-xl hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                                <CreditCard size={32} />
                            </div>
                            <div className="text-left">
                                <p className="font-black text-lg text-gray-800 tracking-tight">Card (Debit / Credit)</p>
                                <p className="text-xs text-gray-400">Visa, Mastercard, RuPay, Maestro, Amex</p>
                            </div>
                            </div>
                            <Star className="text-yellow-400 fill-yellow-400" size={24} />
                        </button>

                        <button className="w-full bg-gray-100 p-6 rounded-3xl flex items-center justify-between opacity-50 cursor-not-allowed grayscale">
                            <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                                <Landmark size={32} />
                            </div>
                            <div className="text-left">
                                <p className="font-black text-lg text-gray-500">Net Banking</p>
                                <p className="text-xs text-gray-400">Disabled for Flash Sales</p>
                            </div>
                            </div>
                        </button>
                    </div>
                )}

                {method === 'CARD' && (
                    <div className="bg-white p-8 rounded-3xl border-2 border-blue-100 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
                        <button onClick={() => setMethod('SELECT')} className="text-xs font-bold text-blue-600 mb-6 flex items-center hover:underline">
                            <ArrowLeft size={14} className="mr-1" /> BACK TO CHOICES
                        </button>
                        <h3 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-2">
                             Enter Card Detales
                             <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6" />
                             <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-6" />
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Card Number</label>
                                <div className="relative">
                                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full border-b-2 border-gray-100 py-3 focus:border-blue-500 outline-none text-xl font-mono tracking-[0.2em] placeholder:text-gray-200" />
                                    <CreditCard className="absolute right-2 top-3 text-gray-300" size={20} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Expiry Date</label>
                                    <input type="text" placeholder="MM / YY" className="w-full border-b-2 border-gray-100 py-3 focus:border-blue-500 outline-none text-lg font-mono tracking-widest" />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">CVV Code</label>
                                    <input type="password" placeholder="***" className="w-full border-b-2 border-gray-100 py-3 focus:border-blue-500 outline-none text-lg font-mono" />
                                </div>
                            </div>
                            <button 
                                onClick={handlePay}
                                className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl mt-8 shadow-2xl active:scale-95 transition-all text-xl hover:bg-blue-700 uppercase tracking-widest flex items-center justify-center gap-3"
                            >
                                <ShieldCheck size={24} />
                                Secure Pay ₹{amount}.00
                            </button>
                            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-tighter">End-to-End Encryption Enabled for your safety</p>
                        </div>
                    </div>
                )}

                {method === 'UPI' && (
                    <div className="bg-white p-8 rounded-3xl border-2 border-purple-100 shadow-2xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -z-10 opacity-50"></div>
                        <button onClick={() => setMethod('SELECT')} className="text-xs font-bold text-blue-600 mb-6 flex items-center hover:underline">
                            <ArrowLeft size={14} className="mr-1" /> BACK TO CHOICES
                        </button>
                        <h3 className="text-2xl font-black text-gray-800 mb-8">Pay via UPI App</h3>
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="border rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-purple-600 transition-colors bg-gray-50 shadow-sm">
                                    <img src="https://img.icons8.com/color/48/000000/google-pay.png" className="h-10" />
                                    <span className="text-[10px] font-bold">GPay</span>
                                </div>
                                <div className="border rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-purple-600 transition-colors bg-gray-50 shadow-sm">
                                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs italic">Pe</div>
                                    <span className="text-[10px] font-bold">PhonePe</span>
                                </div>
                                <div className="border rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-purple-600 transition-colors bg-gray-50 shadow-sm">
                                    <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-xs">Paytm</div>
                                    <span className="text-[10px] font-bold">Paytm</span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Enter UPI ID Manully</label>
                                <div className="flex items-center gap-2 border-b-2 border-gray-100 focus-within:border-purple-600 transition-colors">
                                    <input type="text" placeholder="username@bank" className="w-full py-4 outline-none text-lg font-mono" />
                                    <button className="text-xs font-black text-purple-600 uppercase hover:bg-purple-50 px-4 py-2 rounded-xl">Verify</button>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handlePay}
                                className="w-full bg-purple-600 text-white font-black py-5 rounded-2xl mt-8 shadow-2xl active:scale-95 transition-all text-xl hover:bg-purple-700 uppercase tracking-widest"
                            >
                                Pay ₹{amount}.00 instently
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t-2 border-gray-100 flex justify-center items-center gap-8 shadow-2xl">
        <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-8 grayscale opacity-40" alt="Visa" />
        <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-8 grayscale opacity-40" alt="Mastercard" />
        <img src="https://img.icons8.com/color/48/000000/maestro.png" className="h-8 grayscale opacity-40" alt="Maestro" />
        <img src="https://img.icons8.com/color/48/000000/rupay.png" className="h-8 grayscale opacity-40" alt="RuPay" />
        <div className="h-8 w-[1px] bg-gray-200"></div>
        <div className="flex items-center gap-2 opacity-40">
            <Lock size={16} />
            <span className="text-[10px] font-black uppercase">AES-256 BIT SSL SECURED</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
