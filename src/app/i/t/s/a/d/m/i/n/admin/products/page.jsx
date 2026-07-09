// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";

// const EMPTY_FORM = {
//   name: "",
//   tagline: "",
//   offerText: "",
//   price: "",
//   originalPrice: "",
//   description: "",
//   imageUrl: "", // Yeh field link aur gallery dono ka path handle karegi
//   saleEndTime: "", // sale kab tak lagegi (datetime-local)
// };

// export default function AdminProductUploadPage() {
//   const router = useRouter();

//   // Form fields state management
//   const [formData, setFormData] = React.useState(EMPTY_FORM);

//   const [message, setMessage] = React.useState("");
//   const [uploadType, setUploadType] = React.useState("link"); // 'link' or 'gallery'
//   const [products, setProducts] = React.useState([]); // Uploaded products list

//   // 🟢 Form ab default band rahega, sirf button se khulega
//   const [showForm, setShowForm] = React.useState(false);
//   // 🟢 Agar koi product edit ho raha hai to uski id yahan store hogi, warna null (naya add)
//   const [editingId, setEditingId] = React.useState(null);

//   const formTopRef = React.useRef(null);

//   // Page load hote hi localStorage se products utha lo
//   React.useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = () => {
//     const currentProducts = JSON.parse(localStorage.getItem("store_products") || "[]");
//     setProducts(currentProducts);
//   };

//   // Input change handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Local gallery image ko base64 string mein convert karne ka function
//   const handleImageFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // File size check (under 5MB for localStorage safety)
//     if (file.size > 5 * 1024 * 1024) {
//       setMessage("❌ Image size 5MB se kam hona chahiye!");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // 🟢 Naya product add karne ke liye form kholna (fresh/empty state)
//   const openAddForm = () => {
//     setEditingId(null);
//     setFormData(EMPTY_FORM);
//     setUploadType("link");
//     setMessage("");
//     setShowForm(true);
//     setTimeout(() => {
//       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 0);
//   };

//   // 🟢 Kisi existing product ko edit karne ke liye form kholna aur uska data bhar dena
//   const openEditForm = (product) => {
//     setEditingId(product.id);
//     setFormData({
//       name: product.name || "",
//       tagline: product.tagline || "",
//       offerText: product.offerText || "",
//       price: product.price !== null && product.price !== undefined ? String(product.price) : "",
//       originalPrice:
//         product.originalPrice !== null && product.originalPrice !== undefined
//           ? String(product.originalPrice)
//           : "",
//       description: product.description || "",
//       imageUrl: product.imageUrl || "",
//       saleEndTime: product.saleEndTime
//         ? new Date(product.saleEndTime).toISOString().slice(0, 16) // datetime-local input format
//         : "",
//     });
//     // Agar image link hai to "link" tab dikhayen, warna base64 hai to "gallery" tab
//     setUploadType(product.imageUrl && product.imageUrl.startsWith("data:") ? "gallery" : "link");
//     setMessage("");
//     setShowForm(true);
//     setTimeout(() => {
//       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 0);
//   };

//   // 🟢 Form band karke reset kar dena (cancel button ke liye)
//   const closeForm = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setFormData(EMPTY_FORM);
//     setMessage("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.price || !formData.imageUrl) {
//       setMessage("❌ Title, Price aur Image lazmi hain.");
//       return;
//     }

//     // Dynamic clean slug system
//     const slug = formData.name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)+/g, "");

//     // Dynamic discount percent calculator
//     let discountPercent = "";
//     const salePrice = parseFloat(formData.price);
//     const originalPrice = parseFloat(formData.originalPrice);

//     if (originalPrice && originalPrice > salePrice) {
//       const discount = ((originalPrice - salePrice) / originalPrice) * 100;
//       discountPercent = `${Math.round(discount)}% OFF`;
//     }

//     const currentProducts = JSON.parse(localStorage.getItem("store_products") || "[]");

//     // 🟢 Duplicate slug check — agar edit mode hai to khud ke record ko ignore karo
//     const duplicate = currentProducts.some(
//       (p) => p.slug === slug && p.id !== editingId
//     );
//     if (duplicate) {
//       setMessage("❌ Is title ka product pehle se majood hai!");
//       return;
//     }

