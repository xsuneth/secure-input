import { CodeBlock } from "@/components/CodeBlock";
import { Shield } from "lucide-react";
import { DocsPagination } from "@/components/DocsPagination";

export default function ServerPage() {
  return (
    <div className="prose prose-invert prose-zinc max-w-4xl font-body">
      <h1 className="font-display tracking-tighter">Server-Side Decryption</h1>
      <p className="text-xl text-muted-foreground font-light leading-relaxed">
        The client-side WASM module uses standard ChaCha20Poly1305 authenticated encryption. To process the submitted payload, you must decrypt it on your backend.
      </p>

      <hr className="border-white/10 my-8" />

      <h2 className="font-display">Node.js Implementation</h2>
      <p>
        If your backend runs on Node.js (Express, Fastify, Next.js API routes), we recommend using the highly audited <code>@noble/ciphers</code> library.
      </p>

      <CodeBlock 
        code="npm install @noble/ciphers" 
        lang="bash" 
      />

      <p className="mt-8">
        The ciphertext you receive from the client is a base64-encoded string. The first 12 bytes represent the randomly generated initialization vector (nonce), and the remaining bytes are the actual encrypted payload.
      </p>

      <CodeBlock 
        filename="api/checkout.ts"
        code={`import { chacha20poly1305 } from "@noble/ciphers/chacha";

// Helper function to decode the payload
function decryptCoupon(encryptedBase64: string, serverKey: Uint8Array): string {
  try {
    // 1. Decode from Base64 to binary buffer
    const data = Buffer.from(encryptedBase64, "base64");
    
    // 2. Extract the 12-byte nonce
    const nonce = data.subarray(0, 12);
    
    // 3. Extract the ciphertext
    const ciphertext = data.subarray(12);

    // 4. Initialize cipher with the exact same key used on the client
    const cipher = chacha20poly1305(serverKey, nonce);
    
    // 5. Decrypt
    const plaintextBuffer = cipher.decrypt(ciphertext);

    // 6. Convert back to UTF-8 string
    return Buffer.from(plaintextBuffer).toString("utf8");
  } catch (error) {
    throw new Error("Decryption failed or data was tampered with.");
  }
}

// Example Express / Next.js API Route handler
export async function POST(request: Request) {
  const body = await request.json();
  const encryptedCoupon = body.coupon;

  // WARNING: In a real app, do not hardcode this key.
  // It should be fetched from an environment variable or session store
  // and must exactly match the 32-byte key used by the client.
  const encryptionKey = new Uint8Array(32).fill(1); 

  try {
    const rawCouponCode = decryptCoupon(encryptedCoupon, encryptionKey);
    console.log("Safely recovered code:", rawCouponCode);
    
    // Proceed with validating the code against your database...
    return Response.json({ success: true });
    
  } catch (err) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }
}`} 
        lang="typescript"
      />

      <div className="my-12 rounded-none border border-destructive/30 bg-destructive/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-destructive"></div>
        <div className="flex items-center gap-4 mb-4">
          <Shield className="w-8 h-8 text-destructive" />
          <h3 className="m-0 font-display font-bold text-xl text-destructive uppercase tracking-widest text-sm">Crucial Security Requirement</h3>
        </div>
        <p className="text-muted-foreground">
          If a browser extension or bot extracts your hardcoded 32-byte encryption key from your client-side JavaScript bundle, <strong>the obfuscation is broken</strong>. They can simply recreate the ChaCha cipher and decrypt the payload themselves.
        </p>
        <p className="text-muted-foreground mt-4 mb-0">
          For production systems, you should generate a unique, cryptographically random 32-byte key on the server <em>per user session</em>, inject it into the initial HTML page load, and store it in Redis/Memcached. When the user submits the form, you look up the specific key for their session to decrypt the data.
        </p>
      </div>

      <DocsPagination 
        prev={{ href: "/docs/vanilla", title: "Vanilla JS Implementation" }}
      />
    </div>
  );
}