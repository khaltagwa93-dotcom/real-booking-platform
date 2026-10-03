"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, CheckCircle, Trash2, Hotel } from "lucide-react";

interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  nights: number;
  pricePerNight: number;
  totalPrice: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

function BookingsContent() {
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) {
      setBookings(JSON.parse(stored));
    }
    if (searchParams.get("success") === "true") {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [searchParams]);

  const cancelBooking = (id: string) => {
    if (confirm("هل أنت متأكد من إلغاء هذا الحجز؟")) {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      localStorage.setItem("bookings", JSON.stringify(updated));
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-2xl flex items-center gap-3 animate-pulse">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="font-bold">تم تأكيد حجزك بنجاح! 🎉</p>
            <p className="text-sm">ستصلك رسالة تأكيد على بريدك الإلكتروني قريباً.</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">حجوزاتي</h1>
          <p className="text-gray-600 mt-1">
            {bookings.length === 0
              ? "لا توجد حجوزات حالياً"
              : `لديك ${bookings.length} حجز`}
          </p>
        </div>
        <Link
          href="/hotels"
          className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition flex items-center gap-2"
        >
          <Hotel className="w-4 h-4" />
          احجز فندقاً جديداً
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">لا توجد حجوزات بعد</h2>
          <p className="text-gray-500 mb-6">
            ابدأ رحلتك الآن واحجز أفضل الفنادق بأسعار مميزة
          </p>
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition"
          >
            استكشف الفنادق
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings
            .slice()
            .reverse()
            .map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0">
                    <Image
                      src={booking.hotelImage}
                      alt={booking.hotelName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            مؤكد
                          </span>
                          <span className="text-xs text-gray-400">
                            #{booking.id.slice(-6)}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {booking.hotelName}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {booking.city}
                        </div>
                      </div>
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                        title="إلغاء الحجز"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-0.5">الوصول</p>
                        <p className="font-medium">{formatDate(booking.checkIn)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-0.5">المغادرة</p>
                        <p className="font-medium">{formatDate(booking.checkOut)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-0.5">الضيوف والغرف</p>
                        <p className="font-medium flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {booking.guests} ضيوف • {booking.rooms} غرفة
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-0.5">المبلغ الإجمالي</p>
                        <p className="font-bold text-primary-600 text-lg">
                          {booking.totalPrice} ر.س
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                      <span>باسم: {booking.name}</span>
                      <span>{booking.nights} ليلة</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default function BookingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">جاري التحميل...</div>}>
      <BookingsContent />
    </Suspense>
  );
}