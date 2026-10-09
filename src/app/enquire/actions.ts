"use server";

import { redirect } from "next/navigation";
import { copy } from "@/lib/copy";
import { indexOrder } from "@/lib/estates";
import { OTHER_HOUSE, type EnquiryField, type EnquiryState } from "./fields";

/**
 * The enquiry server action (brief 6.5). It validates, stores nothing, sends
 * nothing and redirects to /enquire/sent. Delivery is one function below
 * (`deliver`), so wiring Resend later is a change to this file only.
 */

type Enquiry = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  country: string;
  house: string;
  dates: string;
  message: string;
};

const LIMITS: Record<Exclude<EnquiryField, "consent">, number> = {
  firstName: 80,
  lastName: 80,
  email: 254,
  telephone: 40,
  country: 80,
  house: 80,
  dates: 200,
  message: 4000,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(form: FormData, key: Exclude<EnquiryField, "consent">): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, LIMITS[key]) : "";
}

async function deliver(enquiry: Enquiry): Promise<void> {
  // Demo: nothing is stored or sent. Replace this body with the mail call.
  console.log("[enquiry]", JSON.stringify(enquiry));
}

export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  const house = text(form, "house");
  const enquiry: Enquiry = {
    firstName: text(form, "firstName"),
    lastName: text(form, "lastName"),
    email: text(form, "email"),
    telephone: text(form, "telephone"),
    country: text(form, "country"),
    house: house === OTHER_HOUSE || indexOrder.includes(house) ? house : "",
    dates: text(form, "dates"),
    message: text(form, "message"),
  };
  const consent = form.get("consent") === "on";

  const e = copy.enquire.form.errors;
  const errors: EnquiryState["errors"] = {};
  if (!enquiry.firstName) errors.firstName = e.firstName;
  if (!enquiry.lastName) errors.lastName = e.lastName;
  if (!EMAIL.test(enquiry.email)) errors.email = e.email;
  if (!consent) errors.consent = e.consent;

  if (Object.keys(errors).length > 0) {
    return {
      attempt: _prev.attempt + 1,
      errors,
      values: { ...enquiry, consent: consent ? "on" : "" },
    };
  }

  await deliver(enquiry);
  redirect("/enquire/sent");
}
