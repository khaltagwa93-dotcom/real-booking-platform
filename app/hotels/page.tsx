"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Filter, Search } from "lucide-react";
import { hotels, searchHotels } from "@/data/hotels";

function HotelsContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("city") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "all");
  const [sortBy, setSortBy] = useState("recommended");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [filtered, setFiltered] = useState(hotels);

  const cities = ["all", "دبي", "الرياض", "جدة", "القاهرة", "المنامة", "مسقط", "الدوحة", "أبوظبي"];

  useEffect(() => {
    let results = searchHotels(query, selectedCity === "all" ? undefined : selectedCity);
    
    results = results.filter(h => h.price >= minPrice && h.price <= maxPrice);
    
    if (sortBy === "price-low") {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      results = [...results].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      results = [...results].sort((a, b) => b.rating - a.rating);
    }
    
    setFiltered(results);
  }, [query, selectedCity, sortBy, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">استكشف الفنادق</h1>
        <p className="text-gray-600">وجدنا {filtered.length} فندق يناسب بحثك</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-primary-600" />
              <h2 className="font-bold text-lg">تصفية النتائج</h2>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">بحث</label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="اسم الفندق أو المدينة..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pr-10 pl-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                />
              </div>
            </div>

            {/* Cities */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
              <div className="space-y-2">
                {cities.map((city) => (
                  <label key={city} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="city"
                      checked={selectedCity === city}
                      onChange={() => setSelectedCity(city)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      {city === "all" ? "كل المدن" : city}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نطاق السعر (ر.س)
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  placeholder="من"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  placeholder="إلى"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب حسب</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm bg-white"
              >
                <option value="recommended">الأكثر توصية</option>
                <option value="price-low">السعر: من الأقل</option>
                <option value="price-high">السعر: من الأعلى</option>
                <option value="rating">التقييم الأعلى</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Hotels Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <p className="text-gray-500 text-lg">لم نجد فنادق تطابق بحثك</p>
              <button
                onClick={() => {
                  setQuery("");
                  setSelectedCity("all");
                  setMinPrice(0);
                  setMaxPrice(5000);
                }}
                className="mt-4 text-primary-600 font-medium hover:underline"
              >
                إعادة تعيين الفلاتر
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((hotel) => (
                <Link
                  key={hotel.id}
                  href={`/hotels/${hotel.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col sm:flex-row"
                >
                  <div className="relative w-full sm:w-72 h-48 sm:h-auto shrink-0">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {hotel.location}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: hotel.stars }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg font-bold text-sm">
                          {hotel.rating}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {hotel.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {hotel.amenities.slice(0, 4).map((a) => (
                          <span
                            key={a}
                            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        {hotel.reviews} تقييم
                      </div>
                      <div className="text-left">
                        <span className="text-2xl font-bold text-primary-600">{hotel.price}</span>
                        <span className="text-gray-500 text-sm"> ر.س / ليلة</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">جاري التحميل...</div>}>
      <HotelsContent />
    </Suspense>
  );
}