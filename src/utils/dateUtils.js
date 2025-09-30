export const formatEventDate = (eventDate) => {
  if (!eventDate) {
    return "";
  }

  // Check if the date is in DD-MM-YYYY format
  const match = eventDate.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    const dateObj = new Date(`${year}-${month}-${day}`);
    return dateObj.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } else {
    // Handle other date formats
    return new Date(eventDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
};