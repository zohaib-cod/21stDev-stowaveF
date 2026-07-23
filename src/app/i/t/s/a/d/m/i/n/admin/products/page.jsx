// // "use client";

// // import * as React from "react";
// // import { useRouter } from "next/navigation";


// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // const EMPTY_FORM = {
// //   name: "",
// //   tagline: "",
// //   offerText: "",
// //   price: "",
// //   originalPrice: "",
// //   description: "",
// //   imageUrl: "", // Yeh field link aur Cloudinary upload dono ka URL handle karegi
// //   saleEndTime: "", // sale kab tak lagegi (datetime-local)
// // };

// // export default function AdminProductUploadPage() {
// //   const router = useRouter();

// //   // Form fields state management
// //   const [formData, setFormData] = React.useState(EMPTY_FORM);

// //   const [message, setMessage] = React.useState("");
// //   const [uploadType, setUploadType] = React.useState("link"); // 'link' or 'gallery'
// //   const [products, setProducts] = React.useState([]); // Backend se aaye hue products
// //   const [loadingProducts, setLoadingProducts] = React.useState(true);
// //   const [submitting, setSubmitting] = React.useState(false);
// //   // 🟢 Gallery image Cloudinary par upload ho rahi hai jab tak, ye true rahega
// //   const [uploadingImage, setUploadingImage] = React.useState(false);
// //   // Har product row ke liye alag se loading track karo (jab uska koi action chal raha ho)
// //   const [rowActionId, setRowActionId] = React.useState(null);

// //   // Form ab default band rahega, sirf button se khulega
// //   const [showForm, setShowForm] = React.useState(false);
// //   // Agar koi product edit ho raha hai to uski id (backend _id) yahan store hogi, warna null (naya add)
// //   const [editingId, setEditingId] = React.useState(null);

// //   const formTopRef = React.useRef(null);

// //   // 🟢 Page load hote hi backend se products fetch karo
// //   React.useEffect(() => {
// //     loadProducts();
// //   }, []);

