"use client";

import { useState } from "react";
import { X, ChevronUp } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { useLang } from "@/context/LangContext";

interface BookingDrawerProps {
  tourTitle: string;
  tourPrice: number;
}

export default function BookingDrawer({ tourTitle, tourPrice }: BookingDrawerProps) {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/*
        FIX: The outer container gets pointer-events-none so the invisible
        closed panel never intercepts clicks on content below. Each interactive
        child opts back in with pointer-events-auto explicitly.
      */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 flex flex-col-reverse pb-[env(safe-area-inset-bottom)] pointer-events-none">
 
 
        {/* Sticky bottom bar — always visible */}
        <div className="pointer-events-auto bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between gap-4 shadow-lg flex-shrink-0">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
              {t("booking_from")}
            </p>
            <p className="font-display text-xl font-bold text-navy">
              {tourPrice > 0
                ? `$${tourPrice.toLocaleString("es-MX")} ${t("tour_mxn")}`
                : t("tour_cotizar")}
            </p>
          </div>
          {/* FIX: explicit type="button" prevents Safari iOS submit inference */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={t("booking_open")}
            className="flex items-center gap-2 bg-navy text-white font-bold text-sm uppercase tracking-wide px-6 h-12 rounded-xl hover:bg-navy/90 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            <ChevronUp
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
            {t("booking_open")}
          </button>
        </div>

        {/* Sliding panel — opens above the bar */}
        <div
          className={`
            pointer-events-auto
            bg-white rounded-t-3xl border-t border-gray-100 shadow-2xl
            overflow-y-auto transition-all duration-300 ease-in-out
            ${isOpen ? "max-h-[85svh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
          `}
          role="dialog"
          aria-modal="true"
          aria-label={t("booking_title")}
        >
          {/* Drag handle + close button */}
          <div className="flex items-center justify-between px-6 pt-4 pb-2 relative flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto" />
            {/* FIX: explicit type="button" */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={t("booking_close")}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="px-4 pb-6">
            <BookingForm
              tourTitle={tourTitle}
              tourPrice={tourPrice}
              onSuccess={() => setIsOpen(false)}
            />
          </div>
        </div>

      </div>
    </>
  );
}
