import { CodeBlock } from "@/components/CodeBlock";
import { DocsPagination } from "@/components/DocsPagination";

export default function VanillaPage() {
  return (
    <div className="prose prose-invert prose-zinc max-w-4xl font-body">
      <h1 className="font-display tracking-tighter">Vanilla JavaScript Core</h1>
      <p className="text-xl text-muted-foreground font-light leading-relaxed">
        If you are using Vue, Svelte, Angular, or building a traditional server-rendered application without a heavy frontend framework, you can use the barebones <code>@secure-input/core</code> class.
      </p>

      <hr className="border-white/10 my-8" />

      <h2 className="font-display">Basic Implementation</h2>
      <p>
        The <code>SecureInput</code> class initializes the Web Worker and compiles the WebAssembly module behind the scenes. It handles all thread communication securely.
      </p>

      <CodeBlock 
        filename="checkout.js"
        code={`import { SecureInput } from "@secure-input/core";

async function setupSecureCheckout() {
  // 1. Create a new instance
  const secureInput = new SecureInput({
    debug: process.env.NODE_ENV === "development",
    onError: (err) => console.error("Encryption failed:", err)
  });

  try {
    // 2. Wait for the Web Worker and WASM module to initialize
    await secureInput.initialize();
    
    const checkoutBtn = document.getElementById("checkout-btn");
    const inputField = document.getElementById("coupon-input");

    checkoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      
      const plainText = inputField.value;
      
      // 3. Encrypt the value. This happens off the main thread.
      const encryptedPayload = await secureInput.encrypt(plainText);
      
      // Clear the input immediately
      inputField.value = "";
      
      // Send ciphertext to server
      await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ coupon: encryptedPayload })
      });
    });

  } catch (error) {
    // Fallback if WASM is not supported by the browser
    console.error("Secure Input unavailable:", error);
  }
}

setupSecureCheckout();`} 
        lang="javascript"
      />

      <h2 className="font-display mt-16">Cleanup & Memory Management</h2>
      <p>
        Because this library spans up a dedicated Web Worker, it consumes memory. If you are building a Single Page Application (SPA), it is critical to destroy the instance when the component unmounts or the user navigates away to prevent memory leaks.
      </p>

      <CodeBlock 
        code={`// When the user navigates away from the checkout page
window.addEventListener("beforeunload", () => {
  secureInput.destroy(); 
});`} 
        lang="javascript"
      />

      <div className="my-8 rounded-none border-l-4 border-white/20 bg-white/5 p-6 text-sm">
        <h4 className="mt-0 font-display font-bold text-white uppercase tracking-widest text-xs mb-2">Note on Vite / Webpack</h4>
        <p className="mb-0 text-muted-foreground">
          Modern bundlers like Vite and Webpack 5 handle Web Worker files automatically. The <code>@secure-input/core</code> package utilizes standard <code>new Worker(new URL('...', import.meta.url))</code> syntax so it should work out-of-the-box with zero custom bundler configuration required.
        </p>
      </div>

      <DocsPagination 
        prev={{ href: "/docs/react", title: "React Implementation" }}
        next={{ href: "/docs/server", title: "Server-Side Decryption" }}
      />
    </div>
  );
}