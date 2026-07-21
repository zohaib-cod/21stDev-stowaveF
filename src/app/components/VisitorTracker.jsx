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