const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/api/products`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function fetchProductBySlug(slug) {
  const res = await fetch(`${BASE_URL}/api/products/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load product");
  return res.json();
}
