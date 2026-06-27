import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/cms-upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let stage = "request";
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
          const folder = form.get("folder");

          if (!(file instanceof File)) {
            return Response.json({ error: "Missing file" }, { status: 400 });
          }

          const MAX_BYTES = 15 * 1024 * 1024;
          if (file.size > MAX_BYTES) {
            return Response.json(
              { error: "Image is too large (max 15 MB)." },
              { status: 413 },
            );
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
            stage = "decode";
            const [{ default: decodeHeic }, { PNG }] = await Promise.all([
              import("heic-decode"),
              import("pngjs"),
            ]);
            const decoded = await decodeHeic({ buffer: bytes });
            const png = new PNG({ width: decoded.width, height: decoded.height });
            png.data = Buffer.from(
              decoded.data.buffer,
              decoded.data.byteOffset,
              decoded.data.byteLength,
            );
            bytes = new Uint8Array(PNG.sync.write(png));
          }

          stage = "encode";
          const { optimizeImage } = await import("wasm-image-optimization");
          const out = await optimizeImage({
            image: bytes,
            width: 1600,
            height: 1600,
            quality: 82,
            format: "webp",
          });
          if (!out?.data) {
            return Response.json({ error: "encode failed: Image encode failed" }, { status: 500 });
          }
          const webpBytes = out.data as Uint8Array;

          stage = "upload";
          const safeFolder =
            typeof folder === "string" && /^[a-z0-9_-]+$/i.test(folder) ? folder : "uploads";
          const path = `${safeFolder}/${crypto.randomUUID()}.webp`;
          const { error: upErr } = await supabaseAdmin.storage
            .from("cms-media")
            .upload(path, webpBytes, {
              cacheControl: "31536000",
              upsert: false,
              contentType: "image/webp",
            });
          if (upErr) {
            return Response.json({ error: `upload failed: ${upErr.message}` }, { status: 500 });
          }

          const { data: publicUrlData } = supabaseAdmin.storage
            .from("cms-media")
            .getPublicUrl(path);
          const url = publicUrlData.publicUrl;

          return Response.json({ url });
        } catch (err) {
          const msg = (err as Error)?.message || "Conversion failed";
          console.error("[cms-upload] failed:", err);
          return Response.json({ error: `${stage} failed: ${msg}` }, { status: 500 });
        }
      },
    },
  },
});
