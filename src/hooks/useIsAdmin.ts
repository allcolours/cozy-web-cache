import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Returns true only for users that have the 'admin' role in public.user_roles.
 * RLS on admin-managed tables (gallery_projects, blog_posts, testimonials, ...)
 * requires has_role(auth.uid(), 'admin'), so gating the UI on the same check
 * keeps the admin panel honest and surfaces missing-role issues immediately.
 */
export function useIsAdmin() {
  return useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return false;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) {
        console.error("[useIsAdmin] role lookup failed:", error);
        return false;
      }
      return !!data;
    },
  });
}