//     if (editingId) {
//       // 🟢 UPDATE MODE: existing product ko naye data se replace karo
//       const updatedProducts = currentProducts.map((p) =>
//         p.id === editingId
//           ? {
//               ...p,
//               slug,
//               name: formData.name,
//               tagline: formData.tagline,
//               offerText: formData.offerText || null,
//               price: salePrice,
//               originalPrice: originalPrice || null,
//               discountPercent: discountPercent || null,
//               description: formData.description,
//               imageUrl: formData.imageUrl,
//               saleEndTime: formData.saleEndTime
//                 ? new Date(formData.saleEndTime).toISOString()
//                 : null,
//             }
//           : p
//       );
//       localStorage.setItem("store_products", JSON.stringify(updatedProducts));
//       setProducts(updatedProducts);
//       setMessage("✅ Product successfully update ho gaya!");
//     } else {
//       // Naya product add karna (payload)
//       const newProduct = {
//         id: crypto.randomUUID(),
//         slug: slug,
//         name: formData.name,
//         tagline: formData.tagline,
//         offerText: formData.offerText || null,
//         price: salePrice,
//         originalPrice: originalPrice || null,
//         discountPercent: discountPercent || null,
//         description: formData.description,
//         imageUrl: formData.imageUrl,
//         saleEndTime: formData.saleEndTime
//           ? new Date(formData.saleEndTime).toISOString()
//           : null,
//         soldOut: false,
//       };

//       currentProducts.push(newProduct);
//       localStorage.setItem("store_products", JSON.stringify(currentProducts));
//       setMessage("✅ Product successfully upload ho gaya!");
//       loadProducts();
//     }

//     setFormData(EMPTY_FORM);
//     setEditingId(null);
//     setShowForm(false);

//     setTimeout(() => setMessage(""), 3000);
//   };

//   // Kisi bhi product ko sold out / available toggle karne ka function
//   const toggleSoldOut = (id) => {
//     const currentProducts = JSON.parse(localStorage.getItem("store_products") || "[]");
//     const updatedProducts = currentProducts.map((p) =>
//       p.id === id ? { ...p, soldOut: !p.soldOut } : p
//     );
//     localStorage.setItem("store_products", JSON.stringify(updatedProducts));
//     setProducts(updatedProducts);
//   };

//   // Product delete karne ka function (list ko manage karna aasan ho jaye)
//   const deleteProduct = (id) => {
//     const currentProducts = JSON.parse(localStorage.getItem("store_products") || "[]");
//     const updatedProducts = currentProducts.filter((p) => p.id !== id);
//     localStorage.setItem("store_products", JSON.stringify(updatedProducts));
//     setProducts(updatedProducts);

//     // Agar jo product edit ho raha tha wahi delete ho gaya to form band kar do
//     if (editingId === id) {
//       closeForm();
//     }
//   };

//   // Sale end time ko readable format mein dikhane ke liye helper
//   const formatSaleEnd = (isoString) => {
//     if (!isoString) return null;
//     const date = new Date(isoString);
//     return date.toLocaleString("en-PK", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
//       <div ref={formTopRef} className="max-w-xl mx-auto">
//         {/* 🟢 Agar form band hai to sirf "Add Product" button dikhega */}
//         {!showForm && (
//           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
//             <div>
//               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Store Dashboard</h2>
//               <p className="text-xs text-zinc-500 dark:text-zinc-400">Naya product upload karein jo pure application par synced ho jaye.</p>
//             </div>
//             <button
//               type="button"
//               onClick={openAddForm}
//               className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
//             >
//               + Add Product
//             </button>
//           </div>
//         )}

//         {/* 🟢 Form sirf tab dikhega jab showForm true ho */}
//         {showForm && (
//           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
//             <div className="flex items-start justify-between mb-1">
//               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
//                 {editingId ? "Edit Product" : "Store Dashboard"}
//               </h2>
//               <button
//                 type="button"
//                 onClick={closeForm}
//                 className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
//               >
//                 Close ✕
//               </button>
//             </div>
//             <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
//               {editingId
//                 ? "Product ki details update karein."
//                 : "Naya product upload karein jo pure application par synced ho jaye."}
//             </p>

