// // // // // "use client";

// // // // // import * as React from "react";

// // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // // // // const EMPTY_FORM = {
// // // // //   imageUrl: "",
// // // // //   altText: "",
// // // // //   order: "",
// // // // // };

// // // // // export default function PostsPage() {
// // // // //   const [formData, setFormData] = React.useState(EMPTY_FORM);
// // // // //   const [message, setMessage] = React.useState("");
// // // // //   const [uploadType, setUploadType] = React.useState("link");
// // // // //   const [slides, setSlides] = React.useState([]);
// // // // //   const [loadingSlides, setLoadingSlides] = React.useState(true);
// // // // //   const [submitting, setSubmitting] = React.useState(false);
// // // // //   const [uploadingImage, setUploadingImage] = React.useState(false);
// // // // //   const [rowActionId, setRowActionId] = React.useState(null);

// // // // //   const [showForm, setShowForm] = React.useState(false);
// // // // //   const [editingId, setEditingId] = React.useState(null);

// // // // //   const formTopRef = React.useRef(null);

// // // // //   React.useEffect(() => {
// // // // //     loadSlides();
// // // // //   }, []);

// // // // //   // 🟢 all=true -> active aur inactive dono slides yahan dikhengi
// // // // //   const loadSlides = async () => {
// // // // //     setLoadingSlides(true);
// // // // //     try {
// // // // //       const res = await fetch(`${API_BASE_URL}/api/heroslides?all=true`);
// // // // //       const data = await res.json();
// // // // //       if (data.success) {
// // // // //         setSlides(data.slides);
// // // // //       } else {
// // // // //         setMessage("❌ Slides load nahi ho saki. Please reload karein.");
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("loadSlides error:", err);
// // // // //       setMessage("❌ Can't connect to server. Please check your internet.");
// // // // //     } finally {
// // // // //       setLoadingSlides(false);
// // // // //     }
// // // // //   };

// // // // //   const handleChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // // // //   };

// // // // //   const handleImageFileChange = async (e) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (!file) return;

// // // // //     if (file.size > 5 * 1024 * 1024) {
// // // // //       setMessage("❌ Image size should minimum 5MB!");
// // // // //       return;
// // // // //     }

// // // // //     const uploadData = new FormData();
// // // // //     uploadData.append("image", file);

// // // // //     setUploadingImage(true);
// // // // //     setMessage("");

// // // // //     try {
// // // // //       const res = await fetch(`${API_BASE_URL}/api/upload`, {
// // // // //         method: "POST",
// // // // //         body: uploadData,
// // // // //       });
// // // // //       const data = await res.json();

// // // // //       if (data.success) {
// // // // //         setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
// // // // //       } else {
// // // // //         setMessage(`❌ ${data.error || "Image upload nahi ho saki."}`);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("Image upload error:", err);
// // // // //       setMessage("❌ Image upload failed. Please check your internet.");
// // // // //     } finally {
// // // // //       setUploadingImage(false);
// // // // //     }
// // // // //   };

// // // // //   const openAddForm = () => {
// // // // //     setEditingId(null);
// // // // //     setFormData(EMPTY_FORM);
// // // // //     setUploadType("link");
// // // // //     setMessage("");
// // // // //     setShowForm(true);
// // // // //     setTimeout(() => {
// // // // //       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// // // // //     }, 0);
// // // // //   };

// // // // //   const openEditForm = (slide) => {
// // // // //     setEditingId(slide._id);
// // // // //     setFormData({
// // // // //       imageUrl: slide.imageUrl || "",
// // // // //       altText: slide.altText || "",
// // // // //       order: slide.order !== undefined && slide.order !== null ? String(slide.order) : "",
// // // // //     });
// // // // //     setUploadType("link");
// // // // //     setMessage("");
// // // // //     setShowForm(true);
// // // // //     setTimeout(() => {
// // // // //       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// // // // //     }, 0);
// // // // //   };

// // // // //   const closeForm = () => {
// // // // //     setShowForm(false);
// // // // //     setEditingId(null);
// // // // //     setFormData(EMPTY_FORM);
// // // // //     setMessage("");
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();

// // // // //     if (!formData.imageUrl || !formData.altText) {
// // // // //       setMessage("❌ Image aur Alt text lazmi hain.");
// // // // //       return;
// // // // //     }

// // // // //     setSubmitting(true);
// // // // //     setMessage("");

// // // // //     const payload = {
// // // // //       imageUrl: formData.imageUrl,
// // // // //       altText: formData.altText,
// // // // //       order: formData.order || 0,
// // // // //     };

// // // // //     try {
// // // // //       let res;
// // // // //       if (editingId) {
// // // // //         res = await fetch(`${API_BASE_URL}/api/heroslides/${editingId}`, {
// // // // //           method: "PUT",
// // // // //           headers: { "Content-Type": "application/json" },
// // // // //           body: JSON.stringify(payload),
// // // // //         });
// // // // //       } else {
// // // // //         res = await fetch(`${API_BASE_URL}/api/heroslides`, {
// // // // //           method: "POST",
// // // // //           headers: { "Content-Type": "application/json" },
// // // // //           body: JSON.stringify(payload),
// // // // //         });
// // // // //       }

// // // // //       const data = await res.json();

// // // // //       if (!data.success) {
// // // // //         setMessage(`❌ ${data.error || "Something went wrong."}`);
// // // // //         setSubmitting(false);
// // // // //         return;
// // // // //       }

// // // // //       setMessage(editingId ? "✅ Slide successfully updated!" : "✅ Slide successfully upload ho gayi!");

// // // // //       setFormData(EMPTY_FORM);
// // // // //       setEditingId(null);
// // // // //       setShowForm(false);

// // // // //       await loadSlides();

// // // // //       setTimeout(() => setMessage(""), 3000);
// // // // //     } catch (err) {
// // // // //       console.error("handleSubmit error:", err);
// // // // //       setMessage("❌ Can't connect to server. Please check your internet.");
// // // // //     } finally {
// // // // //       setSubmitting(false);
// // // // //     }
// // // // //   };

// // // // //   const toggleActive = async (id) => {
// // // // //     setRowActionId(id);
// // // // //     try {
// // // // //       const res = await fetch(`${API_BASE_URL}/api/heroslides/${id}/toggle-active`, {
// // // // //         method: "PATCH",
// // // // //       });
// // // // //       const data = await res.json();
// // // // //       if (data.success) {
// // // // //         setSlides((prev) => prev.map((s) => (s._id === id ? data.slide : s)));
// // // // //       } else {
// // // // //         setMessage(`❌ ${data.error || "Status update nahi ho saka."}`);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("toggleActive error:", err);
// // // // //       setMessage("❌ Can't connect to server.");
// // // // //     } finally {
// // // // //       setRowActionId(null);
// // // // //     }
// // // // //   };

// // // // //   const deleteSlide = async (id) => {
// // // // //     setRowActionId(id);
// // // // //     try {
// // // // //       const res = await fetch(`${API_BASE_URL}/api/heroslides/${id}`, {
// // // // //         method: "DELETE",
// // // // //       });
// // // // //       const data = await res.json();
// // // // //       if (data.success) {
// // // // //         setSlides((prev) => prev.filter((s) => s._id !== id));
// // // // //         if (editingId === id) {
// // // // //           closeForm();
// // // // //         }
// // // // //       } else {
// // // // //         setMessage(`❌ ${data.error || "Slide delete nahi ho saki."}`);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("deleteSlide error:", err);
// // // // //       setMessage("❌ Can't connect to server.");
// // // // //     } finally {
// // // // //       setRowActionId(null);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
// // // // //       <div ref={formTopRef} className="max-w-xl mx-auto">
// // // // //         {!showForm && (
// // // // //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
// // // // //             <div>
// // // // //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Hero Slider Dashboard</h2>
// // // // //               <p className="text-xs text-zinc-500 dark:text-zinc-400">Home page slider ke liye images manage karein.</p>
// // // // //             </div>
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={openAddForm}
// // // // //               className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
// // // // //             >
// // // // //               + Add Slide
// // // // //             </button>
// // // // //           </div>
// // // // //         )}

// // // // //         {showForm && (
// // // // //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
// // // // //             <div className="flex items-start justify-between mb-1">
// // // // //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
// // // // //                 {editingId ? "Edit Slide" : "Add New Slide"}
// // // // //               </h2>
// // // // //               <button
// // // // //                 type="button"
// // // // //                 onClick={closeForm}
// // // // //                 className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
// // // // //               >
// // // // //                 Close ✕
// // // // //               </button>
// // // // //             </div>
// // // // //             <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
// // // // //               {editingId ? "Update slide details." : "Naya slider image upload karein."}
// // // // //             </p>

// // // // //             {message && (
// // // // //               <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
// // // // //                 {message}
// // // // //               </div>
// // // // //             )}

// // // // //             <form onSubmit={handleSubmit} className="space-y-4">
// // // // //               <div>
// // // // //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
// // // // //                 <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
// // // // //                   <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
// // // // //                   <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
// // // // //                 </div>

// // // // //                 {uploadType === "link" ? (
// // // // //                   <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
// // // // //                 ) : (
// // // // //                   <div className="flex items-center justify-center w-full">
// // // // //                     <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${uploadingImage ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
// // // // //                       <div className="flex flex-col items-center justify-center pt-3 pb-4">
// // // // //                         <p className="text-xs text-zinc-500 dark:text-zinc-400">
// // // // //                           {uploadingImage ? (
// // // // //                             <span className="font-semibold">Uploading...</span>
// // // // //                           ) : (
// // // // //                             <>
// // // // //                               <span className="font-semibold">Click to upload</span> or drag and drop
// // // // //                             </>
// // // // //                           )}
// // // // //                         </p>
// // // // //                         <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
// // // // //                       </div>
// // // // //                       <input
// // // // //                         type="file"
// // // // //                         accept="image/*"
// // // // //                         onChange={handleImageFileChange}
// // // // //                         disabled={uploadingImage}
// // // // //                         className="hidden"
// // // // //                       />
// // // // //                     </label>
// // // // //                   </div>
// // // // //                 )}
// // // // //                 {formData.imageUrl && (
// // // // //                   <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
// // // // //                     <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
// // // // //                   Alt Text * <span className="normal-case font-normal text-zinc-400">(agar image load na ho to ye show hoga)</span>
// // // // //                 </label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   name="altText"
// // // // //                   value={formData.altText}
// // // // //                   onChange={handleChange}
// // // // //                   placeholder="e.g. New winter collection banner"
// // // // //                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
// // // // //                 />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
// // // // //                   Order (Optional)
// // // // //                 </label>
// // // // //                 <input
// // // // //                   type="number"
// // // // //                   name="order"
// // // // //                   value={formData.order}
// // // // //                   onChange={handleChange}
// // // // //                   placeholder="0"
// // // // //                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
// // // // //                 />
// // // // //                 <p className="text-[10px] text-zinc-400 mt-1">
// // // // //                   Chota number pehle dikhega slider mein. Khali chorein to default 0 ho jayega.
// // // // //                 </p>
// // // // //               </div>

