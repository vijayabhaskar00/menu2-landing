'use client';

import { Category } from '@/data/menu-data';
import { useRef, useState, useEffect } from 'react';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSubCategory: string;
  onSubCategoryChange: (subCategory: string) => void;
}

export default function CategoryNav({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedSubCategory,
  onSubCategoryChange,
}: CategoryNavProps) {
  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftGradient(scrollLeft > 0);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-green-700 text-white snap-x snap-mandatory scrollbar-hide"  
    style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollPaddingLeft: '16px',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
    >
      <div className="relative px-2 py-3 overflow-hidden">
        {/* Left gradient fade */}
        {showLeftGradient && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-500 via-yellow-500 to-transparent z-10" />
        )}
        
        {/* Right gradient fade */}
        {showRightGradient && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-green-700 via-yellow-500 to-transparent z-10" />
        )}

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollPaddingLeft: '16px',
          }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onCategoryChange(category.id);
                onSubCategoryChange(category.subCategories[0].id);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap snap-start flex-shrink-0 ${
                selectedCategory === category.id
                  ? 'bg-white text-amber-600 shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Category Navigation */}
      {currentCategory && currentCategory.subCategories.length > 1 && (
        <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-green-800 px-4 py-2">
          <div className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory" style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
            {currentCategory.subCategories.map((subCat) => (
              <button
                key={subCat.id}
                onClick={() => onSubCategoryChange(subCat.id)}
                className={`text-sm font-medium pb-1 transition-all duration-300 whitespace-nowrap snap-start flex-shrink-0 ${
                  selectedSubCategory === subCat.id
                    ? 'text-white border-b-2 border-white'
                    : 'text-yellow-100 hover:text-white'
                }`}
              >
                {subCat.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}