//             {message && (
//               <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
//                 {message}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Offer Badge / Tag (Optional)</label>
//                 <input type="text" name="offerText" value={formData.offerText} onChange={handleChange} placeholder="e.g. 🔥 Best Seller, Normal Routine" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Product Title *</label>
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Classic Charcoal Hoodie" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Chota Title / Tagline</label>
//                 <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g. Perfect fleece warmth for winter" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Selling Price (PKR) *</label>
//                   <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="1899" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Original Price (PKR)</label>
//                   <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="2999" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//                 </div>
//               </div>

//               {/* Sale End Time field - agar is product par sale lagi hai to kab tak lagegi */}
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
//                   Sale Kab Tak Lagegi? (Optional)
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="saleEndTime"
//                   value={formData.saleEndTime}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
//                 />
//                 <p className="text-[10px] text-zinc-400 mt-1">
//                   Ye time countdown timer ke liye use hoga (jahan reverse mein time khatam hote dikhega). Khali chor dein agar sale nahi hai.
//                 </p>
//               </div>

//               {/* Image Upload Options Toggle Tabs */}
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
//                 <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
//                   <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
//                   <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
//                 </div>

//                 {uploadType === "link" ? (
//                   <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste Unsplash image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//                 ) : (
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
//                       <div className="flex flex-col items-center justify-center pt-3 pb-4">
//                         <p className="text-xs text-zinc-500 dark:text-zinc-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                         <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
//                       </div>
//                       <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
//                     </label>
//                   </div>
//                 )}
//                 {formData.imageUrl && (
//                   <div className="mt-3 relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
//                     <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Full Description</label>
//                 <textarea name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Soft brushed fleece interior with a relaxed silhouette..." className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500 resize-none" />
//               </div>

//               <div className="flex gap-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={closeForm}
//                   className="flex-1 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity"
//                 >
//                   {editingId ? "Update Product" : "Upload Product"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Uploaded Products List Section */}
//       <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
//         <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded Products</h3>
//         <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
//           Total {products.length} product{products.length !== 1 ? "s" : ""}. Yahan se edit, sold out mark ya delete kar sakte hain.
//         </p>

//         {products.length === 0 ? (
//           <p className="text-sm text-zinc-400 text-center py-6">Abhi tak koi product upload nahi hua.</p>
//         ) : (
//           <div className="space-y-3">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
//                   editingId === product.id
//                     ? "border-zinc-900 dark:border-zinc-50"
//                     : "border-zinc-200 dark:border-zinc-800"
//                 }`}
//               >
//                 <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
//                   <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
//                   {product.soldOut && (
//                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                       <span className="text-[8px] font-bold text-white uppercase">Sold Out</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{product.name}</p>
//                   <p className="text-xs text-zinc-500 dark:text-zinc-400">
//                     Rs. {product.price}
//                     {product.discountPercent ? ` • ${product.discountPercent}` : ""}
//                   </p>
//                   {product.saleEndTime && (
//                     <p className="text-[10px] text-zinc-400 mt-0.5">
//                       ⏳ Sale khatam: {formatSaleEnd(product.saleEndTime)}
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex flex-col gap-1.5 shrink-0">
//                   <button
//                     type="button"
//                     onClick={() => openEditForm(product)}
//                     className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => toggleSoldOut(product.id)}
//                     className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors ${
//                       product.soldOut
//                         ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
//                         : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
//                     }`}
//                   >
//                     {product.soldOut ? "Mark Available" : "Mark Sold Out"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => deleteProduct(product.id)}
//                     className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

























// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";

// // 🟢 Backend server ka base URL — production mein isay env variable se lena behtar hai
// // (.env.local mein NEXT_PUBLIC_API_URL=https://your-backend.com daal kar)
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// const EMPTY_FORM = {
//   name: "",
//   tagline: "",
//   offerText: "",
//   price: "",
//   originalPrice: "",
//   description: "",
//   imageUrl: "", // Yeh field link aur gallery dono ka path handle karegi
//   saleEndTime: "", // sale kab tak lagegi (datetime-local)
// };

// export default function AdminProductUploadPage() {
//   const router = useRouter();

//   // Form fields state management
//   const [formData, setFormData] = React.useState(EMPTY_FORM);

