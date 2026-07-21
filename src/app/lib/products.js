export const products = [
  {
    id: 1,
    slug: "oversized-black-sweatshirt",
    name: "Oversized Black Sweatshirt",
    tagline: "Premium heavy cotton material",
    description:
      "Heavyweight 280 GSM cotton fleece, oversized boxy fit, ribbed cuffs and hem. Made for everyday comfort without losing shape wash after wash.",
    price: 1499,
    originalPrice: 2499,
    offerText: "40% OFF",
    imageUrl:
      "https://dnstore.pk/cdn/shop/collections/A6F9D276-DD01-4A48-A90F-4C075B4DE837.jpg?v=1777718686&width=1200",
    images: [
      "https://dnstore.pk/cdn/shop/collections/A6F9D276-DD01-4A48-A90F-4C075B4DE837.jpg?v=1777718686&width=1200",
    ],
    isCouponPrice: true,
  },
  {
    id: 2,
    slug: "classic-charcoal-hoodie",
    name: "Classic Charcoal Hoodie",
    tagline: "Perfect fleece warmth for winter",
    description:
      "Soft brushed fleece interior with a relaxed silhouette. Kangaroo pocket and adjustable drawstring hood for cold weather layering.",
    price: 1899,
    originalPrice: 2999,
    offerText: "🔥 Best Seller",
    imageUrl:
      "https://dnstore.pk/cdn/shop/collections/A6F9D276-DD01-4A48-A90F-4C075B4DE837.jpg?v=1777718686&width=1200",
    images: [
      "https://dnstore.pk/cdn/shop/collections/A6F9D276-DD01-4A48-A90F-4C075B4DE837.jpg?v=1777718686&width=1200",
    ],
    isCouponPrice: false,
  },
  {
    id: 3,
    slug: "minimalist-sand-crewneck",
    name: "Minimalist Sand Crewneck",
    tagline: "Brushed interior cozy streetwear",
    description:
      "Clean crewneck silhouette in a warm sand tone, brushed interior for extra coziness, built for everyday streetwear rotation.",
    price: 1299,
    originalPrice: 1999,
    offerText: "Flat PKR 700 Off",
    imageUrl:
      "https://dnstore.pk/cdn/shop/collections/A6F9D276-DD01-4A48-A90F-4C075B4DE837.jpg?v=1777718686&width=1200",
    images: [
      "https://dnstore.pk/cdn/shop/collections/A6F9D276-DD01-4A48-A90F-4C075B4DE837.jpg?v=1777718686&width=1200",
    ],
    isCouponPrice: false,
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export function getProductById(id) {
  return products.find((p) => String(p.id) === String(id)) || null;
}