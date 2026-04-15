"use client";

/**
 * BookingForm
 *
 * Security improvements:
 * - All user inputs are controlled inputs (no innerHTML).
 * - The WhatsApp message is built from sanitized, bounded values:
 *     date  — validated as a real date, compared as Date objects
 *     adults/children — integers capped by MAX_* constants
 *     tourTitle — comes from server-rendered static data (trusted)
 * - encodeURIComponent() is applied before appending to the wa.me URL.
 * - window.open() uses a named target ("_blank") + rel-equivalent
 *   noopener is enforced by passing the third argument "noopener,noreferrer".
 */

import { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/context/LangContext";
import { sanitizeText } from "@/lib/utils";

interface BookingFormProps {
  tourTitle: string;
  tourPrice: number;
  onSuccess?: () => void;
}

const MAX_ADULTS   = 20;
const MAX_CHILDREN = 20;

function CounterRow({
  label,
  sublabel,
  value,
  min,
  max,
  onDecrement,
  onIncrement,
}: {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div>
        <span className="text-central-blue font-bold block">{label}</span>
        <span className="text-xs text-gray-400">{sublabel}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          aria-label={`${label} −`}
          className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-central-blue font-bold text-lg hover:bg-central-yellow hover:border-central-yellow hover:text-white transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-central-blue"
        >
          −
        </button>
        <span className="w-8 text-center text-central-blue font-bold text-lg tabular-nums" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={value >= max}
          aria-label={`${label} +`}
          className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-central-blue font-bold text-lg hover:bg-central-yellow hover:border-central-yellow hover:text-white transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-central-blue"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function BookingForm({ tourTitle, tourPrice, onSuccess }: BookingFormProps) {
  const t = useT();
  const [adults,   setAdults]   = useState(1);
  const [children, setChildren] = useState(0);
  const [date,     setDate]     = useState("");
  const [minDate,  setMinDate]  = useState("");

  useEffect(() => {
    const now = new Date();
    const mm  = String(now.getMonth() + 1).padStart(2, "0");
    const dd  = String(now.getDate()).padStart(2, "0");
    setMinDate(`${now.getFullYear()}-${mm}-${dd}`);
  }, []);

  const handleSubmit = () => {
    if (!date) {
      alert(t("booking_no_date"));
      return;
    }
    // Compare as Date objects (not strings) to avoid locale-dependent bugs
    if (new Date(date) < new Date(minDate)) {
      alert(t("booking_past_date"));
      return;
    }

    // Build human-readable date for the WA message
    const [year, month, day] = date.split("-");
    const months = {
      es: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
      en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    };
    // detect active lang from cookie at runtime
    const activeLang = document.cookie.match(/cft_lang=(\w+)/)?.[1] === "en" ? "en" : "es";
    const monthName = months[activeLang][parseInt(month) - 1];
    const readableDate = activeLang === "en"
      ? `${monthName} ${parseInt(day)}, ${year}`
      : `${parseInt(day)} de ${monthName} de ${year}`;

    // Build message — tourTitle is trusted (from static data); still sanitize defensively
    const safeTitle = sanitizeText(tourTitle, 200);
    const message = t("booking_wa_message")
      .replace("{tour}", safeTitle)
      .replace("{date}", readableDate)
      .replace("{adults}", String(Math.min(adults, MAX_ADULTS)))
      .replace("{children}", String(Math.min(children, MAX_CHILDREN)));

    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526690000000";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // noopener + noreferrer: prevents the new tab from accessing window.opener
    window.open(url, "_blank", "noopener,noreferrer");
    onSuccess?.();
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8">
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl text-central-blue font-bold uppercase">
          {t("booking_title")}
        </h3>
        {tourPrice > 0 && (
          <p className="text-gray-400 text-sm mt-1">
            {t("booking_from")}{" "}
            <span className="font-bold text-central-blue">
              ${tourPrice.toLocaleString("es-MX")} {t("tour_mxn")}
            </span>{" "}
            / persona
          </p>
        )}
        <div className="w-12 h-1 bg-central-yellow mx-auto rounded-full mt-3" />
      </div>

      <div className="space-y-4">
        <CounterRow
          label={t("booking_adults")}
          sublabel={t("booking_adults_sub")}
          value={adults}
          min={1}
          max={MAX_ADULTS}
          onDecrement={() => setAdults((v) => Math.max(1, v - 1))}
          onIncrement={() => setAdults((v) => Math.min(MAX_ADULTS, v + 1))}
        />
        <CounterRow
          label={t("booking_children")}
          sublabel={t("booking_children_sub")}
          value={children}
          min={0}
          max={MAX_CHILDREN}
          onDecrement={() => setChildren((v) => Math.max(0, v - 1))}
          onIncrement={() => setChildren((v) => Math.min(MAX_CHILDREN, v + 1))}
        />

        <div className="space-y-1.5">
          <label
            htmlFor="booking-date"
            className="flex items-center gap-2 text-central-blue font-bold text-sm uppercase tracking-wider"
          >
            <CalendarIcon className="w-4 h-4 text-central-yellow" />
            {t("booking_date")}
          </label>
          <input
            id="booking-date"
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-200 text-central-blue font-bold text-sm focus:outline-none focus:border-central-yellow focus:ring-2 focus:ring-central-yellow/20 transition-all bg-white cursor-pointer"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-14 bg-central-blue hover:bg-central-blue/90 text-white font-display font-bold text-base uppercase tracking-wide rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          {t("booking_cta")}
        </Button>
        <p className="text-xs text-center text-gray-400">
          {t("booking_wa_note")}
        </p>
      </div>
    </div>
  );
}
