"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ChevronDown,
  Package,
  MoreVertical,
  Download,
  Share2,
  Check,
  RefreshCcw,
  MapPin,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  FileDown,
  Trash2,
} from "lucide-react";
import { downloadOrderPdf, downloadOrdersBulkPdf } from "../lib/Pdfgenerator";
import NameConfirmModal from "../components/Nameconfirmmodal/Nameconfirmmodal";

const ADMIN_BASE = "/i/t/s/a/d/m/i/n/admin";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "#64748b" },
  { value: "processing", label: "Processing", color: "#2563eb" },
  { value: "under_review", label: "Under Review", color: "#d97706" },
  { value: "received", label: "Received", color: "#16a34a" },
  { value: "return", label: "Return", color: "#dc2626" },
];
const STATUS_MAP = STATUS_OPTIONS.reduce((acc, s) => {
  acc[s.value] = s;
  return acc;
}, {});

function calcOrderTotal(order) {
  return order.total ?? order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

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
    const url = `${window.location.origin}${ADMIN_BASE}/orders/${order.orderId}`;
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

// ---------- "Change All Status" picker ----------

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
  const placedDate = new Date(order.placedAt || order.createdAt).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const placedTime = new Date(order.placedAt || order.createdAt).toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-shadow duration-200 hover:shadow-sm">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0">
          <Package className="h-4.5 w-4.5 text-slate-500" />
        </div>

        <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{order.orderId}</p>
            <p className="text-xs text-slate-500 truncate">{order.customer?.name}</p>
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

      {expanded && (
        <div
          className="border-t border-slate-100 px-4 sm:px-5 py-5 bg-slate-50/60"
          onClick={() => setExpanded(true)}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2 flex-wrap">
              <StatusDropdown orderId={order.orderId} currentStatus={status} onChange={onStatusChange} />
            </div>
            <MoreOptionsMenu order={order} currentStatus={status} onRequestTrash={onRequestTrash} />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Items ({order.items.length})
              </h4>
              {order.items.map((item, idx) => (
                <div key={item.slug || idx} className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover flex-shrink-0 bg-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                    {item.size && <p className="text-xs text-slate-500">Size: {item.size}</p>}
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

            <div className="space-y-3">
              <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Customer</h4>
                <div className="space-y-2 text-sm text-slate-700">
                  <p className="font-medium text-slate-900">{order.customer?.name}</p>
                  {order.customer?.email && (
                    <p className="flex items-center gap-2 text-slate-500">
                      <Mail className="h-3.5 w-3.5" /> {order.customer.email}
                    </p>
                  )}
                  <p className="flex items-center gap-2 text-slate-500">
                    <Phone className="h-3.5 w-3.5" /> {order.customer?.phone}
                  </p>
                  <p className="flex items-start gap-2 text-slate-500">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                    <span>
                      {order.address}
                      {order.city ? `, ${order.city}` : ""}
                    </span>
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

// ---------- Toast ----------

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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState("");

  const [trashTarget, setTrashTarget] = useState(null); 
  const [showChangeAllPopover, setShowChangeAllPopover] = useState(false);
  const [pendingBulkStatus, setPendingBulkStatus] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        setLoadError(data.error || "Orders load nahi ho sake.");
      }
    } catch (err) {
      console.error("fetchOrders error:", err);
      setLoadError("Server se connect nahi ho saka. Kya backend chal raha hai?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🟢 Single status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.map((o) => (o.orderId === orderId ? data.order : o)));
      }
    } catch (err) {
      console.error("handleStatusChange error:", err);
    }
  };

  const counts = useMemo(() => {
    const c = { all: orders.length };
    STATUS_OPTIONS.forEach((s) => (c[s.value] = 0));
    orders.forEach((o) => {
      c[o.status] = (c[o.status] || 0) + 1;
    });
    return c;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (activeFilter === "all") return orders;
    return orders.filter((o) => o.status === activeFilter);
  }, [activeFilter, orders]);

  const handleDownloadAll = () => {
    downloadOrdersBulkPdf(filteredOrders, (id) => orders.find((o) => o.orderId === id)?.status, {
      title: activeFilter === "all" ? "All Orders" : `${STATUS_MAP[activeFilter]?.label} Orders`,
      filenameSuffix: activeFilter,
    });
  };

  const handleShareAll = async () => {
    const links = orders
      .map((o) => `${o.orderId}: ${window.location.origin}${ADMIN_BASE}/orders/${o.orderId}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(links);
      setToast(`Copied share links for ${orders.length} orders`);
    } catch {
      window.prompt("Copy these share links:", links);
    }
  };

  // ---- Trash (single/all) ----
  const requestTrashOrder = (order) => setTrashTarget(order);

  const confirmTrash = async (confirmedName) => {
    try {
      if (trashTarget === "ALL") {
        const orderIds = orders.map((o) => o.orderId);
        const res = await fetch(`${API_BASE_URL}/api/orders/bulk/trash`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderIds }),
        });
        const data = await res.json();
        if (data.success) {
          setToast(`${orderIds.length} orders moved to trash by ${confirmedName}`);
          fetchOrders();
        }
      } else if (trashTarget) {
        const res = await fetch(`${API_BASE_URL}/api/orders/${trashTarget.orderId}/trash`, {
          method: "PATCH",
        });
        const data = await res.json();
        if (data.success) {
          setToast(`${trashTarget.orderId} moved to trash by ${confirmedName}`);
          setOrders((prev) => prev.filter((o) => o.orderId !== trashTarget.orderId));
        }
      }
    } catch (err) {
      console.error("confirmTrash error:", err);
    } finally {
      setTrashTarget(null);
    }
  };

  // ---- Bulk status change ----
  const handlePickBulkStatus = (statusValue) => {
    setShowChangeAllPopover(false);
    setPendingBulkStatus(statusValue);
  };

  const confirmBulkStatus = async (confirmedName) => {
    try {
      const orderIds = orders.map((o) => o.orderId);
      const res = await fetch(`${API_BASE_URL}/api/orders/bulk/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderIds, status: pendingBulkStatus }),
      });
      const data = await res.json();
      if (data.success) {
        const label = STATUS_MAP[pendingBulkStatus]?.label;
        setToast(`All eligible orders set to ${label} by ${confirmedName}`);
        fetchOrders();
      }
    } catch (err) {
      console.error("confirmBulkStatus error:", err);
    } finally {
      setPendingBulkStatus(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
            <p className="text-sm text-slate-500 mt-1">
              {filteredOrders.length} of {orders.length} orders
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

        {loadError && (
          <div className="mb-4 p-3 rounded-lg text-sm font-medium border border-red-200 bg-red-50 text-red-600">
            {loadError}
          </div>
        )}

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

        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 py-16 text-center">
              <Package className="h-8 w-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No orders with this status yet.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderRow
                key={order.orderId}
                order={order}
                status={order.status}
                onStatusChange={handleStatusChange}
                onRequestTrash={requestTrashOrder}
              />
            ))
          )}
        </div>
      </div>

      <ChangeAllStatusPopover
        open={showChangeAllPopover}
        onClose={() => setShowChangeAllPopover(false)}
        onPick={handlePickBulkStatus}
      />

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

      <NameConfirmModal
        open={Boolean(trashTarget)}
        title={trashTarget === "ALL" ? "Move all orders to trash" : `Move ${trashTarget?.orderId} to trash`}
        message={
          trashTarget === "ALL"
            ? `This will move all ${orders.length} orders to the Trash. You can permanently delete them later from the Trash page.`
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

























// "use client";

// import React, { useState, useEffect, useMemo, useRef } from "react";
// import {
//   ChevronDown,
//   Package,
//   MoreVertical,
//   Download,
//   Share2,
//   Check,
//   RefreshCcw,
//   MapPin,
//   Mail,
//   Phone,
//   CreditCard,
//   Calendar,
//   FileDown,
//   Trash2,
//   Shirt,
// } from "lucide-react";
// import { downloadOrderPdf, downloadOrdersBulkPdf } from "../lib/Pdfgenerator";
// import NameConfirmModal from "../components/Nameconfirmmodal/Nameconfirmmodal";

// const ADMIN_BASE = "/i/t/s/a/d/m/i/n/admin";
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// const STATUS_OPTIONS = [
//   { value: "pending", label: "Pending", color: "#64748b" },
//   { value: "processing", label: "Processing", color: "#2563eb" },
//   { value: "under_review", label: "Under Review", color: "#d97706" },
//   { value: "received", label: "Received", color: "#16a34a" },
//   { value: "return", label: "Return", color: "#dc2626" },
// ];
// const STATUS_MAP = STATUS_OPTIONS.reduce((acc, s) => {
//   acc[s.value] = s;
//   return acc;
// }, {});

// function calcOrderTotal(order) {
//   return order.total ?? order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
// }

// // 🟢 Helper to check if an order contains items matching category
// function orderHasCategory(order, catType) {
//   if (!order.items || order.items.length === 0) return false;
//   return order.items.some((item) => {
//     const text = `${item.category || ""} ${item.slug || ""} ${item.name || ""}`.toLowerCase();
//     if (catType === "regular") return text.includes("regular");
//     if (catType === "oversized") return text.includes("oversized");
//     return false;
//   });
// }

// // ---------- Small presentational helpers ----------

// function StatusBadge({ status }) {
//   const info = STATUS_MAP[status] || { label: status, color: "#64748b" };
//   return (
//     <span
//       className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
//       style={{ backgroundColor: `${info.color}1A`, color: info.color }}
//     >
//       <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: info.color }} />
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
//       {!active && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />}
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

// // ---------- Per-order status change dropdown ----------

// function StatusDropdown({ orderId, currentStatus, onChange }) {
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
//           className="absolute z-30 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 overflow-hidden left-0"
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
//                 <span className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.color }} />
//                 <span className="text-slate-700">{opt.label}</span>
//               </span>
//               {currentStatus === opt.value && <Check className="h-3.5 w-3.5 text-slate-900" />}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ---------- Per-order "..." more options menu ----------

// function MoreOptionsMenu({ order, currentStatus, onRequestTrash }) {
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
//     const url = `${window.location.origin}${ADMIN_BASE}/orders/${order.orderId}`;
//     try {
//       await navigator.clipboard.writeText(url);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
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
//             {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4 text-slate-400" />}
//             {copied ? "Link copied!" : "Share This Order"}
//           </button>
//           <div className="my-1 border-t border-slate-100" />
//           <button
//             onClick={() => {
//               setOpen(false);
//               onRequestTrash(order);
//             }}
//             className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-100"
//           >
//             <Trash2 className="h-4 w-4 text-red-500" />
//             Move to Trash
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // ---------- Top bar "..." bulk options menu ----------

// function BulkOptionsMenu({ onShareAll, onTrashAll, onChangeAllStatus }) {
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
//         onClick={() => setOpen((v) => !v)}
//         className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-150"
//         title="More bulk actions"
//       >
//         <MoreVertical className="h-4 w-4 text-slate-500" />
//       </button>

//       {open && (
//         <div className="absolute right-0 z-30 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 overflow-hidden">
//           <button
//             onClick={() => {
//               setOpen(false);
//               onShareAll();
//             }}
//             className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-100"
//           >
//             <Share2 className="h-4 w-4 text-slate-400" />
//             Share All Orders
//           </button>
//           <button
//             onClick={() => {
//               setOpen(false);
//               onChangeAllStatus();
//             }}
//             className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-100"
//           >
//             <RefreshCcw className="h-4 w-4 text-slate-400" />
//             Change All Status
//           </button>
//           <div className="my-1 border-t border-slate-100" />
//           <button
//             onClick={() => {
//               setOpen(false);
//               onTrashAll();
//             }}
//             className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-100"
//           >
//             <Trash2 className="h-4 w-4 text-red-500" />
//             Move All to Trash
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // ---------- "Change All Status" picker ----------

// function ChangeAllStatusPopover({ open, onClose, onPick }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
//       <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-sm p-6">
//         <h3 className="text-base font-semibold text-slate-900 mb-1">Change all order statuses</h3>
//         <p className="text-sm text-slate-500 mb-4">
//           Pick a status to apply to every order that isn't <span className="font-medium">Pending</span>.
//           Pending orders stay untouched until set individually.
//         </p>
//         <div className="space-y-1.5">
//           {STATUS_OPTIONS.filter((s) => s.value !== "pending").map((opt) => (
//             <button
//               key={opt.value}
//               onClick={() => onPick(opt.value)}
//               className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 transition-colors duration-100"
//             >
//               <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: opt.color }} />
//               {opt.label}
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={onClose}
//           className="w-full mt-4 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors duration-150"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// // ---------- Order row (collapsed header + expandable detail) ----------

// function OrderRow({ order, status, onStatusChange, onRequestTrash }) {
//   const [expanded, setExpanded] = useState(false);
//   const total = calcOrderTotal(order);
//   const placedDate = new Date(order.placedAt || order.createdAt).toLocaleDateString("en-PK", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
//   const placedTime = new Date(order.placedAt || order.createdAt).toLocaleTimeString("en-PK", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-shadow duration-200 hover:shadow-sm">
//       <button
//         onClick={() => setExpanded((v) => !v)}
//         className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left"
//       >
//         <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0">
//           <Package className="h-4.5 w-4.5 text-slate-500" />
//         </div>

//         <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
//           <div className="min-w-0">
//             <p className="text-sm font-semibold text-slate-900 truncate">{order.orderId}</p>
//             <p className="text-xs text-slate-500 truncate">{order.customer?.name}</p>
//           </div>
//           <div className="hidden sm:block text-sm text-slate-600">
//             {placedDate}
//             <span className="text-slate-400"> &middot; {placedTime}</span>
//           </div>
//           <div className="text-sm font-medium text-slate-900">Rs {total.toLocaleString()}</div>
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

//       {expanded && (
//         <div
//           className="border-t border-slate-100 px-4 sm:px-5 py-5 bg-slate-50/60"
//           onClick={() => setExpanded(true)}
//         >
//           <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
//             <div className="flex items-center gap-2 flex-wrap">
//               <StatusDropdown orderId={order.orderId} currentStatus={status} onChange={onStatusChange} />
//             </div>
//             <MoreOptionsMenu order={order} currentStatus={status} onRequestTrash={onRequestTrash} />
//           </div>

//           <div className="grid lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 space-y-3">
//               <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
//                 Items ({order.items.length})
//               </h4>
//               {order.items.map((item, idx) => (
//                 <div key={item.slug || idx} className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-3">
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 rounded-md object-cover flex-shrink-0 bg-slate-100"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
//                     {item.size && <p className="text-xs text-slate-500">Size: {item.size}</p>}
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
//                   <span className="font-bold text-slate-900 text-base">Rs {total.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
//                 <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Customer</h4>
//                 <div className="space-y-2 text-sm text-slate-700">
//                   <p className="font-medium text-slate-900">{order.customer?.name}</p>
//                   {order.customer?.email && (
//                     <p className="flex items-center gap-2 text-slate-500">
//                       <Mail className="h-3.5 w-3.5" /> {order.customer.email}
//                     </p>
//                   )}
//                   <p className="flex items-center gap-2 text-slate-500">
//                     <Phone className="h-3.5 w-3.5" /> {order.customer?.phone}
//                   </p>
//                   <p className="flex items-start gap-2 text-slate-500">
//                     <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
//                     <span>
//                       {order.address}
//                       {order.city ? `, ${order.city}` : ""}
//                     </span>
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

// // ---------- Toast ----------

// function Toast({ message, onClose }) {
//   useEffect(() => {
//     if (!message) return;
//     const t = setTimeout(onClose, 2800);
//     return () => clearTimeout(t);
//   }, [message, onClose]);

//   if (!message) return null;
//   return (
//     <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2">
//       <Check className="h-4 w-4 text-emerald-400" />
//       {message}
//     </div>
//   );
// }

// // ---------- Main page ----------

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");
  
//   // 🟢 Category Filter State: 'all' | 'oversized' | 'regular'
//   const [activeCategory, setActiveCategory] = useState("all");
  
//   const [toast, setToast] = useState("");

//   const [trashTarget, setTrashTarget] = useState(null); 
//   const [showChangeAllPopover, setShowChangeAllPopover] = useState(false);
//   const [pendingBulkStatus, setPendingBulkStatus] = useState(null);

//   const fetchOrders = async () => {
//     setLoading(true);
//     setLoadError("");
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/orders`);
//       const data = await res.json();
//       if (data.success) {
//         setOrders(data.orders);
//       } else {
//         setLoadError(data.error || "Orders load nahi ho sake.");
//       }
//     } catch (err) {
//       console.error("fetchOrders error:", err);
//       setLoadError("Server se connect nahi ho saka. Kya backend chal raha hai?");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // 🟢 Single status change
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setOrders((prev) => prev.map((o) => (o.orderId === orderId ? data.order : o)));
//       }
//     } catch (err) {
//       console.error("handleStatusChange error:", err);
//     }
//   };

//   // 🟢 Counts per Category
//   const categoryCounts = useMemo(() => {
//     const oversized = orders.filter((o) => orderHasCategory(o, "oversized")).length;
//     const regular = orders.filter((o) => orderHasCategory(o, "regular")).length;
//     return { all: orders.length, oversized, regular };
//   }, [orders]);

//   const counts = useMemo(() => {
//     const c = { all: orders.length };
//     STATUS_OPTIONS.forEach((s) => (c[s.value] = 0));
//     orders.forEach((o) => {
//       c[o.status] = (c[o.status] || 0) + 1;
//     });
//     return c;
//   }, [orders]);

//   // 🟢 Combined Filtering Logic (Status + Category)
//   const filteredOrders = useMemo(() => {
//     return orders.filter((o) => {
//       const matchesStatus = activeFilter === "all" || o.status === activeFilter;
//       const matchesCategory =
//         activeCategory === "all" || orderHasCategory(o, activeCategory);
//       return matchesStatus && matchesCategory;
//     });
//   }, [activeFilter, activeCategory, orders]);

//   const handleDownloadAll = () => {
//     downloadOrdersBulkPdf(filteredOrders, (id) => orders.find((o) => o.orderId === id)?.status, {
//       title: activeFilter === "all" ? "All Orders" : `${STATUS_MAP[activeFilter]?.label} Orders`,
//       filenameSuffix: activeFilter,
//     });
//   };

//   const handleShareAll = async () => {
//     const links = orders
//       .map((o) => `${o.orderId}: ${window.location.origin}${ADMIN_BASE}/orders/${o.orderId}`)
//       .join("\n");
//     try {
//       await navigator.clipboard.writeText(links);
//       setToast(`Copied share links for ${orders.length} orders`);
//     } catch {
//       window.prompt("Copy these share links:", links);
//     }
//   };

//   // ---- Trash (single/all) ----
//   const requestTrashOrder = (order) => setTrashTarget(order);

//   const confirmTrash = async (confirmedName) => {
//     try {
//       if (trashTarget === "ALL") {
//         const orderIds = orders.map((o) => o.orderId);
//         const res = await fetch(`${API_BASE_URL}/api/orders/bulk/trash`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ orderIds }),
//         });
//         const data = await res.json();
//         if (data.success) {
//           setToast(`${orderIds.length} orders moved to trash by ${confirmedName}`);
//           fetchOrders();
//         }
//       } else if (trashTarget) {
//         const res = await fetch(`${API_BASE_URL}/api/orders/${trashTarget.orderId}/trash`, {
//           method: "PATCH",
//         });
//         const data = await res.json();
//         if (data.success) {
//           setToast(`${trashTarget.orderId} moved to trash by ${confirmedName}`);
//           setOrders((prev) => prev.filter((o) => o.orderId !== trashTarget.orderId));
//         }
//       }
//     } catch (err) {
//       console.error("confirmTrash error:", err);
//     } finally {
//       setTrashTarget(null);
//     }
//   };

//   // ---- Bulk status change ----
//   const handlePickBulkStatus = (statusValue) => {
//     setShowChangeAllPopover(false);
//     setPendingBulkStatus(statusValue);
//   };

//   const confirmBulkStatus = async (confirmedName) => {
//     try {
//       const orderIds = orders.map((o) => o.orderId);
//       const res = await fetch(`${API_BASE_URL}/api/orders/bulk/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderIds, status: pendingBulkStatus }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         const label = STATUS_MAP[pendingBulkStatus]?.label;
//         setToast(`All eligible orders set to ${label} by ${confirmedName}`);
//         fetchOrders();
//       }
//     } catch (err) {
//       console.error("confirmBulkStatus error:", err);
//     } finally {
//       setPendingBulkStatus(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <p className="text-sm text-slate-500">Loading orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
//             <p className="text-sm text-slate-500 mt-1">
//               {filteredOrders.length} of {orders.length} orders
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

