'use client';

import { Category } from '@/data/menu-data';
import MenuItem from './menu-item';

interface MenuGridProps {
  categories: Category[];
  category: string;
  subCategory: string;
}

export default function MenuGrid({ categories, category, subCategory }: MenuGridProps) {
  const selectedCategory = categories.find(cat => cat.id === category);
  const selectedSubCategory = selectedCategory?.subCategories.find(
    sub => sub.id === subCategory
  );

  const items = selectedSubCategory?.items || [];

  if (items.length === 0) {
    return (
      <div className="p-6 bg-gradient-to-b from-amber-50 to-white min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No items available</h3>
          <p className="text-gray-500">Check back soon for updates!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-b from-amber-50 to-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}