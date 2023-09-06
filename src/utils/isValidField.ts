export const isValidField = (err: any): string[] => {
  const data = err.data;
  if (Array.isArray(data)) {
    return Object.values(data).map((el: any) => el.path);
  } else {
    alert('Проверьте подключение к интернету или зайдите позже');
    return [];
  }
};
