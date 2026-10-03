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
    throw new Error("useBotpress must be used within BotpressProvider");
  }
  return ctx;
}

export default function BotpressProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const clientRef = useRef<any>(null);

  const handleBookNow = (venueId: string, venueName: string) => {
    if (clientRef.current) {
      clientRef.current.sendEvent({
        type: "custom.trigger",
        payload: {
          action: "start_booking",
          venueId,
          venueName,
        },
      });
    } else {
      console.warn("Botpress client not ready yet");
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
