// // ROUTE: /orders/[id]  (e.g. /orders/STW-10231)
// // Dynamic single-order page — shown when someone opens a "Share This Order"
// // link generated from the main /orders page. Read-only view of one order.

// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {
//   Package,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   CreditCard,
//   Download,
//   ArrowLeft,
// } from "lucide-react";
// import Link from "next/link";
// import { dummyOrders, calcOrderTotal, STATUS_MAP } from "@/data/orders";
// import { getOrderStatus, subscribeToStatusChanges } from "@/lib/statusStore";
// import { downloadOrderPdf } from "@/lib/pdfGenerator";

// function StatusBadge({ status }) {
//   const info = STATUS_MAP[status] || { label: status, color: "#64748b" };
//   return (
//     <span
//       className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
//       style={{ backgroundColor: `${info.color}1A`, color: info.color }}
//     >
//       <span className="w-2 h-2 rounded-full" style={{ backgroundColor: info.color }} />
//       {info.label}
//     </span>
//   );
// }

// export default function SharedOrderPage() {
//   const params = useParams();
//   const orderId = params?.id;
//   const [order, setOrder] = useState(null);
//   const [status, setStatus] = useState(null);

//   useEffect(() => {
//     const found = dummyOrders.find((o) => o.id === orderId);
//     setOrder(found || null);
//     if (found) setStatus(getOrderStatus(found.id, found.status));

//     const unsubscribe = subscribeToStatusChanges(() => {
//       if (found) setStatus(getOrderStatus(found.id, found.status));
//     });
//     return unsubscribe;
//   }, [orderId]);

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
//         <div className="text-center">
//           <Package className="h-10 w-10 text-slate-300 mx-auto mb-3" />
//           <h1 className="text-lg font-semibold text-slate-800">Order not found</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             This order link is invalid or has expired.
//           </p>
//           <Link
//             href="/orders"
//             className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-slate-700 hover:text-slate-900"
//           >
//             <ArrowLeft className="h-4 w-4" /> Back to Orders
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const total = calcOrderTotal(order);
//   const placedDate = new Date(order.placedAt).toLocaleDateString("en-PK", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
//   const placedTime = new Date(order.placedAt).toLocaleTimeString("en-PK", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
//         {/* Brand header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-2.5">
//             <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
//               <span className="text-white font-bold text-base">S</span>
//             </div>
//             <div className="flex flex-col">
//               <span className="font-semibold text-slate-800 text-base leading-tight">Stowave</span>
//               <span className="text-xs text-slate-500 leading-tight">stowave.com</span>
//             </div>
//           </div>
//           <button
//             onClick={() => downloadOrderPdf(order, status)}
//             className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors duration-150"
//           >
//             <Download className="h-4 w-4" />
//             Download PDF
//           </button>
//         </div>

//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//           {/* Order summary header */}
//           <div className="px-6 py-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">
//                 Order
//               </p>
//               <h1 className="text-xl font-bold text-slate-900">{order.id}</h1>
//             </div>
//             <StatusBadge status={status} />
//           </div>

//           {/* Meta grid */}
//           <div className="grid sm:grid-cols-2 gap-4 px-6 py-5 border-b border-slate-100">
//             <div className="space-y-2 text-sm">
//               <p className="font-medium text-slate-900">{order.customer.name}</p>
//               <p className="flex items-center gap-2 text-slate-500">
//                 <Mail className="h-3.5 w-3.5" /> {order.customer.email}
//               </p>
//               <p className="flex items-center gap-2 text-slate-500">
//                 <Phone className="h-3.5 w-3.5" /> {order.customer.phone}
//               </p>
//               <p className="flex items-start gap-2 text-slate-500">
//                 <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
//                 <span>{order.address}</span>
//               </p>
//             </div>
//             <div className="space-y-2 text-sm">
//               <p className="flex items-center gap-2 text-slate-500">
//                 <Calendar className="h-3.5 w-3.5" />
//                 {placedDate} at {placedTime}
//               </p>
//               <p className="flex items-center gap-2 text-slate-500">
//                 <CreditCard className="h-3.5 w-3.5" />
//                 {order.paymentMethod}
//               </p>
//             </div>
//           </div>

