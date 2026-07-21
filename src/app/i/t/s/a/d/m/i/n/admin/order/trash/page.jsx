"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  RotateCcw,
  Package,
  Clock,
  AlertOctagon,
} from "lucide-react";
import NameConfirmModal from "../../components/Nameconfirmmodal/Nameconfirmmodal";

const ADMIN_BASE = "/i/t/s/a/d/m/i/n/admin";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const STATUS_MAP = {
  pending: { label: "Pending", color: "#64748b" },
  processing: { label: "Processing", color: "#2563eb" },
  under_review: { label: "Under Review", color: "#d97706" },
  received: { label: "Received", color: "#16a34a" },
  return: { label: "Return", color: "#dc2626" },
};

function calcOrderTotal(order) {
  return order.total ?? order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

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

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg">
      {message}
    </div>
  );
}

export default function TrashPage() {
  const [trashedOrders, setTrashedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 🟢 GET /api/orders?trashed=true
  const fetchTrashed = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders?trashed=true`);
      const data = await res.json();
      if (data.success) {
        setTrashedOrders(data.orders);
      }
    } catch (err) {
      console.error("fetchTrashed error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrashed();
  }, []);

  // 🟢 PATCH /api/orders/:id/restore
  const handleRestore = async (order) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${order.orderId}/restore`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        setTrashedOrders((prev) => prev.filter((o) => o.orderId !== order.orderId));
        setToast(`${order.orderId} restored from trash`);
      }
    } catch (err) {
      console.error("handleRestore error:", err);
    }
  };

  // 🟢 DELETE /api/orders/:id (permanent)
  const confirmPermanentDelete = async (confirmedName) => {
    if (deleteTarget) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders/${deleteTarget.orderId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          setTrashedOrders((prev) => prev.filter((o) => o.orderId !== deleteTarget.orderId));
          setToast(`${deleteTarget.orderId} permanently deleted by ${confirmedName}`);
        }
      } catch (err) {
        console.error("confirmPermanentDelete error:", err);
      }
    }
    setDeleteTarget(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-500">Loading trash...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link
            href={`${ADMIN_BASE}/orders`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors duration-150 mb-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
              <Trash2 className="h-4.5 w-4.5 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Trash</h1>
              <p className="text-sm text-slate-500">
                {trashedOrders.length} order{trashedOrders.length === 1 ? "" : "s"} in trash
              </p>
            </div>
          </div>
        </div>

        {trashedOrders.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 py-20 text-center">
            <Package className="h-9 w-9 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Trash is empty.</p>
            <p className="text-xs text-slate-400 mt-1">Orders moved to trash will show up here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {trashedOrders.map((order) => {
              const total = calcOrderTotal(order);
              const trashedDate = new Date(order.trashedAt).toLocaleDateString("en-PK", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              const trashedTime = new Date(order.trashedAt).toLocaleTimeString("en-PK", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });

              return (
                <div
                  key={order.orderId}
                  className="bg-white rounded-xl border border-slate-200 px-4 sm:px-5 py-4 flex flex-wrap items-center gap-4"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 flex-shrink-0">
                    <Trash2 className="h-4.5 w-4.5 text-red-400" />
                  </div>

                  <div className="flex-1 min-w-[180px]">
                    <p className="text-sm font-semibold text-slate-900">{order.orderId}</p>
                    <p className="text-xs text-slate-500">{order.customer?.name}</p>
                  </div>

                  <div className="min-w-[160px]">
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-0.5">
                      <Clock className="h-3 w-3" /> Trashed on
                    </p>
                    <p className="text-sm text-slate-700">
                      {trashedDate} <span className="text-slate-400">at</span> {trashedTime}
                    </p>
                  </div>

                  <div className="min-w-[100px] text-sm font-medium text-slate-900">
                    Rs {total.toLocaleString()}
                  </div>

                  <StatusBadge status={order.status} />

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => handleRestore(order)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-150"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Restore
                    </button>
                    <button
                      onClick={() => setDeleteTarget(order)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors duration-150"
                    >
                      <AlertOctagon className="h-3.5 w-3.5" />
                      Delete Permanently
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <NameConfirmModal
        open={Boolean(deleteTarget)}
        title={`Permanently delete ${deleteTarget?.orderId || ""}`}
        message="This cannot be undone. The order will be removed forever, not just from the trash."
        confirmLabel="Delete Permanently"
        actionWord="permanently delete this order"
        danger
        onConfirm={confirmPermanentDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}