// //   const loadProducts = async () => {
// //     setLoadingProducts(true);
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/api/Addproducts`);
// //       const data = await res.json();
// //       if (data.success) {
// //         setProducts(data.products);
// //       } else {
// //         setMessage("❌ Can't load  Products. Please check your internet connection or reload page!");
// //       }
// //     } catch (err) {
// //       console.error("loadProducts error:", err);
// //       setMessage("❌ can't connect to server. please check your internet connection or reload page!");
// //     } finally {
// //       setLoadingProducts(false);
// //     }
// //   };

// //   // Input change handler
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // 🟢 Gallery image ab base64 ki bajaye seedha backend (Cloudinary) ko upload hoti hai
// //   const handleImageFileChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     // File size check (5MB se zyada allow nahi)
// //     if (file.size > 5 * 1024 * 1024) {
// //       setMessage("❌ Image size should minimum 5MB!");
// //       return;
// //     }

// //     const uploadData = new FormData();
// //     uploadData.append("image", file);

// //     setUploadingImage(true);
// //     setMessage("");

// //     try {
// //       const res = await fetch(`${API_BASE_URL}/api/upload`, {
// //         method: "POST",
// //         body: uploadData,
// //       });
// //       const data = await res.json();

// //       if (data.success) {
// //         setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
// //       } else {
// //         setMessage(`❌ ${data.error || "Image could not  upload."}`);
// //       }
// //     } catch (err) {
// //       console.error("Image upload error:", err);
// //       setMessage("❌ Image upload failed. Please Check your internet.");
// //     } finally {
// //       setUploadingImage(false);
// //     }
// //   };

// //   const openAddForm = () => {
// //     setEditingId(null);
// //     setFormData(EMPTY_FORM);
// //     setUploadType("link");
// //     setMessage("");
// //     setShowForm(true);
// //     setTimeout(() => {
// //       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// //     }, 0);
// //   };

// //   const openEditForm = (product) => {
// //     setEditingId(product._id);
// //     setFormData({
// //       name: product.name || "",
// //       tagline: product.tagline || "",
// //       offerText: product.offerText || "",
// //       price: product.price !== null && product.price !== undefined ? String(product.price) : "",
// //       originalPrice:
// //         product.originalPrice !== null && product.originalPrice !== undefined
// //           ? String(product.originalPrice)
// //           : "",
// //       description: product.description || "",
// //       imageUrl: product.imageUrl || "",
// //       saleEndTime: product.saleEndTime
// //         ? new Date(product.saleEndTime).toISOString().slice(0, 16) 
// //         : "",
// //     });
// //     setUploadType("link");
// //     setMessage("");
// //     setShowForm(true);
// //     setTimeout(() => {
// //       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// //     }, 0);
// //   };

// //   const closeForm = () => {
// //     setShowForm(false);
// //     setEditingId(null);
// //     setFormData(EMPTY_FORM);
// //     setMessage("");
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.name || !formData.price || !formData.imageUrl) {
// //       setMessage("❌ Title, Price & Image are require.");
// //       return;
// //     }

// //     setSubmitting(true);
// //     setMessage("");

// //     const payload = {
// //       name: formData.name,
// //       tagline: formData.tagline,
// //       offerText: formData.offerText || null,
// //       price: formData.price,
// //       originalPrice: formData.originalPrice || null,
// //       description: formData.description,
// //       imageUrl: formData.imageUrl,
// //       saleEndTime: formData.saleEndTime || null,
// //     };

// //     try {
// //       let res;
// //       if (editingId) {
// //         // UPDATE MODE
// //         res = await fetch(`${API_BASE_URL}/api/Addproducts/${editingId}`, {
// //           method: "PUT",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify(payload),
// //         });
// //       } else {
// //         // CREATE MODE
// //         res = await fetch(`${API_BASE_URL}/api/Addproducts`, {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify(payload),
// //         });
// //       }

// //       const data = await res.json();

// //       if (!data.success) {
// //         setMessage(`❌ ${data.error || "Something went wrong."}`);
// //         setSubmitting(false);
// //         return;
// //       }

// //       setMessage(editingId ? "✅ Your product successfully updated!" : "✅ Product has been successfully upload!");

// //       setFormData(EMPTY_FORM);
// //       setEditingId(null);
// //       setShowForm(false);

// //       await loadProducts(); 

// //       setTimeout(() => setMessage(""), 3000);
// //     } catch (err) {
// //       console.error("handleSubmit error:", err);
// //       setMessage("❌ Can't connect to server. Please check your internet or reload page!");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const toggleSoldOut = async (id) => {
// //     setRowActionId(id);
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/api/Addproducts/${id}/sold-out`, {
// //         method: "PATCH",
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         setProducts((prev) => prev.map((p) => (p._id === id ? data.product : p)));
// //       } else {
// //         setMessage(`❌ ${data.error || "Could not update status."}`);
// //       }
// //     } catch (err) {
// //       console.error("toggleSoldOut error:", err);
// //       setMessage("❌ Can't connect to server.");
// //     } finally {
// //       setRowActionId(null);
// //     }
// //   };

// //   // 🟢 Product delete
// //   const deleteProduct = async (id) => {
// //     setRowActionId(id);
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/api/Addproducts/${id}`, {
// //         method: "DELETE",
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         setProducts((prev) => prev.filter((p) => p._id !== id));
// //         if (editingId === id) {
// //           closeForm();
// //         }
// //       } else {
// //         setMessage(`❌ ${data.error || "Product could not deleted."}`);
// //       }
// //     } catch (err) {
// //       console.error("deleteProduct error:", err);
// //       setMessage("❌ Could not connect to server.");
// //     } finally {
// //       setRowActionId(null);
// //     }
// //   };

// //   const formatSaleEnd = (isoString) => {
// //     if (!isoString) return null;
// //     const date = new Date(isoString);
// //     return date.toLocaleString("en-PK", {
// //       day: "2-digit",
// //       month: "short",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
// //       <div ref={formTopRef} className="max-w-xl mx-auto">
// //         {/* Agar form band hai to sirf "Add Product" button dikhega */}
// //         {!showForm && (
// //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
// //             <div>
// //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Store Dashboard</h2>
// //               <p className="text-xs text-zinc-500 dark:text-zinc-400">Upload a new product.</p>
// //             </div>
// //             <button
// //               type="button"
// //               onClick={openAddForm}
// //               className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
// //             >
// //               + Add Product
// //             </button>
// //           </div>
// //         )}

// //         {/* Form sirf tab dikhega jab showForm true ho */}
// //         {showForm && (
// //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
// //             <div className="flex items-start justify-between mb-1">
// //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
// //                 {editingId ? "Edit Product" : "Store Dashboard"}
// //               </h2>
// //               <button
// //                 type="button"
// //                 onClick={closeForm}
// //                 className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
// //               >
// //                 Close ✕
// //               </button>
// //             </div>
// //             <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
// //               {editingId
// //                 ? "Update new produc details."
// //                 : "Upload new product."}
// //             </p>

// //             {message && (
// //               <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
// //                 {message}
// //               </div>
// //             )}

// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div>
// //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Offer Badge / Tag (Optional)</label>
// //                 <input type="text" name="offerText" value={formData.offerText} onChange={handleChange} placeholder="e.g. 🔥 Best Seller, Normal Routine" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Product Title *</label>
// //                 <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Classic Charcoal Hoodie" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Second Title / Tagline</label>
// //                 <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g. Perfect fleece warmth for winter" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
// //               </div>

// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Selling Price (PKR) *</label>
// //                   <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="1899" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
// //                 </div>
// //                 <div>
// //                   <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Original Price (PKR)</label>
// //                   <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="2999" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
// //                   sale duration? (Optional)
// //                 </label>
// //                 <input
// //                   type="datetime-local"
// //                   name="saleEndTime"
// //                   value={formData.saleEndTime}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
// //                 />
// //                 <p className="text-[10px] text-zinc-400 mt-1">
// //                   This is use fot countdown, Leave this option if there is no sale 
// //                 </p>
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
// //                 <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
// //                   <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
// //                   <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
// //                 </div>

// //                 {uploadType === "link" ? (
// //                   <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste Unsplash image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
// //                 ) : (
// //                   <div className="flex items-center justify-center w-full">
// //                     <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${uploadingImage ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
// //                       <div className="flex flex-col items-center justify-center pt-3 pb-4">
// //                         <p className="text-xs text-zinc-500 dark:text-zinc-400">
// //                           {uploadingImage ? (
// //                             <span className="font-semibold">Uploading...</span>
// //                           ) : (
// //                             <>
// //                               <span className="font-semibold">Click to upload</span> or drag and drop
// //                             </>
// //                           )}
// //                         </p>
// //                         <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
// //                       </div>
// //                       <input
// //                         type="file"
// //                         accept="image/*"
// //                         onChange={handleImageFileChange}
// //                         disabled={uploadingImage}
// //                         className="hidden"
// //                       />
// //                     </label>
// //                   </div>
// //                 )}
// //                 {formData.imageUrl && (
// //                   <div className="mt-3 relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
// //                     <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
// //                   </div>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Full Description</label>
// //                 <textarea name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Soft brushed fleece interior with a relaxed silhouette..." className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500 resize-none" />
// //               </div>

// //               <div className="flex gap-3 mt-4">
// //                 <button
// //                   type="button"
// //                   onClick={closeForm}
// //                   disabled={submitting}
// //                   className="flex-1 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   disabled={submitting || uploadingImage}
// //                   className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
// //                 >
// //                   {submitting
// //                     ? editingId
// //                       ? "Updating..."
// //                       : "Uploading..."
// //                     : editingId
// //                     ? "Update Product"
// //                     : "Upload Product"}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         )}
// //       </div>

// //       {/* Uploaded Products List Section */}
// //       <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
// //         <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded Products</h3>
// //         <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
// //           Total {products.length} product{products.length !== 1 ? "s" : ""}. Here you can edit, sold out mark or delete.
// //         </p>

// //         {!showForm && message && (
// //           <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
// //             {message}
// //           </div>
// //         )}

// //         {loadingProducts ? (
// //           <p className="text-sm text-zinc-400 text-center py-6">Products loading...</p>
// //         ) : products.length === 0 ? (
// //           <p className="text-sm text-zinc-400 text-center py-6">There is no product uploaded yet.</p>
// //         ) : (
// //           <div className="space-y-3">
// //             {products.map((product) => (
// //               <div
// //                 key={product._id}
// //                 className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
// //                   editingId === product._id
// //                     ? "border-zinc-900 dark:border-zinc-50"
// //                     : "border-zinc-200 dark:border-zinc-800"
// //                 }`}
// //               >
// //                 <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
// //                   <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
// //                   {product.soldOut && (
// //                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
// //                       <span className="text-[8px] font-bold text-white uppercase">Sold Out</span>
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="flex-1 min-w-0">
// //                   <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{product.name}</p>
// //                   <p className="text-xs text-zinc-500 dark:text-zinc-400">
// //                     Rs. {product.price}
// //                     {product.discountPercent ? ` • ${product.discountPercent}` : ""}
// //                   </p>
// //                   {product.saleEndTime && (
// //                     <p className="text-[10px] text-zinc-400 mt-0.5">
// //                       ⏳ Sale end: {formatSaleEnd(product.saleEndTime)}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="flex flex-col gap-1.5 shrink-0">
// //                   <button
// //                     type="button"
// //                     onClick={() => openEditForm(product)}
// //                     disabled={rowActionId === product._id}
// //                     className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors disabled:opacity-50"
// //                   >
// //                     Edit
// //                   </button>
// //                   <button
// //                     type="button"
// //                     onClick={() => toggleSoldOut(product._id)}
// //                     disabled={rowActionId === product._id}
// //                     className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors disabled:opacity-50 ${
// //                       product.soldOut
// //                         ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
// //                         : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
// //                     }`}
// //                   >
// //                     {rowActionId === product._id
// //                       ? "..."
// //                       : product.soldOut
// //                       ? "Mark Available"
// //                       : "Mark Sold Out"}
// //                   </button>
// //                   <button
// //                     type="button"
// //                     onClick={() => deleteProduct(product._id)}
// //                     disabled={rowActionId === product._id}
// //                     className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
// //                   >
// //                     {rowActionId === product._id ? "..." : "Delete"}
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



















































// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // 🟢 NEW: Dono product types ke endpoints yahan define kiye
// const ENDPOINTS = {
//   oversized: "/api/Addproducts",
//   "regular-fit": "/api/regularproducts",
// };

// const EMPTY_FORM = {
//   productType: "oversized", // 🟢 NEW: default type
//   name: "",
//   tagline: "",
//   offerText: "",
//   price: "",
//   originalPrice: "",
//   description: "",
//   imageUrl: "",
//   saleEndTime: "",
// };

// export default function AdminProductUploadPage() {
//   const router = useRouter();

//   const [formData, setFormData] = React.useState(EMPTY_FORM);

//   const [message, setMessage] = React.useState("");
//   const [uploadType, setUploadType] = React.useState("link");
//   const [products, setProducts] = React.useState([]); // 🟢 dono types ke products yahan merge hoke aayenge
//   const [loadingProducts, setLoadingProducts] = React.useState(true);
//   const [submitting, setSubmitting] = React.useState(false);
//   const [uploadingImage, setUploadingImage] = React.useState(false);
//   const [rowActionId, setRowActionId] = React.useState(null);

//   const [showForm, setShowForm] = React.useState(false);
//   const [editingId, setEditingId] = React.useState(null);

//   // 🟢 NEW: List filter tab (All / Oversized / Regular Fit)
//   const [filterType, setFilterType] = React.useState("all");