//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleDownloadAll}
//               className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors duration-150 shadow-sm"
//             >
//               <FileDown className="h-4 w-4" />
//               {activeFilter === "all" ? "Download All Orders" : `Download ${STATUS_MAP[activeFilter]?.label} Orders`}
//             </button>
//             <BulkOptionsMenu
//               onShareAll={handleShareAll}
//               onTrashAll={() => setTrashTarget("ALL")}
//               onChangeAllStatus={() => setShowChangeAllPopover(true)}
//             />
//           </div>
//         </div>

//         {loadError && (
//           <div className="mb-4 p-3 rounded-lg text-sm font-medium border border-red-200 bg-red-50 text-red-600">
//             {loadError}
//           </div>
//         )}

//         {/* 🟢 NEW CATEGORY FILTER BUTTONS */}
//         <div className="bg-white p-3 rounded-xl border border-slate-200 mb-4 flex items-center gap-2 flex-wrap">
//           <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 mr-2">
//             Category:
//           </span>
//           <button
//             onClick={() => setActiveCategory("all")}
//             className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
//               activeCategory === "all"
//                 ? "bg-slate-900 text-white shadow-sm"
//                 : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//             }`}
//           >
//             All Categories
//             <span
//               className={`px-1.5 py-0.5 rounded-full text-[10px] ${
//                 activeCategory === "all" ? "bg-slate-700 text-white" : "bg-slate-200 text-slate-700"
//               }`}
//             >
//               {categoryCounts.all}
//             </span>
//           </button>

