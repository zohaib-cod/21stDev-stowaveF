"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../src/app/lib/supabaseClient";


export function useLiveVisitors() {
  const [count, setCount] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const channel = supabase.channel("live-visitors");

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setCount(Object.keys(state).length);
      })
      .subscribe((status) => {
        setConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { count, connected };
}