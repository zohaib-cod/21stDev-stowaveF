// "use client";

// import * as React from "react";
// import { ProductCard } from "../components/Productcard";
// import { HeroSection } from "../components/slider/slider";

// export default function OversizedPage() {
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
// const heroSliderImages = [
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
//           Oversized Collection
//         </h1>

//         {/* Responsive Grid System */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {sweatShirtsData.map((product) => (
//             <ProductCard
//             key={product.id}
//             name={product.name}
//             tagline={product.tagline}
//             price={product.price}
//             originalPrice={product.originalPrice}
//             offerText={product.offerText}
//             imageUrl={product.imageUrl}
//             isCouponPrice={product.isCouponPrice}
//             />
//           ))}
//         </div>
//       </div>
// {/* <HeroSection
//         title="Crafted For Every Story"
//         subtitle="Discover pieces designed to move with you, wherever the day takes you."
//         images={heroSliderImages}
//       /> */}
//     </div>
//   );
// }














// // Route: /oversized
// "use client";

// import * as React from "react";
// import { ProductCard } from "../components/Productcard";
// // import { HeroSection } from "../components/slider/slider";
// import { products } from "../lib/products";

// export default function OversizedPage() {
//   const heroSliderImages = [
//     { src: "/IMG_4623.PNG", alt: "Slide 1" },
//     { src: "/IMG_4632.PNG", alt: "Slide 2" },
//     { src: "/IMG_4824.PNG", alt: "Slide 3" },
//     { src: "/IMG_4909.PNG", alt: "Slide 4" },
//     { src: "/IMG_4916.PNG", alt: "Slide 5" },
//   ];

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-28 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
//           Oversized Collection
//         </h1>

//         {/* mobile/choti screens par 2 columns, tablet+ par 3 */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
//           {products.map((product) => (
//             <ProductCard
//               key={product.id}
//               slug={product.slug}
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

//       {/* <HeroSection
//         title="Crafted For Every Story"
//         subtitle="Discover pieces designed to move with you, wherever the day takes you."
//         images={heroSliderImages}
//       /> */}
//     </div>
//   );
// }






















"use client";

import * as React from "react";
import { ProductCard } from "../components/Productcard";
// import { HeroSection } from "../components/slider/slider";
import { products as staticProducts } from "../lib/products";

export default function OversizedPage() {
  // Local storage se dynamic products load karne ke liye state
  const [allProducts, setAllProducts] = React.useState([]);

  React.useEffect(() => {
    // 1. Static products ko initially fetch kiya
    let combinedProducts = [...staticProducts];

    // 2. Browser check karke local storage ka dynamic data fetch kiya
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("store_products");
      if (stored) {
        try {
          const parsedStored = JSON.parse(stored);
          // Dono lists ko merge kiya (Dynamic content top par show hoga)
          combinedProducts = [...parsedStored, ...staticProducts];
        } catch (e) {
          console.error("Localstorage parsing error:", e);
        }
      }
    }

    setAllProducts(combinedProducts);
  }, []);

  const heroSliderImages = [
    { src: "/IMG_4623.PNG", alt: "Slide 1" },
    { src: "/IMG_4632.PNG", alt: "Slide 2" },
    { src: "/IMG_4824.PNG", alt: "Slide 3" },
    { src: "/IMG_4909.PNG", alt: "Slide 4" },
    { src: "/IMG_4916.PNG", alt: "Slide 5" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
          Oversized Collection
        </h1>

        {/* mobile/choti screens par 2 columns, tablet+ par 3 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {allProducts.map((product) => (
            <ProductCard
              key={product.id || product.slug}
              slug={product.slug}
              name={product.name}
              tagline={product.tagline} // Chota Title
              price={product.price}
              originalPrice={product.originalPrice}
              offerText={product.offerText} // Badge (e.g., 🔥 Best Seller)
              imageUrl={product.imageUrl}
              isCouponPrice={product.isCouponPrice || false}
            />
          ))}
        </div>
      </div>

      {/* <HeroSection
        title="Crafted For Every Story"
        subtitle="Discover pieces designed to move with you, wherever the day takes you."
        images={heroSliderImages}
      /> */}
    </div>
  );
}
