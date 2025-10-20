import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
export * from './generated';

export interface Auth {
    user: User;
}

export type PaginatedCollection<T> = {
    data: T[];
    current_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        page: number | null
        active: boolean;
    }[];
};

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
