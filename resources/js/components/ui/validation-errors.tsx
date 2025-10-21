import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePage } from '@inertiajs/react';
import { AlertCircleIcon } from 'lucide-react';

export function ValidationErrors({ prefix }: { prefix: string }) {
    const errors = usePage().props.errors;
    const messages = Object.entries(errors)
        .filter(([key]) => key.startsWith(prefix))
        .map(([, message]) => message);

    if (messages.length === 0) {
        return null;
    }

    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Les données de ce champs sont invalide</AlertTitle>
            <AlertDescription>
                <ul className="list-inside list-disc text-sm">
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    );
}
