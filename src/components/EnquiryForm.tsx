import { copy } from "@/lib/copy";
import { EnquiryFormFields, type EnquiryFormProps } from "./EnquiryFormFields";

export type { EnquiryHouse } from "./EnquiryFormFields";

/**
 * The enquiry form (brief 6.5). A server wrapper that hands the form its
 * labels, so the client part (EnquiryFormFields) does not import the whole
 * copy module (PSI pass 1).
 */
export function EnquiryForm(props: Omit<EnquiryFormProps, "labels">) {
  return <EnquiryFormFields labels={copy.enquire.form} {...props} />;
}
