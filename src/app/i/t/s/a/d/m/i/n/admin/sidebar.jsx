// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { 
//   Home, 
//   User, 
//   Settings, 
//   LogOut, 
//   Menu, 
//   X, 
//   ChevronLeft, 
//   ChevronRight,
//   BarChart3,
//   FileText,
//   Bell,
//   Search,
//   HelpCircle,
//   ShoppingBag,
//   ShoppingCart,
//   Images,
//   Megaphone,
//   Newspaper,
//   Sparkles,
//   KeyRound,
//   ShoppingBasket,
//   Crown,
//   Quote,
//   Star,
//   BookOpen,
//   MessageSquare,
//   Boxes,
//   Folder
// } from 'lucide-react';

// const basePath = "/i/t/s/a/d/m/i/n/admin";

// const navigationItems = [
//   { id: "dashboard", name: "Dashboard", icon: Home, href: `${basePath}` },
//   { id: "analytics", name: "Analytics", icon: BarChart3, href: `${basePath}/analytics` },
//   { id: "products", name: "Products", icon: ShoppingBag, href: `${basePath}/products` },
//   { id: "orders", name: "Orders", icon: ShoppingCart, href: `${basePath}/orders` },
//   { id: "sliders", name: "Sliders", icon: Images, href: `${basePath}/sliders` },
//   { id: "announcement-bar", name: "Announcement Bar", icon: Megaphone, href: `${basePath}/announcement-bar` },
//   { id: "posts", name: "Posts", icon: Newspaper, href: `${basePath}/posts` },
//   { id: "latest-creation", name: "Latest Creation", icon: Sparkles, href: `${basePath}/latest-creation` },
//   { id: "manage-logins", name: "Manage Logins", icon: KeyRound, href: `${basePath}/manage-logins` },
//   { id: "in-bag", name: "In Bag", icon: ShoppingBasket, href: `${basePath}/in-bag` },
//   { id: "about-founder", name: "About Founder", icon: Crown, href: `${basePath}/about-founder` },
//   { id: "about-quotes", name: "About Quotes", icon: Quote, href: `${basePath}/about-quotes` },
//   { id: "add-reviews", name: "Add Reviews", icon: Star, href: `${basePath}/add-reviews` },
//   { id: "blogs", name: "Blogs", icon: BookOpen, href: `${basePath}/blogs` },
//   { id: "assistant-chats", name: "Assistant Chats", icon: MessageSquare, href: `${basePath}/assistant-chats` },
//   { id: "inventory", name: "Inventory", icon: Boxes, href: `${basePath}/inventory` },
//   { id: "all-files", name: "All Files", icon: Folder, href: `${basePath}/all-files` },
//   { id: "documents", name: "Documents", icon: FileText, href: `${basePath}/documents`, badge: "3" },
//   { id: "notifications", name: "Notifications", icon: Bell, href: `${basePath}/notifications`, badge: "12" },
//   { id: "profile", name: "Profile", icon: User, href: `${basePath}/profile` },
//   { id: "settings", name: "Settings", icon: Settings, href: `${basePath}/settings` },
//   { id: "help", name: "Help & Support", icon: HelpCircle, href: `${basePath}/help` },
// ];

// export function Sidebar({ className = "" }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) { setIsOpen(true); } 
//       else { setIsOpen(false); }
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const toggleCollapse = () => setIsCollapsed(!isCollapsed);

//   const handleLogout = () => {
//     alert("Logging out from Stowave Portal..."); 
//   };

//   return (
//     <>
//       {/* Mobile hamburger button */}
//       <button
//         onClick={toggleSidebar}
//         className="fixed top-6 left-6 z-50 p-3 rounded-lg bg-white shadow-md border border-slate-100 md:hidden hover:bg-slate-50 transition-all duration-200"
//         aria-label="Toggle sidebar"
//       >
//         {isOpen ? <X className="h-5 w-5 text-slate-600" /> : <Menu className="h-5 w-5 text-slate-600" />}
//       </button>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300" onClick={toggleSidebar} />
//       )}

//       {/* Sidebar Main Container */}
//       <div
//         className={`
//           fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-40 transition-all duration-300 ease-in-out flex flex-col
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           ${isCollapsed ? "w-28" : "w-78"}
//           md:translate-x-0 md:static md:z-auto
//           ${className}
//         `}
//       >
//         {/* Header with logo */}
//         <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50/60">
//           {!isCollapsed ? (
//             <div className="flex items-center space-x-2.5">
//               <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
//                 <span className="text-white font-bold text-base">S</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-semibold text-slate-800 text-base">Stowave</span>
//                 <span className="text-xs text-slate-500">Clothing Admin</span>
//               </div>
//             </div>
//           ) : (
//             <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center mx-auto shadow-sm">
//               <span className="text-white font-bold text-base">S</span>
//             </div>
//           )}

