// "use client";

// import * as React from "react";
// import { useRouter, useParams } from "next/navigation";
// import { getProductBySlug } from "../../lib/products";
// import { addToBag, setBuyNowItem } from "../../lib/cart";
// import { isLoggedIn, getCurrentUser } from "../../lib/auth";
// import { getCommentsForProduct, addCommentToProduct } from "../../lib/comments";

// const WHATSAPP_NUMBER = "923290010909"; // 03290010909 international format

// export default function ProductDetailPage() {
//   const router = useRouter();
//   const params = useParams();

//   // 🟢 Product ko static + localStorage dono jagah se dhoondne wala state
//   const [product, setProduct] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     // 1. Pehle static products list mein dhoondo
//     let foundProduct = getProductBySlug(params.slug);

//     // 2. Agar static mein nahi mila, to localStorage ke dynamic products check karo
//     if (!foundProduct && typeof window !== "undefined") {
//       try {
//         const stored = localStorage.getItem("store_products");
//         if (stored) {
//           const parsedStored = JSON.parse(stored);
//           foundProduct = parsedStored.find((p) => p.slug === params.slug);
//         }
//       } catch (e) {
//         console.error("Localstorage parsing error:", e);
//       }
//     }

//     setProduct(foundProduct || null);
//     setLoading(false);
//   }, [params.slug]);

//   const [qty, setQty] = React.useState(1);
//   const [copied, setCopied] = React.useState(false);
//   // 🟢 Pop-up controller state
//   const [showPopup, setShowPopup] = React.useState(false);

//   // 🟢 Image gallery state
//   const [activeImage, setActiveImage] = React.useState(0);
//   const [showLightbox, setShowLightbox] = React.useState(false);
//   const [isZoomed, setIsZoomed] = React.useState(false);

//   // 🟢 Comments state
//   const [comments, setComments] = React.useState([]);
//   const [commentText, setCommentText] = React.useState("");
//   const [showLoginPopup, setShowLoginPopup] = React.useState(false);
//   // 🟢 Comment box ka logged-in status ab state mein rakhte hain taake login/logout
//   // hone par (isi tab mein bhi) turant refresh ho jaye, sirf function call par depend na ho
//   const [loggedIn, setLoggedIn] = React.useState(false);

//   // 🟢 Countdown timer state (sale kitni der mein khatam hogi)
//   const [timeLeft, setTimeLeft] = React.useState(null); // { days, hours, minutes, seconds } | "expired" | null

//   // Load this product's comments whenever the product changes
//   React.useEffect(() => {
//     if (product) {
//       setComments(getCommentsForProduct(product.slug));
//     }
//   }, [product]);

//   // 🟢 Login status check karo mount par, aur "auth-change" event par bhi (login/logout
//   // kahin bhi ho, ye page turant update ho jayega)
//   React.useEffect(() => {
//     setLoggedIn(isLoggedIn());

//     const syncAuth = () => setLoggedIn(isLoggedIn());
//     window.addEventListener("auth-change", syncAuth);
//     window.addEventListener("storage", syncAuth);
//     return () => {
//       window.removeEventListener("auth-change", syncAuth);
//       window.removeEventListener("storage", syncAuth);
//     };
//   }, []);

//   // 🟢 Har second countdown ko update karne wala effect
//   React.useEffect(() => {
//     if (!product || !product.saleEndTime) {
//       setTimeLeft(null);
//       return;
//     }

//     const endTime = new Date(product.saleEndTime).getTime();

//     const tick = () => {
//       const now = new Date().getTime();
//       const diff = endTime - now;

//       if (diff <= 0) {
//         setTimeLeft("expired");
//         return;
//       }

//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//       const minutes = Math.floor((diff / (1000 * 60)) % 60);
//       const seconds = Math.floor((diff / 1000) % 60);

//       setTimeLeft({ days, hours, minutes, seconds });
//     };

//     tick(); // turant ek dafa chala do, phir har second
//     const interval = setInterval(tick, 1000);

//     return () => clearInterval(interval);
//   }, [product]);

//   // 🟢 Jab tak product dhoonda ja raha hai (static + localStorage check)
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
//         <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
//         <div className="text-center">
//           <p className="text-zinc-600 dark:text-zinc-400 mb-4">
//             Ye product nahi mila.
//           </p>
//           <button
//             onClick={() => router.push("/oversized")}
//             className="text-zinc-900 dark:text-zinc-50 underline"
//           >
//             Collection par wapas jayein
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Fallback to single imageUrl if product.images array isn't provided
//   const images =
//     product.images && product.images.length > 0
//       ? product.images
//       : [product.imageUrl];

