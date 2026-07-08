// "use client";

// import * as React from "react";
// import { motion } from "framer-motion";

// // Local cn helper: Agar project mein shadcn ki utils file na chal rahi ho tab bhi error nahi aega
// const cn = (...classes) => classes.filter(Boolean).join(" ");

// // --- ProductCard Component (Pure JavaScript Version) ---
// export const ProductCard = React.forwardRef((
//   {
//     className,
//     imageUrl,
//     name,
//     tagline,
//     price,
//     currency = "pkr",
//     isCouponPrice = false,
//     originalPrice,
//     offerText,
//     ...props
//   },
//   ref
// ) => {
//   // Price formatter for consistent currency display
//   const formatPrice = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "pkr",
//       minimumFractionDigits: 0,
//     })
//       .format(amount)
//       .replace("pkr", `${currency}`);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       className={cn(
//         "group relative flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-xl border bg-white dark:bg-zinc-900 p-6 text-center text-zinc-900 dark:text-zinc-50 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md border-zinc-200 dark:border-zinc-800",
//         className
//       )}
//       whileHover={{ y: -5 }}
//       transition={{ type: "spring", stiffness: 300 }}
//       {...props}
//     >
//       {/* Product Image */}
//       <div className="relative mb-4 flex h-40 w-full items-center justify-center">
//         <img
//           src={imageUrl}
//           alt={name}
//           className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
//         />
//       </div>

//       {/* Product Details */}
//       <div className="flex flex-grow flex-col items-center gap-2">
//         <h3 className="font-semibold text-base">{name}</h3>
//         <p className="text-sm text-zinc-500 dark:text-zinc-400">{tagline}</p>
//       </div>

//       {/* Pricing and Offers */}
//       <div className="mt-4 flex flex-col items-center gap-2">
//         <div className="flex flex-col items-center">
//           <span className="text-2xl font-bold">{formatPrice(price)}</span>
//           {isCouponPrice && (
//             <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
//               Coupon Price
//             </span>
//           )}
//         </div>
//         <div className="flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs">
//           {originalPrice && (
//             <span className="text-zinc-400 dark:text-zinc-500 line-through">
//               {formatPrice(originalPrice)}
//             </span>
//           )}
//           <span className="font-semibold text-yellow-600 dark:text-yellow-500">
//             {offerText}
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// });

// ProductCard.displayName = "ProductCard";










// Is component ka apna route nahi hai (ye ek reusable card hai),
// lekin ye click par /products/[slug] par navigate karta hai.
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