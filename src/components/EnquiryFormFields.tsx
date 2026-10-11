"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { submitEnquiry } from "@/app/enquire/actions";
import {
  initialEnquiryState,
  OTHER_HOUSE,
  type EnquiryField,
  type RequiredField,
} from "@/app/enquire/fields";
import type { copy } from "@/lib/copy";
import styles from "./EnquiryForm.module.css";

export type EnquiryHouse = { slug: string; name: string };

export type EnquiryFormProps = {
  /** `copy.enquire.form`, passed in by the server wrapper (EnquiryForm.tsx) so
   * the whole copy module stays out of the browser bundle. */
  labels: typeof copy.enquire.form;
  /** The published houses (eleven) in index order (`published()` mapped to slug and name). */
  houses: readonly EnquiryHouse[];
  /** Preselected house slug (the estate page). */
  house?: string;
  /**
   * Preselect from `?house=slug` in the address, read in the browser so the
   * /enquire page can stay static (no `searchParams` on the server).
   */
  houseFromQuery?: boolean;
  /** Prefilled message (the estate page's viewing line). */
  message?: string;
  className?: string;
};

const ORDER: RequiredField[] = ["firstName", "lastName", "email", "consent"];

/**
 * The enquiry form (brief 6.5): labels above fields, 1px stone borders, no
 * fill, square. Posts to the server action, which validates and redirects to
 * /enquire/sent. Works without JavaScript (progressive enhancement).
 */
export function EnquiryFormFields({
  labels: f,
  houses,
  house = "",
  houseFromQuery = false,
  message = "",
  className = "",
}: EnquiryFormProps) {
  const [state, action, pending] = useActionState(submitEnquiry, initialEnquiryState);
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const v = state.values;

  // `?house=slug`: preselect a published house (or the "not shown here"
  // option) once, unless a house is already chosen.
  useEffect(() => {
    if (!houseFromQuery) return;
    const slug = new URLSearchParams(window.location.search).get("house") ?? "";
    if (slug !== OTHER_HOUSE && !houses.some((h) => h.slug === slug)) return;
    const select = formRef.current?.querySelector<HTMLSelectElement>('select[name="house"]');
    if (select && select.value === "") select.value = slug;
  }, [houseFromQuery, houses]);

  // After a failed attempt, move focus to the first field that needs attention.
  useEffect(() => {
    if (state.attempt === 0) return;
    const first = ORDER.find((k) => state.errors[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  const id = (k: EnquiryField) => `${uid}-${k}`;
  const err = (k: RequiredField) =>
    state.errors[k] ? { "aria-invalid": true, "aria-describedby": `${id(k)}-error` } : {};
  const errorLine = (k: RequiredField) =>
    state.errors[k] ? (
      <p id={`${id(k)}-error`} className={`t-small ${styles.error}`}>
        {state.errors[k]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      key={state.attempt}
      action={action}
      noValidate
      className={`${styles.form} ${className}`}
    >
      <div className={styles.pair}>
        <div className="field">
          <label htmlFor={id("firstName")}>{f.firstName}</label>
          <input
            id={id("firstName")}
            name="firstName"
            className="input"
            autoComplete="given-name"
            required
            defaultValue={v.firstName}
            {...err("firstName")}
          />
          {errorLine("firstName")}
        </div>
        <div className="field">
          <label htmlFor={id("lastName")}>{f.lastName}</label>
          <input
            id={id("lastName")}
            name="lastName"
            className="input"
            autoComplete="family-name"
            required
            defaultValue={v.lastName}
            {...err("lastName")}
          />
          {errorLine("lastName")}
        </div>
      </div>

      <div className={styles.pair}>
        <div className="field">
          <label htmlFor={id("email")}>{f.email}</label>
          <input
            id={id("email")}
            name="email"
            type="email"
            className="input"
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={v.email}
            {...err("email")}
          />
          {errorLine("email")}
        </div>
        <div className="field">
          <label htmlFor={id("telephone")}>{f.telephone}</label>
          <input
            id={id("telephone")}
            name="telephone"
            type="tel"
            className="input"
            autoComplete="tel"
            defaultValue={v.telephone}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor={id("country")}>{f.country}</label>
        <input
          id={id("country")}
          name="country"
          className="input"
          autoComplete="country-name"
          defaultValue={v.country}
        />
      </div>

      <div className="field">
        <label htmlFor={id("house")}>{f.house}</label>
        <select id={id("house")} name="house" className="input" defaultValue={v.house ?? house}>
          <option value="" disabled>
            {f.housePlaceholder}
          </option>
          {houses.map((h) => (
            <option key={h.slug} value={h.slug}>
              {h.name}
            </option>
          ))}
          <option value={OTHER_HOUSE}>{f.houseOther}</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor={id("dates")}>{f.dates}</label>
        <input id={id("dates")} name="dates" className="input" defaultValue={v.dates} />
      </div>

      <div className="field">
        <label htmlFor={id("message")}>{f.message}</label>
        <textarea
          id={id("message")}
          name="message"
          className="input"
          rows={5}
          defaultValue={v.message ?? message}
        />
      </div>

      <div className={styles.consent}>
        <div className={styles.check}>
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            className="checkbox"
            required
            defaultChecked={v.consent === "on"}
            {...err("consent")}
          />
          <label htmlFor={id("consent")} className="t-small">
            {f.consent}
          </label>
        </div>
        {errorLine("consent")}
      </div>

      <p className={`t-small c-umber ${styles.confidence}`}>{f.confidence}</p>

      <div className={styles.submit}>
        <button type="submit" className="btn-solid" disabled={pending} aria-disabled={pending}>
          {f.send}
        </button>
      </div>
    </form>
  );
}
