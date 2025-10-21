import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function PlayerAvatar({
    name,
    className,
}: {
    name: string;
    className?: string;
}) {
    const fallback = `/storage/avatar${(name.length % 4) + 1}.png`;
    return (
        <Avatar className={cn('bg-muted', className)}>
            <AvatarImage src={fallback} />
        </Avatar>
    );
}
