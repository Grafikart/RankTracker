const formatter = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
});

export function format(date?: string | null): string {
    if (!date) {
        return '-';
    }
    return formatter.format(new Date(date));
}
