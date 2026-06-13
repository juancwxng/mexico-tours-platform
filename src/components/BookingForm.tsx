"use client";
import { useState, useId, useCallback, useMemo } from "react";
import { CalendarIcon, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/context/LangContext";
import { sanitizeText } from "@/lib/utils";
import type { Lang, DictKey } from "@/lib/i18n";

// ─── Constants ───────────────────────────────────────────────────────────────

const MAX_ADULTS = 20;
const MAX_CHILDREN = 20;
const MAX_INFANTS = 10;

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

function todayParts(): { year: number; month: number; day: number } {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}

/** Returns today's date as a YYYY-MM-DD string in local time. */
function todayString(): string {
  const { year, month, day } = todayParts();
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Builds a YYYY-MM-DD string from the three select values. Returns "" if incomplete. */
function buildIso(year: string, month: string, day: string): string {
  if (!year || !month || !day) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

/** How many days in a given month/year. */
function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Formats a YYYY-MM-DD string into a human-readable date using Intl.
 * T12:00:00 forces local-time parsing — avoids off-by-one-day errors
 * in UTC-negative timezones such as America/Mazatlan (UTC-7).
 */
function formatBookingDate(isoDate: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${isoDate}T12:00:00`));
}

/** Month names via Intl — no hardcoded arrays, respects active language. */
function getMonthNames(lang: Lang): { value: string; label: string }[] {
  const locale = lang === "en" ? "en-US" : "es-MX";
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const label = new Intl.DateTimeFormat(locale, { month: "long" }).format(
      new Date(2000, i, 1),
    );
    return {
      value: String(month).padStart(2, "0"),
      label: label.charAt(0).toUpperCase() + label.slice(1),
    };
  });
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1.5 text-red-500 text-xs font-medium mt-1.5"
    >
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {message}
    </p>
  );
}

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
        <span className="text-xs text-gray-500">{sublabel}</span>
      </div>
      <div
        className="flex items-center gap-2"
        role="group"
        aria-labelledby={countId}
      >
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          aria-label={`${label} −`}
          className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-navy font-bold text-lg
                     hover:bg-gold hover:border-gold hover:text-white
                     disabled:opacity-35 disabled:cursor-not-allowed
                     transition-colors flex items-center justify-center"
        >
          −
        </button>
        <span
          id={countId}
          className="w-8 text-center text-navy font-bold text-base tabular-nums"
          aria-live="polite"
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
                     disabled:opacity-35 disabled:cursor-not-allowed
                     transition-colors flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ─── DateSelector ─────────────────────────────────────────────────────────────

interface DateSelectorProps {
  lang: Lang;
  day: string;
  month: string;
  year: string;
  onDayChange: (v: string) => void;
  onMonthChange: (v: string) => void;
  onYearChange: (v: string) => void;
  hasError: boolean;
  errorId: string;
}

const selectBase =
  "flex-1 px-3 py-3.5 rounded-xl border text-navy font-bold text-sm bg-white " +
  "focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer " +
  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%230b1724%22%20d%3D%22M4%206l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] " +
  "bg-no-repeat bg-[right_0.6rem_center] bg-[length:1rem_1rem] pr-8";

const selectOk = "border-gray-200 focus:border-gold focus:ring-gold/20";
const selectErr = "border-red-300 focus:border-red-400 focus:ring-red-100";

function DateSelector({
  lang,
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
  hasError,
  errorId,
}: DateSelectorProps) {
  const today = todayParts();
  const monthNames = useMemo(() => getMonthNames(lang), [lang]);

  const numDays =
    day && month && year ? daysInMonth(Number(year), Number(month)) : 31;

  const dayLabel = lang === "en" ? "Day" : "Día";
  const monthLabel = lang === "en" ? "Month" : "Mes";
  const yearLabel = lang === "en" ? "Year" : "Año";

  const stateClass = hasError ? selectErr : selectOk;

  const currentYear = today.year;
  const years = Array.from({ length: 2 }, (_, i) => currentYear + i);

  return (
    <div
      className="flex gap-2"
      role="group"
      aria-describedby={hasError ? errorId : undefined}
    >
      {/* Day */}
      <select
        value={day}
        onChange={(e) => onDayChange(e.target.value)}
        aria-label={dayLabel}
        className={`${selectBase} ${stateClass} w-[30%] flex-none`}
      >
        <option value="">{dayLabel}</option>
        {Array.from({ length: numDays }, (_, i) => {
          const d = String(i + 1).padStart(2, "0");
          return (
            <option key={d} value={d}>
              {i + 1}
            </option>
          );
        })}
      </select>

      {/* Month */}
      <select
        value={month}
        onChange={(e) => onMonthChange(e.target.value)}
        aria-label={monthLabel}
        className={`${selectBase} ${stateClass} flex-1`}
      >
        <option value="">{monthLabel}</option>
        {monthNames.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {/* Year */}
      <select
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
        aria-label={yearLabel}
        className={`${selectBase} ${stateClass} w-[30%] flex-none`}
      >
        <option value="">{yearLabel}</option>
        {years.map((y) => (
          <option key={y} value={String(y)}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BookingForm({
  tourTitle,
  tourPrice,
  onSuccess,
}: BookingFormProps) {
  const { t, lang } = useLang();

  const dateErrorId = useId();

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Three-field date state
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [error, setError] = useState<ValidationError>(null);
  const [submitted, setSubmitted] = useState(false);

  const minDate = todayString();
  const date = buildIso(year, month, day);

  // Only adults + children count toward price; infants are typically free
  const totalPax = adults + children + infants;
  const paidPax = adults + children;
  const estimatedPrice = tourPrice > 0 ? tourPrice * paidPax : 0;

  // ── Validation ──────────────────────────────────────────────────────────────

  const validate = useCallback((): ValidationError => {
    if (!date) return "no_date";
    if (date < minDate) return "past_date";
    return null;
  }, [date, minDate]);

  const revalidate = useCallback(
    (newDate: string) => {
      if (!submitted) return;
      if (!newDate) setError("no_date");
      else if (newDate < minDate) setError("past_date");
      else setError(null);
    },
    [submitted, minDate],
  );

  const handleDayChange = (v: string) => {
    setDay(v);
    revalidate(buildIso(year, month, v));
  };
  const handleMonthChange = (v: string) => {
    setMonth(v);
    // Reset day if it exceeds days in the newly selected month
    const maxDay = v && year ? daysInMonth(Number(year), Number(v)) : 31;
    const safeDay = Number(day) > maxDay ? "" : day;
    if (safeDay !== day) setDay(safeDay);
    revalidate(buildIso(year, v, safeDay));
  };
  const handleYearChange = (v: string) => {
    setYear(v);
    revalidate(buildIso(v, month, day));
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
    const safeTitle = sanitizeText(tourTitle, 200);

    const message = t("booking_wa_message")
      .replace("{tour}", safeTitle)
      .replace("{date}", readableDate)
      .replace("{adults}", String(adults))
      .replace("{children}", String(children))
      .replace("{infants}", String(infants));

    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526691525822";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    onSuccess?.();
  };

  // ── Pax rows config ─────────────────────────────────────────────────────────

  const paxRows: PaxRow[] = [
    {
      id: "adults",
      labelKey: "booking_adults",
      sublabelKey: "booking_adults_sub",
      value: adults,
      min: 1,
      max: MAX_ADULTS,
      setter: setAdults,
    },
    {
      id: "children",
      labelKey: "booking_children",
      sublabelKey: "booking_children_sub",
      value: children,
      min: 0,
      max: MAX_CHILDREN,
      setter: setChildren,
    },
    {
      id: "infants",
      labelKey: "booking_infants",
      sublabelKey: "booking_infants_sub",
      value: infants,
      min: 0,
      max: MAX_INFANTS,
      setter: setInfants,
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
          <p className="text-gray-500 text-sm mt-1">
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
              <span className="text-xs font-normal text-navy/60">
                {t("tour_mxn")}
              </span>
            </span>
          )}
        </div>

        {/* Date selector */}
        <div>
          <div className="flex items-center gap-2 text-navy font-bold text-xs uppercase tracking-wider mb-1.5">
            <CalendarIcon className="w-4 h-4 text-gold" />
            {t("booking_date")}
          </div>
          <DateSelector
            lang={lang}
            day={day}
            month={month}
            year={year}
            onDayChange={handleDayChange}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
            hasError={error !== null}
            errorId={dateErrorId}
          />
          {error === "no_date" && (
            <FieldError id={dateErrorId} message={t("booking_no_date")} />
          )}
          {error === "past_date" && (
            <FieldError id={dateErrorId} message={t("booking_past_date")} />
          )}
          {!error && date && (
            <p className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium mt-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              {formatBookingDate(date, lang)}
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full h-14 bg-navy hover:bg-navy/90 text-white
                     font-display font-bold text-base uppercase tracking-wide
                     rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          {t("booking_cta")}
        </Button>

        <p className="text-xs text-center text-gray-500">
          {t("booking_wa_note")}
        </p>
      </div>
    </div>
  );
}
