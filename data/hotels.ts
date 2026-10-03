export interface Hotel {
  id: string;
  name: string;
  nameEn: string;
  city: string;
  cityEn: string;
  country: string;
  description: string;
  image: string;
  images: string[];
  price: number;
  rating: number;
  reviews: number;
  stars: number;
  amenities: string[];
  location: string;
  rooms: number;
}

// لا توجد بيانات تجريبية — المنصة جاهزة لربط قاعدة بيانات حقيقية أو API خارجي
export const hotels: Hotel[] = [];

export function getHotelById(id: string): Hotel | undefined {
  return hotels.find(h => h.id === id);
}

export function searchHotels(query: string, city?: string): Hotel[] {
  let results = hotels;
  
  if (city && city !== "all") {
    results = results.filter(h => 
      h.city.includes(city) || h.cityEn.toLowerCase().includes(city.toLowerCase())
    );
  }
  
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(h => 
      h.name.includes(query) || 
      h.nameEn.toLowerCase().includes(q) ||
      h.city.includes(query) ||
      h.cityEn.toLowerCase().includes(q) ||
      h.country.includes(query)
    );
  }
  
  return results;
}
