// Route: /bag
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  getBag,
  updateBagQty,
  removeFromBag,
  getBagTotal,
} from "../lib/cart";
import { SlHandbag } from "react-icons/sl";


export default function BagPage() {
  const router = useRouter();
  const [items, setItems] = React.useState([]);

  const refresh = () => setItems(getBag());

  React.useEffect(() => {
    refresh();
    window.addEventListener("bag-updated", refresh);
    return () => window.removeEventListener("bag-updated", refresh);
  }, []);

  const total = getBagTotal(items);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl flex font-bold text-zinc-900 dark:text-zinc-50 mb-8">
         <SlHandbag />
 Your Bag
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-500 dark:text-zinc-400 mb-4">
              Your bag is empty.
            </p>
            <button
              onClick={() => router.push("/oversized")}
              className="px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold"
            >
               Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="flex items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                    onClick={() => router.push(`/products/${item.slug}`)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      PKR {item.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          setItems(updateBagQty(item.slug, item.qty - 1))
                        }
                        className="w-7 h-7 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          setItems(updateBagQty(item.slug, item.qty + 1))
                        }
                        className="w-7 h-7 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                      PKR {item.price * item.qty}
                    </p>
                    <button
                      onClick={() => setItems(removeFromBag(item.slug))}
                      className="text-xs text-red-500 hover:underline mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Total
              </span>
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                PKR {total}
              </span>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="mt-6 w-full py-3 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}