//   const formTopRef = React.useRef(null);

//   React.useEffect(() => {
//     loadProducts();
//   }, []);

//   // 🟢 NEW: Dono endpoints se products fetch karke ek list mein merge karte hain,
//   // har product ko uski origin (_productType) ke sath tag karte hain
//   const loadProducts = async () => {
//     setLoadingProducts(true);
//     try {
//       const [oversizedRes, regularRes] = await Promise.all([
//         fetch(`${API_BASE_URL}${ENDPOINTS.oversized}`),
//         fetch(`${API_BASE_URL}${ENDPOINTS["regular-fit"]}`),
//       ]);

//       const oversizedData = await oversizedRes.json();
//       const regularData = await regularRes.json();

//       const oversizedProducts = oversizedData.success
//         ? oversizedData.products.map((p) => ({ ...p, _productType: "oversized" }))
//         : [];
//       const regularProducts = regularData.success
//         ? regularData.products.map((p) => ({ ...p, _productType: "regular-fit" }))
//         : [];

//       setProducts(
//         [...oversizedProducts, ...regularProducts].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         )
//       );

//       if (!oversizedData.success || !regularData.success) {
//         setMessage("⚠️ Kuch products load nahi ho sake. Please reload karein.");
//       }
//     } catch (err) {
//       console.error("loadProducts error:", err);
//       setMessage("❌ can't connect to server. please check your internet connection or reload page!");
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       setMessage("❌ Image size should minimum 5MB!");
//       return;
//     }

//     const uploadData = new FormData();
//     uploadData.append("image", file);

//     setUploadingImage(true);
//     setMessage("");

//     try {
//       const res = await fetch(`${API_BASE_URL}/api/upload`, {
//         method: "POST",
//         body: uploadData,
//       });
//       const data = await res.json();

