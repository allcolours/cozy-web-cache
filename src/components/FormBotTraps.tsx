import { useRef } from "react";

/**
 * Hidden anti-bot fields:
 *  - `company_website`: honeypot. Real users don't see/fill it. Off-screen,
 *    aria-hidden, tabindex=-1, autocomplete=off. NOT type=hidden so bots fill it.
 *  - `form_rendered_at`: timestamp captured on mount; the server rejects
 *    submissions that arrive in under ~2 seconds.
 *
 * Pair with `readBotTraps(formData)` to extract values for JSON payloads.
 */
export function FormBotTraps() {
  const rendered = useRef<number>(Date.now());
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <input
        type="hidden"
        name="form_rendered_at"
        defaultValue={String(rendered.current)}
      />
    </>
  );
}

export function readBotTraps(form: FormData) {
  return {
    company_website: String(form.get("company_website") || ""),
    form_rendered_at: Number(form.get("form_rendered_at") || 0) || undefined,
  };
}
