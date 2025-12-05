"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface CategoryCardsProps {
  onCategoryClick: (categoryId: string) => void
}

export default function CategoryCards({ onCategoryClick }: CategoryCardsProps) {
  // Define two different images and their corresponding information
  const categories = [
    {
      id: "dosa",
      name: "Indian Dosa",
      image: "https://www.andy-cooks.com/cdn/shop/articles/20250627020358-andy-20cooks-20-20indian-20dosa-20potato-20recipe.jpg?v=1750990364",
    },
    {
      id: "chaat",
      name: "Chaat",
      image: "https://images.archanaskitchen.com/images/recipes/snack-recipes/indian-snack-recipes/Delhi_Style_Matar_Chaat_Matra_Recipe_Spicy_Tangy_Dry_Green_Peas_Curry_Curry_Recipe_044ee2ec0c.jpg", // Replace with the second image URL
    }
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryClick(category.id)}
          className="flex-1 relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer bg-gray-900 border border-gray-800 min-h-56 md:min-h-0"
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-all duration-300" />

          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <h3 className="text-xl md:text-2xl font-bold text-white text-balance mb-2 leading-tight">
              {category.name}
            </h3>
            <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Explore Menu</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
