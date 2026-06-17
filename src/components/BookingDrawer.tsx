"use client";

import { useState, useImperativeHandle, forwardRef } from "react";
import { X, ChevronUp } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { useLang } from "@/context/LangContext";
import type { PriceItem } from "@/lib/tours";

export interface BookingDrawerHandle {
  open: () => void;
}

interface BookingDrawerProps {
  tourTitle: string;
  tourPrice: number;
  priceList?: PriceItem[];
}

const BookingDrawer = forwardRef<BookingDrawerHandle, BookingDrawerProps>(
  function BookingDrawer({ tourTitle, tourPrice, priceList }, ref) {
    const { t } = useLang();
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
    }));

    return (
      <>
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 flex flex-col-reverse pb-[env(safe-area-inset-bottom)] pointer-events-none">

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
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={t("booking_open")}
              data-booking-drawer-trigger
            className="flex items-center gap-2 bg-navy text-white font-bold text-sm uppercase tracking-wide px-6 h-12 rounded-xl hover:bg-navy/90 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <ChevronUp
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
              {t("booking_open")}
            </button>
          </div>

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
            <div className="flex items-center justify-between px-6 pt-4 pb-2 relative flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto" />
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
                priceList={priceList}
                onSuccess={() => setIsOpen(false)}
              />
            </div>
          </div>

        </div>
      </>
    );
  },
);

export default BookingDrawer;
