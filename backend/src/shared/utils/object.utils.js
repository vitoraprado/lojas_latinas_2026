export function upperCaseKeys(value) {
  if (Array.isArray(value)) return value.map(upperCaseKeys);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key.toUpperCase(), upperCaseKeys(item)]));
}

export function bodyValue(body, field) {
  return body?.[field] ?? body?.[field.toUpperCase()];
}

export function normalizeRows(rows) {
  return (rows || []).map((row) => upperCaseKeys(row));
}