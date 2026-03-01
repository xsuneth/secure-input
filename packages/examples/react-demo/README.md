# Secure-Store Checkout Demo

A realistic Shopify-style ecommerce checkout page for testing SecureInput component against coupon code stealing extensions.

## 🎨 Design Theme

This demo features the **shadcn/ui vega** theme with:
- **Amber color scheme** on stone base colors
- **DM Sans font** for modern typography
- **Small border radius** for clean appearance
- **Lucide React** icons throughout
- **Professional dark/light mode support**

## 🎯 Purpose

This demo creates a convincing ecommerce checkout experience to test:
- **Coupon code encryption**: Using `@secure-input/react` with WASM-based encryption
- **Extension protection**: Web Worker isolation prevents malicious extensions from accessing plaintext coupon codes
- **Real-world testing**: Realistic ecommerce scenario for security validation

## 🛒 Features

### Ecommerce Functionality
- **Shopping Cart**: Add/remove items, adjust quantities
- **Customer Information**: Complete form with validation
- **Order Summary**: Real-time pricing with discount calculations
- **Secure Checkout**: Professional UI/UX matching Shopify standards

### Security Features
- **Encrypted Coupon Input**: All coupon codes are encrypted using ChaCha20Poly1305 in WASM
- **Web Worker Isolation**: Encryption happens in an isolated thread
- **Extension Protection**: Malicious browser extensions cannot access plaintext values
- **Real-time Status**: Visual feedback for encryption status

### Design System
- **shadcn/ui vega components** for consistent design
- **Tailwind CSS v4** with modern color system
- **Amber accent colors** for trust and warmth
- **Semantic HTML** for accessibility
- **Responsive design** for all devices

## 🏗️ Architecture

### Tech Stack
- **React 18** with TypeScript
- **shadcn/ui vega** theme with Radix components
- **Tailwind CSS v4** with CSS variables
- **Vite** for development and building
- **WASM** encryption via `@secure-input/core`
- **Web Workers** for isolation
- **DM Sans font** via @fontsource-variable

### Component Structure
```
src/
├── App.tsx              # Main checkout application
├── components/
│   └── ui/             # shadcn/ui vega components
├── types/
│   └── checkout.ts      # TypeScript definitions
├── data/
│   └── mockData.ts      # Mock cart data
└── lib/
    └── utils.ts         # Helper utilities
```
src/
├── App.tsx              # Main checkout application
├── types/
│   └── checkout.ts      # TypeScript definitions
├── data/
│   └── mockData.ts      # Mock cart data
└── lib/
    └── utils.ts         # Helper utilities
```

## 🚀 Getting Started

### Development
```bash
# Navigate to demo directory
cd packages/examples/react-demo

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5174
```

### Building
```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🧪 Testing Scenarios

### Coupon Code Testing
1. **Enter coupon codes** in the order summary section
2. **Monitor browser console** for encrypted output
3. **Test browser extensions** - they should only see encrypted data
4. **Verify encryption status** through visual indicators

### Extension Protection Demo
- Open browser developer tools
- Monitor network requests
- Try to access coupon code via JavaScript
- Observe that only encrypted values are exposed

## 🔒 Security Demonstration

### Before SecureInput
```javascript
// Malicious extension can read:
input.value // "SAVE20" - plaintext exposed!
```

### With SecureInput
```javascript
// Malicious extension can only access:
"encrypted:chaCha20:base64:..." // Encrypted data only!
```

### Encryption Flow
1. User types coupon code → Local React state
2. On submission → Encrypted in Web Worker (WASM)
3. Only encrypted data leaves component → Server
4. Browser extensions cannot access plaintext

## 🛡️ How It Works

### Web Worker Isolation
- Encryption runs in separate thread
- Main thread only receives encrypted output
- Extensions cannot access worker memory

### WASM Encryption
- ChaCha20Poly1305 symmetric encryption
- Hardware-accelerated performance
- No plaintext exposure in JavaScript

### Component Interface
```typescript
<SecureInput
  placeholder="Enter coupon code..."
  onEncryptedSubmit={handleEncryptedSubmit}
  showStatus={true}
  inputProps={{
    className: "custom-styling",
    style: { fontSize: "14px" }
  }}
/>
```

## 🎨 Design Inspiration

Based on Shopify's checkout design patterns with modern enhancements:
- **shadcn/ui vega theme** for professional appearance
- **Amber accent colors** on stone base for trust and warmth
- **DM Sans typography** for excellent readability
- **Clean, minimalist aesthetic** with subtle shadows
- **Trust indicators** (SSL badges, security messages)
- **Professional spacing** and layout
- **Mobile-responsive design** with touch-friendly controls
- **Accessible form controls** with proper labels and focus states
- **Semantic HTML** for screen readers and SEO

## 📱 Mobile Support

- Fully responsive design
- Touch-friendly interface
- Optimized for mobile checkout flows
- Maintains security on all devices

## 🔧 Customization

### Store Branding
Edit the header in `App.tsx`:
```typescript
<h1 className="text-3xl font-bold text-gray-900 mb-2">Your-Store</h1>
```

### Product Data
Modify `src/data/mockData.ts` to test different scenarios:
```typescript
export const mockCart: Cart = {
  items: [
    // Your custom products
  ],
  // Pricing data
};
```

### Security Configuration
SecureInput accepts standard encryption options:
```typescript
<SecureInput
  // ...props
  config={{
    key: "your-encryption-key", // Custom key
    debug: true, // Development mode
  }}
/>
```

## 🐛 Troubleshooting

### Common Issues
- **Build fails**: Check `@secure-input/react` is built first
- **Encryption not working**: Verify WASM files are accessible
- **Styles not loading**: Ensure Tailwind CSS v4 is properly configured

### Development Tips
- Use `pnpm dev` for hot reloading
- Check browser console for encryption status
- Test with various browser extensions installed
- Verify mobile compatibility

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Note**: This is a demo application for testing purposes. Do not use in production environments.