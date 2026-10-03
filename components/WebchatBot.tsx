"use client";

import { useEffect, useState } from "react";

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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!CLIENT_ID) return;

    // تحميل سكريبت Botpress بالطريقة الرسمية (أكثر استقراراً مع Next.js)
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script.async = true;
    script.onload = () => {
      // تهيئة البوت
      const initScript = document.createElement("script");
      initScript.src = `https://files.bpcontent.cloud/${CLIENT_ID}/webchat/config.js`;
      initScript.async = true;
      document.body.appendChild(initScript);

      // انتظار حتى يصبح البوت جاهزاً
      const check = setInterval(() => {
        if (window.botpressWebChat || window.botpress) {
          clearInterval(check);
          setReady(true);
          if (onClientReady) {
            onClientReady(window.botpressWebChat || window.botpress);
          }
        }
      }, 300);

      setTimeout(() => clearInterval(check), 10000);
    };
    document.body.appendChild(script);

    return () => {
      // تنظيف عند unmount
      script.remove();
    };
  }, [onClientReady]);

  // التحكم في الفتح/الإغلاق إذا تم تمرير isOpen
  useEffect(() => {
    if (!ready) return;
    const bp = window.botpressWebChat || window.botpress;
    if (!bp) return;

    if (controlledIsOpen === true) {
      bp.open?.();
    } else if (controlledIsOpen === false) {
      bp.close?.();
    }
  }, [controlledIsOpen, ready]);

  if (!CLIENT_ID) return null;

  // البوت يظهر تلقائياً عبر السكريبت (الزر العائم مدمج)
  return null;
}
