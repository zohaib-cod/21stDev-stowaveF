const STORAGE_KEY = "stowave_order_statuses_v1";
const EVENT_NAME = "stowave-order-status-changed";

function readAll() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(map) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

// Returns the current status for an order: overridden value if present, else the default from dummy data.
export function getOrderStatus(orderId, fallback) {
  const all = readAll();
  return all[orderId] || fallback;
}

export function getAllStatusOverrides() {
  return readAll();
}

export function setOrderStatus(orderId, status) {
  const all = readAll();
  all[orderId] = status;
  writeAll(all);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, { detail: { orderId, status } })
    );
  }
}

// Bulk status change: applies `newStatus` to every order in `orders` EXCEPT
// those currently sitting in "pending" — pending orders are left untouched
// until someone explicitly assigns them a status individually.
export function setBulkStatus(orders, newStatus, getCurrentStatus) {
  const all = readAll();
  orders.forEach((order) => {
    const current = getCurrentStatus(order.id) || order.status;
    if (current === "pending") return; 
    all[order.id] = newStatus;
  });
  writeAll(all);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, { detail: { bulk: true, status: newStatus } })
    );
  }
}

export function subscribeToStatusChanges(callback) {
  if (typeof window === "undefined") return () => {};
  const handler = (e) => callback(e.detail);
  window.addEventListener(EVENT_NAME, handler);
  const storageHandler = (e) => {
    if (e.key === STORAGE_KEY) callback(null);
  };
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", storageHandler);
  };
}