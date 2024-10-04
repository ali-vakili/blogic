export function extractIdFromSlug(slug: string) {
  const parts = slug.split("-");
  return parts.length > 1 ? parts[1] : slug;
}