//       if (data.success) {
//         setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
//       } else {
//         setMessage(`❌ ${data.error || "Image could not  upload."}`);
//       }
//     } catch (err) {
//       console.error("Image upload error:", err);
//       setMessage("❌ Image upload failed. Please Check your internet.");
//     } finally {
//       setUploadingImage(false);
//     }
//   };

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

//   const openEditForm = (product) => {
//     setEditingId(product._id);
//     setFormData({
//       productType: product._productType || "oversized", // 🟢 NEW: existing product ka type carry karo
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
//         ? new Date(product.saleEndTime).toISOString().slice(0, 16)
//         : "",
//     });
//     setUploadType("link");
//     setMessage("");
//     setShowForm(true);
//     setTimeout(() => {
//       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 0);
//   };

//   const closeForm = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setFormData(EMPTY_FORM);
//     setMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.price || !formData.imageUrl) {
//       setMessage("❌ Title, Price & Image are require.");
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

//     // 🟢 NEW: productType ke hisab se sahi endpoint select karo
//     const basePath = ENDPOINTS[formData.productType];

//     try {
//       let res;
//       if (editingId) {
//         res = await fetch(`${API_BASE_URL}${basePath}/${editingId}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       } else {
//         res = await fetch(`${API_BASE_URL}${basePath}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       }

//       const data = await res.json();

//       if (!data.success) {
//         setMessage(`❌ ${data.error || "Something went wrong."}`);
//         setSubmitting(false);
//         return;
//       }

//       setMessage(editingId ? "✅ Your product successfully updated!" : "✅ Product has been successfully upload!");

//       setFormData(EMPTY_FORM);
//       setEditingId(null);
//       setShowForm(false);

//       await loadProducts();

//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error("handleSubmit error:", err);
//       setMessage("❌ Can't connect to server. Please check your internet or reload page!");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // 🟢 NEW: toggle/delete ab product ke apne _productType ke mutabiq sahi endpoint use karte hain
//   const toggleSoldOut = async (product) => {
//     const basePath = ENDPOINTS[product._productType];
//     setRowActionId(product._id);
//     try {
//       const res = await fetch(`${API_BASE_URL}${basePath}/${product._id}/sold-out`, {
//         method: "PATCH",
//       });
//       const data = await res.json();
//       if (data.success) {
//         setProducts((prev) =>
//           prev.map((p) => (p._id === product._id ? { ...data.product, _productType: product._productType } : p))
//         );
//       } else {
//         setMessage(`❌ ${data.error || "Could not update status."}`);
//       }
//     } catch (err) {
//       console.error("toggleSoldOut error:", err);
//       setMessage("❌ Can't connect to server.");
//     } finally {
//       setRowActionId(null);
//     }
//   };

//   const deleteProduct = async (product) => {
//     const basePath = ENDPOINTS[product._productType];
//     setRowActionId(product._id);
//     try {
//       const res = await fetch(`${API_BASE_URL}${basePath}/${product._id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success) {
//         setProducts((prev) => prev.filter((p) => p._id !== product._id));
//         if (editingId === product._id) {
//           closeForm();
//         }
//       } else {
//         setMessage(`❌ ${data.error || "Product could not deleted."}`);
//       }
//     } catch (err) {
//       console.error("deleteProduct error:", err);
//       setMessage("❌ Could not connect to server.");
//     } finally {
//       setRowActionId(null);
//     }
//   };

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

//   // 🟢 NEW: filter tab ke hisab se list filter karo
//   const visibleProducts =
//     filterType === "all" ? products : products.filter((p) => p._productType === filterType);

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
//       <div ref={formTopRef} className="max-w-xl mx-auto">
//         {!showForm && (
//           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
//             <div>
//               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Store Dashboard</h2>
//               <p className="text-xs text-zinc-500 dark:text-zinc-400">Upload a new product.</p>
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
//               {editingId ? "Update new produc details." : "Upload new product."}
//             </p>

