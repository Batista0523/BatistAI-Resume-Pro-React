
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);
const url = import.meta.env.VITE_BASE_URL;

function CheckoutFormInner() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
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
      setMessage(result.error.message || "Error processing the payment.");
    } else if (result.paymentIntent?.status === "succeeded") {
      alert("Payment successful! Welcome to Premium Family 🎉");
      navigate(`/userProfile/${user?.id}`);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg p-4 rounded bg-light border border-secondary"
    >
      <h2 className="text-center text-primary mb-4">
        Become Premium Member 🤩
      </h2>

      <p className="text-muted text-center mb-4">
        This project is primarily intended to showcase my skills as a software
        engineer, specifically in integrating Stripe for payment processing and
        OpenAI for AI-based resume suggestions. The resume you create using AI
        suggestions may not be as professional as it should be, but it is
        designed to help you get started and personalize it as needed. Please
        note that any payment made is non-refundable, and you make your payment
        decision entirely at your own discretion. Payment is securely processed
        through Stripe, ensuring that your information is safe and protected.
      </p>

    
      <div className="form-group mb-3">
        <label className="font-weight-bold">Card Information</label>
        <div className="card-element-container">
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
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary w-100"
      >
        {loading ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          "Pay $0.99"
        )}
      </button>

      {message && <div className="alert alert-danger mt-3">{message}</div>}
    </form>
  );
}

export default function CheckoutForm() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Elements stripe={stripePromise}>
            <CheckoutFormInner />
          </Elements>
        </div>
      </div>
    </div>
  );
}