// // // // //               <div className="flex gap-3 mt-4">
// // // // //                 <button
// // // // //                   type="button"
// // // // //                   onClick={closeForm}
// // // // //                   disabled={submitting}
// // // // //                   className="flex-1 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
// // // // //                 >
// // // // //                   Cancel
// // // // //                 </button>
// // // // //                 <button
// // // // //                   type="submit"
// // // // //                   disabled={submitting || uploadingImage}
// // // // //                   className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
// // // // //                 >
// // // // //                   {submitting
// // // // //                     ? editingId
// // // // //                       ? "Updating..."
// // // // //                       : "Uploading..."
// // // // //                     : editingId
// // // // //                     ? "Update Slide"
// // // // //                     : "Upload Slide"}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </form>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* Uploaded Slides List */}
// // // // //       <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
// // // // //         <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded Slides</h3>
// // // // //         <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
// // // // //           Total {slides.length} slide{slides.length !== 1 ? "s" : ""}. Yahan edit, active/inactive ya delete kar sakte hain.
// // // // //         </p>

// // // // //         {!showForm && message && (
// // // // //           <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
// // // // //             {message}
// // // // //           </div>
// // // // //         )}

// // // // //         {loadingSlides ? (
// // // // //           <p className="text-sm text-zinc-400 text-center py-6">Slides loading...</p>
// // // // //         ) : slides.length === 0 ? (
// // // // //           <p className="text-sm text-zinc-400 text-center py-6">Abhi tak koi slide upload nahi hui.</p>
// // // // //         ) : (
// // // // //           <div className="space-y-3">
// // // // //             {slides.map((slide) => (
// // // // //               <div
// // // // //                 key={slide._id}
// // // // //                 className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
// // // // //                   editingId === slide._id
// // // // //                     ? "border-zinc-900 dark:border-zinc-50"
// // // // //                     : "border-zinc-200 dark:border-zinc-800"
// // // // //                 }`}
// // // // //               >
// // // // //                 <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
// // // // //                   <img src={slide.imageUrl} alt={slide.altText} className="w-full h-full object-cover" />
// // // // //                   {!slide.isActive && (
// // // // //                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
// // // // //                       <span className="text-[8px] font-bold text-white uppercase">Inactive</span>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </div>

// // // // //                 <div className="flex-1 min-w-0">
// // // // //                   <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{slide.altText}</p>
// // // // //                   <p className="text-xs text-zinc-500 dark:text-zinc-400">Order: {slide.order}</p>
// // // // //                 </div>

// // // // //                 <div className="flex flex-col gap-1.5 shrink-0">
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => openEditForm(slide)}
// // // // //                     disabled={rowActionId === slide._id}
// // // // //                     className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors disabled:opacity-50"
// // // // //                   >
// // // // //                     Edit
// // // // //                   </button>
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => toggleActive(slide._id)}
// // // // //                     disabled={rowActionId === slide._id}
// // // // //                     className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors disabled:opacity-50 ${
// // // // //                       slide.isActive
// // // // //                         ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
// // // // //                         : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
// // // // //                     }`}
// // // // //                   >
// // // // //                     {rowActionId === slide._id ? "..." : slide.isActive ? "Mark Inactive" : "Mark Active"}
// // // // //                   </button>
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => deleteSlide(slide._id)}
// // // // //                     disabled={rowActionId === slide._id}
// // // // //                     className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
// // // // //                   >
// // // // //                     {rowActionId === slide._id ? "..." : "Delete"}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }




















// // // // "use client";

// // // // import * as React from "react";

// // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // // // const EMPTY_FORM = {
// // // //   imageUrl: "",
// // // //   altText: "",
// // // //   order: "",
// // // // };

// // // // // 🟢 Teeno types ki config yahan hai — naya type add karna ho to bas yahan entry add karein
// // // // const TYPE_CONFIG = {
// // // //   heroslides: {
// // // //     label: "Hero Slides",
// // // //     apiPath: "/api/heroslides",
// // // //     listQuery: "?all=true", // active/inactive dono
// // // //     supportsToggle: true,
// // // //   },
// // // //   gallery: {
// // // //     label: "Gallery",
// // // //     apiPath: "/api/gallery",
// // // //     listQuery: "",
// // // //     supportsToggle: false,
// // // //   },
// // // //   collection: {
// // // //     label: "Collection",
// // // //     apiPath: "/api/gallery",
// // // //     listQuery: "",
// // // //     supportsToggle: false,
// // // //   },
// // // // };

// // // // export default function PostsPage() {
// // // //   const [activeType, setActiveType] = React.useState("heroslides");

// // // //   const [formData, setFormData] = React.useState(EMPTY_FORM);
// // // //   const [message, setMessage] = React.useState("");
// // // //   const [uploadType, setUploadType] = React.useState("link");
// // // //   const [slides, setSlides] = React.useState([]);
// // // //   const [loadingSlides, setLoadingSlides] = React.useState(true);
// // // //   const [submitting, setSubmitting] = React.useState(false);
// // // //   const [uploadingImage, setUploadingImage] = React.useState(false);
// // // //   const [rowActionId, setRowActionId] = React.useState(null);

// // // //   const [showForm, setShowForm] = React.useState(false);
// // // //   const [editingId, setEditingId] = React.useState(null);

// // // //   const formTopRef = React.useRef(null);

// // // //   const config = TYPE_CONFIG[activeType];

// // // //   React.useEffect(() => {
// // // //     loadSlides();
// // // //     setShowForm(false);
// // // //     setEditingId(null);
// // // //     setFormData(EMPTY_FORM);
// // // //     setMessage("");
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [activeType]);

// // // //   const loadSlides = async () => {
// // // //     setLoadingSlides(true);
// // // //     try {
// // // //       const res = await fetch(`${API_BASE_URL}${config.apiPath}${config.listQuery}`);
// // // //       const data = await res.json();
// // // //       if (data.success) {
// // // //         // 🟢 backend keys alag ho saktay hain (slides / images / items) — sab handle kar liya
// // // //         setSlides(data.slides || data.images || data.items || data.collections || []);
// // // //       } else {
// // // //         setMessage("❌ Data load nahi ho saka. Please reload karein.");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("loadSlides error:", err);
// // // //       setMessage("❌ Can't connect to server. Please check your internet.");
// // // //     } finally {
// // // //       setLoadingSlides(false);
// // // //     }
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // // //   };

// // // //   const handleImageFileChange = async (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (!file) return;

// // // //     if (file.size > 5 * 1024 * 1024) {
// // // //       setMessage("❌ Image size 5MB se zyada nahi honi chahiye!");
// // // //       return;
// // // //     }

// // // //     const uploadData = new FormData();
// // // //     uploadData.append("image", file);

// // // //     setUploadingImage(true);
// // // //     setMessage("");

// // // //     try {
// // // //       const res = await fetch(`${API_BASE_URL}/api/upload`, {
// // // //         method: "POST",
// // // //         body: uploadData,
// // // //       });
// // // //       const data = await res.json();

// // // //       if (data.success) {
// // // //         setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
// // // //       } else {
// // // //         setMessage(`❌ ${data.error || "Image upload nahi ho saki."}`);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Image upload error:", err);
// // // //       setMessage("❌ Image upload failed. Please check your internet.");
// // // //     } finally {
// // // //       setUploadingImage(false);
// // // //     }
// // // //   };

// // // //   const openAddForm = () => {
// // // //     setEditingId(null);
// // // //     setFormData(EMPTY_FORM);
// // // //     setUploadType("link");
// // // //     setMessage("");
// // // //     setShowForm(true);
// // // //     setTimeout(() => {
// // // //       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// // // //     }, 0);
// // // //   };

// // // //   const openEditForm = (slide) => {
// // // //     setEditingId(slide._id);
// // // //     setFormData({
// // // //       imageUrl: slide.imageUrl || "",
// // // //       altText: slide.altText || "",
// // // //       order: slide.order !== undefined && slide.order !== null ? String(slide.order) : "",
// // // //     });
// // // //     setUploadType("link");
// // // //     setMessage("");
// // // //     setShowForm(true);
// // // //     setTimeout(() => {
// // // //       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// // // //     }, 0);
// // // //   };

// // // //   const closeForm = () => {
// // // //     setShowForm(false);
// // // //     setEditingId(null);
// // // //     setFormData(EMPTY_FORM);
// // // //     setMessage("");
// // // //   };

// // // //   // 🟢 Ab yeh function activeType ke hisab se sahi API (heroslides / gallery / collection) par POST/PUT karta hai
// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();

// // // //     if (!formData.imageUrl || !formData.altText) {
// // // //       setMessage("❌ Image aur Alt text lazmi hain.");
// // // //       return;
// // // //     }

// // // //     setSubmitting(true);
// // // //     setMessage("");

// // // //     const payload = {
// // // //       imageUrl: formData.imageUrl,
// // // //       altText: formData.altText,
// // // //       order: formData.order || 0,
// // // //     };

// // // //     try {
// // // //       let res;
// // // //       if (editingId) {
// // // //         res = await fetch(`${API_BASE_URL}${config.apiPath}/${editingId}`, {
// // // //           method: "PUT",
// // // //           headers: { "Content-Type": "application/json" },
// // // //           body: JSON.stringify(payload),
// // // //         });
// // // //       } else {
// // // //         res = await fetch(`${API_BASE_URL}${config.apiPath}`, {
// // // //           method: "POST",
// // // //           headers: { "Content-Type": "application/json" },
// // // //           body: JSON.stringify(payload),
// // // //         });
// // // //       }

// // // //       const data = await res.json();

// // // //       if (!data.success) {
// // // //         setMessage(`❌ ${data.error || "Something went wrong."}`);
// // // //         setSubmitting(false);
// // // //         return;
// // // //       }

// // // //       setMessage(editingId ? "✅ Successfully updated!" : `✅ ${config.label} successfully upload ho gaya!`);

// // // //       setFormData(EMPTY_FORM);
// // // //       setEditingId(null);
// // // //       setShowForm(false);

// // // //       await loadSlides();

