import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [category, setCategory] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const loadInitialProducts = useCallback(async (selectedCategory = '') => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts({ limit: 20, category: selectedCategory });
      setProducts(data.products || []);
      setNextCursor(data.nextCursor || null);
      setTotalCount(data.count || 0);
      setCategory(selectedCategory);
    } catch (err) {
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !nextCursor) return;
    
    try {
      setLoadingMore(true);
      setError(null);
      const data = await fetchProducts({ limit: 20, category, cursor: nextCursor });
      
      setProducts(prev => [...prev, ...(data.products || [])]);
      setNextCursor(data.nextCursor || null);
    } catch (err) {
      setError(err.message || 'Failed to load more products');
    } finally {
      setLoadingMore(false);
    }
  }, [category, nextCursor, loadingMore]);

  // Initial load
  useEffect(() => {
    loadInitialProducts();
  }, [loadInitialProducts]);

  return {
    products,
    loading,
    loadingMore,
    error,
    nextCursor,
    category,
    totalCount,
    loadInitialProducts,
    loadMore
  };
};
