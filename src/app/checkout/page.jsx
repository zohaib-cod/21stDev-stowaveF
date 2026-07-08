// Route: /checkout
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { getBag, getBuyNowItem, clearBag, clearBuyNowItem, getBagTotal } from "../lib/cart";
import { getSavedInfo, saveInfo, saveOrder, generateOrderId } from "../lib/orders";

const emptyForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = React.useState([]);
  const [form, setForm] = React.useState(emptyForm);
  const [saveForNextTime, setSaveForNextTime] = React.useState(false);
  const [source, setSource] = React.useState("bag"); // "bag" | "buy-now"

  React.useEffect(() => {
    const buyNow = getBuyNowItem();
    if (buyNow) {
      setItems([buyNow]);
      setSource("buy-now");
    } else {
      setItems(getBag());
      setSource("bag");
    }

    const saved = getSavedInfo();
    if (saved) {
      setForm(saved.form || emptyForm);
      setSaveForNextTime(true);
    }
  }, []);

  const total = getBagTotal(items);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUseSavedInfo = () => {
    const saved = getSavedInfo();
    if (saved) setForm(saved.form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.address || !form.city) {
      alert("Please fill in all required fields.");
      return;
    }

    if (saveForNextTime) {
      saveInfo({ form });
    }

    const order = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      customer: form,
      items,
      total,
    };
    saveOrder(order);

    if (source === "bag") clearBag();
    clearBuyNowItem();

    router.push("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Checkout
        </h1>

        {/* Sign in prompt */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6 flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Agar aap apna order track karna chahte hain, please sign in karein.
          </p>
          <button
            onClick={() => router.push("/sign-in")}
            className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 underline shrink-0"
          >
            Sign In
          </button>
        </div>

        {getSavedInfo() && (
          <button
            onClick={handleUseSavedInfo}
            className="mb-6 text-sm text-zinc-600 dark:text-zinc-400 underline"
          >
            Pichli dafa ki information fill karein
          </button>
        )}

        {/* Order summary */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6">
          {items.map((item) => (
            <div key={item.slug} className="flex justify-between text-sm py-1">
              <span className="text-zinc-700 dark:text-zinc-300">
                {item.name} × {item.qty}
              </span>
              <span className="text-zinc-900 dark:text-zinc-50 font-medium">
                PKR {item.price * item.qty}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-2 mt-2 border-t border-zinc-200 dark:border-zinc-800 font-semibold">
            <span>Total</span>
            <span>PKR {total}</span>
          </div>
        </div>

        {/* Shipping form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Full Name *
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Phone Number *
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Address *
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                City *
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Postal Code
              </label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Order Notes (optional)
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={saveForNextTime}
              onChange={(e) => setSaveForNextTime(e.target.checked)}
              className="w-4 h-4"
            />
            Save information for next time
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold"
          >
            Complete Order
          </button>
        </form>
      </div>
    </div>
  );
}