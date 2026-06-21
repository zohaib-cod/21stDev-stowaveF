"use client";

import * as React from "react";
import { motion } from "framer-motion";

// Local cn helper: Agar project mein shadcn ki utils file na chal rahi ho tab bhi error nahi aega
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- ProductCard Component (Pure JavaScript Version) ---
export const ProductCard = React.forwardRef((
  {
    className,
    imageUrl,
    name,
    tagline,
    price,
    currency = "pkr",
    isCouponPrice = false,
    originalPrice,
    offerText,
    ...props
  },
  ref
) => {
  // Price formatter for consistent currency display
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "pkr",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("pkr", `${currency}`);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-xl border bg-white dark:bg-zinc-900 p-6 text-center text-zinc-900 dark:text-zinc-50 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md border-zinc-200 dark:border-zinc-800",
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      {...props}
    >
      {/* Product Image */}
      <div className="relative mb-4 flex h-40 w-full items-center justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-grow flex-col items-center gap-2">
        <h3 className="font-semibold text-base">{name}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{tagline}</p>
      </div>

      {/* Pricing and Offers */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{formatPrice(price)}</span>
          {isCouponPrice && (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
              Coupon Price
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs">
          {originalPrice && (
            <span className="text-zinc-400 dark:text-zinc-500 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          <span className="font-semibold text-yellow-600 dark:text-yellow-500">
            {offerText}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";