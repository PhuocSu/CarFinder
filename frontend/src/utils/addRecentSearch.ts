const isSameFilter = (a: any, b: any) =>
  JSON.stringify(a) === JSON.stringify(b);

const addRecentSearch = (
  history: any[],
  current: any,
) => {
  if (!current) return history;
  const exists = history.some((h) => isSameFilter(h, current));
  if (exists) return history;
  return [current, ...history]; // add on top
};

export default addRecentSearch;