//           {/* Items */}
//           <div className="px-6 py-5 space-y-3">
//             <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
//               Items ({order.items.length})
//             </h4>
//             {order.items.map((item) => (
//               <div
//                 key={item.sku}
//                 className="flex items-center gap-3 rounded-lg border border-slate-200 p-3"
//               >
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-16 h-16 rounded-md object-cover flex-shrink-0 bg-slate-100"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
//                   <p className="text-xs text-slate-500">SKU: {item.sku}</p>
//                   <p className="text-xs text-slate-500">Qty: {item.qty}</p>
//                 </div>
//                 <div className="text-sm font-semibold text-slate-900 flex-shrink-0">
//                   Rs {(item.price * item.qty).toLocaleString()}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Total */}
//           <div className="px-6 py-5 bg-slate-50 flex justify-end">
//             <div className="text-sm">
//               <span className="text-slate-500 mr-2">Order Total</span>
//               <span className="font-bold text-slate-900 text-lg">
//                 Rs {total.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </div>

//         <p className="text-center text-xs text-slate-400 mt-6">
//           Shared from Stowave &middot; stowave.com
//         </p>
//       </div>
//     </div>
//   );
// }




















// ROUTE: /i/t/s/a/d/m/i/n/admin/orders/[id]  (e.g. /i/t/s/a/d/m/i/n/admin/orders/STW-10231)
// Dynamic single-order page — shown when someone opens a "Share This Order"
// link generated from the main orders page. Read-only view of one order.

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Package,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Download,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { dummyOrders, calcOrderTotal, STATUS_MAP } from "../../components/data/orders";
import { getOrderStatus, subscribeToStatusChanges } from "../../lib/Statusstore";
import { downloadOrderPdf } from "../../lib/Pdfgenerator";

const ADMIN_BASE = "/i/t/s/a/d/m/i/n/admin";

function StatusBadge({ status }) {
  const info = STATUS_MAP[status] || { label: status, color: "#64748b" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
      style={{ backgroundColor: `${info.color}1A`, color: info.color }}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: info.color }} />
      {info.label}
    </span>
  );
}

export default function SharedOrderPage() {
  const params = useParams();
  const orderId = params?.id;
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const found = dummyOrders.find((o) => o.id === orderId);
    setOrder(found || null);
    if (found) setStatus(getOrderStatus(found.id, found.status));

    const unsubscribe = subscribeToStatusChanges(() => {
      if (found) setStatus(getOrderStatus(found.id, found.status));
    });
    return unsubscribe;
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Package className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h1 className="text-lg font-semibold text-slate-800">Order not found</h1>
          <p className="text-sm text-slate-500 mt-1">
            This order link is invalid or has expired.
          </p>
          <Link
            href={`${ADMIN_BASE}/orders`}
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const total = calcOrderTotal(order);
  const placedDate = new Date(order.placedAt).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const placedTime = new Date(order.placedAt).toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Brand header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800 text-base leading-tight">Stowave</span>
              <span className="text-xs text-slate-500 leading-tight">stowave.com</span>
            </div>
          </div>
          <button
            onClick={() => downloadOrderPdf(order, status)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors duration-150"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Order summary header */}
          <div className="px-6 py-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">
                Order
              </p>
              <h1 className="text-xl font-bold text-slate-900">{order.id}</h1>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Meta grid */}
          <div className="grid sm:grid-cols-2 gap-4 px-6 py-5 border-b border-slate-100">
            <div className="space-y-2 text-sm">
              <p className="font-medium text-slate-900">{order.customer.name}</p>
              <p className="flex items-center gap-2 text-slate-500">
                <Mail className="h-3.5 w-3.5" /> {order.customer.email}
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <Phone className="h-3.5 w-3.5" /> {order.customer.phone}
              </p>
              <p className="flex items-start gap-2 text-slate-500">
                <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <span>{order.address}</span>
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                {placedDate} at {placedTime}
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <CreditCard className="h-3.5 w-3.5" />
                {order.paymentMethod}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="px-6 py-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
              Items ({order.items.length})
            </h4>
            {order.items.map((item) => (
              <div
                key={item.sku}
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0 bg-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                  <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                  <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                </div>
                <div className="text-sm font-semibold text-slate-900 flex-shrink-0">
                  Rs {(item.price * item.qty).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="px-6 py-5 bg-slate-50 flex justify-end">
            <div className="text-sm">
              <span className="text-slate-500 mr-2">Order Total</span>
              <span className="font-bold text-slate-900 text-lg">
                Rs {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Shared from Stowave &middot; stowave.com
        </p>
      </div>
    </div>
  );
}