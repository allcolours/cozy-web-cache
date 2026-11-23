import { z } from "zod";

export const ASSET_ERROR_LIMIT = 30;
export const ASSET_ERROR_WINDOW_MS = 10 * 60 * 1000;
export const assetErrorLimitReached = (recent: number) => recent >= ASSET_ERROR_LIMIT;
const truncated = (max: number) => z.string().transform((s) => s.slice(0, max));
export const AssetErrorPayloadSchema = z.object({
  asset_url: z.string().min(1).transform((s) => s.slice(0, 2048)),
  page_url: truncated(2048).optional().nullable(),
  user_agent: truncated(500).optional().nullable(),
  status: z.number().int().optional().nullable(),
  referrer: truncated(2048).optional().nullable(),
});