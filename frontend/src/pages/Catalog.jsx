import { Loader2, AlertCircle, PackageX } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

const Catalog = () => {
  const {
    products,
    loading,
    loadingMore,
    error,
    nextCursor,
    category,
    totalCount,
    loadInitialProducts,
    loadMore
  } = useProducts();

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    // Only fetch if category actually changed
    if (newCategory !== category) {
      loadInitialProducts(newCategory);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar totalCount={totalCount} />
      
      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Hero Section */}
        <div className="relative mb-12 py-16 lg:py-24 flex flex-col items-center justify-center text-center overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-indigo-500/5">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 via-white to-purple-50/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px] opacity-60"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
          
          <div className="relative z-10 px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Live Catalog Updates
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
              Discover <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Exceptional</span> <br className="hidden sm:block"/> Products
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Browse our curated collection of high-quality items designed to elevate your everyday experience. 
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <CategoryFilter 
          currentCategory={category} 
          onSelectCategory={handleCategoryChange} 
        />

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Error loading products</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button 
                onClick={() => loadInitialProducts(category)}
                className="text-sm text-red-600 font-medium hover:text-red-500 mt-2 underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PackageX className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              We couldn't find any products matching your selected category. Try selecting 'All' or check back later.
            </p>
            {category && (
              <button 
                onClick={() => handleCategoryChange('')}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

          {/* Loading Skeletons */}
          {loading && (
            Array.from({ length: 8 }).map((_, idx) => (
              <ProductSkeleton key={`initial-skel-${idx}`} />
            ))
          )}
          
          {loadingMore && (
            Array.from({ length: 4 }).map((_, idx) => (
              <ProductSkeleton key={`more-skel-${idx}`} />
            ))
          )}
        </div>

        {/* Load More Button */}
        {nextCursor && !loading && !error && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="group relative px-8 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 shadow-sm hover:shadow-md hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  Loading...
                </>
              ) : (
                <>
                  Load More Products
                </>
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Catalog;