//             {message && (
//               <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
//                 {message}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* 🟢 NEW: Product Type selector (sirf naye product par editable, edit mode mein fixed/disabled) */}
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
//                   Product Type *
//                 </label>
//                 <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
//                   <button
//                     type="button"
//                     disabled={!!editingId}
//                     onClick={() => setFormData((prev) => ({ ...prev, productType: "oversized" }))}
//                     className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//                       formData.productType === "oversized"
//                         ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
//                         : "text-zinc-500"
//                     }`}
//                   >
//                     Oversized
//                   </button>
//                   <button
//                     type="button"
//                     disabled={!!editingId}
//                     onClick={() => setFormData((prev) => ({ ...prev, productType: "regular-fit" }))}
//                     className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//                       formData.productType === "regular-fit"
//                         ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
//                         : "text-zinc-500"
//                     }`}
//                   >
//                     Regular Fit
//                   </button>
//                 </div>
//                 {editingId && (
//                   <p className="text-[10px] text-zinc-400 mt-1">
//                     Product type edit mode mein change nahi ki ja sakti.
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Offer Badge / Tag (Optional)</label>
//                 <input type="text" name="offerText" value={formData.offerText} onChange={handleChange} placeholder="e.g. 🔥 Best Seller, Normal Routine" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Product Title *</label>
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Classic Charcoal Hoodie" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Second Title / Tagline</label>
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

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
//                   sale duration? (Optional)
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="saleEndTime"
//                   value={formData.saleEndTime}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
//                 />
//                 <p className="text-[10px] text-zinc-400 mt-1">
//                   This is use fot countdown, Leave this option if there is no sale
//                 </p>
//               </div>

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
//                     <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${uploadingImage ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
//                       <div className="flex flex-col items-center justify-center pt-3 pb-4">
//                         <p className="text-xs text-zinc-500 dark:text-zinc-400">
//                           {uploadingImage ? (
//                             <span className="font-semibold">Uploading...</span>
//                           ) : (
//                             <>
//                               <span className="font-semibold">Click to upload</span> or drag and drop
//                             </>
//                           )}
//                         </p>
//                         <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
//                       </div>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageFileChange}
//                         disabled={uploadingImage}
//                         className="hidden"
//                       />
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
//                   disabled={submitting || uploadingImage}
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
//         <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
//           Total {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}. Here you can edit, sold out mark or delete.
//         </p>

//         {/* 🟢 NEW: Filter tabs */}
//         <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-6">
//           {[
//             { key: "all", label: "All" },
//             { key: "oversized", label: "Oversized" },
//             { key: "regular-fit", label: "Regular Fit" },
//           ].map((tab) => (
//             <button
//               key={tab.key}
//               type="button"
//               onClick={() => setFilterType(tab.key)}
//               className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
//                 filterType === tab.key
//                   ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
//                   : "text-zinc-500"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {!showForm && message && (
//           <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
//             {message}
//           </div>
//         )}

//         {loadingProducts ? (
//           <p className="text-sm text-zinc-400 text-center py-6">Products loading...</p>
//         ) : visibleProducts.length === 0 ? (
//           <p className="text-sm text-zinc-400 text-center py-6">There is no product uploaded yet.</p>
//         ) : (
//           <div className="space-y-3">
//             {visibleProducts.map((product) => (
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
//                   <div className="flex items-center gap-1.5">
//                     <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{product.name}</p>
//                     {/* 🟢 NEW: Type badge */}
//                     <span
//                       className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${
//                         product._productType === "regular-fit"
//                           ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
//                           : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
//                       }`}
//                     >
//                       {product._productType === "regular-fit" ? "Regular" : "Oversized"}
//                     </span>
//                   </div>
//                   <p className="text-xs text-zinc-500 dark:text-zinc-400">
//                     Rs. {product.price}
//                     {product.discountPercent ? ` • ${product.discountPercent}` : ""}
//                   </p>
//                   {product.saleEndTime && (
//                     <p className="text-[10px] text-zinc-400 mt-0.5">
//                       ⏳ Sale end: {formatSaleEnd(product.saleEndTime)}
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
//                     onClick={() => toggleSoldOut(product)}
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
//                     onClick={() => deleteProduct(product)}
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// 🟢 NEW: Teeno product types ke endpoints
const ENDPOINTS = {
  oversized: "/api/Addproducts",
  "regular-fit": "/api/regularproducts",
  sweatshirt: "/api/sweatshirtproducts",
};

const EMPTY_FORM = {
  productType: "oversized",
  name: "",
  tagline: "",
  offerText: "",
  price: "",
  originalPrice: "",
  description: "",
  imageUrl: "",
  saleEndTime: "",
};

