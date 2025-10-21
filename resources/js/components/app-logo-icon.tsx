import { type HTMLAttributes } from 'react';

export default function AppLogoIcon(props: HTMLAttributes<HTMLImageElement>) {
    return <img src="/logo.svg" {...props} alt="Logo Roundnet Montpellier" />;
}