//   const [message, setMessage] = React.useState("");
//   const [uploadType, setUploadType] = React.useState("link"); // 'link' or 'gallery'
//   const [products, setProducts] = React.useState([]); // Backend se aaye hue products
//   const [loadingProducts, setLoadingProducts] = React.useState(true);
//   const [submitting, setSubmitting] = React.useState(false);
//   // Har product row ke liye alag se loading track karo (jab uska koi action chal raha ho)
//   const [rowActionId, setRowActionId] = React.useState(null);

//   // Form ab default band rahega, sirf button se khulega
//   const [showForm, setShowForm] = React.useState(false);
//   // Agar koi product edit ho raha hai to uski id (backend _id) yahan store hogi, warna null (naya add)
//   const [editingId, setEditingId] = React.useState(null);

//   const formTopRef = React.useRef(null);

//   // 🟢 Page load hote hi backend se products fetch karo
//   React.useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     setLoadingProducts(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/Addproducts`);
//       const data = await res.json();
//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         setMessage("❌ Products load nahi ho sake.");
//       }
//     } catch (err) {
//       console.error("loadProducts error:", err);
//       setMessage("❌ can't connect to server. Is backend live?");
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   // Input change handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Local gallery image ko base64 string mein convert karne ka function
//   const handleImageFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // File size check (under 5MB safety — API JSON body ke liye bhi sensible limit)
//     if (file.size > 5 * 1024 * 1024) {
//       setMessage("❌ Image size 5MB se kam hona chahiye!");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // Naya product add karne ke liye form kholna (fresh/empty state)
//   const openAddForm = () => {
//     setEditingId(null);
//     setFormData(EMPTY_FORM);
//     setUploadType("link");
//     setMessage("");
//     setShowForm(true);
//     setTimeout(() => {
//       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 0);
//   };

//   // Kisi existing product ko edit karne ke liye form kholna aur uska data bhar dena
//   const openEditForm = (product) => {
//     setEditingId(product._id);
//     setFormData({
//       name: product.name || "",
//       tagline: product.tagline || "",
//       offerText: product.offerText || "",
//       price: product.price !== null && product.price !== undefined ? String(product.price) : "",
//       originalPrice:
//         product.originalPrice !== null && product.originalPrice !== undefined
//           ? String(product.originalPrice)
//           : "",
//       description: product.description || "",
//       imageUrl: product.imageUrl || "",
//       saleEndTime: product.saleEndTime
//         ? new Date(product.saleEndTime).toISOString().slice(0, 16) // datetime-local input format
//         : "",
//     });
//     // Agar image link hai to "link" tab dikhayen, warna base64 hai to "gallery" tab
//     setUploadType(product.imageUrl && product.imageUrl.startsWith("data:") ? "gallery" : "link");
//     setMessage("");
//     setShowForm(true);
//     setTimeout(() => {
//       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 0);
//   };

//   // Form band karke reset kar dena (cancel button ke liye)
//   const closeForm = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setFormData(EMPTY_FORM);
//     setMessage("");
//   };

//   // 🟢 Submit ab backend API ko call karta hai (localStorage ki jagah)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.price || !formData.imageUrl) {
//       setMessage("❌ Title, Price aur Image lazmi hain.");
//       return;
//     }

//     setSubmitting(true);
//     setMessage("");

//     const payload = {
//       name: formData.name,
//       tagline: formData.tagline,
//       offerText: formData.offerText || null,
//       price: formData.price,
//       originalPrice: formData.originalPrice || null,
//       description: formData.description,
//       imageUrl: formData.imageUrl,
//       saleEndTime: formData.saleEndTime || null,
//     };

//     try {
//       let res;
//       if (editingId) {
//         // UPDATE MODE
//         res = await fetch(`${API_BASE_URL}/api/Addproducts/${editingId}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       } else {
//         // CREATE MODE
//         res = await fetch(`${API_BASE_URL}/api/Addproducts`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       }

//       const data = await res.json();

//       if (!data.success) {
//         setMessage(`❌ ${data.error || "Kuch ghalat ho gaya."}`);
//         setSubmitting(false);
//         return;
//       }

//       setMessage(editingId ? "✅ Product successfully update ho gaya!" : "✅ Product has been successfully upload!");

//       setFormData(EMPTY_FORM);
//       setEditingId(null);
//       setShowForm(false);

//       await loadProducts(); // List backend se refresh karo taake sab jagah sync rahe

