// lib/cart.js
// Filhal localStorage use ho raha hai. Baad mein API bananay k baad
// bas in functions k andar fetch/axios call laga dena — components
// ko kuch change nahi karna paray ga.

const CART_KEY = "bag_items"; // "bag" = cart

function isBrowser() {
  return typeof window !== "undefined";
}

export function getBag() {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBag(items) {
  if (!isBrowser()) return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // same-tab listeners ko refresh karne k liye custom event
  window.dispatchEvent(new Event("bag-updated"));
}

export function addToBag(product, qty = 1) {
  const items = getBag();
  const existing = items.find((i) => i.slug === product.slug);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      qty,
    });
  }
  saveBag(items);
  return items;
}

export function updateBagQty(slug, qty) {
  let items = getBag();
  if (qty <= 0) {
    items = items.filter((i) => i.slug !== slug);
  } else {
    items = items.map((i) => (i.slug === slug ? { ...i, qty } : i));
  }
  saveBag(items);
  return items;
}

export function removeFromBag(slug) {
  const items = getBag().filter((i) => i.slug !== slug);
  saveBag(items);
  return items;
}

export function clearBag() {
  saveBag([]);
}

export function getBagTotal(items = getBag()) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function getBagCount(items = getBag()) {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

// "Buy Now" flow k liye — bag mein daale bagair seedha checkout
export function setBuyNowItem(product, qty = 1) {
  if (!isBrowser()) return;
  localStorage.setItem(
    "buy_now_item",
    JSON.stringify({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      qty,
    })
  );
}

export function getBuyNowItem() {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem("buy_now_item");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearBuyNowItem() {
  if (!isBrowser()) return;
  localStorage.removeItem("buy_now_item");
}