//   const shareUrl = `${
//     typeof window !== "undefined" ? window.location.origin : ""
//   }/products/${product.slug}`;

//   const isSoldOut = !!product.soldOut; // 🟢 Sold out check

//   // 🟢 Sale sirf tab "expired" maani jayegi jab saleEndTime set ho AUR wo waqt guzar chuka ho.
//   // Agar saleEndTime hai hi nahi (koi countdown lagaya hi nahi gaya), to ye hamesha false rahega
//   // aur price/offer badge hamesha normal (jo bhi admin ne set kiya) dikhte rahenge.
//   const isSaleExpired = !!product.saleEndTime && timeLeft === "expired";

//   // 🟢 Sale khatam hone ke baad price wapis original price par chala jaye (agar original price set hai)
//   const effectivePrice =
//     isSaleExpired && product.originalPrice ? product.originalPrice : product.price;
//   // Sale khatam ho chuki ho to ab strike-through original price aur offer badge dikhane ki zarurat nahi
//   const showOriginalPriceStrike = !isSaleExpired && !!product.originalPrice;
//   const showOfferBadge = !isSaleExpired && !!product.offerText;

//   // 🟢 Navigation stop karke pop-up show karne ka logic
//   const handleAddToBag = () => {
//     if (isSoldOut) return; // sold out product bag mein nahi jayega
//     addToBag(product, qty);
//     setShowPopup(true);

//     // 3 seconds baad khud hi pop-up hide ho jayega
//     setTimeout(() => {
//       setShowPopup(false);
//     }, 3000);
//   };

//   const handleBuyNow = () => {
//     if (isSoldOut) return; // sold out product buy nahi ho sakta
//     setBuyNowItem(product, qty);
//     router.push("/checkout");
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: product.name,
//           text: `${product.name} — PKR ${effectivePrice}`,
//           url: shareUrl,
//         });
//       } catch {
//         // user cancelled share sheet, kuch nahi karna
//       }
//     } else {
//       await navigator.clipboard.writeText(shareUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const whatsappMessage = encodeURIComponent(
//     `Assalam o Alaikum, mujhe "${product.name}" (PKR ${effectivePrice}) k baare mein maloomat chahiye.\n${shareUrl}`
//   );

//   // 🟢 Gallery handlers
//   const openLightbox = (index) => {
//     setActiveImage(index);
//     setIsZoomed(false);
//     setShowLightbox(true);
//   };

//   const closeLightbox = () => {
//     setShowLightbox(false);
//     setIsZoomed(false);
//   };

//   const showPrevImage = () => {
//     setIsZoomed(false);
//     setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1));
//   };

//   const showNextImage = () => {
//     setIsZoomed(false);
//     setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1));
//   };

//   // 🟢 Comment handlers
//   const handleCommentSubmit = (e) => {
//     e.preventDefault();

//     if (!loggedIn) {
//       setShowLoginPopup(true);
//       return;
//     }

//     if (!commentText.trim()) return;

//     const user = getCurrentUser();
//     const newComment = addCommentToProduct(product.slug, {
//       text: commentText.trim(),
//       userName: user?.name || user?.email || "Anonymous",
//     });

//     setComments((prev) => [newComment, ...prev]);
//     setCommentText("");
//   };

//   const handleCommentBoxFocus = () => {
//     if (!loggedIn) {
//       setShowLoginPopup(true);
//     }
//   };

//   // 🟢 Countdown ke digits ko hamesha 2 digit mein dikhane ka helper (e.g. 05)
//   const pad = (num) => String(num).padStart(2, "0");

//   return (
//     <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8">
//       {/* 🟢 Floating Non-Intrusive Pop-up Toast Alert */}
//       {showPopup && (
//         <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 px-5 py-4 rounded-xl shadow-2xl border border-zinc-800 dark:border-zinc-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
//           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
//             ✓
//           </div>
//           <div>
//             <p className="text-sm font-semibold">Product added to bag!</p>
//             <p className="text-xs opacity-80 mt-0.5">
//               {product.name} ({qty} qty)
//             </p>
//           </div>
//           <button
//             onClick={() => setShowPopup(false)}
//             className="ml-4 text-xs font-medium underline opacity-70 hover:opacity-100"
//           >
//             Dismiss
//           </button>
//         </div>
//       )}

