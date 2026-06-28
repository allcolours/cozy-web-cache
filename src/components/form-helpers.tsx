import { SITE, WHATSAPP_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

/** Inline spinner (uses currentColor). */
export function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small muted trust line shown near each form's submit. Only existing, true claims. */
export function TrustMicrocopy({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-muted-foreground ${className}`}>
      Fully insured · Written quote within 48 hours · No obligation.
    </p>
  );
}

/** Shared success confirmation. Tone matches the brand voice. */
export function FormSuccess({
  heading = "Thanks — we've got your request",
  className = "",
}: {
  heading?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`bg-primary/10 p-8 text-center ${className}`}
    >
      <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
        {heading}
      </h3>
      <p className="mt-3 text-sm text-foreground">
        We'll reply within one working day. For something urgent, call{" "}
        <a className="font-semibold text-primary hover:underline" href={`tel:${SITE.phoneTel}`}>
          {SITE.phoneDisplay}
        </a>
        .
      </p>
      <p className="mt-4 text-sm text-foreground/85">
        Have photos of the job?{" "}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:underline"
        >
          Send them on WhatsApp
        </a>{" "}
        — it speeds up your quote.
      </p>
    </div>
  );
}

export type FieldErrors = Record<string, string | undefined>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactValidationInput {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  /** When true, email is the only contact channel (no phone field on the form). */
  requireEmail?: boolean;
  /** When true, phone is the only contact channel (no email field on the form). */
  requirePhone?: boolean;
  /** Minimum message length (default 10). Set to 0 to skip. */
  minMessage?: number;
  /** Label used in the "name required" message. */
  nameLabel?: string;
  /** Field key used in the returned errors map for the message error. */
  messageField?: string;
}

/**
 * Shared client-side validator. Mirrors the rules described in the spec:
 * - Name required
 * - At least one of phone or email (or the channel-specific override)
 * - Email format check when provided
 * - Message required + min length (default 10 chars)
 * Returns a map { fieldName: errorMessage }.
 */
export function validateContact(input: ContactValidationInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = (input.name || "").trim();
  const email = (input.email || "").trim();
  const phone = (input.phone || "").trim();
  const message = (input.message || "").trim();
  const minMessage = input.minMessage ?? 10;
  const messageField = input.messageField || "message";

  if (!name) errors.name = `Please enter your ${input.nameLabel || "name"}.`;

  if (input.requireEmail) {
    if (!email) errors.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  } else if (input.requirePhone) {
    if (!phone) errors.phone = "Please enter your phone number.";
  } else {
    if (!email && !phone) {
      const msg = "Please enter a phone number or email so we can reply.";
      errors.email = msg;
      errors.phone = msg;
    } else if (email && !EMAIL_RE.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (minMessage > 0) {
    if (!message) {
      errors[messageField] = "Please add a short description of the job.";
    } else if (message.length < minMessage) {
      errors[messageField] = `Please add a little more detail (at least ${minMessage} characters).`;
    }
  }

  return errors;
}

/** Focus the first field that matches a key in `errors` inside `formEl`. */
export function focusFirstError(formEl: HTMLFormElement | null, errors: FieldErrors) {
  if (!formEl) return;
  for (const key of Object.keys(errors)) {
    if (!errors[key]) continue;
    const el = formEl.querySelector<HTMLElement>(`[name="${key}"]`);
    if (el && typeof (el as HTMLInputElement).focus === "function") {
      (el as HTMLInputElement).focus();
      return;
    }
  }
}
