import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/AuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);
const url = import.meta.env.VITE_BASE_URL;

function CheckoutFormInner() {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  
  useEffect(() => {
    if (user?.id) {
      fetch(`${url}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, amount: 0.99 }),
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Failed to create payment intent");
          }
          const data = await res.json();
          setClientSecret(data.clientSecret);
        })
        .catch((err) => {
          console.error(err);
          setMessage("Error creating payment intent.");
        });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    const card = elements.getElement(CardElement);
    if (!card) {
      setMessage("Card Not found");
      setLoading(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      setMessage(result.error.message || "Error processing th epayment.");
    } else if (result.paymentIntent?.status === "succeeded") {
      setMessage("¡Payment success! Welcome to Premium Family 🎉");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold text-center">Become Premium 🤩 </h2>
      <div className="border p-4 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-indigo-600  font-medium py-2 px-4 rounded hover:bg-indigo-700 transition"
      >
        {loading ? "Proccesing..." : "Pay $0.99"}
      </button>
      {message && <p className="text-center text-red-500 text-sm">{message}</p>}
    </form>
  );
}

export default function CheckoutForm() {
  return (
    <div className="py-10 px-4">
      <Elements stripe={stripePromise}>
        <CheckoutFormInner />
      </Elements>
    </div>
  );
}
