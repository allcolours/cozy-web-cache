import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "../components/SiteLayout";

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  component: UnsubscribePage,
});

type Status = "validating" | "ready" | "already" | "invalid" | "submitting" | "success" | "error";

function UnsubscribePage() {
  const { token } = useSearch({ from: "/unsubscribe" });
  const [status, setStatus] = useState<Status>("validating");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) return setStatus("invalid");
        if (data.valid) return setStatus("ready");
        if (data.reason === "already_unsubscribed") return setStatus("already");
        setStatus("invalid");
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  async function confirm() {
    setStatus("submitting");
    try {
      const r = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.success) setStatus("success");
      else if (data.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="mx-auto max-w-xl px-4 py-24 md:px-8 md:py-32">
          <div className="border-t-[3px] border-primary bg-card p-8 md:p-10">
            <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-[oklch(0.2_0_0)]">
              Unsubscribe
            </h1>
            <hr className="section-rule mt-3" />

            <div className="mt-6 text-sm text-foreground">
              {status === "validating" && <p>Checking your link…</p>}

              {status === "ready" && (
                <>
                  <p>Click the button below to unsubscribe from these emails.</p>
                  <button
                    onClick={confirm}
                    className="mt-6 rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-[oklch(0.62_0.17_158)]"
                  >
                    Confirm unsubscribe
                  </button>
                </>
              )}

              {status === "submitting" && <p>Processing…</p>}

              {status === "success" && (
                <p className="bg-primary/10 p-4">You've been unsubscribed. You won't receive any further emails.</p>
              )}

              {status === "already" && (
                <p className="bg-primary/10 p-4">This email address is already unsubscribed.</p>
              )}

              {status === "invalid" && (
                <p className="text-destructive">This unsubscribe link is invalid or has expired.</p>
              )}

              {status === "error" && (
                <p className="text-destructive">Something went wrong. Please try again later.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
