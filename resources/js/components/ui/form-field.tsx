import { cn } from '@/lib/utils';
import { clsx } from 'clsx';
import  { type HTMLAttributes, isValidElement, type PropsWithChildren, type ReactNode } from 'react';
import { Label } from '@/components/ui/label';

type Props = PropsWithChildren<{
    error?: string | string[];
    label?: string;
    name?: string;
    help?: string;
    className?: string;
    right?: ReactNode,
}> & HTMLAttributes<HTMLDivElement>;

export function FormField({error, label, children, help, className, right, ...props}: Props) {
    let name = undefined
    if (isValidElement(children)) {
        name = (children.props as {name?: string}).name
    }
    return <div className={cn(clsx('grid items-center gap-3 relative', className))} {...props}>
        {label && <Label htmlFor={name} data-error={error}>{label}</Label>}
        {right && <div className="absolute right-0 -top-2">{right}</div>}
        {children}
        {help && <p className="text-sm text-muted-foreground">{help}</p>}
        {error && <p className="text-destructive text-sm -mt-1">
            {Array.isArray(error) ? error.join(', ') : error}
        </p>}
    </div>
}
