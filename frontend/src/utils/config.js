const env = import.meta.env.VITE_NODE_ENV;

const API_BASES = {
  development: 'http://localhost:3101',
  production: '',
  test: '',
};

export const API_BASE_URL = API_BASES[env] || API_BASES.development;

export const API_ENDPOINTS = {
  AUTH: {
    ME: `${API_BASE_URL}/api/auth/me`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  },
  INVENTORY: {
    GET_PRODUCTS: (query) =>
    `${API_BASE_URL}/api/inventory/get-products?`+ new URLSearchParams(query),
    CREATE_PRODUCT: `${API_BASE_URL}/api/inventory/create-product`,
    UPDATE_PRODUCT: ( id ) => 
    `${API_BASE_URL}/api/inventory/update-product/${id}`,
    DELETE_PRODUCT: ( id ) =>
    `${API_BASE_URL}/api/inventory/delete-product/${id}`,
  },
  SALES: {
    GET_ORDERS: (query) =>
    `${API_BASE_URL}/api/sales/get-orders?`+ new URLSearchParams(query),
  }
};