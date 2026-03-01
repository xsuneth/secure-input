import { useState } from "react";
import { SecureInput } from "@secure-input/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Check, Tag, Shield, Lock } from "lucide-react";
import { Cart, CouponData, CustomerInfo } from "@/types/checkout";
import { mockCart } from "@/data/mockData";

function App() {
  const [cart, setCart] = useState<Cart>(mockCart);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [coupon, setCoupon] = useState<CouponData>({ code: "", discount: 0 });
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleQuantityUpdate = (id: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleCustomerInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const formData = new FormData(e.target as HTMLFormElement);
    setCustomerInfo({
      email: formData.get('email') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip: formData.get('zip') as string,
      country: formData.get('country') as string,
    });
    
    setIsProcessing(false);
  };

  const handleCouponApplied = async (encryptedCode: string) => {
    console.log("Encrypted coupon code received:", encryptedCode);
    
    // Simulate coupon validation - apply 10% discount for demo
    setCoupon({ 
      code: "DISCOUNT10", 
      discount: 0.1 
    });
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log("Order placed:", {
      customer: customerInfo,
      cart,
      coupon
    });
    
    setIsProcessing(false);
    alert("Order completed successfully! (This is a demo)");
  };

  const calculateDiscount = () => {
    return cart.subtotal * coupon.discount;
  };

  const calculateTotal = () => {
    const discount = calculateDiscount();
    return cart.subtotal - discount + cart.shipping + cart.tax;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Secure-Store</h1>
          <p className="text-muted-foreground">Complete your purchase securely</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Cart Summary */}
            <Card className="shadow-shopify">
              <CardHeader>
                <CardTitle>Shopping Cart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{item.variant}</p>
                        <p className="text-sm font-medium mt-2">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityUpdate(item.id, Math.max(1, item.quantity - 1))}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(cart.tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Customer Info Form */}
            {!customerInfo ? (
              <form onSubmit={handleCustomerInfoSubmit} className="shadow-shopify">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          required
                          placeholder="123 Main St"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            type="text"
                            required
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            type="text"
                            required
                            placeholder="NY"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input
                            id="zip"
                            name="zip"
                            type="text"
                            required
                            placeholder="10001"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            name="country"
                            type="text"
                            required
                            placeholder="United States"
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Continue to Payment"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-600 font-medium">
                      Customer information saved
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit space-y-6">
            <Card className="shadow-shopify-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(cart.subtotal)}</span>
                  </div>
                  
                  {coupon.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {coupon.code}
                        </Badge>
                        <span className="text-green-600">Discount</span>
                      </div>
                      <span className="text-green-600">-{formatPrice(calculateDiscount())}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(cart.tax)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>

                {/* Coupon Code Section - SECURE INPUT INTEGRATION */}
                <div className="space-y-3">
                  <Label>Coupon Code</Label>
                  <div className="space-y-2">
                    <SecureInput
                      placeholder="Enter coupon code..."
                      onEncryptedSubmit={handleCouponApplied}
                      showStatus={true}
                      inputProps={{
                        className: "w-full",
                        style: { fontSize: "14px" }
                      }}
                    />
                  </div>
                  
                  {coupon.discount > 0 && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Check className="h-4 w-4" />
                      <span>Coupon applied successfully! {coupon.discount * 100}% off</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Trust Badges */}
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-3 flex items-center justify-center gap-1">
                      <Shield className="h-4 w-4" />
                      Secure Checkout
                    </div>
                    <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                          <Lock className="h-2 w-2 text-white" />
                        </div>
                        SSL Secured
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <Lock className="h-2 w-2 text-primary-foreground" />
                        </div>
                        Data Protected
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={isProcessing}
                  onClick={handleCheckout}
                >
                  {isProcessing ? "Processing..." : "Complete Purchase"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By completing this purchase you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;