// // // //       setTimeout(() => setMessage(""), 3000);
// // // //     } catch (err) {
// // // //       console.error("handleSubmit error:", err);
// // // //       setMessage("❌ Can't connect to server. Please check your internet.");
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   const toggleActive = async (id) => {
// // // //     setRowActionId(id);
// // // //     try {
// // // //       const res = await fetch(`${API_BASE_URL}${config.apiPath}/${id}/toggle-active`, {
// // // //         method: "PATCH",
// // // //       });
// // // //       const data = await res.json();
// // // //       if (data.success) {
// // // //         setSlides((prev) => prev.map((s) => (s._id === id ? data.slide : s)));
// // // //       } else {
// // // //         setMessage(`❌ ${data.error || "Status update nahi ho saka."}`);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("toggleActive error:", err);
// // // //       setMessage("❌ Can't connect to server.");
// // // //     } finally {
// // // //       setRowActionId(null);
// // // //     }
// // // //   };

// // // //   const deleteSlide = async (id) => {
// // // //     setRowActionId(id);
// // // //     try {
// // // //       const res = await fetch(`${API_BASE_URL}${config.apiPath}/${id}`, {
// // // //         method: "DELETE",
// // // //       });
// // // //       const data = await res.json();
// // // //       if (data.success) {
// // // //         setSlides((prev) => prev.filter((s) => s._id !== id));
// // // //         if (editingId === id) {
// // // //           closeForm();
// // // //         }
// // // //       } else {
// // // //         setMessage(`❌ ${data.error || "Delete nahi ho saka."}`);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("deleteSlide error:", err);
// // // //       setMessage("❌ Can't connect to server.");
// // // //     } finally {
// // // //       setRowActionId(null);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
// // // //       {/* 🟢 Type switcher tabs: Hero Slides / Gallery / Collection */}
// // // //       <div className="max-w-xl mx-auto mb-6 flex gap-2 p-1 bg-zinc-200/60 dark:bg-zinc-800/60 rounded-xl">
// // // //         {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
// // // //           <button
// // // //             key={key}
// // // //             type="button"
// // // //             onClick={() => setActiveType(key)}
// // // //             className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
// // // //               activeType === key
// // // //                 ? "bg-white dark:bg-zinc-900 shadow-sm text-zinc-950 dark:text-zinc-50"
// // // //                 : "text-zinc-500 dark:text-zinc-400"
// // // //             }`}
// // // //           >
// // // //             {cfg.label}
// // // //           </button>
// // // //         ))}
// // // //       </div>

// // // //       <div ref={formTopRef} className="max-w-xl mx-auto">
// // // //         {!showForm && (
// // // //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
// // // //             <div>
// // // //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">{config.label} Dashboard</h2>
// // // //               <p className="text-xs text-zinc-500 dark:text-zinc-400">{config.label} images manage karein.</p>
// // // //             </div>
// // // //             <button
// // // //               type="button"
// // // //               onClick={openAddForm}
// // // //               className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
// // // //             >
// // // //               + Add {config.label}
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {showForm && (
// // // //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
// // // //             <div className="flex items-start justify-between mb-1">
// // // //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
// // // //                 {editingId ? `Edit ${config.label}` : `Add New ${config.label}`}
// // // //               </h2>
// // // //               <button
// // // //                 type="button"
// // // //                 onClick={closeForm}
// // // //                 className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
// // // //               >
// // // //                 Close ✕
// // // //               </button>
// // // //             </div>
// // // //             <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
// // // //               {editingId ? "Update details." : `Naya ${config.label} image upload karein.`}
// // // //             </p>

// // // //             {message && (
// // // //               <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
// // // //                 {message}
// // // //               </div>
// // // //             )}

// // // //             <form onSubmit={handleSubmit} className="space-y-4">
// // // //               <div>
// // // //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
// // // //                 <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
// // // //                   <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
// // // //                   <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
// // // //                 </div>

// // // //                 {uploadType === "link" ? (
// // // //                   <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
// // // //                 ) : (
// // // //                   <div className="flex items-center justify-center w-full">
// // // //                     <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${uploadingImage ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
// // // //                       <div className="flex flex-col items-center justify-center pt-3 pb-4">
// // // //                         <p className="text-xs text-zinc-500 dark:text-zinc-400">
// // // //                           {uploadingImage ? (
// // // //                             <span className="font-semibold">Uploading...</span>
// // // //                           ) : (
// // // //                             <>
// // // //                               <span className="font-semibold">Click to upload</span> or drag and drop
// // // //                             </>
// // // //                           )}
// // // //                         </p>
// // // //                         <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
// // // //                       </div>
// // // //                       <input
// // // //                         type="file"
// // // //                         accept="image/*"
// // // //                         onChange={handleImageFileChange}
// // // //                         disabled={uploadingImage}
// // // //                         className="hidden"
// // // //                       />
// // // //                     </label>
// // // //                   </div>
// // // //                 )}
// // // //                 {formData.imageUrl && (
// // // //                   <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
// // // //                     <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               <div>
// // // //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
// // // //                   Alt Text * <span className="normal-case font-normal text-zinc-400">(agar image load na ho to ye show hoga)</span>
// // // //                 </label>
// // // //                 <input
// // // //                   type="text"
// // // //                   name="altText"
// // // //                   value={formData.altText}
// // // //                   onChange={handleChange}
// // // //                   placeholder="e.g. New winter collection banner"
// // // //                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
// // // //                 />
// // // //               </div>

// // // //               <div>
// // // //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
// // // //                   Order (Optional)
// // // //                 </label>
// // // //                 <input
// // // //                   type="number"
// // // //                   name="order"
// // // //                   value={formData.order}
// // // //                   onChange={handleChange}
// // // //                   placeholder="0"
// // // //                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
// // // //                 />
// // // //                 <p className="text-[10px] text-zinc-400 mt-1">
// // // //                   Chota number pehle dikhega. Khali chorein to default 0 ho jayega.
// // // //                 </p>
// // // //               </div>

// // // //               <div className="flex gap-3 mt-4">
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={closeForm}
// // // //                   disabled={submitting}
// // // //                   className="flex-1 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //                 <button
// // // //                   type="submit"
// // // //                   disabled={submitting || uploadingImage}
// // // //                   className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
// // // //                 >
// // // //                   {submitting
// // // //                     ? editingId
// // // //                       ? "Updating..."
// // // //                       : "Uploading..."
// // // //                     : editingId
// // // //                     ? "Update"
// // // //                     : "Upload"}
// // // //                 </button>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* Uploaded Items List */}
// // // //       <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
// // // //         <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded {config.label}</h3>
// // // //         <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
// // // //           Total {slides.length} item{slides.length !== 1 ? "s" : ""}. Yahan edit, {config.supportsToggle ? "active/inactive ya " : ""}delete kar sakte hain.
// // // //         </p>

// // // //         {!showForm && message && (
// // // //           <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
// // // //             {message}
// // // //           </div>
// // // //         )}

// // // //         {loadingSlides ? (
// // // //           <p className="text-sm text-zinc-400 text-center py-6">Loading...</p>
// // // //         ) : slides.length === 0 ? (
// // // //           <p className="text-sm text-zinc-400 text-center py-6">Abhi tak koi item upload nahi hui.</p>
// // // //         ) : (
// // // //           <div className="space-y-3">
// // // //             {slides.map((slide) => (
// // // //               <div
// // // //                 key={slide._id}
// // // //                 className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
// // // //                   editingId === slide._id
// // // //                     ? "border-zinc-900 dark:border-zinc-50"
// // // //                     : "border-zinc-200 dark:border-zinc-800"
// // // //                 }`}
// // // //               >
// // // //                 <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
// // // //                   <img src={slide.imageUrl} alt={slide.altText} className="w-full h-full object-cover" />
// // // //                   {config.supportsToggle && !slide.isActive && (
// // // //                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
// // // //                       <span className="text-[8px] font-bold text-white uppercase">Inactive</span>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>

// // // //                 <div className="flex-1 min-w-0">
// // // //                   <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{slide.altText}</p>
// // // //                   <p className="text-xs text-zinc-500 dark:text-zinc-400">Order: {slide.order}</p>
// // // //                 </div>

// // // //                 <div className="flex flex-col gap-1.5 shrink-0">
// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={() => openEditForm(slide)}
// // // //                     disabled={rowActionId === slide._id}
// // // //                     className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors disabled:opacity-50"
// // // //                   >
// // // //                     Edit
// // // //                   </button>
// // // //                   {config.supportsToggle && (
// // // //                     <button
// // // //                       type="button"
// // // //                       onClick={() => toggleActive(slide._id)}
// // // //                       disabled={rowActionId === slide._id}
// // // //                       className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors disabled:opacity-50 ${
// // // //                         slide.isActive
// // // //                           ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
// // // //                           : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
// // // //                       }`}
// // // //                     >
// // // //                       {rowActionId === slide._id ? "..." : slide.isActive ? "Mark Inactive" : "Mark Active"}
// // // //                     </button>
// // // //                   )}
// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={() => deleteSlide(slide._id)}
// // // //                     disabled={rowActionId === slide._id}
// // // //                     className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
// // // //                   >
// // // //                     {rowActionId === slide._id ? "..." : "Delete"}
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }























// // // "use client";

// // // import * as React from "react";

// // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // // const EMPTY_FORM = {
// // //   imageUrl: "",
// // //   altText: "",
// // //   linkUrl: "",
// // //   order: "",
// // // };

// // // // 🟢 Har type ki apni config: apna API path, apne response keys, aur field names
// // // const TYPE_CONFIG = {
// // //   heroslides: {
// // //     label: "Hero Slides",
// // //     apiPath: "/api/heroslides",
// // //     listQuery: "?all=true",
// // //     supportsToggle: true,
// // //     supportsLink: false,
// // //     imageField: "imageUrl",
// // //     altField: "altText",
// // //   },
// // //   gallery: {
// // //     label: "Gallery",
// // //     apiPath: "/api/gallery",
// // //     listQuery: "",
// // //     supportsToggle: false,
// // //     supportsLink: false,
// // //     imageField: "imageUrl",
// // //     altField: "altText",
// // //   },
// // //   collection: {
// // //     label: "Collection",
// // //     apiPath: "/api/gallery",
// // //     listQuery: "",
// // //     supportsToggle: false,
// // //     supportsLink: false,
// // //     imageField: "imageUrl",
// // //     altField: "altText",
// // //   },
// // //   // 🟢 Naya tab: Social Cards -> /api/socialcards (imgUrl, alt, linkUrl, order)
// // //   socialcards: {
// // //     label: "Social Cards",
// // //     apiPath: "/api/socialcards",
// // //     listQuery: "?all=true",
// // //     supportsToggle: true,
// // //     supportsLink: true,
// // //     imageField: "imgUrl",
// // //     altField: "alt",
// // //   },
// // // };

// // // export default function PostsPage() {
// // //   const [activeType, setActiveType] = React.useState("heroslides");

// // //   const [formData, setFormData] = React.useState(EMPTY_FORM);
// // //   const [message, setMessage] = React.useState("");
// // //   const [uploadType, setUploadType] = React.useState("link");
// // //   const [slides, setSlides] = React.useState([]);
// // //   const [loadingSlides, setLoadingSlides] = React.useState(true);
// // //   const [submitting, setSubmitting] = React.useState(false);
// // //   const [uploadingImage, setUploadingImage] = React.useState(false);
// // //   const [rowActionId, setRowActionId] = React.useState(null);

// // //   const [showForm, setShowForm] = React.useState(false);
// // //   const [editingId, setEditingId] = React.useState(null);

// // //   const formTopRef = React.useRef(null);

// // //   const config = TYPE_CONFIG[activeType];

// // //   React.useEffect(() => {
// // //     loadSlides();
// // //     setShowForm(false);
// // //     setEditingId(null);
// // //     setFormData(EMPTY_FORM);
// // //     setMessage("");
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [activeType]);

// // //   // 🟢 GET — list load karta hai active type ke apiPath se
// // //   const loadSlides = async () => {
// // //     setLoadingSlides(true);
// // //     try {
// // //       const res = await fetch(`${API_BASE_URL}${config.apiPath}${config.listQuery}`);
// // //       const data = await res.json();
// // //       if (data.success) {
// // //         // 🟢 backend key alag ho sakti hai (slides / images / items / cards) — sab handle
// // //         setSlides(data.slides || data.images || data.items || data.collections || data.cards || []);
// // //       } else {
// // //         setMessage("❌ Data load nahi ho saka. Please reload karein.");
// // //       }
// // //     } catch (err) {
// // //       console.error("loadSlides error:", err);
// // //       setMessage("❌ Can't connect to server. Please check your internet.");
// // //     } finally {
// // //       setLoadingSlides(false);
// // //     }
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleImageFileChange = async (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;

// // //     if (file.size > 5 * 1024 * 1024) {
// // //       setMessage("❌ Image size 5MB se zyada nahi honi chahiye!");
// // //       return;
// // //     }

// // //     const uploadData = new FormData();
// // //     uploadData.append("image", file);

// // //     setUploadingImage(true);
// // //     setMessage("");

// // //     try {
// // //       const res = await fetch(`${API_BASE_URL}/api/upload`, {
// // //         method: "POST",
// // //         body: uploadData,
// // //       });
// // //       const data = await res.json();

// // //       if (data.success) {
// // //         setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
// // //       } else {
// // //         setMessage(`❌ ${data.error || "Image upload nahi ho saki."}`);
// // //       }
// // //     } catch (err) {
// // //       console.error("Image upload error:", err);
// // //       setMessage("❌ Image upload failed. Please check your internet.");
// // //     } finally {
// // //       setUploadingImage(false);
// // //     }
// // //   };

// // //   const openAddForm = () => {
// // //     setEditingId(null);
// // //     setFormData(EMPTY_FORM);
// // //     setUploadType("link");
// // //     setMessage("");
// // //     setShowForm(true);
// // //     setTimeout(() => {
// // //       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// // //     }, 0);
// // //   };

// // //   // 🟢 Edit ke waqt config.imageField/altField se sahi value uthate hain
// // //   const openEditForm = (slide) => {
// // //     setEditingId(slide._id);
// // //     setFormData({
// // //       imageUrl: slide[config.imageField] || "",
// // //       altText: slide[config.altField] || "",
// // //       linkUrl: slide.linkUrl || "",
// // //       order: slide.order !== undefined && slide.order !== null ? String(slide.order) : "",
// // //     });
// // //     setUploadType("link");
// // //     setMessage("");
// // //     setShowForm(true);
// // //     setTimeout(() => {
// // //       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// // //     }, 0);
// // //   };

// // //   const closeForm = () => {
// // //     setShowForm(false);
// // //     setEditingId(null);
// // //     setFormData(EMPTY_FORM);
// // //     setMessage("");
// // //   };

// // //   // 🟢 POST/PUT — payload ke field names config ke hisab se banate hain
// // //   // (heroslides/gallery -> imageUrl/altText, socialcards -> imgUrl/alt/linkUrl)
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     if (!formData.imageUrl || !formData.altText) {
// // //       setMessage("❌ Image aur Alt text lazmi hain.");
// // //       return;
// // //     }

// // //     setSubmitting(true);
// // //     setMessage("");

// // //     const payload = {
// // //       [config.imageField]: formData.imageUrl,
// // //       [config.altField]: formData.altText,
// // //       order: formData.order || 0,
// // //     };
// // //     if (config.supportsLink) {
// // //       payload.linkUrl = formData.linkUrl || "";
// // //     }

// // //     try {
// // //       let res;
// // //       if (editingId) {
// // //         res = await fetch(`${API_BASE_URL}${config.apiPath}/${editingId}`, {
// // //           method: "PUT",
// // //           headers: { "Content-Type": "application/json" },
// // //           body: JSON.stringify(payload),
// // //         });
// // //       } else {
// // //         res = await fetch(`${API_BASE_URL}${config.apiPath}`, {
// // //           method: "POST",
// // //           headers: { "Content-Type": "application/json" },
// // //           body: JSON.stringify(payload),
// // //         });
// // //       }

// // //       const data = await res.json();

// // //       if (!data.success) {
// // //         setMessage(`❌ ${data.error || "Something went wrong."}`);
// // //         setSubmitting(false);
// // //         return;
// // //       }

// // //       setMessage(editingId ? "✅ Successfully updated!" : `✅ ${config.label} successfully upload ho gaya!`);

// // //       setFormData(EMPTY_FORM);
// // //       setEditingId(null);
// // //       setShowForm(false);

// // //       await loadSlides();

// // //       setTimeout(() => setMessage(""), 3000);
// // //     } catch (err) {
// // //       console.error("handleSubmit error:", err);
// // //       setMessage("❌ Can't connect to server. Please check your internet.");
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   const toggleActive = async (id) => {
// // //     setRowActionId(id);
// // //     try {
// // //       const res = await fetch(`${API_BASE_URL}${config.apiPath}/${id}/toggle-active`, {
// // //         method: "PATCH",
// // //       });
// // //       const data = await res.json();
// // //       if (data.success) {
// // //         const updated = data.slide || data.card;
// // //         setSlides((prev) => prev.map((s) => (s._id === id ? updated : s)));
// // //       } else {
// // //         setMessage(`❌ ${data.error || "Status update nahi ho saka."}`);
// // //       }
// // //     } catch (err) {
// // //       console.error("toggleActive error:", err);
// // //       setMessage("❌ Can't connect to server.");
// // //     } finally {
// // //       setRowActionId(null);
// // //     }
// // //   };

// // //   const deleteSlide = async (id) => {
// // //     setRowActionId(id);
// // //     try {
// // //       const res = await fetch(`${API_BASE_URL}${config.apiPath}/${id}`, {
// // //         method: "DELETE",
// // //       });
// // //       const data = await res.json();
// // //       if (data.success) {
// // //         setSlides((prev) => prev.filter((s) => s._id !== id));
// // //         if (editingId === id) {
// // //           closeForm();
// // //         }
// // //       } else {
// // //         setMessage(`❌ ${data.error || "Delete nahi ho saka."}`);
// // //       }
// // //     } catch (err) {
// // //       console.error("deleteSlide error:", err);
// // //       setMessage("❌ Can't connect to server.");
// // //     } finally {
// // //       setRowActionId(null);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
// // //       {/* 🟢 Type switcher tabs */}
// // //       <div className="max-w-xl mx-auto mb-6 flex gap-2 p-1 bg-zinc-200/60 dark:bg-zinc-800/60 rounded-xl overflow-x-auto">
// // //         {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
// // //           <button
// // //             key={key}
// // //             type="button"
// // //             onClick={() => setActiveType(key)}
// // //             className={`flex-1 whitespace-nowrap py-2 px-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
// // //               activeType === key
// // //                 ? "bg-white dark:bg-zinc-900 shadow-sm text-zinc-950 dark:text-zinc-50"
// // //                 : "text-zinc-500 dark:text-zinc-400"
// // //             }`}
// // //           >
// // //             {cfg.label}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       <div ref={formTopRef} className="max-w-xl mx-auto">
// // //         {!showForm && (
// // //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
// // //             <div>
// // //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">{config.label} Dashboard</h2>
// // //               <p className="text-xs text-zinc-500 dark:text-zinc-400">{config.label} images manage karein.</p>
// // //             </div>
// // //             <button
// // //               type="button"
// // //               onClick={openAddForm}
// // //               className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
// // //             >
// // //               + Add {config.label}
// // //             </button>
// // //           </div>
// // //         )}

// // //         {showForm && (
// // //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
// // //             <div className="flex items-start justify-between mb-1">
// // //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
// // //                 {editingId ? `Edit ${config.label}` : `Add New ${config.label}`}
// // //               </h2>
// // //               <button
// // //                 type="button"
// // //                 onClick={closeForm}
// // //                 className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
// // //               >
// // //                 Close ✕
// // //               </button>
// // //             </div>
// // //             <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
// // //               {editingId ? "Update details." : `Naya ${config.label} image upload karein.`}
// // //             </p>

// // //             {message && (
// // //               <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
// // //                 {message}
// // //               </div>
// // //             )}

// // //             <form onSubmit={handleSubmit} className="space-y-4">
// // //               <div>
// // //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
// // //                 <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
// // //                   <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
// // //                   <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
// // //                 </div>

// // //                 {uploadType === "link" ? (
// // //                   <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
// // //                 ) : (
// // //                   <div className="flex items-center justify-center w-full">
// // //                     <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${uploadingImage ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
// // //                       <div className="flex flex-col items-center justify-center pt-3 pb-4">
// // //                         <p className="text-xs text-zinc-500 dark:text-zinc-400">
// // //                           {uploadingImage ? (
// // //                             <span className="font-semibold">Uploading...</span>
// // //                           ) : (
// // //                             <>
// // //                               <span className="font-semibold">Click to upload</span> or drag and drop
// // //                             </>
// // //                           )}
// // //                         </p>
// // //                         <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
// // //                       </div>
// // //                       <input
// // //                         type="file"
// // //                         accept="image/*"
// // //                         onChange={handleImageFileChange}
// // //                         disabled={uploadingImage}
// // //                         className="hidden"
// // //                       />
// // //                     </label>
// // //                   </div>
// // //                 )}
// // //                 {formData.imageUrl && (
// // //                   <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
// // //                     <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               <div>
// // //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
// // //                   Alt Text * <span className="normal-case font-normal text-zinc-400">(agar image load na ho to ye show hoga)</span>
// // //                 </label>
// // //                 <input
// // //                   type="text"
// // //                   name="altText"
// // //                   value={formData.altText}
// // //                   onChange={handleChange}
// // //                   placeholder="e.g. New winter collection banner"
// // //                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
// // //                 />
// // //               </div>

// // //               {/* 🟢 Sirf Social Cards ke liye Link URL field */}
// // //               {config.supportsLink && (
// // //                 <div>
// // //                   <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
// // //                     Link URL (Optional)
// // //                   </label>
// // //                   <input
// // //                     type="text"
// // //                     name="linkUrl"
// // //                     value={formData.linkUrl}
// // //                     onChange={handleChange}
// // //                     placeholder="e.g. https://instagram.com/... ya /product/123"
// // //                     className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
// // //                   />
// // //                   <p className="text-[10px] text-zinc-400 mt-1">
// // //                     Card par click karne se yahan navigate hoga. Khali chorein to card sirf display hogi.
// // //                   </p>
// // //                 </div>
// // //               )}

// // //               <div>
// // //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
// // //                   Order (Optional)
// // //                 </label>
// // //                 <input
// // //                   type="number"
// // //                   name="order"
// // //                   value={formData.order}
// // //                   onChange={handleChange}
// // //                   placeholder="0"
// // //                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
// // //                 />
// // //                 <p className="text-[10px] text-zinc-400 mt-1">
// // //                   Chota number pehle dikhega. Khali chorein to default 0 ho jayega.
// // //                 </p>
// // //               </div>

// // //               <div className="flex gap-3 mt-4">
// // //                 <button
// // //                   type="button"
// // //                   onClick={closeForm}
// // //                   disabled={submitting}
// // //                   className="flex-1 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <button
// // //                   type="submit"
// // //                   disabled={submitting || uploadingImage}
// // //                   className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
// // //                 >
// // //                   {submitting
// // //                     ? editingId
// // //                       ? "Updating..."
// // //                       : "Uploading..."
// // //                     : editingId
// // //                     ? "Update"
// // //                     : "Upload"}
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Uploaded Items List */}
// // //       <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
// // //         <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded {config.label}</h3>
// // //         <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
// // //           Total {slides.length} item{slides.length !== 1 ? "s" : ""}. Yahan edit, {config.supportsToggle ? "active/inactive ya " : ""}delete kar sakte hain.
// // //         </p>

// // //         {!showForm && message && (
// // //           <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
// // //             {message}
// // //           </div>
// // //         )}

// // //         {loadingSlides ? (
// // //           <p className="text-sm text-zinc-400 text-center py-6">Loading...</p>
// // //         ) : slides.length === 0 ? (
// // //           <p className="text-sm text-zinc-400 text-center py-6">Abhi tak koi item upload nahi hui.</p>
// // //         ) : (
// // //           <div className="space-y-3">
// // //             {slides.map((slide) => {
// // //               const imgSrc = slide[config.imageField];
// // //               const altTxt = slide[config.altField];
// // //               return (
// // //                 <div
// // //                   key={slide._id}
// // //                   className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
// // //                     editingId === slide._id
// // //                       ? "border-zinc-900 dark:border-zinc-50"
// // //                       : "border-zinc-200 dark:border-zinc-800"
// // //                   }`}
// // //                 >
// // //                   <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
// // //                     <img src={imgSrc} alt={altTxt} className="w-full h-full object-cover" />
// // //                     {config.supportsToggle && !slide.isActive && (
// // //                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
// // //                         <span className="text-[8px] font-bold text-white uppercase">Inactive</span>
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   <div className="flex-1 min-w-0">
// // //                     <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{altTxt}</p>
// // //                     <p className="text-xs text-zinc-500 dark:text-zinc-400">Order: {slide.order}</p>
// // //                     {config.supportsLink && slide.linkUrl && (
// // //                       <p className="text-[10px] text-blue-500 truncate">{slide.linkUrl}</p>
// // //                     )}
// // //                   </div>

// // //                   <div className="flex flex-col gap-1.5 shrink-0">
// // //                     <button
// // //                       type="button"
// // //                       onClick={() => openEditForm(slide)}
// // //                       disabled={rowActionId === slide._id}
// // //                       className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors disabled:opacity-50"
// // //                     >
// // //                       Edit
// // //                     </button>
// // //                     {config.supportsToggle && (
// // //                       <button
// // //                         type="button"
// // //                         onClick={() => toggleActive(slide._id)}
// // //                         disabled={rowActionId === slide._id}
// // //                         className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors disabled:opacity-50 ${
// // //                           slide.isActive
// // //                             ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
// // //                             : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
// // //                         }`}
// // //                       >
// // //                         {rowActionId === slide._id ? "..." : slide.isActive ? "Mark Inactive" : "Mark Active"}
// // //                       </button>
// // //                     )}
// // //                     <button
// // //                       type="button"
// // //                       onClick={() => deleteSlide(slide._id)}
// // //                       disabled={rowActionId === slide._id}
// // //                       className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
// // //                     >
// // //                       {rowActionId === slide._id ? "..." : "Delete"}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

























// // "use client";

// // import * as React from "react";

// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // const EMPTY_FORM = {
// //   imageUrl: "",
// //   altText: "",
// //   linkUrl: "",
// //   order: "",
// // };

// // // 🟢 Har type ki apni config: apna API path, apne response keys, aur field names
// // const TYPE_CONFIG = {
// //   heroslides: {
// //     label: "Hero Slides",
// //     apiPath: "/api/heroslides",
// //     listQuery: "?all=true",
// //     supportsToggle: true,
// //     supportsLink: false,
// //     imageField: "imageUrl",
// //     altField: "altText",
// //   },
// //   gallery: {
// //     label: "Gallery",
// //     apiPath: "/api/gallery",
// //     listQuery: "",
// //     supportsToggle: false,
// //     supportsLink: false,
// //     imageField: "imageUrl",
// //     altField: "altText",
// //   },
// //   collection: {
// //     label: "Collection",
// //     apiPath: "/api/gallery",
// //     listQuery: "",
// //     supportsToggle: false,
// //     supportsLink: false,
// //     imageField: "imageUrl",
// //     altField: "altText",
// //   },
// //   socialcards: {
// //     label: "Social Cards",
// //     apiPath: "/api/socialcards",
// //     listQuery: "?all=true",
// //     supportsToggle: true,
// //     supportsLink: true,
// //     imageField: "imgUrl",
// //     altField: "alt",
// //   },
// //   // 🟢 NEW: Radial Gallery Section Added Here!
// //   radialgallery: {
// //     label: "Radial Gallery",
// //     apiPath: "/api/radialgallery",
// //     listQuery: "?all=true",     // Admin panel mein active/inactive dono dikhani hain
// //     supportsToggle: true,       // isme isActive wala feature hai
// //     supportsLink: true,         // isme linkUrl bhi hai
// //     imageField: "imgUrl",       // DB Schema mein iska naam imgUrl hai
// //     altField: "alt",            // DB Schema mein iska naam alt hai
// //   },
// // };

// // export default function PostsPage() {
// //   const [activeType, setActiveType] = React.useState("heroslides");

// //   const [formData, setFormData] = React.useState(EMPTY_FORM);
// //   const [message, setMessage] = React.useState("");
// //   const [uploadType, setUploadType] = React.useState("link");
// //   const [slides, setSlides] = React.useState([]);
// //   const [loadingSlides, setLoadingSlides] = React.useState(true);
// //   const [submitting, setSubmitting] = React.useState(false);
// //   const [uploadingImage, setUploadingImage] = React.useState(false);
// //   const [rowActionId, setRowActionId] = React.useState(null);

// //   const [showForm, setShowForm] = React.useState(false);
// //   const [editingId, setEditingId] = React.useState(null);

// //   const formTopRef = React.useRef(null);

// //   const config = TYPE_CONFIG[activeType];

// //   React.useEffect(() => {
// //     loadSlides();
// //     setShowForm(false);
// //     setEditingId(null);
// //     setFormData(EMPTY_FORM);
// //     setMessage("");
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [activeType]);

// //   // 🟢 GET — list load karta hai active type ke apiPath se
// //   const loadSlides = async () => {
// //     setLoadingSlides(true);
// //     try {
// //       const res = await fetch(`${API_BASE_URL}${config.apiPath}${config.listQuery}`);
// //       const data = await res.json();
// //       if (data.success) {
// //         // 🟢 backend key alag ho sakti hai (slides / images / items / cards) — sab handle
// //         setSlides(data.slides || data.images || data.items || data.collections || data.cards || []);
// //       } else {
// //         setMessage("❌ Data load nahi ho saka. Please reload karein.");
// //       }
// //     } catch (err) {
// //       console.error("loadSlides error:", err);
// //       setMessage("❌ Can't connect to server. Please check your internet.");
// //     } finally {
// //       setLoadingSlides(false);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleImageFileChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     if (file.size > 5 * 1024 * 1024) {
// //       setMessage("❌ Image size 5MB se zyada nahi honi chahiye!");
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
// //         setMessage(`❌ ${data.error || "Image upload nahi ho saki."}`);
// //       }
// //     } catch (err) {
// //       console.error("Image upload error:", err);
// //       setMessage("❌ Image upload failed. Please check your internet.");
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

// //   // 🟢 Edit ke waqt config.imageField/altField se sahi value uthate hain
// //   const openEditForm = (slide) => {
// //     setEditingId(slide._id);
// //     setFormData({
// //       imageUrl: slide[config.imageField] || "",
// //       altText: slide[config.altField] || "",
// //       linkUrl: slide.linkUrl || "",
// //       order: slide.order !== undefined && slide.order !== null ? String(slide.order) : "",
// //     });
// //     setUploadType("link");
// //     setMessage("");
// //     setShowForm(true);
// //     setTimeout(() => {
// //       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// //     }, 0);
// //   };

// //   // 🟢 POST/PUT — payload ke field names config ke hisab se banate hain
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.imageUrl || !formData.altText) {
// //       setMessage("❌ Image aur Alt text lazmi hain.");
// //       return;
// //     }

// //     setSubmitting(true);
// //     setMessage("");

// //     const payload = {
// //       [config.imageField]: formData.imageUrl,
// //       [config.altField]: formData.altText,
// //       order: formData.order || 0,
// //     };
// //     if (config.supportsLink) {
// //       payload.linkUrl = formData.linkUrl || "";
// //     }

// //     try {
// //       let res;
// //       if (editingId) {
// //         res = await fetch(`${API_BASE_URL}${config.apiPath}/${editingId}`, {
// //           method: "PUT",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify(payload),
// //         });
// //       } else {
// //         res = await fetch(`${API_BASE_URL}${config.apiPath}`, {
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

// //       setMessage(editingId ? "✅ Successfully updated!" : `✅ ${config.label} successfully upload ho gaya!`);

// //       setFormData(EMPTY_FORM);
// //       setEditingId(null);
// //       setShowForm(false);

// //       await loadSlides();

// //       setTimeout(() => setMessage(""), 3000);
// //     } catch (err) {
// //       console.error("handleSubmit error:", err);
// //       setMessage("❌ Can't connect to server. Please check your internet.");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const toggleActive = async (id) => {
// //     setRowActionId(id);
// //     try {
// //       const res = await fetch(`${API_BASE_URL}${config.apiPath}/${id}/toggle-active`, {
// //         method: "PATCH",
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         // radial gallery ka controller "item" bhejta hai, baaki "slide" ya "card" bhejte hain
// //         const updated = data.slide || data.card || data.item;
// //         setSlides((prev) => prev.map((s) => (s._id === id ? updated : s)));
// //       } else {
// //         setMessage(`❌ ${data.error || "Status update nahi ho saka."}`);
// //       }
// //     } catch (err) {
// //       console.error("toggleActive error:", err);
// //       setMessage("❌ Can't connect to server.");
// //     } finally {
// //       setRowActionId(null);
// //     }
// //   };

// //   const deleteSlide = async (id) => {
// //     setRowActionId(id);
// //     try {
// //       const res = await fetch(`${API_BASE_URL}${config.apiPath}/${id}`, {
// //         method: "DELETE",
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         setSlides((prev) => prev.filter((s) => s._id !== id));
// //         if (editingId === id) {
// //           closeForm();
// //         }
// //       } else {
// //         setMessage(`❌ ${data.error || "Delete nahi ho saka."}`);
// //       }
// //     } catch (err) {
// //       console.error("deleteSlide error:", err);
// //       setMessage("❌ Can't connect to server.");
// //     } finally {
// //       setRowActionId(null);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
// //       {/* 🟢 Type switcher tabs */}
// //       <div className="max-w-xl mx-auto mb-6 flex gap-2 p-1 bg-zinc-200/60 dark:bg-zinc-800/60 rounded-xl overflow-x-auto">
// //         {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
// //           <button
// //             key={key}
// //             type="button"
// //             onClick={() => setActiveType(key)}
// //             className={`flex-1 whitespace-nowrap py-2 px-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
// //               activeType === key
// //                 ? "bg-white dark:bg-zinc-900 shadow-sm text-zinc-950 dark:text-zinc-50"
// //                 : "text-zinc-500 dark:text-zinc-400"
// //             }`}
// //           >
// //             {cfg.label}
// //           </button>
// //         ))}
// //       </div>

// //       <div ref={formTopRef} className="max-w-xl mx-auto">
// //         {!showForm && (
// //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
// //             <div>
// //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">{config.label} Dashboard</h2>
// //               <p className="text-xs text-zinc-500 dark:text-zinc-400">{config.label} images manage karein.</p>
// //             </div>
// //             <button
// //               type="button"
// //               onClick={openAddForm}
// //               className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
// //             >
// //               + Add {config.label}
// //             </button>
// //           </div>
// //         )}

// //         {showForm && (
// //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
// //             <div className="flex items-start justify-between mb-1">
// //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
// //                 {editingId ? `Edit ${config.label}` : `Add New ${config.label}`}
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
// //               {editingId ? "Update details." : `Naya ${config.label} image upload karein.`}
// //             </p>

// //             {message && (
// //               <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
// //                 {message}
// //               </div>
// //             )}

// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div>
// //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
// //                 <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
// //                   <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
// //                   <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
// //                 </div>

// //                 {uploadType === "link" ? (
// //                   <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
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
// //                   <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
// //                     <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
// //                   </div>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
// //                   Alt Text * <span className="normal-case font-normal text-zinc-400">(agar image load na ho to ye show hoga)</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="altText"
// //                   value={formData.altText}
// //                   onChange={handleChange}
// //                   placeholder="e.g. New winter collection banner"
// //                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
// //                 />
// //               </div>

// //               {/* 🟢 Sirf Social Cards & Radial Gallery ke liye Link URL field */}
// //               {config.supportsLink && (
// //                 <div>
// //                   <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
// //                     Link URL (Optional)
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="linkUrl"
// //                     value={formData.linkUrl}
// //                     onChange={handleChange}
// //                     placeholder="e.g. https://instagram.com/... ya /product/123"
// //                     className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
// //                   />
// //                   <p className="text-[10px] text-zinc-400 mt-1">
// //                     Card par click karne se yahan navigate hoga. Khali chorein to card sirf display hogi.
// //                   </p>
// //                 </div>
// //               )}

// //               <div>
// //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
// //                   Order (Optional)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="order"
// //                   value={formData.order}
// //                   onChange={handleChange}
// //                   placeholder="0"
// //                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
// //                 />
// //                 <p className="text-[10px] text-zinc-400 mt-1">
// //                   Chota number pehle dikhega. Khali chorein to default 0 ho jayega.
// //                 </p>
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
// //                     ? "Update"
// //                     : "Upload"}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         )}
// //       </div>

// //       {/* Uploaded Items List */}
// //       <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
// //         <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded {config.label}</h3>
// //         <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
// //           Total {slides.length} item{slides.length !== 1 ? "s" : ""}. Yahan edit, {config.supportsToggle ? "active/inactive ya " : ""}delete kar sakte hain.
// //         </p>

// //         {!showForm && message && (
// //           <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
// //             {message}
// //           </div>
// //         )}

// //         {loadingSlides ? (
// //           <p className="text-sm text-zinc-400 text-center py-6">Loading...</p>
// //         ) : slides.length === 0 ? (
// //           <p className="text-sm text-zinc-400 text-center py-6">Abhi tak koi item upload nahi hui.</p>
// //         ) : (
// //           <div className="space-y-3">
// //             {slides.map((slide) => {
// //               const imgSrc = slide[config.imageField];
// //               const altTxt = slide[config.altField];
// //               return (
// //                 <div
// //                   key={slide._id}
// //                   className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
// //                     editingId === slide._id
// //                       ? "border-zinc-900 dark:border-zinc-50"
// //                       : "border-zinc-200 dark:border-zinc-800"
// //                   }`}
// //                 >
// //                   <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
// //                     <img src={imgSrc} alt={altTxt} className="w-full h-full object-cover" />
// //                     {config.supportsToggle && !slide.isActive && (
// //                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
// //                         <span className="text-[8px] font-bold text-white uppercase">Inactive</span>
// //                       </div>
// //                     )}
// //                   </div>

// //                   <div className="flex-1 min-w-0">
// //                     <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{altTxt}</p>
// //                     <p className="text-xs text-zinc-500 dark:text-zinc-400">Order: {slide.order}</p>
// //                     {config.supportsLink && slide.linkUrl && (
// //                       <p className="text-[10px] text-blue-500 truncate">{slide.linkUrl}</p>
// //                     )}
// //                   </div>

// //                   <div className="flex flex-col gap-1.5 shrink-0">
// //                     <button
// //                       type="button"
// //                       onClick={() => openEditForm(slide)}
// //                       disabled={rowActionId === slide._id}
// //                       className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors disabled:opacity-50"
// //                     >
// //                       Edit
// //                     </button>
// //                     {config.supportsToggle && (
// //                       <button
// //                         type="button"
// //                         onClick={() => toggleActive(slide._id)}
// //                         disabled={rowActionId === slide._id}
// //                         className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors disabled:opacity-50 ${
// //                           slide.isActive
// //                             ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
// //                             : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
// //                         }`}
// //                       >
// //                         {rowActionId === slide._id ? "..." : slide.isActive ? "Mark Inactive" : "Mark Active"}
// //                       </button>
// //                     )}
// //                     <button
// //                       type="button"
// //                       onClick={() => deleteSlide(slide._id)}
// //                       disabled={rowActionId === slide._id}
// //                       className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
// //                     >
// //                       {rowActionId === slide._id ? "..." : "Delete"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }






















// "use client";

// import * as React from "react";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// const EMPTY_FORM = {
//   imageUrl: "",
//   altText: "",
//   linkUrl: "",
//   order: "",
// };

// // 🟢 Har type ki apni config: apna API path, apne response keys, aur field names
// const TYPE_CONFIG = {
//   heroslides: {
//     label: "Hero Slides",
//     apiPath: "/api/heroslides",
//     listQuery: "?all=true",
//     supportsToggle: true,
//     supportsLink: false,
//     imageField: "imageUrl",
//     altField: "altText",
//   },
//   gallery: {
//     label: "Gallery",
//     apiPath: "/api/gallery",
//     listQuery: "",
//     supportsToggle: false,
//     supportsLink: false,
//     imageField: "imageUrl",
//     altField: "altText",
//   },
//   collection: {
//     label: "Collection",
//     apiPath: "/api/gallery",
//     listQuery: "",
//     supportsToggle: false,
//     supportsLink: false,
//     imageField: "imageUrl",
//     altField: "altText",
//   },
//   socialcards: {
//     label: "Social Cards",
//     apiPath: "/api/socialcards",
//     listQuery: "?all=true",
//     supportsToggle: true,
//     supportsLink: true,
//     imageField: "imgUrl",
//     altField: "alt",
//   },
//   // 🟢 NEW: Radial Gallery Section Added Here!
//   radialgallery: {
//     label: "Radial Gallery",
//     apiPath: "/api/radialgallery",
//     listQuery: "?all=true",     // Admin panel mein active/inactive dono dikhani hain
//     supportsToggle: true,       // isme isActive wala feature hai
//     supportsLink: true,         // isme linkUrl bhi hai
//     imageField: "imgUrl",       // DB Schema mein iska naam imgUrl hai
//     altField: "alt",            // DB Schema mein iska naam alt hai
//   },
// };

// export default function PostsPage() {
//   const [activeType, setActiveType] = React.useState("heroslides");

//   const [formData, setFormData] = React.useState(EMPTY_FORM);
//   const [message, setMessage] = React.useState("");
//   const [uploadType, setUploadType] = React.useState("link");
//   const [slides, setSlides] = React.useState([]);
//   const [loadingSlides, setLoadingSlides] = React.useState(true);
//   const [submitting, setSubmitting] = React.useState(false);
//   const [uploadingImage, setUploadingImage] = React.useState(false);
//   const [rowActionId, setRowActionId] = React.useState(null);

//   const [showForm, setShowForm] = React.useState(false);
//   const [editingId, setEditingId] = React.useState(null);

//   const formTopRef = React.useRef(null);

//   const config = TYPE_CONFIG[activeType];

//   React.useEffect(() => {
//     loadSlides();
//     setShowForm(false);
//     setEditingId(null);
//     setFormData(EMPTY_FORM);
//     setMessage("");
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeType]);

