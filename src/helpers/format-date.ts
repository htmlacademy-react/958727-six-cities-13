export const formatDate = (date: Date): string => date.toLocaleString('en-us',{month:'long', year:'numeric'});
