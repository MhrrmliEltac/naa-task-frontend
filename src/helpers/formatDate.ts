export const formatDate = (dateString: string): { date: string; time: string } => {
  const date = new Date(dateString);
  
  // Format date as MM/DD/YYYY
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  
  // Format time as H:MM AM/PM (no leading zero for single digit hours, but keep minutes with leading zero)
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedTime = `${hours}:${minutes} ${ampm}`;
  
  return {
    date: formattedDate,
    time: formattedTime,
  };
};

