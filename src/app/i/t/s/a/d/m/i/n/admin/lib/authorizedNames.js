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