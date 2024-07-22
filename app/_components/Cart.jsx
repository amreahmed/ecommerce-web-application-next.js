import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const router = useRouter();

  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount += Number(item.product.attributes.price);
    });
    return totalAmount.toFixed(2);
  };

  return (
    <div className="h-[300px] w-[250px] bg-gray-100 z-10 rounded-md border border-gray-300 shadow-sm absolute mx-10 right-[80px] top-14 p-5 overflow-auto">
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <img
                src={item?.product.attributes?.banner.data.attributes.url}
                alt=""
                className="size-16 rounded object-cover"
              />

              <div>
                <h3 className="text-sm text-gray-900">{item.product.attributes.title}</h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Category:</dt>
                    <dd className="inline"> {item.product.attributes?.category}</dd>
                  </div>

                  <div>
                    <dt className="inline">Price:</dt>
                    <dd className="inline"> ${item.product.attributes?.price}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4 text-center mt-5">
        <Link
          href="/cart"
          className="block rounded border border-gray-300 px-5 py-3 text-sm text-gray-900 transition hover:ring-1 hover:ring-gray-400">
          View my cart ({cart.length})
        </Link>

        <button
          onClick={() => router.push(`/checkout?amount=${getTotalAmount()}`)}
          className="block rounded bg-primary px-2 py-3 text-sm text-white transition hover:bg-blue-500 w-full">
          Checkout
        </button>

        <a
          href="#"
          className="inline-block text-sm text-gray-900 underline underline-offset-4 transition hover:text-blue-500">
          Continue shopping
        </a>
      </div>
    </div>
  );
};

export default Cart;