//       {/* 🟢 Login required pop-up */}
//       {showLoginPopup && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
//           <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
//             <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
//               Login zaroori hai
//             </h3>
//             <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-5">
//               Comment karne ke liye pehle apne account mein login karein.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowLoginPopup(false)}
//                 className="flex-1 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium"
//               >
//                 Cancel
//               </button>
// <button
//   onClick={() => router.push("/signIn")}
//   className="flex-1 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold"
// >
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🟢 Image lightbox / zoom modal */}
//       {showLightbox && (
//         <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center px-4">
//           <button
//             onClick={closeLightbox}
//             className="absolute top-5 right-5 text-white text-3xl leading-none hover:opacity-70"
//             aria-label="Close"
//           >
//             ×
//           </button>

//           {images.length > 1 && (
//             <button
//               onClick={showPrevImage}
//               className="absolute left-3 sm:left-6 text-white text-4xl leading-none hover:opacity-70"
//               aria-label="Previous image"
//             >
//               ‹
//             </button>
//           )}

//           <div
//             className="max-w-3xl max-h-[80vh] overflow-hidden cursor-zoom-in"
//             onClick={() => setIsZoomed((z) => !z)}
//           >
//             <img
//               src={images[activeImage]}
//               alt={`${product.name} ${activeImage + 1}`}
//               className={`max-h-[80vh] w-auto mx-auto transition-transform duration-300 ${
//                 isZoomed ? "scale-[2] cursor-zoom-out" : "scale-100"
//               }`}
//             />
//           </div>

//           {images.length > 1 && (
//             <button
//               onClick={showNextImage}
//               className="absolute right-3 sm:right-6 text-white text-4xl leading-none hover:opacity-70"
//               aria-label="Next image"
//             >
//               ›
//             </button>
//           )}

//           <p className="absolute bottom-5 text-white text-xs opacity-70">
//             Tap image to zoom in / out
//           </p>
//         </div>
//       )}

//       <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
//         {/* Image gallery */}
//         <div>
//           <div
//             className="relative rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-zoom-in"
//             onClick={() => openLightbox(activeImage)}
//           >
//             <img
//               src={images[activeImage]}
//               alt={product.name}
//               className="w-full h-full object-cover aspect-square"
//             />

//             {/* 🟢 Sold Out overlay on main image */}
//             {isSoldOut && (
//               <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                 <span className="text-white text-xl sm:text-2xl font-extrabold uppercase tracking-widest border-2 border-white px-6 py-2 rotate-[-8deg]">
//                   Sold Out
//                 </span>
//               </div>
//             )}
//           </div>

