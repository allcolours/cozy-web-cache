import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Painter Dublin | All Colours Painting & Decorating" },
      { name: "description", content: "Painter & decorator in Dublin. Interior & exterior painting for houses and apartments across Ballsbridge, Donnybrook, Stillorgan, Dún Laoghaire, Rathmines, Sandyford and more." },
      { name: "keywords", content: "painter dublin, painter and decorator dublin, painter near me, painter company near me, painting contractors dublin, master painters, painting and decorating dublin, interior painter near me, interior painting, exterior painting, painting dash, pebbledash painting, apartment painting dublin, house painting dublin, renovation painting, ceiling painting, hallway painting, staircase painting, stairs painting, bedroom painting, bathroom painting, living room painting, nursery painters near me, georgian house painting, period property painting, office painters dublin, commercial painting contractors, industrial premises painting, floor painting, two-pack floor paints, twopack paints, epoxy floors, epoxy floor painting, epoxy painting, water based paint, oil based paint, railings painting, furniture painting, kitchen painting, kitchen cabinet painting, repainting kitchen cabinets, hand-painted kitchen, kitchen respraying, spray finish, spray painting, varnish painting, wallpapering dublin, wallpaper hanging, wall decorating, dust-free sanding, vacuum sanding, painter ballsbridge, painter donnybrook, painter stillorgan, painter dun laoghaire, painter rathfarnham, painter sandyford, painter rathmines, painter milltown, painter dundrum, painter roebuck, painter goatstown, painter ballinteer, painter leopardstown, painter harolds cross, painter cabinteely, painter foxrock, painter glenageary, painter dalkey, painter monkstown, painter sandymount, painter mount merrion, painter blackrock, painter ranelagh" },
      { name: "author", content: "All Colours Painting Contractor Limited" },
      { property: "og:title", content: "Painter Dublin | All Colours Painting & Decorating" },
      { property: "og:description", content: "Painter & decorator in Dublin — interior, exterior, houses & apartments. Free quotes across South Dublin." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "All Colours Painting" },
      { property: "og:locale", content: "en_IE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Painter Dublin | All Colours Painting & Decorating" },
      { name: "twitter:description", content: "Painter & decorator in Dublin — interior, exterior, houses & apartments." },
      { name: "theme-color", content: "#1f9d55" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PaintingService",
          name: "All Colours Painting Contractor Limited",
          alternateName: "All Colours Painting",
          url: "https://allcolourspainter.com",
          telephone: "+353 85 821 1870",
          email: "info@painterdublin.eu",
          image: "https://allcolourspainter.com/logo.png",
          priceRange: "€€",
          areaServed: [
            { "@type": "City", name: "Dublin" },
            { "@type": "AdministrativeArea", name: "County Dublin" },
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dublin",
            addressCountry: "IE",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "08:00",
              closes: "18:00",
            },
          ],
          sameAs: ["https://allcolourspainter.com"],
        }),
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Hind:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PageViewTracker />
      <Outlet />
    </QueryClientProvider>
  );
}

function PageViewTracker() {
  const router = useRouter();
  const path = router.state.location.pathname;
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (path.startsWith("/admin") || path.startsWith("/auth")) return;
    import("../integrations/supabase/client").then(({ supabase }) => {
      void supabase.from("page_views").insert({
        path,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent.slice(0, 500),
      });
    });
  }, [path]);
  return null;
}
