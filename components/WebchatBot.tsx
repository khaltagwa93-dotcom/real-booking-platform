"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const CLIENT_ID = process.env.NEXT_PUBLIC_BOTPRESS_CLIENT_ID || "";

declare global {
  interface Window {
    botpressWebChat?: any;
    botpress?: any;
  }
}

interface WebchatBotProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  onClientReady?: (client: any) => void;
}

export default function WebchatBot({
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
  onClientReady,
}: WebchatBotProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [bpReady, setBpReady] = useState(false);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const setIsOpen = controlledSetIsOpen || setInternalOpen;

  // تحميل سكريبت Botpress إذا وُجد Client ID
  useEffect(() => {
    if (!CLIENT_ID) return;

    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script.async = true;
    script.onload = () => {
      const initScript = document.createElement("script");
      initScript.src = `https://files.bpcontent.cloud/${CLIENT_ID}/webchat/config.js`;
      initScript.async = true;
      document.body.appendChild(initScript);

      const check = setInterval(() => {
        if (window.botpressWebChat || window.botpress) {
          clearInterval(check);
          setBpReady(true);
          if (onClientReady) {
            onClientReady(window.botpressWebChat || window.botpress);
          }
        }
      }, 300);

      setTimeout(() => clearInterval(check), 10000);
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [onClientReady]);

  // مزامنة حالة الفتح مع Botpress
  useEffect(() => {
    if (!bpReady) return;
    const bp = window.botpressWebChat || window.botpress;
    if (!bp) return;

    if (isOpen) {
      bp.open?.();
    } else {
      bp.close?.();
    }
  }, [isOpen, bpReady]);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);

    const bp = window.botpressWebChat || window.botpress;
    if (bp) {
      if (next) bp.open?.();
      else bp.close?.();
    }
  };

  return (
    <>
      {/* الزر العائم يظهر دائماً في كل الصفحات */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-6 left-6 z-[9999] w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-gray-700 hover:bg-gray-800"
            : "bg-primary-600 hover:bg-primary-700"
        }`}
        aria-label="المساعد الذكي"
        title="المساعد الذكي"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* رسالة تنبيه إذا لم يُضف Client ID */}
      {isOpen && !CLIENT_ID && (
        <div className="fixed bottom-24 left-6 z-[9998] w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 mb-2">المساعد الذكي</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            يرجى إضافة متغير البيئة <code className="bg-gray-100 px-1 rounded text-xs">NEXT_PUBLIC_BOTPRESS_CLIENT_ID</code> في Vercel لتفعيل بوت Botpress.
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full bg-primary-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-primary-700"
          >
            حسناً
          </button>
        </div>
      )}
    </>
  );
}
