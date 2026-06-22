import { Package } from 'lucide-react';

const Navbar = ({ totalCount }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-inner shadow-white/20">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 tracking-tight">CodeVector Task Assignment</span>
          </div>
          <div className="flex items-center">
            <span className="bg-white/60 text-gray-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-200/80 shadow-xs backdrop-blur-md">
              <span className="text-indigo-600">{totalCount.toLocaleString()}</span> Products
            </span>
          </div>
        </div>
      </div>
      <br />
    </nav>
    
  );
};

export default Navbar;
