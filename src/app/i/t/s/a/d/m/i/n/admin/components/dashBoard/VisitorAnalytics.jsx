// // PATH: src/app/i/t/s/a/d/m/i/n/admin/components/dashBoard/VisitorAnalytics.jsx

// "use client";

// import React, { useEffect, useState } from "react";
// import { Users, Calendar, Search } from "lucide-react";
// import { useVisitorHistory } from "../../../../../../../../../../../../app/hooks/useVisitorHistory";

// export default function VisitorAnalytics() {
//   const { getToday, getLastNDays, getThisMonth, getAllTime, getCustomRange } =
//     useVisitorHistory();

//   const [loading, setLoading] = useState(true);
//   const [counts, setCounts] = useState({
//     today: 0,
//     threeDays: 0,
//     week: 0,
//     month: 0,
//     allTime: 0,
//   });

//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [customResult, setCustomResult] = useState(null);
//   const [searching, setSearching] = useState(false);

//   useEffect(() => {
//     async function loadAll() {
//       setLoading(true);
//       const [today, threeDays, week, month, allTime] = await Promise.all([
//         getToday(),
//         getLastNDays(3),
//         getLastNDays(7),
//         getThisMonth(),
//         getAllTime(),
//       ]);
//       setCounts({ today, threeDays, week, month, allTime });
//       setLoading(false);
//     }
//     loadAll();
//   }, []);

//   async function handleSearch() {
//     if (!fromDate || !toDate) return;
//     setSearching(true);
//     const result = await getCustomRange(fromDate, toDate);
//     setCustomResult(result);
//     setSearching(false);
//   }

//   const cards = [
//     { label: "Today", value: counts.today },
//     { label: "Last 3 Days", value: counts.threeDays },
//     { label: "Last 7 Days", value: counts.week },
//     { label: "This Month", value: counts.month },
//     { label: "All Time", value: counts.allTime },
//   ];

//   return (
//     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
//       <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//         <div>
//           <h2 className="text-lg font-bold text-slate-800">Visitor Analytics</h2>
//           <p className="text-xs text-slate-400 mt-0.5">
//             Unique visitors, date-range ke hisaab se
//           </p>
//         </div>
//         <Users className="h-5 w-5 text-slate-400" />
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//         {cards.map((c) => (
//           <div
//             key={c.label}
//             className="p-4 bg-slate-50 rounded-lg border border-slate-100"
//           >
//             <p className="text-xs font-medium text-slate-500">{c.label}</p>
//             <p className="text-xl font-bold text-slate-900 mt-1">
//               {loading ? "..." : c.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="pt-4 border-t border-slate-100">
//         <div className="flex items-center space-x-2 mb-3">
//           <Calendar className="h-4 w-4 text-slate-500" />
//           <span className="text-sm font-semibold text-slate-700">
//             Custom Date Search
//           </span>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
//           <div className="flex-1">
//             <label className="text-xs text-slate-500 block mb-1">From</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//             />
//           </div>
//           <div className="flex-1">
//             <label className="text-xs text-slate-500 block mb-1">To</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//             />
//           </div>
//           <button
//             onClick={handleSearch}
//             disabled={!fromDate || !toDate || searching}
//             className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg flex items-center justify-center space-x-2"
//           >
//             <Search className="h-4 w-4" />
//             <span>{searching ? "Searching..." : "Search"}</span>
//           </button>
//         </div>

//         {customResult !== null && (
//           <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-800">
//             <span className="font-semibold">{customResult}</span> unique
//             visitors between <span className="font-medium">{fromDate}</span>{" "}
//             and <span className="font-medium">{toDate}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }












// PATH: src/app/i/t/s/a/d/m/i/n/admin/components/dashBoard/VisitorAnalytics.jsx

"use client";

import React, { useEffect, useState } from "react";
import { Users, Calendar, Search } from "lucide-react";
import { useVisitorHistory } from "../../../../../../../../../../../../app/hooks/useVisitorHistory";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default function VisitorAnalytics() {
  const {
    getToday,
    getLastNDays,
    getThisMonth,
    getThisYear,
    getAllTime,
    getCustomRange,
    getFirstVisitDate,
  } = useVisitorHistory();

  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    today: 0,
    threeDays: 0,
    week: 0,
    month: 0,
    year: 0,
    allTime: 0,
  });

  // Kitne din se tracking chal rahi hai — isi se decide hoga kaunse cards dikhane hain
  const [daysSinceStart, setDaysSinceStart] = useState(0);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [customResult, setCustomResult] = useState(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);

      const firstVisit = await getFirstVisitDate();
      const days = firstVisit
        ? Math.floor((new Date() - firstVisit) / MS_PER_DAY)
        : 0;
      setDaysSinceStart(days);

      const [today, threeDays, week, month, year, allTime] = await Promise.all([
        getToday(),
        getLastNDays(3),
        getLastNDays(7),
        getThisMonth(),
        getThisYear(),
        getAllTime(),
      ]);
      setCounts({ today, threeDays, week, month, year, allTime });
      setLoading(false);
    }
    loadAll();
  }, []);

  async function handleSearch() {
    if (!fromDate || !toDate) return;
    setSearching(true);
    const result = await getCustomRange(fromDate, toDate);
    setCustomResult(result);
    setSearching(false);
  }

  // Cards ki list — sirf wahi included honge jinke liye enough history data ho
  const cards = [
    { label: "Today", value: counts.today, show: true },
    { label: "Last 3 Days", value: counts.threeDays, show: true },
    { label: "Last 7 Days", value: counts.week, show: daysSinceStart >= 7 },
    { label: "This Month", value: counts.month, show: daysSinceStart >= 30 },
    { label: "This Year", value: counts.year, show: daysSinceStart >= 365 },
    { label: "All Time", value: counts.allTime, show: true },
  ].filter((c) => c.show);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Visitor Analytics</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Unique visitors, date-range ke hisaab se
          </p>
        </div>
        <Users className="h-5 w-5 text-slate-400" />
      </div>

      {/* Quick stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="p-4 bg-slate-50 rounded-lg border border-slate-100"
          >
            <p className="text-xs font-medium text-slate-500">{c.label}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {loading ? "..." : c.value}
            </p>
          </div>
        ))}
      </div>

      {!loading && daysSinceStart < 7 && (
        <p className="text-xs text-slate-400">
          Weekly aur monthly stats tab dikhengi jab tracking ko kam az kam 1
          hafta ho jaye ga. Abhi {daysSinceStart} din ka data hai.
        </p>
      )}

      {/* Custom date range search */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-semibold text-slate-700">
            Custom Date Search
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="flex-1">
            <label className="text-xs text-slate-500 block mb-1">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-slate-500 block mb-1">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!fromDate || !toDate || searching}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg flex items-center justify-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>{searching ? "Searching..." : "Search"}</span>
          </button>
        </div>

        {customResult !== null && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-800">
            <span className="font-semibold">{customResult}</span> unique
            visitors between <span className="font-medium">{fromDate}</span>{" "}
            and <span className="font-medium">{toDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}