'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/header';
import CategoryNav from '@/components/category-nav';
import MenuGrid from '@/components/menu-grid';
import { Category, fetchMenuCategories } from '@/data/menu-data';


function MenuContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from API
  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMenuCategories();
        setCategories(data);
        
        // Set initial category
        if (categoryFromUrl) {
          const categoryExists = data.some(cat => cat.id === categoryFromUrl);
          if (categoryExists) {
            setSelectedCategory(categoryFromUrl);
          } else {
            setSelectedCategory(data[0]?.id || null);
          }
        } else {
          setSelectedCategory(data[0]?.id || null);
        }
      } catch (err) {
        setError('Failed to load menu. Please try again later.');
        console.error('Error loading categories:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, [categoryFromUrl]);

  // Set subcategory when category changes
  useEffect(() => {
    if (selectedCategory && categories.length > 0) {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category && category.subCategories.length > 0) {
        setSelectedSubCategory(category.subCategories[0].id);
      }
    }
  }, [selectedCategory, categories]);

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-600 mb-2">Oops!</h3>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || selectedCategory === null || categories.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-6 bg-gradient-to-b from-amber-50 to-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 sm:h-56 bg-gradient-to-r from-amber-100 to-amber-50"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="flex justify-between">
                    <div className="h-5 bg-amber-100 rounded w-16"></div>
                    <div className="h-5 bg-green-100 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <CategoryNav 
        categories={categories}
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory}
        selectedSubCategory={selectedSubCategory || ''}
        onSubCategoryChange={setSelectedSubCategory}
      />
      
      <div className="flex-1 overflow-auto">
        <MenuGrid 
          categories={categories}
          category={selectedCategory}
          subCategory={selectedSubCategory || ''}
        />
      </div>
    </>
  );
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col">
      <Header showBackButton={true} />
      
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-amber-700">Loading menu...</div>
        </div>
      }>
        <MenuContent />
      </Suspense>
    </div>
  );
}