export const isSameFilter = (a: any, b: any) =>
  JSON.stringify(a) === JSON.stringify(b);

const isNonEmptyString = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0;

const hasArrayValues = (value: unknown) =>
  Array.isArray(value) && value.length > 0;

export const shouldSaveRecentSearch = (current: any) => {
  if (!current) return false;

  if (isNonEmptyString(current.search)) return true;
  if (hasArrayValues(current.badges)) return true;
  if (hasArrayValues(current.modelIds)) return true;
  if (hasArrayValues(current.subModelIds)) return true;
  if (current.yearMin != null || current.yearMax != null) return true;
  if (current.priceMin != null || current.priceMax != null) return true;
  if (current.mileageMin != null || current.mileageMax != null) return true;

  const fuelTypes = current.fuelTypes ?? current.fuelType;
  if (hasArrayValues(fuelTypes) || isNonEmptyString(fuelTypes)) return true;

  if (hasArrayValues(current.exColors)) return true;
  if (hasArrayValues(current.inColors)) return true;

  if (current.sortBy) return true;

  return false;
};

const addRecentSearch = (history: any[], current: any) => {
  if (!shouldSaveRecentSearch(current)) return history;
  const exists = history.some((h) => isSameFilter(h, current));
  if (exists) return history;
  return [current, ...history]; // add on top
};

export default addRecentSearch;
