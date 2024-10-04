export const formatDate = (date: string) => {
  const formatedDate = new Date(date).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return formatedDate;
};
