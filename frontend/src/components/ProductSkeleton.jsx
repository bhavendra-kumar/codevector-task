const ProductSkeleton = () => {
  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-200"></div>

      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
        </div>

        {/* Title Placeholder */}
        <div className="h-6 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-6 w-2/3 bg-gray-200 rounded mb-4"></div>
        
        {/* Date Placeholder */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-200"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