export default function AdminProductUploadPage() {
  const router = useRouter();

  const [formData, setFormData] = React.useState(EMPTY_FORM);

  const [message, setMessage] = React.useState("");
  const [uploadType, setUploadType] = React.useState("link");
  const [products, setProducts] = React.useState([]); // 🟢 teeno types ke products yahan merge hoke aayenge
  const [loadingProducts, setLoadingProducts] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [rowActionId, setRowActionId] = React.useState(null);

  const [showForm, setShowForm] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);

  // 🟢 NEW: List filter tab (All / Oversized / Regular Fit / Sweatshirt)
  const [filterType, setFilterType] = React.useState("all");

  const formTopRef = React.useRef(null);

  React.useEffect(() => {
    loadProducts();
  }, []);

  // 🟢 NEW: Teeno endpoints se products fetch karke ek list mein merge karte hain,
  // har product ko uski origin (_productType) ke sath tag karte hain
  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const [oversizedRes, regularRes, sweatshirtRes] = await Promise.all([
        fetch(`${API_BASE_URL}${ENDPOINTS.oversized}`),
        fetch(`${API_BASE_URL}${ENDPOINTS["regular-fit"]}`),
        fetch(`${API_BASE_URL}${ENDPOINTS.sweatshirt}`),
      ]);

      const oversizedData = await oversizedRes.json();
      const regularData = await regularRes.json();
      const sweatshirtData = await sweatshirtRes.json();

      const oversizedProducts = oversizedData.success
        ? oversizedData.products.map((p) => ({ ...p, _productType: "oversized" }))
        : [];
      const regularProducts = regularData.success
        ? regularData.products.map((p) => ({ ...p, _productType: "regular-fit" }))
        : [];
      const sweatshirtProducts = sweatshirtData.success
        ? sweatshirtData.products.map((p) => ({ ...p, _productType: "sweatshirt" }))
        : [];

      setProducts(
        [...oversizedProducts, ...regularProducts, ...sweatshirtProducts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );

      if (!oversizedData.success || !regularData.success || !sweatshirtData.success) {
        setMessage("⚠️ Kuch products load nahi ho sake. Please reload karein.");
      }
    } catch (err) {
      console.error("loadProducts error:", err);
      setMessage("❌ can't connect to server. please check your internet connection or reload page!");
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage("❌ Image size should minimum 5MB!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    setUploadingImage(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
      } else {
        setMessage(`❌ ${data.error || "Image could not  upload."}`);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setMessage("❌ Image upload failed. Please Check your internet.");
    } finally {
      setUploadingImage(false);
    }
  };

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

  const openEditForm = (product) => {
    setEditingId(product._id);
    setFormData({
      productType: product._productType || "oversized",
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
        ? new Date(product.saleEndTime).toISOString().slice(0, 16)
        : "",
    });
    setUploadType("link");
    setMessage("");
    setShowForm(true);
    setTimeout(() => {
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.imageUrl) {
      setMessage("❌ Title, Price & Image are require.");
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

    // 🟢 productType ke hisab se sahi endpoint select karo
    const basePath = ENDPOINTS[formData.productType];

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_BASE_URL}${basePath}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}${basePath}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (!data.success) {
        setMessage(`❌ ${data.error || "Something went wrong."}`);
        setSubmitting(false);
        return;
      }

      setMessage(editingId ? "✅ Your product successfully updated!" : "✅ Product has been successfully upload!");

      setFormData(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);

      await loadProducts();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("handleSubmit error:", err);
      setMessage("❌ Can't connect to server. Please check your internet or reload page!");
    } finally {
      setSubmitting(false);
    }
  };

  // 🟢 toggle/delete ab product ke apne _productType ke mutabiq sahi endpoint use karte hain
  const toggleSoldOut = async (product) => {
    const basePath = ENDPOINTS[product._productType];
    setRowActionId(product._id);
    try {
      const res = await fetch(`${API_BASE_URL}${basePath}/${product._id}/sold-out`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? { ...data.product, _productType: product._productType } : p))
        );
      } else {
        setMessage(`❌ ${data.error || "Could not update status."}`);
      }
    } catch (err) {
      console.error("toggleSoldOut error:", err);
      setMessage("❌ Can't connect to server.");
    } finally {
      setRowActionId(null);
    }
  };

  const deleteProduct = async (product) => {
    const basePath = ENDPOINTS[product._productType];
    setRowActionId(product._id);
    try {
      const res = await fetch(`${API_BASE_URL}${basePath}/${product._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== product._id));
        if (editingId === product._id) {
          closeForm();
        }
      } else {
        setMessage(`❌ ${data.error || "Product could not deleted."}`);
      }
    } catch (err) {
      console.error("deleteProduct error:", err);
      setMessage("❌ Could not connect to server.");
    } finally {
      setRowActionId(null);
    }
  };

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

  // 🟢 filter tab ke hisab se list filter karo
  const visibleProducts =
    filterType === "all" ? products : products.filter((p) => p._productType === filterType);

  // 🟢 NEW: type badge ke label/color helper (teeno types ke liye)
  const getTypeBadge = (type) => {
    switch (type) {
      case "regular-fit":
        return {
          label: "Regular",
          className: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
        };
      case "sweatshirt":
        return {
          label: "Sweatshirt",
          className: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
        };
      default:
        return {
          label: "Oversized",
          className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
        };
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div ref={formTopRef} className="max-w-xl mx-auto">
        {!showForm && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Store Dashboard</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Upload a new product.</p>
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
              {editingId ? "Update new produc details." : "Upload new product."}
            </p>

            {message && (
              <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 🟢 NEW: Product Type selector — ab teen options (Oversized / Regular Fit / Sweatshirt) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Product Type *
                </label>
                <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                  <button
                    type="button"
                    disabled={!!editingId}
                    onClick={() => setFormData((prev) => ({ ...prev, productType: "oversized" }))}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      formData.productType === "oversized"
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
                        : "text-zinc-500"
                    }`}
                  >
                    Oversized
                  </button>
                  <button
                    type="button"
                    disabled={!!editingId}
                    onClick={() => setFormData((prev) => ({ ...prev, productType: "regular-fit" }))}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      formData.productType === "regular-fit"
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
                        : "text-zinc-500"
                    }`}
                  >
                    Regular Fit
                  </button>
                  <button
                    type="button"
                    disabled={!!editingId}
                    onClick={() => setFormData((prev) => ({ ...prev, productType: "sweatshirt" }))}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      formData.productType === "sweatshirt"
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
                        : "text-zinc-500"
                    }`}
                  >
                    Sweatshirt
                  </button>
                </div>
                {editingId && (
                  <p className="text-[10px] text-zinc-400 mt-1">
                    Product type edit mode mein change nahi ki ja sakti.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Offer Badge / Tag (Optional)</label>
                <input type="text" name="offerText" value={formData.offerText} onChange={handleChange} placeholder="e.g. 🔥 Best Seller, Normal Routine" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Product Title *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Classic Charcoal Hoodie" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Second Title / Tagline</label>
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

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  sale duration? (Optional)
                </label>
                <input
                  type="datetime-local"
                  name="saleEndTime"
                  value={formData.saleEndTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
                <p className="text-[10px] text-zinc-400 mt-1">
                  This is use fot countdown, Leave this option if there is no sale
                </p>
              </div>

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
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Total {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}. Here you can edit, sold out mark or delete.
        </p>

        {/* 🟢 NEW: Filter tabs — ab Sweatshirt bhi shamil */}
        <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-6">
          {[
            { key: "all", label: "All" },
            { key: "oversized", label: "Oversized" },
            { key: "regular-fit", label: "Regular Fit" },
            { key: "sweatshirt", label: "Sweatshirt" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterType(tab.key)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filterType === tab.key
                  ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
                  : "text-zinc-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {!showForm && message && (
          <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
            {message}
          </div>
        )}

        {loadingProducts ? (
          <p className="text-sm text-zinc-400 text-center py-6">Products loading...</p>
        ) : visibleProducts.length === 0 ? (
          <p className="text-sm text-zinc-400 text-center py-6">There is no product uploaded yet.</p>
        ) : (
          <div className="space-y-3">
            {visibleProducts.map((product) => {
              const badge = getTypeBadge(product._productType);
              return (
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
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{product.name}</p>
                      {/* 🟢 Type badge — teeno types ke liye */}
                      <span
                        className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Rs. {product.price}
                      {product.discountPercent ? ` • ${product.discountPercent}` : ""}
                    </p>
                    {product.saleEndTime && (
                      <p className="text-[10px] text-zinc-400 mt-0.5">
                        ⏳ Sale end: {formatSaleEnd(product.saleEndTime)}
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
                      onClick={() => toggleSoldOut(product)}
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
                      onClick={() => deleteProduct(product)}
                      disabled={rowActionId === product._id}
                      className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
                    >
                      {rowActionId === product._id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}