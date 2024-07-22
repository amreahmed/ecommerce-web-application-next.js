"use client";
import React, { Suspense } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
import {Suspense } from "react";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

function Checkout() {
  const searchParams = useSearchParams();
  const options = {
    mode: "payment",
    currency: "usd",
    amount: searchParams.get("amount") * 100,
  };
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Elements stripe={stripePromise} options={options}>
        <Suspense fallback={<div>Loading...</div>}>
          <CheckoutForm amount={Number(searchParams.get("amount"))} />
        </Suspense>
      </Elements>
    </div>
  );
}

export default Checkout;
