// import { Inter } from "next/font/google";
// import "./globals.css";
// import  AcmeHero  from "./components/navbar/Navbar"; // Navbar layout path link
// import { Footer7 } from "./components/Footer/Footer";
// import ChatAssistant from "./components/hopingAssistant/assistant";
// import ClientLayoutWrapper from "./components/ClientLayoutWrapper"

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Comfort by Stowave",
//   description: "An interactive tapestry of light and motion",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} antialiased bg-black dark:bg-white`}>
        
//         {/* 1. Global Fixed Layer Container — Yeh ab har page par bilkul top par layer karega */}
//         <div className="fixed top-0 left-0 w-full z-50 pointer-events-auto">
//           <AcmeHero/>
//         </div>

//         {/* 2. Chat Assistant — apna fixed layer, navbar jaisa hi screen par sticky rahega, scroll se independent */}
//         <ChatAssistant/>

//         {/* 3. Page Content Render Area */}
//         <main className="relative min-h-screen">
//           {children}
//           <Footer7/>
//         </main>

//       </body>
//     </html>
//   );
// }








import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper"; // Naya wrapper import

const inter = Inter({ subsets: ["latin"] });

// Server Component metadata bilkul safe rha yahan
export const metadata = {
  title: "Comfort by Stowave",
  description: "An interactive tapestry of light and motion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black dark:bg-white`}>
        {/* Poora layout system is wrapper ke andar handle hoga */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
