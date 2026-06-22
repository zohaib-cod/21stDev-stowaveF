// NOT A ROUTE — shared component (no URL of its own).
// Used by: app/orders/page.jsx and app/orders/trash/page.jsx
//
// A warning modal that requires the acting person to type their name before
// the destructive action (move to trash / delete permanently) proceeds.
// Only names in lib/authorizedNames.js are accepted (case-insensitive).

"use client";

import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { isAuthorizedName } from "../../lib/authorizedNames";

export default function NameConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  actionWord = "proceed",
  danger = true,
  onConfirm,
  onCancel,
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("name"); // "name" -> "final"

  if (!open) return null;

  const resetAndCancel = () => {
    setError("");
    setName("");
    setStep("name");
    onCancel();
  };

  const handleNameSubmit = () => {
    if (!name.trim()) {
      setError("Please type your name to continue.");
      return;
    }
    if (!isAuthorizedName(name)) {
      setError("This name isn't authorized to perform this action.");
      return;
    }
    setError("");
    setStep("final");
  };

  const handleFinalConfirm = () => {
    onConfirm(name.trim());
    setName("");
    setStep("name");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={resetAndCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-sm overflow-hidden">
        <button
          onClick={resetAndCancel}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-150"
        >
          <X className="h-4 w-4" />
        </button>

        {step === "name" ? (
          <>
            <div className="px-6 pt-6 pb-2">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center mb-3 ${
                  danger ? "bg-red-50" : "bg-amber-50"
                }`}
              >
                <AlertTriangle
                  className={`h-5 w-5 ${danger ? "text-red-500" : "text-amber-500"}`}
                />
              </div>
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{message}</p>
            </div>

            <div className="px-6 py-4">
              <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                Type your name to confirm
              </label>
              <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="Your name"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-150 ${
                  error
                    ? "border-red-300 focus:ring-red-200"
                    : "border-slate-200 focus:ring-slate-300"
                }`}
              />
              {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
            </div>

            <div className="px-6 pb-6 flex items-center gap-2.5">
              <button
                onClick={resetAndCancel}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleNameSubmit}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors duration-150 ${
                  danger
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-slate-900 hover:bg-slate-800"
                }`}
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="px-6 pt-6 pb-2">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center mb-3 ${
                  danger ? "bg-red-50" : "bg-amber-50"
                }`}
              >
                <AlertTriangle
                  className={`h-5 w-5 ${danger ? "text-red-500" : "text-amber-500"}`}
                />
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Are you sure, {name.trim()}?
              </h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                Confirming as <span className="font-medium text-slate-700">{name.trim()}</span> to {actionWord}. This will be recorded against your name.
              </p>
            </div>

            <div className="px-6 pb-6 pt-4 flex items-center gap-2.5">
              <button
                onClick={() => setStep("name")}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors duration-150"
              >
                Back
              </button>
              <button
                onClick={handleFinalConfirm}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors duration-150 ${
                  danger
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-slate-900 hover:bg-slate-800"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}