//           <button
//             onClick={() => setActiveCategory("oversized")}
//             className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
//               activeCategory === "oversized"
//                 ? "bg-slate-900 text-white shadow-sm"
//                 : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//             }`}
//           >
//             <Shirt className="w-3.5 h-3.5" />
//             Oversized
//             <span
//               className={`px-1.5 py-0.5 rounded-full text-[10px] ${
//                 activeCategory === "oversized" ? "bg-slate-700 text-white" : "bg-slate-200 text-slate-700"
//               }`}
//             >
//               {categoryCounts.oversized}
//             </span>
//           </button>

//           <button
//             onClick={() => setActiveCategory("regular")}
//             className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
//               activeCategory === "regular"
//                 ? "bg-slate-900 text-white shadow-sm"
//                 : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//             }`}
//           >
//             <Shirt className="w-3.5 h-3.5" />
//             Regular Fit
//             <span
//               className={`px-1.5 py-0.5 rounded-full text-[10px] ${
//                 activeCategory === "regular" ? "bg-slate-700 text-white" : "bg-slate-200 text-slate-700"
//               }`}
//             >
//               {categoryCounts.regular}
//             </span>
//           </button>
//         </div>

//         {/* STATUS FILTERS */}
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

//         <div className="space-y-3">
//           {filteredOrders.length === 0 ? (
//             <div className="bg-white rounded-xl border border-dashed border-slate-300 py-16 text-center">
//               <Package className="h-8 w-8 text-slate-300 mx-auto mb-3" />
//               <p className="text-sm text-slate-500">No orders match the selected filters.</p>
//             </div>
//           ) : (
//             filteredOrders.map((order) => (
//               <OrderRow
//                 key={order.orderId}
//                 order={order}
//                 status={order.status}
//                 onStatusChange={handleStatusChange}
//                 onRequestTrash={requestTrashOrder}
//               />
//             ))
//           )}
//         </div>
//       </div>

