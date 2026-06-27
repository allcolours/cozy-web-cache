import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/lib/site";

export const SETTING_DEFAULTS: Record<string, string> = {
  phone: `${SITE.phoneDisplay}`,
  email: SITE.email,
  area: "Dublin & surrounding areas",
  hours: "Mon–Sat · 8:00 – 18:00",
  tagline: "Painting & decorating, done properly.",
  hero_title: "Painting & decorating, done properly.",
  hero_subtitle: "Professional interior, exterior and commercial painting across Dublin.",
  about_text: "All Colours Painting Contractor Limited delivers professional painting and decorating across Dublin and surrounding areas.",
};

export function useSiteSettings() {
  const { data } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key, value");
      if (error) throw error;
      const map: Record<string, string> = { ...SETTING_DEFAULTS };
      for (const row of data ?? []) map[row.key] = row.value;
      return map;
    },
    staleTime: 60_000,
  });
  return data ?? SETTING_DEFAULTS;
}
