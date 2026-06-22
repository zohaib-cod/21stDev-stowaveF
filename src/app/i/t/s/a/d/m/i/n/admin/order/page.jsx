// // ROUTE: /orders
// // This is the main Orders page — lists all orders with status filters,
// // expandable rows (items, images, customer info), status change dropdown,
// // download (single/bulk) and share link generation.

// "use client";

// import React, { useState, useEffect, useMemo, useRef } from "react";
// import {
//   ChevronDown,
//   Package,
//   MoreVertical,
//   Download,
//   Share2,
//   Check,
//   Copy,
//   X,
//   RefreshCcw,
//   MapPin,
//   Mail,
//   Phone,
//   CreditCard,
//   Calendar,
//   FileDown,
// } from "lucide-react";
// import { dummyOrders, STATUS_OPTIONS, STATUS_MAP, calcOrderTotal } from "../components/data/orders";
// import {
//   getOrderStatus,
//   setOrderStatus,
//   subscribeToStatusChanges,
// } from "../lib/Statusstore";
// import { downloadOrderPdf, downloadOrdersBulkPdf } from "../lib/Pdfgenerator";

// // ---------- Small presentational helpers ----------

// function StatusBadge({ status }) {
//   const info = STATUS_MAP[status] || { label: status, color: "#64748b" };
//   return (
//     <span
//       className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
//       style={{
//         backgroundColor: `${info.color}1A`, // ~10% opacity
//         color: info.color,
//       }}
//     >
//       <span
//         className="w-1.5 h-1.5 rounded-full"
//         style={{ backgroundColor: info.color }}
//       />
//       {info.label}
//     </span>
//   );
// }

// function StatusFilterChip({ active, color, label, count, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border transition-all duration-150 ${
//         active
//           ? "text-white shadow-sm"
//           : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
//       }`}
//       style={active ? { backgroundColor: color, borderColor: color } : undefined}
//     >
//       {!active && (
//         <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
//       )}
//       {label}
//       <span
//         className={`text-xs px-1.5 py-0.5 rounded-full ${
//           active ? "bg-white/25" : "bg-slate-100 text-slate-500"
//         }`}
//       >
//         {count}
//       </span>
//     </button>
//   );
// }

// // ---------- Status change dropdown ----------

// function StatusDropdown({ orderId, currentStatus, onChange, align = "left" }) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (ref.current && !ref.current.contains(e.target)) setOpen(false);
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={ref}>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           setOpen((v) => !v);
//         }}
//         className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-150"
//       >
//         <RefreshCcw className="h-3.5 w-3.5 text-slate-400" />
//         Change Status
//         <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
//       </button>

//       {open && (
//         <div
//           className={`absolute z-30 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 overflow-hidden ${
//             align === "right" ? "right-0" : "left-0"
//           }`}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {STATUS_OPTIONS.map((opt) => (
//             <button
//               key={opt.value}
//               onClick={() => {
//                 onChange(orderId, opt.value);
//                 setOpen(false);
//               }}
//               className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-slate-50 transition-colors duration-100"
//             >
//               <span className="flex items-center gap-2">
//                 <span
//                   className="w-2 h-2 rounded-full"
//                   style={{ backgroundColor: opt.color }}
//                 />
//                 <span className="text-slate-700">{opt.label}</span>
//               </span>
//               {currentStatus === opt.value && (
//                 <Check className="h-3.5 w-3.5 text-slate-900" />
//               )}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ---------- "..." more options menu (Download / Share) ----------