//       <ChangeAllStatusPopover
//         open={showChangeAllPopover}
//         onClose={() => setShowChangeAllPopover(false)}
//         onPick={handlePickBulkStatus}
//       />

//       <NameConfirmModal
//         open={Boolean(pendingBulkStatus)}
//         title="Change all order statuses"
//         message={`This will set every non-pending order to "${STATUS_MAP[pendingBulkStatus]?.label || ""}". This action affects multiple orders at once.`}
//         confirmLabel="Change All"
//         actionWord="change all order statuses"
//         danger={false}
//         onConfirm={confirmBulkStatus}
//         onCancel={() => setPendingBulkStatus(null)}
//       />

//       <NameConfirmModal
//         open={Boolean(trashTarget)}
//         title={trashTarget === "ALL" ? "Move all orders to trash" : `Move ${trashTarget?.orderId} to trash`}
//         message={
//           trashTarget === "ALL"
//             ? `This will move all ${orders.length} orders to the Trash. You can permanently delete them later from the Trash page.`
//             : "This order will be moved to the Trash. You can permanently delete it later from the Trash page."
//         }
//         confirmLabel="Move to Trash"
//         actionWord="move this to trash"
//         danger
//         onConfirm={confirmTrash}
//         onCancel={() => setTrashTarget(null)}
//       />

//       <Toast message={toast} onClose={() => setToast("")} />
//     </div>
//   );
// }