export function formatDate(date: Date | string): string {
    const paresedDate = typeof date === 'string' ? new Date(date) : date;

    const year = paresedDate.getFullYear();
    const month = paresedDate.getMonth();
    const day = paresedDate.getDate();

    const hour = `${paresedDate.getHours()}`.padStart(2, '0');
    const minutes = `${paresedDate.getMinutes()}`.padStart(2, '0');

    return `${year}/${month}/${day} ${hour}:${minutes}`;
}
