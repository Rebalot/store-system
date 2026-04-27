import { API_ENDPOINTS } from '../utils/config';

/**
 * Fetches paginated products from the inventory service.
 * @param {Object} query
 * @param {number} query.page
 * @param {number} query.limit
 * @param {string} [query.search]
 * @param {string} [query.category]
 * @returns {Promise<{ items: Product[], totalItems: number, totalPages: number, currentPage: number }>}
 */
export async function fetchProducts(query = {}) {
  const params = {
    page: query.page ?? 1,
    limit: query.limit ?? 12,
    ...(query.search && { search: query.search }),
    ...(query.category && { category: query.category }),
  };

  const res = await fetch(API_ENDPOINTS.INVENTORY.GET_PRODUCTS(params), {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
  // Shape: { items: Product[], totalItems, totalPages, currentPage }
}