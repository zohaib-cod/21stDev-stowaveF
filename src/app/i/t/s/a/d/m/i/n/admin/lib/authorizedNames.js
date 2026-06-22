// NOT A ROUTE — helper file (no URL of its own).
// Used by: app/orders/page.jsx and app/orders/trash/page.jsx
//
// Authorized names allowed to confirm "Move to Trash" / "Delete Permanently" actions.
// Matching is case-insensitive and trims extra spaces, so "ALI ZOHAIB", "ali zohaib",
// or "  Ali Zohaib " all count as valid.

export const AUTHORIZED_NAMES = [
  "Ali Zohaib",
  "Saif",
  "Waqar Hassan",
  "Ali Husnain",
  "Ali Haider",
];

export function isAuthorizedName(input) {
  if (!input) return false;
  const normalized = input.trim().toLowerCase().replace(/\s+/g, " ");
  return AUTHORIZED_NAMES.some(
    (name) => name.toLowerCase() === normalized
  );
}