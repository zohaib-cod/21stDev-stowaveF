// // NOT A ROUTE — this is a data file (no URL of its own).
// // Used by: app/orders/page.jsx and app/orders/[id]/page.jsx
// // Dummy order data for Stowave Clothing — replace with real API data later.
// // Each order mirrors a typical e-commerce order shape: customer, items (with images), totals, address.

// export const STATUS_OPTIONS = [
//   { value: "processing", label: "Processing", color: "#2563eb" },   // blue
//   { value: "under_review", label: "Under Review", color: "#d97706" }, // amber
//   { value: "received", label: "Received", color: "#16a34a" },       // green
//   { value: "return", label: "Return", color: "#dc2626" },           // red
// ];

// export const STATUS_MAP = STATUS_OPTIONS.reduce((acc, s) => {
//   acc[s.value] = s;
//   return acc;
// }, {});

// export const dummyOrders = [
//   {
//     id: "STW-10231",
//     customer: { name: "Ayesha Khan", email: "ayesha.khan@example.com", phone: "+92 300 1234567" },
//     address: "House 12, Street 4, DHA Phase 6, Lahore, Punjab, Pakistan",
//     placedAt: "2026-06-18T10:24:00+05:00",
//     paymentMethod: "Cash on Delivery",
//     status: "processing",
//     items: [
//       {
//         name: "Oversized Cotton Hoodie — Charcoal",
//         sku: "STW-HD-001-CH-M",
//         qty: 1,
//         price: 4200,
//         image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
//       },
//       {
//         name: "Relaxed Fit Joggers — Sand",
//         sku: "STW-JG-014-SD-M",
//         qty: 1,
//         price: 3100,
//         image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=300&h=300&fit=crop",
//       },
//     ],
//   },
//   {
//     id: "STW-10232",
//     customer: { name: "Hamza Sheikh", email: "hamza.sheikh@example.com", phone: "+92 301 9876543" },
//     address: "Flat 3B, Block 9, Clifton, Karachi, Sindh, Pakistan",
//     placedAt: "2026-06-19T15:02:00+05:00",
//     paymentMethod: "Card",
//     status: "under_review",
//     items: [
//       {
//         name: "Essential Crewneck Tee — White",
//         sku: "STW-TS-002-WT-L",
//         qty: 2,
//         price: 1800,
//         image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
//       },
//     ],
//   },
//   {
//     id: "STW-10233",
//     customer: { name: "Sara Tariq", email: "sara.tariq@example.com", phone: "+92 333 4567890" },
//     address: "House 88, F-10/2, Islamabad, Pakistan",
//     placedAt: "2026-06-19T18:45:00+05:00",
//     paymentMethod: "Cash on Delivery",
//     status: "received",
//     items: [
//       {
//         name: "Denim Jacket — Washed Blue",
//         sku: "STW-JK-009-WB-S",
//         qty: 1,
//         price: 6500,
//         image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
//       },
//       {
//         name: "Graphic Tee — Stowave Wave Logo",
//         sku: "STW-TS-021-BK-S",
//         qty: 1,
//         price: 2200,
//         image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop",
//       },
//       {
//         name: "Cargo Pants — Olive",
//         sku: "STW-CP-005-OL-S",
//         qty: 1,
//         price: 4800,
//         image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=300&h=300&fit=crop",
//       },
//     ],
//   },
//   {
//     id: "STW-10234",
//     customer: { name: "Bilal Ahmed", email: "bilal.ahmed@example.com", phone: "+92 321 1122334" },
//     address: "Shop 14, Gulberg III, Lahore, Punjab, Pakistan",
//     placedAt: "2026-06-20T09:10:00+05:00",
//     paymentMethod: "Card",
//     status: "return",
//     items: [
//       {
//         name: "Knit Sweater — Forest Green",
//         sku: "STW-SW-011-FG-XL",
//         qty: 1,
//         price: 5200,
//         image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300&h=300&fit=crop",
//       },
//     ],
//   },
//   {
//     id: "STW-10235",
//     customer: { name: "Mariam Fawad", email: "mariam.fawad@example.com", phone: "+92 345 6677889" },
//     address: "House 5, Bahria Town Phase 7, Rawalpindi, Punjab, Pakistan",
//     placedAt: "2026-06-20T13:30:00+05:00",
//     paymentMethod: "Cash on Delivery",
//     status: "processing",
//     items: [
//       {
//         name: "Wide Leg Trousers — Beige",
//         sku: "STW-TR-018-BG-M",
//         qty: 1,
//         price: 3900,
//         image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop",
//       },
//       {
//         name: "Ribbed Tank Top — Black",
//         sku: "STW-TK-003-BK-M",
//         qty: 2,
//         price: 1500,
//         image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop",
//       },
//     ],
//   },
//   {
//     id: "STW-10236",
//     customer: { name: "Usman Raza", email: "usman.raza@example.com", phone: "+92 311 2233445" },
//     address: "Office 7, I-8 Markaz, Islamabad, Pakistan",
//     placedAt: "2026-06-21T08:05:00+05:00",
//     paymentMethod: "Card",
//     status: "processing",
//     items: [
//       {
//         name: "Puffer Vest — Navy",
//         sku: "STW-PV-007-NV-L",
//         qty: 1,
//         price: 5600,
//         image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop",
//       },
//     ],
//   },
//   {
//     id: "STW-10237",
//     customer: { name: "Fatima Noor", email: "fatima.noor@example.com", phone: "+92 302 3344556" },
//     address: "House 21, Model Town, Lahore, Punjab, Pakistan",
//     placedAt: "2026-06-21T11:50:00+05:00",
//     paymentMethod: "Cash on Delivery",
//     status: "received",
//     items: [
//       {
//         name: "Linen Shirt — Off White",
//         sku: "STW-SH-012-OW-M",
//         qty: 1,
//         price: 3400,
//         image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&h=300&fit=crop",
//       },
//       {
//         name: "Pleated Shorts — Khaki",
//         sku: "STW-SR-006-KH-M",
//         qty: 1,
//         price: 2600,
//         image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop",
//       },
//     ],
//   },
//   {
//     id: "STW-10238",
//     customer: { name: "Zain Malik", email: "zain.malik@example.com", phone: "+92 333 9988776" },
//     address: "House 67, Johar Town, Lahore, Punjab, Pakistan",
//     placedAt: "2026-06-21T19:15:00+05:00",
//     paymentMethod: "Card",
//     status: "under_review",
//     items: [
//       {
//         name: "Track Jacket — Burgundy",
//         sku: "STW-TJ-016-BG-L",
//         qty: 1,
//         price: 4700,
//         image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
//       },
//     ],
//   },
// ];

