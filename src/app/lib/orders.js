const SAVED_INFO_KEY = "saved_checkout_info";
const ORDERS_KEY = "orders";
const LAST_ORDER_KEY = "last_order";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getSavedInfo() {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(SAVED_INFO_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveInfo(info) {
  if (!isBrowser()) return;
  localStorage.setItem(SAVED_INFO_KEY, JSON.stringify(info));
}

export function clearSavedInfo() {
  if (!isBrowser()) return;
  localStorage.removeItem(SAVED_INFO_KEY);
}

export function saveOrder(order) {
  if (!isBrowser()) return order;
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  return order;
}

export function getOrders() {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getLastOrder() {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(LAST_ORDER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function generateOrderId() {
  return "EZ" + Date.now().toString().slice(-8);
}