"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Star, Calendar, Users, ChevronLeft } from "lucide-react";
import { hotels } from "@/data/hotels";

export default function HomePage() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("city", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests.toString());
    router.push(`/hotels?${params.toString()}`);
  };

  const featuredHotels = hotels.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
            alt="فندق فاخر"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            اكتشف أفخم الفنادق
            <br />
            <span className="text-primary-300">في الوطن العربي</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            احجز إقامتك المثالية بسهولة وأمان. آلاف الفنادق والمنتجعات بانتظارك
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  الوجهة
                </label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="دبي، الرياض، جدة..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  تاريخ الوصول
                </label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  تاريخ المغادرة
                </label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  الضيوف
                </label>
                <div className="relative">
                  <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none appearance-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "ضيف" : "ضيوف"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full md:w-auto md:px-12 bg-primary-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-primary-700 transition flex items-center justify-center gap-2 mx-auto"
            >
              <Search className="w-5 h-5" />
              ابحث عن فنادق
            </button>
          </form>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">فنادق مميزة</h2>
            <p className="text-gray-600 mt-1">اختر من بين أفضل الوجهات الفاخرة</p>
          </div>
          <Link
            href="/hotels"
            className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1"
          >
            عرض الكل
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>

        {featuredHotels.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg mb-2">لا توجد فنادق متاحة حالياً</p>
            <p className="text-gray-400 text-sm">سيتم إضافة الفنادق قريباً أو ربط المنصة بقاعدة بيانات حقيقية</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel) => (
              <Link
                key={hotel.id}
                href={`/hotels/${hotel.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-sm font-bold text-primary-700">
                    {hotel.stars} ★
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {hotel.city}، {hotel.country}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-sm">{hotel.rating}</span>
                    <span className="text-gray-400 text-sm">({hotel.reviews} تقييم)</span>
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">{hotel.price}</span>
                      <span className="text-gray-500 text-sm"> ر.س / ليلة</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Why Us */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            لماذا تختار حجزني؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">بحث سهل وسريع</h3>
              <p className="text-gray-600">
                ابحث عن أفضل الفنادق حسب وجهتك وتواريخك وميزانيتك في ثوانٍ
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">أفضل الأسعار</h3>
              <p className="text-gray-600">
                نضمن لك أفضل الأسعار مع عروض حصرية وخصومات مستمرة
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">دعم على مدار الساعة</h3>
              <p className="text-gray-600">
                فريق دعم متكامل جاهز لمساعدتك في أي وقت طوال اليوم
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