// export function calcOrderTotal(order) {
//   return order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
// }














// NOT A ROUTE — this is a data file (no URL of its own).
// Used by: app/orders/page.jsx and app/orders/[id]/page.jsx
// Dummy order data for Stowave Clothing — replace with real API data later.
// Each order mirrors a typical e-commerce order shape: customer, items (with images), totals, address.

export const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "#64748b" },         // slate (default/unassigned)
  { value: "processing", label: "Processing", color: "#2563eb" },   // blue
  { value: "under_review", label: "Under Review", color: "#d97706" }, // amber
  { value: "received", label: "Received", color: "#16a34a" },       // green
  { value: "return", label: "Return", color: "#dc2626" },           // red
];

export const STATUS_MAP = STATUS_OPTIONS.reduce((acc, s) => {
  acc[s.value] = s;
  return acc;
}, {});

export const dummyOrders = [
  {
    id: "STW-10231",
    customer: { name: "Ayesha Khan", email: "ayesha.khan@example.com", phone: "+92 300 1234567" },
    address: "House 12, Street 4, DHA Phase 6, Lahore, Punjab, Pakistan",
    placedAt: "2026-06-18T10:24:00+05:00",
    paymentMethod: "Cash on Delivery",
    status: "processing",
    items: [
      {
        name: "Oversized Cotton Hoodie — Charcoal",
        sku: "STW-HD-001-CH-M",
        qty: 1,
        price: 4200,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
      },
      {
        name: "Relaxed Fit Joggers — Sand",
        sku: "STW-JG-014-SD-M",
        qty: 1,
        price: 3100,
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=300&h=300&fit=crop",
      },
    ],
  },
  {
    id: "STW-10232",
    customer: { name: "Hamza Sheikh", email: "hamza.sheikh@example.com", phone: "+92 301 9876543" },
    address: "Flat 3B, Block 9, Clifton, Karachi, Sindh, Pakistan",
    placedAt: "2026-06-19T15:02:00+05:00",
    paymentMethod: "Card",
    status: "under_review",
    items: [
      {
        name: "Essential Crewneck Tee — White",
        sku: "STW-TS-002-WT-L",
        qty: 2,
        price: 1800,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      },
    ],
  },
  {
    id: "STW-10233",
    customer: { name: "Sara Tariq", email: "sara.tariq@example.com", phone: "+92 333 4567890" },
    address: "House 88, F-10/2, Islamabad, Pakistan",
    placedAt: "2026-06-19T18:45:00+05:00",
    paymentMethod: "Cash on Delivery",
    status: "received",
    items: [
      {
        name: "Denim Jacket — Washed Blue",
        sku: "STW-JK-009-WB-S",
        qty: 1,
        price: 6500,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      },
      {
        name: "Graphic Tee — Stowave Wave Logo",
        sku: "STW-TS-021-BK-S",
        qty: 1,
        price: 2200,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop",
      },
      {
        name: "Cargo Pants — Olive",
        sku: "STW-CP-005-OL-S",
        qty: 1,
        price: 4800,
        image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=300&h=300&fit=crop",
      },
    ],
  },
  {
    id: "STW-10234",
    customer: { name: "Bilal Ahmed", email: "bilal.ahmed@example.com", phone: "+92 321 1122334" },
    address: "Shop 14, Gulberg III, Lahore, Punjab, Pakistan",
    placedAt: "2026-06-20T09:10:00+05:00",
    paymentMethod: "Card",
    status: "return",
    items: [
      {
        name: "Knit Sweater — Forest Green",
        sku: "STW-SW-011-FG-XL",
        qty: 1,
        price: 5200,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300&h=300&fit=crop",
      },
    ],
  },
  {
    id: "STW-10235",
    customer: { name: "Mariam Fawad", email: "mariam.fawad@example.com", phone: "+92 345 6677889" },
    address: "House 5, Bahria Town Phase 7, Rawalpindi, Punjab, Pakistan",
    placedAt: "2026-06-20T13:30:00+05:00",
    paymentMethod: "Cash on Delivery",
    status: "processing",
    items: [
      {
        name: "Wide Leg Trousers — Beige",
        sku: "STW-TR-018-BG-M",
        qty: 1,
        price: 3900,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop",
      },
      {
        name: "Ribbed Tank Top — Black",
        sku: "STW-TK-003-BK-M",
        qty: 2,
        price: 1500,
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop",
      },
    ],
  },
  {
    id: "STW-10236",
    customer: { name: "Usman Raza", email: "usman.raza@example.com", phone: "+92 311 2233445" },
    address: "Office 7, I-8 Markaz, Islamabad, Pakistan",
    placedAt: "2026-06-21T08:05:00+05:00",
    paymentMethod: "Card",
    status: "pending",
    items: [
      {
        name: "Puffer Vest — Navy",
        sku: "STW-PV-007-NV-L",
        qty: 1,
        price: 5600,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop",
      },
    ],
  },
  {
    id: "STW-10237",
    customer: { name: "Fatima Noor", email: "fatima.noor@example.com", phone: "+92 302 3344556" },
    address: "House 21, Model Town, Lahore, Punjab, Pakistan",
    placedAt: "2026-06-21T11:50:00+05:00",
    paymentMethod: "Cash on Delivery",
    status: "received",
    items: [
      {
        name: "Linen Shirt — Off White",
        sku: "STW-SH-012-OW-M",
        qty: 1,
        price: 3400,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&h=300&fit=crop",
      },
      {
        name: "Pleated Shorts — Khaki",
        sku: "STW-SR-006-KH-M",
        qty: 1,
        price: 2600,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop",
      },
    ],
  },
  {
    id: "STW-10238",
    customer: { name: "Zain Malik", email: "zain.malik@example.com", phone: "+92 333 9988776" },
    address: "House 67, Johar Town, Lahore, Punjab, Pakistan",
    placedAt: "2026-06-21T19:15:00+05:00",
    paymentMethod: "Card",
    status: "pending",
    items: [
      {
        name: "Track Jacket — Burgundy",
        sku: "STW-TJ-016-BG-L",
        qty: 1,
        price: 4700,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      },
    ],
  },
];

export function calcOrderTotal(order) {
  return order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}