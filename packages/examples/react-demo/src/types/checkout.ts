export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CouponData {
  code: string;
  discount: number; // percentage as decimal (0.1 = 10%)
}