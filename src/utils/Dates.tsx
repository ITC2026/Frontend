export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = (1 + date.getDate()).toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
};


