export const getCompanyName = (): string => {
  const className = ".currentNameTitle";
  const el = document.querySelector(className);
  const value = el?.textContent?.trim() ?? "";
  return value;
};
