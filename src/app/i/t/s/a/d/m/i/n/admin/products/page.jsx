
// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";

// export default function AdminProductUploadPage() {
//   const router = useRouter();
  
//   // Form fields state management
//   const [formData, setFormData] = React.useState({
//     name: "",
//     tagline: "",
//     offerText: "", 
//     price: "",
//     originalPrice: "",
//     description: "",
//     imageUrl: "", // Yeh field link aur gallery dono ka path handle karegi
//   });

//   const [message, setMessage] = React.useState("");
//   const [uploadType, setUploadType] = React.useState("link"); // 'link' or 'gallery'

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

//     // Creating object payload for state parsing
//     const newProduct = {
//       id: crypto.randomUUID(),
//       slug: slug,
//       name: formData.name,
//       tagline: formData.tagline,
//       offerText: formData.offerText || null,
//       price: salePrice,
//       originalPrice: originalPrice || null,
//       discountPercent: discountPercent || null,
//       description: formData.description,
//       imageUrl: formData.imageUrl,
//     };

//     const currentProducts = JSON.parse(localStorage.getItem("store_products") || "[]");
    
//     if (currentProducts.some((p) => p.slug === slug)) {
//       setMessage("❌ Is title ka product pehle se majood hai!");
//       return;
//     }

//     currentProducts.push(newProduct);
//     localStorage.setItem("store_products", JSON.stringify(currentProducts));

//     setMessage("✅ Product successfully upload ho gaya!");
    
//     setFormData({
//       name: "",
//       tagline: "",
//       offerText: "",
//       price: "",
//       originalPrice: "",
//       description: "",
//       imageUrl: "",
//     });

//     setTimeout(() => setMessage(""), 3000);
//   };
//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
//         <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Store Dashboard</h2>
//         <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">Naya product upload karein jo pure application par synced ho jaye.</p>

//         {message && (
//           <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Offer Badge / Tag (Optional)</label>
//             <input type="text" name="offerText" value={formData.offerText} onChange={handleChange} placeholder="e.g. 🔥 Best Seller, Normal Routine" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Product Title *</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Classic Charcoal Hoodie" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Chota Title / Tagline</label>
//             <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g. Perfect fleece warmth for winter" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Selling Price (PKR) *</label>
//               <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="1899" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Original Price (PKR)</label>
//               <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="2999" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//             </div>
//           </div>

//           {/* 🟢 Image Upload Options Toggle Tabs */}
//           <div>
//             <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
//             <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
//               <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
//               <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
//             </div>

//             {uploadType === "link" ? (
//               <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste Unsplash image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
//             ) : (
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
//                   <div className="flex flex-col items-center justify-center pt-3 pb-4">
//                     <p className="text-xs text-zinc-500 dark:text-zinc-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                     <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
//                   </div>
//                   <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
//                 </label>
//               </div>
//             )}
//             {formData.imageUrl && (
//               <div className="mt-3 relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
//                 <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
//               </div>
//             )}
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Full Description</label>
//             <textarea name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Soft brushed fleece interior with a relaxed silhouette..." className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500 resize-none" />
//           </div>

//           <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity">Upload Product</button>
//         </form>
//       </div>
//     </div>
//   );
// }





















"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export default function AdminProductUploadPage() {
  const router = useRouter();

  // Form fields state management
  const [formData, setFormData] = React.useState({
    name: "",
    tagline: "",
    offerText: "",
    price: "",
    originalPrice: "",
    description: "",
    imageUrl: "", // Yeh field link aur gallery dono ka path handle karegi
    saleEndTime: "", // 🟢 Naya field: sale kab tak lagegi (datetime-local)
  });

  const [message, setMessage] = React.useState("");
  const [uploadType, setUploadType] = React.useState("link"); // 'link' or 'gallery'
  const [products, setProducts] = React.useState([]); // 🟢 Uploaded products list

  // 🟢 Page load hote hi localStorage se products utha lo
  React.useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const currentProducts = JSON.parse(localStorage.getItem("store_products") || "[]");
    setProducts(currentProducts);
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Local gallery image ko base64 string mein convert karne ka function
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size check (under 5MB for localStorage safety)
    if (file.size > 5 * 1024 * 1024) {
      setMessage("❌ Image size 5MB se kam hona chahiye!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.imageUrl) {
      setMessage("❌ Title, Price aur Image lazmi hain.");
      return;
    }

    // Dynamic clean slug system
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    // Dynamic discount percent calculator
    let discountPercent = "";
    const salePrice = parseFloat(formData.price);
    const originalPrice = parseFloat(formData.originalPrice);

    if (originalPrice && originalPrice > salePrice) {
      const discount = ((originalPrice - salePrice) / originalPrice) * 100;
      discountPercent = `${Math.round(discount)}% OFF`;
    }

    // Creating object payload for state parsing
    const newProduct = {
      id: crypto.randomUUID(),
      slug: slug,
      name: formData.name,
      tagline: formData.tagline,
      offerText: formData.offerText || null,
      price: salePrice,
      originalPrice: originalPrice || null,
      discountPercent: discountPercent || null,
      description: formData.description,
      imageUrl: formData.imageUrl,
      // 🟢 Sale end time ISO string mein save hoga taake countdown page use kar sake
      saleEndTime: formData.saleEndTime
        ? new Date(formData.saleEndTime).toISOString()
        : null,
      soldOut: false, // 🟢 Default: product available hai
    };

    const currentProducts = JSON.parse(localStorage.getItem("store_products") || "[]");

    if (currentProducts.some((p) => p.slug === slug)) {
      setMessage("❌ Is title ka product pehle se majood hai!");
      return;
    }

    currentProducts.push(newProduct);
    localStorage.setItem("store_products", JSON.stringify(currentProducts));

    setMessage("✅ Product successfully upload ho gaya!");

    setFormData({
      name: "",
      tagline: "",
      offerText: "",
      price: "",
      originalPrice: "",
      description: "",
      imageUrl: "",
      saleEndTime: "",
    });

    loadProducts(); // 🟢 List turant refresh ho jaye

    setTimeout(() => setMessage(""), 3000);
  };

  // 🟢 Kisi bhi product ko sold out / available toggle karne ka function
  const toggleSoldOut = (id) => {
    const currentProducts = JSON.parse(localStorage.getItem("store_products") || "[]");
    const updatedProducts = currentProducts.map((p) =>
      p.id === id ? { ...p, soldOut: !p.soldOut } : p
    );
    localStorage.setItem("store_products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  // 🟢 Product delete karne ka function (list ko manage karna aasan ho jaye)
  const deleteProduct = (id) => {
    const currentProducts = JSON.parse(localStorage.getItem("store_products") || "[]");
    const updatedProducts = currentProducts.filter((p) => p.id !== id);
    localStorage.setItem("store_products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  // 🟢 Sale end time ko readable format mein dikhane ke liye helper
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
      <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Store Dashboard</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">Naya product upload karein jo pure application par synced ho jaye.</p>

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

          {/* 🟢 Sale End Time field - agar is product par sale lagi hai to kab tak lagegi */}
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

          {/* 🟢 Image Upload Options Toggle Tabs */}
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
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <div className="flex flex-col items-center justify-center pt-3 pb-4">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
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

          <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity">Upload Product</button>
        </form>
      </div>

      {/* 🟢 Uploaded Products List Section */}
      <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded Products</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
          Total {products.length} product{products.length !== 1 ? "s" : ""}. Yahan se sold out mark ya delete kar sakte hain.
        </p>

        {products.length === 0 ? (
          <p className="text-sm text-zinc-400 text-center py-6">Abhi tak koi product upload nahi hua.</p>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50"
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
                    onClick={() => toggleSoldOut(product.id)}
                    className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors ${
                      product.soldOut
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    }`}
                  >
                    {product.soldOut ? "Mark Available" : "Mark Sold Out"}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProduct(product.id)}
                    className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                  >
                    Delete
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