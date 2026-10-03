"use client";

import { createContext, useContext, useState, useRef, ReactNode } from "react";
import WebchatBot from "./WebchatBot";

interface BotpressContextType {
  handleBookNow: (venueId: string, venueName: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const BotpressContext = createContext<BotpressContextType | null>(null);

export function useBotpress() {
  const ctx = useContext(BotpressContext);
  if (!ctx) {
    // إرجاع قيم افتراضية لتجنب كسر الصفحة إذا لم يكن الـ Provider موجوداً
    return {
      handleBookNow: () => console.warn("Botpress not ready"),
      isOpen: false,
      setIsOpen: () => {},
    };
  }
  return ctx;
}

export default function BotpressProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const clientRef = useRef<any>(null);

  const handleBookNow = (venueId: string, venueName: string) => {
    const bp = clientRef.current || (window as any).botpressWebChat || (window as any).botpress;

    if (bp) {
      // إرسال الحدث المخصص
      if (typeof bp.sendEvent === "function") {
        bp.sendEvent({
          type: "custom.trigger",
          payload: {
            action: "start_booking",
            venueId,
            venueName,
          },
        });
      } else if (typeof bp.sendPayload === "function") {
        bp.sendPayload({
          type: "custom.trigger",
          payload: {
            action: "start_booking",
            venueId,
            venueName,
          },
        });
      }

      // فتح الدردشة
      if (typeof bp.open === "function") {
        bp.open();
      }
    } else {
      console.warn("Botpress client not ready yet. تأكد من إضافة NEXT_PUBLIC_BOTPRESS_CLIENT_ID");
    }

    setIsOpen(true);
  };

  return (
    <BotpressContext.Provider value={{ handleBookNow, isOpen, setIsOpen }}>
      {children}
      <WebchatBot
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClientReady={(client) => {
          clientRef.current = client;
        }}
      />
    </BotpressContext.Provider>
  );
}
