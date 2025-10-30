/**
 * Converte qualquer valor em booleano de forma segura.
 * Aceita strings como "true" / "false" (case-insensitive),
 * valores booleanos diretos ou undefined (com fallback opcional).
 */
export const isTrue = (v: unknown, def = false): boolean => {
  if (typeof v === 'boolean') return v;

  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    if (s === 'true') return true;
    if (s === 'false') return false;
  }

  return def;
};
