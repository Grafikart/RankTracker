import { type ReactNode, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { toast } from 'sonner';

export default function FrontLayout({children}: {children: ReactNode}) {
    const page = usePage<SharedData>();

    useEffect(() => {
        if (page.props.flash.success) {
            toast.success(page.props.flash.success);
        }
        if (page.props.flash.error) {
            toast.error(page.props.flash.error);
        }
    }, [page.props.flash]);

    return <div className="p-4">
        {children}
    </div>
}
