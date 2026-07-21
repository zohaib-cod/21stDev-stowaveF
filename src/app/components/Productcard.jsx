"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export function ProductCard({
  slug,
  name,
  tagline,
  price,
  originalPrice,
  offerText,
  imageUrl,
  isCouponPrice,
}) {
  const router = useRouter();

  const handleClick = () => {
    if (slug) router.push(`/products/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {offerText && (
          <span className="absolute top-2 left-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full">
            {offerText}
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
          {tagline}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50">
            PKR {price}
          </span>
          {originalPrice && (
            <span className="text-xs sm:text-sm text-zinc-400 line-through">
              PKR {originalPrice}
            </span>
          )}
        </div>

        {isCouponPrice && (
          <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 mt-1">
            Coupon price applied at checkout
          </p>
        )}
      </div>
    </div>
  );
}