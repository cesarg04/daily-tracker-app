export const useSearch = <T extends object>(
  data: T[],
  keys: (keyof T)[],
  searchItem: string
) => {
  return data.filter((item) =>
    keys.some((key) =>
      String(item[key]).toLowerCase().includes(searchItem.toLowerCase())
    )
  );
};