// function MoreOptionsMenu({ order, currentStatus }) {
//   const [open, setOpen] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (ref.current && !ref.current.contains(e.target)) setOpen(false);
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleShare = async () => {
//     const url = `${window.location.origin}/orders/${order.id}`;
//     try {
//       await navigator.clipboard.writeText(url);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       // clipboard might be blocked; fall back to prompt
//       window.prompt("Copy this share link:", url);
//     }
//   };

//   return (
//     <div className="relative" ref={ref}>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           setOpen((v) => !v);
//         }}
//         className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors duration-150"
//         title="More options"
//       >
//         <MoreVertical className="h-4 w-4 text-slate-500" />
//       </button>

//       {open && (
//         <div
//           className="absolute right-0 z-30 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <button
//             onClick={() => {
//               downloadOrderPdf(order, currentStatus);
//               setOpen(false);
//             }}
//             className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-100"
//           >
//             <Download className="h-4 w-4 text-slate-400" />
//             Download Order (PDF)
//           </button>
//           <button
//             onClick={handleShare}
//             className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-100"
//           >
//             {copied ? (
//               <Check className="h-4 w-4 text-emerald-500" />
//             ) : (
//               <Share2 className="h-4 w-4 text-slate-400" />
//             )}
//             {copied ? "Link copied!" : "Share This Order"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // ---------- Order row (collapsed header + expandable detail) ----------

// function OrderRow({ order, status, onStatusChange }) {
//   const [expanded, setExpanded] = useState(false);
//   const total = calcOrderTotal(order);
//   const placedDate = new Date(order.placedAt).toLocaleDateString("en-PK", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
//   const placedTime = new Date(order.placedAt).toLocaleTimeString("en-PK", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-shadow duration-200 hover:shadow-sm">
//       {/* Collapsed / clickable header row */}
//       <button
//         onClick={() => setExpanded((v) => !v)}
//         className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left"
//       >
//         <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0">
//           <Package className="h-4.5 w-4.5 text-slate-500" />
//         </div>

//         <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
//           <div className="min-w-0">
//             <p className="text-sm font-semibold text-slate-900 truncate">{order.id}</p>
//             <p className="text-xs text-slate-500 truncate">{order.customer.name}</p>
//           </div>
//           <div className="hidden sm:block text-sm text-slate-600">
//             {placedDate}
//             <span className="text-slate-400"> &middot; {placedTime}</span>
//           </div>
//           <div className="text-sm font-medium text-slate-900">
//             Rs {total.toLocaleString()}
//           </div>
//           <div className="flex justify-start sm:justify-end">
//             <StatusBadge status={status} />
//           </div>
//         </div>

//         <ChevronDown
//           className={`h-4.5 w-4.5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
//             expanded ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {/* Expanded detail */}
//       {expanded && (
//         <div
//           className="border-t border-slate-100 px-4 sm:px-5 py-5 bg-slate-50/60"
//           onClick={() => setExpanded(true)}
//         >
//           {/* Action bar */}
//           <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
//             <div className="flex items-center gap-2 flex-wrap">
//               <StatusDropdown
//                 orderId={order.id}
//                 currentStatus={status}
//                 onChange={onStatusChange}
//               />
//             </div>
//             <MoreOptionsMenu order={order} currentStatus={status} />
//           </div>

//           <div className="grid lg:grid-cols-3 gap-6">
//             {/* Items with images */}
//             <div className="lg:col-span-2 space-y-3">
//               <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
//                 Items ({order.items.length})
//               </h4>
//               {order.items.map((item) => (
//                 <div
//                   key={item.sku}
//                   className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-3"
//                 >
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 rounded-md object-cover flex-shrink-0 bg-slate-100"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-slate-900 truncate">
//                       {item.name}
//                     </p>
//                     <p className="text-xs text-slate-500">SKU: {item.sku}</p>
//                     <p className="text-xs text-slate-500">Qty: {item.qty}</p>
//                   </div>
//                   <div className="text-sm font-semibold text-slate-900 flex-shrink-0">
//                     Rs {(item.price * item.qty).toLocaleString()}
//                   </div>
//                 </div>
//               ))}

//               <div className="flex justify-end pt-2">
//                 <div className="text-sm">
//                   <span className="text-slate-500 mr-2">Order Total</span>
//                   <span className="font-bold text-slate-900 text-base">
//                     Rs {total.toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Customer & order meta */}
//             <div className="space-y-3">
//               <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
//                 <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
//                   Customer
//                 </h4>
//                 <div className="space-y-2 text-sm text-slate-700">
//                   <p className="font-medium text-slate-900">{order.customer.name}</p>
//                   <p className="flex items-center gap-2 text-slate-500">
//                     <Mail className="h-3.5 w-3.5" /> {order.customer.email}
//                   </p>
//                   <p className="flex items-center gap-2 text-slate-500">
//                     <Phone className="h-3.5 w-3.5" /> {order.customer.phone}
//                   </p>
//                   <p className="flex items-start gap-2 text-slate-500">
//                     <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
//                     <span>{order.address}</span>
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-2 text-sm">
//                 <p className="flex items-center gap-2 text-slate-500">
//                   <Calendar className="h-3.5 w-3.5" />
//                   {placedDate} at {placedTime}
//                 </p>
//                 <p className="flex items-center gap-2 text-slate-500">
//                   <CreditCard className="h-3.5 w-3.5" />
//                   {order.paymentMethod}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ---------- Main page ----------

// export default function OrdersPage() {
//   const [statuses, setStatuses] = useState({});
//   const [activeFilter, setActiveFilter] = useState("all");

//   // Initialize statuses (defaults + any saved overrides) and subscribe to live updates.
//   useEffect(() => {
//     const initial = {};
//     dummyOrders.forEach((o) => {
//       initial[o.id] = getOrderStatus(o.id, o.status);
//     });
//     setStatuses(initial);

//     const unsubscribe = subscribeToStatusChanges(() => {
//       const refreshed = {};
//       dummyOrders.forEach((o) => {
//         refreshed[o.id] = getOrderStatus(o.id, o.status);
//       });
//       setStatuses(refreshed);
//     });

//     return unsubscribe;
//   }, []);

//   const handleStatusChange = (orderId, newStatus) => {
//     setOrderStatus(orderId, newStatus);
//     setStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
//   };

//   const counts = useMemo(() => {
//     const c = { all: dummyOrders.length };
//     STATUS_OPTIONS.forEach((s) => (c[s.value] = 0));
//     dummyOrders.forEach((o) => {
//       const st = statuses[o.id] || o.status;
//       c[st] = (c[st] || 0) + 1;
//     });
//     return c;
//   }, [statuses]);

//   const filteredOrders = useMemo(() => {
//     if (activeFilter === "all") return dummyOrders;
//     return dummyOrders.filter((o) => (statuses[o.id] || o.status) === activeFilter);
//   }, [activeFilter, statuses]);

//   const handleDownloadAll = () => {
//     downloadOrdersBulkPdf(
//       filteredOrders,
//       (id) => statuses[id],
//       {
//         title: activeFilter === "all" ? "All Orders" : `${STATUS_MAP[activeFilter]?.label} Orders`,
//         filenameSuffix: activeFilter,
//       }
//     );
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
//         {/* Page header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
//             <p className="text-sm text-slate-500 mt-1">
//               {filteredOrders.length} of {dummyOrders.length} orders
//               {activeFilter !== "all" && (
//                 <>
//                   {" "}
//                   &middot;{" "}
//                   <span className="font-medium" style={{ color: STATUS_MAP[activeFilter]?.color }}>
//                     {STATUS_MAP[activeFilter]?.label}
//                   </span>
//                 </>
//               )}
//             </p>
//           </div>

//           <button
//             onClick={handleDownloadAll}
//             className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors duration-150 shadow-sm"
//           >
//             <FileDown className="h-4 w-4" />
//             {activeFilter === "all"
//               ? "Download All Orders"
//               : `Download ${STATUS_MAP[activeFilter]?.label} Orders`}
//           </button>
//         </div>

//         {/* Status filter chips */}
//         <div className="flex items-center gap-2 flex-wrap mb-6">
//           <StatusFilterChip
//             active={activeFilter === "all"}
//             color="#0f172a"
//             label="All Orders"
//             count={counts.all}
//             onClick={() => setActiveFilter("all")}
//           />
//           {STATUS_OPTIONS.map((s) => (
//             <StatusFilterChip
//               key={s.value}
//               active={activeFilter === s.value}
//               color={s.color}
//               label={s.label}
//               count={counts[s.value] || 0}
//               onClick={() => setActiveFilter(s.value)}
//             />
//           ))}
//         </div>

//         {/* Orders list */}
//         <div className="space-y-3">
//           {filteredOrders.length === 0 ? (
//             <div className="bg-white rounded-xl border border-dashed border-slate-300 py-16 text-center">
//               <Package className="h-8 w-8 text-slate-300 mx-auto mb-3" />
//               <p className="text-sm text-slate-500">No orders with this status yet.</p>
//             </div>
//           ) : (
//             filteredOrders.map((order) => (
//               <OrderRow
//                 key={order.id}
//                 order={order}
//                 status={statuses[order.id] || order.status}
//                 onStatusChange={handleStatusChange}
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


















// ROUTE: /i/t/s/a/d/m/i/n/admin/orders
// This is the main Orders page — lists all orders with status filters,
// expandable rows (items, images, customer info), per-order status change,
// per-order delete (move to trash), top-bar bulk actions (Share All,
// Move All to Trash, Change All Status), and download (single/bulk PDF).

"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ChevronDown,
  Package,
  MoreVertical,
  Download,
  Share2,
  Check,
  X,
  RefreshCcw,
  MapPin,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  FileDown,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";
import { dummyOrders, STATUS_OPTIONS, STATUS_MAP, calcOrderTotal } from "../components/data/orders";
import {
  getOrderStatus,
  setOrderStatus,
  setBulkStatus,
  subscribeToStatusChanges,
} from "../lib/Statusstore";
import {
  getTrashMap,
  moveToTrash,
  moveManyToTrash,
  subscribeToTrashChanges,
} from "../lib/trashStore";
import { downloadOrderPdf, downloadOrdersBulkPdf } from "../lib/Pdfgenerator";
import NameConfirmModal from "../components/Nameconfirmmodal/Nameconfirmmodal";

const ADMIN_BASE = "/i/t/s/a/d/m/i/n/admin";

// ---------- Small presentational helpers ----------

function StatusBadge({ status }) {
  const info = STATUS_MAP[status] || { label: status, color: "#64748b" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: `${info.color}1A`, color: info.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: info.color }} />
      {info.label}
    </span>
  );
}

