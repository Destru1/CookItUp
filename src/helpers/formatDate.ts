export const formatDate = (dateString: Date): string => {
    return new Intl.DateTimeFormat("en-UK", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };