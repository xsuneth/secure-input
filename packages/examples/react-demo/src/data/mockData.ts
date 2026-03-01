import { Cart } from "@/types/checkout";

export const mockCart: Cart = {
  items: [
    {
      id: "prod_1",
      name: "Premium Wireless Headphones",
      variant: "Color: Midnight Black",
      price: 299.99,
      quantity: 1,
      image: "https://picsum.photos/seed/headphones/80/80",
      sku: "WH-001-BLK"
    },
    {
      id: "prod_2", 
      name: "Genuine Leather Phone Case",
      variant: "iPhone 15 Pro, Brown",
      price: 49.99,
      quantity: 2,
      image: "https://picsum.photos/seed/phonecase/80/80",
      sku: "PC-002-BRN"
    },
    {
      id: "prod_3",
      name: "USB-C Fast Charging Cable",
      variant: "2m length, White",
      price: 24.99,
      quantity: 1,
      image: "https://picsum.photos/seed/cable/80/80",
      sku: "UC-003-WHT"
    }
  ],
  subtotal: 424.96,
  shipping: 0, // Free shipping
  tax: 34.00,
  total: 458.96
};