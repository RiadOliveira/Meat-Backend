export const formatDateWithoutTimezone = (date: Date) => {
    const parsedDate = new Date(date);
    const day = String(parsedDate.getUTCDate()).padStart(2, '0');
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
    const year = parsedDate.getUTCFullYear();

    return `${day}/${month}/${year}`;
};
