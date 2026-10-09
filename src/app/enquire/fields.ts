/**
 * Shared by the enquiry form (client) and its server action. A plain module:
 * a "use server" file may only export async functions.
 */

export type EnquiryField =
  | "firstName"
  | "lastName"
  | "email"
  | "telephone"
  | "country"
  | "house"
  | "dates"
  | "message"
  | "consent";

export type RequiredField = "firstName" | "lastName" | "email" | "consent";

export type EnquiryValues = Partial<Record<EnquiryField, string>>;

export type EnquiryState = {
  /** Increments on every failed attempt so the form remounts with `values`. */
  attempt: number;
  errors: Partial<Record<RequiredField, string>>;
  values: EnquiryValues;
};

export const initialEnquiryState: EnquiryState = { attempt: 0, errors: {}, values: {} };

/** Value of the select option `A house not shown here`. */
export const OTHER_HOUSE = "other";
