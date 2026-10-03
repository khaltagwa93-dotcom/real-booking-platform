# دمج Botpress Webchat في حجزني

## ما تم تنفيذه

- تثبيت `@botpress/webchat`
- مكون `WebchatBot.tsx`
- `BotpressProvider` مع دالة `handleBookNow`
- دمج في `layout.tsx`

## إعداد متغير البيئة

1. أنشئ ملف `.env.local`:
```env
NEXT_PUBLIC_BOTPRESS_CLIENT_ID=ضع_معرف_العميل_هنا
```

2. في **Vercel** → Project Settings → Environment Variables أضف:
   - Key: `NEXT_PUBLIC_BOTPRESS_CLIENT_ID`
   - Value: معرف العميل من Botpress

## كيفية استخدام handleBookNow في أي صفحة

```tsx
"use client";
import { useBotpress } from "@/components/BotpressProvider";

export default function HotelCard() {
  const { handleBookNow } = useBotpress();

  return (
    <button
      onClick={() => handleBookNow("court-123", "ملعب كرة القدم")}
      className="bg-primary-600 text-white px-6 py-3 rounded-xl"
    >
      احجز الآن عبر المساعد الذكي
    </button>
  );
}
```

## إعداد Custom Trigger في Botpress Studio

1. افتح البوت في Studio
2. اضغط يمين في الـ Workflow → **Trigger** → **Custom Trigger**
3. في **Event Filter** اكتب:
   ```
   {{event.payload}}
   ```
4. أضف عقدة بعد الـ Trigger واستخدم:
   - `{{event.payload.action}}` → start_booking
   - `{{event.payload.venueId}}`
   - `{{event.payload.venueName}}`
5. ابدأ تدفق الحجز حسب البيانات الواردة

## بعد التعديلات

```bash
npm install
npm run build
```

ثم ادفع التغييرات إلى GitHub وسيتم النشر تلقائياً على Vercel.
