"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselItem {
  id: string
  title: string
  image: string
}

const newAdditions: CarouselItem[] = [
  {
    id: "new-1",
    title: "Pineapple Pastry",
    image: "https://i.ytimg.com/vi/-ktkATXlRiU/maxresdefault.jpg",
  },
  {
    id: "new-2",
    title: "Lavender Haze",
    image: "https://i.pinimg.com/736x/6c/7c/11/6c7c112f5ca2775417cf91be29f4b681.jpg",
  },
  {
    id: "new-3",
    title: "Malai Kofta",
    image: "https://carameltintedlife.com/wp-content/uploads/2020/11/Malai-Kofta-1-of-1-9.jpg",
  },
]

export default function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newAdditions.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + newAdditions.length) % newAdditions.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newAdditions.length)
  }

  const currentItem = newAdditions[currentIndex]

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex-1 relative overflow-hidden bg-gray-100 min-h-96">
        <Image
          src={currentItem.image || "/placeholder.svg?height=400&width=600&query=food"}
          alt={currentItem.title}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />

        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2.5 rounded-full transition-all duration-200 z-10 shadow-md hover:shadow-lg"
          aria-label="Previous item"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2.5 rounded-full transition-all duration-200 z-10 shadow-md hover:shadow-lg"
          aria-label="Next item"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {newAdditions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-amber-500 w-8 h-2" : "bg-white/50 w-2 h-2 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wider text-amber-100 uppercase mb-1">New Addition</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white text-balance">{currentItem.title}</h3>
          </div>
          <div className="text-3xl">✨</div>
        </div>
      </div>
    </div>
  )
}