//           <button onClick={toggleCollapse} className="hidden md:flex p-1.5 rounded-md hover:bg-slate-100 transition-all duration-200">
//             {isCollapsed ? <ChevronRight className="h-4 w-4 text-slate-500" /> : <ChevronLeft className="h-4 w-4 text-slate-500" />}
//           </button>
//         </div>

//         {/* Search Bar */}
//         {!isCollapsed && (
//           <div className="px-4 py-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search portal..."
//                 className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200"
//               />
//             </div>
//           </div>
//         )}

//         {/* Navigation Middle Items */}
//         <nav className="flex-1 px-3 py-2 overflow-y-auto">
//           <ul className="space-y-0.5">
//             {navigationItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname === item.href;

//               return (
//                 <li key={item.id} className="relative group">
//                   <Link
//                     href={item.href}
//                     onClick={() => window.innerWidth < 768 && setIsOpen(false)}
//                     className={`
//                       w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-md text-left transition-all duration-200
//                       ${isActive ? "bg-slate-100 text-slate-900 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
//                       ${isCollapsed ? "justify-center px-2" : ""}
//                     `}
//                   >
//                     <div className="flex items-center justify-center min-w-[24px]">
//                       <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"}`} />
//                     </div>
                    
//                     {!isCollapsed && (
//                       <div className="flex items-center justify-between w-full">
//                         <span className="text-sm">{item.name}</span>
//                         {item.badge && (
//                           <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${isActive ? "bg-slate-200 text-slate-900" : "bg-slate-100 text-slate-600"}`}>
//                             {item.badge}
//                           </span>
//                         )}
//                       </div>
//                     )}

//                     {isCollapsed && item.badge && (
//                       <div className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-slate-900 border border-white">
//                         <span className="text-[10px] font-medium text-white">
//                           {parseInt(item.badge) > 9 ? '9+' : item.badge}
//                         </span>
//                       </div>
//                     )}
//                   </Link>

//                   {/* Tooltip for collapsed mode */}
//                   {isCollapsed && (
//                     <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
//                       {item.name}
//                     </div>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Footer Profile & Logout Section */}
//         <div className="p-4 border-t border-slate-200 bg-slate-50/50">
//           <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} group relative`}>
            
//             <div className="flex items-center space-x-3 min-w-0">
//               <div className="w-9 h-9 bg-slate-900 rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-white border border-slate-900">
//                 ST
//               </div>
//               {!isCollapsed && (
//                 <div className="flex flex-col min-w-0">
//                   <span className="text-sm font-medium text-slate-700 truncate">Stowave Admin</span>
//                   <span className="text-xs text-slate-500 truncate">portal@stowave.com</span>
//                 </div>
//               )}
//             </div>

//             {!isCollapsed ? (
//               <button 
//                 onClick={handleLogout}
//                 className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all duration-200"
//                 title="Logout"
//               >
//                 <LogOut className="h-4.5 w-4.5" />
//               </button>
//             ) : (
//               <button 
//                 onClick={handleLogout}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                 title="Logout"
//               />
//             )}

//             {isCollapsed && (
//               <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-red-600 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
//                 Click to Logout
//               </div>
//             )}

//           </div>
//         </div>

//       </div>
//     </>
//   );
// }










"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  FileText,
  Bell,
  Search,
  HelpCircle,
  ShoppingBag,
  ShoppingCart,
  Images,
  Megaphone,
  Newspaper,
  Sparkles,
  KeyRound,
  ShoppingBasket,
  Crown,
  Quote,
  Star,
  BookOpen,
  MessageSquare,
  Boxes,
  Trash2,
  MessageSquareLock,
  Folder
} from 'lucide-react';


const basePath = "/i/t/s/a/d/m/i/n/admin";

