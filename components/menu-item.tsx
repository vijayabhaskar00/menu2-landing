import { MenuItem as MenuItemType } from '@/data/menu-data';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface MenuItemProps {
  item: MenuItemType;
}

export default function MenuItem({ item }: MenuItemProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const isUnavailable = item.status === 'unavailable';
  const comingSoon = item.status === 'coming-soon';
  const seasonal = item.status === 'seasonal';
  const hidden = item.status === 'hidden';

  console.log(item.timings)

  return (
    <div
      className={`
        bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl 
        transition-all duration-300 hover:scale-105 
        border border-amber-50
        ${isUnavailable ? 'opacity-75 hover:scale-100' : ''} ${hidden ? 'hidden' : ''}
        flex flex-col h-full
      `}
    >
      <div className="relative h-48 sm:h-56 md:h-60 bg-gradient-to-br from-yellow-100 to-green-50 overflow-hidden flex-shrink-0">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-green-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
            </div>
          </div>
        )}
        <Image
          src={item.image || "/placeholder.svg?height=240&width=280&query=food-item"}
          alt={item.name}
          fill
          className={`object-cover w-full h-full transition-all duration-500 hover:scale-110 ${isUnavailable ? 'grayscale brightness-75' : ''} ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          priority={false}
          onLoad={() => setImageLoading(false)}
        />
        {isUnavailable && !imageLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm animate-pulse-subtle">
            <div className="bg-red-600 text-white px-5 py-2 rounded-lg font-bold text-base shadow-lg">
              UNAVAILABLE
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white p-4 md:p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-bold text-base md:text-lg truncate text-white leading-tight">{item.name}</h3>
          <p className="text-sm md:text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
        </div>


        {/* TIMINGS SECTION */}
        {item.timings
          .filter(t => t.startTime?.trim() !== "" && t.endTime?.trim() !== "")
          .map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-amber-200 text-sm">
              <Clock className="w-4 h-4" />
              <span className="font-medium">
                {t.startTime} - {t.endTime}
              </span>
            </div>
          ))}



        <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-700">
          <span className="text-lg md:text-xl font-bold text-amber-400">${item.price.toFixed(2)}</span>
          {comingSoon && (
            <span className="text-xs md:text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full font-semibold shadow-md">
              Coming Soon
            </span>
          )}
          {item.status === 'available' && (
            <span className="text-xs md:text-sm bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full font-semibold shadow-md">
              Available
            </span>
          )}
          {seasonal && (
            <span className="text-xs md:text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full font-semibold shadow-md">
              Seasonal
            </span>
          )}
        </div>
      </div>
    </div>
  );
}