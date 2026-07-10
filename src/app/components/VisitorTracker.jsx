// // PATH: /app/components/VisitorTracker.jsx
// // Wahi "components" folder jahan Navbar, Footer, hopingAssistant rakhay hain

// "use client";

// import { useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";

// // Yeh component sirf storefront (customer-facing) pages ke liye hai.
// // Har visitor jab site kholega, yeh ek presence channel join kar lega
// // aur admin dashboard ko real-time pata chal jayega ke kitne log online hain.
// export default function VisitorTracker() {
//   useEffect(() => {
//     const sessionId =
//       sessionStorage.getItem("stowave_session_id") || crypto.randomUUID();
//     sessionStorage.setItem("stowave_session_id", sessionId);

//     const channel = supabase.channel("live-visitors", {
//       config: {
//         presence: { key: sessionId },
//       },
//     });

//     channel.subscribe(async (status) => {
//       if (status === "SUBSCRIBED") {
//         await channel.track({
//           online_at: new Date().toISOString(),
//           page: window.location.pathname,
//         });
//       }
//     });

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   return null; // koi UI nahi, sirf background tracking
// }














// PATH: src/app/components/VisitorTracker.jsx

"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function VisitorTracker() {
  useEffect(() => {
    const sessionId =
      sessionStorage.getItem("stowave_session_id") || crypto.randomUUID();
    sessionStorage.setItem("stowave_session_id", sessionId);

    // ---- 1. Live presence (real-time "abhi kitne online hain") ----
    const channel = supabase.channel("live-visitors", {
      config: {
        presence: { key: sessionId },
      },
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({
          online_at: new Date().toISOString(),
          page: window.location.pathname,
        });
      }
    });

    // ---- 2. Permanent visit log (sirf is tab-session me EK dafa) ----
    const alreadyLogged = sessionStorage.getItem("stowave_logged");
    if (!alreadyLogged) {
      supabase
        .from("visitor_logs")
        .insert({
          session_id: sessionId,
          page: window.location.pathname,
          user_agent: navigator.userAgent,
        })
        .then(({ error }) => {
          if (error) {
            console.error("visitor_logs insert error:", error);
          } else {
            sessionStorage.setItem("stowave_logged", "1");
          }
        });
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}