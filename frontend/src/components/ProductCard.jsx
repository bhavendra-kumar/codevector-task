import { Tag, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ProductCard = ({ product }) => {
  const { name, category, price, createdAt } = product;

  // Format date nicely
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(createdAt));

  // Format price nicely
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  // Category color mapping
  const categoryColors = {
    Electronics: 'bg-blue-100 text-blue-700 border-blue-200',
    Clothing: 'bg-pink-100 text-pink-700 border-pink-200',
    Books: 'bg-amber-100 text-amber-700 border-amber-200',
    Sports: 'bg-green-100 text-green-700 border-green-200',
    Furniture: 'bg-orange-100 text-orange-700 border-orange-200',
  };

  const badgeColor = categoryColors[category] || 'bg-gray-100 text-gray-700 border-gray-200';

  // Dynamic gradient based on category
  const getGradient = (cat) => {
    switch (cat) {
      case 'Electronics': return 'from-blue-400 to-indigo-500';
      case 'Clothing': return 'from-pink-400 to-rose-500';
      case 'Books': return 'from-amber-400 to-orange-500';
      case 'Sports': return 'from-green-400 to-emerald-500';
      case 'Furniture': return 'from-orange-400 to-red-500';
      default: return 'from-gray-400 to-slate-500';
    }
  };

  const gradientClass = getGradient(category);

  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1">
      {/* Dynamic Image Area */}
      <div className="h-48 overflow-hidden relative border-b border-gray-100">
        <div className={cn("absolute inset-0 bg-linear-to-br transition-transform duration-700 group-hover:scale-110 flex items-center justify-center", gradientClass)}>
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]" />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent mix-blend-overlay"></div>
          <PackagePlaceholder />
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-4">
          <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border inline-flex items-center gap-1", badgeColor)}>
            <Tag className="w-3 h-3" />
            {category}
          </span>
          <span className="text-lg font-bold text-gray-900 flex items-center">
            {formattedPrice}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center text-sm text-gray-500 gap-2 border-t border-gray-50">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>Added {formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

// Generic placeholder based on category
const PackagePlaceholder = () => {
  return (
    <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 flex items-center justify-center text-white group-hover:rotate-12 transition-all duration-500">
      <svg className="w-10 h-10 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    </div>
  );
};

export default ProductCard;
