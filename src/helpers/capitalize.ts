export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
export const formatDate = (date: Date): string => date.toLocaleString('en-us',{month:'long', year:'numeric'});
