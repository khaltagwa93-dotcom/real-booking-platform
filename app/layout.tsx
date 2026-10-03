import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Hotel, CalendarCheck, Search } from "lucide-react";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "حجزني | منصة الحجوزات الفاخرة",
  description: "احجز أفخم الفنادق والمنتجعات في الوطن العربي بسهولة وأمان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition">
                  <Hotel className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-primary-700">حجزني</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition">
                  الرئيسية
                </Link>
                <Link href="/hotels" className="text-gray-700 hover:text-primary-600 font-medium transition">
                  الفنادق
                </Link>
                <Link href="/bookings" className="text-gray-700 hover:text-primary-600 font-medium transition flex items-center gap-1">
                  <CalendarCheck className="w-4 h-4" />
                  حجوزاتي
                </Link>
              </nav>

              <div className="flex items-center gap-3">
                <Link 
                  href="/hotels"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  ابحث الآن
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Hotel className="w-6 h-6 text-primary-400" />
                  <span className="text-xl font-bold">حجزني</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  منصة الحجوزات الأولى في الوطن العربي. احجز أفخم الفنادق والمنتجعات بسهولة وأمان تام.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">روابط سريعة</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link href="/" className="hover:text-white transition">الرئيسية</Link></li>
                  <li><Link href="/hotels" className="hover:text-white transition">الفنادق</Link></li>
                  <li><Link href="/bookings" className="hover:text-white transition">حجوزاتي</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">الوجهات الشائعة</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>دبي</li>
                  <li>الرياض</li>
                  <li>جدة</li>
                  <li>القاهرة</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">تواصل معنا</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>support@hajzni.com</li>
                  <li>+966 11 123 4567</li>
                  <li>الرياض، المملكة العربية السعودية</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
              © 2025 حجزني. جميع الحقوق محفوظة.
            </div>
          </div>
        </footer>

        {/* AI Chat Bot */}
        <ChatBot />
      </body>
    </html>
  );
}
