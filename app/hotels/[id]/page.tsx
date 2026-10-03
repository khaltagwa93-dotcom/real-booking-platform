"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Wifi, Car, Waves, Utensils, Dumbbell, Sparkles, Check, ArrowRight } from "lucide-react";
import { getHotelById } from "@/data/hotels";

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const hotel = getHotelById(params.id as string);
  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [nights, setNights] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setNights(diff > 0 ? diff : 1);
    }
  }, [checkIn, checkOut]);

  if (!hotel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">الفندق غير موجود</h1>
        <Link href="/hotels" className="text-primary-600 hover:underline">
          العودة إلى قائمة الفنادق
        </Link>
      </div>
    );
  }

  const totalPrice = hotel.price * nights * rooms;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut || !name || !email || !phone) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const booking = {
      id: Date.now().toString(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.image,
      city: hotel.city,
      checkIn,
      checkOut,
      guests,
      rooms,
      nights,
      pricePerNight: hotel.price,
      totalPrice,
      name,
      email,
      phone,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    router.push("/bookings?success=true");
  };

  const amenityIcons: Record<string, any> = {
    "واي فاي مجاني": Wifi,
    "موقف سيارات": Car,
    "مسبح": Waves,
    "شاطئ خاص": Waves,
    "شاطئ": Waves,
    "مسبح لانهائي": Waves,
    "مسبح عائلي": Waves,
    "مطعم فاخر": Utensils,
    "مطاعم متعددة": Utensils,
    "مطاعم": Utensils,
    "مطعم بحري": Utensils,
    "مطاعم عالمية": Utensils,
    "مطاعم آسيوية": Utensils,
    "صالة رياضية": Dumbbell,
    "سبا": Sparkles,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">الرئيسية</Link>
        <span>/</span>
        <Link href="/hotels" className="hover:text-primary-600">الفنادق</Link>
        <span>/</span>
        <span className="text-gray-900">{hotel.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 rounded-2xl overflow-hidden">
        <div className="md:col-span-2 relative h-72 md:h-96">
          <Image
            src={hotel.images[selectedImage]}
            alt={hotel.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-3">
          {hotel.images.map((img, i) => (
            <div
              key={i}
              className={`relative h-36 md:h-[11.5rem] cursor-pointer overflow-hidden rounded-xl ${
                selectedImage === i ? "ring-4 ring-primary-500" : ""
              }`}
              onClick={() => setSelectedImage(i)}
            >
              <Image src={img} alt="" fill className="object-cover hover:scale-105 transition" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-1 text-gray-500 mb-1">
                <MapPin className="w-4 h-4" />
                {hotel.location} — {hotel.city}، {hotel.country}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-bold text-lg">{hotel.rating}</span>
                <span className="text-gray-500">({hotel.reviews} تقييم)</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            {hotel.description}
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">المرافق والخدمات</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity] || Check;
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl"
                  >
                    <Icon className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary-600">{hotel.price}</span>
              <span className="text-gray-500"> ر.س / ليلة</span>
            </div>

            {!showForm ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الوصول</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">المغادرة</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الضيوف</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الغرف</label>
                    <select
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm bg-white"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {checkIn && checkOut && (
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{hotel.price} × {nights} ليلة × {rooms} غرفة</span>
                      <span className="font-medium">{totalPrice} ر.س</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t">
                      <span>الإجمالي</span>
                      <span className="text-primary-600">{totalPrice} ر.س</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (!checkIn || !checkOut) {
                      alert("يرجى اختيار تواريخ الوصول والمغادرة");
                      return;
                    }
                    setShowForm(true);
                  }}
                  className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-primary-700 transition"
                >
                  احجز الآن
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mb-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  رجوع
                </button>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الجوال *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                    placeholder="+966 5X XXX XXXX"
                  />
                </div>

                <div className="bg-primary-50 rounded-xl p-4 text-sm">
                  <div className="flex justify-between font-bold text-base">
                    <span>الإجمالي النهائي</span>
                    <span className="text-primary-600">{totalPrice} ر.س</span>
                  </div>
                  <p className="text-gray-500 mt-1 text-xs">
                    {nights} ليلة • {rooms} غرفة • {guests} ضيوف
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-green-700 transition"
                >
                  تأكيد الحجز
                </button>
              </form>
            )}

            <p className="text-center text-xs text-gray-400 mt-4">
              الحجز يخضع لسياسة الإلغاء الخاصة بالفندق.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
