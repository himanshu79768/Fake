
export interface Product {
  id: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  rating: number;
  reviews: number;
}

export type ViewState = 'SHOP' | 'CART' | 'PAYMENT' | 'SUCCESS';

export interface CartItem extends Product {
  quantity: number;
}