//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error("handleSubmit error:", err);
//       setMessage("❌ Server se connect nahi ho saka. Kya backend chal raha hai?");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // 🟢 Sold out / available toggle — ab backend PATCH endpoint use karta hai
//   const toggleSoldOut = async (id) => {
//     setRowActionId(id);
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/Addproducts/${id}/sold-out`, {
//         method: "PATCH",
//       });
//       const data = await res.json();
//       if (data.success) {
//         setProducts((prev) => prev.map((p) => (p._id === id ? data.product : p)));
//       } else {
//         setMessage(`❌ ${data.error || "Status update nahi ho saka."}`);
//       }
//     } catch (err) {
//       console.error("toggleSoldOut error:", err);
//       setMessage("❌ Server se connect nahi ho saka.");
//     } finally {
//       setRowActionId(null);
//     }
//   };

//   // 🟢 Product delete — ab backend DELETE endpoint use karta hai
//   const deleteProduct = async (id) => {
//     setRowActionId(id);
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/Addproducts/${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success) {
//         setProducts((prev) => prev.filter((p) => p._id !== id));
//         // Agar jo product edit ho raha tha wahi delete ho gaya to form band kar do
//         if (editingId === id) {
//           closeForm();
//         }
//       } else {
//         setMessage(`❌ ${data.error || "Product delete nahi ho saka."}`);
//       }
//     } catch (err) {
//       console.error("deleteProduct error:", err);
//       setMessage("❌ Server se connect nahi ho saka.");
//     } finally {
//       setRowActionId(null);
//     }
//   };

//   // Sale end time ko readable format mein dikhane ke liye helper
//   const formatSaleEnd = (isoString) => {
//     if (!isoString) return null;
//     const date = new Date(isoString);
//     return date.toLocaleString("en-PK", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
//       <div ref={formTopRef} className="max-w-xl mx-auto">
//         {/* Agar form band hai to sirf "Add Product" button dikhega */}
//         {!showForm && (
//           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
//             <div>
//               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Store Dashboard</h2>
//               <p className="text-xs text-zinc-500 dark:text-zinc-400">Naya product upload karein jo pure application par synced ho jaye.</p>
//             </div>
//             <button
//               type="button"
//               onClick={openAddForm}
//               className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
//             >
//               + Add Product
//             </button>
//           </div>
//         )}

//         {/* Form sirf tab dikhega jab showForm true ho */}
//         {showForm && (
//           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
//             <div className="flex items-start justify-between mb-1">
//               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
//                 {editingId ? "Edit Product" : "Store Dashboard"}
//               </h2>
//               <button
//                 type="button"
//                 onClick={closeForm}
//                 className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
//               >
//                 Close ✕
//               </button>
//             </div>
//             <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
//               {editingId
//                 ? "Product ki details update karein."
//                 : "Naya product upload karein jo pure application par synced ho jaye."}
//             </p>

//             {message && (
//               <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
//                 {message}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Offer Badge / Tag (Optional)</label>
//                 <input type="text" name="offerText" value={formData.offerText} onChange={handleChange} placeholder="e.g. 🔥 Best Seller, Normal Routine" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Product Title *</label>
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Classic Charcoal Hoodie" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Chota Title / Tagline</label>
//                 <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g. Perfect fleece warmth for winter" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Selling Price (PKR) *</label>
//                   <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="1899" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Original Price (PKR)</label>
//                   <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="2999" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//                 </div>
//               </div>

//               {/* Sale End Time field - agar is product par sale lagi hai to kab tak lagegi */}
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
//                   Sale Kab Tak Lagegi? (Optional)
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="saleEndTime"
//                   value={formData.saleEndTime}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
//                 />
//                 <p className="text-[10px] text-zinc-400 mt-1">
//                   Ye time countdown timer ke liye use hoga (jahan reverse mein time khatam hote dikhega). Khali chor dein agar sale nahi hai.
//                 </p>
//               </div>

//               {/* Image Upload Options Toggle Tabs */}
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
//                 <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
//                   <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
//                   <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
//                 </div>

//                 {uploadType === "link" ? (
//                   <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste Unsplash image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//                 ) : (
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
//                       <div className="flex flex-col items-center justify-center pt-3 pb-4">
//                         <p className="text-xs text-zinc-500 dark:text-zinc-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                         <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
//                       </div>
//                       <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
//                     </label>
//                   </div>
//                 )}
//                 {formData.imageUrl && (
//                   <div className="mt-3 relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
//                     <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Full Description</label>
//                 <textarea name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Soft brushed fleece interior with a relaxed silhouette..." className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500 resize-none" />
//               </div>

//               <div className="flex gap-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={closeForm}
//                   disabled={submitting}
//                   className="flex-1 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
//                 >
//                   {submitting
//                     ? editingId
//                       ? "Updating..."
//                       : "Uploading..."
//                     : editingId
//                     ? "Update Product"
//                     : "Upload Product"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Uploaded Products List Section */}
//       <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
//         <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded Products</h3>
//         <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
//           Total {products.length} product{products.length !== 1 ? "s" : ""}. Yahan se edit, sold out mark ya delete kar sakte hain.
//         </p>

//         {/* Form ke bahar aane wala message bhi yahan dikhado (list load errors ke liye) */}
//         {!showForm && message && (
//           <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
//             {message}
//           </div>
//         )}

//         {loadingProducts ? (
//           <p className="text-sm text-zinc-400 text-center py-6">Products load ho rahe hain...</p>
//         ) : products.length === 0 ? (
//           <p className="text-sm text-zinc-400 text-center py-6">Abhi tak koi product upload nahi hua.</p>
//         ) : (
//           <div className="space-y-3">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
//                   editingId === product._id
//                     ? "border-zinc-900 dark:border-zinc-50"
//                     : "border-zinc-200 dark:border-zinc-800"
//                 }`}
//               >
//                 <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
//                   <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
//                   {product.soldOut && (
//                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                       <span className="text-[8px] font-bold text-white uppercase">Sold Out</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{product.name}</p>
//                   <p className="text-xs text-zinc-500 dark:text-zinc-400">
//                     Rs. {product.price}
//                     {product.discountPercent ? ` • ${product.discountPercent}` : ""}
//                   </p>
//                   {product.saleEndTime && (
//                     <p className="text-[10px] text-zinc-400 mt-0.5">
//                       ⏳ Sale khatam: {formatSaleEnd(product.saleEndTime)}
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex flex-col gap-1.5 shrink-0">
//                   <button
//                     type="button"
//                     onClick={() => openEditForm(product)}
//                     disabled={rowActionId === product._id}
//                     className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors disabled:opacity-50"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => toggleSoldOut(product._id)}
//                     disabled={rowActionId === product._id}
//                     className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors disabled:opacity-50 ${
//                       product.soldOut
//                         ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
//                         : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
//                     }`}
//                   >
//                     {rowActionId === product._id
//                       ? "..."
//                       : product.soldOut
//                       ? "Mark Available"
//                       : "Mark Sold Out"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => deleteProduct(product._id)}
//                     disabled={rowActionId === product._id}
//                     className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
//                   >
//                     {rowActionId === product._id ? "..." : "Delete"}
//                   </button>
//                 </div>
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
import { useRouter } from "next/navigation";