//   // 🟢 GET — list load karta hai active type ke apiPath se
//   const loadSlides = async () => {
//     setLoadingSlides(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}${config.apiPath}${config.listQuery}`);
//       const data = await res.json();
//       if (data.success) {
//         // 🟢 backend key alag ho sakti hai (slides / images / items / cards) — sab handle
//         setSlides(data.slides || data.images || data.items || data.collections || data.cards || []);
//       } else {
//         setMessage("❌ Data load nahi ho saka. Please reload karein.");
//       }
//     } catch (err) {
//       console.error("loadSlides error:", err);
//       setMessage("❌ Can't connect to server. Please check your internet.");
//     } finally {
//       setLoadingSlides(false);
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
//       setMessage("❌ Image size 5MB se zyada nahi honi chahiye!");
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
//         setMessage(`❌ ${data.error || "Image upload nahi ho saki."}`);
//       }
//     } catch (err) {
//       console.error("Image upload error:", err);
//       setMessage("❌ Image upload failed. Please check your internet.");
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

//   // 🟢 Edit ke waqt config.imageField/altField se sahi value uthate hain
//   const openEditForm = (slide) => {
//     setEditingId(slide._id);
//     setFormData({
//       imageUrl: slide[config.imageField] || "",
//       altText: slide[config.altField] || "",
//       linkUrl: slide.linkUrl || "",
//       order: slide.order !== undefined && slide.order !== null ? String(slide.order) : "",
//     });
//     setUploadType("link");
//     setMessage("");
//     setShowForm(true);
//     setTimeout(() => {
//       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 0);
//   };

