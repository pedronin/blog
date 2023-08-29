export const isValidField = (err: any): string[] => {
  const data = err.data;
  if (Array.isArray(data)) {
    // console.log(Object.values(data).map((el: any) => el.path));
    return Object.values(data).map((el: any) => el.path);
  } else {
    return [];
  }
};
