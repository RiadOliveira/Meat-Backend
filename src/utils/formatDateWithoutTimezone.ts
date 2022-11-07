export const formatDateWithoutTimezone = (date: Date) => {
    const parsedDate = new Date(date);
    const day = parsedDate.getUTCDate().toString().padStart(2, '0');
    const month = parsedDate.getUTCMonth().toString().padStart(2, '0');
    const year = parsedDate.getUTCFullYear();

    return `${day}/${month}/${year}`;
};