//   // 🟢 FIXED: Yahan closeForm function add kar diya gaya hai
//   const closeForm = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setFormData(EMPTY_FORM);
//     setMessage("");
//   };

//   // 🟢 POST/PUT — payload ke field names config ke hisab se banate hain
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.imageUrl || !formData.altText) {
//       setMessage("❌ Image aur Alt text lazmi hain.");
//       return;
//     }

//     setSubmitting(true);
//     setMessage("");

//     const payload = {
//       [config.imageField]: formData.imageUrl,
//       [config.altField]: formData.altText,
//       order: formData.order || 0,
//     };
//     if (config.supportsLink) {
//       payload.linkUrl = formData.linkUrl || "";
//     }

//     try {
//       let res;
//       if (editingId) {
//         res = await fetch(`${API_BASE_URL}${config.apiPath}/${editingId}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       } else {
//         res = await fetch(`${API_BASE_URL}${config.apiPath}`, {
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

//       setMessage(editingId ? "✅ Successfully updated!" : `✅ ${config.label} successfully upload ho gaya!`);

//       setFormData(EMPTY_FORM);
//       setEditingId(null);
//       setShowForm(false);

//       await loadSlides();

//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error("handleSubmit error:", err);
//       setMessage("❌ Can't connect to server. Please check your internet.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const toggleActive = async (id) => {
//     setRowActionId(id);
//     try {
//       const res = await fetch(`${API_BASE_URL}${config.apiPath}/${id}/toggle-active`, {
//         method: "PATCH",
//       });
//       const data = await res.json();
//       if (data.success) {
//         // radial gallery ka controller "item" bhejta hai, baaki "slide" ya "card" bhejte hain
//         const updated = data.slide || data.card || data.item;
//         setSlides((prev) => prev.map((s) => (s._id === id ? updated : s)));
//       } else {
//         setMessage(`❌ ${data.error || "Status update nahi ho saka."}`);
//       }
//     } catch (err) {
//       console.error("toggleActive error:", err);
//       setMessage("❌ Can't connect to server.");
//     } finally {
//       setRowActionId(null);
//     }
//   };

//   const deleteSlide = async (id) => {
//     setRowActionId(id);
//     try {
//       const res = await fetch(`${API_BASE_URL}${config.apiPath}/${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success) {
//         setSlides((prev) => prev.filter((s) => s._id !== id));
//         if (editingId === id) {
//           closeForm();
//         }
//       } else {
//         setMessage(`❌ ${data.error || "Delete nahi ho saka."}`);
//       }
//     } catch (err) {
//       console.error("deleteSlide error:", err);
//       setMessage("❌ Can't connect to server.");
//     } finally {
//       setRowActionId(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
//       {/* 🟢 Type switcher tabs */}
//       <div className="max-w-xl mx-auto mb-6 flex gap-2 p-1 bg-zinc-200/60 dark:bg-zinc-800/60 rounded-xl overflow-x-auto">
//         {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
//           <button
//             key={key}
//             type="button"
//             onClick={() => setActiveType(key)}
//             className={`flex-1 whitespace-nowrap py-2 px-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
//               activeType === key
//                 ? "bg-white dark:bg-zinc-900 shadow-sm text-zinc-950 dark:text-zinc-50"
//                 : "text-zinc-500 dark:text-zinc-400"
//             }`}
//           >
//             {cfg.label}
//           </button>
//         ))}
//       </div>

//       <div ref={formTopRef} className="max-w-xl mx-auto">
//         {!showForm && (
//           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
//             <div>
//               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">{config.label} Dashboard</h2>
//               <p className="text-xs text-zinc-500 dark:text-zinc-400">{config.label} images manage karein.</p>
//             </div>
//             <button
//               type="button"
//               onClick={openAddForm}
//               className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
//             >
//               + Add {config.label}
//             </button>
//           </div>
//         )}

//         {showForm && (
//           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
//             <div className="flex items-start justify-between mb-1">
//               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
//                 {editingId ? `Edit ${config.label}` : `Add New ${config.label}`}
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
//               {editingId ? "Update details." : `Naya ${config.label} image upload karein.`}
//             </p>

//             {message && (
//               <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
//                 {message}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
//                 <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
//                   <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
//                   <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
//                 </div>

//                 {uploadType === "link" ? (
//                   <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
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
//                   <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
//                     <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
//                   Alt Text * <span className="normal-case font-normal text-zinc-400">(agar image load na ho to ye show hoga)</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="altText"
//                   value={formData.altText}
//                   onChange={handleChange}
//                   placeholder="e.g. New winter collection banner"
//                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
//                 />
//               </div>

//               {/* 🟢 Sirf Social Cards & Radial Gallery ke liye Link URL field */}
//               {config.supportsLink && (
//                 <div>
//                   <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
//                     Link URL (Optional)
//                   </label>
//                   <input
//                     type="text"
//                     name="linkUrl"
//                     value={formData.linkUrl}
//                     onChange={handleChange}
//                     placeholder="e.g. https://instagram.com/... ya /product/123"
//                     className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
//                   />
//                   <p className="text-[10px] text-zinc-400 mt-1">
//                     Card par click karne se yahan navigate hoga. Khali chorein to card sirf display hogi.
//                   </p>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
//                   Order (Optional)
//                 </label>
//                 <input
//                   type="number"
//                   name="order"
//                   value={formData.order}
//                   onChange={handleChange}
//                   placeholder="0"
//                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
//                 />
//                 <p className="text-[10px] text-zinc-400 mt-1">
//                   Chota number pehle dikhega. Khali chorein to default 0 ho jayega.
//                 </p>
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
//                     ? "Update"
//                     : "Upload"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Uploaded Items List */}
//       <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
//         <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded {config.label}</h3>
//         <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
//           Total {slides.length} item{slides.length !== 1 ? "s" : ""}. Yahan edit, {config.supportsToggle ? "active/inactive ya " : ""}delete kar sakte hain.
//         </p>

//         {!showForm && message && (
//           <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
//             {message}
//           </div>
//         )}

//         {loadingSlides ? (
//           <p className="text-sm text-zinc-400 text-center py-6">Loading...</p>
//         ) : slides.length === 0 ? (
//           <p className="text-sm text-zinc-400 text-center py-6">Abhi tak koi item upload nahi hui.</p>
//         ) : (
//           <div className="space-y-3">
//             {slides.map((slide) => {
//               const imgSrc = slide[config.imageField];
//               const altTxt = slide[config.altField];
//               return (
//                 <div
//                   key={slide._id}
//                   className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
//                     editingId === slide._id
//                       ? "border-zinc-900 dark:border-zinc-50"
//                       : "border-zinc-200 dark:border-zinc-800"
//                   }`}
//                 >
//                   <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
//                     <img src={imgSrc} alt={altTxt} className="w-full h-full object-cover" />
//                     {config.supportsToggle && !slide.isActive && (
//                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                         <span className="text-[8px] font-bold text-white uppercase">Inactive</span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{altTxt}</p>
//                     <p className="text-xs text-zinc-500 dark:text-zinc-400">Order: {slide.order}</p>
//                     {config.supportsLink && slide.linkUrl && (
//                       <p className="text-[10px] text-blue-500 truncate">{slide.linkUrl}</p>
//                     )}
//                   </div>

//                   <div className="flex flex-col gap-1.5 shrink-0">
//                     <button
//                       type="button"
//                       onClick={() => openEditForm(slide)}
//                       disabled={rowActionId === slide._id}
//                       className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors disabled:opacity-50"
//                     >
//                       Edit
//                     </button>
//                     {config.supportsToggle && (
//                       <button
//                         type="button"
//                         onClick={() => toggleActive(slide._id)}
//                         disabled={rowActionId === slide._id}
//                         className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors disabled:opacity-50 ${
//                           slide.isActive
//                             ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
//                             : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
//                         }`}
//                       >
//                         {rowActionId === slide._id ? "..." : slide.isActive ? "Mark Inactive" : "Mark Active"}
//                       </button>
//                     )}
//                     <button
//                       type="button"
//                       onClick={() => deleteSlide(slide._id)}
//                       disabled={rowActionId === slide._id}
//                       className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
//                     >
//                       {rowActionId === slide._id ? "..." : "Delete"}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


































"use client";

import * as React from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const EMPTY_FORM = {
  imageUrl: "",
  altText: "",
  linkUrl: "",
  order: "",
  text: "", // 🟢 NEW: For text-only items like Marquee
};

// 🟢 Har type ki apni config: apna API path, apne response keys, aur field names
const TYPE_CONFIG = {
  heroslides: {
    label: "Hero Slides",
    apiPath: "/api/heroslides",
    listQuery: "?all=true",
    supportsToggle: true,
    supportsLink: false,
    imageField: "imageUrl",
    altField: "altText",
  },
  gallery: {
    label: "Gallery",
    apiPath: "/api/gallery",
    listQuery: "",
    supportsToggle: false,
    supportsLink: false,
    imageField: "imageUrl",
    altField: "altText",
  },
  collection: {
    label: "Collection",
    apiPath: "/api/gallery",
    listQuery: "",
    supportsToggle: false,
    supportsLink: false,
    imageField: "imageUrl",
    altField: "altText",
  },
  socialcards: {
    label: "Social Cards",
    apiPath: "/api/socialcards",
    listQuery: "?all=true",
    supportsToggle: true,
    supportsLink: true,
    imageField: "imgUrl",
    altField: "alt",
  },
  radialgallery: {
    label: "Radial Gallery",
    apiPath: "/api/radialgallery",
    listQuery: "?all=true",
    supportsToggle: true,
    supportsLink: true,
    imageField: "imgUrl",
    altField: "alt",
  },
  // 🟢 NEW: Marquee Section Added
  marquee: {
    label: "Marquee Texts",
    apiPath: "/api/marquee",
    listQuery: "?all=true",
    supportsToggle: true,
    supportsLink: true,
    isTextOnly: true, // 🟢 Is type mein image upload show nahi hoga
    textField: "text",
  },
};

export default function PostsPage() {
  const [activeType, setActiveType] = React.useState("heroslides");

  const [formData, setFormData] = React.useState(EMPTY_FORM);
  const [message, setMessage] = React.useState("");
  const [uploadType, setUploadType] = React.useState("link");
  const [slides, setSlides] = React.useState([]);
  const [loadingSlides, setLoadingSlides] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [rowActionId, setRowActionId] = React.useState(null);

  const [showForm, setShowForm] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);

  const formTopRef = React.useRef(null);

  const config = TYPE_CONFIG[activeType];

  React.useEffect(() => {
    loadSlides();
    setShowForm(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setMessage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType]);

  const loadSlides = async () => {
    setLoadingSlides(true);
    try {
      const res = await fetch(`${API_BASE_URL}${config.apiPath}${config.listQuery}`);
      const data = await res.json();
      if (data.success) {
        setSlides(data.slides || data.images || data.items || data.collections || data.cards || []);
      } else {
        setMessage("❌ Data load nahi ho saka. Please reload karein.");
      }
    } catch (err) {
      console.error("loadSlides error:", err);
      setMessage("❌ Can't connect to server. Please check your internet.");
    } finally {
      setLoadingSlides(false);
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
      setMessage("❌ Image size 5MB se zyada nahi honi chahiye!");
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
        setMessage(`❌ ${data.error || "Image upload nahi ho saki."}`);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setMessage("❌ Image upload failed. Please check your internet.");
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

  const openEditForm = (slide) => {
    setEditingId(slide._id);
    setFormData({
      imageUrl: !config.isTextOnly ? (slide[config.imageField] || "") : "",
      altText: !config.isTextOnly ? (slide[config.altField] || "") : "",
      text: config.isTextOnly ? (slide[config.textField] || "") : "",
      linkUrl: slide.linkUrl || "",
      order: slide.order !== undefined && slide.order !== null ? String(slide.order) : "",
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

    // 🟢 Validation based on type
    if (config.isTextOnly) {
      if (!formData.text) {
        setMessage("❌ Text lazmi hai.");
        return;
      }
    } else {
      if (!formData.imageUrl || !formData.altText) {
        setMessage("❌ Image aur Alt text lazmi hain.");
        return;
      }
    }

    setSubmitting(true);
    setMessage("");

    // 🟢 Payload generation based on type
    const payload = {
      order: formData.order || 0,
    };
    
    if (config.supportsLink) {
      payload.linkUrl = formData.linkUrl || "";
    }

    if (config.isTextOnly) {
      payload[config.textField] = formData.text;
    } else {
      payload[config.imageField] = formData.imageUrl;
      payload[config.altField] = formData.altText;
    }

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_BASE_URL}${config.apiPath}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}${config.apiPath}`, {
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

      setMessage(editingId ? "✅ Successfully updated!" : `✅ ${config.label} successfully upload ho gaya!`);

      setFormData(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);

      await loadSlides();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("handleSubmit error:", err);
      setMessage("❌ Can't connect to server. Please check your internet.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (id) => {
    setRowActionId(id);
    try {
      const res = await fetch(`${API_BASE_URL}${config.apiPath}/${id}/toggle-active`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        const updated = data.slide || data.card || data.item;
        setSlides((prev) => prev.map((s) => (s._id === id ? updated : s)));
      } else {
        setMessage(`❌ ${data.error || "Status update nahi ho saka."}`);
      }
    } catch (err) {
      console.error("toggleActive error:", err);
      setMessage("❌ Can't connect to server.");
    } finally {
      setRowActionId(null);
    }
  };

  const deleteSlide = async (id) => {
    setRowActionId(id);
    try {
      const res = await fetch(`${API_BASE_URL}${config.apiPath}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSlides((prev) => prev.filter((s) => s._id !== id));
        if (editingId === id) {
          closeForm();
        }
      } else {
        setMessage(`❌ ${data.error || "Delete nahi ho saka."}`);
      }
    } catch (err) {
      console.error("deleteSlide error:", err);
      setMessage("❌ Can't connect to server.");
    } finally {
      setRowActionId(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      {/* 🟢 Type switcher tabs */}
      <div className="max-w-xl mx-auto mb-6 flex gap-2 p-1 bg-zinc-200/60 dark:bg-zinc-800/60 rounded-xl overflow-x-auto scrollbar-hide">
        {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveType(key)}
            className={`flex-1 whitespace-nowrap py-2 px-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeType === key
                ? "bg-white dark:bg-zinc-900 shadow-sm text-zinc-950 dark:text-zinc-50"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {cfg.label}
          </button>
        ))}
      </div>

      <div ref={formTopRef} className="max-w-xl mx-auto">
        {!showForm && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">{config.label} Dashboard</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{config.label} manage karein.</p>
            </div>
            <button
              type="button"
              onClick={openAddForm}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              + Add {config.label}
            </button>
          </div>
        )}

        {showForm && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {editingId ? `Edit ${config.label}` : `Add New ${config.label}`}
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
              {editingId ? "Update details." : `Naya ${config.label} add karein.`}
            </p>

            {message && (
              <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* 🟢 Image Upload Section (Hidden for Marquee) */}
              {!config.isTextOnly && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
                    <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
                      <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
                      <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
                    </div>

                    {uploadType === "link" ? (
                      <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
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
                      <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                      Alt Text * <span className="normal-case font-normal text-zinc-400">(agar image load na ho to ye show hoga)</span>
                    </label>
                    <input
                      type="text"
                      name="altText"
                      value={formData.altText}
                      onChange={handleChange}
                      placeholder="e.g. New winter collection banner"
                      className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                    />
                  </div>
                </>
              )}

              {/* 🟢 Text Section (Only for Marquee) */}
              {config.isTextOnly && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    Marquee Text *
                  </label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    placeholder="e.g. FREE SHIPPING ON ALL ORDERS OVER 5000"
                    rows={3}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                  />
                </div>
              )}

              {/* 🟢 Link URL field */}
              {config.supportsLink && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    Link URL (Optional)
                  </label>
                  <input
                    type="text"
                    name="linkUrl"
                    value={formData.linkUrl}
                    onChange={handleChange}
                    placeholder="e.g. /product/123 ya https://..."
                    className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                  />
                  <p className="text-[10px] text-zinc-400 mt-1">
                    Click karne se yahan navigate hoga. Khali chorein to sirf text/image dikhegi.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Order (Optional)
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
                <p className="text-[10px] text-zinc-400 mt-1">
                  Chota number pehle dikhega. Khali chorein to default 0 ho jayega.
                </p>
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
                      : "Saving..."
                    : editingId
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Uploaded Items List */}
      <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded {config.label}</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
          Total {slides.length} item{slides.length !== 1 ? "s" : ""}. Yahan edit, {config.supportsToggle ? "active/inactive ya " : ""}delete kar sakte hain.
        </p>

        {!showForm && message && (
          <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
            {message}
          </div>
        )}

        {loadingSlides ? (
          <p className="text-sm text-zinc-400 text-center py-6">Loading...</p>
        ) : slides.length === 0 ? (
          <p className="text-sm text-zinc-400 text-center py-6">Abhi tak koi item upload nahi hui.</p>
        ) : (
          <div className="space-y-3">
            {slides.map((slide) => {
              const imgSrc = slide[config.imageField];
              const altTxt = slide[config.altField];
              
              return (
                <div
                  key={slide._id}
                  className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
                    editingId === slide._id
                      ? "border-zinc-900 dark:border-zinc-50"
                      : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  {/* 🟢 Thumbnail Image OR Text Icon preview */}
                  {config.isTextOnly ? (
                    <div className="relative w-14 h-14 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      <span className="text-xl">📝</span>
                      {config.supportsToggle && !slide.isActive && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                          <span className="text-[8px] font-bold text-white uppercase">Inactive</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
                      <img src={imgSrc} alt={altTxt} className="w-full h-full object-cover" />
                      {config.supportsToggle && !slide.isActive && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-white uppercase">Inactive</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                      {config.isTextOnly ? slide[config.textField] : altTxt}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Order: {slide.order}</p>
                    {config.supportsLink && slide.linkUrl && (
                      <p className="text-[10px] text-blue-500 truncate">{slide.linkUrl}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEditForm(slide)}
                      disabled={rowActionId === slide._id}
                      className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors disabled:opacity-50"
                    >
                      Edit
                    </button>
                    {config.supportsToggle && (
                      <button
                        type="button"
                        onClick={() => toggleActive(slide._id)}
                        disabled={rowActionId === slide._id}
                        className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                          slide.isActive
                            ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        }`}
                      >
                        {rowActionId === slide._id ? "..." : slide.isActive ? "Mark Inactive" : "Mark Active"}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteSlide(slide._id)}
                      disabled={rowActionId === slide._id}
                      className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
                    >
                      {rowActionId === slide._id ? "..." : "Delete"}
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