const navigationItems = [
  { id: "dashboard", name: "Dashboard", icon: Home, href: `${basePath}` },
  { id: "analytics", name: "Messages", icon: MessageSquareLock, href: `${basePath}/analytics` },
  { id: "products", name: "Products", icon: ShoppingBag, href: `${basePath}/products` },
  { id: "orders", name: "Orders", icon: ShoppingCart, href: `${basePath}/order` },
  { id: "sliders", name: "Sliders", icon: Images, href: `${basePath}/sliders` },
  { id: "announcement-bar", name: "Announcement Bar", icon: Megaphone, href: `${basePath}/announcement-bar` },
  { id: "posts", name: "Posts", icon: Newspaper, href: `${basePath}/posts` },
  { id: "latest-creation", name: "Latest Creation", icon: Sparkles, href: `${basePath}/latest-creation` },
  { id: "manage-logins", name: "Manage Logins", icon: KeyRound, href: `${basePath}/manage-logins` },
  { id: "in-bag", name: "In Bag", icon: ShoppingBasket, href: `${basePath}/in-bag` },
  { id: "about-founder", name: "About Founder", icon: Crown, href: `${basePath}/about-founder` },
  { id: "about-quotes", name: "About Quotes", icon: Quote, href: `${basePath}/about-quotes` },
  { id: "add-reviews", name: "Add Reviews", icon: Star, href: `${basePath}/add-reviews` },
  { id: "blogs", name: "Blogs", icon: BookOpen, href: `${basePath}/blogs` },
  { id: "assistant-chats", name: "Assistant Chats", icon: MessageSquare, href: `${basePath}/assistant-chats` },
  { id: "inventory", name: "Inventory", icon: Boxes, href: `${basePath}/inventory` },
  { id: "all-files", name: "All Files", icon: Folder, href: `${basePath}/all-files` },
  { id: "documents", name: "Documents", icon: FileText, href: `${basePath}/documents`, badge: "3" },
  { id: "notifications", name: "Notifications", icon: Bell, href: `${basePath}/notifications`, badge: "12" },
   { id: "trash", name: "Trash", icon: Trash2, href: `${basePath}/order/trash` }, 
  { id: "profile", name: "Profile", icon: User, href: `${basePath}/profile` },
  { id: "settings", name: "Settings", icon: Settings, href: `${basePath}/settings` },
  { id: "help", name: "Help & Support", icon: HelpCircle, href: `${basePath}/help` },
];

export function Sidebar({ className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  // Isko states k bilkul neechay copy-paste karein:
const handleLogout = () => {
  // 1. Cookie delete karna (Path define karna zaroori hai)
  document.cookie = "stowave_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  
  // 2. Clear confirmation screen flash
  alert("Logging out from Stowave Portal...");
  
  // 3. Force redirect to secure login route
  window.location.href = "/i/t/s/a/d/m/i/n/admin/login";
};

  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { setIsOpen(true); } 
      else { setIsOpen(false); }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

//   const handleLogout = () => {
//     alert("Logging out from Stowave Portal..."); 
//   };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-6 left-6 z-50 p-3 rounded-lg bg-white shadow-md border border-slate-100 md:hidden hover:bg-slate-50 transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="h-5 w-5 text-slate-600" /> : <Menu className="h-5 w-5 text-slate-600" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300" onClick={toggleSidebar} />
      )}

      {/* Sidebar Main Container */}
      <div
        className={`
          fixed top-0 left-0 h-screen max-h-screen bg-white border-r border-slate-200 z-40 transition-all duration-300 ease-in-out flex flex-col overflow-hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "w-28" : "w-78"}
          md:translate-x-0 md:static md:z-auto
          ${className}
        `}
      >
        {/* Header with logo */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50/60">
          {!isCollapsed ? (
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-base">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 text-base">Stowave</span>
                <span className="text-xs text-slate-500">Clothing Admin</span>
              </div>
            </div>
          ) : (
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center mx-auto shadow-sm">
              <span className="text-white font-bold text-base">S</span>
            </div>
          )}

          <button onClick={toggleCollapse} className="hidden md:flex p-1.5 rounded-md hover:bg-slate-100 transition-all duration-200">
            {isCollapsed ? <ChevronRight className="h-4 w-4 text-slate-500" /> : <ChevronLeft className="h-4 w-4 text-slate-500" />}
          </button>
        </div>

               {/* Search Bar */}
        {!isCollapsed && (
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search portal..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* Navigation Middle Items */}
        <nav className="flex-1 min-h-0 px-3 py-2 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
          <ul className="space-y-0.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.id} className="relative group">
                  <Link
                    href={item.href}
                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                    className={`
                      w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-md text-left transition-all duration-200
                      ${isActive ? "bg-slate-100 text-slate-900 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
                      ${isCollapsed ? "justify-center px-2" : ""}
                    `}
                  >
                    <div className="flex items-center justify-center min-w-[24px]">
                      <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"}`} />
                    </div>
                    
                    {!isCollapsed && (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm">{item.name}</span>
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${isActive ? "bg-slate-200 text-slate-900" : "bg-slate-100 text-slate-600"}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {isCollapsed && item.badge && (
                      <div className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-slate-900 border border-white">
                        <span className="text-[10px] font-medium text-white">
                          {parseInt(item.badge) > 9 ? '9+' : item.badge}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Tooltip for collapsed mode */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Profile & Logout Section */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} group relative`}>
            
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-9 h-9 bg-slate-900 rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-white border border-slate-900">
                ST
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-slate-700 truncate">Stowave Admin</span>
                  <span className="text-xs text-slate-500 truncate">portal@stowave.com</span>
                </div>
              )}
            </div>

            {!isCollapsed ? (
              <button 
                onClick={handleLogout}
                className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all duration-200"
                title="Logout"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            ) : (
              <button 
                onClick={handleLogout}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                title="Logout"
              />
            )}

            {isCollapsed && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-red-600 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                Click to Logout
              </div>
            )}
            

          </div>
        </div>

      </div>
    </>
  );
}
