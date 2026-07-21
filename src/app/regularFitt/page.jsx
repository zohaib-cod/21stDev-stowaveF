// "use client";

// import * as React from "react";
// import { ProductCard } from "../components/Productcard";
// import { HeroSection } from "../components/slider/slider";


// export default function RegularFitPage() {
//   const regularFitData = [
//     {
//       id: 1,
//       name: "Regular Fit Black Sweatshirt",
//       tagline: "Soft everyday cotton blend",
//       price: 1399,
//       originalPrice: 2199,
//       offerText: "35% OFF",
//       imageUrl: "https://dnstore.pk/cdn/shop/collections/A6F9D276-DD01-4A48-A90F-4C075B4DE837.jpg?v=1777718686&width=1200",
//       isCouponPrice: true
//     },
//     {
//       id: 2,
//       name: "Classic Grey Crewneck",
//       tagline: "Lightweight fit for daily wear",
//       price: 1599,
//       originalPrice: 2399,
//       offerText: "🔥 Best Seller",
//       imageUrl: "https://dnstore.pk/cdn/shop/collections/A6F9D276-DD01-4A48-A90F-4C075B4DE837.jpg?v=1777718686&width=1200",
//       isCouponPrice: false
//     },
//     {
//       id: 3,
//       name: "Navy Regular Hoodie",
//       tagline: "Tailored fit, breathable fabric",
//       price: 1199,
//       originalPrice: 1799,
//       offerText: "Flat pkr600 Off",
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
//           Regular Fit Collection
//         </h1>

//         {/* Responsive Grid System */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {regularFitData.map((product) => (
//               <ProductCard
//               key={product.id}
//               name={product.name}
//               tagline={product.tagline}
//               price={product.price}
//               originalPrice={product.originalPrice}
//               offerText={product.offerText}
//               imageUrl={product.imageUrl}
//               isCouponPrice={product.isCouponPrice}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

















// "use client";

// import * as React from "react";
// import { ProductCard } from "../components/Productcard";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export default function RegularFitPage() {
//   const [allProducts, setAllProducts] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState("");

//   React.useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         // 🟢 Regular Fit ka apna backend endpoint (oversized wala nahi)
//         const res = await fetch(`${API_BASE_URL}/api/regularproducts`);
//         const data = await res.json();

//         if (data.success) {
//           setAllProducts(data.products);
//         } else {
//           setError(data.error || "Products load nahi ho sake.");
//         }
//       } catch (err) {
//         console.error("fetchProducts error:", err);
//         setError("Can't connect to server. Is your backend live?");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-28 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
//           Regular Fit Collection
//         </h1>

//         {loading ? (
//           <p className="text-sm text-zinc-400 text-center py-10">
//             Products is loading...
//           </p>
//         ) : error ? (
//           <p className="text-sm text-red-500 text-center py-10">{error}</p>
//         ) : allProducts.length === 0 ? (
//           <p className="text-sm text-zinc-400 text-center py-10">
//             There is no product uploaded yet!
//           </p>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
//             {allProducts.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 slug={product.slug}
//                 name={product.name}
//                 tagline={product.tagline}
//                 price={product.price}
//                 originalPrice={product.originalPrice}
//                 offerText={product.offerText}
//                 imageUrl={product.imageUrl}
//                 isCouponPrice={product.isCouponPrice || false}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }














"use client";

import * as React from "react";
import { ProductCard } from "../components/Productcard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function RegularFitPage() {
  const [allProducts, setAllProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        // 🟢 Regular Fit ka apna backend endpoint
        const res = await fetch(`${API_BASE_URL}/api/regularproducts`);
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
          Regular Fit Collection
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {allProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id} // 🟢 Pass ID explicitly
                slug={product.slug || product._id} // 🟢 Slug na milay to _id use hoga
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