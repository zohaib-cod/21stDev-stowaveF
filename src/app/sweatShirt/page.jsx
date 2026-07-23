// "use client";

// import * as React from "react";
// import { motion } from "framer-motion";
// import { HeroSection } from "../components/slider/slider";

// const cn = (...classes) => classes.filter(Boolean).join(" ");

// const ProductCard = React.forwardRef((
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

// export default function SweatshirtPage() {
//   const sweatShirtsData = [
//     {
//       id: 1,
//       name: "Oversized Black Sweatshirt",
//       tagline: "Premium heavy cotton material",
//       price: 1499,
//       originalPrice: 2499,
//       offerText: "40% OFF",
//       imageUrl: "https://dnstore.pk/cdn/shop/collections/A6F9D276-DD01-4A48-A90F-4C075B4DE837.jpg?v=1777718686&width=1200",
//       isCouponPrice: true
//     },
//     {
//       id: 2,
//       name: "Classic Charcoal Hoodie",
//       tagline: "Perfect fleece warmth for winter",
//       price: 1899,
//       originalPrice: 2999,
//       offerText: "🔥 Best Seller",
//       imageUrl: "https://dnstore.pk/cdn/shop/collections/A6F9D276-DD01-4A48-A90F-4C075B4DE837.jpg?v=1777718686&width=1200",
//       isCouponPrice: false
//     },
//     {
//       id: 3,
//       name: "Minimalist Sand Crewneck",
//       tagline: "Brushed interior cozy streetwear",
//       price: 1299,
//       originalPrice: 1999,
//       offerText: "Flat pkr700 Off",
//       imageUrl: "https://dnstore.pk/cdn/shop/collections/A6F9D276-DD01-4A48-A90F-4C075B4DE837.jpg?v=1777718686&width=1200",
//       isCouponPrice: false
//     }
//   ];
//   const heroSliderImages = [
//   { src: "/IMG_4623.PNG", alt: "Slide 1" },
//   { src: "/IMG_4632.PNG", alt: "Slide 2" },
//   { src: "/IMG_4824.PNG", alt: "Slide 3" },
//   { src: "/IMG_4909.PNG", alt: "Slide 4" },
//   { src: "/IMG_4916.PNG", alt: "Slide 5" },
// ];

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-28 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
//           Sweatshirts Catalog
//         </h1>
        
//         {/* Responsive Grid System */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {sweatShirtsData.map((product) => (
//             <ProductCard
//               key={product.id}
//               name={product.name}
//               tagline={product.tagline}
//               price={product.price}
//               originalPrice={product.originalPrice}
//               offerText={product.offerText}
//               imageUrl={product.imageUrl}
//               isCouponPrice={product.isCouponPrice}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



















































"use client";

import * as React from "react";
import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const ProductCard = React.forwardRef((
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
      <div className="relative mb-4 flex h-40 w-full items-center justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-grow flex-col items-center gap-2">
        <h3 className="font-semibold text-base">{name}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{tagline}</p>
      </div>

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
          {offerText && (
            <span className="font-semibold text-yellow-600 dark:text-yellow-500">
              {offerText}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

export default function SweatshirtPage() {
  const [allProducts, setAllProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        // 🟢 Sweatshirt ka apna backend endpoint
        const res = await fetch(`${API_BASE_URL}/api/sweatshirtproducts`);
        const data = await res.json();

        if (data.success) {
          setAllProducts(data.products);
        } else {
          setError(data.error || "Products load nahi ho sake.");
        }
      } catch (err) {
        console.error("fetchProducts error:", err);
        setError("Can't connect to server. Is your backend live?");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
          Sweatshirts Catalog
        </h1>

        {loading ? (
          <p className="text-sm text-zinc-400 text-center py-10">
            Products is loading...
          </p>
        ) : error ? (
          <p className="text-sm text-red-500 text-center py-10">{error}</p>
        ) : allProducts.length === 0 ? (
          <p className="text-sm text-zinc-400 text-center py-10">
            There is no product uploaded yet!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <ProductCard
                key={product._id}
                name={product.name}
                tagline={product.tagline}
                price={product.price}
                originalPrice={product.originalPrice}
                offerText={product.offerText}
                imageUrl={product.imageUrl}
                isCouponPrice={product.isCouponPrice || false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}