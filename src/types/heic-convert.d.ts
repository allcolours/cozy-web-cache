declare module "heic-convert" {
  interface ConvertOptions {
    buffer: ArrayBuffer | Uint8Array | Buffer;
    format: "JPEG" | "PNG";
    quality?: number;
  }
  function convert(opts: ConvertOptions): Promise<Uint8Array>;
  export default convert;
}