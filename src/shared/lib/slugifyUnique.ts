import { createSlug } from './slug';

export function createUniqueSlug(baseValue: string, existingSlugs: string[]) {
  const baseSlug = createSlug(baseValue);

  if (!baseSlug) {
    return '';
  }

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let candidate = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(candidate)) {
    counter += 1;
    candidate = `${baseSlug}-${counter}`;
  }

  return candidate;
}