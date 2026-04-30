// src/components/BookingForm.tsx
"use client";

/**
 * BookingForm
 *
 * Security:
 * - All inputs are controlled; no innerHTML anywhere.
 * - WhatsApp message is built from sanitized, bounded values.
 * - encodeURIComponent() applied to the full message before appending to URL.
 * - window.open() uses noopener,noreferrer.
 *
 * UX improvements over previous version:
 * - Inline field-level validation with visible error messages (no alert()).
 * - Real-time price estimate shown as counters change.
 * - Date formatted via Intl.DateTimeFormat — no hardcoded month arrays.
 * - Language read from LangContext, not from a cookie regex at submit time.
 * - "Infants" age bracket (0–3) added alongside children for complete pax info.
 * - useId() for stable, collision-free label/error associations.
 */

import { useState, useId, useCallback } from "react";
import { CalendarIcon, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/context/LangContext";
import { sanitizeText } from "@/lib/utils";
import type { Lang, DictKey } from "@/lib/i18n";

// ─── Constants ───────────────────────────────────────────────────────────────

const MAX_ADULTS   = 20;
const MAX_CHILDREN = 20;
const MAX_INFANTS  = 10;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BookingFormProps {
  tourTitle: string;
  /** Lowest price in MXN. 0 means "quote on request". */
  tourPrice: number;
  onSuccess?: () => void;
}

interface PaxRow {
  id: string;
  labelKey: DictKey;
  sublabelKey: DictKey;
  value: number;
  min: number;
  max: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
}

type ValidationError = "no_date" | "past_date" | null;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns today's date as a YYYY-MM-DD string in local time. */
function todayString(): string {
  const now  = new Date();
  const yyyy = now.getFullYear();
  const mm   = String(now.getMonth() + 1).padStart(2, "0");
  const dd   = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Formats a YYYY-MM-DD string into a human-readable date using Intl.
 * T12:00:00 forces local-time parsing — avoids off-by-one-day errors
 * in UTC-negative timezones such as America/Mazatlan (UTC-7).
 */
function formatBookingDate(isoDate: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-MX", {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
  }).format(new Date(`${isoDate}T12:00:00`));
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface CounterRowProps {
  id: string;
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

function CounterRow({
  id,
  label,
  sublabel,
  value,
  min,
  max,
  onDecrement,
  onIncrement,
}: CounterRowProps) {
  const countId = `${id}-count`;

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
      <div>
        <span className="text-navy font-bold block text-sm">{label}</span>
        <span className="text-xs text-gray-400">{sublabel}</span>
      </div>
      <div className="flex items-center gap-2" role="group" aria-labelledby={countId}>
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          aria-label={`${label} −`}
          className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-navy font-bold text-lg
                     hover:bg-gold hover:border-gold hover:text-white
                     transition-colors flex items-center justify-center
                     disabled:opacity-35 disabled:cursor-not-allowed
                     disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-navy"
        >
          −
        </button>
        <span
          id={countId}
          className="w-7 text-center text-navy font-bold text-base tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={value >= max}
          aria-label={`${label} +`}
          className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-navy font-bold text-lg
                     hover:bg-gold hover:border-gold hover:text-white
                     transition-colors flex items-center justify-center
                     disabled:opacity-35 disabled:cursor-not-allowed
                     disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-navy"
        >
          +
        </button>
      </div>
    </div>
  );
}

function FieldError({ message, id }: { message: string; id: string }) {
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-red-500 text-xs font-medium mt-1.5">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {message}
    </p>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function BookingForm({ tourTitle, tourPrice, onSuccess }: BookingFormProps) {
  const { t, lang } = useLang();
  const dateInputId = useId();
  const dateErrorId = useId();

  const [adults,    setAdults]    = useState(1);
  const [children,  setChildren]  = useState(0);
  const [infants,   setInfants]   = useState(0);
  const [date,      setDate]      = useState("");
  const [error,     setError]     = useState<ValidationError>(null);
  const [submitted, setSubmitted] = useState(false);

  const minDate = todayString();

  // Only adults + children count toward price; infants are typically free
  const totalPax       = adults + children + infants;
  const paidPax        = adults + children;
  const estimatedPrice = tourPrice > 0 ? tourPrice * paidPax : 0;

  // ── Validation ──────────────────────────────────────────────────────────────

  const validate = useCallback((): ValidationError => {
    if (!date) return "no_date";
    if (date < minDate) return "past_date";
    return null;
  }, [date, minDate]);

  // Progressive validation: only re-validate on change after first attempt
  const handleDateChange = (value: string) => {
    setDate(value);
    if (submitted) {
      setError(value < minDate ? "past_date" : null);
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = () => {
    setSubmitted(true);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

    const readableDate = formatBookingDate(date, lang);
    const safeTitle    = sanitizeText(tourTitle, 200);

    const message = t("booking_wa_message")
      .replace("{tour}",     safeTitle)
      .replace("{date}",     readableDate)
      .replace("{adults}",   String(adults))
      .replace("{children}", String(children))
      .replace("{infants}",  String(infants));

    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526690000000";
    const url   = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    onSuccess?.();
  };

  // ── Pax rows config ─────────────────────────────────────────────────────────

  const paxRows: PaxRow[] = [
    {
      id:          "adults",
      labelKey:    "booking_adults",
      sublabelKey: "booking_adults_sub",
      value:       adults,
      min:         1,
      max:         MAX_ADULTS,
      setter:      setAdults,
    },
    {
      id:          "children",
      labelKey:    "booking_children",
      sublabelKey: "booking_children_sub",
      value:       children,
      min:         0,
      max:         MAX_CHILDREN,
      setter:      setChildren,
    },
    {
      id:          "infants",
      labelKey:    "booking_infants",
      sublabelKey: "booking_infants_sub",
      value:       infants,
      min:         0,
      max:         MAX_INFANTS,
      setter:      setInfants,
    },
  ];

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8">

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl text-navy font-bold uppercase">
          {t("booking_title")}
        </h3>
        {tourPrice > 0 && (
          <p className="text-gray-400 text-sm mt-1">
            {t("booking_from")}{" "}
            <span className="font-bold text-navy">
              ${tourPrice.toLocaleString("es-MX")} {t("tour_mxn")}
            </span>{" "}
            / {t("booking_per_person")}
          </p>
        )}
        <div className="w-12 h-1 bg-gold mx-auto rounded-full mt-3" />
      </div>

      <div className="space-y-3">

        {/* Pax counters */}
        {paxRows.map((row) => (
          <CounterRow
            key={row.id}
            id={row.id}
            label={t(row.labelKey)}
            sublabel={t(row.sublabelKey)}
            value={row.value}
            min={row.min}
            max={row.max}
            onDecrement={() => row.setter((v) => Math.max(row.min, v - 1))}
            onIncrement={() => row.setter((v) => Math.min(row.max, v + 1))}
          />
        ))}

        {/* Live pax + price summary */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-navy/5 rounded-xl border border-navy/10">
          <span className="flex items-center gap-1.5 text-navy/70 text-xs font-bold uppercase tracking-wide">
            <Users className="w-3.5 h-3.5" />
            {totalPax} {t("booking_persons")}
          </span>
          {estimatedPrice > 0 && (
            <span className="text-navy font-bold text-sm">
              ≈ ${estimatedPrice.toLocaleString("es-MX")}{" "}
              <span className="text-xs font-normal text-navy/60">{t("tour_mxn")}</span>
            </span>
          )}
        </div>

        {/* Date picker */}
        <div>
          <label
            htmlFor={dateInputId}
            className="flex items-center gap-2 text-navy font-bold text-xs uppercase tracking-wider mb-1.5"
          >
            <CalendarIcon className="w-4 h-4 text-gold" />
            {t("booking_date")}
          </label>
          <input
            id={dateInputId}
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            aria-describedby={error ? dateErrorId : undefined}
            aria-invalid={error !== null}
            className={`w-full p-4 rounded-xl border text-navy font-bold text-sm
                        focus:outline-none focus:ring-2 transition-all bg-white cursor-pointer
                        ${error
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:border-gold focus:ring-gold/20"
                        }`}
          />
          {error === "no_date"   && <FieldError id={dateErrorId} message={t("booking_no_date")}   />}
          {error === "past_date" && <FieldError id={dateErrorId} message={t("booking_past_date")} />}
          {!error && date && (
            <p className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium mt-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              {formatBookingDate(date, lang)}
            </p>
          )}
        </div>

        {/* FIX: type="button" prevents Safari iOS from treating this as a form
            submit, which would trigger a page reload instead of handleSubmit. */}
        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full h-14 bg-navy hover:bg-navy/90 text-white
                     font-display font-bold text-base uppercase tracking-wide
                     rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
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