function StatusFilterChip({ active, color, label, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border transition-all duration-150 ${
        active
          ? "text-white shadow-sm"
          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
      }`}
      style={active ? { backgroundColor: color, borderColor: color } : undefined}
    >
      {!active && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />}
      {label}
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full ${
          active ? "bg-white/25" : "bg-slate-100 text-slate-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

// ---------- Per-order status change dropdown ----------

function StatusDropdown({ orderId, currentStatus, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-150"
      >
        <RefreshCcw className="h-3.5 w-3.5 text-slate-400" />
        Change Status
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute z-30 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 overflow-hidden left-0"
          onClick={(e) => e.stopPropagation()}
        >
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(orderId, opt.value);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-slate-50 transition-colors duration-100"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.color }} />
                <span className="text-slate-700">{opt.label}</span>
              </span>
              {currentStatus === opt.value && <Check className="h-3.5 w-3.5 text-slate-900" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Per-order "..." more options menu ----------

function MoreOptionsMenu({ order, currentStatus, onRequestTrash }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShare = async () => {
    const url = `${window.location.origin}${ADMIN_BASE}/orders/${order.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this share link:", url);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors duration-150"
        title="More options"
      >
        <MoreVertical className="h-4 w-4 text-slate-500" />
      </button>

      {open && (
        <div
          className="absolute right-0 z-30 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              downloadOrderPdf(order, currentStatus);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-100"
          >
            <Download className="h-4 w-4 text-slate-400" />
            Download Order (PDF)
          </button>
          <button
            onClick={handleShare}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-100"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4 text-slate-400" />}
            {copied ? "Link copied!" : "Share This Order"}
          </button>
          <div className="my-1 border-t border-slate-100" />
          <button
            onClick={() => {
              setOpen(false);
              onRequestTrash(order);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-100"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
            Move to Trash
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- Top bar "..." bulk options menu ----------

function BulkOptionsMenu({ onShareAll, onTrashAll, onChangeAllStatus }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-150"
        title="More bulk actions"
      >
        <MoreVertical className="h-4 w-4 text-slate-500" />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 overflow-hidden">
          <button
            onClick={() => {
              setOpen(false);
              onShareAll();
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-100"
          >
            <Share2 className="h-4 w-4 text-slate-400" />
            Share All Orders
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onChangeAllStatus();
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-100"
          >
            <RefreshCcw className="h-4 w-4 text-slate-400" />
            Change All Status
          </button>
          <div className="my-1 border-t border-slate-100" />
          <button
            onClick={() => {
              setOpen(false);
              onTrashAll();
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-100"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
            Move All to Trash
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- "Change All Status" picker (small popover, separate from name-confirm) ----------

function ChangeAllStatusPopover({ open, onClose, onPick }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-sm p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-1">Change all order statuses</h3>
        <p className="text-sm text-slate-500 mb-4">
          Pick a status to apply to every order that isn't <span className="font-medium">Pending</span>.
          Pending orders stay untouched until set individually.
        </p>
        <div className="space-y-1.5">
          {STATUS_OPTIONS.filter((s) => s.value !== "pending").map((opt) => (
            <button
              key={opt.value}
              onClick={() => onPick(opt.value)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 transition-colors duration-100"
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: opt.color }} />
              {opt.label}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors duration-150"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ---------- Order row (collapsed header + expandable detail) ----------

function OrderRow({ order, status, onStatusChange, onRequestTrash }) {
  const [expanded, setExpanded] = useState(false);
  const total = calcOrderTotal(order);
  const placedDate = new Date(order.placedAt).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const placedTime = new Date(order.placedAt).toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-shadow duration-200 hover:shadow-sm">
      {/* Collapsed / clickable header row */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0">
          <Package className="h-4.5 w-4.5 text-slate-500" />
        </div>

        <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{order.id}</p>
            <p className="text-xs text-slate-500 truncate">{order.customer.name}</p>
          </div>
          <div className="hidden sm:block text-sm text-slate-600">
            {placedDate}
            <span className="text-slate-400"> &middot; {placedTime}</span>
          </div>
          <div className="text-sm font-medium text-slate-900">Rs {total.toLocaleString()}</div>
          <div className="flex justify-start sm:justify-end">
            <StatusBadge status={status} />
          </div>
        </div>

        <ChevronDown
          className={`h-4.5 w-4.5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div
          className="border-t border-slate-100 px-4 sm:px-5 py-5 bg-slate-50/60"
          onClick={() => setExpanded(true)}
        >
          {/* Action bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2 flex-wrap">
              <StatusDropdown orderId={order.id} currentStatus={status} onChange={onStatusChange} />
            </div>
            <MoreOptionsMenu order={order} currentStatus={status} onRequestTrash={onRequestTrash} />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Items with images */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Items ({order.items.length})
              </h4>
              {order.items.map((item) => (
                <div key={item.sku} className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-3">
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

              <div className="flex justify-end pt-2">
                <div className="text-sm">
                  <span className="text-slate-500 mr-2">Order Total</span>
                  <span className="font-bold text-slate-900 text-base">Rs {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer & order meta */}
            <div className="space-y-3">
              <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Customer</h4>
                <div className="space-y-2 text-sm text-slate-700">
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
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-2 text-sm">
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
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Toast (lightweight feedback after bulk actions) ----------

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2">
      <Check className="h-4 w-4 text-emerald-400" />
      {message}
    </div>
  );
}

// ---------- Main page ----------

export default function OrdersPage() {
  const [statuses, setStatuses] = useState({});
  const [trashMap, setTrashMap] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState("");

  // Modal/popover state
  const [trashTarget, setTrashTarget] = useState(null); // single order being trashed, or "ALL"
  const [showChangeAllPopover, setShowChangeAllPopover] = useState(false);
  const [pendingBulkStatus, setPendingBulkStatus] = useState(null); // status chosen, awaiting name confirm

  // Initialize statuses + trash state, subscribe to live updates.
  useEffect(() => {
    const refreshStatuses = () => {
      const next = {};
      dummyOrders.forEach((o) => {
        next[o.id] = getOrderStatus(o.id, o.status);
      });
      setStatuses(next);
    };
    const refreshTrash = () => setTrashMap(getTrashMap());

    refreshStatuses();
    refreshTrash();

    const unsubStatus = subscribeToStatusChanges(refreshStatuses);
    const unsubTrash = subscribeToTrashChanges(refreshTrash);

    return () => {
      unsubStatus();
      unsubTrash();
    };
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrderStatus(orderId, newStatus);
    setStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  // Orders that are NOT in trash — this is what the page displays.
  const activeOrders = useMemo(
    () => dummyOrders.filter((o) => !trashMap[o.id]),
    [trashMap]
  );

  const counts = useMemo(() => {
    const c = { all: activeOrders.length };
    STATUS_OPTIONS.forEach((s) => (c[s.value] = 0));
    activeOrders.forEach((o) => {
      const st = statuses[o.id] || o.status;
      c[st] = (c[st] || 0) + 1;
    });
    return c;
  }, [statuses, activeOrders]);

  const filteredOrders = useMemo(() => {
    if (activeFilter === "all") return activeOrders;
    return activeOrders.filter((o) => (statuses[o.id] || o.status) === activeFilter);
  }, [activeFilter, statuses, activeOrders]);

  const handleDownloadAll = () => {
    downloadOrdersBulkPdf(filteredOrders, (id) => statuses[id], {
      title: activeFilter === "all" ? "All Orders" : `${STATUS_MAP[activeFilter]?.label} Orders`,
      filenameSuffix: activeFilter,
    });
  };

  // ---- Share All ----
  const handleShareAll = async () => {
    const links = activeOrders
      .map((o) => `${o.id}: ${window.location.origin}${ADMIN_BASE}/orders/${o.id}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(links);
      setToast(`Copied share links for ${activeOrders.length} orders`);
    } catch {
      window.prompt("Copy these share links:", links);
    }
  };

  // ---- Single order trash flow ----
  const requestTrashOrder = (order) => setTrashTarget(order);

  const confirmTrash = (confirmedName) => {
    if (trashTarget === "ALL") {
      moveManyToTrash(activeOrders.map((o) => o.id));
      setToast(`${activeOrders.length} orders moved to trash by ${confirmedName}`);
    } else if (trashTarget) {
      moveToTrash(trashTarget.id);
      setToast(`${trashTarget.id} moved to trash by ${confirmedName}`);
    }
    setTrashTarget(null);
  };

  // ---- Change All Status flow ----
  const handlePickBulkStatus = (statusValue) => {
    setShowChangeAllPopover(false);
    setPendingBulkStatus(statusValue);
  };

  const confirmBulkStatus = (confirmedName) => {
    setBulkStatus(activeOrders, pendingBulkStatus, (id) => statuses[id]);
    const label = STATUS_MAP[pendingBulkStatus]?.label;
    setToast(`All eligible orders set to ${label} by ${confirmedName}`);
    setPendingBulkStatus(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
            <p className="text-sm text-slate-500 mt-1">
              {filteredOrders.length} of {activeOrders.length} orders
              {activeFilter !== "all" && (
                <>
                  {" "}
                  &middot;{" "}
                  <span className="font-medium" style={{ color: STATUS_MAP[activeFilter]?.color }}>
                    {STATUS_MAP[activeFilter]?.label}
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAll}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors duration-150 shadow-sm"
            >
              <FileDown className="h-4 w-4" />
              {activeFilter === "all" ? "Download All Orders" : `Download ${STATUS_MAP[activeFilter]?.label} Orders`}
            </button>
            <BulkOptionsMenu
              onShareAll={handleShareAll}
              onTrashAll={() => setTrashTarget("ALL")}
              onChangeAllStatus={() => setShowChangeAllPopover(true)}
            />
          </div>
        </div>

        {/* Status filter chips */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <StatusFilterChip
            active={activeFilter === "all"}
            color="#0f172a"
            label="All Orders"
            count={counts.all}
            onClick={() => setActiveFilter("all")}
          />
          {STATUS_OPTIONS.map((s) => (
            <StatusFilterChip
              key={s.value}
              active={activeFilter === s.value}
              color={s.color}
              label={s.label}
              count={counts[s.value] || 0}
              onClick={() => setActiveFilter(s.value)}
            />
          ))}
        </div>

        {/* Orders list */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 py-16 text-center">
              <Package className="h-8 w-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No orders with this status yet.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                status={statuses[order.id] || order.status}
                onStatusChange={handleStatusChange}
                onRequestTrash={requestTrashOrder}
              />
            ))
          )}
        </div>
      </div>

      {/* Change All Status — status picker popover */}
      <ChangeAllStatusPopover
        open={showChangeAllPopover}
        onClose={() => setShowChangeAllPopover(false)}
        onPick={handlePickBulkStatus}
      />

      {/* Name-confirm modal for bulk status change */}
      <NameConfirmModal
        open={Boolean(pendingBulkStatus)}
        title="Change all order statuses"
        message={`This will set every non-pending order to "${STATUS_MAP[pendingBulkStatus]?.label || ""}". This action affects multiple orders at once.`}
        confirmLabel="Change All"
        actionWord="change all order statuses"
        danger={false}
        onConfirm={confirmBulkStatus}
        onCancel={() => setPendingBulkStatus(null)}
      />

      {/* Name-confirm modal for trash (single or all) */}
      <NameConfirmModal
        open={Boolean(trashTarget)}
        title={trashTarget === "ALL" ? "Move all orders to trash" : `Move ${trashTarget?.id} to trash`}
        message={
          trashTarget === "ALL"
            ? `This will move all ${activeOrders.length} orders to the Trash. You can permanently delete them later from the Trash page.`
            : "This order will be moved to the Trash. You can permanently delete it later from the Trash page."
        }
        confirmLabel="Move to Trash"
        actionWord="move this to trash"
        danger
        onConfirm={confirmTrash}
        onCancel={() => setTrashTarget(null)}
      />

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}