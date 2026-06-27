import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/gallery-upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const authHeader = request.headers.get("authorization") || "";
          if (!authHeader.toLowerCase().startsWith("bearer ")) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }
          const token = authHeader.slice(7).trim();
          if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const { data: userRes, error: userErr } = await supabaseAdmin.auth.getUser(token);
          if (userErr || !userRes?.user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }
          const userId = userRes.user.id;

          const { data: isAdmin, error: roleErr } = await supabaseAdmin.rpc("has_role", {
            _user_id: userId,
            _role: "admin",
          });
          if (roleErr || !isAdmin) {
            return Response.json({ error: "Forbidden" }, { status: 403 });
          }

          const form = await request.formData();
          const file = form.get("file");
          const projectId = form.get("projectId");
          if (!(file instanceof File)) {
            return Response.json({ error: "Missing file" }, { status: 400 });
          }
          if (typeof projectId !== "string" || !projectId) {
            return Response.json({ error: "Missing projectId" }, { status: 400 });
          }

          const arrayBuf = await file.arrayBuffer();
          let bytes = new Uint8Array(arrayBuf);

          // Detect HEIC/HEIF (mime, extension, or ftyp magic)
          const name = (file.name || "").toLowerCase();
          const mime = (file.type || "").toLowerCase();
          const head = new TextDecoder("latin1").decode(bytes.slice(0, 32));
          const isHeic =
            mime === "image/heic" ||
            mime === "image/heif" ||
            name.endsWith(".heic") ||
            name.endsWith(".heif") ||
            /ftyp(heic|heix|hevc|hevx|mif1|msf1|heim|heis)/i.test(head);

          if (isHeic) {
            const heicConvert = (await import("heic-convert")).default;
            const jpegBuf = await heicConvert({
              buffer: bytes,
              format: "JPEG",
              quality: 0.9,
            });
            bytes = new Uint8Array(jpegBuf);
          }

          const { optimizeImage } = await import("wasm-image-optimization");
          const out = await optimizeImage({
            image: bytes,
            width: 1600,
            height: 1600,
            quality: 82,
            format: "webp",
          });
          if (!out?.data) {
            return Response.json({ error: "Image encode failed" }, { status: 500 });
          }
          const webpBytes = out.data as Uint8Array;

          const path = `projects/${projectId}/${crypto.randomUUID()}.webp`;
          const { error: upErr } = await supabaseAdmin.storage
            .from("gallery")
            .upload(path, webpBytes, {
              cacheControl: "31536000",
              upsert: false,
              contentType: "image/webp",
            });
          if (upErr) {
            return Response.json({ error: `Upload failed: ${upErr.message}` }, { status: 500 });
          }

          return Response.json({ path });
        } catch (err) {
          const msg = (err as Error)?.message || "Conversion failed";
          console.error("[gallery-upload] failed:", err);
          return Response.json({ error: msg }, { status: 500 });
        }
      },
    },
  },
});
