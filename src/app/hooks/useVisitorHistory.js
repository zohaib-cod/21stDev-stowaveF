// // PATH: src/app/hooks/useVisitorHistory.js

// "use client";

// import { supabase } from "../../../src/app/lib/supabaseClient";

// async function getCount(startDate, endDate) {
//   const { data, error } = await supabase.rpc("get_visitor_count", {
//     start_date: startDate.toISOString(),
//     end_date: endDate.toISOString(),
//   });

//   if (error) {
//     console.error("get_visitor_count error:", error);
//     return 0;
//   }
//   return data ?? 0;
// }

// function startOfDay(date) {
//   const d = new Date(date);
//   d.setHours(0, 0, 0, 0);
//   return d;
// }

// export function useVisitorHistory() {
//   async function getToday() {
//     const now = new Date();
//     return getCount(startOfDay(now), now);
//   }

//   async function getLastNDays(n) {
//     const now = new Date();
//     const start = startOfDay(now);
//     start.setDate(start.getDate() - (n - 1));
//     return getCount(start, now);
//   }

//   async function getThisMonth() {
//     const now = new Date();
//     const start = new Date(now.getFullYear(), now.getMonth(), 1);
//     return getCount(start, now);
//   }

//   async function getAllTime() {
//     const start = new Date("2000-01-01");
//     const now = new Date();
//     return getCount(start, now);
//   }

//   async function getCustomRange(fromDateStr, toDateStr) {
//     const start = startOfDay(new Date(fromDateStr));
//     const end = new Date(toDateStr);
//     end.setHours(23, 59, 59, 999);
//     return getCount(start, end);
//   }

//   return {
//     getToday,
//     getLastNDays,
//     getThisMonth,
//     getAllTime,
//     getCustomRange,
//   };
// }



















// PATH: src/app/hooks/useVisitorHistory.js

"use client";

import { supabase } from "../../../src/app/lib/supabaseClient";

async function getCount(startDate, endDate) {
  const { data, error } = await supabase.rpc("get_visitor_count", {
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
  });

  if (error) {
    console.error("get_visitor_count error:", error);
    return 0;
  }
  return data ?? 0;
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function useVisitorHistory() {
  async function getToday() {
    const now = new Date();
    return getCount(startOfDay(now), now);
  }

  async function getLastNDays(n) {
    const now = new Date();
    const start = startOfDay(now);
    start.setDate(start.getDate() - (n - 1));
    return getCount(start, now);
  }

  async function getThisMonth() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return getCount(start, now);
  }

  async function getThisYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    return getCount(start, now);
  }

  async function getAllTime() {
    const start = new Date("2000-01-01");
    const now = new Date();
    return getCount(start, now);
  }

  async function getCustomRange(fromDateStr, toDateStr) {
    const start = startOfDay(new Date(fromDateStr));
    const end = new Date(toDateStr);
    end.setHours(23, 59, 59, 999);
    return getCount(start, end);
  }

  // Sabse pehla visit kab hua tha — isi se pata chalta hai kitna "history data" maujood hai
  async function getFirstVisitDate() {
    const { data, error } = await supabase.rpc("get_first_visit_date");
    if (error) {
      console.error("get_first_visit_date error:", error);
      return null;
    }
    return data ? new Date(data) : null;
  }

  return {
    getToday,
    getLastNDays,
    getThisMonth,
    getThisYear,
    getAllTime,
    getCustomRange,
    getFirstVisitDate,
  };
}