/**
 * Encode/decode numeric IDs to hide auto-increment IDs from URL.
 * Menggunakan base36 dengan faktor pengali agar ID tidak berurutan.
 *
 * Contoh: 125 → "b7mx", 126 → "b7n1"
 */

const KEY = 7351; // bilangan prima acak

export function encodeId(id) {
  if (id == null || id === 0) return "0";
  return (Number(id) * KEY).toString(36);
}

export function decodeId(encoded) {
  if (!encoded || encoded === "0") return 0;
  try {
    // Coba decode sebagai encoded format (base36 * KEY)
    const result = parseInt(encoded, 36) / KEY;
    if (Number.isInteger(result)) return result;
    // Fallback: treat sebagai raw numeric ID (backward compat)
    const raw = parseInt(encoded, 10);
    if (Number.isInteger(raw)) return raw;
    return null;
  } catch {
    return null;
  }
}
