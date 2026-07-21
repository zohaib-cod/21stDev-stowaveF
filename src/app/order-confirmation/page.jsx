"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { getLastOrder } from "../lib/orders";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [order, setOrder] = React.useState(null);
  const receiptRef = React.useRef(null);

  React.useEffect(() => {
    const last = getLastOrder();
    if (!last) {
      router.replace("/oversized");
      return;
    }
    setOrder(last);
  }, [router]);

  const handleDownloadPdf = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(receiptRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`order-${order.id}.pdf`);
  };

  if (!order) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Order Placed Successfully
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Order ID: {order.id}
          </p>
        </div>

        {/* Receipt (this gets captured into the PDF) */}
        <div
          ref={receiptRef}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-center flex flex-col justify-between pb-4 mb-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg  font-bold text-zinc-900 dark:text-zinc-50">
              Stowave Order Receipt
            </h2> <br />
            <h5 className="dark:text-zinc-300">Thanku for your order</h5>
            <span className="text-sm text-zinc-500">
              {new Date(order.date).toLocaleDateString()}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Shipping To
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {order.customer.fullName}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {order.customer.address}, {order.customer.city}{" "}
              {order.customer.postalCode}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {order.customer.phone}
            </p>
          </div>

          <div className="mb-4">
            {order.items.map((item) => (
              <div
                key={item.slug}
                className="flex justify-between text-sm py-1.5"
              >
                <span className="text-zinc-700 dark:text-zinc-300">
                  {item.name} × {item.qty}
                </span>
                <span className="text-zinc-900 dark:text-zinc-50 font-medium">
                  PKR {item.price * item.qty}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800 font-bold text-zinc-900 dark:text-zinc-50">
            <span>Total</span>
            <span>PKR {order.total}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleDownloadPdf}
            className="flex-1 py-3 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold"
          >
            Download PDF Receipt
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}