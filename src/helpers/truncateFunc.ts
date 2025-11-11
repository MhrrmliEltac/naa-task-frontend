export const truncateWord = (text: string, maxLength: number = 20): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};
