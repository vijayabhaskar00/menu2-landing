import Link from 'next/link';
import Image from 'next/image';

import logo from './logo.png'

interface HeaderProps {
  showBackButton?: boolean;
}

export default function Header({ showBackButton = false }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-amber-500 via-yellow-700 to-green-700 text-white">
      <div className="flex items-center justify-between px-4 py-3 sm:py-4">
        {showBackButton ? (
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white hover:text-yellow-100 transition-colors duration-200 group"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium hidden sm:inline">Home</span>
          </Link>
        ) : (
          <div />
        )}
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <Image 
            src={logo} 
            alt="Logo" 
            width={120} 
            height={120}
            className="mb-2"
          />
        </div>

        <div className="w-6 sm:w-12" />
      </div>
    </div>
  );
}