

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  status: 'available' | 'unavailable' | 'coming-soon' | 'seasonal';
}

export interface SubCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

// types/menu.ts
export interface MenuTiming {
  startTime: string;
  endTime: string;
}

export interface MenuItem {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  status: 'available' | 'unavailable' | 'coming-soon' | 'seasonal';
  timings: MenuTiming[];   // <-- ADD THIS
}


export interface SubCategory {
  _id: string;
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Category {
  _id: string;
  id: string;
  name: string;
  subCategories: SubCategory[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuApiResponse extends Array<Category> {}
// services/menuApi.ts

// const API_BASE_URL = 'https://menu-itlu-backend.onrender.com';

export async function fetchMenuCategories(): Promise<MenuApiResponse> {
  try {
    const response = await fetch(
      `https://api2.itlu.us/categories`,
      {
        cache: 'no-store', // Always fresh data
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch menu: ${response.status}`);
    }

    const data: MenuApiResponse = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching menu categories:', error);
    throw error;
  }
}