// 🟢 Backend server ka base URL — production mein isay env variable se lena behtar hai
// (.env.local mein NEXT_PUBLIC_API_URL=https://your-backend.com daal kar)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const EMPTY_FORM = {
  name: "",
  tagline: "",
  offerText: "",
  price: "",
  originalPrice: "",
  description: "",
  imageUrl: "", // Yeh field link aur Cloudinary upload dono ka URL handle karegi
  saleEndTime: "", // sale kab tak lagegi (datetime-local)
};

export default function AdminProductUploadPage() {
  const router = useRouter();

  // Form fields state management
  const [formData, setFormData] = React.useState(EMPTY_FORM);

  const [message, setMessage] = React.useState("");
  const [uploadType, setUploadType] = React.useState("link"); // 'link' or 'gallery'
  const [products, setProducts] = React.useState([]); // Backend se aaye hue products
  const [loadingProducts, setLoadingProducts] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  // 🟢 Gallery image Cloudinary par upload ho rahi hai jab tak, ye true rahega
  const [uploadingImage, setUploadingImage] = React.useState(false);
  // Har product row ke liye alag se loading track karo (jab uska koi action chal raha ho)
  const [rowActionId, setRowActionId] = React.useState(null);

  // Form ab default band rahega, sirf button se khulega
  const [showForm, setShowForm] = React.useState(false);
  // Agar koi product edit ho raha hai to uski id (backend _id) yahan store hogi, warna null (naya add)
  const [editingId, setEditingId] = React.useState(null);

  const formTopRef = React.useRef(null);

  // 🟢 Page load hote hi backend se products fetch karo
  React.useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/Addproducts`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setMessage("❌ Products load nahi ho sake.");
      }
    } catch (err) {
      console.error("loadProducts error:", err);
      setMessage("❌ can't connect to server. Is backend live?");
    } finally {
      setLoadingProducts(false);
    }
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟢 Gallery image ab base64 ki bajaye seedha backend (Cloudinary) ko upload hoti hai
  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size check (5MB se zyada allow nahi)
    if (file.size > 5 * 1024 * 1024) {
      setMessage("❌ Image size 5MB se kam hona chahiye!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    setUploadingImage(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: uploadData, // Content-Type manually set nahi karna — browser khud multipart boundary set karega
      });
      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
      } else {
        setMessage(`❌ ${data.error || "Image upload nahi ho saka."}`);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setMessage("❌ Image upload fail ho gaya. Internet/server check karein.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Naya product add karne ke liye form kholna (fresh/empty state)
  const openAddForm = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setUploadType("link");
    setMessage("");
    setShowForm(true);
    setTimeout(() => {
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  // Kisi existing product ko edit karne ke liye form kholna aur uska data bhar dena
  const openEditForm = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || "",
      tagline: product.tagline || "",
      offerText: product.offerText || "",
      price: product.price !== null && product.price !== undefined ? String(product.price) : "",
      originalPrice:
        product.originalPrice !== null && product.originalPrice !== undefined
          ? String(product.originalPrice)
          : "",
      description: product.description || "",
      imageUrl: product.imageUrl || "",
      saleEndTime: product.saleEndTime
        ? new Date(product.saleEndTime).toISOString().slice(0, 16) // datetime-local input format
        : "",
    });
    // Agar image Cloudinary/link URL hai to "link" tab dikhayen (ab base64 wala case nahi bachta)
    setUploadType("link");
    setMessage("");
    setShowForm(true);
    setTimeout(() => {
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  // Form band karke reset kar dena (cancel button ke liye)
  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setMessage("");
  };

  // 🟢 Submit backend API ko call karta hai
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.imageUrl) {
      setMessage("❌ Title, Price aur Image lazmi hain.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const payload = {
      name: formData.name,
      tagline: formData.tagline,
      offerText: formData.offerText || null,
      price: formData.price,
      originalPrice: formData.originalPrice || null,
      description: formData.description,
      imageUrl: formData.imageUrl,
      saleEndTime: formData.saleEndTime || null,
    };

    try {
      let res;
      if (editingId) {
        // UPDATE MODE
        res = await fetch(`${API_BASE_URL}/api/Addproducts/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // CREATE MODE
        res = await fetch(`${API_BASE_URL}/api/Addproducts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (!data.success) {
        setMessage(`❌ ${data.error || "Kuch ghalat ho gaya."}`);
        setSubmitting(false);
        return;
      }

      setMessage(editingId ? "✅ Product successfully update ho gaya!" : "✅ Product has been successfully upload!");

      setFormData(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);

      await loadProducts(); // List backend se refresh karo taake sab jagah sync rahe

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("handleSubmit error:", err);
      setMessage("❌ Server se connect nahi ho saka. Kya backend chal raha hai?");
    } finally {
      setSubmitting(false);
    }
  };

  // 🟢 Sold out / available toggle
  const toggleSoldOut = async (id) => {
    setRowActionId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/Addproducts/${id}/sold-out`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.map((p) => (p._id === id ? data.product : p)));
      } else {
        setMessage(`❌ ${data.error || "Status update nahi ho saka."}`);
      }
    } catch (err) {
      console.error("toggleSoldOut error:", err);
      setMessage("❌ Server se connect nahi ho saka.");
    } finally {
      setRowActionId(null);
    }
  };

  // 🟢 Product delete
  const deleteProduct = async (id) => {
    setRowActionId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/Addproducts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        if (editingId === id) {
          closeForm();
        }
      } else {
        setMessage(`❌ ${data.error || "Product delete nahi ho saka."}`);
      }
    } catch (err) {
      console.error("deleteProduct error:", err);
      setMessage("❌ Server se connect nahi ho saka.");
    } finally {
      setRowActionId(null);
    }
  };

  // Sale end time ko readable format mein dikhane ke liye helper
  const formatSaleEnd = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return date.toLocaleString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div ref={formTopRef} className="max-w-xl mx-auto">
        {/* Agar form band hai to sirf "Add Product" button dikhega */}
        {!showForm && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Store Dashboard</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Naya product upload karein jo pure application par synced ho jaye.</p>
            </div>
            <button
              type="button"
              onClick={openAddForm}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              + Add Product
            </button>
          </div>
        )}

        {/* Form sirf tab dikhega jab showForm true ho */}
        {showForm && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {editingId ? "Edit Product" : "Store Dashboard"}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Close ✕
              </button>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              {editingId
                ? "Product ki details update karein."
                : "Naya product upload karein jo pure application par synced ho jaye."}
            </p>

            {message && (
              <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Offer Badge / Tag (Optional)</label>
                <input type="text" name="offerText" value={formData.offerText} onChange={handleChange} placeholder="e.g. 🔥 Best Seller, Normal Routine" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Product Title *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Classic Charcoal Hoodie" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Chota Title / Tagline</label>
                <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g. Perfect fleece warmth for winter" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Selling Price (PKR) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="1899" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Original Price (PKR)</label>
                  <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="2999" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
                </div>
              </div>

              {/* Sale End Time field - agar is product par sale lagi hai to kab tak lagegi */}
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Sale Kab Tak Lagegi? (Optional)
                </label>
                <input
                  type="datetime-local"
                  name="saleEndTime"
                  value={formData.saleEndTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
                <p className="text-[10px] text-zinc-400 mt-1">
                  Ye time countdown timer ke liye use hoga (jahan reverse mein time khatam hote dikhega). Khali chor dein agar sale nahi hai.
                </p>
              </div>

              {/* Image Upload Options Toggle Tabs */}
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
                <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
                  <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
                  <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
                </div>

                {uploadType === "link" ? (
                  <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste Unsplash image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${uploadingImage ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
                      <div className="flex flex-col items-center justify-center pt-3 pb-4">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {uploadingImage ? (
                            <span className="font-semibold">Uploading...</span>
                          ) : (
                            <>
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </>
                          )}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {formData.imageUrl && (
                  <div className="mt-3 relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Full Description</label>
                <textarea name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Soft brushed fleece interior with a relaxed silhouette..." className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500 resize-none" />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submitting
                    ? editingId
                      ? "Updating..."
                      : "Uploading..."
                    : editingId
                    ? "Update Product"
                    : "Upload Product"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Uploaded Products List Section */}
      <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded Products</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
          Total {products.length} product{products.length !== 1 ? "s" : ""}. Yahan se edit, sold out mark ya delete kar sakte hain.
        </p>

        {/* Form ke bahar aane wala message bhi yahan dikhado (list load errors ke liye) */}
        {!showForm && message && (
          <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
            {message}
          </div>
        )}

        {loadingProducts ? (
          <p className="text-sm text-zinc-400 text-center py-6">Products load ho rahe hain...</p>
        ) : products.length === 0 ? (
          <p className="text-sm text-zinc-400 text-center py-6">Abhi tak koi product upload nahi hua.</p>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product._id}
                className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
                  editingId === product._id
                    ? "border-zinc-900 dark:border-zinc-50"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  {product.soldOut && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white uppercase">Sold Out</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{product.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Rs. {product.price}
                    {product.discountPercent ? ` • ${product.discountPercent}` : ""}
                  </p>
                  {product.saleEndTime && (
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      ⏳ Sale khatam: {formatSaleEnd(product.saleEndTime)}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEditForm(product)}
                    disabled={rowActionId === product._id}
                    className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleSoldOut(product._id)}
                    disabled={rowActionId === product._id}
                    className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                      product.soldOut
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    }`}
                  >
                    {rowActionId === product._id
                      ? "..."
                      : product.soldOut
                      ? "Mark Available"
                      : "Mark Sold Out"}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProduct(product._id)}
                    disabled={rowActionId === product._id}
                    className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
                  >
                    {rowActionId === product._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}