//           {images.length > 1 && (
//             <div className="grid grid-cols-4 gap-3 mt-3">
//               {images.slice(0, 4).map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActiveImage(index)}
//                   className={`rounded-lg overflow-hidden border-2 aspect-square ${
//                     activeImage === index
//                       ? "border-zinc-900 dark:border-zinc-50"
//                       : "border-transparent"
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`${product.name} thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Details */}
//         <div>
//           <div className="flex items-center gap-2 mb-3 flex-wrap">
//             {/* 🟢 Offer badge sirf tab dikhega jab sale expire nahi hui (ya countdown laga hi nahi) */}
//             {showOfferBadge && (
//               <span className="inline-block bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-xs font-semibold px-3 py-1 rounded-full">
//                 {product.offerText}
//               </span>
//             )}
//             {/* 🟢 Sold Out badge next to offer tag */}
//             {isSoldOut && (
//               <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                 Sold Out
//               </span>
//             )}
//           </div>

//           <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
//             {product.name}
//           </h1>
//           <p className="text-zinc-500 dark:text-zinc-400 mt-1">
//             {product.tagline}
//           </p>

//           <div className="flex items-center gap-3 mt-4">
//             {/* 🟢 Sale khatam ho chuki ho to yahan original price show hoga (agar set hai), warna normal price */}
//             <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
//               PKR {effectivePrice}
//             </span>
//             {/* 🟢 Strike-through wali purani price sirf tab dikhegi jab sale active ho */}
//             {showOriginalPriceStrike && (
//               <span className="text-base text-zinc-400 line-through">
//                 PKR {product.originalPrice}
//               </span>
//             )}
//           </div>

//           {/* 🟢 Live Countdown Timer - sirf tab dikhega jab saleEndTime set ho aur abhi khatam na hui ho */}
//           {timeLeft && timeLeft !== "expired" && (
//             <div className="mt-4 inline-flex flex-col gap-2 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-4 py-3">
//               <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
//                 ⏳ Sale khatam hone mein
//               </span>
//               <div className="flex items-center gap-2">
//                 {timeLeft.days > 0 && (
//                   <>
//                     <div className="flex flex-col items-center">
//                       <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
//                         {pad(timeLeft.days)}
//                       </span>
//                       <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">Days</span>
//                     </div>
//                     <span className="text-lg font-bold text-zinc-400">:</span>
//                   </>
//                 )}
//                 <div className="flex flex-col items-center">
//                   <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
//                     {pad(timeLeft.hours)}
//                   </span>
//                   <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">Hrs</span>
//                 </div>
//                 <span className="text-lg font-bold text-zinc-400">:</span>
//                 <div className="flex flex-col items-center">
//                   <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
//                     {pad(timeLeft.minutes)}
//                   </span>
//                   <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">Min</span>
//                 </div>
//                 <span className="text-lg font-bold text-zinc-400">:</span>
//                 <div className="flex flex-col items-center">
//                   <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
//                     {pad(timeLeft.seconds)}
//                   </span>
//                   <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">Sec</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           <p className="text-zinc-600 dark:text-zinc-300 mt-4 leading-relaxed">
//             {product.description}
//           </p>

//           {/* Qty */}
//           <div className="flex items-center gap-3 mt-6">
//             <span className="text-sm text-zinc-600 dark:text-zinc-400">
//               Quantity
//             </span>
//             <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-full overflow-hidden">
//               <button
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 disabled={isSoldOut}
//                 className="w-9 h-9 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40"
//               >
//                 −
//               </button>
//               <span className="w-8 text-center text-zinc-900 dark:text-zinc-50">
//                 {qty}
//               </span>
//               <button
//                 onClick={() => setQty((q) => q + 1)}
//                 disabled={isSoldOut}
//                 className="w-9 h-9 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Action buttons */}
//           <div className="grid grid-cols-2 gap-3 mt-6">
//             <button
//               onClick={handleAddToBag}
//               disabled={isSoldOut}
//               className="col-span-1 py-3 rounded-full border-2 border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50 font-semibold hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-50 dark:hover:text-zinc-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-zinc-900 dark:disabled:hover:text-zinc-50"
//             >
//               {isSoldOut ? "Sold Out" : "Add to Bag"}
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={isSoldOut}
//               className="col-span-1 py-3 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
//             >
//               {isSoldOut ? "Sold Out" : "Buy Now"}
//             </button>
//           </div>

          
//             <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:opacity-90 transition-opacity"
//           >
//             <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
//               <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2m0 1.67c2.24 0 4.35.87 5.93 2.46a8.23 8.23 0 0 1 2.42 5.85c0 4.56-3.72 8.28-8.31 8.28a8.3 8.3 0 0 1-4.19-1.14l-.3-.17-3.14.82.84-3.06-.19-.32a8.2 8.2 0 0 1-1.27-4.4c0-4.58 3.72-8.32 8.21-8.32M8.53 6.9c-.16 0-.43.06-.65.3-.22.24-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.16 1.72 2.7 4.2 3.7 2.07.85 2.49.68 2.94.64.45-.04 1.44-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.45-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.47Z" />
//             </svg>
//             WhatsApp Us
//           </a>

//           <button
//             onClick={handleShare}
//             className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
//           >
//             {copied ? "Link Copied!" : "Share Product"}
//           </button>

//           {/* Connect with us */}
//           <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
//             <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
//               Connect With Us
//             </h4>
//             <div className="flex gap-4">
              
//             <a    href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 text-sm"
//               >
//                 Instagram
//               </a>
              
//              <a   href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 text-sm"
//               >
//                 Facebook
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 🟢 Comments section */}
//       <div className="max-w-5xl mx-auto mt-14 pt-8 border-t border-zinc-200 dark:border-zinc-800">
//         <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-5">
//           Comments ({comments.length})
//         </h3>

//         <form onSubmit={handleCommentSubmit} className="mb-8">
//           <textarea
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             onFocus={handleCommentBoxFocus}
//             placeholder="Apna comment likhein..."
//             rows={3}
//             className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 p-4 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
//           />
//           <button
//             type="submit"
//             className="mt-3 px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity"
//           >
//             Post Comment
//           </button>
//         </form>

//         {comments.length === 0 ? (
//           <p className="text-sm text-zinc-500 dark:text-zinc-400">
//             Abhi tak koi comment nahi hai. Sabse pehle comment karein!
//           </p>
//         ) : (
//           <div className="space-y-4">
//             {comments.map((c) => (
//               <div
//                 key={c.id}
//                 className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4"
//               >
//                 <div className="flex items-center justify-between mb-1">
//                   <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">
//                     {c.userName}
//                   </span>
//                   <span className="text-xs text-zinc-400">
//                     {new Date(c.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <p className="text-sm text-zinc-600 dark:text-zinc-300">
//                   {c.text}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


























"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { addToBag, setBuyNowItem } from "../../lib/cart";
import { isLoggedIn, getCurrentUser } from "../../lib/auth";
import { getCommentsForProduct, addCommentToProduct } from "../../lib/comments";

const WHATSAPP_NUMBER = "923290010909"; // 03290010909 international format

// 🟢 Backend server ka base URL — production mein isay env variable se lena behtar hai
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// 🟢 Agar backend product ke sath apna "sizes" array na bheje to ye default sizes use hongi
const DEFAULT_SIZES = ["S", "M", "L", "XL"];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();

  // 🟢 Product ab backend API se aayega (localStorage/static hata diya)
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState("");

  // 🟢 GET /api/products/slug/:slug se product fetch karo
  React.useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const res = await fetch(`${API_BASE_URL}/api/Addproducts/slug/${params.slug}`);
        const data = await res.json();

        if (data.success) {
          setProduct(data.product);
        } else {
          setProduct(null);
          setLoadError(data.error || "Could not found product.");
        }
      } catch (err) {
        console.error("fetchProduct error:", err);
        setProduct(null);
        setLoadError("Can't connect to srver. is your server live?");
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchProduct();
    }
  }, [params.slug]);

  const [qty, setQty] = React.useState(1);
  const [copied, setCopied] = React.useState(false);
  // 🟢 Pop-up controller state
  const [showPopup, setShowPopup] = React.useState(false);

  // 🟢 Image gallery state
  const [activeImage, setActiveImage] = React.useState(0);
  const [showLightbox, setShowLightbox] = React.useState(false);
  const [isZoomed, setIsZoomed] = React.useState(false);

  // 🟢 Size selection state
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [sizeError, setSizeError] = React.useState(false);

  // 🟢 Comments state
  const [comments, setComments] = React.useState([]);
  const [commentText, setCommentText] = React.useState("");
  const [showLoginPopup, setShowLoginPopup] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  // 🟢 Countdown timer state (sale kitni der mein khatam hogi)
  const [timeLeft, setTimeLeft] = React.useState(null); // { days, hours, minutes, seconds } | "expired" | null

  // Load this product's comments whenever the product changes
  React.useEffect(() => {
    if (product) {
      setComments(getCommentsForProduct(product.slug));
    }
  }, [product]);

  // 🟢 Login status check karo mount par, aur "auth-change" event par bhi
  React.useEffect(() => {
    setLoggedIn(isLoggedIn());

    const syncAuth = () => setLoggedIn(isLoggedIn());
    window.addEventListener("auth-change", syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("auth-change", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  // 🟢 Har second countdown ko update karne wala effect
  React.useEffect(() => {
    if (!product || !product.saleEndTime) {
      setTimeLeft(null);
      return;
    }

    const endTime = new Date(product.saleEndTime).getTime();

    const tick = () => {
      const now = new Date().getTime();
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeLeft("expired");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [product]);

  // 🟢 Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
        <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  // 🟢 Product nahi mila ya API error
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
        <div className="text-center">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            {loadError || "Ye product nahi mila."}
          </p>
          <button
            onClick={() => router.push("/oversized")}
            className="text-zinc-900 dark:text-zinc-50 underline"
          >
            Collection par wapas jayein
          </button>
        </div>
      </div>
    );
  }

  // Fallback to single imageUrl if product.images array isn't provided
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.imageUrl];

  // 🟢 Sizes — backend se aayein to wahi use karo, warna default list
  const sizes =
    product.sizes && product.sizes.length > 0 ? product.sizes : DEFAULT_SIZES;

  const shareUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/products/${product.slug}`;

  const isSoldOut = !!product.soldOut;

  const isSaleExpired = !!product.saleEndTime && timeLeft === "expired";

  const effectivePrice =
    isSaleExpired && product.originalPrice ? product.originalPrice : product.price;
  const showOriginalPriceStrike = !isSaleExpired && !!product.originalPrice;
  const showOfferBadge = !isSaleExpired && !!product.offerText;

  // 🟢 Add to Bag se pehle size select hona zaroori hai
  const handleAddToBag = () => {
    if (isSoldOut) return;
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToBag({ ...product, selectedSize }, qty);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // 🟢 Buy Now se pehle bhi size select hona zaroori hai
  const handleBuyNow = () => {
    if (isSoldOut) return;
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setBuyNowItem({ ...product, selectedSize }, qty);
    router.push("/checkout");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `${product.name} — PKR ${effectivePrice}`,
          url: shareUrl,
        });
      } catch {
        // user cancelled share sheet, kuch nahi karna
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum, mujhe "${product.name}" (PKR ${effectivePrice}) k baare mein maloomat chahiye.\n${shareUrl}`
  );

  const openLightbox = (index) => {
    setActiveImage(index);
    setIsZoomed(false);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setIsZoomed(false);
  };

  const showPrevImage = () => {
    setIsZoomed(false);
    setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const showNextImage = () => {
    setIsZoomed(false);
    setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!loggedIn) {
      setShowLoginPopup(true);
      return;
    }

    if (!commentText.trim()) return;

    const user = getCurrentUser();
    const newComment = addCommentToProduct(product.slug, {
      text: commentText.trim(),
      userName: user?.name || user?.email || "Anonymous",
    });

    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  };

  const handleCommentBoxFocus = () => {
    if (!loggedIn) {
      setShowLoginPopup(true);
    }
  };

  const pad = (num) => String(num).padStart(2, "0");

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8">
      {showPopup && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 px-5 py-4 rounded-xl shadow-2xl border border-zinc-800 dark:border-zinc-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
            ✓
          </div>
          <div>
            <p className="text-sm font-semibold">Product added to bag!</p>
            <p className="text-xs opacity-80 mt-0.5">
              {product.name} ({qty} qty, Size: {selectedSize})
            </p>
          </div>
          <button
            onClick={() => setShowPopup(false)}
            className="ml-4 text-xs font-medium underline opacity-70 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {showLoginPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              Login zaroori hai
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-5">
              Comment karne ke liye pehle apne account mein login karein.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginPopup(false)}
                className="flex-1 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/signIn")}
                className="flex-1 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {showLightbox && (
        <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center px-4">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white text-3xl leading-none hover:opacity-70"
            aria-label="Close"
          >
            ×
          </button>

          {images.length > 1 && (
            <button
              onClick={showPrevImage}
              className="absolute left-3 sm:left-6 text-white text-4xl leading-none hover:opacity-70"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          <div
            className="max-w-3xl max-h-[80vh] overflow-hidden cursor-zoom-in"
            onClick={() => setIsZoomed((z) => !z)}
          >
            <img
              src={images[activeImage]}
              alt={`${product.name} ${activeImage + 1}`}
              className={`max-h-[80vh] w-auto mx-auto transition-transform duration-300 ${
                isZoomed ? "scale-[2] cursor-zoom-out" : "scale-100"
              }`}
            />
          </div>

          {images.length > 1 && (
            <button
              onClick={showNextImage}
              className="absolute right-3 sm:right-6 text-white text-4xl leading-none hover:opacity-70"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          <p className="absolute bottom-5 text-white text-xs opacity-70">
            Tap image to zoom in / out
          </p>
        </div>
      )}

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image gallery */}
        <div>
          <div
            className="relative rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-zoom-in"
            onClick={() => openLightbox(activeImage)}
          >
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover aspect-square"
            />

            {isSoldOut && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-xl sm:text-2xl font-extrabold uppercase tracking-widest border-2 border-white px-6 py-2 rotate-[-8deg]">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`rounded-lg overflow-hidden border-2 aspect-square ${
                    activeImage === index
                      ? "border-zinc-900 dark:border-zinc-50"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {showOfferBadge && (
              <span className="inline-block bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-xs font-semibold px-3 py-1 rounded-full">
                {product.offerText}
              </span>
            )}
            {isSoldOut && (
              <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Sold Out
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {product.name}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            {product.tagline}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              PKR {effectivePrice}
            </span>
            {showOriginalPriceStrike && (
              <span className="text-base text-zinc-400 line-through">
                PKR {product.originalPrice}
              </span>
            )}
          </div>

          {timeLeft && timeLeft !== "expired" && (
            <div className="mt-4 inline-flex flex-col gap-2 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-4 py-3">
              <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                ⏳ Sale khatam hone mein
              </span>
              <div className="flex items-center gap-2">
                {timeLeft.days > 0 && (
                  <>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
                        {pad(timeLeft.days)}
                      </span>
                      <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">Days</span>
                    </div>
                    <span className="text-lg font-bold text-zinc-400">:</span>
                  </>
                )}
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
                    {pad(timeLeft.hours)}
                  </span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">Hrs</span>
                </div>
                <span className="text-lg font-bold text-zinc-400">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
                    {pad(timeLeft.minutes)}
                  </span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">Min</span>
                </div>
                <span className="text-lg font-bold text-zinc-400">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
                    {pad(timeLeft.seconds)}
                  </span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">Sec</span>
                </div>
              </div>
            </div>
          )}

          <p className="text-zinc-600 dark:text-zinc-300 mt-4 leading-relaxed">
            {product.description}
          </p>

          {/* 🟢 Size selector — likha hua size dikhega, select karna zaroori hai */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Size</span>
              {sizeError && (
                <span className="text-xs text-red-500 font-medium">
                  Pehle size select karein
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  disabled={isSoldOut}
                  className={`min-w-[44px] px-3 py-2 rounded-lg border text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                    selectedSize === size
                      ? "bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 border-zinc-900 dark:border-zinc-50"
                      : "bg-transparent text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-3 mt-6">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Quantity
            </span>
            <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-full overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={isSoldOut}
                className="w-9 h-9 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40"
              >
                −
              </button>
              <span className="w-8 text-center text-zinc-900 dark:text-zinc-50">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                disabled={isSoldOut}
                className="w-9 h-9 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={handleAddToBag}
              disabled={isSoldOut}
              className="col-span-1 py-3 rounded-full border-2 border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50 font-semibold hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-50 dark:hover:text-zinc-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-zinc-900 dark:disabled:hover:text-zinc-50"
            >
              {isSoldOut ? "Sold Out" : "Add to Bag"}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isSoldOut}
              className="col-span-1 py-3 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSoldOut ? "Sold Out" : "Buy Now"}
            </button>
          </div>

          
          <a  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2m0 1.67c2.24 0 4.35.87 5.93 2.46a8.23 8.23 0 0 1 2.42 5.85c0 4.56-3.72 8.28-8.31 8.28a8.3 8.3 0 0 1-4.19-1.14l-.3-.17-3.14.82.84-3.06-.19-.32a8.2 8.2 0 0 1-1.27-4.4c0-4.58 3.72-8.32 8.21-8.32M8.53 6.9c-.16 0-.43.06-.65.3-.22.24-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.16 1.72 2.7 4.2 3.7 2.07.85 2.49.68 2.94.64.45-.04 1.44-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.45-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.47Z" />
            </svg>
            WhatsApp Us
          </a>

          <button
            onClick={handleShare}
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            {copied ? "Link Copied!" : "Share Product"}
          </button>

          {/* Connect with us */}
          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Connect With Us
            </h4>
            <div className="flex gap-4">
              
              <a  href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 text-sm"
              >
                Instagram
              </a>
              
               <a href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 text-sm"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Comments section */}
      <div className="max-w-5xl mx-auto mt-14 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-5">
          Comments ({comments.length})
        </h3>

        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onFocus={handleCommentBoxFocus}
            placeholder="Apna comment likhein..."
            rows={3}
            className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 p-4 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
          />
          <button
            type="submit"
            className="mt-3 px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity"
          >
            Post Comment
          </button>
        </form>

        {comments.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Abhi tak koi comment nahi hai. Sabse pehle comment karein!
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c.id}
                className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">
                    {c.userName}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}