
import React, { useState } from 'react';

interface CheckoutFormProps {
  onNext: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.address) {
      onNext();
    } else {
      alert("Please fill all details correctly.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Delivery Name</label>
        <input 
          required
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Enter your full name"
          className="w-full border p-3 rounded bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile Number (For Delivery)</label>
        <input 
          required
          type="tel" 
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          placeholder="10 digit mobile number"
          className="w-full border p-3 rounded bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Shipping Address</label>
        <textarea 
          required
          rows={3}
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          placeholder="House No, Street, Landmark, City"
          className="w-full border p-3 rounded bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Pincode</label>
          <input 
            required
            type="text" 
            value={formData.pincode}
            onChange={(e) => setFormData({...formData, pincode: e.target.value})}
            placeholder="6 digit pincode"
            className="w-full border p-3 rounded bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="pt-4">
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 flex items-center justify-center gap-2 group transition-all"
        >
          Proceed to Secure Payment
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
        <p className="text-[10px] text-center text-gray-400 mt-2">By clicking, you agree to our terms and conditions.</p>
      </div>
    </form>
  );
};

export default CheckoutForm;
