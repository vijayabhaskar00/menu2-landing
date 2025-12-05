'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import HeroSection from '@/components/home/hero-section';
import CarouselSection from '@/components/home/carousel-section';
import CategoryCards from '@/components/home/category-cards';

export default function Home() {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/menu?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <HeroSection />
      
      {/* Main content area with carousel and categories */}
      <div className="flex-1 flex overflow-hidden px-6 py-8 gap-8">
        {/* Left: Carousel Section */}
        <div className="w-1/2 flex flex-col">
          <CarouselSection />
        </div>
        
        {/* Right: Category Cards */}
        <div className="w-1/2 flex flex-col gap-6">
          <CategoryCards onCategoryClick={handleCategoryClick} />
        </div>
      </div>
    </div>
  );
}
