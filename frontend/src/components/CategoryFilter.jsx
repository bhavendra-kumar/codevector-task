import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const CATEGORIES = [
  'All',
  'Electronics',
  'Clothing',
  'Books',
  'Sports',
  'Furniture'
];

const CategoryFilter = ({ currentCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {CATEGORIES.map((cat) => {
        const isSelected = (cat === 'All' && !currentCategory) || cat === currentCategory;
        
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat === 'All' ? '' : cat)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border relative overflow-hidden",
              isSelected 
                ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/30 scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:scale-105"
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
