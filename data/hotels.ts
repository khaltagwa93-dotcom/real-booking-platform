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

export const hotels: Hotel[] = [
  {
    id: "1",
    name: "فندق برج العرب",
    nameEn: "Burj Al Arab",
    city: "دبي",
    cityEn: "Dubai",
    country: "الإمارات",
    description: "فندق فاخر على شكل شراع يقع على جزيرة اصطناعية في دبي. يُعتبر أحد أفخم الفنادق في العالم ويوفر تجربة إقامة استثنائية مع إطلالات خلابة على الخليج العربي.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
    ],
    price: 2500,
    rating: 4.9,
    reviews: 3240,
    stars: 5,
    amenities: ["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "خدمة الغرف 24 ساعة", "موقف سيارات"],
    location: "جزيرة جميرا، دبي",
    rooms: 202
  },
  {
    id: "2",
    name: "فندق الريتز كارلتون الرياض",
    nameEn: "The Ritz-Carlton Riyadh",
    city: "الرياض",
    cityEn: "Riyadh",
    country: "السعودية",
    description: "فندق فاخر في قلب الرياض يجمع بين الفخامة الحديثة والتراث السعودي الأصيل. مثالي لرجال الأعمال والسياح الباحثين عن تجربة راقية.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
    ],
    price: 1200,
    rating: 4.8,
    reviews: 1890,
    stars: 5,
    amenities: ["واي فاي مجاني", "مسبح", "صالة رياضية", "سبا", "مطاعم متعددة", "قاعات اجتماعات"],
    location: "حي السفارات، الرياض",
    rooms: 493
  },
  {
    id: "3",
    name: "فندق فور سيزونز جدة",
    nameEn: "Four Seasons Jeddah",
    city: "جدة",
    cityEn: "Jeddah",
    country: "السعودية",
    description: "يقع على كورنيش جدة مع إطلالات رائعة على البحر الأحمر. يجمع بين الفخامة والاسترخاء في أجواء ساحلية مميزة.",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80"
    ],
    price: 950,
    rating: 4.7,
    reviews: 1420,
    stars: 5,
    amenities: ["واي فاي مجاني", "شاطئ خاص", "مسبح", "سبا", "مطعم بحري", "نادي أطفال"],
    location: "الكورنيش الشمالي، جدة",
    rooms: 165
  },
  {
    id: "4",
    name: "فندق الماريوت القاهرة",
    nameEn: "Cairo Marriott Hotel",
    city: "القاهرة",
    cityEn: "Cairo",
    country: "مصر",
    description: "فندق تاريخي فاخر يقع في قصر الزمالك مع إطلالات على نهر النيل. يجمع بين التاريخ والحداثة في قلب القاهرة.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"
    ],
    price: 650,
    rating: 4.6,
    reviews: 2780,
    stars: 5,
    amenities: ["واي فاي مجاني", "مسبح", "صالة رياضية", "مطاعم", "حديقة", "خدمة كونسيرج"],
    location: "الزمالك، القاهرة",
    rooms: 1087
  },
  {
    id: "5",
    name: "منتجع جميرا البحرين",
    nameEn: "Jumeirah Bahrain",
    city: "المنامة",
    cityEn: "Manama",
    country: "البحرين",
    description: "منتجع فاخر على شاطئ البحر في البحرين، يوفر تجربة استرخاء كاملة مع مرافق عالمية المستوى.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
    ],
    price: 800,
    rating: 4.8,
    reviews: 980,
    stars: 5,
    amenities: ["واي فاي مجاني", "شاطئ خاص", "مسبح لانهائي", "سبا", "جولف", "مطاعم متعددة"],
    location: "السيف، المنامة",
    rooms: 250
  },
  {
    id: "6",
    name: "فندق شانغريلا مسقط",
    nameEn: "Shangri-La Muscat",
    city: "مسقط",
    cityEn: "Muscat",
    country: "عمان",
    description: "فندق فاخر محاط بالجبال والبحر في مسقط. مثالي للاستكشاف والاسترخاء في أجواء عمانية أصيلة.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
    ],
    price: 720,
    rating: 4.7,
    reviews: 1120,
    stars: 5,
    amenities: ["واي فاي مجاني", "شاطئ", "مسبح", "سبا", "تنس", "مطاعم آسيوية"],
    location: "القُرم، مسقط",
    rooms: 280
  },
  {
    id: "7",
    name: "فندق إنتركونتيننتال الدوحة",
    nameEn: "InterContinental Doha",
    city: "الدوحة",
    cityEn: "Doha",
    country: "قطر",
    description: "فندق فاخر على شاطئ الخليج في الدوحة، يوفر إطلالات بانورامية ومرافق ترفيهية متكاملة.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80"
    ],
    price: 890,
    rating: 4.6,
    reviews: 1560,
    stars: 5,
    amenities: ["واي فاي مجاني", "شاطئ", "مسبح", "سبا", "صالة رياضية", "مطاعم عالمية"],
    location: "الخليج الغربي، الدوحة",
    rooms: 350
  },
  {
    id: "8",
    name: "منتجع نادي اليخت أبوظبي",
    nameEn: "Yas Island Resort Abu Dhabi",
    city: "أبوظبي",
    cityEn: "Abu Dhabi",
    country: "الإمارات",
    description: "منتجع عائلي فاخر على جزيرة ياس، قريب من عالم فيراري ومركز ياس مول. مثالي للعائلات.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
    ],
    price: 680,
    rating: 4.5,
    reviews: 2100,
    stars: 4,
    amenities: ["واي فاي مجاني", "مسبح عائلي", "نادي أطفال", "شاطئ", "مطاعم", "قريب من الترفيه"],
    location: "جزيرة ياس، أبوظبي",
    rooms: 400
  }
];

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