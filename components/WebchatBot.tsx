"use client";

import { useState, useEffect } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_BOTPRESS_CLIENT_ID || "";

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
  const [WebchatComponents, setWebchatComponents] = useState<any>(null);
  const [client, setClient] = useState<any>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const setIsOpen = controlledSetIsOpen || setInternalOpen;

  useEffect(() => {
    // تحميل المكتبة فقط على العميل لتجنب مشاكل SSR
    import("@botpress/webchat").then((mod) => {
      setWebchatComponents({
        Fab: mod.Fab,
        Webchat: mod.Webchat,
        useWebchat: mod.useWebchat,
      });
    });
  }, []);

  useEffect(() => {
    if (!WebchatComponents || !CLIENT_ID) return;

    // نستخدم الـ hook داخل useEffect عبر إنشاء component داخلي
  }, [WebchatComponents]);

  useEffect(() => {
    if (client && onClientReady) {
      onClientReady(client);
    }
  }, [client, onClientReady]);

  if (!CLIENT_ID) {
    return null;
  }

  if (!WebchatComponents) {
    return null; // جاري التحميل
  }

  const { Fab, Webchat } = WebchatComponents;

  return (
    <>
      <Webchat
        clientId={CLIENT_ID}
        style={{
          width: "400px",
          height: "600px",
          position: "fixed",
          bottom: "90px",
          right: "20px",
          borderRadius: "10px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
          zIndex: 9998,
          display: isOpen ? "flex" : "none",
          overflow: "hidden",
        }}
      />

      <Fab
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "64px",
          height: "64px",
          zIndex: 9999,
        }}
      />
    </>
  );
}
