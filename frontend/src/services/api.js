import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://codevector-task-qdmz.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async ({ limit = 20, category, cursor }) => {
  try {
    const params = { limit };
    
    if (category) {
      params.category = category;
    }
    
    if (cursor) {
      params.updatedAt = cursor.updatedAt;
      params.id = cursor.id;
    }

    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
